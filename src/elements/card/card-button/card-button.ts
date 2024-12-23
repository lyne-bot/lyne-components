import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { SbbCardActionCommonElementMixin } from '../common.js';

/**
 * It turns the `sbb-card` into a button element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the button (important!).
 *   This is relevant for SEO and screen readers.
 */
export
@customElement('sbb-card-button')
class SbbCardButtonElement extends SbbCardActionCommonElementMixin(SbbButtonBaseElement) {
  protected override actionRole: 'link' | 'button' = 'button';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-button': SbbCardButtonElement;
  }
}
