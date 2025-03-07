import { html, isServer, type LitElement } from 'lit';
import { eventOptions, property } from 'lit/decorators.js';

import { sbbInputModalityDetector } from '../a11y.js';
import { SbbLanguageController } from '../controllers.js';
import { isFirefox, isWebkit } from '../dom.js';
import { i18nInputRequired } from '../i18n.js';

import type { Constructor } from './constructor.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbFormAssociatedMixin,
  type SbbFormAssociatedMixinType,
} from './form-associated-mixin.js';
import { SbbRequiredMixin, type SbbRequiredMixinType } from './required-mixin.js';

export declare abstract class SbbFormAssociatedInputMixinType
  extends SbbFormAssociatedMixinType
  implements Partial<SbbRequiredMixinType>
{
  public set disabled(value: boolean);
  public get disabled(): boolean;

  public set readOnly(value: boolean);
  public get readOnly(): boolean;

  public set required(value: boolean);
  public get required(): boolean;

  public set placeholder(value: string);
  public get placeholder(): string;

  public formResetCallback(): void;
  public formStateRestoreCallback(state: FormRestoreState | null, reason: FormRestoreReason): void;

  protected withUserInteraction?(): void;
  protected updateFormValue(): void;
  protected language: SbbLanguageController;
}

/**
 * The SbbFormAssociatedInputMixin enables native form support for text input controls.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedInputMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbFormAssociatedInputMixinType> & T => {
  abstract class SbbFormAssociatedInputElement
    extends SbbRequiredMixin(SbbFormAssociatedMixin(superClass))
    implements Partial<SbbFormAssociatedInputMixinType>
  {
    /**
     * The native text input changes the value property when the value attribute is
     * changed under the condition that no input event has occured since creation
     * or the last form reset.
     */
    private _interacted = false;
    /**
     * An element with contenteditable will not emit a change event. To achieve parity
     * with a native text input, we need to track whether a change event should be
     * emitted.
     */
    private _shouldEmitChange = false;
    /**
     * A native text input attempts to submit the form when pressing Enter.
     * This can be prevented by calling preventDefault on the keydown event.
     * We track whether to request submit, which should occur before the keyup
     * event.
     */
    private _shouldTriggerSubmit = false;

    protected language = new SbbLanguageController(this);

    /**
     * Form type of element.
     * @default 'text'
     */
    public override get type(): string {
      return 'text';
    }

    /**
     * The text value of the input element.
     */
    public override set value(value: string) {
      super.value = this._cleanText(value);
      if (this.hasUpdated) {
        this.innerHTML = super.value;
      }
    }
    public override get value(): string {
      return super.value ?? '';
    }

    /**
     * Whether the component is readonly.
     * @attr readonly
     * @default false
     */
    @property({ type: Boolean })
    public set readOnly(value: boolean) {
      this.toggleAttribute('readonly', !!value);
      this.internals.ariaReadOnly = value ? 'true' : null;
      this._updateContenteditable();
    }
    public get readOnly(): boolean {
      return this.hasAttribute('readonly');
    }

    /**
     * Whether the component is disabled.
     * @attr disabled
     * @default false
     */
    @property({ type: Boolean })
    public set disabled(value: boolean) {
      this.toggleAttribute('disabled', !!value);
      this.internals.ariaDisabled = value ? 'true' : null;
      this._updateContenteditable();
    }
    public get disabled(): boolean {
      return this.hasAttribute('disabled');
    }

    @property({ attribute: false })
    public set placeholder(value: string) {
      if (value) {
        this.setAttribute('placeholder', value);
      } else {
        this.removeAttribute('placeholder');
      }
      this.internals.ariaPlaceholder = value ? value : null;
    }
    public get placeholder(): string {
      return this.getAttribute('placeholder') ?? '';
    }

    protected constructor() {
      super();
      /** @internal */
      this.internals.role = 'textbox';
      // We primarily use capture event listeners, as we want
      // our listeners to occur before consumer event listeners.
      this.addEventListener?.(
        'input',
        () => {
          super.value = this._cleanText(this.textContent ?? '');
          this._interacted = true;
          this._shouldEmitChange = true;
        },
        { capture: true },
      );
      this.addEventListener?.('change', () => (this._shouldEmitChange = false), { capture: true });
      this.addEventListener?.(
        'keydown',
        (event) => {
          // We prevent recursive events by checking the original event for isTrusted
          // which is false for manually dispatched events (which we dispatch below).
          if ((event.key === 'Enter' || event.key === '\n') && event.isTrusted) {
            event.preventDefault();
            event.stopImmediatePropagation();
            this._shouldTriggerSubmit = this.dispatchEvent(new KeyboardEvent('keydown', event));
          } else if (
            isWebkit &&
            this.value &&
            (event.key === 'Backspace' || event.key === 'Delete') &&
            event.isTrusted
          ) {
            // In Webkit pressing Backspace or Delete completely removes all the content
            // if contenteditable is set on a web component host.
            // We have to replicate the normal delete behavior.
            event.preventDefault();
            event.stopImmediatePropagation();

            if (!this.dispatchEvent(new KeyboardEvent('keydown', event))) {
              return;
            }

            const selectedRange = window.getSelection()?.getRangeAt(0);
            if (!selectedRange) {
              return;
            }

            if (selectedRange.startOffset !== selectedRange.endOffset) {
              // If a text range is selected, then delete this range
              selectedRange.deleteContents();
              this._dispatchInputEvent();
            } else if (event.key === 'Backspace' && selectedRange.startOffset > 0) {
              // When pressing Backspace, we select the previous character from
              // the current cursor position and delete it.
              selectedRange.setStart(selectedRange.startContainer, selectedRange.startOffset - 1);
              selectedRange.deleteContents();
              this._dispatchInputEvent();
            } else if (event.key === 'Delete' && selectedRange.endOffset < this.value.length) {
              // When pressing Delete, we select the next character from
              // the current cursor position and delete it.
              selectedRange.setEnd(selectedRange.endContainer, selectedRange.endOffset + 1);
              selectedRange.deleteContents();
              this._dispatchInputEvent();
            }
          }
        },
        { capture: true },
      );
      this.addEventListener?.(
        'keyup',
        (event) => {
          if (event.key === 'Enter' || event.key === '\n') {
            this._emitChangeIfNecessary();
            if (this._shouldTriggerSubmit) {
              this._shouldTriggerSubmit = false;
              this.form?.requestSubmit();
            }
          }
        },
        { capture: true },
      );
      // contenteditable allows pasting rich content into its host.
      // We prevent this by listening to the paste event and
      // extracting the plain text from the pasted content
      // and inserting it into the selected range (cursor position
      // or selection).
      this.addEventListener?.('paste', (e) => {
        e.preventDefault();
        const text = this._cleanText(e.clipboardData?.getData('text/plain') ?? '');
        const selectedRange = window.getSelection()?.getRangeAt(0);
        if (!selectedRange || !text) {
          return;
        }

        selectedRange.deleteContents();
        selectedRange.insertNode(document.createTextNode(text));
        selectedRange.setStart(selectedRange.endContainer, selectedRange.endOffset);
        this._dispatchInputEvent();
      });
      // When focusing a text input via keyboard, the text content should be selected.
      this.addEventListener?.('focus', () => {
        if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
          window.getSelection()?.selectAllChildren(this);
        }
      });
      // On blur the native text input scrolls the text to the start of the text.
      // We mimick that by resetting the scroll position.
      // We also unset any selection to align with the native text input.
      this.addEventListener?.(
        'blur',
        () => {
          window.getSelection()?.removeAllRanges();
          this._emitChangeIfNecessary();
          this.scrollLeft = 0;
        },
        { capture: true },
      );
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this.internals.ariaMultiLine = 'false';
      this._updateContenteditable();

      // We want to replace any content by just the text content.
      this.innerHTML = this.value;
    }

    public override focus(options?: FocusOptions): void {
      super.focus(options);
      // By default, when calling focus on an input element, the cursor is placed
      // at the end of the input text. However, with contenteditable, the cursor
      // is placed at the beginning, so we move it to the end, if that is the case.
      if (!isServer && !this.disabled && !this.readOnly && this.value) {
        const selection = window.getSelection();
        if (!selection) {
          return;
        }
        let range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        if (range && range.startOffset !== 0) {
          return;
        }

        range = document.createRange();
        range.setStart(this.firstChild!, this.textContent!.length);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    public override attributeChangedCallback(
      name: string,
      old: string | null,
      value: string | null,
    ): void {
      if (name !== 'value' || !this._interacted) {
        super.attributeChangedCallback(name, old, value);
      }
    }

    /**
     * Is called whenever the form is being reset.
     *
     * @internal
     */
    public override formResetCallback(): void {
      this._interacted = false;
      this.value = this.getAttribute('value') ?? '';
    }

    /**
     *  Called when the browser is trying to restore element’s state to state in which case
     *  reason is "restore", or when the browser is trying to fulfill autofill on behalf of
     *  user in which case reason is "autocomplete".
     *  In the case of "restore", state is a string, File, or FormData object
     *  previously set as the second argument to setFormValue.
     *
     * @internal
     */
    public override formStateRestoreCallback(
      state: FormRestoreState | null,
      _reason: FormRestoreReason,
    ): void {
      if (state && typeof state === 'string') {
        this.value = state;
      }
    }

    protected override updateFormValue(): void {
      this.internals.setFormValue(this.value, this.value);
    }

    protected override shouldValidate(name: PropertyKey | undefined): boolean {
      return super.shouldValidate(name) || name === 'value' || name === 'required';
    }

    protected override validate(): void {
      super.validate();
      if (this.required && !this.value) {
        this.setValidityFlag('valueMissing', i18nInputRequired[this.language.current]);
      } else {
        this.removeValidityFlag('valueMissing');
      }
    }

    private _cleanText(value: string): string {
      // The native text input removes all newline characters if passed to the value property
      return `${value}`.replace(/[\n\r]+/g, '');
    }

    private _dispatchInputEvent(): void {
      this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    }

    @eventOptions({ passive: true })
    private _cleanChildren(): void {
      if (this.childElementCount) {
        for (const element of this.children) {
          element.remove();
        }
      }
    }

    private _updateContenteditable(): void {
      if (!isServer && this.isConnected) {
        // Firefox does not yet support plaintext-only. Once this is available
        // for our supported browser range, we can switch to it fully.
        const value =
          this.disabled || this.readOnly ? 'false' : isFirefox ? 'true' : 'plaintext-only';
        this.setAttribute('contenteditable', value);
        // In the readonly case, we disable contenteditable, but it still
        // needs to be focusable. We achieve this by setting tabindex in that case.
        if (this.readOnly) {
          this.setAttribute('tabindex', '0');
        } else {
          this.removeAttribute('tabindex');
        }
      }
    }

    private _emitChangeIfNecessary(): void {
      if (this._shouldEmitChange) {
        this._shouldEmitChange = false;
        this.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    protected override render(): unknown {
      return html`<slot @slotchange=${this._cleanChildren}></slot>`;
    }
  }

  return SbbFormAssociatedInputElement as unknown as Constructor<SbbFormAssociatedInputMixinType> &
    T;
};
