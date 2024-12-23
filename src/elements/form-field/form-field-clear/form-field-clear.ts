import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { hostAttributes } from '../../core/decorators.js';
import { i18nClearInput } from '../../core/i18n.js';
import { SbbNegativeMixin } from '../../core/mixins.js';
import type { SbbFormFieldElement } from '../form-field.js';

import style from './form-field-clear.scss?lit&inline';

import '../../icon.js';

/**
 * Combined with `sbb-form-field`, it displays a button which clears the input value.
 */
export
@customElement('sbb-form-field-clear')
@hostAttributes({
  slot: 'suffix',
})
class SbbFormFieldClearElement extends SbbNegativeMixin(SbbButtonBaseElement) {
  public static override styles: CSSResultGroup = style;

  private _formField?: SbbFormFieldElement | null;
  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    this.addEventListener?.('click', () => this._handleClick());
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._formField = this.closest<SbbFormFieldElement>('sbb-form-field, [data-form-field]');

    if (this._formField) {
      this.negative = this._formField.hasAttribute('negative');
    }
  }

  private async _handleClick(): Promise<void> {
    const input = this._formField?.inputElement;
    if (!input || input.localName !== 'input') {
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
