import {
  type CSSResultGroup,
  html,
  isServer,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { SbbOpenCloseBaseElement } from '../core/base-elements.js';
import { SbbConnectedAbortController } from '../core/controllers.js';
import { forceType, hostAttributes } from '../core/decorators.js';
import { findReferencedElement, isSafari, isZeroAnimationDuration } from '../core/dom.js';
import { SbbNegativeMixin, SbbHydrationMixin } from '../core/mixins.js';
import {
  isEventOnElement,
  overlayGapFixCorners,
  removeAriaComboBoxAttributes,
  setOverlayPosition,
} from '../core/overlay.js';
import type { SbbOptionBaseElement } from '../option.js';

import style from './autocomplete-base-element.scss?lit&inline';

/**
 * On Safari, the aria role 'listbox' must be on the host element, or else VoiceOver won't work at all.
 * On the other hand, JAWS and NVDA need the role to be "closer" to the options, or else optgroups won't work.
 */
const ariaRoleOnHost = isSafari;

/**
 * Custom event emitted on the input when an option is selected
 */
export const inputAutocompleteEvent = 'inputAutocomplete';

export
@hostAttributes({
  popover: 'manual',
})
abstract class SbbAutocompleteBaseElement extends SbbNegativeMixin(
  SbbHydrationMixin(SbbOpenCloseBaseElement),
) {
  public static override styles: CSSResultGroup = style;

  /**
   * The element where the autocomplete will attach; accepts both an element's id or an HTMLElement.
   * If not set, it will search for the first 'sbb-form-field' ancestor.
   */
  @property() public accessor origin: string | HTMLElement | null = null;

  /**
   * The input element that will trigger the autocomplete opening; accepts both an element's id or an HTMLElement.
   * By default, the autocomplete will open on focus, click, input or `ArrowDown` keypress of the 'trigger' element.
   * If not set, will search for the first 'input' child of a 'sbb-form-field' ancestor.
   */
  @property() public accessor trigger: string | HTMLInputElement | null = null;

  /** Whether the icon space is preserved when no icon is set. */
  @forceType()
  @property({ attribute: 'preserve-icon-space', reflect: true, type: Boolean })
  public accessor preserveIconSpace: boolean = false;

  /** Returns the element where autocomplete overlay is attached to. */
  public get originElement(): HTMLElement {
    if (!this._originElement) {
      this._originElement = this._findOriginElement();
    }
    return this._originElement;
  }
  private _originElement?: HTMLElement;

  /** Returns the trigger element. */
  public get triggerElement(): HTMLInputElement | undefined {
    return this._triggerElement;
  }
  private _triggerElement: HTMLInputElement | undefined;

  protected abstract overlayId: string;
  protected abstract panelRole: string;
  /** @deprecated No longer used internally. */
  protected abort = new SbbConnectedAbortController(this);
  private _overlay!: HTMLElement;
  private _optionContainer!: HTMLElement;
  private _triggerEventsController!: AbortController;
  private _openPanelEventsController!: AbortController;
  private _didLoad = false;
  private _isPointerDownEventOnMenu: boolean = false;

  protected abstract get options(): SbbOptionBaseElement[];
  protected abstract syncNegative(): void;
  protected abstract setTriggerAttributes(element: HTMLInputElement): void;
  protected abstract openedPanelKeyboardInteraction(event: KeyboardEvent): void;
  protected abstract selectByKeyboard(event: KeyboardEvent): void;
  protected abstract setNextActiveOption(event: KeyboardEvent): void;
  protected abstract resetActiveElement(): void;

  /** Opens the autocomplete. */
  public open(): void {
    if (
      this.state !== 'closed' ||
      !this._overlay ||
      this.options.length === 0 ||
      this._readonly()
    ) {
      return;
    }
    if (!this.willOpen.emit()) {
      return;
    }

    this.showPopover?.();
    this.state = 'opening';
    this._setOverlayPosition();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /** Closes the autocomplete. */
  public close(): void {
    if (this.state !== 'opened') {
      return;
    }
    if (!this.willClose.emit()) {
      return;
    }

    this.state = 'closing';
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

  public override connectedCallback(): void {
    super.connectedCallback();
    if (ariaRoleOnHost) {
      this.id ||= this.overlayId;
    }
    const formField = this.closest('sbb-form-field') ?? this.closest('[data-form-field]');

    if (formField) {
      this.negative = formField.hasAttribute('negative');
    }

    if (this._didLoad) {
      this._componentSetup();
    }
    this.syncNegative();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (
      (changedProperties.has('origin') && this.origin !== changedProperties.get('origin')) ||
      (changedProperties.has('trigger') && this.trigger !== changedProperties.get('trigger'))
    ) {
      this._componentSetup();
    }
    if (changedProperties.has('negative')) {
      this.syncNegative();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._componentSetup();
    this._didLoad = true;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._triggerEventsController?.abort();
    this._openPanelEventsController?.abort();
  }

  /** When an option is selected, update the input value and close the autocomplete. */
  protected onOptionSelected(event: CustomEvent): void {
    const target = event.target as SbbOptionBaseElement;
    if (!target.selected) {
      return;
    }

    // Deselect the previous options
    this.options
      .filter((option) => option.id !== target.id && option.selected)
      .forEach((option) => (option.selected = false));

    if (this.triggerElement) {
      // Set the option value
      // In order to support React onChange event, we have to get the setter and call it.
      // https://github.com/facebook/react/issues/11600#issuecomment-345813130
      const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
      setValue.call(this.triggerElement, target.value);

      // Manually trigger the change events
      this.triggerElement.dispatchEvent(new Event('change', { bubbles: true }));
      this.triggerElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

      // Custom input event emitted when input value changes after an option is selected
      this.triggerElement.dispatchEvent(new Event(inputAutocompleteEvent));
      this.triggerElement.focus();
    }

    this.close();
  }

  private _handleSlotchange(): void {
    this._highlightOptions(this.triggerElement?.value);
    this._openOnNewOptions();
  }

  /**
   * If the 'input' is focused and there's a change in the number of options, open the autocomplete
   */
  private _openOnNewOptions(): void {
    if (document?.activeElement === this.triggerElement) {
      if (this.options.length > 0) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  /** The autocomplete should inherit 'readonly' state from the trigger. */
  private _readonly(): boolean {
    return this.triggerElement?.hasAttribute('readonly') ?? false;
  }

  private _componentSetup(): void {
    if (isServer) {
      return;
    }
    this._triggerEventsController?.abort();
    this._openPanelEventsController?.abort();

    this._originElement = undefined;
    this.toggleAttribute(
      'data-option-panel-origin-borderless',
      !!this.closest?.('sbb-form-field')?.hasAttribute('borderless'),
    );

    this._bindTo(this._getTriggerElement());
  }

  /**
   * Retrieve the element where the autocomplete will be attached.
   * @returns 'origin' or the first 'sbb-form-field' ancestor.
   */
  private _findOriginElement(): HTMLElement {
    let result: HTMLElement | undefined | null;

    if (!this.origin) {
      result = this.closest?.('sbb-form-field')?.shadowRoot?.querySelector?.('#overlay-anchor');
    } else {
      result = findReferencedElement(this.origin);
    }

    if (!result) {
      throw new Error(
        'Cannot find the origin element. Please specify a valid element or read the "origin" prop documentation',
      );
    }

    return result;
  }

  /**
   * Retrieve the element that will trigger the autocomplete opening.
   * @returns 'trigger' or the first 'input' inside the origin element.
   */
  private _getTriggerElement(): HTMLInputElement {
    if (!this.trigger) {
      return this.closest?.('sbb-form-field')?.querySelector('input') as HTMLInputElement;
    }

    const result = findReferencedElement<HTMLInputElement>(this.trigger);

    if (!result) {
      throw new Error(
        'Cannot find the trigger element. Please specify a valid element or read the "trigger" prop documentation',
      );
    }

    return result;
  }

  private _bindTo(triggerElem: HTMLInputElement): void {
    if (!triggerElem) {
      return;
    }

    // Reset attributes to the old trigger and add them to the new one
    this._removeTriggerAttributes(this.triggerElement);
    this.setTriggerAttributes(triggerElem);

    this._triggerElement = triggerElem;

    this._setupTriggerEvents();
  }

  private _setupTriggerEvents(): void {
    this._triggerEventsController = new AbortController();

    // Open the overlay on focus, click, input and `ArrowDown` event
    this.triggerElement?.addEventListener('focus', () => this.open(), {
      signal: this._triggerEventsController.signal,
    });
    this.triggerElement?.addEventListener('click', () => this.open(), {
      signal: this._triggerEventsController.signal,
    });
    this.triggerElement?.addEventListener(
      'input',
      (event) => {
        this.open();
        this._highlightOptions((event.target as HTMLInputElement).value);
      },
      { signal: this._triggerEventsController.signal },
    );
    this.triggerElement?.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this._closedPanelKeyboardInteraction(event),
      {
        signal: this._triggerEventsController.signal,
        // We need key event to run before any other subscription to guarantee a correct
        // interaction with other components (necessary for the 'sbb-chip-group' use case).
        capture: true,
      },
    );
  }

  // Set overlay position, width and max height
  private _setOverlayPosition(): void {
    setOverlayPosition(
      this._overlay,
      this.originElement,
      this._optionContainer,
      this.shadowRoot!.querySelector('.sbb-autocomplete__container')!,
      this,
    );
  }

  /**
   * On open/close animation end.
   * In rare cases it can be that the animationEnd event is triggered twice.
   * To avoid entering a corrupt state, exit when state is not expected.
   */
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
    this.triggerElement?.setAttribute('aria-expanded', 'true');
    this.didOpen.emit();
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.hidePopover?.();
    this.triggerElement?.setAttribute('aria-expanded', 'false');
    this.resetActiveElement();
    this._optionContainer.scrollTop = 0;
    this.didClose.emit();
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

    // Close autocomplete on backdrop click
    window.addEventListener('pointerdown', (ev) => this._pointerDownListener(ev), {
      signal: this._openPanelEventsController.signal,
    });
    window.addEventListener('pointerup', (ev) => this._closeOnBackdropClick(ev), {
      signal: this._openPanelEventsController.signal,
    });

    // Keyboard interactions
    this.triggerElement?.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this.openedPanelKeyboardInteraction(event),
      {
        signal: this._openPanelEventsController.signal,
        // We need key event to run before any other subscription to guarantee a correct
        // interaction with other components (necessary for the 'sbb-chip-group' use case).
        capture: true,
      },
    );
  }

  // Check if the pointerdown event target is triggered on the menu.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnMenu = isEventOnElement(this._overlay, event);
  };

  // If the click is outside the autocomplete, closes the panel.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (
      !this._isPointerDownEventOnMenu &&
      !isEventOnElement(this._overlay, event) &&
      !isEventOnElement(this.originElement, event)
    ) {
      this.close();
    }
  };

  private _closedPanelKeyboardInteraction(event: KeyboardEvent): void {
    if (this.state !== 'closed') {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case 'ArrowDown':
      case 'ArrowUp':
        this.open();
        break;
    }
  }

  /** Highlight the searched text on the options. */
  private _highlightOptions(searchTerm?: string): void {
    if (searchTerm === null || searchTerm === undefined) {
      return;
    }
    this.options.forEach((option) => option.highlight(searchTerm));
  }

  private _removeTriggerAttributes(element?: HTMLInputElement): void {
    removeAriaComboBoxAttributes(element);
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-autocomplete__gap-fix"></div>
      <div class="sbb-autocomplete__container">
        <div class="sbb-autocomplete__gap-fix">${overlayGapFixCorners()}</div>
        <div
          @animationend=${this._onAnimationEnd}
          class="sbb-autocomplete__panel"
          ?data-open=${this.state === 'opened' || this.state === 'opening'}
          ${ref((overlayRef?: Element) => (this._overlay = overlayRef as HTMLElement))}
        >
          <div class="sbb-autocomplete__wrapper">
            <div
              class="sbb-autocomplete__options"
              role=${!ariaRoleOnHost ? this.panelRole : nothing}
              id=${!ariaRoleOnHost ? this.overlayId : nothing}
              ${ref((containerRef) => (this._optionContainer = containerRef as HTMLElement))}
            >
              <slot @slotchange=${this._handleSlotchange}></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
