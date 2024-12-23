import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import { html, LitElement, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { slotState } from '../../core/decorators.js';
import { isAndroid, isSafari, setOrRemoveAttribute } from '../../core/dom.js';
import type { EventEmitter } from '../../core/eventing.js';
import { SbbDisabledMixin, SbbHydrationMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';

import '../../screen-reader-only.js';

let nextId = 0;

/**
 * On Safari, the groups labels are not read by VoiceOver.
 * To solve the problem, we remove the role="group" and add an hidden span containing the group name
 * TODO: We should periodically check if it has been solved and, if so, remove the property.
 */
const inertAriaGroups = isSafari;

/** Configuration for the attribute to look at if component is nested in an option group */
const optionObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-disabled', 'data-negative'],
};

export
@slotState()
abstract class SbbOptionBaseElement extends SbbDisabledMixin(
  SbbIconNameMixin(SbbHydrationMixin(LitElement)),
) {
  protected abstract optionId: string;

  /**
   * Value of the option.
   *
   * @description Developer note: In this case updating the attribute must be synchronous.
   * Due to this, it is implemented as a getter/setter and the attributeChangedCallback() handles the diff check.
   */
  @property()
  public set value(value: string) {
    this.setAttribute('value', `${value}`);
  }
  public get value(): string {
    return this.getAttribute('value') ?? '';
  }

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
  @state() protected accessor negative = false;

  /** Whether the component must be set disabled due disabled attribute on sbb-optgroup. */
  @state() protected accessor disabledFromGroup = false;

  @state() protected accessor label!: string;

  /** Disable the highlight of the label. */
  @state() protected accessor disableLabelHighlight: boolean = false;

  /** The portion of the highlighted label. */
  @state() private accessor _highlightString: string | null = null;

  @state() private accessor _inertAriaGroups = false;

  public constructor() {
    super();
    this.addEventListener?.('click', (e: MouseEvent) => this.selectByClick(e), {
      passive: true,
    });

    new MutationController(this, {
      config: optionObserverConfig,
      callback: (mutationsList) => this.onOptionAttributesChange(mutationsList),
    });

    if (inertAriaGroups) {
      if (this.hydrationRequired) {
        this.hydrationComplete.then(() => (this._inertAriaGroups = inertAriaGroups));
      } else {
        this._inertAriaGroups = inertAriaGroups;
      }
    }
  }

  public override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null,
  ): void {
    if (name !== 'value' || old !== value) {
      super.attributeChangedCallback(name, old, value);
    }
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
    if (this.hydrationRequired) {
      this.hydrationComplete.then(() => this.init());
    } else {
      this.init();
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('disabled')) {
      setOrRemoveAttribute(this, 'tabindex', isAndroid && !this.disabled && 0);
      this.updateAriaDisabled();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    // Init first select state because false would not call setter of selected property.
    this._updateAriaSelected();
  }

  protected abstract selectByClick(event: MouseEvent): void;
  protected abstract setAttributeFromParent(): void;

  protected updateDisableHighlight(disabled: boolean): void {
    this.disableLabelHighlight = disabled;
    this.toggleAttribute('data-disable-highlight', disabled);
  }

  /**
   * Whether the option is currently active.
   * @internal
   */
  public setActive(value: boolean): void {
    this.toggleAttribute('data-active', value);
  }

  protected init(): void {
    this.setAttributeFromParent();
  }

  protected updateAriaDisabled(): void {
    if (this.disabled || this.disabledFromGroup) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }

  private _updateAriaSelected(): void {
    this.setAttribute('aria-selected', `${this.selected}`);
  }

  /** Observe changes on data attributes and set the appropriate values. */
  protected onOptionAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this.disabledFromGroup = this.hasAttribute('data-group-disabled');
        this.updateAriaDisabled();
      } else if (mutation.attributeName === 'data-negative') {
        this.negative = this.hasAttribute('data-negative');
      }
    }
  }

  protected handleHighlightState(): void {
    const slotNodes = Array.from(this.childNodes ?? []).filter(
      (n) => n.nodeType !== Node.COMMENT_NODE && (!(n instanceof Element) || n.slot !== 'icon'),
    );
    const labelNodes = slotNodes.filter((el) => el.nodeType === Node.TEXT_NODE) as Text[];

    // Disable the highlight if the slot contain more than just text nodes.
    // We need to ignore template elements, as SSR adds a declarative shadow DOM
    // in the form of a template element.
    if (
      labelNodes.length === 0 ||
      slotNodes.filter((n) => !(n instanceof Element) || n.localName !== 'template').length !==
        labelNodes.length
    ) {
      this.updateDisableHighlight(true);
      return;
    }
    this.label = labelNodes
      .map((l) => l.wholeText)
      .filter((l) => l.trim())
      .join();
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

  private _handleSlotChange(): void {
    this.handleHighlightState();
    /** @internal */
    this.dispatchEvent(new Event('optionLabelChanged', { bubbles: true }));
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-option__container">
        <div class="sbb-option">
          ${this.renderIcon()}
          <span class="sbb-option__label">
            <slot @slotchange=${this._handleSlotChange}></slot>
            ${this.renderLabel()}
            ${this._inertAriaGroups && this.getAttribute('data-group-label')
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
