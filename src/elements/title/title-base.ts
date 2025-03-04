import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { forceType, hostAttributes } from '../core/decorators.js';

import style from './title-common.scss?lit&inline';

export type SbbTitleLevel = '1' | '2' | '3' | '4' | '5' | '6';

/**
 * It displays a title with a heading role.
 *
 * @slot - Use the unnamed slot to place the content of the title.
 */
export
@hostAttributes({
  role: 'heading',
})
abstract class SbbTitleBase extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Title level */
  @property({ reflect: true }) public accessor level: SbbTitleLevel = '1';

  /** Visual level for the title. Optional, if not set, the value of level will be used. */
  @property({ attribute: 'visual-level', reflect: true })
  public accessor visualLevel: SbbTitleLevel | null = null;

  /**
   * Sometimes we need a title in the markup to present a proper hierarchy
   * to the screen readers while we do not want to let that title appear
   * visually. In this case we set visuallyHidden to true.
   */
  @forceType()
  @property({ attribute: 'visually-hidden', reflect: true, type: Boolean })
  public accessor visuallyHidden: boolean = false;

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('level')) {
      this.setAttribute('aria-level', this.level);
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-title">
        <slot></slot>
      </div>
    `;
  }
}
