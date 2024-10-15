import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import type { SbbDateLike } from '@sbb-esta/lyne-elements/core/interfaces/types';
import { addMinutes, differenceInMinutes, format, isAfter, isBefore } from 'date-fns';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { removeTimezoneFromISOTimeString } from '../core/datetime.js';
import type { SbbPearlChainLegElement } from '../pearl-chain-leg.js';

import style from './pearl-chain.scss?lit&inline';

import '../pearl-chain-leg.js';
import { i18nArrival, i18nDeparture } from '@sbb-esta/lyne-elements/core/i18n.js';

type Status = 'progress' | 'future' | 'past';

/**
 * It visually displays journey information.
 */
export
@customElement('sbb-pearl-chain')
class SbbPearlChainElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Whether the marker should be pulsing or static. */
  @property() public marker: 'static' | 'pulsing' = 'static';

  /** Prop to render the departure time - will be formatted as "H:mm" */
  @property()
  public set departure(value: SbbDateLike | null) {
    this._departure = value;
  }
  public get departure(): SbbDateLike | null {
    return this._departure;
  }
  private _departure: SbbDateLike | null = null;

  /** Prop to render the arrival time - will be formatted as "H:mm" */
  @property()
  public set arrival(value: SbbDateLike | null) {
    this._arrival = value;
  }
  public get arrival(): SbbDateLike | null {
    return this._arrival;
  }
  private _arrival: SbbDateLike | null = null;

  /** A configured date which acts as the current date instead of the real current date. Recommended for testing purposes. */
  @property()
  public set now(value: SbbDateLike | undefined) {
    this._now = defaultDateAdapter.getValidDateOrNull(defaultDateAdapter.deserialize(value));
  }
  public get now(): Date | null {
    return this._now;
  }
  private _now: Date | null = null;

  private _language = new SbbLanguageController(this);

  private _legs(): SbbPearlChainLegElement[] {
    return Array.from(this.querySelectorAll('sbb-pearl-chain-leg'));
  }

  private _getAllDuration(legs: SbbPearlChainLegElement[]): number {
    return legs?.reduce((sum: number, leg) => {
      const arrivalNoTz = removeTimezoneFromISOTimeString(
        defaultDateAdapter.deserialize(leg.arrival)?.toISOString(),
      );
      const departureNoTz = removeTimezoneFromISOTimeString(
        defaultDateAdapter.deserialize(leg.departure)?.toISOString(),
      );
      if (arrivalNoTz && departureNoTz) {
        return (
          sum +
          differenceInMinutes(
            removeTimezoneFromISOTimeString(
              defaultDateAdapter.deserialize(leg.arrival)?.toISOString(),
            )!,
            removeTimezoneFromISOTimeString(
              defaultDateAdapter.deserialize(leg.departure)?.toISOString(),
            )!,
          )
        );
      }
      return sum;
    }, 0);
  }

  private _isAllCancelled(legs: SbbPearlChainLegElement[]): boolean {
    return legs?.every((leg) => leg?.disruption);
  }

  private _getRelativeDuration(
    legs: SbbPearlChainLegElement[],
    leg: SbbPearlChainLegElement,
  ): number {
    const arrivalNoTz = removeTimezoneFromISOTimeString(
      defaultDateAdapter.deserialize(leg.arrival)?.toISOString(),
    );
    const departureNoTz = removeTimezoneFromISOTimeString(
      defaultDateAdapter.deserialize(leg.departure)?.toISOString(),
    );
    if (arrivalNoTz && departureNoTz) {
      const duration = differenceInMinutes(
        removeTimezoneFromISOTimeString(
          defaultDateAdapter.deserialize(leg.arrival)?.toISOString(),
        )!,
        removeTimezoneFromISOTimeString(
          defaultDateAdapter.deserialize(leg.departure)?.toISOString(),
        )!,
      );
      const allDurations = this._getAllDuration(legs);

      if (allDurations === 0) {
        return 100;
      }

      return (duration / allDurations) * 100;
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

  private _addMinutes(d: SbbDateLike, amount: number): Date {
    return addMinutes(defaultDateAdapter.deserialize(d)!, amount);
  }

  private _getLegStatus(now: Date, leg: SbbPearlChainLegElement): Status {
    const start = this._addMinutes(leg.departure!, leg.departureDelay);
    const end = this._addMinutes(leg.arrival!, leg.arrivalDelay);
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

  private _renderContent(content: TemplateResult): TemplateResult {
    return html`
      <div class="sbb-pearl-chain__wrapper">
        ${this.departure && this.arrival
          ? html`<time class="sbb-pearl-chain__time" datetime=${this.departure!}>
              <span class="sbb-screen-reader-only"
                >${i18nDeparture[this._language.current]}:&nbsp;</span
              >
              ${format(this.departure, 'HH:mm')}
            </time>`
          : nothing}
        ${content}
        ${this.arrival && this.departure
          ? html`<time class="sbb-pearl-chain__time" datetime=${this.arrival!}>
              <span class="sbb-screen-reader-only"
                >${i18nArrival[this._language.current]}:&nbsp;</span
              >
              ${format(this.arrival, 'HH:mm')}
            </time>`
          : nothing}
      </div>
    `;
  }

  private _renderPosition(now: Date, progressLeg: SbbPearlChainLegElement): void {
    const currentPosition = this._getProgress(
      now,
      this._addMinutes(progressLeg.departure!, progressLeg.departureDelay),
      this._addMinutes(progressLeg.arrival!, progressLeg.arrivalDelay),
    );
    if (currentPosition < 0 && currentPosition > 100) {
      return;
    }

    const animation = this.marker === 'static' ? 'sbb-pearl-chain__position--no-animation' : '';

    progressLeg?.classList.add(animation);
    progressLeg?.style.setProperty('--sbb-pearl-chain-status-position', `${currentPosition}%`);
    if (currentPosition >= 50) {
      progressLeg?.style.setProperty('transform', `translateX(-100%)`);
    }
  }

  protected override render(): TemplateResult {
    const now = this.now ?? new Date();

    const rideLegs: SbbPearlChainLegElement[] = this._legs();

    if (!rideLegs.length) {
      // TODO
      return html``;
    }

    const departureWithDelay = this._addMinutes(rideLegs[0].departure!, rideLegs[0].departureDelay);

    const arrivalTimeDelay = this._addMinutes(
      rideLegs[rideLegs.length - 1].arrival!,
      rideLegs[rideLegs.length - 1].arrivalDelay,
    );

    const departureNotServiced = ((): string => {
      return rideLegs && rideLegs[0]?.departureSkipped ? 'sbb-pearl-chain--departure-skipped' : '';
    })();

    const arrivalNotServiced = ((): string => {
      return rideLegs && rideLegs[rideLegs.length - 1]?.arrivalSkipped
        ? 'sbb-pearl-chain--arrival-skipped'
        : '';
    })();

    const departureCancelClass = ((): string => {
      return rideLegs && rideLegs[0]?.disruption ? 'sbb-pearl-chain--departure-disruption' : '';
    })();

    const arrivalCancelClass = ((): string => {
      return rideLegs && rideLegs[rideLegs.length - 1]?.disruption
        ? 'sbb-pearl-chain--arrival-disruption'
        : '';
    })();

    const status = departureWithDelay && arrivalTimeDelay && this._getLegStatus(now, rideLegs[0]);

    const statusClassDeparture =
      rideLegs && status && !departureCancelClass ? 'sbb-pearl-chain__bullet--' + status : '';

    const statusClassArrival =
      rideLegs && status && !arrivalCancelClass
        ? 'sbb-pearl-chain__bullet--' + this._getStatus(now, undefined, arrivalTimeDelay)
        : '';

    rideLegs[0]?.toggleAttribute('data-first-leg', true);
    rideLegs[rideLegs.length - 1].toggleAttribute('data-last-leg', true);

    rideLegs.map((leg, index) => {
      const status = this._getLegStatus(now, leg);

      leg.style.setProperty(
        '--sbb-pearl-chain-leg-weight',
        `${this._getRelativeDuration(rideLegs, leg) / 100}`,
      );
      leg.past = status === 'past';
      leg.toggleAttribute('data-progress', status === 'progress');

      if (status === 'progress') {
        this._renderPosition(now, leg);
      }

      //If previous leg has arrival-skipped an attribute is set to style the stop
      if (index > 0 && rideLegs[index - 1]) {
        leg.toggleAttribute('data-skip-departure', !!rideLegs[index - 1].arrivalSkipped);
      }
    });

    if (this._isAllCancelled(rideLegs)) {
      return this._renderContent(html`
        <div class="sbb-pearl-chain">
          <span class="sbb-pearl-chain__bullet sbb-pearl-chain--departure-disruption"></span>
          <sbb-pearl-chain-leg disruption data-first-leg data-last-leg></sbb-pearl-chain-leg>
          <span class="sbb-pearl-chain__bullet sbb-pearl-chain--departure-disruption"></span>
        </div>
      `);
    }

    return this._renderContent(html`
      <div class="sbb-pearl-chain">
        <span
          class="sbb-pearl-chain__bullet ${statusClassDeparture} ${departureNotServiced} ${departureCancelClass}"
        ></span>
        <slot></slot>
        <span
          class="sbb-pearl-chain__bullet ${statusClassArrival} ${arrivalNotServiced} ${arrivalCancelClass}"
        ></span>
      </div>
    `);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain': SbbPearlChainElement;
  }
}
