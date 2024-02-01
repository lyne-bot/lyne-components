import type { CSSResultGroup, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { IS_FOCUSABLE_QUERY } from '../../core/a11y';
import type { AbstractConstructor } from '../../core/common-behaviors';
import { toggleDatasetEntry } from '../../core/dom';
import { AgnosticMutationObserver } from '../../core/observers';
import type { SbbCardElement } from '../card';

import style from './card-action.scss?lit&inline';

export declare class SbbCardActionCommonElementMixinType {
  public active: boolean;
  protected card: SbbCardElement | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbCardActionCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbCardActionCommonElementMixinType> & T => {
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

    protected card: SbbCardElement | null = null;
    private _cardMutationObserver = new AgnosticMutationObserver(() =>
      this._checkForSlottedActions(),
    );

    private _onActiveChange(): void {
      if (this.card) {
        toggleDatasetEntry(this.card, 'hasActiveAction', this.active);
      }
    }

    private _checkForSlottedActions(): void {
      const cardFocusableAttributeName = 'data-card-focusable';

      Array.from(this.card?.querySelectorAll?.(IS_FOCUSABLE_QUERY) ?? [])
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
      this.card = this.closest?.('sbb-card');
      if (this.card) {
        toggleDatasetEntry(this.card, 'hasAction', true);
        toggleDatasetEntry(this.card, 'hasActiveAction', this.active);

        this._checkForSlottedActions();
        this._cardMutationObserver.observe(this.card, {
          childList: true,
          subtree: true,
        });
      }
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      if (this.card) {
        toggleDatasetEntry(this.card, 'hasAction', false);
        toggleDatasetEntry(this.card, 'hasActiveAction', false);
        toggleDatasetEntry(this.card, 'actionRole', false);
        this.card
          .querySelectorAll(`[data-card-focusable]`)
          .forEach((el) => el.removeAttribute('data-card-focusable'));
        this.card = null;
      }
      this._cardMutationObserver.disconnect();
    }
  }
  return SbbCardActionCommonElement as unknown as AbstractConstructor<SbbCardActionCommonElementMixinType> &
    T;
};
