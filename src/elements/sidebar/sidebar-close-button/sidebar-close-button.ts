import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSecondaryButtonElement } from '../../button/secondary-button.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { hostAttributes } from '../../core/decorators.js';
import { i18nCloseNavigation } from '../../core/i18n.js';

import style from './sidebar-close-button.scss?lit&inline';

/**
 * Sidebar close button, intended to be placed inside sbb-sidebar.
 *
 * @slot - Use the unnamed slot to add content to the sidebar-close-button. Not intended to be used in this context.
 * @slot icon - Slot used to display the icon, if one is set. Not intended to be used in this context.
 */
export
@customElement('sbb-sidebar-close-button')
@hostAttributes({
  slot: 'title-section',
})
class SbbSidebarCloseButtonElement extends SbbSecondaryButtonElement {
  public static override styles: CSSResultGroup = [SbbSecondaryButtonElement.styles, style];

  private _language?: string;
  private _languageController = new SbbLanguageController(this);

  public constructor() {
    super();
    this.iconName = 'cross-small';
    this.size = 's';
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    // Update the aria label of the close button, respecting consumers overrides to aria-label.
    if (this._language !== this._languageController.current) {
      if (
        !this.hasAttribute('aria-label') ||
        (!!this._language &&
          this.getAttribute('aria-label') === i18nCloseNavigation[this._language])
      ) {
        this.setAttribute('aria-label', i18nCloseNavigation[this._languageController.current]);
      }
      this._language = this._languageController.current;
    }
  }

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-close-button': SbbSidebarCloseButtonElement;
  }
}
