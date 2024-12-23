import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { SbbDisabledTabIndexActionMixin } from '../../core/mixins.js';
import { SbbBlockLinkCommonElementMixin } from '../common.js';

/**
 * It displays a link enhanced with the SBB Design, which will behave as a button.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-block-link-button`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
export
@customElement('sbb-block-link-button')
class SbbBlockLinkButtonElement extends SbbBlockLinkCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-block-link-button': SbbBlockLinkButtonElement;
  }
}
