import { type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../../core/common-behaviors';
import { SbbNavigationActionCommonElementMixin } from '../common/navigation-action-common';

/**
 * It displays a link element that can be used in the `sbb-navigation` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-link`.
 */
@customElement('sbb-navigation-link')
export class SbbNavigationLinkElement extends SbbNavigationActionCommonElementMixin(
  SbbLinkBaseElement,
) {
  protected renderTemplate(attributes: Record<string, string>): TemplateResult {
    return this.renderNavigationActionCommonTemplate(attributes, this.renderTargetNewWindow());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-link': SbbNavigationLinkElement;
  }
}
