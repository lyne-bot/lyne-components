import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { i18nTripDuration } from '@sbb-esta/lyne-elements/core/i18n.js';
import type { SbbDateLike } from '@sbb-esta/lyne-elements/core/interfaces/types';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { format, isValid } from 'date-fns';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { durationToTime, removeTimezoneFromISOTimeString } from '../core/datetime.js';
import type { Leg } from '../core/timetable.js';

import style from './journey-summary.scss?lit&inline';

import '@sbb-esta/lyne-elements/divider.js';
import '@sbb-esta/lyne-elements/screen-reader-only.js';
import '@sbb-esta/lyne-elements/journey-header.js';
import '../pearl-chain-time.js';

export interface InterfaceSbbJourneySummaryAttributes {
  legs: Leg[];
  vias?: string[];
  origin: string;
  destination: string;
  arrivalWalk?: number;
  departure: string;
  arrival: string;
  departureWalk?: number;
  duration?: number;
}

/**
 * It displays journey's information.
 *
 * @slot content - Use this slot to add `sbb-button`s or other interactive elements.
 */
export
@customElement('sbb-journey-summary')
class SbbJourneySummaryElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**  The trip prop */
  @property({ type: Object }) public accessor trip: InterfaceSbbJourneySummaryAttributes = null!;

  /**  The tripBack prop */
  @property({ attribute: 'trip-back', type: Object })
  public accessor tripBack: InterfaceSbbJourneySummaryAttributes = null!;

  /**
   * The RoundTrip prop. This prop controls if one or two arrows are displayed in the header.
   */
  @forceType()
  @property({ attribute: 'round-trip', type: Boolean })
  public accessor roundTrip: boolean = false;

  /** Heading level of the journey header element (e.g. h1-h6). */
  @property({ attribute: 'header-level' }) public accessor headerLevel: SbbTitleLevel = '3';

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @forceType()
  @property({ attribute: 'disable-animation', type: Boolean })
  public accessor disableAnimation: boolean = false;

  /**
   * The Footpath attribute for rendering different icons
   * true: render a11y-icon
   * false: render walk-icon
   * default: render walk-icon
   */
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

  private _hasContentSlot: boolean = false;
  private _language = new SbbLanguageController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    this._hasContentSlot = Boolean(this.querySelector?.('[slot="content"]'));
  }

  /**  renders the date of the journey or if it is the current or next day */
  private _renderJourneyStart(
    departureTime: Date | undefined,
    duration: number | undefined,
  ): TemplateResult | undefined {
    const dateAdapter = defaultDateAdapter;
    const durationObj = duration ? durationToTime(duration, this._language.current) : null;

    if (isValid(departureTime)) {
      return html`
        <time datetime=${format(departureTime!, 'd') + ' ' + format(departureTime!, 'M')}>
          ${dateAdapter.format(departureTime).replace(',', '.')}</time
        >${duration && duration > 0
          ? html`,<time>
                <sbb-screen-reader-only>
                  ${i18nTripDuration[this._language.current]} ${durationObj!.long}
                </sbb-screen-reader-only>
                <span aria-hidden="true">${durationObj!.short}</span>
              </time>`
          : nothing}
      `;
    }
    return;
  }

  private _renderJourneyVias(vias: string[]): TemplateResult {
    const slicedVias = vias.slice(0, 5);
    return html`
      <div class="sbb-journey-summary__via-block">
        <span class="sbb-journey-summary__via-text">Via</span>
        <ul class="sbb-journey-summary__vias" role=${vias.length <= 1 ? 'presentation' : nothing}>
          ${slicedVias.map(
            (via, index) =>
              html`<li class="sbb-journey-summary__via">
                ${via}${index !== slicedVias.length - 1 && index < 4
                  ? html`<span>,</span>`
                  : nothing}
              </li>`,
          )}
        </ul>
      </div>
    `;
  }

  private _renderJourneyInformation(trip: InterfaceSbbJourneySummaryAttributes): TemplateResult {
    const { vias, duration, departureWalk, departure, arrivalWalk, arrival, legs } = trip || {};

    return html`
      <div>
        ${vias && vias.length > 0 ? this._renderJourneyVias(vias) : nothing}
        <div class="sbb-journey-summary__date">
          ${this._renderJourneyStart(removeTimezoneFromISOTimeString(departure), duration)}
        </div>
        <sbb-pearl-chain-time
          .arrivalTime=${arrival}
          .departureTime=${departure}
          .departureWalk=${departureWalk}
          .arrivalWalk=${arrivalWalk}
          .legs=${legs}
          .disableAnimation=${this.disableAnimation}
          .a11yFootpath=${this.a11yFootpath}
          .now=${this.now}
        ></sbb-pearl-chain-time>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    const { origin, destination } = this.trip || {};
    return html`
      <div class="sbb-journey-summary">
        ${origin
          ? html`<sbb-journey-header
              size="l"
              .level=${this.headerLevel || nothing}
              .origin=${origin}
              .destination=${destination}
              .roundTrip=${this.roundTrip ?? nothing}
            ></sbb-journey-header>`
          : nothing}
        ${this._renderJourneyInformation(this.trip)}
        ${this.tripBack
          ? html`<div>
              <sbb-divider class="sbb-journey-summary__divider"></sbb-divider>
              ${this._renderJourneyInformation(this.tripBack)}
            </div>`
          : nothing}
        ${this._hasContentSlot
          ? html` <div class="sbb-journey-summary__slot">
              <slot name="content"></slot>
            </div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-journey-summary': SbbJourneySummaryElement;
  }
}
