import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing.js';
import { type CSSResultGroup, type TemplateResult, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { mapNavigationIconToSvg } from '../common.js';
import type { CoachItem, SeatReservation } from '../seat-reservation.js';

import style from './seat-reservation-navigation.scss?lit&inline';

import '../seat-reservation-graphic.js';
import '@sbb-esta/lyne-elements/icon/icon.js';

/**
 * It will display the navigation for Seat reservation.
 *
 * @event {CustomEvent<number>} selectCoach - Emits when select a coach navigation element and returns the clicked coach nav index
 */
export
@customElement('sbb-seat-reservation-navigation')
class SbbSeatReservationNavigationElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectCoach: 'selectCoach',
  } as const;

  /* seat-reservation property */
  @forceType()
  @property({ attribute: 'seat-reservation', type: Object })
  public accessor seatReservation: SeatReservation = null!;

  /* pre-selected Coach index property */
  @forceType()
  @property({ attribute: 'selected-coach-index', type: Number })
  public accessor selectedCoachIndex: number = 0;

  /** Emits when a coach within the navigation was selected */
  protected selectNavCoach: EventEmitter = new EventEmitter(
    this,
    SbbSeatReservationNavigationElement.events.selectCoach,
  );

  protected override render(): TemplateResult {
    return html`
      <ul class="sbb-seat-reservation-navigation__list-coaches">
        ${this._getRenderedNavCoachs(this.seatReservation.coachItems)}
      </ul>
    `;
  }

  private _getRenderedNavCoachs(coaches: CoachItem[]): TemplateResult[] {
    return coaches.map((coachItem: CoachItem, index: number) => {
      const coachSelectedClass =
        this.selectedCoachIndex === index
          ? 'sbb-seat-reservation-navigation__item-coach--selected'
          : '';
      return html`
        <li class="sbb-seat-reservation-navigation__item-coach ${coachSelectedClass}">
          ${this._getNavigationButton(index, coachItem)}
          <div class="sbb-seat-reservation-navigation__signs">
            ${this._getRenderedNavCoachSigns(coachItem.propertyIds)}
          </div>
        </li>
      `;
    });
  }

  private _getNavigationButton(index: number, coachItem: CoachItem): TemplateResult | null {
    if (!coachItem) {
      return null;
    }

    return html`
      <button
        class="sbb-seat-reservation-navigation-control__button"
        @click=${() => this._selectNavCoach(index)}
      >
        ${this._getAdditionalCoachInformation(coachItem)}
      </button>
    `;
  }

  private _getAdditionalCoachInformation(coachItem: CoachItem): TemplateResult | null {
    if (!coachItem) {
      return null;
    }

    return html`
      ${coachItem.travelClass.includes('FIRST')
        ? html`<span class="sbb-seat-reservation-navigation--first-class"></span>`
        : nothing}
      <span class="sbb-seat-reservation-navigation__additional-information">
        <span class="sbb-seat-reservation-navigation__item-coach-number">${coachItem.number}</span>
        <span class="sbb-seat-reservation-navigation__item-coach-travelclass">
          ${coachItem.travelClass.includes('FIRST')
            ? 1
            : coachItem.travelClass.includes('SECOND')
              ? 2
              : nothing}
        </span>
      </span>
    `;
  }

  private _getRenderedNavCoachSigns(signs?: string[]): (null | TemplateResult<1>)[] | null {
    if (!signs) {
      return null;
    }

    return signs?.map((sign: string) => {
      if (!sign) {
        return null;
      }

      const svgName = mapNavigationIconToSvg[sign];

      return html`
        ${svgName
          ? html`<sbb-icon
              name="${svgName}"
              aria-hidden="false"
              aria-label="todo: Coach desc"
            ></sbb-icon>`
          : nothing}
      `;
    });
  }

  private _selectNavCoach(coachIndex: number): void {
    this.selectNavCoach.emit(coachIndex);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-navigation': SbbSeatReservationNavigationElement;
  }
}
