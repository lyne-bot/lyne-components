import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getNextElementIndex, interactivityChecker, isArrowKeyPressed } from '../../core/a11y.js';
import { forceType, handleDistinctChange, hostAttributes } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import type { SbbToggleOptionElement } from '../toggle-option.js';

import style from './toggle.scss?lit&inline';

/**
 * It can be used as a container for two `sbb-toggle-option`, acting as a toggle button.
 *
 * @slot - Use the unnamed slot to add `<sbb-toggle-option>` elements to the toggle.
 * @event {CustomEvent<void>} change - Emits whenever the toggle value changes.
 */
export
@customElement('sbb-toggle')
@hostAttributes({
  role: 'radiogroup',
})
class SbbToggleElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    change: 'change',
  } as const;

  /** Whether the toggle is disabled. */
  @forceType()
  @handleDistinctChange((e) => e._updateDisabled())
  @property({ reflect: true, type: Boolean })
  public accessor disabled: boolean = false;

  /**
   * If true, set the width of the component fixed; if false,
   * the width is dynamic based on the label of the sbb-toggle-option.
   */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor even: boolean = false;

  /**
   * Size variant, either m or s.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 's' | 'm' = isLean() ? 's' : 'm';

  /**
   * The value of the toggle. It needs to be mutable since it is updated whenever
   * a new option is selected (see the `onToggleOptionSelect()` method).
   */
  @property()
  public set value(value: string) {
    if (isServer) {
      this._value = value;
    } else {
      this._valueChanged(value);
    }
  }
  public get value(): string {
    return isServer
      ? (this._value ?? '')
      : (this.options.find((o) => o.checked)?.value ?? this.options[0]?.value ?? '');
  }
  private _value: string | null = null;

  /** The child instances of sbb-toggle-option as an array. */
  public get options(): SbbToggleOptionElement[] {
    return Array.from(this.querySelectorAll?.('sbb-toggle-option') ?? []);
  }

  private _loaded: boolean = false;
  private _toggleResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => this.updatePillPosition(true),
  });

  /** Emits whenever the toggle value changes. */
  private _change: EventEmitter = new EventEmitter(this, SbbToggleElement.events.change, {
    bubbles: true,
    composed: true,
  });

  public constructor() {
    super();
    this.addEventListener?.('input', () => this._handleInput(), { passive: true });
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
  }

  /** @internal */
  public updatePillPosition(resizing: boolean): void {
    if (!this._loaded) {
      return;
    }

    const options = this.options;
    const toggleElement = this.shadowRoot!.querySelector<HTMLDivElement>('.sbb-toggle');

    if (
      options.every((o) => !o.checked) ||
      options.every((o) => !o.clientWidth) ||
      !toggleElement
    ) {
      return;
    }

    this.toggleAttribute('data-disable-animation-on-resizing', resizing);

    const firstOption = options[0];
    const isFirstChecked = firstOption.checked;
    const pillLeft = firstOption.checked ? '0px' : `${firstOption.clientWidth}px`;
    const pillRight = isFirstChecked
      ? `${toggleElement.clientWidth - firstOption.clientWidth}px`
      : '0px';

    this.style?.setProperty('--sbb-toggle-option-left', pillLeft);
    this.style?.setProperty('--sbb-toggle-option-right', pillRight);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.options.forEach((option) => this._toggleResizeObserver.observe(option));
    this._updateToggle();
  }

  protected override async firstUpdated(changedProperties: PropertyValues<this>): Promise<void> {
    super.firstUpdated(changedProperties);

    await this.updateComplete;
    this._loaded = true;
    this.updatePillPosition(false);
  }

  private _updateToggle(): void {
    this._valueChanged(this.value);
    this._updateDisabled();
  }

  private _valueChanged(value: any | undefined): void {
    const options = this.options;
    // If options are not yet defined web components, we can check if attribute is already set as a fallback.
    // We do this by checking whether value property is available (defined component).
    const selectedOption =
      options.find(
        (o) => value === ('value' in o ? o.value : (o as HTMLElement).getAttribute('value')),
      ) ??
      options.find((o) => o.checked) ??
      options[0];

    if (!selectedOption) {
      if (import.meta.env.DEV && !isServer) {
        console.warn(`sbb-toggle: No available options! (${this.id || 'No id'})`);
      }
      return;
    }
    if (!selectedOption.checked) {
      selectedOption.checked = true;
    }
    this.updatePillPosition(false);
  }

  private _updateDisabled(): void {
    for (const toggleOption of this.options) {
      toggleOption.disabled = this.disabled;
    }
  }

  private _handleInput(): void {
    this.updatePillPosition(false);
    this._change.emit();
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledToggleOptions = this.options.filter(
      (t) => !t.disabled && interactivityChecker.isVisible(t),
    );

    if (
      !enabledToggleOptions ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this && (evt.target as HTMLElement).parentElement !== this)
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const checked: number = enabledToggleOptions.findIndex(
        (toggleOption: SbbToggleOptionElement) => toggleOption.checked,
      );
      const nextIndex: number = getNextElementIndex(evt, checked, enabledToggleOptions.length);
      if (!enabledToggleOptions[nextIndex].checked) {
        enabledToggleOptions[nextIndex].checked = true;
        enabledToggleOptions[nextIndex].focus();
        enabledToggleOptions[nextIndex].dispatchEvent(
          new InputEvent('input', { bubbles: true, composed: true }),
        );
      }
      evt.preventDefault();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-toggle">
        <slot @slotchange=${this._updateToggle}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle': SbbToggleElement;
  }
}
