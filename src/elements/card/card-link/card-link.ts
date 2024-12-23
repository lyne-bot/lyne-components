import { customElement } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../../core/base-elements.js';
import { SbbCardActionCommonElementMixin } from '../common.js';

/**
 * It turns the `sbb-card` into a link element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the link (important!).
 *   This is relevant for SEO and screen readers.
 */
export
@customElement('sbb-card-link')
class SbbCardLinkElement extends SbbCardActionCommonElementMixin(SbbLinkBaseElement) {
  protected override actionRole: 'link' | 'button' = 'link';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-link': SbbCardLinkElement;
  }
}
