import { html, type CSSResultGroup, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { SbbChipElement } from '../chip';
import { SbbLinkBaseElement } from '../core/common-behaviors';
import type { SbbImageElement } from '../image';

import style from './teaser-paid.scss?lit&inline';

/**
 * It displays an image and a chip with a text.
 *
 * @slot chip - Link content of the panel
 * @slot image - The background image that can be a `sbb-image`
 */
@customElement('sbb-teaser-paid')
export class SbbTeaserPaidElement extends SbbLinkBaseElement {
  public static override styles: CSSResultGroup = style;

  private get _chip(): SbbChipElement {
    return this.querySelector('sbb-chip')!;
  }

  private get _image(): SbbImageElement | null {
    return this.querySelector('sbb-image');
  }

  private _chipSlotChanged(): void {
    if (this._chip) {
      this._chip.color = 'charcoal';
    }
  }

  private _imageSlotChanged(): void {
    if (this._image) {
      this._image.borderRadius = 'none';
    }
  }

  protected override renderTemplate(): TemplateResult {
    return html`
      <slot name="chip" @slotchange=${() => this._chipSlotChanged()}></slot>
      <slot name="image" @slotchange=${() => this._imageSlotChanged()}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-paid': SbbTeaserPaidElement;
  }
}
