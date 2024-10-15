import type { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import type { AbstractConstructor } from './constructor.js';

export declare abstract class SbbFormAssociatedMixinType<V = string> {
  public get form(): HTMLFormElement | null;
  public get name(): string;
  public set name(value: string);
  public get type(): string;
  public get value(): V | null;
  public set value(value: V | null);

  public get validity(): ValidityState;
  public get validationMessage(): string;
  public get willValidate(): boolean;

  protected formDisabled: boolean;
  protected readonly internals: ElementInternals;

  public checkValidity(): boolean;
  public reportValidity(): boolean;

  public formAssociatedCallback?(form: HTMLFormElement | null): void;
  public formDisabledCallback(disabled: boolean): void;
  public abstract formResetCallback(): void;
  public abstract formStateRestoreCallback(
    state: FormRestoreState | null,
    reason: FormRestoreReason,
  ): void;

  protected abstract updateFormValue(): void;
}

/**
 * The FormAssociatedMixin enables native form support for custom controls.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedMixin = <T extends AbstractConstructor<LitElement>, V = string>(
  superClass: T,
): AbstractConstructor<SbbFormAssociatedMixinType<V>> & T => {
  abstract class SbbFormAssociatedElement
    extends superClass
    implements Partial<SbbFormAssociatedMixinType<V>>
  {
    public static formAssociated = true;

    /**
     * Returns the form owner of the internals of the target element.
     */
    public get form(): HTMLFormElement | null {
      return this.internals.form;
    }

    /**
     * Name of the form element. Will be read from name attribute.
     *
     * @description Developer note: In this case updating the attribute must be synchronous.
     * Due to this it is implemented as a getter/setter and the attributeChangedCallback() handles the diff check.
     */
    @property()
    public set name(name: string) {
      this.setAttribute('name', `${name}`);
    }
    public get name(): string {
      return this.getAttribute('name') ?? '';
    }

    /** @internal */
    public get type(): string {
      return this.localName;
    }

    /** Value of the form element. */
    @property()
    public set value(value: V | null) {
      this._value = value;
      this.updateFormValue();
    }
    public get value(): V | null {
      return this._value;
    }
    private _value: V | null = null;

    /**
     * Returns the ValidityState object for internals target element.
     *
     * @internal
     */
    public get validity(): ValidityState {
      return this.internals.validity;
    }

    /**
     * Returns the error message that would be shown to the user
     * if internals target element was to be checked for validity.
     *
     * @internal
     */
    public get validationMessage(): string {
      return this.internals.validationMessage;
    }

    /**
     * Returns true if internals target element will be validated
     * when the form is submitted; false otherwise.
     *
     * @internal
     */
    public get willValidate(): boolean {
      return this.internals.willValidate;
    }

    /** @internal */
    protected readonly internals: ElementInternals = this.attachInternals();

    /** Whenever a surrounding form or fieldset is changing its disabled state. */
    @state() protected formDisabled: boolean = false;

    public override attributeChangedCallback(
      name: string,
      old: string | null,
      value: string | null,
    ): void {
      if (name !== 'name' || old !== value) {
        super.attributeChangedCallback(name, old, value);
      }
    }

    /**
     * Returns true if internals target element has no validity problems; false otherwise.
     * Fires an invalid event at the element in the latter case.
     *
     * @internal
     */
    public checkValidity(): boolean {
      return this.internals.checkValidity();
    }

    /**
     * Returns true if internals target element has no validity problems; otherwise,
     * returns false, fires an invalid event at the element,
     * and (if the event isn't canceled) reports the problem to the user.
     *
     * @internal
     */
    public reportValidity(): boolean {
      return this.internals.reportValidity();
    }

    /**
     * Called when the associated form element changes.
     * ElementInternals.form returns the associated from element.
     *
     * @internal
     */
    public formAssociatedCallback?(form: HTMLFormElement | null): void;

    /**
     * Is called whenever a surrounding form / fieldset changes disabled state.
     * @param disabled
     *
     * @internal
     */
    public formDisabledCallback(disabled: boolean): void {
      // This callback is triggered if the disabled property changes or the disabled attribute of a fieldset or form changes.
      // We need to postpone the assignment, otherwise it interferes with disabled status setting
      // and leads to a wrong state (e.g. embedded sbb-visual-checkbox).
      Promise.resolve().then(() => {
        this.formDisabled = disabled;
      });
    }

    /**
     * Is called whenever the form is being reset.
     *
     * @internal
     */
    public abstract formResetCallback(): void;

    /**
     *  Called when the browser is trying to restore element’s state to state in which case
     *  reason is “restore”, or when the browser is trying to fulfill autofill on behalf of
     *  user in which case reason is “autocomplete”.
     *  In the case of “restore”, state is a string, File, or FormData object
     *  previously set as the second argument to setFormValue.
     *
     * @internal
     */
    public abstract formStateRestoreCallback(
      state: FormRestoreState | null,
      reason: FormRestoreReason,
    ): void;

    /**
     * Should be called when form value is changed.
     * Adapts and sets the formValue in the supported format (string | FormData | File | null)
     * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setFormValue
     */
    protected abstract updateFormValue(): void;
  }
  return SbbFormAssociatedElement as unknown as AbstractConstructor<SbbFormAssociatedMixinType<V>> &
    T;
};

/**
 * A value to be restored for a component's form value. If a component's form
 * state is a `FormData` object, its entry list of name and values will be
 * provided.
 */
export type FormRestoreState = File | string | [string, FormDataEntryValue][];

/**
 * The reason a form component is being restored for, either `'restore'` for
 * browser restoration or `'autocomplete'` for restoring user values.
 */
export type FormRestoreReason = 'restore' | 'autocomplete';
