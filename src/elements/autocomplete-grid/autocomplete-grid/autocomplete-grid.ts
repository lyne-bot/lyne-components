import { customElement } from 'lit/decorators.js';

import { SbbAutocompleteBaseElement } from '../../autocomplete.js';
import { getNextElementIndex } from '../../core/a11y.js';
import { hostAttributes } from '../../core/decorators.js';
import { isSafari } from '../../core/dom.js';
import { setAriaComboBoxAttributes } from '../../core/overlay.js';
import type { SbbDividerElement } from '../../divider.js';
import type { SbbOptGroupElement } from '../../option.js';
import type { SbbAutocompleteGridButtonElement } from '../autocomplete-grid-button.js';
import { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option.js';
import type { SbbAutocompleteGridRowElement } from '../autocomplete-grid-row.js';

let nextId = 0;

/**
 * On Safari, the aria role 'listbox' must be on the host element, or else VoiceOver won't work at all.
 * On the other hand, JAWS and NVDA need the role to be "closer" to the options, or else optgroups won't work.
 */
const ariaRoleOnHost = isSafari;

/**
 * Combined with a native input, it displays a panel with a list of available options with connected buttons.
 *
 * @slot - Use the unnamed slot to add `sbb-autocomplete-grid-row` or `sbb-autocomplete-grid-optgroup` elements to the `sbb-autocomplete-grid`.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-autocomplete-grid` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-autocomplete-grid` is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the `sbb-autocomplete-grid` begins the closing transition. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits whenever the `sbb-autocomplete-grid` is closed.
 * @cssprop [--sbb-autocomplete-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-autocomplete-grid')
@hostAttributes({
  role: ariaRoleOnHost ? 'grid' : null,
})
class SbbAutocompleteGridElement extends SbbAutocompleteBaseElement {
  protected overlayId = `sbb-autocomplete-grid-${++nextId}`;
  protected panelRole = 'grid';
  private _activeItemIndex = -1;
  private _activeColumnIndex = 0;

  protected get options(): SbbAutocompleteGridOptionElement[] {
    return Array.from(this.querySelectorAll?.('sbb-autocomplete-grid-option') ?? []);
  }

  private get _row(): SbbAutocompleteGridRowElement[] {
    return (
      Array.from(this.querySelectorAll?.('sbb-autocomplete-grid-row')).filter(
        (row) => !row.hasAttribute('data-disabled'),
      ) ?? []
    );
  }

  public constructor() {
    super();
    this.addEventListener?.('autocompleteOptionSelectionChange', (e: CustomEvent<void>) =>
      this.onOptionSelected(e),
    );
  }

  protected syncNegative(): void {
    this.querySelectorAll?.<SbbDividerElement | SbbAutocompleteGridButtonElement>(
      'sbb-divider, sbb-autocomplete-grid-button',
    ).forEach((e) => (e.negative = this.negative));

    this.querySelectorAll?.<SbbAutocompleteGridOptionElement | SbbOptGroupElement>(
      'sbb-autocomplete-grid-row, sbb-autocomplete-grid-option, sbb-autocomplete-grid-optgroup',
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

      case 'ArrowRight':
      case 'ArrowLeft':
        this._setNextHorizontalActiveElement(event);
        break;
    }
  }

  /**
   * Select an element on 'Enter' keypress.
   *
   * Due to keyboard navigation code, the `_activeColumnIndex` is zero when an option is 'focused'
   * and greater than zero when a button is 'focused', so asking for `querySelectorAll(...)[this._activeColumnIndex]`
   * would always return a `SbbAutocompleteGridButtonElement`.
   */
  protected selectByKeyboard(event: KeyboardEvent): void {
    event.preventDefault();

    if (this._activeColumnIndex !== 0) {
      (
        this._row[this._activeItemIndex].querySelectorAll(
          'sbb-autocomplete-grid-option, sbb-autocomplete-grid-button',
        )[this._activeColumnIndex] as SbbAutocompleteGridButtonElement
      ).click();
    } else {
      this.options[this._activeItemIndex]?.setSelectedViaUserInteraction(true);
    }
  }

  protected setNextActiveOption(event: KeyboardEvent): void {
    const filteredOptions = this.options.filter(
      (opt) => !opt.disabled && !opt.hasAttribute('data-group-disabled'),
    );

    // Get and activate the next active option
    const next = getNextElementIndex(event, this._activeItemIndex, filteredOptions.length);
    if (isNaN(next)) {
      return;
    }
    const nextActiveOption = filteredOptions[next];
    nextActiveOption.setActive(true);
    this.triggerElement?.setAttribute('aria-activedescendant', nextActiveOption.id);
    nextActiveOption.scrollIntoView({ block: 'nearest' });

    // Reset the previous active option/button
    if (this._activeColumnIndex !== 0) {
      this._row[this._activeItemIndex]
        .querySelectorAll('sbb-autocomplete-grid-button')
        .forEach((e) => e.toggleAttribute('data-focus-visible', false));
    } else {
      const lastActiveOption = filteredOptions[this._activeItemIndex];
      if (lastActiveOption) {
        lastActiveOption.setActive(false);
      }
    }
    this._activeItemIndex = next;
    this._activeColumnIndex = 0;
  }

  private _setNextHorizontalActiveElement(event: KeyboardEvent): void {
    if (this._activeItemIndex < 0) {
      return;
    }

    const elementsInRow: (SbbAutocompleteGridOptionElement | SbbAutocompleteGridButtonElement)[] =
      Array.from(
        this._row[this._activeItemIndex].querySelectorAll<
          SbbAutocompleteGridOptionElement | SbbAutocompleteGridButtonElement
        >('sbb-autocomplete-grid-option, sbb-autocomplete-grid-button'),
      ).filter((el) => !el.disabled && !el.hasAttribute('data-group-disabled'));
    const next: number = getNextElementIndex(event, this._activeColumnIndex, elementsInRow.length);
    if (isNaN(next)) {
      return;
    }
    const nextElement: SbbAutocompleteGridOptionElement | SbbAutocompleteGridButtonElement =
      elementsInRow[next];
    if (nextElement instanceof SbbAutocompleteGridOptionElement) {
      nextElement.setActive(true);
    } else {
      nextElement.toggleAttribute('data-focus-visible', true);
    }

    const lastActiveElement: SbbAutocompleteGridOptionElement | SbbAutocompleteGridButtonElement =
      elementsInRow[this._activeColumnIndex];
    if (lastActiveElement instanceof SbbAutocompleteGridOptionElement) {
      lastActiveElement.setActive(false);
    } else {
      lastActiveElement.toggleAttribute('data-focus-visible', false);
    }
    this.triggerElement?.setAttribute('aria-activedescendant', nextElement.id);
    nextElement.scrollIntoView({ block: 'nearest' });
    this._activeColumnIndex = next;
  }

  protected resetActiveElement(): void {
    if (this._activeColumnIndex !== 0) {
      this._row[this._activeItemIndex]
        .querySelectorAll('sbb-autocomplete-grid-button')
        .forEach((e) => e.toggleAttribute('data-focus-visible', false));
    } else {
      const activeElement = this.options.filter(
        (opt) => !opt.disabled && !opt.hasAttribute('data-group-disabled'),
      )[this._activeItemIndex];
      if (activeElement) {
        activeElement.setActive(false);
      }
    }
    this._activeItemIndex = -1;
    this._activeColumnIndex = 0;
    this.triggerElement?.removeAttribute('aria-activedescendant');
  }

  protected setTriggerAttributes(element: HTMLInputElement): void {
    setAriaComboBoxAttributes(element, ariaRoleOnHost ? this.id : this.overlayId, false, 'grid');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid': SbbAutocompleteGridElement;
  }
}
