import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import type { AbstractConstructor } from './constructor.js';
import type { SbbFormAssociatedMixinType } from './form-associated-mixin.js';

export declare class SbbRequiredMixinType {
  public set required(value: boolean);
  public get required(): boolean;
  protected isRequiredExternally(): boolean;
}

/**
 * Enhance your component with a required property.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbRequiredMixin = <
  T extends AbstractConstructor<LitElement & SbbFormAssociatedMixinType<V>>,
  V,
>(
  superClass: T,
): AbstractConstructor<SbbRequiredMixinType> & T => {
  abstract class SbbRequiredElement extends superClass implements Partial<SbbRequiredMixinType> {
    /** Whether the component is required. */
    @property({ reflect: true, type: Boolean })
    public set required(value: boolean) {
      // To provide the same behavior as the native required state,
      // any value is converted to a boolean.
      this._required = Boolean(value);
    }
    public get required(): boolean {
      return this._required || this.isRequiredExternally();
    }
    private _required: boolean = false;

    protected override async willUpdate(changedProperties: PropertyValues<this>): Promise<void> {
      super.willUpdate(changedProperties);

      if (changedProperties.has('required')) {
        // Firefox needs explicitly set aria-required value.
        this.internals.ariaRequired = `${this.required}`;
      }
    }

    /**
     * Will be used as 'or' check to the current required state.
     * Can e.g. be used to read required state of a group.
     */
    protected isRequiredExternally(): boolean {
      return false;
    }
  }

  return SbbRequiredElement as unknown as AbstractConstructor<SbbRequiredMixinType> & T;
};
