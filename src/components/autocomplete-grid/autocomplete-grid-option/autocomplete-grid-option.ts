import type { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbOptionBaseElement } from '../../core/base-elements/option-base-element';
import { hostAttributes } from '../../core/decorators';
import { EventEmitter } from '../../core/eventing';

import '../../icon';

/**
 * It displays on option item which can be used in `sbb-autocomplete-grid`.
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

  protected selectByClick(event: MouseEvent): void {
    if (this.disabled || this.disabledFromGroup) {
      event.stopPropagation();
      return;
    }

    this.setSelectedViaUserInteraction(true);
  }

  protected setupHighlightHandler(event: Event): void {
    const slotNodes = (event.target as HTMLSlotElement).assignedNodes();
    const labelNodes = slotNodes.filter((el) => el.nodeType === Node.TEXT_NODE) as Text[];

    // Disable the highlight if the slot contains more than just text nodes
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

  protected override render(): TemplateResult {
    return super.render();
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
