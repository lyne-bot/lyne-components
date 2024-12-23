import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { SbbCheckboxGroupElement, SbbCheckboxPanelElement } from '../checkbox.js';
import { SbbLanguageController } from '../core/controllers.js';
import { forceType, slotState } from '../core/decorators.js';
import { isZeroAnimationDuration } from '../core/dom.js';
import { EventEmitter } from '../core/eventing.js';
import { i18nCollapsed, i18nExpanded } from '../core/i18n.js';
import type { SbbOpenedClosedState, SbbStateChange } from '../core/interfaces.js';
import { SbbHydrationMixin } from '../core/mixins.js';
import type { SbbRadioButtonGroupElement, SbbRadioButtonPanelElement } from '../radio-button.js';

import style from './selection-expansion-panel.scss?lit&inline';

import '../divider.js';

/**
 * It displays an expandable panel connected to a `sbb-checkbox` or to a `sbb-radio-button`.
 *
 * @slot - Use the unnamed slot to add `sbb-checkbox` or `sbb-radio-button` elements to the `sbb-selection-expansion-panel`.
 * @slot content - Use this slot to provide custom content for the panel (optional).
 * @event {CustomEvent<void>} willOpen - Emits whenever the content section starts the opening transition.
 * @event {CustomEvent<void>} didOpen - Emits whenever the content section is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the content section begins the closing transition.
 * @event {CustomEvent<void>} didClose - Emits whenever the content section is closed.
 */
export
@customElement('sbb-selection-expansion-panel')
@slotState()
class SbbSelectionExpansionPanelElement extends SbbHydrationMixin(LitElement) {
  // TODO: fix inheriting from SbbOpenCloseBaseElement requires: https://github.com/open-wc/custom-elements-manifest/issues/253
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;

  /** The background color of the panel. */
  @property() public accessor color: 'white' | 'milk' = 'white';

  /** Whether the content section is always visible. */
  @forceType()
  @property({ attribute: 'force-open', type: Boolean })
  public accessor forceOpen: boolean = false;

  /** Whether the unselected panel has a border. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor borderless: boolean = false;

  /** The state of the selection panel. */
  @state()
  private set _state(state: SbbOpenedClosedState) {
    this.setAttribute('data-state', state);
  }
  private get _state(): SbbOpenedClosedState {
    return this.getAttribute('data-state') as SbbOpenedClosedState;
  }

  /** Whether the selection panel is checked. */
  private set _checked(checked: boolean) {
    this.toggleAttribute('data-checked', checked);
  }
  private get _checked(): boolean {
    return this.hasAttribute('data-checked');
  }

  /** Whether the selection panel is disabled. */
  private set _disabled(disabled: boolean) {
    this.toggleAttribute('data-disabled', disabled);
  }

  /** Emits whenever the content section starts the opening transition. */
  private _willOpen: EventEmitter<void> = new EventEmitter(
    this,
    SbbSelectionExpansionPanelElement.events.willOpen,
    { cancelable: true },
  );

  /** Emits whenever the content section is opened. */
  private _didOpen: EventEmitter<void> = new EventEmitter(
    this,
    SbbSelectionExpansionPanelElement.events.didOpen,
    { cancelable: true },
  );

  /** Emits whenever the content section begins the closing transition. */
  private _willClose: EventEmitter<void> = new EventEmitter(
    this,
    SbbSelectionExpansionPanelElement.events.willClose,
    { cancelable: true },
  );

  /** Emits whenever the content section is closed. */
  private _didClose: EventEmitter<void> = new EventEmitter(
    this,
    SbbSelectionExpansionPanelElement.events.didClose,
    { cancelable: true },
  );

  private _language = new SbbLanguageController(this);
  private _initialized: boolean = false;
  private _sizeAttributeObserver = !isServer
    ? new MutationObserver((mutationsList: MutationRecord[]) =>
        this._onSizeAttributesChange(mutationsList),
      )
    : null;

  /** Whether it has an expandable content */
  private get _hasContent(): boolean {
    // We cannot use the NamedSlots because it's too slow to initialize
    return this.querySelectorAll?.('[slot="content"]').length > 0;
  }

  private get _group(): SbbRadioButtonGroupElement | SbbCheckboxGroupElement | null {
    return this.closest('sbb-radio-button-group, sbb-checkbox-group') as
      | SbbRadioButtonGroupElement
      | SbbCheckboxGroupElement;
  }

  public constructor() {
    super();
    this.addEventListener?.('panelConnected', (e) => this._initFromInput(e));
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this._state ||= 'closed';
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._sizeAttributeObserver?.disconnect();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('forceOpen')) {
      this._updateState();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._initialized = true;
  }

  private _updateState(): void {
    if (!this._hasContent) {
      return;
    }

    if (this.forceOpen || this._checked) {
      this._open();
    } else {
      this._close();
    }
    this._updateExpandedLabel(this.forceOpen || this._checked);
  }

  private _open(): void {
    if (this._state !== 'closed' && this._state !== 'closing') {
      return;
    }

    this._state = 'opening';
    this._willOpen.emit();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (!this._initialized || this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  private _close(): void {
    if (this._state !== 'opened' && this._state !== 'opening') {
      return;
    }

    this._state = 'closing';
    this._willClose.emit();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-selection-expansion-panel-animation-duration');
  }

  private _handleClosing(): void {
    this._state = 'closed';
    this._didClose.emit();
  }

  private _handleOpening(): void {
    this._state = 'opened';
    this._didOpen.emit();
  }

  private _initFromInput(event: Event): void {
    const input = event.target as SbbCheckboxPanelElement | SbbRadioButtonPanelElement;

    this._checked = input.checked;
    this._disabled = input.disabled;
    this._sizeAttributeObserver?.disconnect();
    // The size of the inner panel can change due direct change on the panel or due to change of the input-group size.
    this._sizeAttributeObserver?.observe(input, { attributeFilter: ['size'] });
    this._updateState();
  }

  /**
   * Set the data-size in two cases:
   * - if there's no group, so the size change comes directly from a change on the inner panel;
   * - if there's a wrapper group and its size changes, syncing it with the panel size.
   *
   * On the other hand, if there's a wrapper group and the size changes on the inner panel, the data-size doesn't change.
   */
  private _onSizeAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'size') {
        const group = this._group;
        const size = (mutation.target as HTMLElement).getAttribute('size')!;
        if (!group || group.size === size) {
          this.setAttribute('data-size', size);
        }
      }
    }
  }

  private _onInputStateChange(event: CustomEvent<SbbStateChange>): void {
    if (event.detail.type === 'disabled') {
      this._disabled = event.detail.disabled;
      return;
    } else if (event.detail.type !== 'checked') {
      return;
    }

    this._checked = event.detail.checked;
    this._updateState();
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open-opacity' && this._state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._handleClosing();
    }
  }

  private async _updateExpandedLabel(open: boolean): Promise<void> {
    await this.hydrationComplete;

    const panelElement = this.querySelector<SbbRadioButtonPanelElement | SbbCheckboxPanelElement>(
      'sbb-radio-button-panel, sbb-checkbox-panel',
    );
    if (!panelElement) {
      return;
    }

    if (!this._hasContent) {
      panelElement.expansionState = '';
      return;
    }

    panelElement.expansionState = open
      ? ', ' + i18nExpanded[this._language.current]
      : ', ' + i18nCollapsed[this._language.current];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-selection-expansion-panel">
        <div class="sbb-selection-expansion-panel__input" @stateChange=${this._onInputStateChange}>
          <slot></slot>
        </div>
        <div
          class="sbb-selection-expansion-panel__content--wrapper"
          ?inert=${this._state !== 'opened'}
          @animationend=${this._onAnimationEnd}
        >
          <div class="sbb-selection-expansion-panel__content">
            <sbb-divider></sbb-divider>
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-selection-expansion-panel': SbbSelectionExpansionPanelElement;
  }
}
