import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbOptionBaseElement } from '../../core/base-elements/option-base-element.js';
import { hostAttributes } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';

import '../../icon.js';
import '../../screen-reader-only.js';
import '../../visual-checkbox.js';

export type SbbOptionVariant = 'autocomplete' | 'select';

/**
 * It displays on option item which can be used in `sbb-select` or `sbb-autocomplete`.
 *
 * @slot - Use the unnamed slot to add content to the option label.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used.
 * @event {CustomEvent<void>} optionSelectionChange - Emits when the option selection status changes.
 * @event {CustomEvent<void>} optionSelected - Emits when an option was selected by user.
 * @cssprop [--sbb-option-icon-container-display=none] - Can be used to reserve space even
 * when preserve-icon-space on autocomplete is not set or iconName is not set.
 */
@customElement('sbb-option')
@hostAttributes({
  role: 'option',
})
export class SbbOptionElement extends SbbOptionBaseElement {
  public static readonly events = {
    selectionChange: 'optionSelectionChange',
    optionSelected: 'optionSelected',
  } as const;

  protected optionId = `sbb-option`;

  /** Emits when the option selection status changes. */
  protected selectionChange: EventEmitter = new EventEmitter(
    this,
    SbbOptionElement.events.selectionChange,
  );

  /** Emits when an option was selected by user. */
  protected optionSelected: EventEmitter = new EventEmitter(
    this,
    SbbOptionElement.events.optionSelected,
  );

  private set _variant(state: SbbOptionVariant) {
    this.setAttribute('data-variant', state);
  }
  private get _variant(): SbbOptionVariant {
    return this.getAttribute('data-variant') as SbbOptionVariant;
  }

  private get _isAutocomplete(): boolean {
    return this._variant === 'autocomplete';
  }

  private get _isSelect(): boolean {
    return this._variant === 'select';
  }

  private get _isMultiple(): boolean {
    return !!this.closest?.('sbb-select[multiple]');
  }

  protected setAttributeFromParent(): void {
    const parentGroup = this.closest?.('sbb-optgroup');
    if (parentGroup) {
      this.disabledFromGroup = parentGroup.disabled;
      this.updateAriaDisabled();
    }

    this.negative = !!this.closest?.(
      // :is() selector not possible due to test environment
      `sbb-autocomplete[negative],sbb-form-field[negative]`,
    );
    this.toggleAttribute('data-group-negative', this.negative);

    this.toggleAttribute('data-multiple', this._isMultiple);
  }

  protected selectByClick(event: MouseEvent): void {
    if (this.disabled || this.disabledFromGroup) {
      event.stopPropagation();
      return;
    }

    if (this._isMultiple) {
      event.stopPropagation();
      this.setSelectedViaUserInteraction(!this.selected);
    } else {
      this.setSelectedViaUserInteraction(true);
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._setVariantByContext();
    this.toggleAttribute('data-multiple', this._isMultiple);
  }

  private _setVariantByContext(): void {
    if (this.closest?.('sbb-autocomplete')) {
      this._variant = 'autocomplete';
    } else if (this.closest?.('sbb-select')) {
      this._variant = 'select';
    }
  }

  protected setupHighlightHandler(event: Event): void {
    if (!this._isAutocomplete) {
      this.updateDisableHighlight(true);
      return;
    }

    const slotNodes = (event.target as HTMLSlotElement).assignedNodes();
    const labelNodes = slotNodes.filter((el) => el.nodeType === Node.TEXT_NODE) as Text[];

    // Disable the highlight if the slot contain more than just text nodes
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

  protected override renderIcon(): TemplateResult {
    return html`
      <!-- Icon -->
      ${!this._isMultiple
        ? html` <span class="sbb-option__icon"> ${this.renderIconSlot()} </span>`
        : nothing}

      <!-- Checkbox -->
      ${this._isMultiple
        ? html`
            <sbb-visual-checkbox
              ?checked=${this.selected}
              ?disabled=${this.disabled || this.disabledFromGroup}
              ?negative=${this.negative}
            ></sbb-visual-checkbox>
          `
        : nothing}
    `;
  }

  protected override renderLabel(): TemplateResult | typeof nothing {
    return this._isAutocomplete && this.label && !this.disableLabelHighlight
      ? this.getHighlightedLabel()
      : nothing;
  }

  protected override renderTick(): TemplateResult | typeof nothing {
    return this._isSelect && !this._isMultiple && this.selected
      ? html`<sbb-icon name="tick-small"></sbb-icon>`
      : nothing;
  }

  protected override render(): TemplateResult {
    return super.render();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-option': SbbOptionElement;
  }

  interface GlobalEventHandlersEventMap {
    optionSelectionChange: CustomEvent<void>;
  }
}
