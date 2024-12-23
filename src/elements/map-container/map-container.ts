import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SbbLanguageController } from '../core/controllers.js';
import { forceType } from '../core/decorators.js';
import { forwardEvent } from '../core/eventing.js';
import { i18nMapContainerButtonLabel } from '../core/i18n.js';

import style from './map-container.scss?lit&inline';

import '../button/accent-button.js';

/**
 * It can be used as a container for maps.
 *
 * @slot - Use the unnamed slot to add content to the sidebar.
 * @slot map - Used for slotting the map.
 * @cssprop [--sbb-map-container-margin-start=var(--sbb-header-height)] - The component
 * comes along with a height calculation that subtracts the height of the header.
 * For specific use cases, this variable can be used to modify the preset height.
 * @cssprop [--sbb-map-container-sidebar-width=zero-large:400px;wide-ultra:480px] - Can be used
 * to modify the width of the left sidebar.
 * @cssprop [--sbb-map-container-mobile-sticky-block-start=0] - If e.g. a header with a fixed height
 * is placed before the map-container, the map should be sticky respecting
 * this offset from the document's top. Only applied on mobile views.
 * Most commonly it can be set to `var(--sbb-header-height)`.
 */
export
@customElement('sbb-map-container')
class SbbMapContainerElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Flag to show/hide the scroll up button inside the sidebar on mobile. */
  @forceType()
  @property({ attribute: 'hide-scroll-up-button', reflect: true, type: Boolean })
  public accessor hideScrollUpButton: boolean = false;

  @state() private accessor _scrollUpButtonVisible = false;

  private _language = new SbbLanguageController(this);
  private _observer = new IntersectionController(this, {
    target: null,
    callback: (entries) => this._toggleButtonVisibilityOnIntersect(entries),
  });

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('hideScrollUpButton')) {
      const intersectorElement = this._intersector();

      if (!this.hideScrollUpButton && intersectorElement) {
        this._observer.observe(intersectorElement);
      } else if (intersectorElement) {
        this._observer.unobserve(intersectorElement);
      }
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    if (!this.hideScrollUpButton) {
      this._observer.observe(this._intersector()!);
    }
  }

  private _intersector(): HTMLElement | null {
    return this.shadowRoot?.querySelector('#intersector') ?? null;
  }

  /**
   * Button click callback to trigger the scroll to container top
   * @private
   */
  private _onScrollButtonClick(): void {
    this.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Intersection callback. Toggles the visibility.
   * @param entries
   * @private
   */
  private _toggleButtonVisibilityOnIntersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const mapIsHidden = !entry.isIntersecting;
      this.toggleAttribute('data-scroll-up-button-visible', mapIsHidden);
      this._scrollUpButtonVisible = mapIsHidden;
    });
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-map-container">
        <div class="sbb-map-container__map">
          <slot name="map"></slot>
        </div>
        <div class="sbb-map-container__sidebar" @scroll=${(e: Event) => forwardEvent(e, document)}>
          <span id="intersector"></span>

          <slot></slot>

          ${!this.hideScrollUpButton
            ? html`<sbb-accent-button
                class="sbb-map-container__sidebar-button"
                size="l"
                icon-name="location-pin-map-small"
                type="button"
                @click=${() => this._onScrollButtonClick()}
                ?inert=${!this._scrollUpButtonVisible}
              >
                ${i18nMapContainerButtonLabel[this._language.current]}
              </sbb-accent-button>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-map-container': SbbMapContainerElement;
  }
}
