import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { type CSSResultGroup, html, isServer, LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { IS_FOCUSABLE_QUERY } from '../../core/a11y.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { forceType } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import { i18nFlipCard, i18nReverseCard } from '../../core/i18n.js';
import { SbbHydrationMixin } from '../../core/mixins.js';
import type { SbbFlipCardDetailsElement } from '../flip-card-details.js';
import type { SbbFlipCardSummaryElement } from '../flip-card-summary.js';

import style from './flip-card.scss?lit&inline';

import '../../button/secondary-button-static.js';
import '../../screen-reader-only.js';

/**
 * Displays an informative card that reveals more information upon being clicked.
 *
 * @slot - Use the unnamed slot to add a `sbb-flip-card-summary` and a `sbb-flip-card-details` element.
 * @event {CustomEvent<void>} flip - Emits when the flip card flips.
 *
 */
export
@customElement('sbb-flip-card')
class SbbFlipCardElement extends SbbHydrationMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    flip: 'flip',
  } as const;

  /**
   * This will be forwarded as aria-label to the action in the non flipped state.
   * If not set, the textContent of the `sbb-flip-card-summary` is taken.
   */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /** Emits whenever the component is flipped. */
  protected flip: EventEmitter = new EventEmitter(this, SbbFlipCardElement.events.flip);

  /** Returns the slotted sbb-flip-card-summary. */
  public get summary(): SbbFlipCardSummaryElement | null {
    return this.querySelector?.('sbb-flip-card-summary');
  }

  /** Returns the slotted sbb-flip-card-details. */
  public get details(): SbbFlipCardDetailsElement | null {
    return this.querySelector?.('sbb-flip-card-details');
  }

  /** Returns the card details content element wrapper. */
  private get _detailsContentElement(): HTMLElement | null {
    return this.details!.shadowRoot!.firstElementChild as HTMLElement;
  }

  /** Whether the flip card is flipped. */
  public get isFlipped(): boolean {
    return this._flipped;
  }

  /** Whether the card is flipped or not. */
  @state() private accessor _flipped = false;

  private _language = new SbbLanguageController(this);
  private _cardDetailsResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => this._setCardDetailsHeight(),
  });

  public constructor() {
    super();
    this.addEventListener?.('click', (event: Event) => {
      if (event.target === this || !(event.target as HTMLElement)?.matches?.(IS_FOCUSABLE_QUERY)) {
        this.toggle();
      }
    });
  }

  /** Toggles the state of the sbb-flip-card. */
  public toggle(): void {
    this._flipped = !this._flipped;
    if (this._flipped) {
      this._setCardDetailsHeight();
      this._cardDetailsResizeObserver.observe(this._detailsContentElement!);
    } else {
      this._cardDetailsResizeObserver.unobserve(this._detailsContentElement!);
    }
    this.toggleAttribute('data-flipped', this._flipped);
    this.details!.toggleAttribute('data-flipped', this._flipped);
    this.summary!.inert = this._flipped;
    this.details!.inert = !this._flipped;
    this.flip.emit();
  }

  private _setCardDetailsHeight(): any {
    const contentHeight = Math.floor(this._detailsContentElement!.offsetHeight);
    this.style?.setProperty('--sbb-flip-card-details-height', `${contentHeight}px`);
  }

  private async _accessibilityLabel(): Promise<string> {
    if (isServer) {
      return '';
    }
    await this.hydrationComplete;

    return !this._flipped
      ? `${(this.accessibilityLabel ? this.accessibilityLabel : this.summary?.textContent?.trim()) ?? ''}, ${i18nFlipCard[this._language.current]}`
      : i18nReverseCard[this._language.current];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-flip-card">
        <button
          class="sbb-flip-card-button"
          aria-expanded=${this._flipped.toString()}
          type="button"
        >
          <sbb-screen-reader-only>${until(this._accessibilityLabel(), '')}</sbb-screen-reader-only>
        </button>
        <slot name="summary" @slotchange=${() => (this.summary!.inert = this._flipped)}></slot>
        <slot name="details" @slotchange=${() => (this.details!.inert = !this._flipped)}></slot>
        <sbb-secondary-button-static class="sbb-flip-card--toggle-button" size="s">
          <sbb-icon
            class="sbb-flip-card--toggle-button-icon"
            slot="icon"
            name="plus-small"
          ></sbb-icon>
        </sbb-secondary-button-static>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-flip-card': SbbFlipCardElement;
  }
}
