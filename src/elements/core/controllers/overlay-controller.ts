import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

import type { SbbOpenCloseBaseElement } from '../base-elements/open-close-base-element.js';

const overlayStack = new Array<SbbOpenCloseBaseElement>();

if (!isServer) {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !event.defaultPrevented) {
      event.preventDefault();
      overlayStack.at(-1)?.close();
    }
  });
}

export class SbbOverlayController implements ReactiveController {
  public constructor(private _host: ReactiveControllerHost & SbbOpenCloseBaseElement) {
    this._host.addController?.(this);
  }

  public hostDisconnected(): void {
    this.disconnect();
  }

  // This must be called when the overlay is opened
  public connect(): void {
    overlayStack.push(this._host);
  }

  // This must be called when the overlay is closed
  public disconnect(): void {
    if (overlayStack.length) {
      const findElIndex = overlayStack.findIndex((e) => e === this._host);
      if (findElIndex !== -1) {
        overlayStack.splice(findElIndex, 1);
      }
    }
  }
}
