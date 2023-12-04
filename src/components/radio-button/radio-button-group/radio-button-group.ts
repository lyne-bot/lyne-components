import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { isArrowKeyPressed, getNextElementIndex, interactivityChecker } from '../../core/a11y';
import { toggleDatasetEntry, setAttribute, isValidAttribute } from '../../core/dom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
  EventEmitter,
  ConnectedAbortController,
} from '../../core/eventing';
import { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces';
import type {
  SbbRadioButtonElement,
  SbbRadioButtonSize,
  SbbRadioButtonStateChange,
} from '../radio-button';

import style from './radio-button-group.scss?lit&inline';

export type SbbRadioButtonGroupEventDetail = {
  value: any | null;
  radioButton: SbbRadioButtonElement;
};

/**
 * It can be used as a container for one or more `sbb-radio-button`.
 *
 * @slot - Use the unnamed slot to add `sbb-radio-button` elements to the `sbb-radio-button-group`.
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 * @event {CustomEvent<SbbRadioButtonGroupEventDetail>} didChange - Deprecated. Only used for React. Will probably be removed once React 19 is available. Emits whenever the `sbb-radio-group` value changes.
 * @event {CustomEvent<SbbRadioButtonGroupEventDetail>} change - Emits whenever the `sbb-radio-group` value changes.
 * @event {CustomEvent<SbbRadioButtonGroupEventDetail>} input - Emits whenever the `sbb-radio-group` value changes.
 */
@customElement('sbb-radio-button-group')
export class SbbRadioButtonGroupElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
    change: 'change',
    input: 'input',
  } as const;

  /**
   * Whether the radios can be deselected.
   */
  @property({ attribute: 'allow-empty-selection', type: Boolean })
  public allowEmptySelection: boolean = false;

  /**
   * Whether the radio group is disabled.
   */
  @property({ type: Boolean }) public disabled: boolean = false;

  /**
   * Whether the radio group is required.
   */
  @property({ type: Boolean }) public required: boolean = false;

  /**
   * The value of the radio group.
   */
  @property() public value?: any | null;

  /**
   * Size variant, either m or s.
   */
  @property() public size: SbbRadioButtonSize = 'm';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @property({ attribute: 'horizontal-from', reflect: true })
  public horizontalFrom?: SbbHorizontalFrom;

  /**
   * Radio group's orientation, either horizontal or vertical.
   */
  @property({ reflect: true })
  public orientation: SbbOrientation = 'horizontal';

  /**
   * List of contained radio buttons.
   */
  public get radioButtons(): SbbRadioButtonElement[] {
    return (
      Array.from(this.querySelectorAll?.('sbb-radio-button') ?? []) as SbbRadioButtonElement[]
    ).filter((el) => el.closest?.('sbb-radio-button-group') === this);
  }

  private get _enabledRadios(): SbbRadioButtonElement[] | undefined {
    if (!this.disabled) {
      return this.radioButtons.filter((r) => !r.disabled && interactivityChecker.isVisible(r));
    }
  }

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @state() private _namedSlots = createNamedSlotState('error');

  private _hasSelectionPanel: boolean;
  private _didLoad = false;
  private _abort = new ConnectedAbortController(this);

  private _valueChanged(value: any | undefined): void {
    for (const radio of this.radioButtons) {
      radio.checked = radio.value === value;
      radio.tabIndex = this._getRadioTabIndex(radio);
    }
    this._setFocusableRadio();
  }

  /**
   * Emits whenever the `sbb-radio-group` value changes.
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter<SbbRadioButtonGroupEventDetail>(
    this,
    SbbRadioButtonGroupElement.events.didChange,
  );

  /**
   * Emits whenever the `sbb-radio-group` value changes.
   */
  private _change: EventEmitter = new EventEmitter<SbbRadioButtonGroupEventDetail>(
    this,
    SbbRadioButtonGroupElement.events.change,
  );

  /**
   * Emits whenever the `sbb-radio-group` value changes.
   */
  private _input: EventEmitter = new EventEmitter<SbbRadioButtonGroupEventDetail>(
    this,
    SbbRadioButtonGroupElement.events.input,
  );

  private _handlerRepository = new HandlerRepository(
    this,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener(
      'stateChange',
      (e: CustomEvent<SbbRadioButtonStateChange>) => this._onRadioButtonSelect(e),
      {
        signal,
        passive: true,
      },
    );
    this.addEventListener('keydown', (e) => this._handleKeyDown(e), { signal });
    this._hasSelectionPanel = !!this.querySelector?.('sbb-selection-panel');
    toggleDatasetEntry(this, 'hasSelectionPanel', this._hasSelectionPanel);
    this._handlerRepository.connect();
    this._updateRadios(this.value);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('value')) {
      this._valueChanged(this.value);
    }
    if (changedProperties.has('disabled')) {
      for (const radio of this.radioButtons) {
        radio.tabIndex = this._getRadioTabIndex(radio);
        radio.requestUpdate?.('disabled');
      }
      this._setFocusableRadio();
    }
    if (changedProperties.has('required')) {
      this.radioButtons.forEach((r) => r.requestUpdate?.('required'));
    }
    if (changedProperties.has('size')) {
      this.radioButtons.forEach((r) => r.requestUpdate?.('size'));
    }
  }

  protected override firstUpdated(): void {
    this._didLoad = true;
    this._updateRadios(this.value);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private _onRadioButtonSelect(event: CustomEvent<SbbRadioButtonStateChange>): void {
    event.stopPropagation();
    if (event.detail.type !== 'checked' || !this._didLoad) {
      return;
    }

    const radioButton = event.target as SbbRadioButtonElement;

    if (event.detail.checked) {
      this.value = radioButton.value;
      this._emitChange(radioButton, this.value);
    } else if (this.allowEmptySelection) {
      this.value = this.radioButtons.find((radio) => radio.checked)?.value;
      if (!this.value) {
        this._emitChange(radioButton);
      }
    }
  }

  private _emitChange(radioButton: SbbRadioButtonElement, value?: string): void {
    this._change.emit({ value, radioButton });
    this._input.emit({ value, radioButton });
    this._didChange.emit({ value, radioButton });
  }

  private _updateRadios(initValue?: string): void {
    if (!this._didLoad) {
      return;
    }

    const radioButtons = this.radioButtons;

    this.value = initValue ?? radioButtons.find((radio) => radio.checked)?.value;

    for (const radio of radioButtons) {
      radio.checked = radio.value === this.value;
      radio.tabIndex = this._getRadioTabIndex(radio);
    }

    this._setFocusableRadio();
  }

  private _setFocusableRadio(): void {
    const checked = this.radioButtons.find((radio) => radio.checked && !radio.disabled);

    const enabledRadios = this._enabledRadios;
    if (!checked && enabledRadios?.length) {
      enabledRadios[0].tabIndex = 0;
    }
  }

  private _getRadioTabIndex(radio: SbbRadioButtonElement): number {
    return (radio.checked || this._hasSelectionPanel) && !radio.disabled && !this.disabled ? 0 : -1;
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledRadios: SbbRadioButtonElement[] = this._enabledRadios;

    if (
      !enabledRadios ||
      !enabledRadios.length ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this &&
        (evt.target as HTMLElement).parentElement !== this &&
        (evt.target as HTMLElement).parentElement.nodeName !== 'SBB-SELECTION-PANEL')
    ) {
      return;
    }

    if (!isArrowKeyPressed(evt)) {
      return;
    }

    const current: number = enabledRadios.findIndex((e: SbbRadioButtonElement) => e === evt.target);
    const nextIndex: number = getNextElementIndex(evt, current, enabledRadios.length);

    // Selection on arrow keypress is allowed only if all the selection-panel has no content.
    const allPanelHasNoContent: boolean = (
      Array.from(this.querySelectorAll?.('sbb-selection-panel')) || []
    ).every((e) => !isValidAttribute(e, 'data-has-content'));
    if (!this._hasSelectionPanel || (this._hasSelectionPanel && allPanelHasNoContent)) {
      enabledRadios[nextIndex].select();
    }

    enabledRadios[nextIndex].focus();
    evt.preventDefault();
  }

  protected override render(): TemplateResult {
    setAttribute(this, 'role', 'radiogroup');

    return html`
      <div class="sbb-radio-group">
        <slot @slotchange=${() => this._updateRadios()}></slot>
      </div>
      ${this._namedSlots.error
        ? html`<div class="sbb-radio-group__error">
            <slot name="error"></slot>
          </div>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button-group': SbbRadioButtonGroupElement;
  }
}
