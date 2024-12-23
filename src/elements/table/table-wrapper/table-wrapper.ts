import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbNegativeMixin } from '../../core/mixins.js';

import style from './table-wrapper.scss?lit&inline';

/**
 * Wraps a table to enhance its functionality
 *
 * @slot - Use the unnamed slot to add the table.
 */
export
@customElement('sbb-table-wrapper')
class SbbTableWrapperElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  private _resizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => this._checkHorizontalScrollbar(),
  });
  private _tableWrapper!: HTMLElement;

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._tableWrapper = this.shadowRoot!.querySelector<HTMLElement>('.sbb-table-wrapper')!;
    this._resizeObserver.observe(this._tableWrapper);
  }

  private _checkHorizontalScrollbar(): void {
    this.toggleAttribute(
      'data-has-horizontal-scrollbar',
      this._tableWrapper.scrollWidth > this._tableWrapper.offsetWidth,
    );
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-table-wrapper">
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-table-wrapper': SbbTableWrapperElement;
  }
}
