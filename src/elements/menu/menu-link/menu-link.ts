import { customElement } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../../core/base-elements.js';
import { SbbDisabledInteractiveMixin } from '../../core/mixins.js';
import { SbbMenuActionCommonElementMixin } from '../common.js';

/**
 * It displays a link element that can be used in the `sbb-menu` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-menu-link`.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a `sbb-icon` will be used.
 * @cssprop [--sbb-menu-action-outer-horizontal-padding=var(--sbb-spacing-fixed-3x)] - Can be used
 * to modify horizontal padding.
 */
export
@customElement('sbb-menu-link')
class SbbMenuLinkElement extends SbbDisabledInteractiveMixin(
  SbbMenuActionCommonElementMixin(SbbLinkBaseElement),
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-menu-link': SbbMenuLinkElement;
  }
}
