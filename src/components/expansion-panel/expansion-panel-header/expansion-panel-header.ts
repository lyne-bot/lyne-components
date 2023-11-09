import {
  actionElementHandlerAspect,
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
  EventEmitter,
  ConnectedAbortController,
} from '../../core/eventing';
import { resolveButtonRenderVariables } from '../../core/interfaces';
import { setAttribute, setAttributes, toggleDatasetEntry } from '../../core/dom';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SbbExpansionPanel } from '../expansion-panel';
import style from './expansion-panel-header.scss?lit&inline';
import '../../icon';

/**
 * It acts as a native `summary` tag for the `sbb-expansion-panel` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-expansion-panel-header`.
 * @slot icon - Slot used to render the `sbb-expansion-panel-header` icon.
 * @event {CustomEvent<void>} toggle-expanded - Notifies that the `sbb-expansion-panel` has to expand.
 */
@customElement('sbb-expansion-panel-header')
export class SbbExpansionPanelHeader extends LitElement {
  public static override styles: CSSResult = style;
  public static readonly events = {
    toggleExpanded: 'toggle-expanded',
  } as const;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name' }) public iconName?: string;

  /** Whether the button is disabled. */
  @property({ reflect: true, type: Boolean }) public disabled: boolean;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('icon');

  /** Notifies that the `sbb-expansion-panel` has to expand. */
  private _toggleExpanded: EventEmitter = new EventEmitter(
    this,
    SbbExpansionPanelHeader.events.toggleExpanded,
    {
      bubbles: true,
    },
  );
  private _abort = new ConnectedAbortController(this);

  private _handlerRepository = new HandlerRepository(
    this,
    actionElementHandlerAspect,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this._handlerRepository.connect();
    this.addEventListener('click', () => this._emitExpandedEvent(), { signal });
    this.addEventListener('mouseenter', () => this._onMouseMovement(true), { signal });
    this.addEventListener('mouseleave', () => this._onMouseMovement(false), { signal });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private _emitExpandedEvent(): void {
    if (!this.disabled) {
      this._toggleExpanded.emit();
    }
  }

  private _onMouseMovement(toggleDataAttribute: boolean): void {
    const parent: SbbExpansionPanel = this.closest('sbb-expansion-panel');
    // The `sbb.hover-mq` logic has been removed from scss, but it must be replicated to have the correct behavior on mobile.
    if (!toggleDataAttribute || (parent && window.matchMedia('(any-hover: hover)').matches)) {
      toggleDatasetEntry(parent, 'toggleHover', toggleDataAttribute);
    }
  }

  protected override render(): TemplateResult {
    const { hostAttributes } = resolveButtonRenderVariables(this);

    setAttributes(this, hostAttributes);
    setAttribute(this, 'slot', 'header');
    setAttribute(this, 'data-icon', !!(this.iconName || this._namedSlots.icon));

    return html`
      <span class="sbb-expansion-panel-header">
        <span class="sbb-expansion-panel-header__title">
          ${this.iconName || this._namedSlots.icon
            ? html`<span class="sbb-expansion-panel-header__icon">
                <slot name="icon"
                  >${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}
                </slot>
              </span>`
            : nothing}
          <slot></slot>
        </span>
        ${!this.disabled
          ? html`<span class="sbb-expansion-panel-header__toggle">
              <sbb-icon
                name="chevron-small-down-medium"
                class="sbb-expansion-panel-header__toggle-icon"
              >
              </sbb-icon>
            </span>`
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-expansion-panel-header': SbbExpansionPanelHeader;
  }
}
