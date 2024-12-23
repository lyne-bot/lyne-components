import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType, omitEmptyConverter, slotState } from '../core/decorators.js';
import { isLean } from '../core/dom.js';
import { SbbNamedSlotListMixin, type WithListChildren } from '../core/mixins.js';
import type { SbbBlockLinkButtonElement, SbbBlockLinkElement } from '../link.js';
import type { SbbTitleLevel } from '../title.js';

import style from './skiplink-list.scss?lit&inline';

import '../title.js';

/**
 * It displays a list of `sbb-block-link`/`sbb-block-link-button` which are visible only when focused.
 *
 * @slot - Use the unnamed slot to add `sbb-block-link`/`sbb-block-link-button` elements to the `sbb-skiplink-list`.
 * @slot title - Use this to provide a title for the skiplink-list (optional).
 * @cssprop [--sbb-skiplink-list-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-skiplink-list')
@slotState()
class SbbSkiplinkListElement extends SbbNamedSlotListMixin<
  SbbBlockLinkElement | SbbBlockLinkButtonElement,
  typeof LitElement
>(LitElement) {
  public static override styles: CSSResultGroup = style;
  protected override readonly listChildLocalNames = ['sbb-block-link', 'sbb-block-link-button'];

  /** The title text we want to place before the list. */
  @forceType()
  @property({ attribute: 'title-content', reflect: true, converter: omitEmptyConverter })
  public accessor titleContent: string = '';

  /** The semantic level of the title, e.g. 2 = h2. */
  @property({ attribute: 'title-level' }) public accessor titleLevel: SbbTitleLevel = '2';

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('listChildren')) {
      for (const child of this.listChildren) {
        child.size = isLean() ? 'xs' : 'm';
        child.negative = true;
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-skiplink-list__wrapper">
        <sbb-title
          class="sbb-link-list-title"
          level=${this.titleLevel || nothing}
          visual-level="5"
          visually-hidden
          negative
          id="sbb-skiplink-list-title-id"
        >
          <slot name="title">${this.titleContent}</slot>
        </sbb-title>
        ${this.renderList({ ariaLabelledby: 'sbb-skiplink-list-title-id' })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-skiplink-list': SbbSkiplinkListElement;
  }
}
