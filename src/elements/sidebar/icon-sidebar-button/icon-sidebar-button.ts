import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { SbbIconNameMixin } from '../../icon.js';
import { iconSidebarButtonCommonStyle } from '../common.js';

/**
 * Button to be placed inside `sbb-icon-sidebar`.
 *
 * @slot icon - Slot used to display the icon.
 */
export
@customElement('sbb-icon-sidebar-button')
class SbbIconSidebarButtonElement extends SbbIconNameMixin(SbbButtonBaseElement) {
  public static override styles: CSSResultGroup = [iconSidebarButtonCommonStyle];

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-icon-sidebar-button': SbbIconSidebarButtonElement;
  }
}
