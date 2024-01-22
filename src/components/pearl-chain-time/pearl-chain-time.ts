import { format } from 'date-fns';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { LanguageController } from '../core/common-behaviors';
import { removeTimezoneFromISOTimeString } from '../core/datetime';
import { i18nDeparture, i18nArrival, i18nTransferProcedures } from '../core/i18n';
import type { Leg, PtRideLeg } from '../core/timetable';
import { getDepartureArrivalTimeAttribute, isRideLeg } from '../core/timetable';
import '../pearl-chain';

import style from './pearl-chain-time.scss?lit&inline';

/**
 * Combined with `sbb-pearl-chain`, it displays walk time information.
 */
@customElement('sbb-pearl-chain-time')
export class SbbPearlChainTimeElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * define the legs of the pearl-chain.
   * Format:
   * `{"legs": [{"duration": 25}, ...]}`
   * `duration` in minutes. Duration of the leg is relative
   * to the total travel time. Example: departure 16:30, change at 16:40,
   * arrival at 17:00. So the change should have a duration of 33.33%.
   */
  @property({ type: Array }) public legs!: (Leg | PtRideLeg)[];

  /** Prop to render the departure time - will be formatted as "H:mm" */
  @property({ attribute: 'departure-time' }) public departureTime?: string;

  /** Prop to render the arrival time - will be formatted as "H:mm" */
  @property({ attribute: 'arrival-time' }) public arrivalTime?: string;

  /** Optional prop to render the walk time (in minutes) before departure */
  @property({ attribute: 'departure-walk', type: Number }) public departureWalk?: number;

  /** Optional prop to render the walk time (in minutes) after arrival */
  @property({ attribute: 'arrival-walk', type: Number }) public arrivalWalk?: number;

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @property({ attribute: 'disable-animation', type: Boolean }) public disableAnimation?: boolean;

  private _language = new LanguageController(this);

  private _now(): number {
    const dataNow = +(this.dataset?.now as string);
    return isNaN(dataNow) ? Date.now() : dataNow;
  }

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
      );

    const rideLegs = this.legs?.filter((leg) => isRideLeg(leg));
    return html`
      <div class="sbb-pearl-chain__time">
        ${renderDepartureTimeAttribute()}
        ${departure
          ? html`<time class="sbb-pearl-chain__time-time" datetime=${this.departureTime!}>
              <span class="sbb-screenreaderonly"
                >${i18nDeparture[this._language.current]}:&nbsp;</span
              >
              ${format(departure, 'HH:mm')}
            </time>`
          : nothing}
        ${rideLegs?.length > 1
          ? html`<span class="sbb-screenreaderonly">
              ${rideLegs?.length - 1} ${i18nTransferProcedures[this._language.current]}
            </span>`
          : nothing}
        <sbb-pearl-chain
          class="sbb-pearl-chain__time-chain"
          .legs=${this.legs}
          .disableAnimation=${this.disableAnimation}
          data-now=${this._now()}
        ></sbb-pearl-chain>
        ${arrival
          ? html`<time class="sbb-pearl-chain__time-time" datetime=${this.arrivalTime!}>
              <span class="sbb-screenreaderonly"
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
