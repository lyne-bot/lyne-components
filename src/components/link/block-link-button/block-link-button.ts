import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '../../core/common-behaviors';
import { SbbBlockLinkCommonElementMixin } from '../common';

/**
 * It displays a link enhanced with the SBB Design, which will behave as a button.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link-button`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
@customElement('sbb-block-link-button')
export class SbbBlockLinkButtonElement extends SbbBlockLinkCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-block-link-button': SbbBlockLinkButtonElement;
  }
}
