import type { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * @deprecated No replacement should be necessary, as this was intended
 *   for event listeners, which should be applied in the constructor.
 */
export class SbbConnectedAbortController implements ReactiveController {
  private _abortController?: AbortController = new AbortController();

  public get signal(): AbortSignal | undefined {
    return this._abortController?.signal;
  }

  public constructor(private _host: ReactiveControllerHost) {
    this._host.addController(this);
  }

  public hostConnected(): void {
    if (!this._abortController) {
      this._abortController = new AbortController();
    }
  }

  public hostDisconnected(): void {
    this._abortController?.abort();
    this._abortController = undefined;
  }
}
