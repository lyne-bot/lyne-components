import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '../../core/common-behaviors';
import { SbbButtonCommonElementMixin } from '../common/button-common';
import commonStyle from '../common/button-common.scss?lit&inline';
import style from '../common/tertiary-button.scss?lit&inline';

/**
 * It displays a button enhanced with the SBB Design in the 'tertiary' variant.
 *
 * @slot - Use the unnamed slot to add content to the button.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-tertiary-button')
export class SbbTertiaryButtonElement extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {
  public static override styles: CSSResultGroup = [commonStyle, style];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tertiary-button': SbbTertiaryButtonElement;
  }
}
