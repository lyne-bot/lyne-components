import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import { SbbOptionBaseElement } from '../../option.js';

import style from './autocomplete-grid-option.scss?lit&inline';

export const autocompleteGridOptionId: string = `sbb-autocomplete-grid-option`;

/**
 * It displays an option item which can be used in `sbb-autocomplete-grid`.
 *
 * @slot - Use the unnamed slot to add content to the option label.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used.
 * @event {CustomEvent<void>} autocompleteOptionSelectionChange - Emits when the option selection status changes.
 * @event {CustomEvent<void>} autocompleteOptionSelected - Emits when an option was selected by user.
 * @cssprop [--sbb-option-icon-container-display=none] - Can be used to reserve space even
 * when preserve-icon-space on autocomplete is not set or iconName is not set.
 */
export
@customElement('sbb-autocomplete-grid-option')
@hostAttributes({
  role: 'gridcell',
})
class SbbAutocompleteGridOptionElement extends SbbOptionBaseElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectionChange: 'autocompleteOptionSelectionChange',
    optionSelected: 'autocompleteOptionSelected',
  } as const;

  protected optionId = autocompleteGridOptionId;

  /** Emits when the option selection status changes. */
  protected selectionChange: EventEmitter = new EventEmitter(
    this,
    SbbAutocompleteGridOptionElement.events.selectionChange,
  );

  /** Emits when an option was selected by user. */
  protected optionSelected: EventEmitter = new EventEmitter(
    this,
    SbbAutocompleteGridOptionElement.events.optionSelected,
  );

  protected override onOptionAttributesChange(mutationsList: MutationRecord[]): void {
    super.onOptionAttributesChange(mutationsList);
    this.closest?.('sbb-autocomplete-grid-row')?.toggleAttribute(
      'data-disabled',
      this.disabled || this.disabledFromGroup,
    );
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('disabled')) {
      this.closest?.('sbb-autocomplete-grid-row')?.toggleAttribute(
        'data-disabled',
        this.disabled || this.disabledFromGroup,
      );
      this.updateAriaDisabled();
    }
  }

  protected setAttributeFromParent(): void {
    const parentGroup = this.closest('sbb-autocomplete-grid-optgroup');
    if (parentGroup) {
      this.disabledFromGroup = parentGroup.disabled;
      this.updateAriaDisabled();
    }
    this.closest('sbb-autocomplete-grid-row')?.toggleAttribute(
      'data-disabled',
      this.disabled || this.disabledFromGroup,
    );

    this.negative = !!this.closest(`:is(sbb-autocomplete-grid[negative],sbb-form-field[negative])`);
    this.toggleAttribute('data-negative', this.negative);
  }

  protected selectByClick(event: MouseEvent): void {
    if (this.disabled || this.disabledFromGroup) {
      event.stopPropagation();
      return;
    }

    this.setSelectedViaUserInteraction(true);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-option': SbbAutocompleteGridOptionElement;
  }

  interface GlobalEventHandlersEventMap {
    autocompleteOptionSelectionChange: CustomEvent<void>;
  }
}
