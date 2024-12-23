import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import {
  i18nArrival,
  i18nDeparture,
  i18nTransferProcedures,
} from '@sbb-esta/lyne-elements/core/i18n.js';
import type { SbbDateLike } from '@sbb-esta/lyne-elements/core/interfaces/types';
import { format } from 'date-fns';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { removeTimezoneFromISOTimeString } from '../core/datetime.js';
import type { Leg, PtRideLeg } from '../core/timetable.js';
import { getDepartureArrivalTimeAttribute, isRideLeg } from '../core/timetable.js';

import style from './pearl-chain-time.scss?lit&inline';

import '../pearl-chain.js';

/**
 * Combined with `sbb-pearl-chain`, it displays walk time information.
 */
export
@customElement('sbb-pearl-chain-time')
class SbbPearlChainTimeElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * define the legs of the pearl-chain.
   * Format:
   * `{"legs": [{"duration": 25}, ...]}`
   * `duration` in minutes. Duration of the leg is relative
   * to the total travel time. Example: departure 16:30, change at 16:40,
   * arrival at 17:00. So the change should have a duration of 33.33%.
   */
  @property({ type: Array }) public accessor legs: (Leg | PtRideLeg)[] = [];

  /** Prop to render the departure time - will be formatted as "H:mm" */
  @forceType()
  @property({ attribute: 'departure-time' })
  public accessor departureTime: string = '';

  /** Prop to render the arrival time - will be formatted as "H:mm" */
  @forceType()
  @property({ attribute: 'arrival-time' })
  public accessor arrivalTime: string = '';

  /** Optional prop to render the walk time (in minutes) before departure */
  @forceType()
  @property({ attribute: 'departure-walk', type: Number })
  public accessor departureWalk: number = NaN;

  /** Optional prop to render the walk time (in minutes) after arrival */
  @forceType()
  @property({ attribute: 'arrival-walk', type: Number })
  public accessor arrivalWalk: number = NaN;

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @forceType()
  @property({ attribute: 'disable-animation', type: Boolean })
  public accessor disableAnimation: boolean = false;

  /** Optional prop to render wheelchair-small instead of walk-small */
  @forceType()
  @property({ attribute: 'a11y-footpath', type: Boolean })
  public accessor a11yFootpath: boolean = false;

  /** A configured date which acts as the current date instead of the real current date. Recommended for testing purposes. */
  @property()
  public set now(value: SbbDateLike | undefined) {
    this._now = defaultDateAdapter.getValidDateOrNull(defaultDateAdapter.deserialize(value));
  }
  public get now(): Date {
    return this._now ?? new Date();
  }
  private _now: Date | null = null;

  private _language = new SbbLanguageController(this);

  protected override render(): TemplateResult {
    const departure: Date | undefined = this.departureTime
      ? removeTimezoneFromISOTimeString(this.departureTime)
      : undefined;
    const arrival: Date | undefined = this.arrivalTime
      ? removeTimezoneFromISOTimeString(this.arrivalTime)
      : undefined;

    const { renderDepartureTimeAttribute, renderArrivalTimeAttribute } =
      getDepartureArrivalTimeAttribute(
        this.legs,
        this.departureWalk || 0,
        this.arrivalWalk || 0,
        this._language.current,
        this.a11yFootpath,
      );

    const rideLegs = this.legs?.filter((leg) => isRideLeg(leg));
    return html`
      <div class="sbb-pearl-chain__time">
        ${renderDepartureTimeAttribute()}
        ${departure
          ? html`<time class="sbb-pearl-chain__time-time" datetime=${this.departureTime!}>
              <span class="sbb-screen-reader-only"
                >${i18nDeparture[this._language.current]}:&nbsp;</span
              >
              ${format(departure, 'HH:mm')}
            </time>`
          : nothing}
        ${rideLegs?.length > 1
          ? html`<span class="sbb-screen-reader-only" role="paragraph">
              ${rideLegs?.length - 1} ${i18nTransferProcedures[this._language.current]}
            </span>`
          : nothing}
        <sbb-pearl-chain
          class="sbb-pearl-chain__time-chain"
          .legs=${this.legs}
          .disableAnimation=${this.disableAnimation}
          .now=${this.now}
        ></sbb-pearl-chain>
        ${arrival
          ? html`<time class="sbb-pearl-chain__time-time" datetime=${this.arrivalTime!}>
              <span class="sbb-screen-reader-only"
                >${i18nArrival[this._language.current]}:&nbsp;</span
              >
              ${format(arrival, 'HH:mm')}
            </time>`
          : nothing}
        ${renderArrivalTimeAttribute()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain-time': SbbPearlChainTimeElement;
  }
}
