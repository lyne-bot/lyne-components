import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './pearl-chain-vertical-item.scss?lit&inline';

export type LineType = 'dotted' | 'standard' | 'thin';

export type BulletType = 'default' | 'past' | 'irrelevant' | 'skipped' | 'disruption';

export type LineColor = 'default' | 'past' | 'disruption' | 'walk';

export type BulletSize = 'start-end' | 'stop';

export interface PearlChainVerticalItemAttributes {
  lineType: LineType;
  lineColor: LineColor;
  bulletType?: BulletType;
  minHeight: number;
  hideLine: boolean;
  bulletSize: BulletSize;
  position?: number;
}

/**
 * @slot left - content of the left side of the item
 * @slot right - content of the right side of the item
 */
@customElement('sbb-pearl-chain-vertical-item')
export class SbbPearlChainVerticalItem extends LitElement {
  public static override styles: CSSResult = style;

  /** The pearlChainVerticalItemAttributes Prop for styling the bullets and line.*/
  @property({ attribute: 'pearl-chain-vertical-item-attributes', type: Object })
  public pearlChainVerticalItemAttributes!: PearlChainVerticalItemAttributes;

  /** If true, the position won't be animated. */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation?: boolean;

  protected override render(): TemplateResult {
    const { bulletType, lineType, lineColor, hideLine, minHeight, bulletSize, position } =
      this.pearlChainVerticalItemAttributes || {};

    const bulletTypeClass =
      position > 0 && position <= 100
        ? 'sbb-pearl-chain-vertical-item__bullet--past'
        : `sbb-pearl-chain-vertical-item__bullet--${bulletType}`;

    return html`
      <div class="sbb-pearl-chain-vertical-item__column" style="height: ${minHeight}px;">
        <slot name="left"></slot>
      </div>
      <div
        aria-hidden="true"
        class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--middle"
      >
        ${!hideLine
          ? html`<div
              style="--sbb-pearl-chain-vertical-item-leg-status:${position}%;"
              class="sbb-pearl-chain-vertical-item__line sbb-pearl-chain-vertical-item__line--${lineType} sbb-pearl-chain-vertical-item__line--${lineColor}"
            ></div>`
          : nothing}
        ${bulletType
          ? html`<div
              class="sbb-pearl-chain-vertical-item__bullet  sbb-pearl-chain-vertical-item__bullet--${bulletSize} ${bulletTypeClass}"
            ></div>`
          : nothing}
        ${position > 0
          ? html`<div
              style="--sbb-pearl-chain-vertical-item-position:${position}%;"
              class="sbb-pearl-chain-vertical-item__bullet--position"
            ></div>`
          : nothing}
      </div>
      <slot name="right"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain-vertical-item': SbbPearlChainVerticalItem;
  }
}
