import { CSSResultGroup, html, LitElement, nothing, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SbbInputModality, sbbInputModalityDetector } from '../../core/a11y';
import { isBrowser, isFirefox, isValidAttribute, toggleDatasetEntry } from '../../core/dom';
import {
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
  ConnectedAbortController,
} from '../../core/eventing';
import { i18nOptional } from '../../core/i18n';
import { AgnosticMutationObserver } from '../../core/observers';
import type { SbbSelect } from '../../select';

import style from './form-field.scss?lit&inline';
import '../../icon';

let nextId = 0;
let nextFormFieldErrorId = 0;

const supportedPopupTagNames = ['SBB-AUTOCOMPLETE', 'SBB-SELECT'];

/**
 * It wraps an input element adding label, errors, icon, etc.
 *
 * @slot - Use this slot to render an input/select or a supported non-native element.
 * @slot label - Use this slot to render a label.
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 * @slot error - Use this slot to render an error.
 */
@customElement('sbb-form-field')
export class SbbFormField extends LitElement {
  public static override styles: CSSResultGroup = style;

  private readonly _supportedNativeInputElements = ['INPUT', 'SELECT'];
  // List of supported element selectors in unnamed slot
  private readonly _supportedInputElements = [
    ...this._supportedNativeInputElements,
    'SBB-SELECT',
    'SBB-SLIDER',
  ];
  // List of elements that should not focus input on click
  private readonly _excludedFocusElements = ['BUTTON', 'SBB-TOOLTIP'];

  private readonly _floatingLabelSupportedInputElements = ['INPUT', 'SELECT', 'SBB-SELECT'];

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
  public errorSpace?: 'none' | 'reserve' = 'none';

  /**
   * Label text for the input which is internally rendered as `<label>`.
   */
  @property() public label: string;

  /**
   * Indicates whether the input is optional.
   */
  @property({ type: Boolean }) public optional?: boolean;

  /**
   * Size variant, either l or m.
   */
  @property({ reflect: true }) public size?: 'l' | 'm' = 'm';

  /**
   * Whether to display the form field without a border.
   */
  @property({ reflect: true, type: Boolean }) public borderless = false;

  /** Defines the width of the component:
   * - `default`: the component has defined width and min-width;
   * - `collapse`: the component adapts itself to its inner input content. */
  @property({ reflect: true }) public width: 'default' | 'collapse' = 'default';

  /** Whether the label should float. If activated, the placeholder of the input is hidden. */
  @property({ attribute: 'floating-label', reflect: true, type: Boolean }) public floatingLabel =
    false;

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  /** It is used internally to get the `error` slot. */
  @state() private _errorElements: Element[] = [];

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('label');

  /** Original aria-describedby value of the slotted input element. */
  private _originalInputAriaDescribedby?: string;

  /**
   * Get the document language; used for translations.
   */
  @state() private _currentLanguage = documentLanguage();

  /** Reference to the slotted input element. */
  @state() private _input?: HTMLInputElement | HTMLSelectElement | HTMLElement;

  /** Reference to the slotted label elements. */
  @state() private _label?: HTMLLabelElement;

  /** Returns the input element. */
  public get inputElement(): HTMLInputElement | HTMLSelectElement | HTMLElement {
    return this._input;
  }

  private _abort = new ConnectedAbortController(this);
  private _handlerRepository = new HandlerRepository(
    this,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  /**
   * Listens to the changes on `readonly` and `disabled` attributes of `<input>`.
   */
  private _formFieldAttributeObserver = new AgnosticMutationObserver(
    (mutations: MutationRecord[]) => {
      if (mutations.some((m) => m.type === 'attributes')) {
        this._readInputState();
      }
    },
  );

  private _inputAbortController = new AbortController();

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('willOpen', (e) => this._onPopupOpen(e), { signal });
    this.addEventListener('didClose', (e) => this._onPopupClose(e), { signal });
    this._handlerRepository.connect();
    this._registerInputListener();
    this._syncNegative();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('label')) {
      this._renderLabel(this.label);
    }
    if (changedProperties.has('negative')) {
      this._syncNegative();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
    this._formFieldAttributeObserver.disconnect();
    this._inputAbortController.abort();
  }

  private _renderLabel(newValue: string): void {
    if (!isBrowser()) {
      return;
    }
    let labelElement = Array.from(this.children).find(
      (element) => element.tagName === 'LABEL',
    ) as HTMLLabelElement;

    if (!newValue && labelElement?.dataset.creator === this.tagName) {
      labelElement.remove();
    } else if (
      labelElement?.dataset.creator === this.tagName &&
      labelElement.textContent !== newValue
    ) {
      labelElement.textContent = newValue;
    } else if (!labelElement && newValue) {
      labelElement = this.ownerDocument.createElement('label');
      labelElement.dataset.creator = this.tagName;
      labelElement.setAttribute('slot', 'label');
      labelElement.textContent = newValue;
      this.insertBefore(labelElement, this.firstChild);
    }
  }

  private _onPopupOpen({ target }): void {
    if (supportedPopupTagNames.includes((target as HTMLElement).nodeName)) {
      toggleDatasetEntry(this, 'hasPopupOpen', true);
    }
  }

  private _onPopupClose({ target }): void {
    if (supportedPopupTagNames.includes((target as HTMLElement).nodeName)) {
      toggleDatasetEntry(this, 'hasPopupOpen', false);
    }
  }

  private _handleWrapperClick(event: Event): void {
    if (this._isButtonOrPopup(event)) {
      return;
    }

    if (this._input?.tagName === 'SBB-SELECT') {
      this._input.click();
      this._input.focus();
    } else if ((event.target as Element).tagName !== 'LABEL') {
      this._input?.focus();
    }
  }

  private _isButtonOrPopup(event: Event): boolean {
    return event
      .composedPath()
      .some(
        (el) =>
          (el instanceof window.HTMLElement && el.getAttribute('role') === 'button') ||
          this._excludedFocusElements.includes((el as HTMLElement).tagName),
      );
  }

  private _onSlotLabelChange(): void {
    let labels = Array.from(this.querySelectorAll('label'));
    const createdLabel = labels.find((l) => l.dataset.creator === this.tagName);
    if (labels.length > 1 && createdLabel) {
      createdLabel.remove();
      labels = labels.filter((l) => l !== createdLabel);
    }
    if (labels.length > 1) {
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
    this._input = (event.target as HTMLSlotElement)
      .assignedElements()
      .find((e): e is HTMLElement => this._supportedInputElements.includes(e.tagName));
    this._assignSlots();

    if (!this._input) {
      return;
    }

    this._originalInputAriaDescribedby = this._input.getAttribute('aria-describedby');
    this._applyAriaDescribedby();
    this._readInputState();
    this._registerInputListener();

    this._formFieldAttributeObserver.disconnect();
    this._formFieldAttributeObserver.observe(this._input, {
      attributes: true,
      attributeFilter: ['readonly', 'disabled', 'class', 'data-sbb-invalid'],
    });
    this.dataset.inputType = this._input.tagName.toLowerCase();
    this._syncLabelInputReferences();
  }

  private _syncLabelInputReferences(): void {
    if (!this._input || !this._label) {
      return;
    }

    if (this._supportedNativeInputElements.includes(this._input.tagName)) {
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
          .filter((l) => !!l && l !== this._label.id) ?? [];
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

    if (this._input.tagName === 'SBB-SELECT') {
      this._input.addEventListener('stateChange', () => this._checkAndUpdateInputEmpty(), {
        signal: this._inputAbortController.signal,
      });

      inputFocusElement = this.querySelector('.sbb-select-invisible-trigger');
    }

    inputFocusElement.addEventListener(
      'focusin',
      () => {
        toggleDatasetEntry(this, 'inputFocused', true);
        (this.dataset.focusOrigin as SbbInputModality) =
          sbbInputModalityDetector.mostRecentModality;
      },
      {
        signal: this._inputAbortController.signal,
      },
    );

    inputFocusElement.addEventListener(
      'focusout',
      () => {
        delete this.dataset.focusOrigin;
        toggleDatasetEntry(this, 'inputFocused', false);
      },
      {
        signal: this._inputAbortController.signal,
      },
    );
  }

  private _getInputForm(): HTMLFormElement | null {
    if (this._input instanceof HTMLInputElement || this._input instanceof HTMLSelectElement) {
      return this._input.form;
    }
    return this._input.closest('form');
  }

  private _checkAndUpdateInputEmpty(): void {
    toggleDatasetEntry(
      this,
      'inputEmpty',
      this._floatingLabelSupportedInputElements.includes(this._input.tagName) &&
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
    } else if (this._input.tagName === 'SBB-SELECT') {
      return (this._input as SbbSelect).getDisplayValue()?.trim() === '';
    } else {
      return this._isInputValueEmpty();
    }
  }

  private _isInputValueEmpty(): boolean {
    const value = (this._input as { value }).value;
    return ['', undefined, null].includes(value) || (Array.isArray(value) && value.length === 0);
  }

  private _assignSlots(): void {
    this.querySelectorAll('label:not([slot])').forEach((e) => e.setAttribute('slot', 'label'));
    this.querySelectorAll('sbb-form-error:not([slot])').forEach((e) =>
      e.setAttribute('slot', 'error'),
    );
  }

  private _readInputState(): void {
    toggleDatasetEntry(this, 'readonly', isValidAttribute(this._input, 'readonly'));
    toggleDatasetEntry(this, 'disabled', isValidAttribute(this._input, 'disabled'));
    toggleDatasetEntry(
      this,
      'invalid',
      this._input.hasAttribute('data-sbb-invalid') ||
        this._input.classList.contains('sbb-invalid') ||
        (this._input.classList.contains('ng-touched') &&
          this._input.classList.contains('ng-invalid')),
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
        if (isFirefox()) {
          el.setAttribute('role', 'status');
        }
      }
    }
    this._applyAriaDescribedby();
    toggleDatasetEntry(this, 'hasError', !!this._errorElements.length);
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
    if (ariaDescribedby) {
      this._input?.setAttribute('aria-describedby', ariaDescribedby);
    } else {
      this._input?.removeAttribute('aria-describedby');
    }
  }

  /** Manually reset the form field. Currently, this only resets the floating label. */
  public reset(): void {
    this._checkAndUpdateInputEmpty();
  }

  /** Manually clears the input value. It only works for inputs, selects are not supported. */
  public clear(): void {
    if (this._input.tagName !== 'INPUT') {
      return;
    }
    (this._input as { value }).value = '';
    this._checkAndUpdateInputEmpty();
  }

  /**
   * Returns the input element.
   * @deprecated Use the 'inputElement' property instead
   */
  public getInputElement(): HTMLInputElement | HTMLSelectElement | HTMLElement {
    return this._input;
  }

  private _syncNegative(): void {
    this.querySelectorAll?.(
      'sbb-form-error,sbb-button,sbb-tooltip-trigger,sbb-form-field-clear,sbb-datepicker-next-day,sbb-datepicker-previous-day,sbb-datepicker-toggle,sbb-select,sbb-autocomplete',
    ).forEach((element) =>
      this.negative ? element.setAttribute('negative', '') : element.removeAttribute('negative'),
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-form-field__space-wrapper">
        ${/* Queried by id from the autocomplete/select to be used as the anchor element */ ''}
        <div @click=${this._handleWrapperClick} class="sbb-form-field__wrapper" id="overlay-anchor">
          <slot name="prefix" @slotchange=${this._syncNegative}></slot>
          <div class="sbb-form-field__input-container">
            ${this.label || this._namedSlots.label
              ? html`
                  <span class="sbb-form-field__label-spacer" aria-hidden="true"></span>
                  <span class="sbb-form-field__label">
                    <span class="sbb-form-field__label-ellipsis">
                      <slot name="label" @slotchange=${this._onSlotLabelChange}></slot>
                      ${this.optional
                        ? html` <span aria-hidden="true">
                            ${i18nOptional[this._currentLanguage]}
                          </span>`
                        : nothing}
                    </span>
                  </span>
                `
              : nothing}
            <div class="sbb-form-field__input">
              <slot @slotchange=${this._onSlotInputChange}></slot>
            </div>
            ${['SELECT', 'SBB-SELECT'].includes(this._input?.tagName)
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
    'sbb-form-field': SbbFormField;
  }
}
