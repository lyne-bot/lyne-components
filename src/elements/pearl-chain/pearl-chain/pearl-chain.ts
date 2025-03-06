import { type CSSResultGroup, isServer, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../pearl-chain-leg.js';
import { TimeAdapter } from '../../core/datetime.js';
import type { SbbPearlChainLegElement } from '../pearl-chain-leg.js';

import style from './pearl-chain.scss?lit&inline';

/**
 * It visually displays journey information.
 *
 * @slot - Use the unnamed slot to add `sbb-pearl-chain-leg`s to the pearl-chain.
 */
export
@customElement('sbb-pearl-chain')
class SbbPearlChainElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Whether the marker should be pulsing or static. */
  @property()
  public accessor marker: 'static' | 'pulsing' = 'static';

  /** A configured date which acts as the current date instead of the real current date. Recommended for testing purposes. */
  @property({ type: Date })
  public set now(value: Date | string | number | null) {
    const valueAsDate = this._timeAdapter.deserialize(value);
    this._now = this._timeAdapter.isValid(valueAsDate) ? valueAsDate : new Date();
  }

  public get now(): Date {
    return this._now ?? new Date();
  }

  private _now: Date | undefined = undefined;

  private _timeAdapter: TimeAdapter = new TimeAdapter();

  public constructor() {
    super();

    if (!isServer) {
      this.addEventListener('leg-updated', (event) => {
        event.stopPropagation();
        this._setUpComponent();
      });
    }
  }

  private _legs(): SbbPearlChainLegElement[] {
    return Array.from(this.querySelectorAll?.('sbb-pearl-chain-leg') ?? []);
  }

  private _totalDuration(legs: SbbPearlChainLegElement[]): number {
    return legs?.reduce((sum: number, leg) => {
      const arrivalNoTz = this._timeAdapter.deserialize(leg.arrival);
      const departureNoTz = this._timeAdapter.deserialize(leg.departure);
      if (arrivalNoTz && departureNoTz) {
        return sum + this._timeAdapter.differenceInMinutes(arrivalNoTz, departureNoTz);
      }
      return sum;
    }, 0);
  }

  private _getRelativeDuration(totalDuration: number, leg: SbbPearlChainLegElement): number {
    if (this._timeAdapter.isValid(leg.arrival) && this._timeAdapter.isValid(leg.departure)) {
      const duration = this._timeAdapter.differenceInMinutes(leg.arrival, leg.departure);

      if (totalDuration === 0) {
        return 1;
      }

      return duration / totalDuration;
    }
    return 0;
  }

  private _getFirstBullet(): Element {
    return Array.from(this.shadowRoot!.querySelectorAll('.sbb-pearl-chain__bullet'))[0];
  }

  private _getLastBullet(): Element {
    return Array.from(this.shadowRoot!.querySelectorAll('.sbb-pearl-chain__bullet'))[1];
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    this._setUpComponent();
  }

  private _configureBullet(bullet: Element, leg: SbbPearlChainLegElement, first: boolean): void {
    leg.updateStatus(this.now);

    bullet.toggleAttribute('data-disrupted', leg.disruption);
    bullet.toggleAttribute('data-skipped', first ? leg.departureSkipped : leg.arrivalSkipped);
    bullet.toggleAttribute('data-past', leg.past || (leg.hasAttribute('data-progress') && first));
  }

  private _setUpComponent(): void {
    const legs: SbbPearlChainLegElement[] = this._legs();

    this._configureBullet(this._getFirstBullet(), legs[0], true);
    this._configureBullet(this._getLastBullet(), legs[legs.length - 1], false);

    legs.map((leg, index) => {
      leg.updateStatus(this.now);

      leg.style.setProperty(
        '--sbb-pearl-chain-leg-weight',
        `${this._getRelativeDuration(this._totalDuration(legs), leg)}`,
      );

      // If previous leg has arrival-skipped an attribute is set to style the stop
      if (index > 0 && legs[index - 1]) {
        leg.toggleAttribute('data-skip-departure', legs[index - 1].arrivalSkipped);
      }
    });
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-pearl-chain__wrapper">
        <div class="sbb-pearl-chain">
          <span class="sbb-pearl-chain__bullet">
            <span class="sbb-pearl-chain__stop-inner"></span>
          </span>
          <slot></slot>
          <span class="sbb-pearl-chain__bullet">
            <span class="sbb-pearl-chain__stop-inner"></span>
          </span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain': SbbPearlChainElement;
  }
}
