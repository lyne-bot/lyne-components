import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { until } from 'lit/directives/until.js';

import { getNextElementIndex } from '../core/a11y.js';
import { SbbOpenCloseBaseElement } from '../core/base-elements.js';
import { SbbConnectedAbortController } from '../core/controllers.js';
import { hostAttributes } from '../core/decorators.js';
import { isNextjs, isSafari } from '../core/dom.js';
import { EventEmitter } from '../core/eventing.js';
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
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 * @event {CustomEvent<void>} change - Notifies that the component's value has changed.
 * @event {CustomEvent<void>} input - Notifies that an option value has been selected.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-select` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-select` is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the `sbb-select` begins the closing transition. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits whenever the `sbb-select` is closed.
 * @cssprop [--sbb-select-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@customElement('sbb-select')
@hostAttributes({
  role: ariaRoleOnHost ? 'listbox' : null,
})
export class SbbSelectElement extends SbbUpdateSchedulerMixin(
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

  // FIXME using ...super.events requires: https://github.com/sbb-design-systems/lyne-components/issues/2600
  public static override readonly events = {
    didChange: 'didChange',
    change: 'change',
    input: 'input',
    stateChange: 'stateChange',
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;

  /** The placeholder used if no value has been selected. */
  @property() public placeholder?: string;

  /** Whether the select allows for multiple selection. */
  @property({ reflect: true, type: Boolean }) public multiple = false;

  /** Whether the select is readonly. */
  @property({ type: Boolean }) public readonly = false;

  /** The value displayed by the component. */
  @state() private _displayValue: string | null = null;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter(this, SbbSelectElement.events.didChange);

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
  private _overlayId = `sbb-select-${++nextId}`;
  private _activeItemIndex = -1;
  private _searchTimeout?: ReturnType<typeof setTimeout>;
  private _searchString = '';
  private _didLoad = false;
  private _isPointerDownEventOnMenu: boolean = false;
  private _abort = new SbbConnectedAbortController(this);

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

    new MutationController(this, {
      config: { attributeFilter: ['aria-labelledby'] },
      callback: (mutationsList: MutationRecord[]) => this._onSelectAttributesChange(mutationsList),
    });
  }

  /**
   * TODO: Accessibility fix required to correctly read the label;
   * can be possibly removed after the merge of https://github.com/sbb-design-systems/lyne-components/issues/3062
   */
  private _onSelectAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'aria-labelledby') {
        this._triggerElement?.setAttribute(
          'aria-labelledby',
          this.getAttribute('aria-labelledby')!,
        );
      }
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
    this.state = 'opening';
    this._setOverlayPosition();
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
    this._openPanelEventsController.abort();
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

  private _onOptionClick(event: MouseEvent): void {
    const target = event.target as SbbSelectElement | SbbOptionElement;
    if (target.localName !== 'sbb-option' || target.disabled) {
      return;
    }

    if (!this.multiple) {
      this.close();
    }
  }

  /** Sets the _displayValue by checking the internal sbb-options and setting the correct `selected` value on them. */
  private _onValueChanged(newValue: string | string[]): void {
    const options = this._filteredOptions;
    if (!Array.isArray(newValue)) {
      const optionElement = options.find((o) => (o.value ?? o.getAttribute('value')) === newValue);
      if (optionElement) {
        optionElement.selected = true;
      }
      options
        .filter((o) => (o.value ?? o.getAttribute('value')) !== newValue)
        .forEach((o) => (o.selected = false));
      this._displayValue = optionElement?.textContent || null;
    } else {
      options
        .filter((o) => !newValue.includes(o.value ?? o.getAttribute('value')))
        .forEach((e) => (e.selected = false));
      const selectedOptionElements = options.filter((o) =>
        newValue.includes(o.value ?? o.getAttribute('value')),
      );
      selectedOptionElements.forEach((o) => (o.selected = true));
      this._displayValue = selectedOptionElements.map((o) => o.textContent).join(', ') || null;
    }
    this._stateChange.emit({ type: 'value', value: newValue });
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

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

    const signal = this._abort.signal;
    const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');

    if (formField) {
      this.negative = formField.hasAttribute('negative');
    }
    this._syncProperties();

    if (this._didLoad) {
      this._setupOrigin();
      this._setupTrigger();
    }
    if (this.value) {
      this._onValueChanged(this.value);
    }

    this.addEventListener(
      'optionSelectionChange',
      (e: CustomEvent<void>) => this._onOptionChanged(e),
      { signal },
    );
    this.addEventListener(
      'click',
      (e: MouseEvent) => {
        this._onOptionClick(e);
        this._toggleOpening();
      },
      { signal },
    );
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
      this._onOpenAnimationEnd();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._onCloseAnimationEnd();
    }
  }

  private _onOpenAnimationEnd(): void {
    this.state = 'opened';
    this._attachOpenPanelEvents();
    this._triggerElement.setAttribute('aria-expanded', 'true');

    this.didOpen.emit();
  }

  private _onCloseAnimationEnd(): void {
    this.state = 'closed';
    this._triggerElement.setAttribute('aria-expanded', 'false');
    this._resetActiveElement();
    this._optionContainer.scrollTop = 0;
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
    this._didChange.emit();
  }

  /** When an option is unselected in `multiple`, removes it from value and updates displayValue. */
  private _onOptionDeselected(optionSelectionChange: SbbOptionElement): void {
    if (this.multiple) {
      this.value = (this.value as string[]).filter(
        (el: string) => el !== optionSelectionChange.value,
      );

      this._input.emit();
      this._change.emit();
      this._didChange.emit();
    }
  }

  private _attachOpenPanelEvents(): void {
    this._openPanelEventsController = new AbortController();

    // Recalculate the overlay position on scroll and window resize
    document.addEventListener('scroll', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
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
    }
    if (this.state === 'closed') {
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
      case 'Escape':
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

  private _setValueFromSelectedOption(): void {
    if (!this.multiple) {
      const selectedOption = this._filteredOptions.find((option) => option.selected);
      if (selectedOption) {
        this._activeItemIndex = this._filteredOptions.findIndex(
          (option) => option === selectedOption,
        );
        this.value = selectedOption.value;
      }
    } else {
      const options = this._filteredOptions.filter((option) => option.selected);
      if (options && options.length > 0) {
        const value: string[] = [];
        for (const option of options) {
          value.push(option.value!);
        }
        this.value = value;
      }
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
      <div class="sbb-select__container">
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
              <slot @slotchange=${this._setValueFromSelectedOption}></slot>
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
