import { type CSSResultGroup, html, LitElement, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { SbbIconNameMixin } from '../../icon';
import { SbbConnectedAbortController, SbbSlotStateController } from '../controllers';
import { isAndroid, isSafari, setOrRemoveAttribute } from '../dom';
import type { EventEmitter } from '../eventing';
import { SbbDisabledMixin } from '../mixins';
import { AgnosticMutationObserver } from '../observers';

import style from './option-base-element.scss?lit&inline';

let nextId = 0;

/**
 * On Safari, the groups labels are not read by VoiceOver.
 * To solve the problem, we remove the role="group" and add an hidden span containing the group name
 * TODO: We should periodically check if it has been solved and, if so, remove the property.
 */
const inertAriaGroups = isSafari();

/** Configuration for the attribute to look at if component is nested in an option group */
const optionObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-disabled', 'data-negative'],
};

export abstract class SbbOptionBaseElement extends SbbDisabledMixin(SbbIconNameMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;

  protected abstract optionId: string;

  /** Value of the option. */
  @property()
  public set value(value: string) {
    this.setAttribute('value', `${value}`);
  }
  public get value(): string {
    return this.getAttribute('value') ?? '';
  }

  /** Whether the option is currently active. */
  @property({ reflect: true, type: Boolean }) public active?: boolean;

  /** Whether the option is selected. */
  @property({ type: Boolean })
  public set selected(value: boolean) {
    this.toggleAttribute('selected', value);
    this._updateAriaSelected();
  }
  public get selected(): boolean {
    return this.hasAttribute('selected');
  }

  /** Emits when the option selection status changes. */
  protected abstract selectionChange: EventEmitter;

  /** Emits when an option was selected by user. */
  protected abstract optionSelected: EventEmitter;

  /** Whether to apply the negative styling */
  @state() protected negative = false;

  /** Whether the component must be set disabled due disabled attribute on sbb-optgroup. */
  @state() protected disabledFromGroup = false;

  @state() protected label?: string;

  /** Disable the highlight of the label. */
  @state() protected disableLabelHighlight: boolean = false;

  /** The portion of the highlighted label. */
  @state() private _highlightString: string | null = null;

  private _abort = new SbbConnectedAbortController(this);
  protected abstract selectByClick(event: MouseEvent): void;
  protected abstract setupHighlightHandler(event: Event): void;

  protected updateDisableHighlight(disabled: boolean): void {
    this.disableLabelHighlight = disabled;
    this.toggleAttribute('data-disable-highlight', disabled);
  }

  /** MutationObserver on data attributes. */
  private _optionAttributeObserver = new AgnosticMutationObserver((mutationsList) =>
    this._onOptionAttributesChange(mutationsList),
  );

  public constructor() {
    super();
    new SbbSlotStateController(this);
  }

  /**
   * Highlight the label of the option
   * @param value the highlighted portion of the label
   * @internal
   */
  public highlight(value: string): void {
    this._highlightString = value;
  }

  /**
   * @internal
   */
  public setSelectedViaUserInteraction(selected: boolean): void {
    this.selected = selected;
    this.selectionChange.emit();
    if (this.selected) {
      this.optionSelected.emit();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this.id ||= `${this.optionId}-${nextId++}`;

    const signal = this._abort.signal;
    const parentGroup = this.closest?.('sbb-autocomplete-grid-optgroup');
    if (parentGroup) {
      this.disabledFromGroup = parentGroup.disabled;
      this._updateAriaDisabled();
    }
    this._optionAttributeObserver.observe(this, optionObserverConfig);

    this.negative = !!this.closest?.(
      // :is() selector not possible due to test environment
      `sbb-autocomplete-grid[negative],sbb-form-field[negative]`,
    );
    this.toggleAttribute('data-group-negative', this.negative);

    this.addEventListener('click', (e: MouseEvent) => this.selectByClick(e), {
      signal,
      passive: true,
    });
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('disabled')) {
      setOrRemoveAttribute(this, 'tabindex', isAndroid() && !this.disabled && 0);
      this._updateAriaDisabled();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    // Init first select state because false would not call setter of selected property.
    this._updateAriaSelected();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._optionAttributeObserver.disconnect();
  }

  private _updateAriaDisabled(): void {
    setOrRemoveAttribute(
      this,
      'aria-disabled',
      this.disabled || this.disabledFromGroup ? 'true' : null,
    );  }

  private _updateAriaSelected(): void {
    this.setAttribute('aria-selected', `${this.selected}`);
  }

  /** Observe changes on data attributes and set the appropriate values. */
  private _onOptionAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this.disabledFromGroup = this.hasAttribute('data-group-disabled');
        this._updateAriaDisabled();
      } else if (mutation.attributeName === 'data-negative') {
        this.negative = this.hasAttribute('data-negative');
      }
    }
  }

  protected getHighlightedLabel(): TemplateResult {
    if (!this._highlightString || !this._highlightString.trim()) {
      return html`${this.label}`;
    }

    const matchIndex = this.label!.toLowerCase().indexOf(this._highlightString.toLowerCase());

    if (matchIndex === -1) {
      return html`${this.label}`;
    }

    const prefix = this.label!.substring(0, matchIndex);
    const highlighted = this.label!.substring(
      matchIndex,
      matchIndex + this._highlightString.length,
    );
    const postfix = this.label!.substring(matchIndex + this._highlightString.length);

    return html`
      <span class="sbb-option__label--highlight">${prefix}</span><span>${highlighted}</span
      ><span class="sbb-option__label--highlight">${postfix}</span>
    `;
  }

  protected renderIcon(): TemplateResult {
    return html` <span class="sbb-option__icon"> ${this.renderIconSlot()} </span>`;
  }

  protected renderLabel(): TemplateResult | typeof nothing {
    return this.label && !this.disableLabelHighlight ? this.getHighlightedLabel() : nothing;
  }

  protected renderTick(): TemplateResult | typeof nothing {
    return nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-option__container">
        <div class="sbb-option">
          ${this.renderIcon()}
          <span class="sbb-option__label">
            <slot @slotchange=${this.setupHighlightHandler}></slot>
            ${this.renderLabel()}
            ${inertAriaGroups && this.getAttribute('data-group-label')
              ? html` <sbb-screen-reader-only>
                  (${this.getAttribute('data-group-label')})</sbb-screen-reader-only
                >`
              : nothing}
          </span>
          ${this.renderTick()}
        </div>
      </div>
    `;
  }
}
