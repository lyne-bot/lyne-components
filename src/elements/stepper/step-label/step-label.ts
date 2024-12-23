import { type CSSResultGroup, html, type TemplateResult, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { hostAttributes } from '../../core/decorators.js';
import { SbbDisabledMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';
import type { SbbStepElement } from '../step.js';
import type { SbbStepperElement } from '../stepper.js';

import style from './step-label.scss?lit&inline';

let nextId = 0;

/**
 * Combined with a `sbb-stepper`, it displays a step's label.
 *
 * @slot - Use the unnamed slot to provide a label.
 * @slot icon - Use this to display an icon in the label bubble.
 */
export
@customElement('sbb-step-label')
@hostAttributes({
  slot: 'step-label',
  tabindex: '-1',
  role: 'tab',
})
class SbbStepLabelElement extends SbbIconNameMixin(SbbDisabledMixin(SbbButtonBaseElement)) {
  public static override styles: CSSResultGroup = style;

  /** The step controlled by the label. */
  public get step(): SbbStepElement | null {
    return this._step;
  }

  private _stepper: SbbStepperElement | null = null;
  private _step: SbbStepElement | null = null;

  public constructor() {
    super();
    this.addEventListener?.('click', () => {
      if (this._stepper && this._step) {
        this._stepper.selected = this._step;
      }
    });
  }

  private _getStep(): SbbStepElement | null {
    let nextSibling = this.nextElementSibling;
    while (nextSibling && nextSibling.localName !== 'sbb-step') {
      nextSibling = nextSibling.nextElementSibling;
    }
    return nextSibling as SbbStepElement;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id = this.id || `sbb-step-label-${nextId++}`;
    this.internals.ariaSelected = 'false';
    this._stepper = this.closest('sbb-stepper');
    this._step = this._getStep();
    // The `data-disabled` attribute is used to preserve the initial disabled state of
    // step labels in case of switching from linear to non-linear mode.
    this.toggleAttribute('data-disabled', this.hasAttribute('disabled'));
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    if (this.step) {
      this.setAttribute('aria-controls', this.step.id);
    }
  }

  /**
   * Selects and configures the step label.
   * @internal
   */
  public select(): void {
    this.tabIndex = 0;
    this.internals.ariaSelected = 'true';
    this.toggleAttribute('data-selected', true);
  }

  /**
   * Deselects and configures the step label.
   * @internal
   */
  public deselect(): void {
    this.tabIndex = -1;
    this.internals.ariaSelected = 'false';
    this.toggleAttribute('data-selected', false);
  }

  /**
   * Configures the step label.
   * @internal
   */
  public configure(posInSet: number, setSize: number, stepperLoaded: boolean): void {
    if (stepperLoaded) {
      this._step = this._getStep();
    }
    this.internals.ariaPosInSet = `${posInSet}`;
    this.internals.ariaSetSize = `${setSize}`;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-step-label">
        <span class="sbb-step-label__prefix">${this.renderIconSlot()}</span>
        <span class="sbb-step-label__text"><slot></slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-step-label': SbbStepLabelElement;
  }
}
