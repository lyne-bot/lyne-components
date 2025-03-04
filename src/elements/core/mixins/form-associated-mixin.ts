/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { LitElement, PropertyDeclaration, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';

import { isWebkit } from '../dom.js';

import type { AbstractConstructor } from './constructor.js';

declare global {
  /**
   * Defines custom valididty state properties.
   */
  interface CustomValidityState {}
  interface ValidityState extends CustomValidityState {}
  interface ValidityStateFlags extends Partial<CustomValidityState> {}
}

const validityKeys: Required<Omit<ValidityStateFlags, keyof CustomValidityState>> = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
};
// We need ValidityState in the global context, as we check the prototype for
// extensions. In environments where that is not the case (e.g. Node.js) we
// patch it with a minimal shim.
if (typeof ValidityState === 'undefined') {
  const validityClass = class ValidityState {
    public get valid(): boolean {
      return true;
    }
    private constructor() {
      throw new TypeError('Illegal constructor');
    }
  };
  Object.entries(validityKeys).forEach(([key, value]) =>
    Object.assign(validityClass.prototype, {
      get [key](): boolean {
        return value;
      },
    }),
  );
  globalThis.ValidityState = validityClass as unknown as typeof ValidityState;
}

export declare abstract class SbbFormAssociatedMixinType<V = string> {
  public get form(): HTMLFormElement | null;
  public accessor name: string;
  public get type(): string;
  public accessor value: V | null;

  public get validity(): ValidityState;
  public get validationMessage(): string;
  public get willValidate(): boolean;

  protected formDisabled: boolean;
  protected readonly internals: ElementInternals;

  public checkValidity(): boolean;
  public reportValidity(): boolean;
  public setCustomValidity(message: string): void;

  public formAssociatedCallback?(form: HTMLFormElement | null): void;
  public formDisabledCallback(disabled: boolean): void;
  public abstract formResetCallback(): void;
  public abstract formStateRestoreCallback(
    state: FormRestoreState | null,
    reason: FormRestoreReason,
  ): void;

  protected abstract updateFormValue(): void;
  protected setValidityFlag<T extends keyof ValidityStateFlags>(
    flag: T,
    message: string,
    flagValue?: ValidityStateFlags[T],
  ): void;
  protected removeValidityFlag<T extends keyof ValidityStateFlags>(flag: T): void;
  protected validate(): void;
  protected shouldValidate(name: PropertyKey | undefined): boolean;
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
     * Returns the form owner of this element.
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

      // For `FormData` values, we have to manually update the fieldName key
      this.updateFormValue();
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
     * Returns the ValidityState object for this element.
     */
    public get validity(): ValidityState {
      return this.internals.validity;
    }

    /**
     * Returns the current error message, if available, which corresponds
     * to the current validation state.
     * Please note that only one message is returned at a time (e.g. if
     * multiple validity states are invalid, only the chronologically first one
     * is returned until it is fixed, at which point the next message might be
     * returned, if it is still applicable). Also a custom validity message
     * (see below) has precedence over native validation messages.
     */
    public get validationMessage(): string {
      return this.internals.validationMessage;
    }

    /**
     * Returns true if this element will be validated
     * when the form is submitted; false otherwise.
     */
    public get willValidate(): boolean {
      return this.internals.willValidate;
    }

    /** @internal */
    protected readonly internals: ElementInternals = this.attachInternals();

    private _validityStates = new Map<
      keyof ValidityStateFlags,
      { flagValue: unknown; message: string }
    >();

    /** Whenever a surrounding form or fieldset is changing its disabled state. */
    @state() protected accessor formDisabled: boolean = false;

    public constructor(...args: any[]) {
      super(...args);
      // We want to prevent the native browser validation message popover
      // to be shown. This also prevents a bug in WebKit, which would not
      // allow host as the validity anchor: https://bugs.webkit.org/show_bug.cgi?id=269832
      this.addEventListener?.('invalid', (e) => e.preventDefault());
    }

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
     * Returns true if this element has no validity problems; false otherwise.
     * Fires an invalid event at the element in the latter case.
     */
    public checkValidity(): boolean {
      return this.internals.checkValidity();
    }

    /**
     * Returns true if this element has no validity problems; otherwise,
     * returns false, fires an invalid event at the element,
     * and (if the event isn't canceled) reports the problem to the user.
     */
    public reportValidity(): boolean {
      return this.internals.reportValidity();
    }

    /**
     * Sets the custom validity message for this element. Use the empty string
     * to indicate that the element does not have a custom validity error.
     */
    public setCustomValidity(message: string): void {
      if (message) {
        this.setValidityFlag('customError', message);
      } else {
        this.removeValidityFlag('customError');
      }
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

    public override requestUpdate(
      name?: PropertyKey,
      oldValue?: unknown,
      options?: PropertyDeclaration,
    ): void {
      super.requestUpdate(name, oldValue, options);
      if (this.hasUpdated && this.shouldValidate(name)) {
        this.validate();
      }
    }

    protected override firstUpdated(changedProperties: PropertyValues<this>): void {
      super.firstUpdated(changedProperties);
      this.validate();
    }

    /**
     * Should be called when form value is changed.
     * Adapts and sets the formValue in the supported format (string | FormData | File | null)
     * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setFormValue
     */
    protected abstract updateFormValue(): void;

    /**
     * Marks this element as suffering from the constraint indicated by the
     * flag argument and associates the given message to it.
     * Note that only one message is displayed at a time and custom messages by
     * consumers are always displayed before internal messages and internal
     * messages are displayed in the order they were added.
     * To set/define custom validity state flags, you need to extend the
     * ValidityState prototype (and the CustomValidityState interface).
     *
     * @example
     *
     *   // The type of the custom validity state does not need to be boolean.
     *   Object.assign(ValidityState.prototype, {
     *     get myError(): boolean {
     *       return false;
     *     },
     *   });
     *
     *   declare global {
     *     interface CustomValidityState {
     *       myError: boolean;
     *     }
     *   }
     */
    protected setValidityFlag<T extends keyof ValidityStateFlags>(
      flag: T,
      message: string,
      flagValue?: ValidityStateFlags[T],
    ): void {
      flagValue ??= true;
      const validityState = this._validityStates.get(flag);
      if (
        !validityState ||
        validityState.message !== message ||
        validityState.flagValue !== flagValue
      ) {
        this._validityStates.set(flag, { flagValue, message });
        this._setInternalValidity();
      }
    }

    /** Removes the validity state flag entry and updates validity state. */
    protected removeValidityFlag<T extends keyof ValidityStateFlags>(flag: T): void {
      if (this._validityStates.has(flag)) {
        this._validityStates.delete(flag);
        this._setInternalValidity();
      }
    }

    /** To be called whenever the current element needs to be validated. */
    protected validate(): void {}

    /** Whether validation should be run on a property change with the given name. */
    protected shouldValidate(name: PropertyKey | undefined): boolean {
      return !name;
    }

    private _setInternalValidity(): void {
      let outputMessage = this._validityStates.get('customError')?.message;
      const flags: ValidityStateFlags = {};
      this._validityStates.forEach(({ flagValue, message }, flag) => {
        flags[flag] = flagValue as any;
        outputMessage ||= message;
      });

      const customFlags = Object.keys(ValidityState.prototype).filter(
        (f) => !(f in validityKeys) && f !== 'valid',
      );
      for (const flag of customFlags) {
        const value = flag in flags ? flags[flag as keyof ValidityStateFlags] : false;
        Object.defineProperty(this.internals.validity, flag, { value, configurable: true });
        if (value) {
          // If any custom errors are provided, we need to set customError to true,
          // as this is the only custom error property browsers accept.
          flags.customError = true;
        }
      }

      this.internals.setValidity(flags, outputMessage);

      // WebKit seems to always set customError to true, if any error is active.
      // Due to this we patch the customError value manually.
      if (isWebkit) {
        Object.defineProperty(this.internals.validity, 'customError', {
          value: this._validityStates.has('customError') || !!flags.customError,
          configurable: true,
        });
      }
    }
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
