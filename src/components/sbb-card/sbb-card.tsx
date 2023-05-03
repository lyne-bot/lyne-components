import { Component, ComponentInterface, Element, h, JSX, Prop, State } from '@stencil/core';
import { InterfaceSbbCardAttributes } from './sbb-card.custom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';

/**
 * @slot unnamed - Slot to render the content.
 * @slot badge - Slot to render `<sbb-card-badge>`.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-card.scss',
  tag: 'sbb-card',
})
export class SbbCard implements ComponentInterface {
  /** Size variant, either xs, s, m, l, xl, xxl or xxxl. */
  @Prop({ reflect: true }) public size?: InterfaceSbbCardAttributes['size'] = 'm';

  /** Option to set the component's background color. */
  @Prop({ reflect: true }) public color: InterfaceSbbCardAttributes['color'] = 'white';

  @Element() private _element!: HTMLElement;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('badge');

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => {
      this._namedSlots = m(this._namedSlots);
    })
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  /**
   * It is used internally to show the `<sbb-card-badge>`.
   *
   * @returns True whether size is equal to m, l, xl or xxl.
   */
  private _isBadgeVisible(): boolean {
    return ['m', 'l', 'xl', 'xxl', 'xxxl'].includes(this.size);
  }

  public render(): JSX.Element {
    return (
      <span class="sbb-card">
        <slot name="action"></slot>
        <span class="sbb-card__wrapper">
          <slot />
        </span>
        {this._isBadgeVisible() && (
          <span class="sbb-card__badge-wrapper">
            <slot name="badge" />
          </span>
        )}
      </span>
    );
  }
}
