import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType } from '../decorators.js';
import { EventEmitter } from '../eventing.js';

import type { AbstractConstructor } from './constructor.js';

export declare class SbbPanelMixinType {
  public accessor color: 'white' | 'milk';
  public accessor borderless: boolean;
  public accessor expansionState: string;
}

export type SbbPanelSize = 's' | 'm';

/**
 * Mixin for common panel behaviors
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbPanelMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbPanelMixinType> & T => {
  abstract class SbbPanelElement extends superClass implements SbbPanelMixinType {
    public static readonly events = {
      panelConnected: 'panelConnected',
    } as const;

    /** The background color of the panel. */
    @property() public accessor color: 'white' | 'milk' = 'white';

    /** Whether the unselected panel has a border. */
    @forceType()
    @property({ reflect: true, type: Boolean })
    public accessor borderless: boolean = false;

    /** @internal used for accessibility label when in expansion panel */
    @forceType()
    @property()
    public accessor expansionState: string = '';

    /**
     * @internal
     * Internal event that emits when the checkbox is loaded.
     */
    private _panelConnected: EventEmitter<void> = new EventEmitter(
      this,
      SbbPanelElement.events.panelConnected,
      { bubbles: true },
    );

    public override connectedCallback(): void {
      super.connectedCallback();

      this._panelConnected.emit();
    }
  }

  return SbbPanelElement as AbstractConstructor<SbbPanelMixinType> & T;
};
