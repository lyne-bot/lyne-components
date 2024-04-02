import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  hostAttributes,
  SbbLanguageController,
  SbbButtonBaseElement,
  SbbNegativeMixin,
 SbbConnectedAbortController } from '../../core/common-behaviors';
import { hostContext, isValidAttribute } from '../../core/dom';
import { i18nClearInput } from '../../core/i18n';
import type { SbbFormFieldElement } from '../form-field';
import '../../icon';

import style from './form-field-clear.scss?lit&inline';

/**
 * Combined with `sbb-form-field`, it displays a button which clears the input value.
 */
@customElement('sbb-form-field-clear')
@hostAttributes({
  slot: 'suffix',
})
export class SbbFormFieldClearElement extends SbbNegativeMixin(SbbButtonBaseElement) {
  public static override styles: CSSResultGroup = style;

  private _formField?: SbbFormFieldElement;
  private _abort = new SbbConnectedAbortController(this);
  private _language = new SbbLanguageController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', () => this._handleClick(), { signal });
    this._formField =
      (hostContext('sbb-form-field', this) as SbbFormFieldElement) ??
      (hostContext('[data-form-field]', this) as SbbFormFieldElement);

    if (this._formField) {
      this.negative = isValidAttribute(this._formField, 'negative');
    }
  }

  private async _handleClick(): Promise<void> {
    const input = this._formField?.inputElement;
    if (!input || input.tagName !== 'INPUT') {
      return;
    }
    this._formField?.clear();
    input.focus();
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    this.setAttribute('aria-label', i18nClearInput[this._language.current]);
  }

  protected override renderTemplate(): TemplateResult {
    return html` <sbb-icon name="cross-small"></sbb-icon> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-form-field-clear': SbbFormFieldClearElement;
  }
}
