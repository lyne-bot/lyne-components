import type { SbbDateLike } from '@sbb-esta/lyne-elements/core/interfaces';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './pearl-chain-leg.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 * @event {CustomEvent<any>} myEventName - TODO: Document this event
 */
@customElement('sbb-pearl-chain-leg')
export class SbbPearlChainLegElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Departure time of the leg. */
  @property()
  public set departure(value: SbbDateLike | null) {
    this._departure = value;
  }
  public get departure(): SbbDateLike | null {
    return this._departure;
  }
  private _departure: SbbDateLike | null = null;

  /** Arrival time of the leg. */
  @property()
  public set arrival(value: SbbDateLike | null) {
    this._arrival = value;
  }
  public get arrival(): SbbDateLike | null {
    return this._arrival;
  }
  private _arrival: SbbDateLike | null = null;

  /** Whether the leg is disrupted. */
  @property({ reflect: true, type: Boolean }) public disruption: boolean = false;

  /** Whether current time is past arrival time. */
  @property({ reflect: true, type: Boolean }) public past: boolean = false;

  /** Whether the leg's departure is skipped. */
  @property({ reflect: true, type: Boolean, attribute: 'departure-skipped' })
  public departureSkipped: boolean = false;

  /** Whether the leg's arrival is skipped. */
  @property({ reflect: true, type: Boolean, attribute: 'arrival-skipped' })
  public arrivalSkipped: boolean = false;

  /** The number of minutes of delay on departure. */
  @property({ type: Number, attribute: 'departure-delay' }) public departureDelay: number = 0;

  /** The number of minutes of delay on arrival. */
  @property({ type: Number, attribute: 'arrival-delay' }) public arrivalDelay: number = 0;

  private _displayStop(): boolean {
    return !this.hasAttribute('data-first-leg');
  }

  protected override willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);

    //We need to update parent pearl-chain so that following leg can be styled properly.
    if (_changedProperties.has('arrivalSkipped')) {
      const parentPearlChain = this.closest('sbb-pearl-chain');
      if (!parentPearlChain) {
        return;
      }
      parentPearlChain.requestUpdate();
    }
  }

  protected override render(): TemplateResult {
    return html` <div class="sbb-pearl-chain__leg">
      ${this._displayStop() ? html` <span class="sbb-pearl-chain__stop"></span>` : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain-leg': SbbPearlChainLegElement;
  }
}
