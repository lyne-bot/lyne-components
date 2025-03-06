import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { TimeAdapter } from '../../core/datetime.js';
import { forceType } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import type { SbbPearlChainElement } from '../pearl-chain.js';

import style from './pearl-chain-leg.scss?lit&inline';

/**
 * It displays a journey leg inside a `sbb-pearl-chain`.
 *
 * @event {CustomEvent<void>} leg-updated - Update event emitter
 */
export
@customElement('sbb-pearl-chain-leg')
class SbbPearlChainLegElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    legUpdated: 'leg-updated',
  } as const;

  /** Departure time of the leg. */
  @property({ type: Date })
  public set departure(value: Date | string | number | null) {
    this._departure = this._timeAdapter.deserialize(value);
  }

  public get departure(): Date {
    return this._departure ?? this._timeAdapter.invalid();
  }

  private _departure?: Date;

  /** Arrival time of the leg. */
  @property({ type: Date })
  public set arrival(value: Date | string | number | null) {
    this._arrival = this._timeAdapter.deserialize(value);
  }

  public get arrival(): Date {
    return this._arrival ?? this._timeAdapter.invalid();
  }

  private _arrival?: Date;

  /** Whether the leg is disrupted. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor disruption: boolean = false;

  /** Whether current time is past arrival time. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor past: boolean = false;

  /** Whether the leg's departure is skipped. */
  @forceType()
  @property({ reflect: true, type: Boolean, attribute: 'departure-skipped' })
  public accessor departureSkipped: boolean = false;

  /** Whether the leg's arrival is skipped. */
  @forceType()
  @property({ reflect: true, type: Boolean, attribute: 'arrival-skipped' })
  public accessor arrivalSkipped: boolean = false;

  /** The number of minutes of delay on departure. */
  @forceType()
  @property({ type: Number, attribute: 'departure-delay' })
  public accessor departureDelay: number = 0;

  /** The number of minutes of delay on arrival. */
  @forceType()
  @property({ type: Number, attribute: 'arrival-delay' })
  public accessor arrivalDelay: number = 0;

  /** Input event emitter */
  private _legUpdated: EventEmitter = new EventEmitter(
    this,
    SbbPearlChainLegElement.events.legUpdated,
    {
      bubbles: true,
      composed: false,
    },
  );

  private _timeAdapter: TimeAdapter = new TimeAdapter();
  private _interval: ReturnType<typeof setInterval> | null = null;

  private get _pearlChain(): SbbPearlChainElement {
    return this.closest('sbb-pearl-chain')!;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cancelInterval();
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (
      this.hasUpdated &&
      (changedProperties.has('arrivalSkipped') ||
        changedProperties.has('arrival') ||
        changedProperties.has('departure'))
    ) {
      this._legUpdated.emit();
    }
  }

  /**@internal */
  public updateStatus(now: Date): void {
    const start = this._timeAdapter.addMinutes(this.departure, this.departureDelay);
    const end = this._timeAdapter.addMinutes(this.arrival, this.arrivalDelay);
    this.toggleAttribute('data-progress', false);
    if (
      start &&
      !this._timeAdapter.isBefore(now, start) &&
      end &&
      this._timeAdapter.isAfter(end, now)
    ) {
      this.toggleAttribute('data-progress', true);
      this._renderPosition();
      if (!this._interval && !this._pearlChain.hasAttribute('now')) {
        this._interval = setInterval(() => {
          this._renderPosition();
        }, 1000);
      }
    } else if (end && !this._timeAdapter.isBefore(now, end)) {
      this.past = true;
    }
  }

  private _renderPosition(): void {
    const currentPosition = this._getProgress(
      this._timeAdapter.addMinutes(this.departure, this.departureDelay),
      this._timeAdapter.addMinutes(this.arrival, this.arrivalDelay),
    );

    if (currentPosition < 0 || currentPosition >= 1) {
      this._cancelInterval(true);
      return;
    }

    this?.style.setProperty('--sbb-pearl-chain-status-position', `${currentPosition}`);
  }

  private _getProgress(start: Date, end: Date): number {
    if (!start || !end) {
      return 0;
    }

    const total = this._timeAdapter.differenceInMinutes(end, start);
    const progress = this._timeAdapter.differenceInMinutes(this._pearlChain.now, start);

    return total && progress / total;
  }

  private _cancelInterval(updateParent: boolean = false): void {
    if (this._interval) {
      clearInterval(this._interval);
      if (updateParent) {
        this._legUpdated.emit();
      }
    }
  }

  protected override render(): TemplateResult {
    return html` <div class="sbb-pearl-chain__leg">
      <span class="sbb-pearl-chain__stop">
        <span class="sbb-pearl-chain__stop-inner"></span>
      </span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain-leg': SbbPearlChainLegElement;
  }
}
