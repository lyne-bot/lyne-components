import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType, hostAttributes, slotState } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import type { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces.js';
import { SbbDisabledMixin } from '../../core/mixins.js';
import type { SbbRadioButtonSize } from '../common.js';
import type { SbbRadioButtonPanelElement } from '../radio-button-panel.js';
import type { SbbRadioButtonElement } from '../radio-button.js';

import style from './radio-button-group.scss?lit&inline';

let nextId = 0;

/**
 * It can be used as a container for one or more `sbb-radio-button`.
 *
 * @slot - Use the unnamed slot to add `sbb-radio-button` elements to the `sbb-radio-button-group`.
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 * @event {CustomEvent<void>} didChange - Deprecated. Only used for React. Will probably be removed once React 19 is available. Emits whenever the `sbb-radio-group` value changes.
 */
export
@customElement('sbb-radio-button-group')
@hostAttributes({
  role: 'radiogroup',
})
@slotState()
class SbbRadioButtonGroupElement extends SbbDisabledMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
    change: 'change',
    input: 'input',
  } as const;

  /**
   * Whether the radios can be deselected.
   */
  @forceType()
  @property({ attribute: 'allow-empty-selection', type: Boolean })
  public accessor allowEmptySelection: boolean = false;

  /**
   * Whether the radio group is required.
   */
  @forceType()
  @property({ type: Boolean })
  public accessor required: boolean = false;

  /**
   * The value of the radio group.
   */
  @property()
  public set value(val: string | null) {
    this._fallbackValue = val;
    if (!this._didLoad) {
      return;
    }
    if (val == null) {
      this.radioButtons.forEach((r) => (r.checked = false));
      return;
    }
    const toCheck = this.radioButtons.find((r) => r.value === val);
    if (toCheck) {
      toCheck.checked = true;
    }
  }
  public get value(): string | null {
    return this.radioButtons.find((r) => r.checked && !r.disabled)?.value ?? this._fallbackValue;
  }
  /**
   * Used to preserve the `value` in case the radios are not yet 'loaded'
   */
  private _fallbackValue: string | null = null;

  /**
   * Size variant, either xs, s or m.
   * @default 'm' / 'xs' (lean)
   */
  @property() public accessor size: SbbRadioButtonSize = isLean() ? 'xs' : 'm';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @property({ attribute: 'horizontal-from', reflect: true })
  public accessor horizontalFrom: SbbHorizontalFrom | null = null;

  /**
   * Radio group's orientation, either horizontal or vertical.
   */
  @property({ reflect: true })
  public accessor orientation: SbbOrientation = 'horizontal';

  @forceType()
  @property()
  public accessor name: string = `sbb-radio-button-group-${++nextId}`;

  /**
   * List of contained radio buttons.
   */
  public get radioButtons(): (SbbRadioButtonElement | SbbRadioButtonPanelElement)[] {
    return (
      Array.from(this.querySelectorAll?.('sbb-radio-button, sbb-radio-button-panel') ?? []) as (
        | SbbRadioButtonElement
        | SbbRadioButtonPanelElement
      )[]
    ).filter((el) => el.closest?.('sbb-radio-button-group') === this);
  }

  private _didLoad = false;

  /**
   * Emits whenever the `sbb-radio-group` value changes.
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter(
    this,
    SbbRadioButtonGroupElement.events.didChange,
  );

  public constructor() {
    super();
    this.addEventListener?.('change', (e: Event) => this._onRadioChange(e));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.toggleAttribute(
      'data-has-panel',
      !!this.querySelector?.('sbb-selection-expansion-panel, sbb-radio-button-panel'),
    );
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('disabled')) {
      this.radioButtons.forEach((r) => r.requestUpdate?.('disabled'));
    }
    if (changedProperties.has('required')) {
      this.radioButtons.forEach((r) => r.requestUpdate?.('required'));
    }
    if (changedProperties.has('size')) {
      this.radioButtons.forEach((r) => r.requestUpdate?.('size'));
    }
    if (changedProperties.has('name')) {
      this._updateRadiosName();
    }
  }

  protected override async firstUpdated(changedProperties: PropertyValues<this>): Promise<void> {
    super.firstUpdated(changedProperties);
    this._didLoad = true;

    await this.updateComplete;
    this._updateRadioState();
  }

  private _onRadioChange(event: Event): void {
    const target = event.target! as SbbRadioButtonElement | SbbRadioButtonPanelElement;

    // Only filter radio-buttons event
    if (target.localName !== 'sbb-radio-button' && target.localName !== 'sbb-radio-button-panel') {
      return;
    }

    this._fallbackValue = null; // Since the user interacted, the fallbackValue logic does not apply anymore
    this._didChange.emit();
  }

  /**
   * Proxy 'name' to child radio-buttons
   */
  private _updateRadiosName(): void {
    this.radioButtons.forEach((r) => (r.name = this.name));
  }

  /**
   * Re-trigger the setter and update the checked state of the radios.
   * Mainly used to cover cases where the setter is called before the radios are loaded
   */
  private _updateRadioState(): void {
    if (this._fallbackValue) {
      // eslint-disable-next-line no-self-assign
      this.value = this.value;
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-radio-group">
        <slot
          @slotchange=${() => {
            this._updateRadiosName();
            this._updateRadioState();
          }}
        ></slot>
      </div>
      <div class="sbb-radio-group__error">
        <slot name="error"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button-group': SbbRadioButtonGroupElement;
  }
}
