import type { CSSResultGroup, TemplateResult } from 'lit';
import { nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { getFirstFocusableElement, setModalityOnNextFocus } from '../core/a11y.js';
import { forceType } from '../core/decorators.js';
import { isZeroAnimationDuration } from '../core/dom.js';
import { EventEmitter, forwardEvent } from '../core/eventing.js';
import { i18nCloseDialog, i18nGoBack } from '../core/i18n.js';

import { overlayRefs, SbbOverlayBaseElement } from './overlay-base-element.js';
import style from './overlay.scss?lit&inline';

import '../button/secondary-button.js';
import '../button/transparent-button.js';
import '../container.js';
import '../screen-reader-only.js';

/**
 * It displays an interactive overlay element.
 *
 * @slot - Use the unnamed slot to provide a content for the overlay.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-overlay` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-overlay` is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the `sbb-overlay` begins the closing transition. Can be canceled.
 * @event {CustomEvent<SbbOverlayCloseEventDetails>} didClose - Emits whenever the `sbb-overlay` is closed.
 * @event {CustomEvent<void>} requestBackAction - Emits whenever the back button is clicked.
 * @cssprop [--sbb-overlay-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-overlay')
class SbbOverlayElement extends SbbOverlayBaseElement {
  public static override styles: CSSResultGroup = style;

  // TODO: fix using ...super.events requires: https://github.com/sbb-design-systems/lyne-components/issues/2600
  public static override readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
    backClick: 'requestBackAction',
  } as const;

  /**
   * Whether to allow the overlay content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor expanded: boolean = false;

  /** Whether a back button is displayed next to the title. */
  @forceType()
  @property({ attribute: 'back-button', type: Boolean })
  public accessor backButton: boolean = false;

  /** This will be forwarded as aria-label to the close button element. */
  @forceType()
  @property({ attribute: 'accessibility-close-label' })
  public accessor accessibilityCloseLabel: string = '';

  /** This will be forwarded as aria-label to the back button element. */
  @forceType()
  @property({ attribute: 'accessibility-back-label' })
  public accessor accessibilityBackLabel: string = '';

  protected closeAttribute: string = 'sbb-overlay-close';

  /** Emits whenever the back button is clicked. */
  private _backClick: EventEmitter<any> = new EventEmitter(
    this,
    SbbOverlayElement.events.backClick,
  );
  private _overlayContentElement: HTMLElement | null = null;

  /** Opens the component. */
  public open(): void {
    if (this.state !== 'closed') {
      return;
    }
    this.lastFocusedElement = document.activeElement as HTMLElement;

    this._overlayContentElement = this.shadowRoot?.querySelector(
      '.sbb-overlay__content',
    ) as HTMLElement;

    if (!this.willOpen.emit()) {
      return;
    }

    this.showPopover?.();
    this.state = 'opening';

    // Add this overlay to the global collection
    overlayRefs.push(this as SbbOverlayElement);

    // Disable scrolling for content below the overlay
    this.scrollHandler.disableScroll();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this.isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  protected isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-overlay-animation-duration');
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this.inertController.activate();
    this.attachOpenOverlayEvents();
    this.setOverlayFocus();
    // Use timeout to read label after focused element
    setTimeout(() => this.setAriaLiveRefContent(this.accessibilityLabel));
    this.focusHandler.trap(this);
    this.sbbOverlayController.connect();
    this.didOpen.emit();
  }

  protected override handleClosing(): void {
    this._overlayContentElement?.scrollTo(0, 0);
    this.state = 'closed';
    this.hidePopover?.();
    this.inertController.deactivate();
    setModalityOnNextFocus(this.lastFocusedElement);
    // Manually focus last focused element
    this.lastFocusedElement?.focus();
    this.openOverlayController?.abort();
    this.focusHandler.disconnect();
    this.removeInstanceFromGlobalCollection();
    // Enable scrolling for content below the overlay if no overlay is open
    if (!overlayRefs.length) {
      this.scrollHandler.enableScroll();
    }
    this.sbbOverlayController.disconnect();
    this.didClose.emit({
      returnValue: this.returnValue,
      closeTarget: this.overlayCloseElement,
    });
  }

  // Wait for overlay transition to complete.
  // In rare cases, it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  protected onOverlayAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this.handleClosing();
    }
  }

  // Set focus on the first focusable element.
  protected setOverlayFocus(): void {
    const firstFocusable = getFirstFocusableElement(
      Array.from(this.shadowRoot!.children).filter(
        (e): e is HTMLElement => e instanceof window.HTMLElement,
      ),
    );
    setModalityOnNextFocus(firstFocusable);
    firstFocusable?.focus();
  }

  protected override render(): TemplateResult {
    const TAG_NAME = this.negative ? 'sbb-transparent-button' : 'sbb-secondary-button';

    /* eslint-disable lit/binding-positions */
    const closeButton = html`
      <${unsafeStatic(TAG_NAME)}
        class="sbb-overlay__close"
        aria-label=${this.accessibilityCloseLabel || i18nCloseDialog[this.language.current]}
        ?negative=${this.negative}
        size="m"
        type="button"
        icon-name="cross-small"
        sbb-overlay-close
      ></${unsafeStatic(TAG_NAME)}>
    `;

    const backButton = html`
      <${unsafeStatic(TAG_NAME)}
        class="sbb-overlay__back"
        aria-label=${this.accessibilityBackLabel || i18nGoBack[this.language.current]}
        ?negative=${this.negative}
        size="m"
        type="button"
        icon-name="chevron-small-left-small"
        @click=${() => this._backClick.emit()}
      ></${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-enable lit/binding-positions */

    return html`
      <div class="sbb-overlay__container" @animationend=${this.onOverlayAnimationEnd}>
        <div class="sbb-overlay">
          <div
            @click=${(event: Event) => this.closeOnSbbOverlayCloseClick(event)}
            class="sbb-overlay__wrapper"
          >
            <div class="sbb-overlay__header">
              ${this.backButton ? backButton : nothing} ${closeButton}
            </div>
            <div class="sbb-overlay__content" @scroll=${(e: Event) => forwardEvent(e, document)}>
              <sbb-container
                class="sbb-overlay__content-container"
                ?expanded=${this.expanded}
                color="transparent"
              >
                <slot></slot>
              </sbb-container>
            </div>
          </div>
        </div>
      </div>
      <sbb-screen-reader-only aria-live="polite"></sbb-screen-reader-only>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-overlay': SbbOverlayElement;
  }
}
