import { containsPierceShadowDom, isIOS } from '../dom.js';

/**
 * Listens globally to pointer events that happen outside the overlay area.
 *
 * Ref: https://github.com/angular/components/blob/main/src/cdk/overlay/dispatchers/overlay-outside-click-dispatcher.ts
 */
export class SbbOverlayOutsidePointerEventListener {
  private _overlays = new Set<HTMLElement>();
  private _pointerDownEventTarget?: HTMLElement;
  private _abortController?: AbortController;
  private _cursorOriginalValue?: string;

  public connect(overlay: HTMLElement): void {
    if (!this._overlays.size) {
      this._addGlobalEventListeners();
      if (isIOS) {
        // Safari on iOS does not generate click events for non-interactive
        // elements. However, we want to receive a click for any element outside
        // the overlay. We can force a "clickable" state by setting
        // `cursor: pointer` on the document body. See:
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event#Safari_Mobile
        // https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html
        this._cursorOriginalValue = document.body.style.cursor;
        document.body.style.cursor = 'pointer';
      }
    }
    this._overlays.add(overlay);
  }

  public disconnect(overlay: HTMLElement): void {
    this._overlays.delete(overlay);
    if (!this._overlays.size) {
      this._abortController?.abort();
      this._abortController = undefined;
      if (isIOS) {
        document.body.style.cursor = this._cursorOriginalValue!;
      }
    }
  }

  private _addGlobalEventListeners(): void {
    const body = document.body;
    this._abortController = new AbortController();
    const options: AddEventListenerOptions = {
      capture: true,
      passive: true,
      signal: this._abortController.signal,
    };
    body.addEventListener('pointerdown', this._pointerDownListener, options);
    body.addEventListener('click', this._clickListener, options);
    body.addEventListener('auxclick', this._clickListener, options);
    body.addEventListener('contextmenu', this._clickListener, options);
  }

  /** Store pointerdown event target to track origin of click. */
  private _pointerDownListener = (event: PointerEvent): void => {
    this._pointerDownEventTarget = event.composedPath()[0] as HTMLElement;
  };

  /** Click event listener that will be attached to the body propagate phase. */
  private _clickListener = (event: MouseEvent): void => {
    const target = event.composedPath()[0] as HTMLElement;
    // In case of a click event, we want to check the origin of the click
    // (e.g. in case where a user starts a click inside the overlay and
    // releases the click outside of it).
    // This is done by using the event target of the preceding pointerdown event.
    // Every click event caused by a pointer device has a preceding pointerdown
    // event, unless the click was programmatically triggered (e.g. in a unit test).
    const origin =
      event.type === 'click' && this._pointerDownEventTarget
        ? this._pointerDownEventTarget
        : target;
    // Reset the stored pointerdown event target, to avoid having it interfere
    // in subsequent events.
    this._pointerDownEventTarget = undefined;

    // Start checking from the newest overlay. Once we find an overlay for which the
    // click is not outside its area, we break the loop.
    for (const overlay of Array.from(this._overlays).reverse()) {
      if (containsPierceShadowDom(overlay, target) || containsPierceShadowDom(overlay, origin)) {
        break;
      }

      overlay.dispatchEvent(new CustomEvent('overlayOutsidePointer'));
    }
  };
}

/** The global instance for listening for outside pointer events. */
export const sbbOverlayOutsidePointerEventListener = new SbbOverlayOutsidePointerEventListener();

declare global {
  interface GlobalEventHandlersEventMap {
    overlayOutsidePointer: CustomEvent;
  }
}
