import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SbbFocusVisibleWithinController } from '../../core/a11y';
import { findReferencedElement, isBrowser } from '../../core/dom';
import { SbbHydrationMixin } from '../../core/mixins';

import style from './header.scss?lit&inline';

import '../../logo';

const IS_MENU_OPENED_QUERY = "[aria-controls][aria-expanded='true']";

/**
 * It displays a header section for the page.
 *
 * @slot - Use the unnamed slot to add actions or content to the header.
 * @slot logo - Slot used to render the logo on the right side (sbb-logo as default).
 * @cssprop [--sbb-header-z-index=10] - Can be used to modify the z-index of the header.
 * @cssprop [--sbb-header-height=zero-small:var(--sbb-spacing-fixed-14x);medium-ultra:var(--sbb-spacing-fixed-24x)] - Can be used to modify height of the header.
 */
@customElement('sbb-header')
export class SbbHeaderElement extends SbbHydrationMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /**
   * Whether to allow the header content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @property({ reflect: true, type: Boolean }) public expanded = false;

  /** The element's id or the element on which the scroll listener is attached. */
  @property({ attribute: 'scroll-origin' })
  public set scrollOrigin(value: string | HTMLElement | Document) {
    const oldValue = this._scrollOrigin;
    this._scrollOrigin = value;
    this._updateScrollOrigin(this._scrollOrigin, oldValue);
  }
  public get scrollOrigin(): string | HTMLElement | Document {
    return this._scrollOrigin;
  }
  private _scrollOrigin: string | HTMLElement | Document = isBrowser() ? document : null!;

  /** Whether the header should hide and show on scroll. */
  @property({ attribute: 'hide-on-scroll', reflect: true, type: Boolean }) public hideOnScroll =
    false;

  @state() private _headerOnTop = true;

  private _scrollElement: HTMLElement | Document | null | undefined;
  private _scrollEventsController!: AbortController;
  private _scrollFunction: (() => void) | undefined;
  private _lastScroll = 0;

  private _updateScrollOrigin(
    newValue: string | HTMLElement | Document,
    oldValue: string | HTMLElement | Document,
  ): void {
    if (newValue !== oldValue) {
      this._setListenerOnScrollElement(newValue);
      const currentScroll = this._getCurrentScrollProperty('scrollTop');
      // `currentScroll` can be negative, e.g. on mobile; this is not allowed.
      this._lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    }
  }

  /** If `hideOnScroll` is set, checks the element to hook the listener on, and possibly add it.*/
  public override connectedCallback(): void {
    super.connectedCallback();
    this._setListenerOnScrollElement(this.scrollOrigin);
    new SbbFocusVisibleWithinController(this);
  }

  /** Removes the scroll listener, if previously attached. */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._scrollEventsController?.abort();
  }

  /** Sets the value of `_scrollElement` and `_scrollFunction` and possibly adds the function on the correct element. */
  private _setListenerOnScrollElement(scrollOrigin: string | HTMLElement | Document): void {
    this._scrollEventsController?.abort();
    this._scrollEventsController = new AbortController();
    this._scrollElement =
      findReferencedElement(scrollOrigin as string | HTMLElement) ||
      (isBrowser() ? document : null);
    this._scrollFunction = this._getScrollFunction.bind(this);
    this._scrollElement?.addEventListener('scroll', this._scrollFunction, {
      passive: true,
      signal: this._scrollEventsController.signal,
    });
  }
  /** Returns the correct function to attach on scroll. */
  private _getScrollFunction(): void {
    return this.hideOnScroll ? this._scrollListener() : this._scrollShadowListener();
  }

  /** Returns the requested property of the scrollContext. */
  private _getCurrentScrollProperty(property: 'scrollTop' | 'scrollHeight'): number {
    if (this._scrollElement instanceof Document) {
      return this._scrollElement.documentElement[property] || this._scrollElement.body[property];
    }
    return this._scrollElement?.[property] || 0;
  }

  /**
   * Sets the correct value for `scrollTop`, then:
   * - apply the shadow if the element/document has been scrolled down;
   * - hides the header, remove the shadow and possibly close any open menu on the header if it is not visible anymore;
   * - shows the header and re-apply the shadow if the element/document has been scrolled up.
   */
  private _scrollListener(): void {
    const currentScroll = this._getCurrentScrollProperty('scrollTop');

    // Whether the scroll view is bouncing past the edge of content and back again.
    if (this._getCurrentScrollProperty('scrollHeight') - window.innerHeight - currentScroll <= 0) {
      return;
    }

    this.toggleAttribute('data-shadow', currentScroll !== 0);

    // Close open overlays when scrolling down if the header is scrolled out of sight.
    if (
      currentScroll > this.offsetHeight &&
      currentScroll > 0 &&
      this._lastScroll < currentScroll
    ) {
      this._closeOpenOverlays();
    }
    // Check if header is scrolled out of sight, scroll position > header height * 2.
    if (currentScroll > this.offsetHeight * 2) {
      this._headerOnTop = false;
      if (currentScroll > 0 && this._lastScroll < currentScroll) {
        // Scrolling down
        this.toggleAttribute('data-shadow', false);
        this.toggleAttribute('data-visible', false);
      } else {
        // Scrolling up
        this.toggleAttribute('data-fixed', true);
        this.toggleAttribute('data-shadow', true);
        this.toggleAttribute('data-animated', true);
        this.toggleAttribute('data-visible', true);
      }
    } else {
      // Check if header in its original position, scroll position < header height.
      // Reset header behaviour when scroll hits top of the page, on scroll position = 0.
      if (currentScroll === 0) {
        this._headerOnTop = true;
      }
      if (this._headerOnTop) {
        this.toggleAttribute('data-shadow', false);
        this.toggleAttribute('data-animated', false);
        this.toggleAttribute('data-fixed', false);
        this.toggleAttribute('data-visible', false);
      }
    }
    // `currentScroll` can be negative, e.g. on mobile; this is not allowed.
    this._lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }

  /** Apply the shadow if the element/document has been scrolled down. */
  private _scrollShadowListener(): void {
    this.toggleAttribute('data-shadow', this._getCurrentScrollProperty('scrollTop') !== 0);
  }

  private _closeOpenOverlays(): void {
    if (this.hasAttribute('data-has-visible-focus-within')) {
      return;
    }
    const overlayTriggers: HTMLElement[] = Array.from(
      this.querySelectorAll(IS_MENU_OPENED_QUERY) as NodeListOf<HTMLElement>,
    );
    for (const overlayTrigger of overlayTriggers) {
      const overlayId: string = overlayTrigger.getAttribute('aria-controls')!;
      const overlay = document.getElementById(overlayId) as HTMLElement & { close: () => void };
      if (typeof overlay?.close === 'function') {
        overlay.close();
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      <header class="sbb-header">
        <div class="sbb-header__wrapper">
          <slot></slot>
          <div class="sbb-header__logo">
            <slot name="logo">
              <sbb-logo protective-room="none"></sbb-logo>
            </slot>
          </div>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header': SbbHeaderElement;
  }
}
