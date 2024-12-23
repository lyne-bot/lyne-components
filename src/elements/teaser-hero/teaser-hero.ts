import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbLinkBaseElement } from '../core/base-elements.js';
import { forceType, omitEmptyConverter, slotState } from '../core/decorators.js';

import style from './teaser-hero.scss?lit&inline';

import '../link/block-link-static.js';

/**
 * It displays an image and an action call within a panel.
 *
 * @slot - Use the unnamed slot to add text content to the panel
 * @slot link-content - Link content of the panel
 * @slot image - The background image that can be a `sbb-image`
 * @slot chip - The `sbb-chip-label` component that will be displayed on top-left corner
 */
export
@customElement('sbb-teaser-hero')
@slotState()
class SbbTeaserHeroElement extends SbbLinkBaseElement {
  public static override styles: CSSResultGroup = style;

  /** Panel link text. */
  @forceType()
  @property({ attribute: 'link-content', reflect: true, converter: omitEmptyConverter })
  public accessor linkContent: string = '';

  private _imageSlotChanged(): void {
    Array.from(this.querySelectorAll('sbb-chip-label')).forEach((c) => (c.color = 'charcoal'));
  }

  protected override renderTemplate(): TemplateResult {
    return html`
      <span class="sbb-teaser-hero__panel">
        <p class="sbb-teaser-hero__panel-text">
          <slot></slot>
        </p>
        ${this.href
          ? html`<sbb-block-link-static
              class="sbb-teaser-hero__panel-link"
              icon-name="chevron-small-right-small"
              icon-placement="end"
              size="m"
              negative
            >
              <slot name="link-content">${this.linkContent}</slot>
            </sbb-block-link-static>`
          : nothing}
      </span>
      <slot name="image" @slotchange=${this._imageSlotChanged}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-hero': SbbTeaserHeroElement;
  }
}
