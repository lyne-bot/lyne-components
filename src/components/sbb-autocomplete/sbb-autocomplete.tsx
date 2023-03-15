import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { getNextElementIndex } from '../../global/helpers/arrow-navigation';
import { assignId } from '../../global/helpers/assign-id';
import {
  removeAriaComboBoxAttributes,
  setAriaComboBoxAttributes,
} from '../../global/helpers/overlay-trigger-attributes';
import { getElementPosition, isEventOnElement } from '../../global/helpers/position';
import { SbbOptionSelectionChange } from '../sbb-option/sbb-option.custom';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

type SbbAutocompleteState = 'closed' | 'opening' | 'opened' | 'closing';

let nextId = 0;

/**
 * @slot unnamed - Use this slot to project options.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-autocomplete.scss',
  tag: 'sbb-autocomplete',
})
export class SbbAutocomplete implements ComponentInterface {
  /**
   * The element where the autocomplete will attach; accepts both a string (id of an element) or an HTML element.
   *
   * If not set, will search for the first 'sbb-form-field' ancestor.
   */
  @Prop() public origin: string | HTMLElement;

  /**
   * The element that will trigger the autocomplete opening; accepts both a string (id of an element) or an HTML element.
   * By default, the autocomplete will open on focus of the 'trigger' element.
   *
   * If not set, will search for the first 'input' child of a 'sbb-form-field' ancestor.
   */
  @Prop() public trigger: string | HTMLInputElement;

  /** Whether the animation is disabled. */
  @Prop({ reflect: true }) public disableAnimation = false;

  /** Whether the icon space is preserved when no icon is set. */
  @Prop({ reflect: true }) public preserveIconSpace: boolean;

  /** The state of the autocomplete. */
  @State() private _state: SbbAutocompleteState = 'closed';

  /** Emits whenever the autocomplete starts the opening transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /** Emits whenever the autocomplete is opened. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /** Emits whenever the autocomplete begins the closing transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /** Emits whenever the autocomplete is closed. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  @Element() private _element!: HTMLElement;

  private _dialog: HTMLElement;
  private _optionContainer: HTMLElement;
  private _originElement: HTMLElement;
  private _triggerElement: HTMLInputElement;
  private _triggerEventsController: AbortController;
  private _openPanelEventsController: AbortController;
  private _overlayId = `sbb-autocomplete-${++nextId}`;
  private _activeItemIndex = -1;

  private get _options(): HTMLSbbOptionElement[] {
    return Array.from(this._element.querySelectorAll('sbb-option')) as HTMLSbbOptionElement[];
  }

  /** Opens the autocomplete. */
  @Method()
  public async open(): Promise<void> {
    if (this._state !== 'closed' || !this._dialog || this._options.length === 0) {
      return;
    }

    this._state = 'opening';
    this.willOpen.emit();
    this._setOverlayPosition();
    toggleDatasetEntry(this._originElement, 'autocompleteOpen', true);
  }

  /** Closes the autocomplete. */
  @Method()
  public async close(): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    this._state = 'closing';
    this.willClose.emit();
    this._openPanelEventsController.abort();
  }

  /** Removes trigger click listener on trigger change. */
  @Watch('origin')
  public removeTriggerClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement
  ): void {
    if (newValue !== oldValue) {
      this._componentSetup();
    }
  }

  /** When an option is selected, update the input value and close the autocomplete. */
  @Listen('option-did-select')
  public onOptionSelected(event: CustomEvent<SbbOptionSelectionChange>): void {
    // Deselect the previous options
    this._options
      .filter((option) => option.id !== event.detail.id)
      .forEach((option) => (option.selected = false));

    // Set the option value
    this._triggerElement.value = event.detail.value;

    this._triggerElement.dispatchEvent(
      new window.Event('change', { bubbles: true, composed: false })
    );
    this._triggerElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

    this.close();
  }

  public connectedCallback(): void {
    this._componentSetup();
  }

  public disconnectedCallback(): void {
    this._triggerEventsController?.abort();
    this._openPanelEventsController?.abort();
  }

  private _componentSetup(): void {
    this._triggerEventsController?.abort();
    this._openPanelEventsController?.abort();

    this._attachTo(this._getOriginElement());
    this._bindTo(this._getTriggerElement());
  }

  /**
   * Retrieve the element where the autocomplete will be attached.
   * @returns 'anchor' or the first 'sbb-form-field' ancestor.
   */
  private _getOriginElement(): HTMLElement {
    if (!this.origin) {
      return this._element.closest('sbb-form-field') as HTMLSbbFormFieldElement;
    }

    const result =
      typeof this.origin === 'string' ? document.getElementById(this.origin) : this.origin;

    if (!result) {
      throw new Error(
        'Cannot find the origin element. Please specify a valid element or read the "origin" prop documentation'
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
      return this._element.closest('sbb-form-field')?.querySelector('input') as HTMLInputElement;
    }

    const result =
      typeof this.trigger === 'string'
        ? (document.getElementById(this.trigger) as HTMLInputElement)
        : this.trigger;

    if (!result) {
      throw new Error(
        'Cannot find the trigger element. Please specify a valid element or read the "trigger" prop documentation'
      );
    }

    return result;
  }

  private _attachTo(anchorElem: HTMLElement): void {
    if (!anchorElem) {
      return;
    }

    // Reset attributes to the old anchor and add them to the new one
    this._removeOriginAttributes(this._originElement);
    this._setOriginAttributes(anchorElem);

    this._originElement = anchorElem;

    toggleDatasetEntry(
      this._element,
      'autocompleteOriginBorderless',
      this._originElement.hasAttribute('borderless')
    );
  }

  private _bindTo(triggerElem: HTMLInputElement): void {
    if (!triggerElem) {
      return;
    }

    // Reset attributes to the old trigger and add them to the new one
    this._removeTriggerAttributes(this._triggerElement);
    this._setTriggerAttributes(triggerElem);

    this._triggerElement = triggerElem;

    this._setupTriggerEvents();
  }

  private _setupTriggerEvents(): void {
    this._triggerEventsController = new AbortController();

    // Open the overlay on focus, input and arrow down event
    this._triggerElement.addEventListener('focus', () => this.open(), {
      signal: this._triggerEventsController.signal,
    });
    this._triggerElement.addEventListener('input', () => this.open(), {
      signal: this._triggerEventsController.signal,
    });
    this._triggerElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
          this.open();
        }
      },
      {
        signal: this._triggerEventsController.signal,
      }
    );

    // On input change, highlight the options label
    this._triggerElement.addEventListener(
      'input',
      (ev) => this._highlightOptions((ev.target as HTMLInputElement).value),
      {
        signal: this._triggerEventsController.signal,
      }
    );
  }

  // Set overlay position, width and max height
  private _setOverlayPosition(): void {
    if (!this._dialog || !this._originElement) {
      return;
    }

    // Set the width to match the trigger element
    this._element.style.setProperty('--sbb-overlay-width', `${this._originElement.offsetWidth}px`);

    // Set the origin height
    this._element.style.setProperty(
      '--sbb-overlay-origin-height',
      `${this._originElement.offsetHeight}px`
    );

    // Calculate and set the position
    const panelPosition = getElementPosition(this._optionContainer, this._originElement);

    this._element.style.setProperty('--sbb-overlay-position-x', `${panelPosition.left}px`);
    this._element.style.setProperty('--sbb-overlay-position-y', `${panelPosition.top}px`);
    this._element.style.setProperty('--sbb-overlay-max-height', panelPosition.maxHeight);
    this._element.setAttribute('data-autocomplete-position', panelPosition.alignment.vertical);
    this._originElement.setAttribute(
      'data-autocomplete-position',
      panelPosition.alignment.vertical
    );
  }

  /** On open/close animation end. */
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open') {
      this._onOpenAnimationEnd();
    } else if (event.animationName === 'close') {
      this._onCloseAnimationEnd();
    }
  }

  private _onOpenAnimationEnd(): void {
    this._state = 'opened';
    this._attachOpenPanelEvents();
    this._triggerElement?.setAttribute('aria-expanded', 'true');
    this.didOpen.emit();
  }

  private _onCloseAnimationEnd(): void {
    this._state = 'closed';
    this._triggerElement?.setAttribute('aria-expanded', 'false');
    toggleDatasetEntry(this._originElement, 'autocompleteOpen', false);
    this._resetActiveElement();
    this.didClose.emit();
  }

  private _attachOpenPanelEvents(): void {
    this._openPanelEventsController = new AbortController();

    // Since the overlay is in 'fixed' position, we need to recalculate its position on window scroll/resize
    document.addEventListener('scroll', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
    });
    window.addEventListener('resize', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
    });

    window.addEventListener('click', this._onBackdropClick, {
      signal: this._openPanelEventsController.signal,
    });

    // Keyboard interactions
    this._triggerElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this._onKeydownEvent(event),
      {
        signal: this._openPanelEventsController.signal,
      }
    );
  }

  /**
   * If the click is outside the autocomplete, close the panel
   */
  private _onBackdropClick = (event: PointerEvent): void => {
    if (!isEventOnElement(this._dialog, event) && !isEventOnElement(this._originElement, event)) {
      this.close();
    }
  };

  private _onKeydownEvent(event: KeyboardEvent): void {
    if (this._state !== 'opened') {
      return;
    }

    switch (event.key) {
      case 'Escape':
      case 'Tab':
        this.close();
        break;

      case 'Enter':
        this._selectByKeyboard();
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        this._setNextActiveOption(event);
        break;

      default:
        break;
    }
  }

  private _selectByKeyboard(): void {
    const activeOption = this._options[this._activeItemIndex];

    if (activeOption) {
      activeOption.selected = true;
    }
  }

  private _setNextActiveOption(event: KeyboardEvent): void {
    const options: HTMLSbbOptionElement[] = this._options;

    // Get the previous and the next active option
    const last = this._activeItemIndex;
    const lastActiveOption = options[last];
    const next = getNextElementIndex(event, this._activeItemIndex, options.length);
    const nextActiveOption = options[next];

    // Activate the next
    nextActiveOption.active = true;
    this._triggerElement.setAttribute('aria-activedescendant', nextActiveOption.id);
    nextActiveOption.scrollIntoView({ block: 'nearest' });

    // Reset the previous
    if (lastActiveOption) {
      lastActiveOption.active = false;
    }

    this._activeItemIndex = next;
  }

  private _resetActiveElement(): void {
    const activeElement = this._options[this._activeItemIndex];

    if (activeElement) {
      activeElement.active = false;
    }
    this._activeItemIndex = -1;
    this._triggerElement.removeAttribute('aria-activedescendant');
  }

  /** Projects the search term on the options. */
  private _highlightOptions(searchTerm: string): void {
    this._options.forEach((option) => option.highlight(searchTerm));
  }

  private _setOriginAttributes(element: HTMLElement): void {
    // These attributes are used to handle visual effects
    toggleDatasetEntry(element, 'autocompleteOrigin', true);
    toggleDatasetEntry(element, 'autocompleteOpen', false);
    toggleDatasetEntry(element, 'autocompleteDisableAnimation', this.disableAnimation);
  }

  private _removeOriginAttributes(element: HTMLElement): void {
    element?.removeAttribute('data-autocomplete-origin');
    element?.removeAttribute('data-autocomplete-open');
    element?.removeAttribute('data-autocomplete-disable-animation');
  }

  private _setTriggerAttributes(element: HTMLInputElement): void {
    setAriaComboBoxAttributes(element, this._element.id || this._overlayId, false);
  }

  private _removeTriggerAttributes(element: HTMLInputElement): void {
    removeAriaComboBoxAttributes(element);
  }

  public render(): JSX.Element {
    return (
      <Host role="listbox" data-state={this._state} ref={assignId(() => this._overlayId)}>
        <div class="sbb-autocomplete__backdrop">
          <div
            onAnimationEnd={(event: AnimationEvent) => this._onAnimationEnd(event)}
            class="sbb-autocomplete__panel"
            data-open={this._state === 'opened' || this._state === 'opening'}
            ref={(dialogRef) => (this._dialog = dialogRef)}
          >
            <div
              class="sbb-autocomplete__options"
              ref={(containerRef) => (this._optionContainer = containerRef)}
            >
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
