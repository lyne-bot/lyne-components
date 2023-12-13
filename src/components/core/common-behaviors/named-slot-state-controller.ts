import { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * This controller checks for slotted children. From these it generates
 * a list of used slot names (`unnamed` for children without a slot attribute)
 * and adds this to the `data-slot-names` attribute, as a space separated list.
 *
 * This allows CSS attribute selector to display/hide/configure a section
 * of the component as required (see [attr~=value] selector specifically).
 *
 * @example
 * .example {
 *   display: none;
 *
 *   :host([data-slot-names~="icon"]) & {
 *     display: inline;
 *   }
 * }
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
 */
export class NamedSlotStateController implements ReactiveController {
  private _slots = new Set<string>();

  // We avoid using AbortController here, as it would mean creating
  // a new instance for every NamedSlotStateController instance.
  private _slotchangeHandler = (event: Event): void => {
    this._syncSlots(event.target as HTMLSlotElement);
  };

  public constructor(private _host: ReactiveControllerHost & Partial<HTMLElement>) {
    this._host.addController(this);
  }

  public hostConnected(): void {
    // TODO: Check if this is really needed with SSR.
    this._syncSlots(...this._host.querySelectorAll('slot'));
    this._host.shadowRoot?.addEventListener('slotchange', this._slotchangeHandler);
  }

  public hostDisconnected(): void {
    this._host.shadowRoot?.removeEventListener('slotchange', this._slotchangeHandler);
  }

  private _syncSlots(...slots: HTMLSlotElement[]): void {
    for (const slot of slots) {
      const slotName = slot.name || 'unnamed';
      // We want to check, whether an element is slotted or a text node with actual content.
      if (slot.assignedNodes().some((n) => 'tagName' in n || n.textContent?.trim())) {
        this._slots.add(slotName);
      } else {
        this._slots.delete(slotName);
      }
    }

    const joinedSlotNames = [...this._slots].sort().join(' ');
    if (!joinedSlotNames) {
      this._host.removeAttribute('data-slot-names');
    } else if (this._host.getAttribute('data-slot-names') !== joinedSlotNames) {
      this._host.setAttribute('data-slot-names', joinedSlotNames);
    }
  }
}
