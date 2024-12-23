import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import { type CSSResultGroup, isServer, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbActionBaseElement } from '../../core/base-elements.js';
import { hostAttributes, slotState } from '../../core/decorators.js';
import { isEventPrevented } from '../../core/eventing.js';
import { SbbDisabledMixin, SbbNegativeMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';
import type { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option.js';

import style from './autocomplete-grid-button.scss?lit&inline';

let autocompleteButtonNextId = 0;

/** Configuration for the attribute to look at if component is nested in a sbb-optgroup */
const buttonObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-disabled'],
};

/**
 * It displays an icon-only button that can be used in `sbb-autocomplete-grid`.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
export
@customElement('sbb-autocomplete-grid-button')
@hostAttributes({
  role: 'button',
  tabindex: null,
  'data-button': '',
})
@slotState()
class SbbAutocompleteGridButtonElement extends SbbDisabledMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbActionBaseElement)),
) {
  public static override styles: CSSResultGroup = style;

  /** Gets the SbbAutocompleteGridOptionElement on the same row of the button. */
  public get option(): SbbAutocompleteGridOptionElement | null {
    return (
      this.closest('sbb-autocomplete-grid-row')?.querySelector('sbb-autocomplete-grid-option') ||
      null
    );
  }

  /** Whether the component must be set disabled due disabled attribute on sbb-optgroup. */
  private _disabledFromGroup = false;

  public constructor() {
    super();
    if (!isServer) {
      this.setupBaseEventHandlers();
      this.addEventListener('click', this._handleButtonClick);

      new MutationController(this, {
        config: buttonObserverConfig,
        callback: (mutationsList) => {
          for (const mutation of mutationsList) {
            if (mutation.attributeName === 'data-group-disabled') {
              this._disabledFromGroup = this.hasAttribute('data-group-disabled');
              this._updateAriaDisabled();
            }
          }
        },
      });
    }
  }

  protected override isDisabledExternally(): boolean {
    return this._disabledFromGroup ?? false;
  }

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-autocomplete-grid-button-${++autocompleteButtonNextId}`;
    const parentGroup = this.closest('sbb-autocomplete-grid-optgroup');
    if (parentGroup) {
      this._disabledFromGroup = parentGroup.disabled;
      this._updateAriaDisabled();
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('disabled')) {
      this._updateAriaDisabled();
    }
  }

  private _updateAriaDisabled(): void {
    if (this.disabled || this._disabledFromGroup) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }

  private _handleButtonClick = async (event: MouseEvent): Promise<void> => {
    if ((await isEventPrevented(event)) || !this.closest('form')) {
      return;
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-button': SbbAutocompleteGridButtonElement;
  }
}
