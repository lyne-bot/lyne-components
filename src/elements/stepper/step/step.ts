import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import type { SbbStepLabelElement } from '../step-label.js';
import type { SbbStepperElement } from '../stepper.js';

import style from './step.scss?lit&inline';

let nextId = 0;

export type SbbStepValidateEventDetails = {
  currentIndex: number | null;
  currentStep: SbbStepElement | null;
  nextIndex: number | null;
  nextStep: SbbStepElement | null;
};

/**
 * Combined with a `sbb-stepper`, it displays a step's content.
 *
 * @slot - Use the unnamed slot to provide content.
 * @event {CustomEvent<SbbStepValidateEventDetails>} validate - Emits whenever step switch is triggered. Can be canceled.
 */
export
@customElement('sbb-step')
@hostAttributes({
  slot: 'step',
  role: 'tabpanel',
})
class SbbStepElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    validate: 'validate',
  } as const;

  /** Emits whenever step switch is triggered. */
  private _validate: EventEmitter<SbbStepValidateEventDetails> = new EventEmitter(
    this,
    SbbStepElement.events.validate,
  );

  private _loaded: boolean = false;
  private _stepper: SbbStepperElement | null = null;
  private _label: SbbStepLabelElement | null = null;

  /** The label of the step. */
  public get label(): SbbStepLabelElement | null {
    return this._label;
  }

  public constructor() {
    super();
    this.addEventListener?.('click', (e) => this._handleClick(e));
  }

  /**
   * Selects and configures the step.
   * @internal
   */
  public select(): void {
    if (!this._loaded || !this.label) {
      return;
    }
    this.toggleAttribute('data-selected', true);
    this.label.select();
  }

  /**
   * Deselects and configures the step.
   * @internal
   */
  public deselect(): void {
    if (!this.label) {
      return;
    }
    this.toggleAttribute('data-selected', false);
    this.label.deselect();
  }

  /**
   * Emits a validate event whenever step switch is triggered.
   * @internal
   */
  public validate(eventData: SbbStepValidateEventDetails): boolean {
    return !!this._validate.emit(eventData);
  }

  /**
   * Configures the step.
   * @internal
   */
  public configure(stepperLoaded: boolean): void {
    if (stepperLoaded) {
      this._label = this._getStepLabel();
    }
    if (this.label) {
      this.setAttribute('aria-labelledby', this.label.id);
    }
  }

  /** Watches for clicked elements with `sbb-stepper-next` or `sbb-stepper-previous` attributes. */
  private _handleClick(event: Event): void {
    const composedPathElements = event
      .composedPath()
      .filter((el) => el instanceof window.HTMLElement);
    if (composedPathElements.some((el) => this._isGoNextElement(el as HTMLElement))) {
      this._stepper?.next();
    } else if (composedPathElements.some((el) => this._isGoPreviousElement(el as HTMLElement))) {
      this._stepper?.previous();
    }
  }

  private _isGoNextElement(element: HTMLElement): boolean {
    return element.hasAttribute('sbb-stepper-next') && !element.hasAttribute('disabled');
  }

  private _isGoPreviousElement(element: HTMLElement): boolean {
    return element.hasAttribute('sbb-stepper-previous') && !element.hasAttribute('disabled');
  }

  private _getStepLabel(): SbbStepLabelElement | null {
    let previousSibling = this.previousElementSibling;
    while (previousSibling && previousSibling.localName !== 'sbb-step-label') {
      previousSibling = previousSibling.previousElementSibling;
    }
    return previousSibling as SbbStepLabelElement;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id = this.id || `sbb-step-${nextId++}`;
    this._stepper = this.closest('sbb-stepper');
    this._label = this._getStepLabel();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._loaded = true;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-step--wrapper">
        <div class="sbb-step">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-step': SbbStepElement;
  }
}
