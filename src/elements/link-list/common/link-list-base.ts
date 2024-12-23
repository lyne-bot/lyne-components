import type { PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType, omitEmptyConverter, slotState } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import {
  SbbNamedSlotListMixin,
  SbbNegativeMixin,
  type WithListChildren,
} from '../../core/mixins.js';
import type {
  SbbBlockLinkButtonElement,
  SbbBlockLinkElement,
  SbbBlockLinkStaticElement,
  SbbLinkSize,
} from '../../link.js';
import type { SbbTitleLevel } from '../../title.js';

import '../../title.js';

/**
 * It displays a list of `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-block-link`.
 * @slot title - Use this slot to provide a title.
 */
export
@slotState()
class SbbLinkListBaseElement extends SbbNegativeMixin(
  SbbNamedSlotListMixin<
    SbbBlockLinkElement | SbbBlockLinkButtonElement | SbbBlockLinkStaticElement,
    typeof LitElement
  >(LitElement),
) {
  protected override readonly listChildLocalNames = [
    'sbb-block-link',
    'sbb-block-link-button',
    'sbb-block-link-static',
  ];

  /** The title text we want to show before the list. */
  @forceType()
  @property({ attribute: 'title-content', reflect: true, converter: omitEmptyConverter })
  public accessor titleContent: string = '';

  /** The semantic level of the title, e.g. 2 = h2. */
  @property({ attribute: 'title-level' }) public accessor titleLevel: SbbTitleLevel = '2';

  /**
   * Text size of the nested sbb-block-link instances.
   * This will overwrite the size attribute of nested sbb-block-link instances.
   * @default 's' / 'xs' (lean)
   */
  @property({ reflect: true }) public accessor size: SbbLinkSize = isLean() ? 'xs' : 's';

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (
      changedProperties.has('size') ||
      changedProperties.has('negative') ||
      changedProperties.has('listChildren')
    ) {
      for (const link of this.listChildren) {
        link.negative = this.negative;
        link.size = this.size;
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-link-list-wrapper">
        <sbb-title
          class="sbb-link-list-title"
          level=${this.titleLevel || nothing}
          visual-level="5"
          ?negative=${this.negative}
          id="sbb-link-list-title-id"
        >
          <slot name="title">${this.titleContent}</slot>
        </sbb-title>
        ${this.renderList({ ariaLabelledby: 'sbb-link-list-title-id' })}
      </div>
    `;
  }
}
