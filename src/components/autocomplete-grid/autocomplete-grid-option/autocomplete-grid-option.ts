import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbOptionBaseElement } from '../../core/base-elements/option-base-element';
import { hostAttributes } from '../../core/decorators';
import { EventEmitter } from '../../core/eventing';

import '../../icon';
import '../../screen-reader-only';
import style from './autocomplete-grid-option.scss?lit&inline';

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
@customElement('sbb-autocomplete-grid-option')
@hostAttributes({
  role: 'gridcell',
})
export class SbbAutocompleteGridOptionElement extends SbbOptionBaseElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectionChange: 'autocompleteOptionSelectionChange',
    optionSelected: 'autocompleteOptionSelected',
  } as const;

  protected optionId = `sbb-autocomplete-grid-option`;

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

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('active')) {
      this.closest?.('sbb-autocomplete-grid-row')?.toggleAttribute('data-active', this.active);
    }
    if (changedProperties.has('disabled')) {
      this.closest?.('sbb-autocomplete-grid-row')?.toggleAttribute(
        'data-disabled',
        this.disabled || this.disabledFromGroup,
      );
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

    this.negative = !!this.closest(
      // :is() selector not possible due to test environment
      `sbb-autocomplete-grid[negative],sbb-form-field[negative]`,
    );
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
