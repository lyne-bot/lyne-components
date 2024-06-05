import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import {
  type Constructor,
  type SbbDisabledMixinType,
  SbbFormAssociatedCheckboxMixin,
  type SbbFormAssociatedCheckboxMixinType,
  type SbbRequiredMixinType,
} from '../../core/mixins.js';
import type { SbbCheckboxGroupElement } from '../checkbox-group.js';

export type SbbCheckboxSize = 's' | 'm';

export declare class SbbCheckboxCommonElementMixinType
  extends SbbFormAssociatedCheckboxMixinType
  implements Partial<SbbDisabledMixinType>, Partial<SbbRequiredMixinType>
{
  public indeterminate: boolean;

  public get group(): SbbCheckboxGroupElement | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbCheckboxCommonElementMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbCheckboxCommonElementMixinType> & T => {
  abstract class SbbCheckboxCommonElement
    extends SbbFormAssociatedCheckboxMixin(superClass)
    implements Partial<SbbCheckboxCommonElementMixinType>
  {
    /** Whether the checkbox is indeterminate. */
    @property({ type: Boolean }) public indeterminate = false;

    /** Label size variant, either m or s. */
    @property({ reflect: true })
    public set size(value: SbbCheckboxSize) {
      this._size = value;
    }
    public get size(): SbbCheckboxSize {
      return this.group?.size ?? this._size;
    }
    private _size: SbbCheckboxSize = 'm';

    /** Reference to the connected checkbox group. */
    public get group(): SbbCheckboxGroupElement | null {
      return this._group;
    }
    private _group: SbbCheckboxGroupElement | null = null;

    public override connectedCallback(): void {
      super.connectedCallback();
      this._group = this.closest('sbb-checkbox-group') as SbbCheckboxGroupElement;

      // We need to call requestUpdate to update the reflected attributes
      ['disabled', 'required', 'size'].forEach((p) => this.requestUpdate(p));
    }

    protected override async willUpdate(changedProperties: PropertyValues<this>): Promise<void> {
      super.willUpdate(changedProperties);

      if (changedProperties.has('checked') || changedProperties.has('indeterminate')) {
        this.internals.ariaChecked = this.indeterminate ? 'mixed' : `${this.checked}`;
      }
    }

    protected override isDisabledExternally(): boolean {
      return this.group?.disabled ?? false;
    }

    protected override isRequiredExternally(): boolean {
      return this.group?.required ?? false;
    }

    protected override withUserInteraction(): void {
      if (this.indeterminate) {
        this.indeterminate = false;
      }
    }
  }
  return SbbCheckboxCommonElement as unknown as Constructor<SbbCheckboxCommonElementMixinType> & T;
};
