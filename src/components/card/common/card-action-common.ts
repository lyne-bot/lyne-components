import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { IS_FOCUSABLE_QUERY } from '../../core/a11y';
import {
  type AbstractConstructor,
  hostAttributes,
  type SbbActionBaseElement,
} from '../../core/common-behaviors';
import { AgnosticMutationObserver } from '../../core/observers';
import type { SbbCardElement } from '../card';

import '../../screen-reader-only';

import style from './card-action.scss?lit&inline';

export declare class SbbCardActionCommonElementMixinType {
  public active: boolean;
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

    private _card: SbbCardElement | null = null;
    private _cardMutationObserver = new AgnosticMutationObserver(() =>
      this._checkForSlottedActions(),
    );

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
            el.tagName !== 'SBB-CARD-LINK' &&
            el.tagName !== 'SBB-CARD-BUTTON' &&
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
        this._card.dataset.actionRole = this.getAttribute('role')!;

        this._checkForSlottedActions();
        this._cardMutationObserver.observe(this._card, {
          childList: true,
          subtree: true,
        });
      }
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      if (this._card) {
        this._card.toggleAttribute('data-has-action', false);
        this._card.toggleAttribute('data-has-active-action', false);
        this._card.toggleAttribute('data-action-role', false);
        this._card
          .querySelectorAll(`[data-card-focusable]`)
          .forEach((el) => el.removeAttribute('data-card-focusable'));
        this._card = null;
      }
      this._cardMutationObserver.disconnect();
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
