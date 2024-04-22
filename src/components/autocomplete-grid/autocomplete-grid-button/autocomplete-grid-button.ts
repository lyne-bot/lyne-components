import { type CSSResultGroup, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { SbbMiniButtonBaseElement } from '../../core/base-elements/index.js';
import { hostAttributes } from '../../core/decorators/index.js';
import { isValidAttribute, setAttribute } from '../../core/dom/index.js';
import { SbbDisabledMixin } from '../../core/mixins/index.js';
import { AgnosticMutationObserver } from '../../core/observers/index.js';
import { type SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option/index.js';

import '../../icon/index.js';
import style from './autocomplete-grid-button.scss?lit&inline';

/** Configuration for the attribute to look at if component is nested in a sbb-optgroup */
const buttonObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-disabled'],
};

/**
 * It displays an icon-only button that can be used in `sbb-autocomplete-grid`.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-autocomplete-grid-button')
@hostAttributes({
  tabindex: null,
})
export class SbbAutocompleteGridButtonElement extends SbbDisabledMixin(SbbMiniButtonBaseElement) {
  public static override styles: CSSResultGroup = style;

  /** Gets the SbbAutocompleteGridOptionElement on the same row of the button. */
  public get option(): SbbAutocompleteGridOptionElement | null {
    return (
      this.closest('sbb-autocomplete-grid-row')?.querySelector('sbb-autocomplete-grid-option') ||
      null
    );
  }

  /** Whether the component must be set disabled due disabled attribute on sbb-optgroup. */
  @state() private _disabledFromGroup = false;

  /** MutationObserver on data attributes. */
  private _optionAttributeObserver = new AgnosticMutationObserver((mutationsList) =>
    this._onOptionAttributesChange(mutationsList),
  );

  /** Observe changes on data attributes and set the appropriate values. */
  private _onOptionAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this._disabledFromGroup = isValidAttribute(this, 'data-group-disabled');
      }
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const parentGroup = this.closest('sbb-autocomplete-grid-optgroup');
    if (parentGroup) {
      this._disabledFromGroup = parentGroup.disabled;
    }
    this._optionAttributeObserver.observe(this, buttonObserverConfig);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._optionAttributeObserver.disconnect();
  }

  public dispatchClick(event: KeyboardEvent): void {
    return this.dispatchClickEvent(event);
  }

  // Event needs to be dispatched from the action element; in autocomplete-grid,
  // the input has always the focus, so the `event.target` on parent class is the input and not the button.
  protected override dispatchClickEvent(event: KeyboardEvent): void {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    this.dispatchEvent(
      new PointerEvent('click', {
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerId: -1,
        pointerType: '',
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
      }),
    );
  }

  protected override renderTemplate(): TemplateResult {
    setAttribute(this, 'aria-disabled', `${this.disabled || this._disabledFromGroup}`);
    return super.renderTemplate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-button': SbbAutocompleteGridButtonElement;
  }
}
