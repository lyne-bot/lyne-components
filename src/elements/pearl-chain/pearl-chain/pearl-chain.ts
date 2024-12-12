import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../pearl-chain-leg.js';
import { TimeAdapter } from '../../core/datetime.js';
import { SbbHydrationMixin } from '../../core/mixins/hydration-mixin.js';
import type { SbbPearlChainLegElement } from '../pearl-chain-leg.js';

import style from './pearl-chain.scss?lit&inline';

type Status = 'progress' | 'future' | 'past';

/**
 * It visually displays journey information.
 *
 * @slot - Use the unnamed slot to add `sbb-pearl-chain-leg`s to the pearl-chain.
 */
export
@customElement('sbb-pearl-chain')
class SbbPearlChainElement extends SbbHydrationMixin(LitElement) {
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
    return this._now;
  }

  private _now: Date = new Date();

  private _timeAdapter: TimeAdapter = new TimeAdapter();

  public constructor() {
    super();

    this.addEventListener('leg-updated', (event) => {
      event.stopPropagation();
      this._setUpComponent();
    });
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

  private _getProgress(start: Date, end: Date): number {
    if (!start || !end) {
      return 0;
    }

    const total = this._timeAdapter.differenceInMinutes(end, start);
    const progress = this._timeAdapter.differenceInMinutes(this.now, start);

    return total && progress / total;
  }

  private _getLegStatus(leg: SbbPearlChainLegElement): Status {
    const start = this._timeAdapter.addMinutes(leg.departure, leg.departureDelay);
    const end = this._timeAdapter.addMinutes(leg.arrival, leg.arrivalDelay);
    return this._getStatus(start, end);
  }

  private _getStatus(start?: Date, end?: Date): Status {
    if (
      start &&
      !this._timeAdapter.isBefore(this.now, start) &&
      end &&
      this._timeAdapter.isAfter(end, this.now)
    ) {
      return 'progress';
    } else if (end && !this._timeAdapter.isBefore(this.now, end)) {
      return 'past';
    }
    return 'future';
  }

  private _renderPosition(progressLeg: SbbPearlChainLegElement): void {
    const currentPosition = this._getProgress(
      this._timeAdapter.addMinutes(progressLeg.departure, progressLeg.departureDelay),
      this._timeAdapter.addMinutes(progressLeg.arrival, progressLeg.arrivalDelay),
    );
    if (currentPosition < 0 && currentPosition > 100) {
      return;
    }

    progressLeg?.style.setProperty('--sbb-pearl-chain-status-position', `${currentPosition}`);
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
    const status = this._getLegStatus(leg);

    bullet.toggleAttribute('data-disrupted', leg.disruption);
    bullet.toggleAttribute('data-skipped', first ? leg.departureSkipped : leg.arrivalSkipped);
    bullet.toggleAttribute('data-past', status === 'past' || (status === 'progress' && first));
  }

  private _setUpComponent(): void {
    const legs: SbbPearlChainLegElement[] = this._legs();

    this._configureBullet(this._getFirstBullet(), legs[0], true);
    this._configureBullet(this._getLastBullet(), legs[legs.length - 1], false);

    legs.map((leg, index) => {
      const status = this._getLegStatus(leg);

      leg.style.setProperty(
        '--sbb-pearl-chain-leg-weight',
        `${this._getRelativeDuration(this._totalDuration(legs), leg)}`,
      );
      leg.past = status === 'past';
      leg.toggleAttribute('data-progress', status === 'progress');

      if (status === 'progress') {
        this._renderPosition(leg);
      }

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
          <span class="sbb-pearl-chain__bullet"></span>
          <slot></slot>
          <span class="sbb-pearl-chain__bullet"></span>
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
