import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import type { SbbAutocompleteBaseElement } from '../../autocomplete.js';
import { forceType, hostAttributes } from '../../core/decorators.js';
import { isSafari, setOrRemoveAttribute } from '../../core/dom.js';
import { SbbDisabledMixin, SbbHydrationMixin } from '../../core/mixins.js';
import type { SbbOptionBaseElement } from '../option.js';

import style from './optgroup-base-element.scss?lit&inline';

import '../../divider.js';

/**
 * On Safari, the groups labels are not read by VoiceOver.
 * To solve the problem, we remove the role="group" and add a hidden span containing the group name
 * TODO: We should periodically check if it has been solved and, if so, remove the property.
 */
const inertAriaGroups = isSafari;

export
@hostAttributes({ role: !inertAriaGroups ? 'group' : null })
abstract class SbbOptgroupBaseElement extends SbbDisabledMixin(SbbHydrationMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;

  /** Option group label. */
  @forceType()
  @property()
  public accessor label: string = '';

  @state() protected accessor negative = false;

  @state() private accessor _inertAriaGroups = false;

  protected abstract get options(): SbbOptionBaseElement[];

  public constructor() {
    super();

    new MutationController(this, {
      config: {
        attributes: true,
        attributeFilter: ['data-negative'],
      },
      callback: () => this._onNegativeChange(),
    });

    if (inertAriaGroups) {
      if (this.hydrationRequired) {
        this.hydrationComplete.then(() => (this._inertAriaGroups = inertAriaGroups));
      } else {
        this._inertAriaGroups = inertAriaGroups;
      }
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.setAttributeFromParent();
    this._proxyGroupLabelToOptions();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('disabled')) {
      if (!this._inertAriaGroups) {
        if (this.disabled) {
          this.setAttribute('aria-disabled', 'true');
        } else {
          this.removeAttribute('aria-disabled');
        }
      }

      this.proxyDisabledToOptions();
    }
    if (changedProperties.has('label')) {
      this._proxyGroupLabelToOptions();
    }
  }

  protected abstract setAttributeFromParent(): void;
  protected abstract getAutocompleteParent(): SbbAutocompleteBaseElement | null;

  private _handleSlotchange(): void {
    this.proxyDisabledToOptions();
    this._proxyGroupLabelToOptions();
    this._highlightOptions();
  }

  private _proxyGroupLabelToOptions(): void {
    if (!this._inertAriaGroups) {
      setOrRemoveAttribute(this, 'aria-label', this.label);
      return;
    } else if (this.label) {
      this.removeAttribute('aria-label');
      for (const option of this.options) {
        option.setAttribute('data-group-label', this.label);
        option.requestUpdate?.();
      }
    } else {
      for (const option of this.options) {
        option.removeAttribute('data-group-label');
        option.requestUpdate?.();
      }
    }
  }

  protected proxyDisabledToOptions(): void {
    for (const option of this.options) {
      option.toggleAttribute('data-group-disabled', this.disabled);
    }
  }

  private _highlightOptions(): void {
    const autocomplete = this.getAutocompleteParent();
    if (!autocomplete) {
      return;
    }
    const value = autocomplete.triggerElement?.value;
    if (!value) {
      return;
    }
    this.options.forEach((opt) => opt.highlight(value));
  }

  private _onNegativeChange(): void {
    this.negative = this.hasAttribute('data-negative');
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-optgroup__divider">
        <sbb-divider ?negative=${this.negative}></sbb-divider>
      </div>
      <div class="sbb-optgroup__label" aria-hidden="true">
        <div class="sbb-optgroup__icon-space"></div>
        <span>${this.label}</span>
      </div>
      <slot @slotchange=${this._handleSlotchange}></slot>
    `;
  }
}
