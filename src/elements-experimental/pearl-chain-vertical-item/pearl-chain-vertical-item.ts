import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
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
 * It displays details about connection between stations.
 *
 * @slot left - Content of the left side of the item
 * @slot right - Content of the right side of the item
 */
export
@customElement('sbb-pearl-chain-vertical-item')
class SbbPearlChainVerticalItemElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** The pearlChainVerticalItemAttributes Prop for styling the bullets and line.*/
  @property({ attribute: 'pearl-chain-vertical-item-attributes', type: Object })
  public accessor pearlChainVerticalItemAttributes: PearlChainVerticalItemAttributes = null!;

  /** If true, the position won't be animated. */
  @forceType()
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public accessor disableAnimation: boolean = false;

  protected override render(): TemplateResult {
    const { bulletType, lineType, lineColor, hideLine, minHeight, bulletSize, position } =
      this.pearlChainVerticalItemAttributes || {};

    const bulletTypeClass =
      position && position > 0 && position <= 100
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
        ${position && position > 0
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
    'sbb-pearl-chain-vertical-item': SbbPearlChainVerticalItemElement;
  }
}
