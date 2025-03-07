import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import type { CSSResultGroup, PropertyDeclaration, PropertyValues, TemplateResult } from 'lit';
import { html, isServer, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { until } from 'lit/directives/until.js';

import { getNextElementIndex } from '../core/a11y.js';
import { SbbOpenCloseBaseElement } from '../core/base-elements.js';
import { SbbLanguageController, SbbEscapableOverlayController } from '../core/controllers.js';
import {
  forceType,
  getOverride,
  handleDistinctChange,
  hostAttributes,
} from '../core/decorators.js';
import { isNextjs, isSafari, isZeroAnimationDuration, setOrRemoveAttribute } from '../core/dom.js';
import { EventEmitter } from '../core/eventing.js';
import { i18nSelectionRequired } from '../core/i18n.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledMixin,
  SbbFormAssociatedMixin,
  SbbHydrationMixin,
  SbbNegativeMixin,
  SbbRequiredMixin,
  SbbUpdateSchedulerMixin,
} from '../core/mixins.js';
import { isEventOnElement, overlayGapFixCorners, setOverlayPosition } from '../core/overlay.js';
import type { SbbOptGroupElement, SbbOptionElement } from '../option.js';

import style from './select.scss?lit&inline';

/**
 * On Safari, the aria role 'listbox' must be on the host element, or else VoiceOver won't work at all.
 * On the other hand, JAWS and NVDA need the role to be an "immediate parent" to the options, or else optgroups won't work.
 */
const ariaRoleOnHost = isSafari;

let nextId = 0;

export interface SelectChange {
  type: 'value';
  value: string | string[];
}

/**
 * It displays a panel with selectable options.
 *
 * @slot - Use the unnamed slot to add options.
 * @event {CustomEvent<void>} change - Notifies that the component's value has changed.
 * @event {CustomEvent<void>} input - Notifies that an option value has been selected.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-select` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-select` is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the `sbb-select` begins the closing transition. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits whenever the `sbb-select` is closed.
 * @cssprop [--sbb-select-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 * @overrideType value - string | string[] | null
 */
export
@customElement('sbb-select')
@hostAttributes({
  role: ariaRoleOnHost ? 'listbox' : null,
})
class SbbSelectElement extends SbbUpdateSchedulerMixin(
  SbbDisabledMixin(
    SbbNegativeMixin(
      SbbHydrationMixin(
        SbbRequiredMixin(
          SbbFormAssociatedMixin<typeof SbbOpenCloseBaseElement, string | string[]>(
            SbbOpenCloseBaseElement,
          ),
        ),
      ),
    ),
  ),
) {
  public static override styles: CSSResultGroup = style;

  // TODO: fix using ...super.events requires: https://github.com/sbb-design-systems/lyne-components/issues/2600
  public static override readonly events = {
    change: 'change',
    input: 'input',
    stateChange: 'stateChange',
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;

  /** The placeholder used if no value has been selected. */
  @forceType()
  @property()
  public accessor placeholder: string = '';

  /** Whether the select allows for multiple selection. */
  @forceType()
  @handleDistinctChange((e: SbbSelectElement, newValue: boolean) => e._onMultipleChanged(newValue))
  @property({ reflect: true, type: Boolean })
  public accessor multiple: boolean = false;

  @forceType()
  @handleDistinctChange((e: SbbSelectElement, newValue: boolean) =>
    e._closeOnDisabledReadonlyChanged(newValue),
  )
  @property({ reflect: true, type: Boolean })
  @getOverride((e: SbbSelectElement, v: boolean): boolean => v || e.isDisabledExternally())
  public override accessor disabled: boolean = false;

  /** Whether the select is readonly. */
  @forceType()
  @handleDistinctChange((e: SbbSelectElement, newValue: boolean) =>
    e._closeOnDisabledReadonlyChanged(newValue),
  )
  @property({ type: Boolean })
  public accessor readonly: boolean = false;

  /**
   * Form type of element.
   * @default 'select-one / select-multiple'
   */
  public override get type(): string {
    return this.multiple ? 'select-multiple' : 'select-one';
  }

  /** The value displayed by the component. */
  @state() private accessor _displayValue: string | null = null;

  /** Notifies that the component's value has changed. */
  private _change: EventEmitter = new EventEmitter(this, SbbSelectElement.events.change);

  /** Notifies that an option value has been selected. */
  private _input: EventEmitter = new EventEmitter(this, SbbSelectElement.events.input);

  /** @internal */
  private _stateChange: EventEmitter<SelectChange> = new EventEmitter(
    this,
    SbbSelectElement.events.stateChange,
    {
      composed: false,
    },
  );

  private _overlay!: HTMLElement;
  private _optionContainer!: HTMLElement;
  private _originElement!: HTMLElement;
  private _triggerElement!: HTMLElement;
  private _openPanelEventsController!: AbortController;
  private _sbbEscapableOverlayController = new SbbEscapableOverlayController(this);
  private _overlayId = `sbb-select-${++nextId}`;
  private _activeItemIndex = -1;
  private _searchTimeout?: ReturnType<typeof setTimeout>;
  private _searchString = '';
  private _didLoad = false;
  private _isPointerDownEventOnMenu: boolean = false;
  private _languageController = new SbbLanguageController(this);

  /**
   * The 'combobox' input element
   * @internal
   */
  public get inputElement(): HTMLElement {
    return this._triggerElement;
  }

  /** Gets all the SbbOptionElement projected in the select. */
  private get _options(): SbbOptionElement[] {
    return Array.from(this.querySelectorAll?.('sbb-option') ?? []);
  }

  private get _filteredOptions(): SbbOptionElement[] {
    return this._options.filter(
      (opt: SbbOptionElement) => !opt.disabled && !opt.hasAttribute('data-group-disabled'),
    );
  }

  public constructor() {
    super();
    this.addEventListener?.('optionSelectionChange', (e: CustomEvent<void>) =>
      this._onOptionChanged(e),
    );
    this.addEventListener?.('optionLabelChanged', (e: Event) => this._onOptionLabelChanged(e));
    this.addEventListener?.('click', (e: MouseEvent) => {
      const target = e.target as SbbSelectElement | SbbOptionElement;
      if (target.localName === 'sbb-option') {
        // Option click
        if (!this.multiple && !target.disabled) {
          this.close();
          this.focus();
        }
      } else {
        this._toggleOpening();
      }
    });

    new MutationController(this, {
      config: { attributeFilter: ['aria-labelledby', 'aria-label', 'aria-describedby'] },
      callback: () => this._syncAriaLabels(),
    });
  }

  private _syncAriaLabels(): void {
    if (!this._triggerElement || isServer) {
      return;
    }

    setOrRemoveAttribute(
      this._triggerElement,
      'aria-labelledby',
      this.getAttribute('aria-labelledby'),
    );
    setOrRemoveAttribute(this._triggerElement, 'aria-label', this.getAttribute('aria-label'));
    setOrRemoveAttribute(
      this._triggerElement,
      'aria-describedby',
      this.getAttribute('aria-describedby'),
    );

    // Using the associated labels is only a fallback.
    // The drawback is, that it doesn't get updated automatically when the list of label changes.
    if (
      !this.getAttribute('aria-label') &&
      !this.getAttribute('aria-labelledby') &&
      this.internals.labels.length
    ) {
      this._triggerElement?.setAttribute(
        'aria-label',
        Array.from(this.internals.labels)
          .map((label) => label.textContent)
          .join(', '),
      );
    }
  }

  /** Opens the selection panel. */
  public open(): void {
    if (
      this.state !== 'closed' ||
      !this._overlay ||
      this._options.length === 0 ||
      this.disabled ||
      this.formDisabled
    ) {
      return;
    }

    if (!this.willOpen.emit()) {
      return;
    }

    this.shadowRoot?.querySelector<HTMLDivElement>('.sbb-select__container')?.showPopover?.();
    this.state = 'opening';
    this.toggleAttribute('data-expanded', true);
    this._setOverlayPosition();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /** Closes the selection panel. */
  public close(): void {
    if (this.state !== 'opened') {
      return;
    }
    if (!this.willClose.emit()) {
      return;
    }

    this.state = 'closing';
    this.toggleAttribute('data-expanded', false);
    this._openPanelEventsController.abort();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-options-panel-animation-duration');
  }

  /** Gets the current displayed value. */
  public getDisplayValue(): string {
    return this._displayValue ?? '';
  }

  /** Listens to option changes. */
  private _onOptionChanged(event: Event): void {
    const target = event.target as SbbOptionElement;
    if (target.selected) {
      this._onOptionSelected(target);
    } else {
      this._onOptionDeselected(target);
    }
  }

  /** Listens to option changes. */
  private _onOptionLabelChanged(event: Event): void {
    const target = event.target as SbbOptionElement;
    const selected = this._getSelected();

    if (
      (!Array.isArray(selected) && target !== selected) ||
      (Array.isArray(selected) && !selected.includes(target))
    ) {
      return;
    }

    this._updateDisplayValue(selected);
  }

  private _updateDisplayValue(selected: SbbOptionElement | SbbOptionElement[] | null): void {
    if (Array.isArray(selected)) {
      this._displayValue = selected.map((o) => o.textContent).join(', ') || null;
    } else if (selected) {
      this._displayValue = selected?.textContent || null;
    } else {
      this._displayValue = null;
    }
  }

  /**
   * The `value` property should be adapted when the `multiple` property changes:
   *   - if it changes to true, the 'value' is set to an array;
   *   - if it changes to false, the first available option is set as 'value' otherwise it's set to null.
   */
  private _onMultipleChanged(newValue: boolean): void {
    if (newValue) {
      this.value = this.value !== null ? [this.value as string] : [];
    } else {
      this.value = (this.value as string[]).length ? (this.value as string[])[0] : null;
    }
  }

  /**
   * If the `disabled` or the `readonly` properties are set, and the panel is open, close it.
   */
  private _closeOnDisabledReadonlyChanged(newValue: boolean): void {
    if (this.isOpen && newValue) {
      this.close();
    }
  }

  /** Sets the _displayValue by checking the internal sbb-options and setting the correct `selected` value on them. */
  private _onValueChanged(newValue: string | string[]): void {
    const options = this._filteredOptions;
    if (!Array.isArray(newValue)) {
      const optionElement =
        options.find((o) => (o.value ?? o.getAttribute('value')) === newValue) ?? null;
      if (optionElement) {
        optionElement.selected = true;
      }
      options
        .filter((o) => (o.value ?? o.getAttribute('value')) !== newValue)
        .forEach((o) => (o.selected = false));
      this._updateDisplayValue(optionElement);
    } else {
      options
        .filter((o) => !newValue.includes(o.value ?? o.getAttribute('value')))
        .forEach((e) => (e.selected = false));
      const selectedElements = options.filter((o) =>
        newValue.includes(o.value ?? o.getAttribute('value')),
      );
      selectedElements.forEach((o) => (o.selected = true));
      this._updateDisplayValue(selectedElements);
    }
    this._stateChange.emit({ type: 'value', value: newValue });
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._setValidity();

    // Override the default focus behavior
    this.focus = () => this._triggerElement.focus();
    this.blur = () => this._triggerElement.blur();

    // Wait for ssr hydration
    if (!isNextjs()) {
      this.startUpdate();
      this._setupSelect();
    }
  }

  /**
   * Removes element's first attribute whose qualified name is qualifiedName.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/removeAttribute)
   * @internal We need to override this due to a hydration issue with Next.js.
   */
  public override removeAttribute(qualifiedName: string): void {
    // In Next.js the hydration needs to finish before we can manipulate the light DOM.
    // @lit/react calls removeAttribute('defer-hydration') in a useLayoutEffect,
    // which is done after hydration is finished. Due to this we intercept this call
    // in overriding removeAttribute to finish initialization of the sbb-select.
    // https://github.com/lit/lit/blob/main/packages/react/src/create-component.ts#L293-L296
    // We also need to wait for update complete in order to be sure that the shadow DOM has been rendered.
    if (isNextjs() && qualifiedName === 'defer-hydration' && !this._didLoad) {
      this.updateComplete.then(() => this._setupSelect());
    }
    super.removeAttribute(qualifiedName);
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    if (ariaRoleOnHost) {
      this.id ||= this._overlayId;
    }

    const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');

    if (formField) {
      this.negative = formField.hasAttribute('negative');
    }
    this._syncProperties();
    this._syncAriaLabels();

    if (this._didLoad) {
      this._setupOrigin();
      this._setupTrigger();
    }
    if (this.value) {
      this._onValueChanged(this.value);
    }
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (!name && this.hasUpdated) {
      setTimeout(() => this._syncAriaLabels());
    }

    if (this.hasUpdated && (name === 'value' || name === 'required' || !name)) {
      this._setValidity();
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    // On initialization, the '_onValueChanged' is called by the connectedCallback
    if (changedProperties.has('value') && this._didLoad) {
      this._onValueChanged(this.value!);
    }
    if (changedProperties.has('negative') || changedProperties.has('multiple')) {
      this._syncProperties();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.prepend(this._triggerElement); // Take back the trigger element previously moved to the light DOM
    this._openPanelEventsController?.abort();
  }

  protected override updateFormValue(): void {
    if (this.multiple && this.value instanceof Array) {
      const data = new FormData();
      (this.value as string[]).forEach((el) => data.append(this.name, el));
      this.internals.setFormValue(data);
    } else {
      this.internals.setFormValue(this.value as string | null);
    }
  }

  /**
   * The reset value is the attribute value (the setup value), null otherwise.
   * @internal
   */
  public formResetCallback(): void {
    this.value = this.hasAttribute('value') ? this.getAttribute('value') : null;
  }

  /**
   * @internal
   */
  public formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    if (!state) {
      this.value = null;
      return;
    }

    if (this.multiple) {
      // if multiple, the state format is ['field-name', 'value'][]
      this.value = (state as [string, string][]).map((entries) => entries[1]);
    } else {
      this.value = state as string;
    }
  }

  private _syncProperties(): void {
    this.querySelectorAll?.('sbb-divider').forEach((element) => (element.negative = this.negative));

    this.querySelectorAll?.<SbbOptionElement | SbbOptGroupElement>(
      'sbb-option, sbb-optgroup',
    ).forEach((element: SbbOptionElement | SbbOptGroupElement) => {
      element.toggleAttribute('data-negative', this.negative);
      element.toggleAttribute('data-multiple', this.multiple);
    });

    this.querySelectorAll?.<SbbOptionElement | SbbOptGroupElement>(
      'sbb-option, sbb-optgroup',
    ).forEach((e) => e.requestUpdate?.());
  }

  private _setValidity(): void {
    if (this.required && this._options.every((o) => o.value !== this.value)) {
      this.setValidityFlag('valueMissing', i18nSelectionRequired[this._languageController.current]);
    } else {
      this.removeValidityFlag('valueMissing');
    }
  }

  private _setupSelect(): void {
    this._setupOrigin();
    this._setupTrigger();
    this._didLoad = true;
    this.completeUpdate();
  }

  /** Sets the originElement; if the component is used in a sbb-form-field uses it, otherwise uses the parentElement. */
  private _setupOrigin(): void {
    const formField = this.closest?.('sbb-form-field');
    this._originElement =
      formField?.shadowRoot?.querySelector?.('#overlay-anchor') ?? this.parentElement!;
    if (this._originElement) {
      this.toggleAttribute(
        'data-option-panel-origin-borderless',
        !!formField?.hasAttribute?.('borderless'),
      );
    }
  }

  /**
   * To assess screen-readers problems caused by the interaction between aria patterns and shadow DOM,
   * we are forced to move the 'combobox' trigger element to the light DOM
   */
  private _setupTrigger(): void {
    // Move the trigger before the sbb-select
    this.parentElement!.insertBefore?.(this._triggerElement, this);

    // Set the invisible trigger element dimension to match the parent (needed for screen readers)
    const containerElement = this.closest?.('sbb-form-field') ?? this;
    this._triggerElement.style.top = '0px';
    this._triggerElement.style.height = `${containerElement.offsetHeight}px`;
    this._triggerElement.style.width = `${containerElement.offsetWidth}px`;
  }

  private _setOverlayPosition(): void {
    setOverlayPosition(
      this._overlay,
      this._originElement,
      this._optionContainer,
      this.shadowRoot!.querySelector('.sbb-select__container')!,
      this,
    );
  }

  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._handleClosing();
    }
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this._attachOpenPanelEvents();
    this._triggerElement.setAttribute('aria-expanded', 'true');
    this._sbbEscapableOverlayController.connect();
    this.didOpen.emit();
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.shadowRoot?.querySelector<HTMLDivElement>('.sbb-select__container')?.hidePopover?.();
    this._triggerElement.setAttribute('aria-expanded', 'false');
    this._resetActiveElement();
    this._optionContainer.scrollTop = 0;
    this._sbbEscapableOverlayController.disconnect();
    this.didClose.emit();
  }

  /** When an option is selected, updates the displayValue; it also closes the select if not `multiple`. */
  private _onOptionSelected(optionSelectionChange: SbbOptionElement): void {
    if (!this.multiple) {
      this._filteredOptions
        .filter((option) => option.id !== optionSelectionChange.id)
        .forEach((option) => (option.selected = false));
      this.value = optionSelectionChange.value;
    } else {
      if (!this.value) {
        this.value = [optionSelectionChange.value!];
      } else if (!this.value.includes(optionSelectionChange.value!)) {
        this.value = [...this.value, optionSelectionChange.value!];
      }
    }

    this._input.emit();
    this._change.emit();
  }

  /** When an option is unselected in `multiple`, removes it from value and updates displayValue. */
  private _onOptionDeselected(optionSelectionChange: SbbOptionElement): void {
    if (this.multiple) {
      this.value = (this.value as string[]).filter(
        (el: string) => el !== optionSelectionChange.value,
      );

      this._input.emit();
      this._change.emit();
    }
  }

  private _attachOpenPanelEvents(): void {
    this._openPanelEventsController = new AbortController();

    // Recalculate the overlay position on scroll and window resize
    document.addEventListener('scroll', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
      // Without capture, other scroll contexts would not bubble to this event listener.
      // Capture allows us to react to all scroll contexts in this DOM.
      capture: true,
    });
    window.addEventListener('resize', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
    });

    // Close menu on backdrop click
    window.addEventListener('pointerdown', (ev) => this._pointerDownListener(ev), {
      signal: this._openPanelEventsController.signal,
    });
    window.addEventListener('pointerup', (ev) => this._closeOnBackdropClick(ev), {
      signal: this._openPanelEventsController.signal,
    });
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if (this.readonly) {
      return;
    }

    if (this.state === 'opened') {
      this._openedPanelKeyboardInteraction(event);
    } else if (this.state === 'closed') {
      this._closedPanelKeyboardInteraction(event);
    }
  }

  private _closedPanelKeyboardInteraction(event: KeyboardEvent): void {
    if (this._checkForLetterSelection(event)) {
      return this._setNextActiveOptionByText(event);
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this.open();
        break;
    }
  }

  private _openedPanelKeyboardInteraction(event: KeyboardEvent): void {
    if (this.readonly || this.state !== 'opened') {
      return;
    }

    if (this._checkForLetterSelection(event)) {
      return this._setNextActiveOptionByText(event);
    }

    switch (event.key) {
      case 'Tab':
        this.close();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this._selectByKeyboard();
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this._setNextActiveOption(event);
        break;

      case 'Home':
      case 'PageUp':
        event.preventDefault();
        this._setNextActiveOption(event, 0);
        break;

      case 'End':
      case 'PageDown':
        event.preventDefault();
        this._setNextActiveOption(event, this._filteredOptions.length - 1);
        break;
    }
  }

  private _checkForLetterSelection(event: KeyboardEvent): boolean {
    return (
      event.key === 'Backspace' ||
      event.key === 'Clear' ||
      (event.key.length === 1 &&
        event.key !== ' ' &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey)
    );
  }

  private _setNextActiveOptionByText(event: KeyboardEvent): void {
    // Set timeout and the string to search.
    if (typeof this._searchTimeout === typeof setTimeout) {
      clearTimeout(this._searchTimeout);
    }
    this._searchTimeout = setTimeout(() => (this._searchString = ''), 1000);
    this._searchString += event.key;

    // Reorder the _filteredOption array to have the last selected element at the bottom.
    const indexForSlice: number = this._activeItemIndex + 1;
    const filteredOptionsSorted: SbbOptionElement[] = [
      ...this._filteredOptions.slice(indexForSlice),
      ...this._filteredOptions.slice(0, indexForSlice),
    ];

    const match = filteredOptionsSorted.find(
      (option: SbbOptionElement) =>
        option.textContent?.toLowerCase().indexOf(this._searchString.toLowerCase()) === 0,
    );
    if (match) {
      // If an exact match has been found, go to that option.
      this._setNextActiveOption(event, this._filteredOptions.indexOf(match));
    } else if (
      this._searchString.length > 1 &&
      new RegExp(`^${this._searchString.charAt(0)}*$`).test(this._searchString)
    ) {
      // If no exact match has been found but the string to search is made by the same repeated letter,
      // go to the first element, if exists, that matches the letter.
      const firstMatch = filteredOptionsSorted.find(
        (option: SbbOptionElement) =>
          option.textContent?.toLowerCase().indexOf(this._searchString[0].toLowerCase()) === 0,
      );
      if (firstMatch) {
        this._setNextActiveOption(event, this._filteredOptions.indexOf(firstMatch));
      }
    } else {
      // No match found, clear the timeout and the search term.
      clearTimeout(this._searchTimeout);
      this._searchString = '';
    }
  }

  private _selectByKeyboard(): void {
    const activeOption: SbbOptionElement = this._filteredOptions[this._activeItemIndex];

    if (this.multiple) {
      activeOption.setSelectedViaUserInteraction(!activeOption.selected);
    } else {
      this.close();
    }
  }

  private _setNextActiveOption(event: KeyboardEvent, index?: number): void {
    const nextIndex =
      index ?? getNextElementIndex(event, this._activeItemIndex, this._filteredOptions.length);
    const nextOption = this._filteredOptions[nextIndex];
    const activeOption = this._filteredOptions[this._activeItemIndex];

    this._setActiveElement(nextOption, activeOption);

    if (!this.multiple) {
      this._setSelectedElement(nextOption, activeOption);
    } else if (event?.shiftKey) {
      nextOption.setSelectedViaUserInteraction(!nextOption.selected);
    }
    this._activeItemIndex = nextIndex;
  }

  private _setActiveElement(
    nextActiveOption: SbbOptionElement,
    lastActiveOption: SbbOptionElement | null = null,
    setActiveDescendant = true,
  ): void {
    nextActiveOption.setActive(true);
    nextActiveOption.scrollIntoView({ block: 'nearest' });

    if (setActiveDescendant) {
      this._triggerElement.setAttribute('aria-activedescendant', nextActiveOption.id);
    }

    // Reset the previous
    if (lastActiveOption && lastActiveOption !== nextActiveOption) {
      lastActiveOption.setActive(false);
    }
  }

  private _setSelectedElement(
    nextActiveOption: SbbOptionElement,
    lastActiveOption: SbbOptionElement,
  ): void {
    nextActiveOption.setSelectedViaUserInteraction(true);

    if (lastActiveOption && lastActiveOption !== nextActiveOption) {
      lastActiveOption.setSelectedViaUserInteraction(false);
    }
  }

  private _resetActiveElement(): void {
    const activeElement = this._filteredOptions[this._activeItemIndex];

    if (activeElement) {
      activeElement.setActive(false);
    }
    this._activeItemIndex = -1;
    this._triggerElement.removeAttribute('aria-activedescendant');
  }

  // Check if the pointerdown event target is triggered on the menu.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnMenu = isEventOnElement(this._overlay, event);
  };

  // Close menu on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (!this._isPointerDownEventOnMenu && !isEventOnElement(this._overlay, event)) {
      this.close();
    }
  };

  private _setValueFromSelected(): void {
    const selected = this._getSelected();

    if (Array.isArray(selected)) {
      if (selected && selected.length > 0) {
        const value: string[] = [];
        for (const option of selected) {
          value.push(option.value!);
        }
        this.value = value;
      }
    } else if (selected) {
      this._activeItemIndex = this._filteredOptions.findIndex((option) => option === selected);
      this.value = selected.value;
    }
  }

  private _getSelected(): SbbOptionElement | SbbOptionElement[] | null {
    if (this.multiple) {
      return this._filteredOptions.filter((option) => option.selected);
    } else {
      return this._filteredOptions.find((option) => option.selected) ?? null;
    }
  }

  private _toggleOpening(): void {
    if (this.disabled || this.formDisabled || this.readonly) {
      return;
    }
    this._triggerElement?.focus();

    switch (this.state) {
      case 'opened': {
        this.close();
        break;
      }
      case 'closed': {
        this.open();
        break;
      }
      default:
        break;
    }
  }

  private _spreadDeferredDisplayValue(
    placeholder: TemplateResult,
  ): (TemplateResult | Promise<TemplateResult>)[] {
    return [this._deferredDisplayValue(placeholder), placeholder];
  }

  private async _deferredDisplayValue(placeholder: TemplateResult): Promise<TemplateResult> {
    if (this.hydrationRequired) {
      await this.hydrationComplete;
    }
    return this._displayValue ? html`${this._displayValue}` : placeholder;
  }

  protected override render(): TemplateResult {
    return html`
      <!-- This element is visually hidden and will be appended to the light DOM to allow screen
      readers to work properly -->
      <div
        class="sbb-screen-reader-only"
        tabindex=${this.disabled || this.formDisabled ? nothing : '0'}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-required=${this.required.toString()}
        aria-controls=${this._overlayId}
        aria-owns=${this._overlayId}
        @keydown=${this._onKeyDown}
        @click=${this._toggleOpening}
        ${ref((ref) => (this._triggerElement = ref as HTMLElement))}
      >
        ${until(...this._spreadDeferredDisplayValue(html`<span>${this.placeholder}</span>`))}
      </div>

      <!-- Visually display the value -->
      <div class="sbb-select__trigger" aria-hidden="true">
        ${until(
          ...this._spreadDeferredDisplayValue(
            html`<span class="sbb-select__trigger--placeholder">${this.placeholder}</span>`,
          ),
        )}
      </div>

      <div class="sbb-select__gap-fix"></div>
      <div class="sbb-select__container" popover="manual">
        <div class="sbb-select__gap-fix">${overlayGapFixCorners()}</div>
        <div
          @animationend=${this._onAnimationEnd}
          class="sbb-select__panel"
          ${ref((dialogRef) => (this._overlay = dialogRef as HTMLElement))}
        >
          <div class="sbb-select__wrapper">
            <div
              id=${!ariaRoleOnHost ? this._overlayId : nothing}
              class="sbb-select__options"
              role=${!ariaRoleOnHost ? 'listbox' : nothing}
              ?aria-multiselectable=${this.multiple}
              ${ref((containerRef) => (this._optionContainer = containerRef as HTMLElement))}
            >
              <slot @slotchange=${this._setValueFromSelected}></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-select': SbbSelectElement;
  }
}
