import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../../core/common-behaviors';
import { AgnosticIntersectionObserver } from '../../core/observers';

import style from './sticky-bar.scss?lit&inline';

/**
 * A container that sticks to the bottom of the page if slotted into `sbb-container`.
 *
 * @slot - Use the unnamed slot to add content to the sticky bar.
 * @cssprop [--sbb-sticky-bar-padding-block=var(--sbb-spacing-responsive-xs)] - Block padding of the sticky bar.
 * @cssprop [--sbb-sticky-bar-bottom-overlapping-height=0px] - Define an additional area where
 * the sticky bar overlaps the following content on the bottom.
 * This area becomes visible when the sticky bar transitions from sticky to the normal document flow.
 */
@hostAttributes({
  slot: 'sticky-bar',
})
@customElement('sbb-sticky-bar')
export class SbbStickyBarElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Color of the container, like transparent, white etc. */
  @property({ reflect: true }) public color?: 'white' | 'milk';

  /** Whether the animation is enabled. */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  private _intersector?: HTMLSpanElement;
  private _observer = new AgnosticIntersectionObserver((entries) =>
    this._toggleShadowVisibility(entries[0]),
  );

  public override connectedCallback(): void {
    super.connectedCallback();

    const container = this.closest('sbb-container');
    if (container) {
      this.toggleAttribute('data-expanded', container.expanded);
      this.toggleAttribute('data-transparent', container.color === 'transparent');
    }
    if (this._intersector) {
      this._observer.observe(this._intersector);
    }
  }

  protected override firstUpdated(): void {
    if (!this._intersector) {
      this._intersector = this.shadowRoot!.querySelector('.sbb-sticky-bar__intersector')!;
      this._observer.observe(this._intersector);
    }
    this._observer.observe(this);
  }

  private _toggleShadowVisibility(entry: IntersectionObserverEntry): void {
    this.toggleAttribute(
      'data-sticking',
      !entry.isIntersecting && entry.boundingClientRect.top > 0,
    );
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-sticky-bar__wrapper">
        <div class="sbb-sticky-bar">
          <slot></slot>
        </div>
      </div>
      <div class="sbb-sticky-bar__intersector"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sticky-bar': SbbStickyBarElement;
  }
}
