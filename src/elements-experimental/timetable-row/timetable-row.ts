import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { setOrRemoveAttribute } from '@sbb-esta/lyne-elements/core/dom.js';
import {
  i18nArrival,
  i18nClass,
  i18nDeparture,
  i18nDirection,
  i18nFromPlatform,
  i18nMeansOfTransport,
  i18nNew,
  i18nOccupancy,
  i18nRealTimeInfo,
  i18nSupersaver,
  i18nTransferProcedures,
  i18nTravelhints,
  i18nTripDuration,
  i18nTripQuayChange,
} from '@sbb-esta/lyne-elements/core/i18n.js';
import type { SbbDateLike, SbbOccupancy } from '@sbb-esta/lyne-elements/core/interfaces.js';
import { format } from 'date-fns';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { durationToTime, removeTimezoneFromISOTimeString } from '../core/datetime.js';
import type { ITripItem, Notice, PtRideLeg, PtSituation } from '../core/timetable.js';
import { getDepartureArrivalTimeAttribute, isRideLeg } from '../core/timetable.js';

import style from './timetable-row.scss?lit&inline';

import '@sbb-esta/lyne-elements/card.js';
import '@sbb-esta/lyne-elements/icon.js';
import '@sbb-esta/lyne-elements/timetable-occupancy.js';
import '../pearl-chain-time.js';

/** HimCus interface for mapped icon name and text */
export interface HimCus {
  name: string;
  text?: string | null;
}

/** Boarding icon interface for mapped icon name and text */
export interface Boarding {
  name: string;
  text: string;
}

export interface Price {
  price?: string;
  text?: string;
  isDiscount?: boolean;
}

export const renderIconProduct = (icon: string, name: string): TemplateResult => {
  return html`<span class="sbb-timetable__row-transport">
    <sbb-icon name=${icon}></sbb-icon>
    <span class="sbb-screen-reader-only">${name}</span>
  </span>`;
};

export const renderStringProduct = (vehicleName: string, line?: string | null): TemplateResult => {
  const space = ['M', 'B', 'T'].includes(vehicleName) ? ' ' : '';
  return html`<span class="sbb-timetable__row-transportnumber">
    ${line !== null ? vehicleName + space + line : vehicleName}
  </span>`;
};

const getReachableText = (legs: PtRideLeg[]): string | null | undefined => {
  return legs?.find((leg) => leg.serviceJourney?.serviceAlteration?.reachableText)?.serviceJourney
    ?.serviceAlteration?.reachableText;
};

const getDelayText = (legs: PtRideLeg[]): string | null | undefined => {
  return legs?.find((leg) => leg.serviceJourney?.serviceAlteration?.delayText)?.serviceJourney
    ?.serviceAlteration?.delayText;
};

const getRedirectedText = (legs: PtRideLeg[]): string | null | undefined => {
  return legs?.find((leg) => !!leg.serviceJourney?.serviceAlteration?.redirectedText)
    ?.serviceJourney?.serviceAlteration?.redirectedText;
};

const getUnplannedStop = (legs: PtRideLeg[]): string | null | undefined => {
  return legs?.find((leg) => !!leg.serviceJourney?.serviceAlteration?.unplannedStopPointsText)
    ?.serviceJourney?.serviceAlteration?.unplannedStopPointsText;
};

export const sortSituation = (situations: PtSituation[]): PtSituation[] => {
  const priorities = {
    DISTURBANCE: 0,
    INFORMATION: 1,
    DELAY: 2,
    TRAIN_REPLACEMENT_BY_BUS: 3,
    CONSTRUCTION_SITE: 4,
    END_MESSAGE: 5,
  };

  return [...situations]?.sort(
    (a: PtSituation, b: PtSituation) => priorities[a.cause!] - priorities[b.cause!],
  );
};

export const getHimIcon = (situation: PtSituation): HimCus => {
  switch (situation?.cause) {
    case 'DISTURBANCE':
      return {
        name: 'disruption',
        text: situation?.broadcastMessages?.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'INFORMATION':
      return {
        name: 'info',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'DELAY':
      return {
        name: 'delay',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'TRAIN_REPLACEMENT_BY_BUS':
      return {
        name: 'replacementbus',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'CONSTRUCTION_SITE':
      return {
        name: 'construction',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    default:
      return {
        name: 'info',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
  }
};

export const getCus = (trip: ITripItem, currentLanguage: string): HimCus => {
  const { summary, legs } = trip || {};
  const rideLegs = legs?.filter((leg) => isRideLeg(leg)) as PtRideLeg[];
  const { tripStatus } = summary || {};

  if (tripStatus?.cancelled || tripStatus?.partiallyCancelled)
    return { name: 'cancellation', text: tripStatus?.cancelledText };
  if (getReachableText(rideLegs))
    return { name: 'missed-connection', text: getReachableText(rideLegs) };
  if (tripStatus?.alternative) return { name: 'alternative', text: tripStatus.alternativeText };
  if (getRedirectedText(rideLegs)) return { name: 'reroute', text: getRedirectedText(rideLegs) };
  if (getUnplannedStop(rideLegs)) return { name: 'add-stop', text: getUnplannedStop(rideLegs) };
  if (tripStatus?.delayed || tripStatus?.delayedUnknown)
    return { name: 'delay', text: getDelayText(rideLegs) };
  if (tripStatus?.quayChanged) {
    const departure = rideLegs[0].departure;
    return {
      name: 'platform-change',
      text: departure.quayChanged ? departure.quayChangedText : i18nTripQuayChange[currentLanguage],
    };
  }

  return {} as HimCus;
};

const findAndReplaceNotice = (notices: Notice[]): Notice | undefined => {
  const reservationNotice = ['RR', 'RK', 'RC', 'RL', 'RM', 'RS', 'RU', 'XP', 'XR', 'XT'];

  return notices.reduce((foundNotice: Notice | undefined, notice: Notice): Notice | undefined => {
    if (foundNotice) return foundNotice;
    if (reservationNotice.includes(notice.name)) {
      return { ...notice, name: 'RR' } as Notice;
    }
  }, undefined);
};

export const filterNotices = (notices: Notice[]): Notice[] => {
  const allowedNames = ['Z', 'SB', 'SZ', 'VR', 'TG'];

  const filterNotice = notices.filter((notice, index) => {
    return notices.findIndex((n) => n.name === notice.name) === index;
  });

  return filterNotice
    .filter((notice) => allowedNames.includes(notice.name))
    .sort((a, b) => allowedNames.indexOf(a.name) - allowedNames.indexOf(b.name));
};

export const handleNotices = (notices: Notice[]): Notice[] => {
  const reservationNotice = findAndReplaceNotice(notices);
  const filteredNotices = filterNotices(notices);

  if (reservationNotice === undefined) return filteredNotices;
  if (!filteredNotices.length) return [reservationNotice];

  if (filteredNotices[0].name === 'Z' && filteredNotices[1]) {
    return [filteredNotices[0], reservationNotice, filteredNotices[1]].concat(
      filteredNotices.slice(2),
    );
  }

  return [reservationNotice, ...filteredNotices];
};

/**
 * It displays information about the trip, acting as a container for all the `sbb-timetable-*` components.
 * */
export
@customElement('sbb-timetable-row')
class SbbTimetableRowElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** The trip Prop. */
  @property({ type: Object }) public accessor trip: ITripItem = null!;

  /** The price Prop, which consists of the data for the badge. */
  @property({ type: Object }) public accessor price: Price = null!;

  /** This will be forwarded to the sbb-pearl-chain-legacy component - if true the position won't be animated. */
  @forceType()
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public accessor disableAnimation: boolean = false;

  /** This will be forwarded to the notices section */
  @property({ type: Object }) public accessor boarding: Boarding = null!;

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @forceType()
  @property({ attribute: 'loading-trip', type: Boolean })
  public accessor loadingTrip: boolean = false;

  /**
   * The Footpath attribute for rendering different icons
   * true: render a11y-icon
   * false: render walk-icon
   * default: render walk-icon
   */
  @forceType()
  @property({ attribute: 'a11y-footpath', type: Boolean })
  public accessor a11yFootpath: boolean = false;

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @forceType()
  @property({ attribute: 'loading-price', type: Boolean })
  public accessor loadingPrice: boolean = false;

  /**
   * Hidden label for the card action. It overrides the automatically generated accessibility text for the component. Use this prop to provide custom accessibility information for the component.
   */
  @forceType()
  @property({ attribute: 'card-action-label' })
  public accessor cardActionLabel: string = '';

  /** This will be forwarded to the sbb-card component as aria-expanded. */
  @forceType()
  @property({ attribute: 'accessibility-expanded', type: Boolean })
  public accessor accessibilityExpanded: boolean = false;

  /** When this prop is true the sbb-card will be in the active state. */
  @forceType()
  @property({ type: Boolean })
  public accessor active: boolean = false;

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

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('loadingTrip')) {
      setOrRemoveAttribute(this, 'role', !this.loadingTrip ? 'rowgroup' : null);
    }
  }

  /** The skeleton render function for the loading state */
  private _renderSkeleton(): TemplateResult {
    return html`
      <sbb-card size="l" class="sbb-loading">
        ${this.loadingPrice
          ? html`<sbb-card-badge class="sbb-loading__badge"></sbb-card-badge>`
          : nothing}
        <div class="sbb-loading__wrapper">
          <div class="sbb-loading__row"></div>
          <div class="sbb-loading__row"></div>
          <div class="sbb-loading__row"></div>
        </div>
      </sbb-card>
    `;
  }

  private _getQuayTypeStrings(): { long: string; short: string } | null {
    if (!this.trip.summary?.product) return null;
    const rideLegs = this.trip.legs?.filter((leg) => isRideLeg(leg)) as PtRideLeg[];
    const isShort = this.trip.summary.product?.vehicleMode === 'TRAIN';
    const short = isShort
      ? rideLegs[0].serviceJourney.quayTypeShortName || ''
      : rideLegs[0].serviceJourney.quayTypeName || '';

    return {
      long: i18nFromPlatform[this._language.current] + ' ' + short,
      short,
    };
  }

  /** map Quay */
  private _renderQuayType(): TemplateResult | undefined {
    if (!this.trip.summary?.product) return undefined;
    const quayTypeStrings = this._getQuayTypeStrings();
    return html`
      <span class="sbb-timetable__row--quay">
        <span class="sbb-screen-reader-only">${quayTypeStrings?.long}&nbsp;</span>
        <span class="sbb-timetable__row--quay-type" aria-hidden="true"
          >${quayTypeStrings?.short}</span
        >
      </span>
    `;
  }

  private _handleHimCus(trip: ITripItem): { cus: HimCus | null; him: HimCus | null } {
    const { situations } = trip || {};
    const sortedSituations = situations && sortSituation(situations);
    const cus = getCus(trip, this._language.current);

    return {
      cus: Object.keys(cus)?.length ? cus : null,
      him: situations?.length ? getHimIcon(sortedSituations[0]) : null,
    };
  }

  private _getAccessibilityText(trip: ITripItem): string {
    const { summary, legs, notices } = trip || {};
    const {
      departureWalk,
      arrivalWalk,
      departure,
      arrival,
      product,
      direction,
      occupancy,
      duration,
    } = summary || {};

    const { departureTimeAttribute, arrivalTimeAttribute } = getDepartureArrivalTimeAttribute(
      legs,
      departureWalk || 0,
      arrivalWalk || 0,
      this._language.current,
      this.a11yFootpath,
    );

    const departureTime: Date | undefined = departure?.time
      ? removeTimezoneFromISOTimeString(departure.time)
      : undefined;

    const arrivalTime: Date | undefined = arrival?.time
      ? removeTimezoneFromISOTimeString(arrival.time)
      : undefined;

    const departureWalkText = departureTimeAttribute
      ? `${departureTimeAttribute.text} ${departureTimeAttribute.duration}, `
      : '';

    const arrivalWalkText = arrivalTimeAttribute
      ? `${arrivalTimeAttribute.text} ${arrivalTimeAttribute.duration}, `
      : '';

    const departureTimeText = departureTime
      ? `${i18nDeparture[this._language.current]}: ${format(departureTime, 'HH:mm')}, `
      : '';

    const getDepartureQuayText = (): string => {
      if (!departure?.quayFormatted) {
        return '';
      }

      // add prefix "new" if quay was changed
      const changedQuayPrefix = departure?.quayChanged ? `${i18nNew[this._language.current]} ` : '';
      return `${changedQuayPrefix}${
        this._getQuayTypeStrings()?.long
      } ${departure?.quayFormatted}, `;
    };

    const meansOfTransportText =
      product && product.vehicleMode
        ? i18nMeansOfTransport[product.vehicleMode.toLowerCase()] &&
          `${i18nMeansOfTransport[product.vehicleMode.toLowerCase()][this._language.current]}, `
        : '';

    const vehicleSubModeText = product?.vehicleSubModeShortName
      ? `${product.vehicleSubModeShortName} ${product.line || ''}, `
      : '';

    const directionText = `${i18nDirection[this._language.current]} ${direction}, `;

    const himCus = this._handleHimCus(trip);
    const cusText = himCus?.cus?.text
      ? `${i18nRealTimeInfo[this._language.current]}: ${himCus?.cus?.text}, `
      : '';
    const himText = himCus?.him?.text
      ? `${i18nRealTimeInfo[this._language.current]}: ${himCus?.him?.text}, `
      : '';

    const boardingText = this.boarding ? `${this.boarding.text}, ` : '';

    const priceText = `${this.price?.isDiscount ? i18nSupersaver[this._language.current] : ''} ${
      this.price?.text && this.price?.price
        ? (this.price?.text || '') + ' ' + (this.price?.price || '') + ', '
        : ''
    }`;

    const transferProcedures =
      legs?.length > 1
        ? `${legs?.length - 1} ${i18nTransferProcedures[this._language.current]}, `
        : '';

    const arrivalTimeText = arrivalTime
      ? `${i18nArrival[this._language.current]}: ${format(arrivalTime, 'HH:mm')}, `
      : '';

    let occupancyText: string = '';
    if (occupancy) {
      if (occupancy.firstClass && occupancy.firstClass !== 'UNKNOWN') {
        occupancyText += `${i18nClass.first[this._language.current]} ${
          (
            i18nOccupancy[occupancy.firstClass.toLowerCase() as SbbOccupancy] as Record<
              string,
              string
            >
          )?.[this._language.current]
        }.`;
      }
      if (occupancy.secondClass && occupancy.secondClass !== 'UNKNOWN') {
        occupancyText += ` ${i18nClass.second[this._language.current]} ${
          (
            i18nOccupancy[occupancy.secondClass.toLowerCase() as SbbOccupancy] as Record<
              string,
              string
            >
          )?.[this._language.current]
        }.`;
      }
    }

    const attributes =
      notices &&
      handleNotices(notices).length &&
      handleNotices(notices)
        ?.map((notice, index) => index < 4 && notice.text?.template)
        .join(', ') + ', ';

    const attributesText = attributes
      ? `${i18nTravelhints[this._language.current]}: ${attributes}`
      : '';

    const durationText =
      !!duration && duration > 0
        ? `${i18nTripDuration[this._language.current]} ${
            durationToTime(duration, this._language.current).long
          }, `
        : '';

    return `${departureWalkText} ${departureTimeText} ${getDepartureQuayText()} ${meansOfTransportText} ${vehicleSubModeText} ${directionText} ${cusText} ${boardingText} ${priceText} ${
      cusText ? '' : himText
    } ${arrivalTimeText} ${arrivalWalkText} ${durationText} ${transferProcedures} ${occupancyText} ${attributesText}`;
  }

  protected override render(): TemplateResult {
    if (this.loadingTrip) {
      return this._renderSkeleton();
    }

    const { legs, id, notices, summary } = this.trip || {};

    const {
      product,
      direction,
      departureWalk,
      departure,
      arrival,
      arrivalWalk,
      occupancy,
      duration,
    } = summary || {};

    const himCus = this._handleHimCus(this.trip);
    const hasHimCus = !!himCus.cus || !!himCus.him;

    const noticeAttributes = notices && handleNotices(notices);

    const durationObj = duration ? durationToTime(duration, this._language.current) : null;

    return html`
      <sbb-card size="l" id=${id}>
        <sbb-card-button
          ?active=${this.active}
          aria-expanded=${this.accessibilityExpanded ? 'true' : nothing}
        >
          ${this.cardActionLabel ? this.cardActionLabel : this._getAccessibilityText(this.trip)}
        </sbb-card-button>
        ${this.loadingPrice
          ? html`<sbb-card-badge class="sbb-loading__badge"></sbb-card-badge>`
          : nothing}
        ${this.price && !this.loadingPrice
          ? html`<sbb-card-badge color=${this.price.isDiscount ? 'charcoal' : 'white'}>
              ${this.price.isDiscount
                ? html`<span aria-hidden="true">
                    %<span class="sbb-screen-reader-only"
                      >${i18nSupersaver[this._language.current]}</span
                    >
                  </span>`
                : nothing}
              ${this.price.text ? html`<span>${this.price.text}</span>` : nothing}
              ${this.price.price ? html`<span>${this.price.price}</span>` : nothing}
            </sbb-card-badge>`
          : nothing}
        <div class="sbb-timetable__row" role="row">
          <div class="sbb-timetable__row-header" role="gridcell">
            <div class="sbb-timetable__row-details">
              ${product?.corporateIdentityPictogram &&
              html`<span class="sbb-timetable__row-transport-wrapper">
                <sbb-icon
                  class="sbb-timetable__row-transport-icon"
                  name="picto:${product.corporateIdentityPictogram}"
                ></sbb-icon>
                <span class="sbb-screen-reader-only">
                  ${product &&
                  product.vehicleMode &&
                  i18nMeansOfTransport[product.vehicleMode.toLowerCase()] &&
                  i18nMeansOfTransport[product.vehicleMode.toLowerCase()][this._language.current]}
                  &nbsp;
                </span>
              </span>`}
              ${product &&
              (product.corporateIdentityIcon
                ? renderIconProduct(product.corporateIdentityIcon, product.name)
                : product.vehicleSubModeShortName &&
                  renderStringProduct(product.vehicleSubModeShortName, product?.line))}
            </div>
            ${direction
              ? html`<p>${`${i18nDirection[this._language.current]} ${direction}`}</p>`
              : nothing}
          </div>
          <sbb-pearl-chain-time
            role="gridcell"
            .legs=${legs}
            .departureTime=${departure?.time}
            .arrivalTime=${arrival?.time}
            .departureWalk=${departureWalk}
            .arrivalWalk=${arrivalWalk}
            ?disable-animation=${this.disableAnimation}
            ?a11y-footpath=${this.a11yFootpath}
            .now=${this.now}
          ></sbb-pearl-chain-time>
          <div class="sbb-timetable__row-footer" role="gridcell">
            ${product && departure?.quayFormatted
              ? html`<span
                  class=${departure?.quayChanged ? `sbb-timetable__row-quay--changed` : nothing}
                >
                  <span class="sbb-screen-reader-only">
                    ${`${i18nDeparture[this._language.current]} ${
                      departure?.quayChanged ? i18nNew[this._language.current] : ''
                    }`}
                    &nbsp;
                  </span>
                  ${this._renderQuayType()} ${departure?.quayFormatted}
                </span>`
              : nothing}
            ${(occupancy?.firstClass && occupancy?.firstClass !== 'UNKNOWN') ||
            (occupancy?.secondClass && occupancy.secondClass !== 'UNKNOWN')
              ? html`<sbb-timetable-occupancy
                  .firstClassOccupancy=${occupancy?.firstClass?.toLowerCase()}
                  .secondClassOccupancy=${occupancy?.secondClass?.toLowerCase()}
                ></sbb-timetable-occupancy>`
              : nothing}
            ${(noticeAttributes && noticeAttributes.length) || this.boarding
              ? html`<ul class="sbb-timetable__row-hints" role="list">
                  ${noticeAttributes?.map((notice, index) =>
                    index < 4
                      ? html`<li>
                          <sbb-icon
                            class="sbb-travel-hints__item"
                            name=${'sa-' + notice.name?.toLowerCase()}
                          ></sbb-icon>
                          <span class="sbb-screen-reader-only">${notice.text?.template}</span>
                        </li>`
                      : nothing,
                  )}
                  ${this.boarding
                    ? html`<li>
                        <sbb-icon
                          class="sbb-travel-hints__item"
                          name=${this.boarding?.name}
                          aria-label=${this.boarding?.text}
                          aria-hidden="false"
                        ></sbb-icon>
                      </li>`
                    : nothing}
                </ul>`
              : nothing}
            ${duration && duration > 0
              ? html`<time>
                  <span class="sbb-screen-reader-only">
                    ${`${i18nTripDuration[this._language.current]} ${durationObj!.long}`}
                  </span>
                  <span aria-hidden="true">${durationObj!.short}</span>
                </time>`
              : nothing}
            ${hasHimCus && (himCus.cus || himCus.him)
              ? html`<span class="sbb-timetable__row-warning">
                  <sbb-icon name=${(himCus.cus || himCus.him)!.name}></sbb-icon>
                  <span class="sbb-screen-reader-only">${(himCus.cus || himCus.him)!.text}</span>
                </span>`
              : nothing}
          </div>
        </div>
      </sbb-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-row': SbbTimetableRowElement;
  }
}
