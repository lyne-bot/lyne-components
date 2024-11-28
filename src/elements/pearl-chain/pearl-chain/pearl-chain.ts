import { addMinutes, differenceInMinutes, isAfter, isBefore } from 'date-fns';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { type DateAdapter, defaultDateAdapter } from '../../core/datetime.js';
import type { SbbDateLike } from '../../core/interfaces/types.js';
import '../pearl-chain-leg.js';
import type { SbbPearlChainLegElement } from '../pearl-chain-leg.js';

import style from './pearl-chain.scss?lit&inline';

type Status = 'progress' | 'future' | 'past';

/**
 * It visually displays journey information.
 */
export
@customElement('sbb-pearl-chain')
class SbbPearlChainElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Whether the marker should be pulsing or static. */
  @property()
  public accessor marker: 'static' | 'pulsing' = 'static';

  /** A configured date which acts as the current date instead of the real current date. Recommended for testing purposes. */
  @property()
  public set now(value: Date) {
    this._now =
      this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)) ?? new Date();
  }

  public get now(): Date {
    return this._now;
  }

  private _now: Date = new Date();

  private _dateAdapter: DateAdapter<Date> = defaultDateAdapter;

  private _legs(): SbbPearlChainLegElement[] {
    return Array.from(this.querySelectorAll?.('sbb-pearl-chain-leg') ?? []);
  }

  private _totalDuration(legs: SbbPearlChainLegElement[]): number {
    return legs?.reduce((sum: number, leg) => {
      const arrivalNoTz = this._dateAdapter.deserialize(leg.arrival);
      const departureNoTz = this._dateAdapter.deserialize(leg.departure) as Date;
      if (arrivalNoTz && departureNoTz) {
        return sum + differenceInMinutes(arrivalNoTz, departureNoTz);
      }
      return sum;
    }, 0);
  }

  private _getRelativeDuration(totalDuration: number, leg: SbbPearlChainLegElement): number {
    const arrivalNoTz = this._dateAdapter.deserialize(leg.arrival);
    const departureNoTz = this._dateAdapter.deserialize(leg.departure);
    if (arrivalNoTz && departureNoTz) {
      const duration = differenceInMinutes(arrivalNoTz, departureNoTz);

      if (totalDuration === 0) {
        return 100;
      }

      return (duration / totalDuration) * 100;
    }
    return 0;
  }

  private _getProgress(now: Date, start: Date, end: Date): number {
    if (!start || !end) {
      return 0;
    }

    const total = differenceInMinutes(end, start);
    const progress = differenceInMinutes(now, start);

    return total && (progress / total) * 100;
  }

  private _addMinutes(d: SbbDateLike<Date> | null, amount: number): Date {
    const date: Date | null = this._dateAdapter.deserialize(d);
    return date ? addMinutes(date, amount) : this._dateAdapter.invalid();
  }

  private _getLegStatus(now: Date, leg: SbbPearlChainLegElement): Status {
    const start = this._addMinutes(leg.departure, leg.departureDelay);
    const end = this._addMinutes(leg.arrival, leg.arrivalDelay);
    return this._getStatus(now, start, end);
  }

  private _getStatus(now: Date, start?: Date, end?: Date): Status {
    if (start && isBefore(start, now) && end && isAfter(end, now)) {
      return 'progress';
    } else if (end && isBefore(end, now)) {
      return 'past';
    }
    return 'future';
  }

  private _renderPosition(now: Date, progressLeg: SbbPearlChainLegElement): void {
    const currentPosition = this._getProgress(
      now,
      this._addMinutes(progressLeg.departure, progressLeg.departureDelay),
      this._addMinutes(progressLeg.arrival, progressLeg.arrivalDelay),
    );
    if (currentPosition < 0 && currentPosition > 100) {
      return;
    }

    progressLeg?.style.setProperty('--sbb-pearl-chain-status-position', `${currentPosition / 100}`);
  }

  private _getBullet(index: number): Element {
    const a = Array.from(this.shadowRoot!.querySelectorAll('.sbb-pearl-chain__bullet'));
    return a[index];
  }

  private _getFirstBullet(): Element {
    return this._getBullet(0);
  }

  private _getLastBullet(): Element {
    return this._getBullet(1);
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    this._setUpComponent();
  }

  private _configureBullet(bullet: Element, leg: SbbPearlChainLegElement, first: boolean): void {
    const status = this._getLegStatus(this.now, leg);

    bullet.toggleAttribute('data-disrupted', leg.disruption);
    bullet.toggleAttribute('data-skipped', first ? leg.departureSkipped : leg.arrivalSkipped);
    bullet.toggleAttribute('data-past', status === 'past' || (status === 'progress' && first));
  }

  private _setUpComponent(): void {
    const legs: SbbPearlChainLegElement[] = this._legs();

    this._configureBullet(this._getFirstBullet(), legs[0], true);
    this._configureBullet(this._getLastBullet(), legs[legs.length - 1], false);

    legs.map((leg, index) => {
      const status = this._getLegStatus(this.now, leg);

      leg.style.setProperty(
        '--sbb-pearl-chain-leg-weight',
        `${this._getRelativeDuration(this._totalDuration(legs), leg) / 100}`,
      );
      leg.past = status === 'past';
      leg.toggleAttribute('data-progress', status === 'progress');

      if (status === 'progress') {
        this._renderPosition(this.now, leg);
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
