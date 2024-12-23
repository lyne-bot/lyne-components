import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { IS_FOCUSABLE_QUERY } from '../../core/a11y.js';
import type { SbbActionBaseElement } from '../../core/base-elements.js';
import { hostAttributes } from '../../core/decorators.js';
import type { AbstractConstructor } from '../../core/mixins.js';
import type { SbbCardElement } from '../card.js';

import style from './card-action.scss?lit&inline';

import '../../screen-reader-only.js';

export declare class SbbCardActionCommonElementMixinType {
  public accessor active: boolean;
  protected actionRole: 'link' | 'button';
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbCardActionCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbCardActionCommonElementMixinType> & T => {
  @hostAttributes({
    slot: 'action',
  })
  abstract class SbbCardActionCommonElement
    extends superClass
    implements Partial<SbbCardActionCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /** Whether the card is active. */
    @property({ reflect: true, type: Boolean })
    public set active(value: boolean) {
      this._active = value;
      this._onActiveChange();
    }
    public get active(): boolean {
      return this._active;
    }
    private _active: boolean = false;

    protected abstract actionRole: 'link' | 'button';

    private _card: SbbCardElement | null = null;
    private _cardMutationObserver = new MutationController(this, {
      target: null,
      config: { childList: true, subtree: true },
      callback: () => this._checkForSlottedActions(),
    });

    private _onActiveChange(): void {
      if (this._card) {
        this._card.toggleAttribute('data-has-active-action', this.active);
      }
    }

    private _checkForSlottedActions(): void {
      const cardFocusableAttributeName = 'data-card-focusable';

      Array.from(this._card?.querySelectorAll?.(IS_FOCUSABLE_QUERY) ?? [])
        .filter(
          (el) =>
            el.localName !== 'sbb-card-link' &&
            el.localName !== 'sbb-card-button' &&
            !el.hasAttribute(cardFocusableAttributeName),
        )
        .forEach((el: Element) => el.setAttribute(cardFocusableAttributeName, ''));
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._card = this.closest?.('sbb-card');
      if (this._card) {
        this._card.toggleAttribute('data-has-action', true);
        this._card.toggleAttribute('data-has-active-action', this.active);
        this._card.setAttribute('data-action-role', this.actionRole);

        this._checkForSlottedActions();
        this._cardMutationObserver.observe(this._card);
      }
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      if (this._card) {
        ['data-has-action', 'data-has-active-action', 'data-action-role'].forEach((name) =>
          this._card!.removeAttribute(name),
        );
        this._card
          .querySelectorAll(`[data-card-focusable]`)
          .forEach((el) => el.removeAttribute('data-card-focusable'));
        this._card = null;
      }
    }

    protected override renderTemplate(): TemplateResult {
      return html`
        <sbb-screen-reader-only>
          <slot></slot>
        </sbb-screen-reader-only>
      `;
    }
  }
  return SbbCardActionCommonElement as unknown as AbstractConstructor<SbbCardActionCommonElementMixinType> &
    T;
};
