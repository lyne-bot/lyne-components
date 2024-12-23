import { customElement } from 'lit/decorators.js';

import { getNextElementIndex } from '../core/a11y.js';
import { hostAttributes } from '../core/decorators.js';
import { isSafari } from '../core/dom.js';
import { setAriaComboBoxAttributes } from '../core/overlay.js';
import type { SbbOptGroupElement, SbbOptionElement } from '../option.js';

import { SbbAutocompleteBaseElement } from './autocomplete-base-element.js';

let nextId = 0;

/**
 * On Safari, the aria role 'listbox' must be on the host element, or else VoiceOver won't work at all.
 * On the other hand, JAWS and NVDA need the role to be "closer" to the options, or else optgroups won't work.
 */
const ariaRoleOnHost = isSafari;

/**
 * Combined with a native input, it displays a panel with a list of available options.
 *
 * @slot - Use the unnamed slot to add `sbb-option` or `sbb-optgroup` elements to the `sbb-autocomplete`.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-autocomplete` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-autocomplete` is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the `sbb-autocomplete` begins the closing transition. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits whenever the `sbb-autocomplete` is closed.
 * @cssprop [--sbb-autocomplete-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-autocomplete')
@hostAttributes({
  role: ariaRoleOnHost ? 'listbox' : null,
})
class SbbAutocompleteElement extends SbbAutocompleteBaseElement {
  protected overlayId = `sbb-autocomplete-${++nextId}`;
  protected panelRole = 'listbox';
  private _activeItemIndex = -1;

  protected get options(): SbbOptionElement[] {
    return Array.from(this.querySelectorAll?.('sbb-option') ?? []);
  }

  public constructor() {
    super();
    this.addEventListener?.('optionSelectionChange', (e: CustomEvent<void>) =>
      this.onOptionSelected(e),
    );
  }

  protected syncNegative(): void {
    this.querySelectorAll?.('sbb-divider').forEach((divider) => (divider.negative = this.negative));

    this.querySelectorAll?.<SbbOptionElement | SbbOptGroupElement>(
      'sbb-option, sbb-optgroup',
    ).forEach((element) => element.toggleAttribute('data-negative', this.negative));
  }

  protected openedPanelKeyboardInteraction(event: KeyboardEvent): void {
    if (this.state !== 'opened') {
      return;
    }

    switch (event.key) {
      case 'Escape':
      case 'Tab':
        this.close();
        break;

      case 'Enter':
        this.selectByKeyboard(event);
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        this.setNextActiveOption(event);
        break;
    }
  }

  protected selectByKeyboard(event: KeyboardEvent): void {
    event.preventDefault();
    const activeOption = this.options[this._activeItemIndex];

    if (activeOption) {
      activeOption.setSelectedViaUserInteraction(true);
    }
  }

  protected setNextActiveOption(event: KeyboardEvent): void {
    const filteredOptions = this.options.filter(
      (opt) => !opt.disabled && !opt.hasAttribute('data-group-disabled'),
    );

    // Get and activate the next active option
    const next = getNextElementIndex(event, this._activeItemIndex, filteredOptions.length);
    const nextActiveOption = filteredOptions[next];
    nextActiveOption.setActive(true);
    this.triggerElement?.setAttribute('aria-activedescendant', nextActiveOption.id);
    nextActiveOption.scrollIntoView({ block: 'nearest' });

    // Reset the previous active option
    const lastActiveOption = filteredOptions[this._activeItemIndex];
    if (lastActiveOption) {
      lastActiveOption.setActive(false);
    }

    this._activeItemIndex = next;
  }

  protected resetActiveElement(): void {
    const activeElement = this.options[this._activeItemIndex];

    if (activeElement) {
      activeElement.setActive(false);
    }
    this._activeItemIndex = -1;
    this.triggerElement?.removeAttribute('aria-activedescendant');
  }

  protected setTriggerAttributes(element: HTMLInputElement): void {
    setAriaComboBoxAttributes(element, ariaRoleOnHost ? this.id : this.overlayId, false);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete': SbbAutocompleteElement;
  }
}
