/**
 * Forwards an event to the element provided.
 * This way, an event triggered in the Shadow DOM can cross its boundary and can be listened on e.g. the host component.
 */
export function forwardEvent(event: Event, element: HTMLElement | Document): void {
  const eventConstructor = Object.getPrototypeOf(event).constructor;
  const copiedEvent: Event = new eventConstructor(event.type, event);
  element.dispatchEvent(copiedEvent);
}

/**
 * Forwards an event to the host element provided.
 * This way, an event triggered in the ShadowDOM can cross its boundary and can be listened on the host component.
 * @deprecated will be removed with next major version, use forwardEvent as alternative
 */
export const forwardEventToHost = forwardEvent;
