import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-classes';
import { SbbCardActionCommonElementMixin } from '../common';

/**
 * It turns the `sbb-card` into a button element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the button (important!).
 *   This is relevant for SEO and screen readers.
 */
@customElement('sbb-card-button')
export class SbbCardButtonElement extends SbbCardActionCommonElementMixin(SbbButtonBaseElement) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-button': SbbCardButtonElement;
  }
}
