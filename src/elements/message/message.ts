import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../core/decorators.js';
import type { SbbTitleLevel } from '../title.js';
import '../title.js';

import style from './message.scss?lit&inline';

/**
 * It displays a complex message combining a title, an image, an action and some content.
 *
 * @slot image - Use this slot to provide a sbb-image component.
 * @slot title - Use this slot to provide title text for the component.
 * @slot subtitle - Use this slot to provide a subtitle, must be a paragraph.
 * @slot legend - Use this slot to provide a legend, must be a paragraph.
 * @slot action - Use this slot to provide a sbb-button.
 */
export
@customElement('sbb-message')
class SbbMessageElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Content of title. */
  @forceType()
  @property({ attribute: 'title-content' })
  public accessor titleContent: string = '';

  /** Level of title, it will be rendered as heading tag (e.g., h3). Defaults to level 3. */
  @property({ attribute: 'title-level' }) public accessor titleLevel: SbbTitleLevel = '3';

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-message__container">
        <slot name="image"></slot>
        <sbb-title level=${this.titleLevel} visual-level="5" class="sbb-message__title">
          <slot name="title">${this.titleContent}</slot>
        </sbb-title>
        <slot name="subtitle"></slot>
        <slot name="legend"></slot>
        <slot name="action"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-message': SbbMessageElement;
  }
}
