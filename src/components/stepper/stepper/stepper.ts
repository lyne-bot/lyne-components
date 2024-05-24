import {
  type CSSResultGroup,
  html,
  LitElement,
  type TemplateResult,
  type PropertyValues,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbConnectedAbortController } from '../../core/controllers.js';
import { breakpoints, isBreakpoint } from '../../core/dom.js';
import type { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces.js';
import type { SbbStepElement, SbbStepValidateEventDetails } from '../step.js';

import style from './stepper.scss?lit&inline';

const DEBOUNCE_TIME = 150;

/**
 * Provides a structured, step-by-step workflow for user interactions.
 *
 * @slot step-label - Use this slot to provide an `sbb-step-label`.
 * @slot step - Use this slot to provide an `sbb-step`.
 */
@customElement('sbb-stepper')
export class SbbStepperElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * If set to true, only the current and previous labels can be clicked and selected.
   */
  @property({ type: Boolean }) public linear = false;

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @property({ attribute: 'horizontal-from', reflect: true })
  public get horizontalFrom(): SbbHorizontalFrom | undefined {
    return this._horizontalFrom;
  }
  public set horizontalFrom(value: SbbHorizontalFrom) {
    this._horizontalFrom = breakpoints.includes(value) ? value : undefined;
    if (this._horizontalFrom && this._loaded) {
      this._checkOrientation();
    }
  }
  private _horizontalFrom?: SbbHorizontalFrom | undefined;

  /**
   * Steps orientation, either horizontal or vertical.
   */
  @property({ reflect: true })
  public orientation: SbbOrientation = 'horizontal';

  /**
   * The currently selected step.
   */
  @property({ attribute: false })
  public set selected(step: SbbStepElement) {
    if (this._loaded) {
      this._select(step);
    }
  }
  public get selected(): SbbStepElement | undefined {
    return this.querySelector<SbbStepElement>('sbb-step[data-selected]') ?? undefined;
  }

  /**
   * The currently selected step index.
   */
  @property({ attribute: 'selected-index', type: Number })
  public set selectedIndex(index: number) {
    if (this._loaded) {
      this._select(this.steps[index]);
    }
  }
  public get selectedIndex(): number | undefined {
    return this.selected ? this.steps.indexOf(this.selected) : undefined;
  }

  /**
   * The steps of the stepper.
   */
  public get steps(): SbbStepElement[] {
    return Array.from(this.querySelectorAll('sbb-step'));
  }

  /**
   * Selects the next step.
   */
  public next(): void {
    if (this.selectedIndex !== undefined) {
      this._select(this.steps[this.selectedIndex + 1]);
    }
  }

  /**
   * Selects the previous step.
   */
  public previous(): void {
    if (this.selectedIndex !== undefined) {
      this._select(this.steps[this.selectedIndex - 1]);
    }
  }

  /**
   * Resets the form in which the stepper is nested or every form of each step, if any.
   */
  public reset(): void {
    const closestForm = this.closest('form');
    if (closestForm) {
      closestForm.reset();
    } else {
      this.querySelectorAll('form').forEach((form) => form.reset());
    }
    this.selectedIndex = 0;
  }

  private _loaded: boolean = false;
  private _abort = new SbbConnectedAbortController(this);
  private _resizeObserverTimeout: ReturnType<typeof setTimeout> | null = null;

  private _isValidStep(step: SbbStepElement): boolean {
    if (!step || step === this.selected || (!this.linear && step.label?.hasAttribute('disabled'))) {
      return false;
    }

    if (this.linear && !this.selected) {
      return step === this.steps[0];
    }

    if (this.linear && this.selectedIndex !== undefined) {
      const index = this.steps.indexOf(step);
      return index < this.selectedIndex || index === this.selectedIndex + 1;
    }

    return true;
  }

  private _select(step: SbbStepElement): void {
    if (!this._isValidStep(step)) {
      return;
    }
    const validatePayload: SbbStepValidateEventDetails = {
      currentIndex: this.selectedIndex,
      currentStep: this.selected,
      nextIndex: this.selectedIndex !== undefined ? this.selectedIndex + 1 : undefined,
      nextStep: this.selectedIndex !== undefined ? this.steps[this.selectedIndex + 1] : undefined,
    };
    if (this.selected && !this.selected.validate(validatePayload)) {
      return;
    }
    const current = this.selected;
    current?.deselect();
    step.select();
    this._setMarkerSize();
    this._configureLinearMode();
    if (this._loaded) {
      step.label?.focus();
    }
  }

  private _setMarkerSize(): void {
    if (
      !this._loaded ||
      !this.selected ||
      this.selectedIndex === undefined ||
      !this.selected.label
    ) {
      return;
    }
    const offset =
      this.orientation === 'horizontal'
        ? this.selected.label.offsetLeft + this.selected.label.offsetWidth
        : this._calculateLabelOffsetTop();

    this.style.setProperty('--sbb-stepper-marker-size', `${offset}px`);
  }

  private _calculateLabelOffsetTop(): number | undefined {
    if (this.selectedIndex === undefined) {
      return;
    }
    let offset = 0;
    for (const step of this.steps) {
      if (step === this.selected) {
        break;
      }
      offset = step.label!.offsetHeight + offset;
    }
    return (
      offset +
      this.selected!.label!.offsetHeight! +
      parseFloat(getComputedStyle(this).getPropertyValue('--sbb-spacing-fixed-6x')) *
        16 *
        this.selectedIndex
    );
  }

  private _configure(): void {
    this.steps
      .filter((s) => s.label)
      .map((s) => s.label!)
      .forEach((label, i, array) => {
        label.configure(i + 1, array.length);
      });
  }

  private _updateLabels(): void {
    this.steps.forEach((step) => {
      step.slot = this.orientation === 'horizontal' ? 'step' : 'step-label';
      step.setAttribute('data-orientation', this.orientation);
      step.label?.setAttribute('data-orientation', this.orientation);
    });
  }

  private _checkOrientation(): void {
    if (this.horizontalFrom) {
      this.orientation = isBreakpoint(this.horizontalFrom) ? 'horizontal' : 'vertical';
      this._updateLabels();
    }
    // The timeout is needed to make sure that the marker takes the correct step-label size.
    setTimeout(() => this._setMarkerSize(), 0);
  }

  private _onStepperResize(): void {
    this._checkOrientation();
    clearTimeout(this._resizeObserverTimeout!);
    this.toggleAttribute('data-disable-animation', true);

    // Disable the animation when resizing to avoid strange transition effects.
    this._resizeObserverTimeout = setTimeout(
      () => this.toggleAttribute('data-disable-animation', false),
      DEBOUNCE_TIME,
    );
  }

  private _configureLinearMode(): void {
    this.steps.forEach((step, index) => {
      step.label?.toggleAttribute(
        'disabled',
        (this.linear && index > this.selectedIndex!) ||
          (!this.linear && step.label.hasAttribute('data-disabled')),
      );
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    window.addEventListener('resize', () => this._onStepperResize(), {
      signal,
      passive: true,
    });
    this.toggleAttribute('data-disable-animation', !this._loaded);
  }

  protected override async firstUpdated(changedProperties: PropertyValues<this>): Promise<void> {
    super.firstUpdated(changedProperties);
    await this.updateComplete;
    this._loaded = true;
    this.selectedIndex = !this.linear ? Number(this.getAttribute('selected-index')) || 0 : 0;
    this._checkOrientation();
    // Remove [data-disable-animation] after component init
    setTimeout(() => this.toggleAttribute('data-disable-animation', false), DEBOUNCE_TIME);
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('orientation') && !this.horizontalFrom) {
      this._updateLabels();
      this._setMarkerSize();
    }
    if (changedProperties.has('linear') && this._loaded) {
      this._configureLinearMode();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-stepper">
        <div class="sbb-stepper__labels" role="tablist">
          <slot name="step-label" @slotchange=${this._configure}></slot>
        </div>
        <div class="sbb-stepper__steps">
          <slot name="step"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-stepper': SbbStepperElement;
  }
}
