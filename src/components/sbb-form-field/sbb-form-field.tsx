import { Component, Element, h, JSX, Prop, State, ComponentInterface, Watch } from '@stencil/core';
import { i18nOptional } from '../../global/i18n';
import { InterfaceSbbFormFieldAttributes } from './sbb-form-field.custom';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import { toggleDatasetEntry } from '../../global/helpers/dataset';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
import {
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';

let nextId = 0;

/**
 * @slot label - Slot to render a label.
 * @slot prefix - Slot to render an icon on the left side of the input.
 * @slot unnamed - Slot to render an input/select.
 * @slot suffix - Slot to render an icon on the right side of the input.
 * @slot error - Slot to render an error.
 */
@Component({
  shadow: true,
  styleUrl: './sbb-form-field.scss',
  tag: 'sbb-form-field',
})
export class SbbFormField implements ComponentInterface {
  // List of supported element selectors in unnamed slot
  private readonly _supportedInputElements = ['INPUT', 'SELECT', 'SBB-SLIDER', 'SBB-TIME-INPUT'];

  /**
   * Whether to reserve space for an error message.
   * `none` does not reserve any space.
   * `reserve` does reserve one row for an error message.
   */
  @Prop({ reflect: true }) public errorSpace?: InterfaceSbbFormFieldAttributes['errorSpace'] =
    'none';

  /**
   * Label text for the input which is internally rendered as `<label>`.
   */
  @Prop() public label: string;

  /**
   * Indicates whether the input is optional.
   */
  @Prop() public optional?: boolean;

  /**
   * Size variant, either l or m.
   */
  @Prop({ reflect: true }) public size?: InterfaceSbbFormFieldAttributes['size'] = 'm';

  /**
   * Whether to display the form field without a border.
   */
  @Prop({ reflect: true }) public borderless = false;

  /** Defines the width of the component:
   * - `default`: the component has defined width and min-width;
   * - `collapse`: the component adapts itself to its inner input content. */
  @Prop({ reflect: true }) public width: 'default' | 'collapse' = 'default';

  /**
   * It is used internally to get the `error` slot.
   */
  @State() private _errorElements: Element[] = [];

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('label');

  @Element() private _element!: HTMLElement;

  /** Original aria-describedby value of the slotted input element. */
  private _originalInputAriaDescribedby?: string;

  /**
   * Get the document language; used for translations.
   */
  @State() private _currentLanguage = documentLanguage();

  /**
   * It is used internally to get the `input` slot.
   */
  @State() private _input?: HTMLInputElement | HTMLSelectElement | HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
  );

  /**
   * Listens to the changes on `readonly` and `disabled` attributes of `<input>`.
   */
  private _formFieldAttributeObserver = new MutationObserver((mutations: MutationRecord[]) => {
    if (mutations.some((m) => m.type === 'attributes')) {
      this._readInputState();
    }
  });

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this.renderLabel(this.label);
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
    this._formFieldAttributeObserver.disconnect();
  }

  @Watch('label')
  public renderLabel(newValue: string): void {
    let labelElement: HTMLLabelElement = this._element.querySelector(':scope > label');
    if (!newValue && labelElement?.dataset.creator === this._element.tagName) {
      labelElement.remove();
    } else if (
      labelElement?.dataset.creator === this._element.tagName &&
      labelElement.textContent !== newValue
    ) {
      labelElement.textContent = newValue;
    } else if (!labelElement && newValue) {
      labelElement = this._element.ownerDocument.createElement('label');
      labelElement.dataset.creator = this._element.tagName;
      labelElement.setAttribute('slot', 'label');
      labelElement.textContent = newValue;
      this._element.insertBefore(labelElement, this._element.firstChild);
    }
  }

  @Listen('will-open')
  public onPopupOpen({ target }): void {
    if ((target as HTMLElement).nodeName === 'SBB-TOOLTIP') {
      toggleDatasetEntry(this._element, 'hasPopupOpen', true);
    }
  }

  @Listen('did-close')
  public onPopupClose({ target }): void {
    if ((target as HTMLElement).nodeName === 'SBB-TOOLTIP') {
      toggleDatasetEntry(this._element, 'hasPopupOpen', false);
    }
  }

  private _handleWrapperClick(event: Event): void {
    if (
      (event.target as Element).tagName !== 'LABEL' &&
      !this._isButton(event.target as Element) &&
      !this._isButton(event.composedPath()[0] as Element) &&
      !this._isPopup(event)
    ) {
      this._input?.focus();
    }
  }

  private _isButton(element: Element): boolean {
    return element.tagName === 'BUTTON' || element.getAttribute('role') === 'button';
  }

  private _isPopup(event: Event): boolean {
    const composedPathEls = event.composedPath().filter((el) => el instanceof window.HTMLElement);
    return composedPathEls.some((el) => (el as HTMLElement).tagName === 'SBB-TOOLTIP');
  }

  private _onSlotLabelChange(): void {
    const labels = Array.from(this._element.querySelectorAll('label'));
    const createdLabel = labels.find((l) => l.dataset.creator === this._element.tagName);
    if (labels.length > 1 && createdLabel) {
      createdLabel.remove();
    }
    const inputId = this._input?.id;
    if (inputId) {
      labels.forEach((l) => (l.htmlFor = inputId));
    }
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

    this._formFieldAttributeObserver.disconnect();
    this._formFieldAttributeObserver.observe(this._input, {
      attributes: true,
      attributeFilter: ['readonly', 'disabled', 'class'],
    });

    if (!this._input.id) {
      this._input.id = `sbb-form-field-input-${nextId++}`;
    }

    this._element.dataset.inputType = this._input.tagName.toLowerCase();
    const label = this._element.querySelector('label');
    if (label) {
      label.htmlFor = this._input.id;
    }
  }

  private _assignSlots(): void {
    this._element
      .querySelectorAll('label:not([slot])')
      .forEach((e) => e.setAttribute('slot', 'label'));
    this._element
      .querySelectorAll('sbb-form-error:not([slot])')
      .forEach((e) => e.setAttribute('slot', 'error'));
  }

  private _readInputState(): void {
    toggleDatasetEntry(this._element, 'readonly', isValidAttribute(this._input, 'readonly'));
    toggleDatasetEntry(this._element, 'disabled', isValidAttribute(this._input, 'disabled'));
    toggleDatasetEntry(
      this._element,
      'invalid',
      this._input.classList.contains('sbb-invalid') ||
        (this._input.classList.contains('ng-touched') &&
          this._input.classList.contains('ng-invalid'))
    );
  }

  /**
   * It is used internally to set the aria-describedby attribute for the slotted input referencing available <sbb-form-error> instances.
   */
  private _onSlotErrorChange(event: Event): void {
    this._errorElements = (event.target as HTMLSlotElement).assignedElements();
    this._applyAriaDescribedby();
    toggleDatasetEntry(this._element, 'hasError', !!this._errorElements.length);
  }

  private _applyAriaDescribedby(): void {
    const value = this._errorElements.length
      ? this._errorElements.map((e) => e.id).join(',')
      : this._originalInputAriaDescribedby;
    this._input?.setAttribute('aria-describedby', value);
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-form-field__space-wrapper">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={(event) => this._handleWrapperClick(event)} class="sbb-form-field__wrapper">
          <slot name="prefix"></slot>

          <div class="sbb-form-field__input-container">
            {(this.label || this._namedSlots.label) && (
              <span class="sbb-form-field__label">
                <slot name="label" onSlotchange={() => this._onSlotLabelChange()}></slot>
                {this.optional && (
                  <span aria-hidden="true">&nbsp;{i18nOptional[this._currentLanguage]}</span>
                )}
              </span>
            )}
            <div class="sbb-form-field__input">
              <slot onSlotchange={(event) => this._onSlotInputChange(event)}></slot>
            </div>
            {this._input?.tagName === 'SELECT' && (
              <sbb-icon
                name="chevron-small-down-small"
                class="sbb-form-field__select-input-icon"
              ></sbb-icon>
            )}
          </div>

          <slot name="suffix"></slot>
        </div>

        <div class="sbb-form-field__error" aria-live="polite">
          <slot name="error" onSlotchange={(event) => this._onSlotErrorChange(event)}></slot>
        </div>
      </div>
    );
  }
}
