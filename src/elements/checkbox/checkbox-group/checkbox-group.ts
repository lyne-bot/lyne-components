import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getNextElementIndex, interactivityChecker, isArrowKeyPressed } from '../../core/a11y.js';
import { forceType, slotState } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import type { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces.js';
import { SbbDisabledMixin } from '../../core/mixins.js';
import type { SbbCheckboxPanelElement } from '../checkbox-panel.js';
import type { SbbCheckboxElement } from '../checkbox.js';
import type { SbbCheckboxSize } from '../common.js';

import style from './checkbox-group.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-checkbox`.
 *
 * @slot - Use the unnamed slot to add `sbb-checkbox` elements to the `sbb-checkbox-group`.
 * @slot error - Slot used to render a `sbb-form-error` inside the `sbb-checkbox-group`.
 */
export
@customElement('sbb-checkbox-group')
@slotState()
class SbbCheckboxGroupElement extends SbbDisabledMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** Whether the checkbox group is required. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor required: boolean = false;

  /**
   * Size variant, either m, s or xs.
   * @default 'm' / 'xs' (lean)
   */
  @property() public accessor size: SbbCheckboxSize = isLean() ? 'xs' : 'm';

  /** Overrides the behaviour of `orientation` property. */
  @property({ attribute: 'horizontal-from', reflect: true })
  public accessor horizontalFrom: SbbHorizontalFrom | null = null;

  /** Indicates the orientation of the checkboxes inside the `<sbb-checkbox-group>`. */
  @property({ reflect: true })
  public accessor orientation: SbbOrientation = 'horizontal';

  /** List of contained checkbox elements. */
  public get checkboxes(): (SbbCheckboxElement | SbbCheckboxPanelElement)[] {
    return <(SbbCheckboxElement | SbbCheckboxPanelElement)[]>(
      Array.from(this.querySelectorAll?.('sbb-checkbox, sbb-checkbox-panel') ?? []).filter(
        (el) => el.closest('sbb-checkbox-group') === this,
      )
    );
  }

  public constructor() {
    super();
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.toggleAttribute(
      'data-has-panel',
      !!this.querySelector?.('sbb-selection-expansion-panel, sbb-checkbox-panel'),
    );
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('disabled')) {
      this.checkboxes.forEach((c) => c.requestUpdate?.('disabled'));
    }
    if (changedProperties.has('required')) {
      this.checkboxes.forEach((c) => c.requestUpdate?.('required'));
    }
    if (changedProperties.has('size')) {
      this.checkboxes.forEach((c) => c.requestUpdate?.('size'));
    }
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledCheckboxes: (SbbCheckboxElement | SbbCheckboxPanelElement)[] =
      this.checkboxes.filter(
        (checkbox: SbbCheckboxElement | SbbCheckboxPanelElement) =>
          !checkbox.disabled && interactivityChecker.isVisible(checkbox as HTMLElement),
      );

    if (
      !enabledCheckboxes ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this &&
        (evt.target as HTMLElement).parentElement !== this &&
        (evt.target as HTMLElement).parentElement!.localName !== 'sbb-selection-expansion-panel')
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const current: number = enabledCheckboxes.findIndex(
        (e: SbbCheckboxElement | SbbCheckboxPanelElement) => e === evt.target,
      );
      const nextIndex: number = getNextElementIndex(evt, current, enabledCheckboxes.length);
      enabledCheckboxes[nextIndex]?.focus();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-checkbox-group">
        <slot></slot>
      </div>
      <div class="sbb-checkbox-group__error">
        <slot name="error"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-checkbox-group': SbbCheckboxGroupElement;
  }
}
