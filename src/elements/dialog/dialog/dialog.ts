import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { getFirstFocusableElement, setModalityOnNextFocus } from '../../core/a11y.js';
import { isBreakpoint, isZeroAnimationDuration } from '../../core/dom.js';
import { overlayRefs, SbbOverlayBaseElement } from '../../overlay.js';
import type { SbbDialogActionsElement } from '../dialog-actions.js';
import type { SbbDialogTitleElement } from '../dialog-title.js';

import style from './dialog.scss?lit&inline';

import '../../screen-reader-only.js';

let nextId = 0;

/**
 * It displays an interactive overlay element.
 *
 * @slot - Use the unnamed slot to provide a `sbb-dialog-title`, `sbb-dialog-content` and an optional `sbb-dialog-actions`.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-dialog` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-dialog` is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the `sbb-dialog` begins the closing transition. Can be canceled.
 * @event {CustomEvent<SbbOverlayCloseEventDetails>} didClose - Emits whenever the `sbb-dialog` is closed.
 * @cssprop [--sbb-dialog-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-dialog')
class SbbDialogElement extends SbbOverlayBaseElement {
  public static override styles: CSSResultGroup = style;

  /** Backdrop click action. */
  @property({ attribute: 'backdrop-action' }) public accessor backdropAction: 'close' | 'none' =
    'close';

  /** Backdrop density. */
  @property({ attribute: 'backdrop', reflect: true }) public accessor backdrop:
    | 'opaque'
    | 'translucent' = 'opaque';

  // We use a timeout as a workaround to the "ResizeObserver loop completed with undelivered notifications" error.
  // For more details:
  // - https://github.com/WICG/resize-observer/issues/38#issuecomment-422126006
  // - https://github.com/juggle/resize-observer/issues/103#issuecomment-1711148285
  private _dialogContentResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => setTimeout(() => this._onContentResize()),
  });

  private _dialogTitleElement: SbbDialogTitleElement | null = null;
  private _dialogTitleHeight?: number;
  private _dialogContentElement: HTMLElement | null = null;
  private _dialogActionsElement: SbbDialogActionsElement | null = null;
  private _isPointerDownEventOnDialog: boolean = false;
  private _overflows: boolean = false;
  private _lastScroll = 0;
  private _dialogId = `sbb-dialog-${nextId++}`;
  protected closeAttribute: string = 'sbb-dialog-close';

  public constructor() {
    super();
    // Close dialog on backdrop click
    this.addEventListener?.('pointerdown', this._pointerDownListener);
    this.addEventListener?.('pointerup', this._closeOnBackdropClick);
  }

  /** Opens the component. */
  public open(): void {
    if (this.state !== 'closed') {
      return;
    }
    this.lastFocusedElement = document.activeElement as HTMLElement;

    // Initialize dialog elements
    this._dialogTitleElement = this.querySelector('sbb-dialog-title');
    this._dialogContentElement = this.querySelector('sbb-dialog-content')?.shadowRoot!
      .firstElementChild as HTMLElement;
    this._dialogActionsElement = this.querySelector('sbb-dialog-actions');

    this._syncNegative();

    if (!this.willOpen.emit()) {
      return;
    }

    this.showPopover?.();
    this.state = 'opening';

    // Add this dialog to the global collection
    overlayRefs.push(this as SbbDialogElement);
    this._dialogContentResizeObserver.observe(this._dialogContentElement);

    // Disable scrolling for content below the dialog
    this.scrollHandler.disableScroll();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this.isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  protected isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-dialog-animation-duration');
  }

  protected handleClosing(): void {
    this._setHideHeaderDataAttribute(false);
    this._dialogContentElement?.scrollTo(0, 0);
    this.state = 'closed';
    this.hidePopover?.();

    this.inertController.deactivate();
    setModalityOnNextFocus(this.lastFocusedElement);
    // Manually focus last focused element
    this.lastFocusedElement?.focus();
    this.openOverlayController?.abort();
    this.focusHandler.disconnect();
    if (this._dialogContentElement) {
      this._dialogContentResizeObserver.unobserve(this._dialogContentElement);
    }
    this.removeInstanceFromGlobalCollection();
    // Enable scrolling for content below the dialog if no dialog is open
    if (!overlayRefs.length) {
      this.scrollHandler.enableScroll();
    }
    this.sbbEscapableOverlayController.disconnect();
    this.didClose.emit({
      returnValue: this.returnValue,
      closeTarget: this.overlayCloseElement,
    });
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this.inertController.activate();
    this.sbbEscapableOverlayController.connect();
    this.attachOpenOverlayEvents();
    this.setOverlayFocus();
    // Use timeout to read label after focused element
    setTimeout(() =>
      this.setAriaLiveRefContent(
        this.accessibilityLabel || this._dialogTitleElement?.innerText.trim(),
      ),
    );
    this.focusHandler.trap(this);
    this.didOpen.emit();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    // Synchronize the negative state before the first opening to avoid a possible color flash if it is negative.
    this._dialogTitleElement = this.querySelector('sbb-dialog-title')!;
    this._syncNegative();
    super.firstUpdated(changedProperties);
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative')) {
      this._syncNegative();
    }
  }

  protected override attachOpenOverlayEvents(): void {
    super.attachOpenOverlayEvents();

    // If the content overflows, show/hide the dialog header on scroll.
    this._dialogContentElement?.addEventListener('scroll', () => this._onContentScroll(), {
      passive: true,
      signal: this.openOverlayController.signal,
    });
    window.addEventListener('resize', () => this._setHideHeaderDataAttribute(false), {
      signal: this.openOverlayController.signal,
    });
  }

  // Wait for dialog transition to complete.
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
      Array.from(this.children).filter((e): e is HTMLElement => e instanceof window.HTMLElement),
    );
    setModalityOnNextFocus(firstFocusable);
    firstFocusable?.focus();
  }

  private _syncNegative(): void {
    if (this._dialogTitleElement) {
      this._dialogTitleElement.negative = this.negative;
    }

    if (this._dialogActionsElement) {
      this._dialogActionsElement.toggleAttribute('data-negative', this.negative);
    }
  }

  private _onContentScroll(): void {
    if (!this._dialogContentElement) {
      return;
    }

    const hasVisibleHeader = this.dataset.hideHeader === undefined;

    // Check whether hiding the header would make the scrollbar disappear
    // and prevent the hiding animation if so.
    if (
      hasVisibleHeader &&
      this._dialogContentElement.clientHeight + this._dialogTitleHeight! >=
        this._dialogContentElement.scrollHeight
    ) {
      return;
    }

    const currentScroll = this._dialogContentElement.scrollTop;
    if (
      Math.round(currentScroll + this._dialogContentElement.clientHeight) >=
      this._dialogContentElement.scrollHeight
    ) {
      return;
    }
    // Check whether is scrolling down or up.
    if (currentScroll > 0 && this._lastScroll < currentScroll) {
      // Scrolling down
      this._setHideHeaderDataAttribute(true);
    } else {
      // Scrolling up
      this._setHideHeaderDataAttribute(false);
    }
    // `currentScroll` can be negative, e.g. on mobile; this is not allowed.
    this._lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }

  // Check if the pointerdown event target is triggered on the dialog.
  private _pointerDownListener = (event: PointerEvent): void => {
    if (this.backdropAction !== 'close') {
      return;
    }

    this._isPointerDownEventOnDialog = event
      .composedPath()
      .filter((e): e is HTMLElement => e instanceof window.HTMLElement)
      .some((target) => target.id === this._dialogId);
  };

  // Close dialog on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (this.backdropAction !== 'close') {
      return;
    }

    if (
      !this._isPointerDownEventOnDialog &&
      !event
        .composedPath()
        .filter((e): e is HTMLElement => e instanceof window.HTMLElement)
        .some((target) => target.id === this._dialogId)
    ) {
      this.close();
    }
  };

  private _setDialogHeaderHeight(): void {
    this._dialogTitleHeight = this._dialogTitleElement?.shadowRoot!.firstElementChild!.clientHeight;
    this.style.setProperty('--sbb-dialog-header-height', `${this._dialogTitleHeight}px`);
  }

  private _onContentResize(): void {
    this._setDialogHeaderHeight();
    // Check whether the content overflows and set the `overflows` attribute.
    this._overflows = this._dialogContentElement
      ? this._dialogContentElement?.scrollHeight > this._dialogContentElement?.clientHeight
      : false;
    this._setOverflowsDataAttribute();
  }

  private _setHideHeaderDataAttribute(value: boolean): void {
    const hideOnScroll = this._dialogTitleElement?.hideOnScroll ?? false;
    const hideHeader =
      typeof hideOnScroll === 'boolean'
        ? hideOnScroll
        : (isBreakpoint('zero', hideOnScroll, { includeMaxBreakpoint: true }) ?? false);
    this.toggleAttribute('data-hide-header', !hideHeader ? false : value);
    if (this._dialogTitleElement) {
      this._dialogTitleElement.toggleAttribute('data-hide-header', !hideHeader ? false : value);
    }
  }

  private _setOverflowsDataAttribute(): void {
    this.toggleAttribute('data-overflows', this._overflows);
    this._dialogTitleElement?.toggleAttribute('data-overflows', this._overflows);
    this._dialogActionsElement?.toggleAttribute('data-overflows', this._overflows);
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-dialog__container">
        <div @animationend=${this.onOverlayAnimationEnd} class="sbb-dialog" id=${this._dialogId}>
          <div
            @click=${(event: Event) => this.closeOnSbbOverlayCloseClick(event)}
            class="sbb-dialog__wrapper"
          >
            <slot></slot>
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
    'sbb-dialog': SbbDialogElement;
  }
}
