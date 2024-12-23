import { LitElement, html, type CSSResultGroup, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getOverride, slotState } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import type { SbbIconPlacement } from '../../core/interfaces.js';
import { SbbIconNameMixin } from '../../icon.js';
import {
  SbbCheckboxCommonElementMixin,
  checkboxCommonStyle,
  type SbbCheckboxSize,
} from '../common.js';

import checkboxStyle from './checkbox.scss?lit&inline';

import '../../visual-checkbox.js';

/**
 * It displays a checkbox enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-checkbox`.
 * @slot icon - Slot used to render the checkbox icon (disabled inside a selection panel).
 * @event {Event} change - Event fired on change.
 * @event {InputEvent} input - Event fired on input.
 */
export
@customElement('sbb-checkbox')
@slotState()
class SbbCheckboxElement extends SbbCheckboxCommonElementMixin(SbbIconNameMixin(LitElement)) {
  public static override styles: CSSResultGroup = [checkboxCommonStyle, checkboxStyle];

  /**
   * Size variant, either m, s or xs.
   * @default 'm' / 'xs' (lean)
   */
  @property({ reflect: true })
  @getOverride((i, v) => i.group?.size ?? v)
  public accessor size: SbbCheckboxSize = isLean() ? 'xs' : 'm';

  /** The label position relative to the labelIcon. Defaults to end */
  @property({ attribute: 'icon-placement', reflect: true })
  public accessor iconPlacement: SbbIconPlacement = 'end';

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-checkbox-wrapper">
        <span class="sbb-checkbox">
          <span class="sbb-checkbox__inner">
            <span class="sbb-checkbox__aligner">
              <sbb-visual-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled || this.formDisabled}
                size=${this.size}
              ></sbb-visual-checkbox>
            </span>
            <span class="sbb-checkbox__label">
              <slot></slot>
              <span class="sbb-checkbox__label--icon sbb-checkbox__aligner"
                >${this.renderIconSlot()}</span
              >
            </span>
          </span>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-checkbox': SbbCheckboxElement;
  }
}
