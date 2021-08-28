import {
  Component,
  Element,
  h,
  Prop,
  State,
  Watch
} from '@stencil/core';
import chevronIcon from 'lyne-icons/dist/icons/chevron-small-down-small.svg';
import events from './lyne-accordion-item.events';
import { guid } from '../../global/guid';
import { InterfaceAccordionItemAttributes } from './lyne-accordion-item.custom.d';

const iconSlotName = 'icon';

/**
 * @slot icon - Pass an svg to display an icon left to the title.
 * @slot content - Pass html-content to show as the content of the accordion.
 * Use flat html:
 * This is ok: `<p>Some text</p><p>Some other text</p>`
 * This instead would not be ok:
 * `<div><p>Some text</p><p>Some other text</p></div>`
 */

@Component({
  shadow: true,
  styleUrl: 'lyne-accordion-item.scss',
  tag: 'lyne-accordion-item'
})

export class LyneAccordionItem {

  /**
   * Text to show as title for the accordion.
   */
  @Prop() public heading!: string;

  /**
   * Heading level.
   */
  @Prop() public headingLevel?: InterfaceAccordionItemAttributes['level'] = '1';

  /**
   * Set to true to open the accordion item. Set to false to close it.
   */
  @Prop({
    reflect: true
  }) public open?: boolean;

  /** Id which is sent in the event after opening/closing accordion */
  @Prop() public eventId?: string;

  /** If set, an accordion can not be toggled */
  @Prop() public disabled?: boolean;

  @State() private _isAnimating = false;
  @State() private _openClass: string;

  @Element() private _element: HTMLElement;

  @Watch('open')
  public watchStateHandler(newValue: boolean): void {
    if (!this._isAnimating) {
      this._toggleAccordion(newValue);
    }
  }

  private _accordionBody!: HTMLElement;
  private _chevron: HTMLElement;
  private _guid: string;

  private _dispatchEvent = (name: string): void => {
    let eventDetail;

    if (this.eventId) {
      eventDetail = this.eventId;
    }

    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail: eventDetail
    });

    this._element.dispatchEvent(event);
  };

  private _handleToggleEnd = (data: any): void => {
    const wasHeightAnimation = data.propertyName === 'height';

    if (wasHeightAnimation) {
      this._accordionBody.removeEventListener('transitionend', this._handleToggleEnd);
      this._isAnimating = false;

      if (this.open) {
        this._accordionBody.style.setProperty('height', 'auto');
      }

      const eventName = this.open
        ? events.didOpen
        : events.didClose;

      this._dispatchEvent(eventName);

      this._openClass = this.open
        ? 'accordion-item--open'
        : 'accordion-item--closed';
    }
  };

  private _toggleAccordion = (state?): void => {
    if (this._isAnimating) {
      return;
    }

    if (this.disabled) {
      return;
    }

    this._isAnimating = true;

    if (state === undefined) {
      this.open = !this.open;
    } else {
      this.open = state;
    }

    const eventName = this.open
      ? events.willOpen
      : events.willClose;

    this._dispatchEvent(eventName);

    let newHeight = 0;
    let newOpacity = '0';

    if (this.open) {
      this._accordionBody.style.setProperty('height', 'auto');
      this._accordionBody.style.setProperty('display', 'block');
      this._accordionBody.style.setProperty('opacity', '0');

      newHeight = this._accordionBody.getBoundingClientRect().height;
      newOpacity = '1';

      this._accordionBody.style.setProperty('height', '0');
      this._chevron.classList.add('accordion-item__chevron--rotate');
    } else {
      const initHeight = this._accordionBody.getBoundingClientRect().height;

      this._accordionBody.style.setProperty('height', `${initHeight}px`);
      this._chevron.classList.remove('accordion-item__chevron--rotate');
    }

    this._accordionBody.addEventListener('transitionend', this._handleToggleEnd);

    setTimeout(() => {
      this._accordionBody.style.setProperty('height', `${newHeight}px`);
      this._accordionBody.style.setProperty('opacity', newOpacity);
    }, 0);

  };

  public componentWillLoad(): void {
    this._guid = guid();

    if (this.open) {
      this._openClass = 'accordion-item--open';
    } else {
      this._openClass = 'accordion-item--closed';
    }
  }

  public componentDidLoad(): void {
    if (this.open) {
      this._chevron.classList.add('accordion-item__chevron--rotate');
    }
  }

  public render(): JSX.Element {
    const HEADING_TAGNAME = `h${this.headingLevel}`;

    const hasIconInSlot = this._element.querySelector(`svg[slot="${iconSlotName}"]`) !== null;

    const iconClass = hasIconInSlot
      ? ' accordion-item--has-icon'
      : '';

    const ariaHidden = this.open
      ? 'false'
      : 'true';

    const disabledClass = this.disabled
      ? ' accordion-item--disabled'
      : '';

    return (
      <div class={`accordion-item${iconClass}${disabledClass} ${this._openClass}`}>

        <HEADING_TAGNAME
          class='accordion-item__heading'
          onClick={(): void => this._toggleAccordion()}
        >

          <button
            class='accordion-item__button'
            aria-label={this.heading}
            aria-expanded={this.open}
            aria-controls={`${this._guid}_body`}
          >

            <div class='accordion-item__icon'>
              <slot name={iconSlotName} />
            </div>

            <span class='accordion-item__title'>{this.heading}</span>

            <div
              class='accordion-item__chevron'
              innerHTML={chevronIcon}
              ref={(el): void => {
                this._chevron = el;
              }}
            />

          </button>

        </HEADING_TAGNAME>

        <div
          class='accordion-item__body'
          id={`${this._guid}_body`}
          aria-hidden={ariaHidden}
          ref={(el): void => {
            this._accordionBody = el;
          }}
        >
          <div class='accordion-item__body-inner'>
            <slot name='content' />
          </div>
        </div>
      </div>
    );
  }
}
