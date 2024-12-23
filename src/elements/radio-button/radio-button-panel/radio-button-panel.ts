import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getOverride, slotState } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import type {
  SbbCheckedStateChange,
  SbbDisabledStateChange,
  SbbStateChange,
} from '../../core/interfaces.js';
import {
  panelCommonStyle,
  SbbPanelMixin,
  type SbbPanelSize,
  SbbUpdateSchedulerMixin,
} from '../../core/mixins.js';
import { radioButtonCommonStyle, SbbRadioButtonCommonElementMixin } from '../common.js';

import '../../screen-reader-only.js';

export type SbbRadioButtonStateChange = Extract<
  SbbStateChange,
  SbbDisabledStateChange | SbbCheckedStateChange
>;

/**
 /**
 * It displays a radio button enhanced with the panel design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 * @slot subtext - Slot used to render a subtext under the label.
 * @slot suffix - Slot used to render additional content after the label.
 * @slot badge - Use this slot to provide a `sbb-card-badge` (optional).
 * @event {Event} change - Fired on change.
 * @event {InputEvent} input - Fired on input.
 * @overrideType value - string | null
 */
export
@customElement('sbb-radio-button-panel')
@slotState()
class SbbRadioButtonPanelElement extends SbbPanelMixin(
  SbbRadioButtonCommonElementMixin(SbbUpdateSchedulerMixin(LitElement)),
) {
  public static override styles: CSSResultGroup = [radioButtonCommonStyle, panelCommonStyle];

  // TODO: fix using ...super.events requires: https://github.com/sbb-design-systems/lyne-components/issues/2600
  public static readonly events = {
    change: 'change',
    input: 'input',
    panelConnected: 'panelConnected',
    stateChange: 'stateChange',
  } as const;

  /**
   * Size variant, either s or m.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true })
  @getOverride((i, v) => (i.group?.size ? (i.group.size === 'xs' ? 's' : i.group.size) : v))
  public accessor size: SbbPanelSize = isLean() ? 's' : 'm';

  private _hasSelectionExpansionPanelElement: boolean = false;

  /**
   * @internal
   * Internal event that emits whenever the state of the radio option
   * in relation to the parent selection panel changes.
   */
  private _stateChange: EventEmitter<SbbRadioButtonStateChange> = new EventEmitter(
    this,
    SbbRadioButtonPanelElement.events.stateChange,
    { bubbles: true },
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this._hasSelectionExpansionPanelElement = !!this.closest?.('sbb-selection-expansion-panel');
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.toggleAttribute('data-checked', this.checked);

      if (this.checked !== changedProperties.get('checked')!) {
        this._stateChange.emit({ type: 'checked', checked: this.checked });
      }
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled !== changedProperties.get('disabled')!) {
        this._stateChange.emit({ type: 'disabled', disabled: this.disabled });
      }
    }
  }

  /**
   * As an exception, panels with an expansion-panel attached are always focusable
   */
  protected override updateFocusableRadios(): void {
    super.updateFocusableRadios();
    const radios = Array.from(this.associatedRadioButtons ?? []) as SbbRadioButtonPanelElement[];

    radios
      .filter((r) => !r.disabled && r._hasSelectionExpansionPanelElement)
      .forEach((r) => (r.tabIndex = 0));
  }

  /**
   * As an exception, radio-panels with an expansion-panel attached are not checked automatically when navigating by keyboard
   */
  protected override async navigateByKeyboard(next: SbbRadioButtonPanelElement): Promise<void> {
    if (!this._hasSelectionExpansionPanelElement) {
      await super.navigateByKeyboard(next);
    } else {
      next.focus();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <label class="sbb-selection-panel">
        <div class="sbb-selection-panel__badge">
          <slot name="badge"></slot>
        </div>
        <span class="sbb-radio-button">
          <span class="sbb-radio-button__label-slot">
            <slot></slot>
            <slot name="suffix"></slot>
          </span>
          <slot name="subtext"></slot>
          ${this.expansionState
            ? html`<sbb-screen-reader-only>${this.expansionState}</sbb-screen-reader-only>`
            : nothing}
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button-panel': SbbRadioButtonPanelElement;
  }
}
