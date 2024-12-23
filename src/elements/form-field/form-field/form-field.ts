import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { SbbInputModality } from '../../core/a11y.js';
import { sbbInputModalityDetector } from '../../core/a11y.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { forceType, slotState } from '../../core/decorators.js';
import { isFirefox, isLean, setOrRemoveAttribute } from '../../core/dom.js';
import { i18nOptional } from '../../core/i18n.js';
import { SbbHydrationMixin, SbbNegativeMixin } from '../../core/mixins.js';
import type { SbbSelectElement } from '../../select.js';

import style from './form-field.scss?lit&inline';

import '../../icon.js';

let nextId = 0;
let nextFormFieldErrorId = 0;

const patchedInputs = new WeakMap<HTMLInputElement, PropertyDescriptor>();

/**
 * It wraps an input element adding label, errors, icon, etc.
 *
 * @slot - Use this slot to render an input/select or a supported non-native element.
 * @slot label - Use this slot to render a label.
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 * @slot error - Use this slot to render an error.
 */
export
@customElement('sbb-form-field')
@slotState()
class SbbFormFieldElement extends SbbNegativeMixin(SbbHydrationMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;

  private readonly _supportedNativeInputElements = ['input', 'select', 'textarea'];
  // List of supported element selectors in unnamed slot
  private readonly _supportedInputElements = [
    ...this._supportedNativeInputElements,
    'sbb-select',
    'sbb-slider',
  ];
  // List of elements that should not focus input on click
  private readonly _excludedFocusElements = ['button', 'sbb-popover', 'sbb-option'];

  private readonly _floatingLabelSupportedInputElements = [
    'input',
    'select',
    'sbb-select',
    'textarea',
  ];

  private readonly _floatingLabelSupportedInputTypes = [
    'email',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'url',
  ];

  /**
   * Whether to reserve space for an error message.
   * `none` does not reserve any space.
   * `reserve` does reserve one row for an error message.
   */
  @property({ attribute: 'error-space', reflect: true })
  public accessor errorSpace: 'none' | 'reserve' = 'none';

  /** Indicates whether the input is optional. */
  @forceType()
  @property({ type: Boolean })
  public accessor optional: boolean = false;

  /**
   * Size variant, either l, m or s.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 'l' | 'm' | 's' = isLean() ? 's' : 'm';

  /** Whether to display the form field without a border. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor borderless: boolean = false;

  /** Defines the width of the component:
   * - `default`: the component has defined width and min-width;
   * - `collapse`: the component adapts itself to its inner input content. */
  @property({ reflect: true }) public accessor width: 'default' | 'collapse' = 'default';

  /** Whether to visually hide the label. If hidden, screen readers will still read it. */
  @forceType()
  @property({ attribute: 'hidden-label', reflect: true, type: Boolean })
  public accessor hiddenLabel: boolean = false;

  /** Whether the label should float. If activated, the placeholder of the input is hidden. */
  @forceType()
  @property({ attribute: 'floating-label', reflect: true, type: Boolean })
  public accessor floatingLabel: boolean = false;

  /** It is used internally to get the `error` slot. */
  @state() private accessor _errorElements: Element[] = [];

  /** Original aria-describedby value of the slotted input element. */
  private _originalInputAriaDescribedby?: string | null;

  /** Reference to the slotted input element. */
  @state() private accessor _input!: HTMLInputElement | HTMLSelectElement | HTMLElement | undefined;

  /** Reference to the slotted label elements. */
  @state() private accessor _label!: HTMLLabelElement;

  /** Returns the input element. */
  public get inputElement(): HTMLInputElement | HTMLSelectElement | HTMLElement | undefined {
    return this._input;
  }

  private _language = new SbbLanguageController(this);

  /**
   * Listens to the changes on `readonly` and `disabled` attributes of `<input>`.
   */
  private _formFieldAttributeObserver = !isServer
    ? new MutationObserver((mutations: MutationRecord[]) => {
        if (mutations.some((m) => m.type === 'attributes')) {
          this._readInputState();
        }
      })
    : null;

  private _inputAbortController = new AbortController();

  public override connectedCallback(): void {
    super.connectedCallback();
    this._registerInputListener();
    this._syncNegative();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative')) {
      this._syncNegative();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._formFieldAttributeObserver?.disconnect();
    this._inputAbortController.abort();
    if (this._input?.localName === 'input') {
      this._unpatchInputValue();
    }
  }

  private _handleWrapperClick(event: Event): void {
    if (this._isButtonOrPopup(event)) {
      return;
    }

    if (
      this._input?.localName === 'sbb-select' &&
      (event.target as HTMLElement).localName !== 'sbb-select'
    ) {
      this._input.click();
      this._input.focus();
    } else if ((event.target as Element).localName !== 'label') {
      this._input?.focus();
    }
  }

  private _isButtonOrPopup(event: Event): boolean {
    return event
      .composedPath()
      .some(
        (el) =>
          (el instanceof window.HTMLElement && el.getAttribute('tabindex') === '0') ||
          this._excludedFocusElements.includes((el as HTMLElement).localName),
      );
  }

  private _onSlotLabelChange(): void {
    const labels = Array.from(this.querySelectorAll('label'));
    if (import.meta.env.DEV && labels.length > 1) {
      console.warn(
        `Detected more than one label in sbb-form-field#${this.id}. Only one label is supported.`,
      );
    }
    this._label = labels[0];
    this._syncLabelInputReferences();
  }

  /**
   * It is used internally to assign the attributes of `<input>` to `_id` and `_input` and to observe the native readonly and disabled attributes.
   */
  private _onSlotInputChange(event: Event): void {
    const newInput = (event.target as HTMLSlotElement)
      .assignedElements()
      .find((e): e is HTMLElement => this._supportedInputElements.includes(e.localName));
    this._assignSlots();

    if (this._input && this._input.localName === 'input' && newInput !== this._input) {
      this._unpatchInputValue();
    }

    this._input = newInput;

    if (!this._input) {
      return;
    }

    this._originalInputAriaDescribedby = this._input.getAttribute('aria-describedby');
    this._applyAriaDescribedby();
    this._readInputState();
    this._registerInputListener();

    if (this._input.localName === 'textarea') {
      this._input.setAttribute('rows', this._input.getAttribute('rows') || '3');
    }

    this._formFieldAttributeObserver?.disconnect();
    this._formFieldAttributeObserver?.observe(this._input, {
      attributes: true,
      attributeFilter: ['readonly', 'disabled', 'class', 'data-sbb-invalid', 'data-state'],
    });
    this.setAttribute('data-input-type', this._input.localName);
    this._syncLabelInputReferences();
  }

  private _syncLabelInputReferences(): void {
    if (!this._input || !this._label) {
      return;
    }

    if (this._supportedNativeInputElements.includes(this._input.localName)) {
      // For native input elements we use the `for` attribute on the label to reference the input
      // via id reference.
      if (!this._input.id) {
        this._input.id = `sbb-form-field-input-${nextId++}`;
      }

      this._label.htmlFor = this._input.id;
    } else {
      // For non-native input elements, that do not support references via the label for attribute,
      // we use aria-labelledby on the input element to reference the label element via id.
      if (!this._label.id) {
        this._label.id = `sbb-form-field-label-${nextId++}`;
      }
      const labelledby =
        this._input
          .getAttribute('aria-labelledby')
          ?.split(' ')
          .filter((l) => !!l && l !== this._label!.id) ?? [];
      this._input.setAttribute('aria-labelledby', [...labelledby, this._label.id].join(' '));
    }
  }

  private _registerInputListener(): void {
    if (!this._input) {
      return;
    }
    this._inputAbortController.abort();
    this._inputAbortController = new AbortController();
    this._checkAndUpdateInputEmpty();

    // Timeout needed to have value updated
    this._getInputForm()?.addEventListener('reset', () => setTimeout(() => this.reset()), {
      signal: this._inputAbortController.signal,
    });

    this._input.addEventListener('input', () => this._checkAndUpdateInputEmpty(), {
      signal: this._inputAbortController.signal,
    });

    this._input.addEventListener('blur', () => this._checkAndUpdateInputEmpty(), {
      signal: this._inputAbortController.signal,
    });

    let inputFocusElement = this._input;

    if (this._input.localName === 'input') {
      this._patchInputValue();
    } else if (this._input.localName === 'sbb-select') {
      this._input.addEventListener('stateChange', () => this._checkAndUpdateInputEmpty(), {
        signal: this._inputAbortController.signal,
      });

      const selectInput = this._input as SbbSelectElement;
      inputFocusElement = selectInput.inputElement;

      // If inputElement is not yet ready, try a second time after updating.
      if (!inputFocusElement) {
        const controller = {
          hostUpdated: () => {
            selectInput.removeController(controller);
            this._registerInputListener();
          },
        };

        selectInput.addController(controller);
      }
    }

    inputFocusElement?.addEventListener(
      'focusin',
      () => {
        this.toggleAttribute('data-input-focused', true);
        this.setAttribute(
          'data-focus-origin',
          (sbbInputModalityDetector.mostRecentModality as SbbInputModality) ?? '',
        );
      },
      {
        signal: this._inputAbortController.signal,
      },
    );

    inputFocusElement?.addEventListener(
      'focusout',
      () =>
        ['data-focus-origin', 'data-input-focused'].forEach((name) => this.removeAttribute(name)),
      {
        signal: this._inputAbortController.signal,
      },
    );
  }

  private _getInputForm(): HTMLFormElement | null | undefined {
    if (this._input instanceof HTMLInputElement || this._input instanceof HTMLSelectElement) {
      return this._input.form;
    }
    return this._input?.closest('form');
  }

  // We need to patch the value property of the HTMLInputElement in order
  // to be able to reset the floating label in the empty state.
  private _patchInputValue(): void {
    const inputElement = this._input as HTMLInputElement;
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(inputElement),
      'value',
    );

    if (!originalDescriptor || !originalDescriptor.set || !originalDescriptor.get) {
      return;
    }

    patchedInputs.set(inputElement, originalDescriptor);

    const { get: getter, set: setter } = originalDescriptor;
    const checkAndUpdateInputEmpty = (): void => this._checkAndUpdateInputEmpty();

    Object.defineProperty(inputElement, 'value', {
      ...originalDescriptor,
      get() {
        return getter.call(this);
      },
      set(newValue) {
        setter.call(this, newValue);
        checkAndUpdateInputEmpty();
      },
    });
  }

  private _unpatchInputValue(): void {
    const inputElement = this._input as HTMLInputElement;
    const originalDescriptor = patchedInputs.get(inputElement);
    if (originalDescriptor) {
      Object.defineProperty(inputElement, 'value', originalDescriptor);
      patchedInputs.delete(inputElement);
    }
  }

  private _checkAndUpdateInputEmpty(): void {
    this.toggleAttribute(
      'data-input-empty',
      this._floatingLabelSupportedInputElements.includes(this._input?.localName as string) &&
        this._isInputEmpty(),
    );
  }

  private _isInputEmpty(): boolean {
    if (this._input instanceof HTMLInputElement) {
      return (
        this._floatingLabelSupportedInputTypes.includes(this._input.type) &&
        this._isInputValueEmpty()
      );
    } else if (this._input instanceof HTMLSelectElement) {
      return this._input.selectedOptions?.item(0)?.label?.trim() === '';
    } else if (this._input?.localName === 'sbb-select') {
      return (this._input as SbbSelectElement).getDisplayValue()?.trim() === '';
    } else {
      return this._isInputValueEmpty();
    }
  }

  private _isInputValueEmpty(): boolean {
    const value = (this._input as { value: string }).value;
    return ['', undefined, null].includes(value) || (Array.isArray(value) && value.length === 0);
  }

  private _assignSlots(): void {
    this.querySelectorAll('label:not([slot])').forEach((e) => e.setAttribute('slot', 'label'));
    this.querySelectorAll('sbb-form-error:not([slot])').forEach((e) =>
      e.setAttribute('slot', 'error'),
    );
  }

  private _readInputState(): void {
    if (!this._input) {
      return;
    }
    this.toggleAttribute('data-readonly', this._input.hasAttribute('readonly'));
    this.toggleAttribute('data-disabled', this._input.hasAttribute('disabled'));
    this.toggleAttribute(
      'data-invalid',
      this._input.hasAttribute('data-sbb-invalid') ||
        this._input.classList.contains('sbb-invalid') ||
        (this._input.classList.contains('ng-touched') &&
          this._input.classList.contains('ng-invalid')),
    );
    this.toggleAttribute(
      'data-has-popup-open',
      this._input.localName === 'sbb-select' &&
        ['opening', 'opened'].includes(this._input!.getAttribute('data-state')!),
    );
  }

  /**
   * It is used internally to set the aria-describedby attribute for the slotted input referencing available <sbb-form-error> instances.
   */
  private _onSlotErrorChange(event: Event): void {
    this._errorElements = (event.target as HTMLSlotElement).assignedElements();

    for (const el of this._errorElements) {
      // Although a form error assigns an id itself, we need to be earlier by creating one here
      if (!el.id) {
        el.id = `sbb-form-field-error-${++nextFormFieldErrorId}`;
      }
      if (!el.role) {
        // Instead of defining a container with an aria-live region as expected, we had to change
        // setting it for every slotted element to properly work in all browsers and screen reader combinations.
        el.role = 'status';
        if (isFirefox) {
          el.setAttribute('role', 'status');
        }
      }
    }
    this._applyAriaDescribedby();
    this.toggleAttribute('data-has-error', !!this._errorElements.length);
    this._syncNegative();
  }

  private _applyAriaDescribedby(): void {
    const ids = [];

    if (this._originalInputAriaDescribedby) {
      ids.push(this._originalInputAriaDescribedby);
    }

    if (this._errorElements.length) {
      this._errorElements.forEach((e) => ids.push(e.id));
    }

    const ariaDescribedby = ids.join(' ');
    if (this._input) {
      setOrRemoveAttribute(this._input, 'aria-describedby', ariaDescribedby);
    }
  }

  /** Manually reset the form field. Currently, this only resets the floating label. */
  public reset(): void {
    this._checkAndUpdateInputEmpty();
  }

  /** Manually clears the input value. It only works for inputs, selects are not supported. */
  public clear(): void {
    if ((this._input?.localName as string) !== 'input') {
      return;
    }
    (this._input as { value: string }).value = '';
    this._checkAndUpdateInputEmpty();
  }

  private _syncNegative(): void {
    this.querySelectorAll?.(
      'sbb-form-error,sbb-mini-button,sbb-popover-trigger,sbb-form-field-clear,sbb-datepicker-next-day,sbb-datepicker-previous-day,sbb-datepicker-toggle,sbb-select,sbb-autocomplete,sbb-autocomplete-grid',
    ).forEach((element) => element.toggleAttribute('negative', this.negative));
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-form-field__space-wrapper">
        ${/* Queried by id from the autocomplete/select to be used as the anchor element */ ''}
        <div @click=${this._handleWrapperClick} class="sbb-form-field__wrapper" id="overlay-anchor">
          <slot name="prefix" @slotchange=${this._syncNegative}></slot>
          <div class="sbb-form-field__input-container">
            <span class="sbb-form-field__label-spacer" aria-hidden="true"></span>
            <span class="sbb-form-field__label">
              <span class="sbb-form-field__label-ellipsis">
                <slot name="label" @slotchange=${this._onSlotLabelChange}></slot>
                ${this.optional
                  ? html` <span aria-hidden="true"> ${i18nOptional[this._language.current]} </span>`
                  : nothing}
              </span>
            </span>
            <div class="sbb-form-field__input">
              <slot @slotchange=${this._onSlotInputChange}></slot>
            </div>
            ${['select', 'sbb-select'].includes(this._input?.localName as string)
              ? html`<sbb-icon
                  name="chevron-small-down-small"
                  class="sbb-form-field__select-input-icon"
                ></sbb-icon>`
              : nothing}
          </div>
          <slot name="suffix" @slotchange=${this._syncNegative}></slot>
        </div>

        <div class="sbb-form-field__error">
          <slot name="error" @slotchange=${this._onSlotErrorChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-form-field': SbbFormFieldElement;
  }
}
