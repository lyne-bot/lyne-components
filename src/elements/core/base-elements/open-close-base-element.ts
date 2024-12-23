import { LitElement } from 'lit';

import { EventEmitter } from '../eventing.js';
import type { SbbOpenedClosedState } from '../interfaces.js';

/**
 * Base class for overlay components.
 *
 * @event willOpen - Emits whenever the component starts the opening transition. Can be canceled.
 * @event didOpen - Emits whenever the component is opened.
 * @event willClose - Emits whenever the component begins the closing transition. Can be canceled.
 * @event didClose - Emits whenever the component is closed.
 */
export abstract class SbbOpenCloseBaseElement extends LitElement {
  public static readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;

  /** The state of the component. */
  protected set state(state: SbbOpenedClosedState) {
    this.setAttribute('data-state', state);
  }
  protected get state(): SbbOpenedClosedState {
    return this.getAttribute('data-state') as SbbOpenedClosedState;
  }

  /** Whether the element is open. */
  public get isOpen(): boolean {
    return this.state === 'opened';
  }

  /** Emits whenever the component starts the opening transition. */
  protected willOpen: EventEmitter = new EventEmitter(
    this,
    SbbOpenCloseBaseElement.events.willOpen,
    { cancelable: true },
  );

  /** Emits whenever the component is opened. */
  protected didOpen: EventEmitter = new EventEmitter(this, SbbOpenCloseBaseElement.events.didOpen, {
    cancelable: true,
  });

  /** Emits whenever the component begins the closing transition. */
  protected willClose: EventEmitter = new EventEmitter(
    this,
    SbbOpenCloseBaseElement.events.willClose,
    { cancelable: true },
  );

  /** Emits whenever the component is closed. */
  protected didClose: EventEmitter = new EventEmitter(
    this,
    SbbOpenCloseBaseElement.events.didClose,
    { cancelable: true },
  );

  /** Opens the component. */
  public abstract open(): void;
  /** Closes the component. */
  public abstract close(): void;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.state ||= 'closed';
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    willOpen: CustomEvent<void>;
    willClose: CustomEvent<void>;
    didOpen: CustomEvent<void>;
    didClose: CustomEvent<void>;
  }
}
