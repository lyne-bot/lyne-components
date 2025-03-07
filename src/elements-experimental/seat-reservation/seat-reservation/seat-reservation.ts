import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing.js';
import { html, LitElement, nothing } from 'lit';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit-html/directives/style-map.js';

import type {
  CoachItem,
  Place,
  ElementDimension,
  ElementPosition,
  SeatReservation,
  CompartmentNumberElement,
  SignElement,
  BaseElement,
  PlaceSelection,
  SeatReservationPlaceSelection,
} from '../seat-reservation.js';

import style from './seat-reservation.scss?lit&inline';

import '../seat-reservation-area.js';
import '../seat-reservation-graphic.js';
import '../seat-reservation-navigation.js';
import '../seat-reservation-place-control.js';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @event {CustomEvent<Place[]>} selectedPlaces - Emits when select a place and returns a Place array with all selected places
 */
export
@customElement('sbb-seat-reservation')
class SbbSeatReservationElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectedPlaces: 'selectedPlaces',
  } as const;

  /** seat reservation*/
  @forceType()
  @property({ attribute: 'seat-reservation', type: Object })
  public accessor seatReservation: SeatReservation = null!;

  /** Maximal number of possible clickable seats*/
  @forceType()
  @property({ attribute: 'max-reservations', type: Number })
  public accessor maxReservations: number = null!;

  /** align-vertical controls the visual represention of seat reservation in a horizonal or vertical alignment*/
  @forceType()
  @property({ attribute: 'align-vertical', type: Boolean })
  public accessor alignVertical: boolean = false;

  /** Any click functionality is prevented*/
  @forceType()
  @property({ attribute: 'disable', type: Boolean })
  public accessor disable: boolean = false;

  /** Emits when an place was selected by user. */
  protected selectedPlaces: EventEmitter = new EventEmitter(
    this,
    SbbSeatReservationElement.events.selectedPlaces,
  );

  @state() private accessor _selectedCoachIndex: number = 0;

  private _maxHeight = 128;
  private _gridSize = 8;
  private _gridSizeFactor = this._maxHeight / this._gridSize;
  private _selectedSeatReservationPlaces: SeatReservationPlaceSelection[] = [];
  private _triggerCoachPositionsCollection: number[][] = [];
  private _coachScrollArea: HTMLElement = null!;
  private _notAreaElements = [
    'DRIVER_AREA_FULL',
    'COACH_PASSAGE',
    'COMPARTMENT_PASSAGE',
    'COMPARTMENT_PASSAGE_HIGH',
    'COMPARTMENT_PASSAGE_MIDDLE',
    'COMPARTMENT_PASSAGE_LOW',
  ];

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._componentSetup();
  }

  protected override render(): TemplateResult {
    const coachItems = this.seatReservation?.coachItems;
    const classAlignVertical = this.alignVertical ? 'sbb-seat-reservation__wrapper--vertical' : '';

    return html`
      <div class="sbb-seat-reservation">
        <div class="sbb-seat-reservation__wrapper ${classAlignVertical}">
          <sbb-seat-reservation-navigation
            .seatReservation=${this.seatReservation}
            .selectedCoachIndex=${this._selectedCoachIndex}
            @selectCoach=${(event: CustomEvent) => this._onSelectNavCoach(event)}
          ></sbb-seat-reservation-navigation>
          <div class="sbb-seat-reservation__parent">
            <ul id="coachScrollArea" class="sbb-seat-reservation__list-coaches">
              ${this._renderCoaches(coachItems)}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  private _componentSetup(): void {
    this._initNavigationSelectionByScrollEvent();
  }

  /**
   *
   * @param coaches
   * @returns
   */
  private _renderCoaches(coaches?: CoachItem[]): TemplateResult[] | null {
    if (!coaches) {
      return null;
    }

    return coaches.map((coachItem: CoachItem, index: number) => {
      return html`
        <li class="sbb-seat-reservation__item-coach">
          ${this._renderCoachElement(coachItem, index)}
        </li>
      `;
    });
  }

  private _renderCoachElement(coachItem: CoachItem, index: number): TemplateResult {
    const calculatedCoachDimension = this._getCalculatedDimension(coachItem.dimension);

    return html`
      <div style="width:${calculatedCoachDimension.w}px; height:${calculatedCoachDimension.h}px;">
        ${this._getRenderedCoachBorders(coachItem, index)}
        ${this._getRenderedGraphicalElements(coachItem.graphicElements || [], coachItem.dimension)}
        ${this._getRenderedSignElements(coachItem.signs)}
        ${this._getRenderedCompartmentNumberElements(coachItem.compartmentNumbers)}
        ${this._getRenderedPlaces(coachItem, index)}
      </div>
    `;
  }

  private _getRenderedCoachBorders(coachItem: CoachItem, coachIndex: number): TemplateResult {
    const allElements = coachItem.graphicElements;
    const driverArea = allElements?.find(
      (element: BaseElement) => element.icon === 'DRIVER_AREA_FULL',
    );
    const borderWidth = driverArea
      ? coachItem.dimension.w - driverArea.dimension.w
      : coachItem.dimension.w - 2;
    const borderOffsetX =
      coachIndex === 0 && driverArea
        ? (driverArea?.dimension.w - 1) * this._gridSizeFactor
        : this._gridSizeFactor;

    return html`
      <div style="position:absolute; left:${borderOffsetX}px; z-index:0;">
        <sbb-seat-reservation-graphic
          name="COACH_BORDER_MIDDLE"
          width=${borderWidth}
          height=${coachItem.dimension.h}
          ?stretch=${true}
        ></sbb-seat-reservation-graphic>
      </div>
    `;
  }

  private _getRenderedPlaces(coach: CoachItem, coachIndex: number): TemplateResult[] | null {
    if (!coach.places) {
      return null;
    }

    return coach.places?.map((place: Place) => {
      const calculatedInternalDimension = this._getCalculatedDimension(place.dimension);
      const calculatedInternalPosition = this._getCalculatedPosition(place.position);
      const textRotation = place.rotation ? place.rotation * -1 : 0;
      const elementStyle = {
        top: calculatedInternalPosition.y + 'px',
        left: calculatedInternalPosition.x + 'px',
        width: calculatedInternalDimension.w + 'px',
        height: calculatedInternalDimension.h + 'px',
        zIndex: place.position.z,
      };

      return html`
        <div class="sbb-seat-reservation__graphical-element" style=${styleMap(elementStyle)}>
          <sbb-seat-reservation-place-control
            @selectPlace=${(selectPlaceEvent: CustomEvent) => this._onSelectPlace(selectPlaceEvent)}
            id="${coachIndex}_${place.number}"
            text=${place.number}
            type=${place.type}
            state=${place.state}
            width=${place.dimension.w}
            height=${place.dimension.h}
            rotation=${place.rotation ?? nothing}
            text-rotation=${textRotation}
            coach-index=${coachIndex}
            ?disable=${this.disable}
          ></sbb-seat-reservation-place-control>
        </div>
      `;
    });
  }

  private _getRenderedGraphicalElements(
    graphicalElements: BaseElement[],
    coachDimension: ElementDimension,
  ): TemplateResult[] | null {
    if (!graphicalElements) {
      return null;
    }

    return graphicalElements?.map((graphicalElement: BaseElement) => {
      const calculatedInternalDimension = this._getCalculatedDimension(graphicalElement.dimension);
      const calculatedInternalPosition = this._getCalculatedPosition(graphicalElement.position);
      const icon = graphicalElement.icon ?? '';
      const rotation = graphicalElement.rotation ?? 0;

      //check if the current element is not an area element, since this element is drawn without an area component
      if (this._notAreaElements.findIndex((notAreaElement) => notAreaElement === icon) > -1) {
        return this._getRenderElementWithoutArea(
          graphicalElement,
          calculatedInternalPosition,
          calculatedInternalDimension,
          rotation,
        );
      }

      return this._getRenderElementWithArea(
        graphicalElement,
        calculatedInternalPosition,
        calculatedInternalDimension,
        rotation,
        coachDimension,
      );
    });
  }

  private _getRenderElementWithArea(
    graphicalElement: BaseElement,
    calculatedInternalPosition: ElementPosition,
    calculatedInternalDimension: ElementDimension,
    rotation: number,
    coachDimension: ElementDimension,
  ): TemplateResult {
    let elementMounting = 'FREE';
    if (graphicalElement.position.y === 0) {
      elementMounting = 'UPPER_BORDER';
    } else if (graphicalElement.position.y + graphicalElement.dimension.h === coachDimension.h) {
      elementMounting = 'LOWER_BORDER';
    }

    return html`
      <div
        class="sbb-seat-reservation__graphical-element"
        style="top:${calculatedInternalPosition.y}px; left:${calculatedInternalPosition.x}px; width:${calculatedInternalDimension.w}px; height:${calculatedInternalDimension.h}px; z-index:${graphicalElement
          .position.z};"
      >
        <sbb-seat-reservation-area
          width=${graphicalElement.dimension.w}
          height=${graphicalElement.dimension.h}
          mounting=${elementMounting}
          background="dark"
        >
          <sbb-seat-reservation-graphic
            name=${graphicalElement.icon ?? nothing}
            rotation=${rotation}
            width="1"
            height="1"
          ></sbb-seat-reservation-graphic>
        </sbb-seat-reservation-area>
      </div>
    `;
  }

  private _getRenderElementWithoutArea(
    graphicalElement: BaseElement,
    calculatedPosition: ElementPosition,
    calculatedDimension: ElementDimension,
    rotation: number,
  ): TemplateResult {
    let icon = graphicalElement.icon;
    if (icon && icon.indexOf('DRIVER_AREA') > -1) {
      icon = icon.concat('_', this.seatReservation.vehicleType);
    }

    return html`
      <div
        class="sbb-seat-reservation__graphical-element"
        style="top:${calculatedPosition.y}px; left:${calculatedPosition.x}px; width:${calculatedDimension.w}px; height:${calculatedDimension.h}px; z-index:${graphicalElement
          .position.z};"
      >
        <sbb-seat-reservation-graphic
          name=${icon ?? nothing}
          width=${graphicalElement.dimension.w}
          height=${graphicalElement.dimension.h}
          rotation=${rotation}
        ></sbb-seat-reservation-graphic>
      </div>
    `;
  }

  private _getRenderedSignElements(signs?: SignElement[]): TemplateResult[] | null {
    if (!signs) {
      return null;
    }

    return signs?.map((sign: SignElement) => {
      const calculatedcCmpartmentNumberDimension = this._getCalculatedDimension(sign.dimension);
      const calculatedcCmpartmentNumberPosition = this._getCalculatedPosition(sign.position);
      return html`
        <div
          class="sbb-seat-reservation__graphical-element"
          style="position:absolute; top:${calculatedcCmpartmentNumberPosition.y}px; left:${calculatedcCmpartmentNumberPosition.x}px; width:${calculatedcCmpartmentNumberDimension.w}px; height:${calculatedcCmpartmentNumberDimension.h}px; z-index:${sign
            .position.z};"
          aria-label="Service area ${sign.icon}"
        >
          <sbb-seat-reservation-graphic
            name=${sign.icon ?? nothing}
            width=${sign.dimension.w}
            height=${sign.dimension.h}
          ></sbb-seat-reservation-graphic>
        </div>
      `;
    });
  }

  private _getRenderedCompartmentNumberElements(
    compartmentNumbers?: CompartmentNumberElement[],
  ): TemplateResult[] | null {
    if (!compartmentNumbers) {
      return null;
    }

    return compartmentNumbers?.map((compartmentNumber: CompartmentNumberElement) => {
      const calculatedcCmpartmentNumberDimension = this._getCalculatedDimension(
        compartmentNumber.dimension,
      );
      const calculatedcCmpartmentNumberPosition = this._getCalculatedPosition(
        compartmentNumber.position,
      );
      const colorClass = compartmentNumber.number === '1' ? 'first-class' : 'second-class';
      const ariaCompartmentLabel =
        compartmentNumber.number === '1'
          ? 'First class compartment area'
          : 'Second class compartment area';
      return html`
        <div
          class="sbb-seat-reservation__graphical-element sbb-seat-reservation__compartment-number sbb-seat-reservation__compartment-number--${colorClass}"
          style="top:${calculatedcCmpartmentNumberPosition.y}px; left:${calculatedcCmpartmentNumberPosition.x}px; width:${calculatedcCmpartmentNumberDimension.w}px; height:${calculatedcCmpartmentNumberDimension.h}px;"
          aria-label=${ariaCompartmentLabel}
        >
          ${compartmentNumber.number}
        </div>
      `;
    });
  }

  private _initNavigationSelectionByScrollEvent(): void {
    this._coachScrollArea = this.shadowRoot?.getElementById('coachScrollArea') as HTMLElement;

    if (this._coachScrollArea) {
      let currCalcTriggerPos = 0;
      const coachScrollWidth = this._coachScrollArea.getBoundingClientRect().width;

      //Generate calculated trigger point array depends from coach width
      this._triggerCoachPositionsCollection = this.seatReservation.coachItems.map((coach) => {
        const fromPos = currCalcTriggerPos;
        currCalcTriggerPos += this._getCalculatedDimension(coach.dimension).w;
        return [fromPos, currCalcTriggerPos];
      });

      //Add scroll event listener to trigger coach navigation
      this._coachScrollArea.addEventListener('scroll', () => {
        const scrollOffsetX = this._coachScrollArea.scrollLeft + coachScrollWidth / 2;
        const selectedCoachIndex = this._triggerCoachPositionsCollection.findIndex(
          (triggerPoint: number[]) =>
            scrollOffsetX >= triggerPoint[0] && scrollOffsetX <= triggerPoint[1],
        );

        if (selectedCoachIndex !== this._selectedCoachIndex) {
          this._selectedCoachIndex = selectedCoachIndex;
        }
      });
    }
  }

  private _onSelectNavCoach(event: CustomEvent): void {
    const selectedNavCoachIndex = event.detail as number;
    const scrollToCoachPosX = this._triggerCoachPositionsCollection[selectedNavCoachIndex][0];

    this._coachScrollArea.scrollTo({
      top: 0,
      left: scrollToCoachPosX,
      behavior: 'smooth',
    });
  }

  /**
   * Manages the selected place event triggered from the place
   * Each selection emits an array of all selected places
   * @param selectPlaceEvent
   */
  private _onSelectPlace(selectPlaceEvent: CustomEvent): void {
    if (!this.disable) {
      const currSelectedPlace = selectPlaceEvent.detail as PlaceSelection;

      if (currSelectedPlace.state === 'SELECTED') {
        const seatReservationSelection = this._getSeatReservationPlaceSelection(currSelectedPlace);
        if (seatReservationSelection) {
          this._selectedSeatReservationPlaces.push(seatReservationSelection);
        }
      }
      //Remove selected place from selectedSeatReservationPlaces
      else {
        this._selectedSeatReservationPlaces = this._selectedSeatReservationPlaces.filter(
          (_selectedPlace) => _selectedPlace.id !== currSelectedPlace.id,
        );
      }

      //Checks whether maxReservation is activated and the maximum number of selected places is reached
      if (
        this.maxReservations &&
        this._selectedSeatReservationPlaces.length > this.maxReservations
      ) {
        this._resetAllPlaceSelections(currSelectedPlace);
      }

      //Emits the seat reservation place selection
      this.selectedPlaces.emit(this._selectedSeatReservationPlaces);
    }
  }

  private _getSeatReservationPlaceSelection(
    currSelectedPlace: PlaceSelection,
  ): SeatReservationPlaceSelection | null {
    const coach = this.seatReservation.coachItems[currSelectedPlace.coachIndex];
    const place = coach.places?.find((place) => place.number === currSelectedPlace.number);

    if (!place) {
      return null;
    }

    return {
      id: currSelectedPlace.id,
      coachId: coach.id,
      coachNumber: coach.number,
      coachIndex: currSelectedPlace.coachIndex,
      placeNumber: place.number,
      placeType: place.type,
      placeTravelClass: place.travelClass || 'ANY_CLASS',
      propertyIds: place.propertyIds || [],
    };
  }

  /**
   * All selected places will be reset or the currentSelectedPlace was given, then we reset all except currentSelectedPlace
   * @param currSelectedPlace
   */
  private _resetAllPlaceSelections(currSelectedPlace?: PlaceSelection): void {
    //Find all places to be needed unselect

    for (const placeSelection of this._selectedSeatReservationPlaces) {
      if (!currSelectedPlace || currSelectedPlace.id !== placeSelection.id) {
        const placeElement = this.shadowRoot?.getElementById(placeSelection.id) as HTMLElement;
        placeElement.setAttribute('state', 'FREE');
      }
    }
    //Removes all selected places except the currently selected place
    this._selectedSeatReservationPlaces = currSelectedPlace
      ? this._selectedSeatReservationPlaces.filter(
          (_selectedPlace) => _selectedPlace.id === currSelectedPlace.id,
        )
      : [];
  }

  private _getCalculatedDimension(elementDimension: ElementDimension): ElementDimension {
    return {
      w: this._gridSizeFactor * elementDimension.w,
      h: this._gridSizeFactor * elementDimension.h,
    };
  }

  private _getCalculatedPosition(elementPosition: ElementPosition): ElementPosition {
    return {
      x: this._gridSizeFactor * elementPosition.x,
      y: this._gridSizeFactor * elementPosition.y,
      z: 0,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation': SbbSeatReservationElement;
  }
}
