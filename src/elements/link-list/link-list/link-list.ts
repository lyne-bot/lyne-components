import type { CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces.js';
import { linkListBaseStyle, SbbLinkListBaseElement } from '../common.js';

import style from './link-list.scss?lit&inline';

/**
 * It displays a list of `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-block-link`.
 * @slot title - Use this slot to provide a title.
 */
export
@customElement('sbb-link-list')
class SbbLinkListElement extends SbbLinkListBaseElement {
  public static override styles: CSSResultGroup = [linkListBaseStyle, style];

  /** Selected breakpoint from which the list is rendered horizontally. */
  @property({ attribute: 'horizontal-from', reflect: true })
  public accessor horizontalFrom: SbbHorizontalFrom | null = null;

  /** The orientation in which the list will be shown vertical or horizontal. */
  @property({ reflect: true }) public accessor orientation: SbbOrientation = 'vertical';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-list': SbbLinkListElement;
  }
}
