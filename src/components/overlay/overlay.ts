import type { CSSResultGroup, TemplateResult } from 'lit';
import { nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { getFirstFocusableElement, setModalityOnNextFocus } from '../core/a11y.js';
import { EventEmitter } from '../core/eventing.js';
import { i18nCloseDialog, i18nGoBack } from '../core/i18n.js';
import { applyInertMechanism, removeInertMechanism } from '../core/overlay.js';
import { dialogRefs, SbbDialogBaseElement } from '../dialog.js';

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
 * @event {CustomEvent<SbbDialogCloseEventDetails>} didClose - Emits whenever the `sbb-overlay` is closed.
 * @event {CustomEvent<void>} requestBackAction - Emits whenever the back button is clicked.
 * @cssprop [--sbb-overlay-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@customElement('sbb-overlay')
export class SbbOverlayElement extends SbbDialogBaseElement {
  public static override styles: CSSResultGroup = style;

  // FIXME using { ...super.events, backClick: 'requestBackAction' } breaks the eslint missing-component-documentation-rule
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
  @property({ reflect: true, type: Boolean }) public expanded = false;

  /** Whether a back button is displayed next to the title. */
  @property({ attribute: 'back-button', type: Boolean }) public backButton = false;

  /** This will be forwarded as aria-label to the close button element. */
  @property({ attribute: 'accessibility-close-label' }) public accessibilityCloseLabel:
    | string
    | undefined;

  /** This will be forwarded as aria-label to the back button element. */
  @property({ attribute: 'accessibility-back-label' }) public accessibilityBackLabel:
    | string
    | undefined;

  protected closeAttribute: string = 'sbb-overlay-close';

  /** Emits whenever the back button is clicked. */
  private _backClick: EventEmitter<any> = new EventEmitter(
    this,
    SbbOverlayElement.events.backClick,
  );
  private _overlayContentElement: HTMLElement | null = null;

  /** Opens the overlay element. */
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
    this.state = 'opening';

    // Add this overlay to the global collection
    dialogRefs.push(this as SbbOverlayElement);

    // Disable scrolling for content below the overlay
    this.scrollHandler.disableScroll();
  }

  // Wait for overlay transition to complete.
  // In rare cases, it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  protected onDialogAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this.state = 'opened';
      this.didOpen.emit();
      applyInertMechanism(this);
      this.attachOpenDialogEvents();
      this.setDialogFocus();
      // Use timeout to read label after focused element
      setTimeout(() => this.setAriaLiveRefContent(this.accessibilityLabel));
      this.focusHandler.trap(this);
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._overlayContentElement?.scrollTo(0, 0);
      this.state = 'closed';
      removeInertMechanism();
      setModalityOnNextFocus(this.lastFocusedElement);
      // Manually focus last focused element
      this.lastFocusedElement?.focus();
      this.openDialogController?.abort();
      this.focusHandler.disconnect();
      this.removeInstanceFromGlobalCollection();
      // Enable scrolling for content below the overlay if no overlay is open
      !dialogRefs.length && this.scrollHandler.enableScroll();
      this.didClose.emit({
        returnValue: this.returnValue,
        closeTarget: this.dialogCloseElement,
      });
    }
  }

  // Set focus on the first focusable element.
  protected setDialogFocus(): void {
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
      <div class="sbb-overlay__container">
        <div
          @animationend=${(event: AnimationEvent) => this.onDialogAnimationEnd(event)}
          class="sbb-overlay"
        >
          <div
            @click=${(event: Event) => this.closeOnSbbDialogCloseClick(event)}
            class="sbb-overlay__wrapper"
          >
            <div class="sbb-overlay__header">
              ${this.backButton ? backButton : nothing} ${closeButton}
            </div>
            <div class="sbb-overlay__content">
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
