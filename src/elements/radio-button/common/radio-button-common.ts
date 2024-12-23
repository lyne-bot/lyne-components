import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { setModalityOnNextFocus } from '../../core/a11y.js';
import {
  type AbstractConstructor,
  type Constructor,
  SbbFormAssociatedRadioButtonMixin,
  type SbbFormAssociatedRadioButtonMixinType,
} from '../../core/mixins.js';
import type { SbbRadioButtonGroupElement } from '../radio-button-group.js';

export type SbbRadioButtonSize = 'xs' | 's' | 'm';

export declare class SbbRadioButtonCommonElementMixinType extends SbbFormAssociatedRadioButtonMixinType {
  public get allowEmptySelection(): boolean;
  public set allowEmptySelection(boolean);
  public get group(): SbbRadioButtonGroupElement | null;
  public select(): void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbRadioButtonCommonElementMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbRadioButtonCommonElementMixinType> & T => {
  abstract class SbbRadioButtonCommonElement
    extends SbbFormAssociatedRadioButtonMixin(superClass)
    implements Partial<SbbRadioButtonCommonElementMixinType>
  {
    public static readonly events = {
      change: 'change',
      input: 'input',
    } as const;

    /**
     * Whether the radio can be deselected.
     */
    @property({ attribute: 'allow-empty-selection', type: Boolean })
    public set allowEmptySelection(value: boolean) {
      this._allowEmptySelection = Boolean(value);
    }
    public get allowEmptySelection(): boolean {
      return this._allowEmptySelection || (this.group?.allowEmptySelection ?? false);
    }
    private _allowEmptySelection = false;

    /**
     * Reference to the connected radio button group.
     */
    public get group(): SbbRadioButtonGroupElement | null {
      return this._group;
    }
    private _group: SbbRadioButtonGroupElement | null = null;

    public constructor() {
      super();
      this.addEventListener?.('click', (e) => this._handleClick(e));
      this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._group = this.closest('sbb-radio-button-group') as SbbRadioButtonGroupElement;

      // We need to call requestUpdate to update the reflected attributes
      ['disabled', 'required', 'size'].forEach((p) => this.requestUpdate(p));
    }

    /**
     * Set the radio-button as 'checked'; if 'allowEmptySelection', toggle the checked property.
     * In both cases it emits the change events.
     */
    public select(): void {
      if (this.disabled || this.formDisabled) {
        return;
      }

      if (this.allowEmptySelection) {
        this.checked = !this.checked;
        this.emitChangeEvents();
      } else if (!this.checked) {
        this.checked = true;
        this.emitChangeEvents();
      }
    }

    protected override isDisabledExternally(): boolean {
      return this.group?.disabled ?? false;
    }

    protected override isRequiredExternally(): boolean {
      return this.group?.required ?? false;
    }

    private async _handleClick(event: Event): Promise<void> {
      event.preventDefault();
      this.select();

      /**
       * Since only a single radio of a group is focusable at any time, it is possible that the one clicked does not have 'tabindex=0'.
       * To cover that, we await the next render (which will make the 'checked' radio focusable) and focus the clicked radio
       */
      await this.updateComplete; // Wait for 'tabindex' to be updated
      setModalityOnNextFocus(this);
      this.focus();
    }

    private _handleKeyDown(evt: KeyboardEvent): void {
      if (evt.code === 'Space') {
        evt.preventDefault();
        this.select();
      }
    }
  }

  return SbbRadioButtonCommonElement as unknown as AbstractConstructor<SbbRadioButtonCommonElementMixinType> &
    T;
};
