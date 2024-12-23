import { html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { forceType, omitEmptyConverter } from '../core/decorators.js';

import { SbbIconBase } from './icon-base.js';

/**
 * Displays an icon loaded from a registered namespace.
 */
export
@customElement('sbb-icon')
class SbbIconElement extends SbbIconBase {
  /**
   * We need to additionally observe the svgicon attribute
   * for sbb-angular compatibility.
   * @internal
   */
  public static override get observedAttributes(): string[] {
    return super.observedAttributes.concat('svgicon');
  }

  /**
   * The provided name consisting of the namespace and the name of the icon.
   * If the namespace is missing, the default namespace "sbb" will be used.
   * E.g. `name` (will use "sbb" as namespace) or `namespace:name`.
   */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor name: string = '';

  private _defaultAriaLabel = '';

  /**
   * The sbb-angular library has a sbb-icon component as well. In order to provide
   * compatibility with it (as some icons are used internally inside the other sbb-angular
   * components) we need to check whether the attribute svgicon is used.
   */
  @state() private accessor _sbbAngularCompatibility = false;

  protected override async fetchSvgIcon(namespace: string, name: string): Promise<string> {
    // If the icon is changing, and we were using the defaultAriaLabel, reset it
    if (this.getAttribute('aria-label') === this._defaultAriaLabel) {
      this.removeAttribute('aria-label');
    }

    this._defaultAriaLabel = `Icon ${name.replace(/-/g, ' ')}`;

    // generate a default label in case user does not provide their own
    // and aria-hidden is set to "false"
    if (this.getAttribute('aria-hidden') === 'false' && !this.hasAttribute('aria-label') && name) {
      this.setAttribute('aria-label', this._defaultAriaLabel);
    }

    return super.fetchSvgIcon(namespace, name);
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('name') && this.name) {
      this.loadSvgIcon(this.name);
    }
  }

  public override attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ): void {
    if (name === 'svgicon') {
      this._sbbAngularCompatibility = !!value;
    } else {
      super.attributeChangedCallback(name, _old, value);
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    if (!this.hasAttribute('aria-hidden')) {
      this.setAttribute('aria-hidden', 'true');
    }
  }

  protected override render(): TemplateResult {
    return this._sbbAngularCompatibility ? html`<slot></slot>` : super.render();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-icon': SbbIconElement;
  }
}
