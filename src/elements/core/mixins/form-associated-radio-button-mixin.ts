import { isServer, type LitElement, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { getNextElementIndex, interactivityChecker, isArrowKeyPressed } from '../a11y.js';
import { SbbConnectedAbortController, SbbLanguageController } from '../controllers.js';
import { i18nSelectionRequired } from '../i18n.js';

import type { Constructor } from './constructor.js';
import { SbbDisabledMixin, type SbbDisabledMixinType } from './disabled-mixin.js';
import {
  SbbFormAssociatedMixin,
  type FormRestoreReason,
  type FormRestoreState,
  type SbbFormAssociatedMixinType,
} from './form-associated-mixin.js';
import { SbbRequiredMixin, type SbbRequiredMixinType } from './required-mixin.js';

/**
 * A static registry that holds a collection of grouped `radio-buttons`.
 * Groups of radio buttons are local to the form they belong (or the `renderRoot` if they're not part of any form)
 * Multiple groups of radio with the same name can coexist (as long as they belong to a different form / renderRoot)
 * It is mainly used to support the standalone groups of radios.
 * @internal
 */
export const radioButtonRegistry = new WeakMap<
  Node,
  Map<string, Set<SbbFormAssociatedRadioButtonMixinType>>
>();

export declare class SbbFormAssociatedRadioButtonMixinType
  extends SbbFormAssociatedMixinType
  implements Partial<SbbDisabledMixinType>, Partial<SbbRequiredMixinType>
{
  public accessor checked: boolean;
  public accessor disabled: boolean;
  public accessor required: boolean;

  protected associatedRadioButtons?: Set<SbbFormAssociatedRadioButtonMixinType>;
  /** @deprecated No longer used internally. */
  protected abort: SbbConnectedAbortController;

  public formResetCallback(): void;
  public formStateRestoreCallback(state: FormRestoreState | null, reason: FormRestoreReason): void;

  protected isDisabledExternally(): boolean;
  protected isRequiredExternally(): boolean;
  protected withUserInteraction?(): void;
  protected updateFormValue(): void;
  protected updateFocusableRadios(): void;
  protected emitChangeEvents(): void;
  protected navigateByKeyboard(radio: SbbFormAssociatedRadioButtonMixinType): Promise<void>;
}

/**
 * The SbbFormAssociatedRadioButtonMixin enables native form support for radio controls.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedRadioButtonMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbFormAssociatedRadioButtonMixinType> & T => {
  class SbbFormAssociatedRadioButtonElement
    extends SbbDisabledMixin(SbbRequiredMixin(SbbFormAssociatedMixin(superClass)))
    implements Partial<SbbFormAssociatedRadioButtonMixinType>
  {
    /**
     * Whether the radio button is checked.
     */
    @property({ type: Boolean })
    public set checked(value: boolean) {
      this._checked = !!value;

      this.toggleAttribute('data-checked', this.checked);
      this.internals.ariaChecked = this.checked.toString();
      this.updateFormValue();
      this._synchronizeGroupState();
    }
    public get checked(): boolean {
      return this._checked;
    }
    private _checked: boolean = false;

    public override set name(value: string) {
      super.name = value;

      this._disconnectFromRegistry();
      this._connectToRegistry();
      this._synchronizeGroupState();
    }
    public override get name(): string {
      return super.name;
    }

    /**
     * Form type of element.
     * @default 'radio'
     */
    public override get type(): string {
      return 'radio';
    }

    /** @deprecated No longer used internally. */
    protected abort = new SbbConnectedAbortController(this);

    /**
     * Set of radio buttons that belongs to the same group of `this`.
     * Assume them ordered in DOM order
     */
    protected associatedRadioButtons?: Set<SbbFormAssociatedRadioButtonElement>;
    private _radioButtonGroupsMap?: Map<string, Set<SbbFormAssociatedRadioButtonMixinType>>;
    private _didLoad: boolean = false;
    private _languageController = new SbbLanguageController(this);

    protected constructor() {
      super();
      /** @internal */
      this.internals.role = 'radio';
      this.addEventListener?.('keydown', (e) => this._handleArrowKeyDown(e));
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._connectToRegistry();
      this._synchronizeGroupState();
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._disconnectFromRegistry();
    }

    /**
     * Is called whenever the form is being reset.
     * @internal
     */
    public override formResetCallback(): void {
      this.checked = this.hasAttribute('checked');
    }

    /**
     *  Called when the browser is trying to restore element’s state to state in which case
     *  reason is "restore", or when the browser is trying to fulfill autofill on behalf of
     *  user in which case reason is "autocomplete".
     * @internal
     */
    public override formStateRestoreCallback(
      state: FormRestoreState | null,
      _reason: FormRestoreReason,
    ): void {
      if (state) {
        this.checked = state === this.value;
      }
    }

    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (changedProperties.has('disabled')) {
        this.updateFocusableRadios();
      }
    }

    protected override firstUpdated(changedProperties: PropertyValues<this>): void {
      super.firstUpdated(changedProperties);
      this._didLoad = true;
      this.updateFocusableRadios();
    }

    /**
     * Called on `value` change
     * If 'checked', update the value. Otherwise, do nothing.
     */
    protected override updateFormValue(): void {
      if (this.checked) {
        this.internals.setFormValue(this.value, this.value);
      } else {
        this.internals.setFormValue(null);
      }
    }

    protected override shouldValidate(name: PropertyKey | undefined): boolean {
      return super.shouldValidate(name) || name === 'checked' || name === 'required';
    }

    /**
     * Sets the validity of all associated radio buttons.
     * If any radio button is required, all associated are required as well.
     */
    protected override validate(): void {
      super.validate();
      if (!this.associatedRadioButtons) {
        return;
      }

      let required = false;
      let checked = false;
      for (const radio of this.associatedRadioButtons) {
        required ||= radio.required;
        checked ||= radio.checked;
      }

      if (required && !checked) {
        this.associatedRadioButtons.forEach((r) =>
          r.setValidityFlag(
            'valueMissing',
            i18nSelectionRequired[this._languageController.current],
          ),
        );
      } else {
        this.associatedRadioButtons.forEach((r) => r.removeValidityFlag('valueMissing'));
      }
    }

    /**
     * Only a single radio should be focusable in the group. Defined as:
     * - the checked radio;
     * - the first non-disabled radio in DOM order;
     */
    protected updateFocusableRadios(): void {
      if (!this._didLoad) {
        return;
      }
      const radios = this._interactableGroupedRadios();
      const checkedIndex = radios.findIndex((r) => r.checked && !r.disabled && !r.formDisabled);
      const focusableIndex =
        checkedIndex !== -1
          ? checkedIndex
          : radios.findIndex((r) => !r.disabled && !r.formDisabled); // Get the first focusable radio

      if (focusableIndex !== -1) {
        radios[focusableIndex].tabIndex = 0;
        radios.splice(focusableIndex, 1);
      }

      // Reset tabIndex on other radios
      radios.forEach((r) => r.removeAttribute('tabindex'));
    }

    protected async navigateByKeyboard(next: SbbFormAssociatedRadioButtonElement): Promise<void> {
      next.checked = true;
      this.emitChangeEvents();

      await next.updateComplete;
      next.focus();
    }

    protected emitChangeEvents(): void {
      // Manually dispatch events to simulate a user interaction
      this.dispatchEvent(
        new InputEvent('input', { bubbles: true, cancelable: true, composed: true }),
      );
      this.dispatchEvent(new Event('change', { bubbles: true }));
    }

    private _synchronizeGroupState(): void {
      if (this.checked) {
        this._deselectGroupedRadios();
      }
      this.updateFocusableRadios();
    }

    /**
     * Add `this` to the radioButton registry
     */
    private _connectToRegistry(): void {
      if (!this.name || isServer) {
        return;
      }

      const root = this.form ?? this.getRootNode();
      this._radioButtonGroupsMap = radioButtonRegistry.get(root);

      // Initialize the 'root' map entry
      if (!this._radioButtonGroupsMap) {
        this._radioButtonGroupsMap = new Map();
        radioButtonRegistry.set(root, this._radioButtonGroupsMap);
      }

      this.associatedRadioButtons = this._radioButtonGroupsMap.get(
        this.name,
      ) as unknown as Set<SbbFormAssociatedRadioButtonElement>;

      // Initialize the group set
      if (!this.associatedRadioButtons) {
        this.associatedRadioButtons = new Set();
        this._radioButtonGroupsMap.set(
          this.name,
          this.associatedRadioButtons as unknown as Set<SbbFormAssociatedRadioButtonMixinType>,
        );
      }

      // Insert the new radio into the set and sort following the DOM order.
      // Since the order of a 'Set' is the insert order, we have to empty it and re-insert radios in order
      const entries = Array.from(this.associatedRadioButtons);
      this.associatedRadioButtons.clear();

      // Find `this` position and insert it
      const index = entries.findIndex(
        (r) => this.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
      if (index !== -1) {
        entries.splice(index, 0, this);
      } else {
        entries.push(this);
      }

      // Repopulate the Set
      entries.forEach((r) => this.associatedRadioButtons!.add(r));

      this.validate();
    }

    /**
     * Remove `this` from the radioButton registry and, if the group is empty, delete the entry from the groups Map
     */
    private _disconnectFromRegistry(): void {
      this.associatedRadioButtons?.delete(this);

      if (this.associatedRadioButtons?.size === 0) {
        this._radioButtonGroupsMap?.delete(this.name);
      } else {
        this.validate();
      }

      this.associatedRadioButtons = undefined;
      this._radioButtonGroupsMap = undefined;
    }

    /**
     * Return a list of 'interactable' grouped radios, ordered in DOM order
     */
    private _interactableGroupedRadios(): SbbFormAssociatedRadioButtonElement[] {
      return Array.from(this.associatedRadioButtons ?? []).filter((el) =>
        interactivityChecker.isVisible(el),
      );
    }

    /**
     * Deselect other radio of the same group
     */
    private _deselectGroupedRadios(): void {
      Array.from(this.associatedRadioButtons ?? [])
        .filter((r) => r !== this)
        .forEach((r) => (r.checked = false));
    }

    private async _handleArrowKeyDown(evt: KeyboardEvent): Promise<void> {
      if (!isArrowKeyPressed(evt)) {
        return;
      }
      evt.preventDefault();

      const enabledRadios = this._interactableGroupedRadios().filter(
        (r) => !r.disabled && !r.formDisabled,
      );
      const current: number = enabledRadios.indexOf(this);
      const nextIndex: number = getNextElementIndex(evt, current, enabledRadios.length);

      await this.navigateByKeyboard(enabledRadios[nextIndex]);
    }
  }

  return SbbFormAssociatedRadioButtonElement as unknown as Constructor<SbbFormAssociatedRadioButtonMixinType> &
    T;
};
