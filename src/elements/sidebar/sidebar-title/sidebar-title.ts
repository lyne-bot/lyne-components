import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';
import { SbbTitleBase } from '../../title.js';

import style from './sidebar-title.scss?lit&inline';

/**
 * It displays the title of the sidebar. It has to be placed inside an `sbb-sidebar` element.
 */
export
@customElement('sbb-sidebar-title')
@hostAttributes({ slot: 'title-section' })
class SbbSidebarTitleElement extends SbbTitleBase {
  public static override styles: CSSResultGroup = [SbbTitleBase.styles, style];

  public constructor() {
    super();
    this.level = '2';
    this.visualLevel = '5';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-title': SbbSidebarTitleElement;
  }
}
