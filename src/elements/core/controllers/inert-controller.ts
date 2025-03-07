import type { ReactiveController, ReactiveControllerHost } from 'lit';

const IGNORED_ELEMENTS = ['script', 'head', 'template', 'style'];
const inertElements = new Set<HTMLElement>();
const inertOverlays = new Set<HTMLElement>();

export class SbbInertController implements ReactiveController {
  public constructor(
    private _host: ReactiveControllerHost & HTMLElement,
    private _inertElements = inertElements,
    private _inertOverlays = inertOverlays,
  ) {
    this._host.addController?.(this);
  }

  public hostDisconnected(): void {
    if (this.isInert()) {
      this.deactivate();
    }
  }

  /** Applies inert state to every other element on the page except the overlay. */
  public activate(): void {
    // Remove inert state from previous opened overlay
    if (this._inertOverlays.size) {
      this._removeInertAttributes();
    }

    this._inertOverlays.add(this._host);
    this._addInertAttributes();
  }

  /** Removes inert state. */
  public deactivate(): void {
    if (this._currentOverlay() !== this._host) {
      // If e.g. a component gets disconnected, it could be that it is not the top most.
      // In this case, we can directly remove it, as there is currently no inert state applied.
      if (this._inertOverlays.has(this._host)) {
        this._inertOverlays.delete(this._host);
      } else if (import.meta.env.DEV) {
        console.warn(
          'Trying to remove inert state of an overlay which never had an applied inert state.',
          this._host,
        );
      }

      return;
    }

    this._removeInertAttributes();
    this._inertOverlays.delete(this._host);

    // If there is as previous opened overlay, set its inert state again.
    if (this._inertOverlays.size) {
      this._addInertAttributes();
    }
  }

  /** Whether the assigned host is currently inert */
  public isInert(): boolean {
    return this._inertOverlays.has(this._host);
  }

  private _currentOverlay(): HTMLElement | null {
    return [...this._inertOverlays].pop() ?? null;
  }

  private _removeInertAttributes(): void {
    this._inertElements.forEach((element: HTMLElement): void => {
      if (!element) {
        return;
      }

      if (element.hasAttribute('data-sbb-inert')) {
        element.inert = false;
        element.removeAttribute('data-sbb-inert');
      }

      if (element.hasAttribute('data-sbb-aria-hidden')) {
        element.removeAttribute('aria-hidden');
        element.removeAttribute('data-sbb-aria-hidden');
      }
    });
    this._inertElements.clear();
  }

  private _addInertAttributes(): void {
    let element: Element | null = this._currentOverlay();

    while (element !== document.documentElement && element !== null) {
      Array.from((element?.parentElement ?? element?.getRootNode())?.childNodes ?? [])
        .filter(
          (child): child is HTMLElement =>
            child !== element &&
            child instanceof window.HTMLElement &&
            !IGNORED_ELEMENTS.includes(child.localName),
        )
        .forEach((element) => {
          this._inertElements.add(element);

          if (!element.inert) {
            element.inert = true;
            element.toggleAttribute('data-sbb-inert', true);
          }

          if (!element.hasAttribute('aria-hidden')) {
            element.setAttribute('aria-hidden', 'true');
            element.toggleAttribute('data-sbb-aria-hidden', true);
          }
        });

      // We need to pierce through Shadow DOM boundary
      element = element?.parentElement ?? (element?.getRootNode() as ShadowRoot)?.host ?? null;
    }
  }
}
