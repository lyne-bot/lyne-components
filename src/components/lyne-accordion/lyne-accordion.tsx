import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from '../lyne-accordion-item/lyne-accordion-item.events';

/**
 * @slot unnamed - Place lyne-accordion-item elements in the slot
 */

@Component({
  shadow: true,
  styleUrl: 'lyne-accordion.scss',
  tag: 'lyne-accordion'
})

export class LyneAccordion {

  /**
   * Set this if you want to use the accordion on a non-white background.
   */
  @Prop() public nonWhiteBackground?: boolean;

  /**
   * Set this if you want the accordion to always have open only one item.
   */
  @Prop() public onlyOneOpen? = false;

  @Element() private _element: HTMLElement;

  private _eventIds = [];
  private _items;

  private _setEventIds(): void {
    this._items = this._element.querySelectorAll('lyne-accordion-item');

    this._items.forEach((item, index) => {
      const eventId = item.getAttribute('event-id');
      let finalEventId;

      if (eventId) {
        finalEventId = eventId;
      } else {
        finalEventId = `accordion-item-id-${index}`;
        item.setAttribute('event-id', finalEventId);
      }

      this._eventIds.push(finalEventId);
    });
  }

  private _handleAccordionOpen(evt): void {
    const eventId = evt.detail;

    if (!eventId) {
      return;
    }

    this._items.forEach((item) => {
      const itemId = item.getAttribute('event-id');

      if (itemId !== eventId) {
        item.removeAttribute('open');
      }
    });

  }

  public componentWillLoad(): void {
    if (!this.onlyOneOpen) {
      return;
    }

    this._setEventIds();

    this._element.addEventListener(events.willOpen, this._handleAccordionOpen.bind(this));
  }

  public render(): JSX.Element {
    const nonWhite = this.nonWhiteBackground
      ? ' accordion--non-white'
      : '';

    return (
      <div class={`accordion${nonWhite}`}>
        <slot />
      </div>
    );
  }
}
