import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, isServer, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import {
  getFirstFocusableElement,
  IS_FOCUSABLE_QUERY,
  SbbFocusHandler,
  setModalityOnNextFocus,
} from '../../core/a11y.js';
import { SbbOpenCloseBaseElement } from '../../core/base-elements.js';
import {
  SbbLanguageController,
  SbbMediaQueryPointerCoarse,
  SbbEscapableOverlayController,
} from '../../core/controllers.js';
import { forceType, hostAttributes } from '../../core/decorators.js';
import { findReferencedElement, isZeroAnimationDuration } from '../../core/dom.js';
import { composedPathHasAttribute, EventEmitter } from '../../core/eventing.js';
import { i18nClosePopover } from '../../core/i18n.js';
import type { SbbOpenedClosedState } from '../../core/interfaces.js';
import { SbbHydrationMixin } from '../../core/mixins.js';
import {
  getElementPosition,
  isEventOnElement,
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
} from '../../core/overlay.js';

import style from './popover.scss?lit&inline';

import '../../button/secondary-button.js';

const VERTICAL_OFFSET = 16;
const HORIZONTAL_OFFSET = 32;

let nextId = 0;

const popoversRef = new Set<SbbPopoverElement>();
const pointerCoarse = isServer ? false : matchMedia(SbbMediaQueryPointerCoarse).matches;

/**
 * It displays contextual information within a popover.
 *
 * @slot - Use the unnamed slot to add content into the popover.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-popover` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-popover` is opened.
 * @event {CustomEvent<{ closeTarget: HTMLElement }>} willClose - Emits whenever the `sbb-popover` begins the closing
 * transition. Can be canceled.
 * @event {CustomEvent<{ closeTarget: HTMLElement }>} didClose - Emits whenever the `sbb-popover` is closed.
 * @cssprop [--sbb-popover-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-popover')
@hostAttributes({ popover: 'manual' })
class SbbPopoverElement extends SbbHydrationMixin(SbbOpenCloseBaseElement) {
  public static override styles: CSSResultGroup = style;

  /**
   * The element that will trigger the popover overlay.
   * Accepts both a string (id of an element) or an HTML element.
   */
  @property() public accessor trigger: string | HTMLElement | null = null;

  /** Whether the close button should be hidden. */
  @forceType()
  @property({ attribute: 'hide-close-button', type: Boolean })
  public accessor hideCloseButton: boolean = false;

  /** Whether the popover should be triggered on hover. */
  @forceType()
  @property({ attribute: 'hover-trigger', type: Boolean })
  public accessor hoverTrigger: boolean = false;

  /** Open the popover after a certain delay. */
  @forceType()
  @property({ attribute: 'open-delay', type: Number })
  public accessor openDelay: number = 0;

  /** Close the popover after a certain delay. */
  @forceType()
  @property({ attribute: 'close-delay', type: Number })
  public accessor closeDelay: number = 0;

  /** This will be forwarded as aria-label to the close button element. */
  @forceType()
  @property({ attribute: 'accessibility-close-label' })
  public accessor accessibilityCloseLabel: string = '';

  /** Emits whenever the `sbb-popover` begins the closing transition. */
  protected override willClose: EventEmitter<{ closeTarget?: HTMLElement }> = new EventEmitter(
    this,
    SbbPopoverElement.events.willClose,
    { cancelable: true },
  );

  /** Emits whenever the `sbb-popover` is closed. */
  protected override didClose: EventEmitter<{ closeTarget?: HTMLElement }> = new EventEmitter(
    this,
    SbbPopoverElement.events.didClose,
    { cancelable: true },
  );

  private _overlay!: HTMLDivElement;
  private _triggerElement?: HTMLElement | null;
  // The element which should receive focus after closing based on where in the backdrop the user clicks.
  private _nextFocusedElement?: HTMLElement;
  private _skipCloseFocus: boolean = false;
  private _popoverCloseElement?: HTMLElement;
  private _isPointerDownEventOnPopover?: boolean;
  private _popoverController!: AbortController;
  private _openStateController!: AbortController;
  private _sbbEscapableOverlayController = new SbbEscapableOverlayController(this);
  private _focusHandler = new SbbFocusHandler();
  private _hoverTrigger = false;
  private _openTimeout?: ReturnType<typeof setTimeout>;
  private _closeTimeout?: ReturnType<typeof setTimeout>;
  private _language = new SbbLanguageController(this);

  /** Opens the popover on trigger click. */
  public open(): void {
    if ((this.state !== 'closed' && this.state !== 'closing') || !this._overlay) {
      return;
    }

    if (!this.willOpen.emit()) {
      return;
    }

    // Close the other popovers
    for (const popover of Array.from(popoversRef)) {
      const state = popover.getAttribute('data-state') as SbbOpenedClosedState;
      if (state && (state === 'opened' || state === 'opening')) {
        popover.close();
      }
    }

    this.showPopover?.();
    this.state = 'opening';
    this.inert = true;
    this._setPopoverPosition();
    this._triggerElement?.setAttribute('aria-expanded', 'true');
    this._nextFocusedElement = undefined;
    this._skipCloseFocus = false;

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /** Closes the popover. */
  public close(target?: HTMLElement): void {
    if (this.state !== 'opened' && this.state !== 'opening') {
      return;
    }

    this._popoverCloseElement = target;
    if (!this.willClose.emit({ closeTarget: target })) {
      return;
    }

    this.state = 'closing';
    this.inert = true;
    this._triggerElement?.setAttribute('aria-expanded', 'false');

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-popover-animation-duration');
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.hidePopover?.();

    this._overlay?.firstElementChild?.scrollTo(0, 0);
    this._overlay?.removeAttribute('tabindex');

    if (!this._skipCloseFocus) {
      const elementToFocus = this._nextFocusedElement || this._triggerElement;

      setModalityOnNextFocus(elementToFocus);
      // To enable focusing other element than the trigger, we need to call focus() a second time.
      elementToFocus?.focus();
    }

    this._sbbEscapableOverlayController.disconnect();
    this.didClose.emit({ closeTarget: this._popoverCloseElement });
    this._openStateController?.abort();
    this._focusHandler.disconnect();
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this.inert = false;
    this._attachWindowEvents();
    this._sbbEscapableOverlayController.connect();
    this._setPopoverFocus();
    this._focusHandler.trap(this, {
      postFilter: (el) => el !== this._overlay,
    });
    this.didOpen.emit();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this.id) {
      this.id = this.id || `sbb-popover-${++nextId}`;
    }

    // Validate trigger element and attach event listeners
    this._configure();
    this.state = 'closed';
    popoversRef.add(this as SbbPopoverElement);
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('trigger') && this.trigger !== changedProperties.get('trigger')) {
      this._popoverController?.abort();
      this._openStateController?.abort();
      this._configure();
    }

    if (changedProperties.has('hoverTrigger')) {
      this._configure();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    if (this._hoverTrigger) {
      this._overlay.addEventListener('mouseenter', () => this._onOverlayMouseEnter());
      this._overlay.addEventListener('mouseleave', () => this._onOverlayMouseLeave());
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._popoverController?.abort();
    this._openStateController?.abort();
    this._focusHandler.disconnect();
    popoversRef.delete(this as SbbPopoverElement);
  }

  // Check if the trigger is valid and attach click event listeners.
  private _configure(): void {
    if (isServer) {
      return;
    } else if (this.hydrationRequired) {
      this.hydrationComplete.then(() => this._configure());
      return;
    }

    removeAriaOverlayTriggerAttributes(this._triggerElement);

    if (!this.trigger) {
      return;
    }

    this._triggerElement = findReferencedElement(this.trigger);

    if (!this._triggerElement) {
      return;
    }

    setAriaOverlayTriggerAttributes(this._triggerElement, 'dialog', this.id, this.state);

    // Check whether the trigger can be hovered. Some devices might interpret the media query (hover: hover) differently,
    // and not respect the fallback mechanism on the click. Therefore, the following is preferred to identify
    // all non-touchscreen devices.
    this._hoverTrigger = this.hoverTrigger && !pointerCoarse;

    this._popoverController?.abort();
    const { signal } = (this._popoverController = new AbortController());
    if (this._hoverTrigger) {
      this._triggerElement.addEventListener('mouseenter', this._onTriggerMouseEnter, { signal });
      this._triggerElement.addEventListener('mouseleave', this._onTriggerMouseLeave, { signal });

      this._triggerElement.addEventListener(
        'keydown',
        (evt: KeyboardEvent) => {
          if (evt.code === 'Space' || evt.code === 'Enter') {
            this.open();
          }
        },
        { signal },
      );
    } else {
      this._triggerElement.addEventListener(
        'click',
        () => {
          if (this.state === 'closed') {
            this.open();
          }
        },
        { signal },
      );
    }
  }

  private _attachWindowEvents(): void {
    this._openStateController = new AbortController();
    document.addEventListener('scroll', () => this._setPopoverPosition(), {
      passive: true,
      signal: this._openStateController.signal,
      // Without capture, other scroll contexts would not bubble to this event listener.
      // Capture allows us to react to all scroll contexts in this DOM.
      capture: true,
    });
    window.addEventListener('resize', () => this._setPopoverPosition(), {
      passive: true,
      signal: this._openStateController.signal,
    });
    // Close popover on backdrop click
    window.addEventListener('pointerdown', this._pointerDownListener, {
      signal: this._openStateController.signal,
    });
    window.addEventListener('pointerup', this._closeOnBackdropClick, {
      signal: this._openStateController.signal,
    });
  }

  // Close the popover on click of any element that has the 'sbb-popover-close' attribute.
  private _closeOnSbbPopoverCloseClick(event: Event): void {
    const closeElement = composedPathHasAttribute(event, 'sbb-popover-close', this);

    if (closeElement && !closeElement.hasAttribute('disabled')) {
      clearTimeout(this._closeTimeout);
      this.close(closeElement);
    }
  }

  // Check if the pointerdown event target is triggered on the popover.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnPopover = isEventOnElement(this._overlay, event);
  };

  // Close popover on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (!this._isPointerDownEventOnPopover && !isEventOnElement(this._overlay, event)) {
      this._nextFocusedElement = event
        .composedPath()
        .filter((el) => el instanceof window.HTMLElement)
        .find((el) => (el as HTMLElement).matches(IS_FOCUSABLE_QUERY)) as HTMLElement;
      clearTimeout(this._closeTimeout);
      this.close();
    }
  };

  private _onTriggerMouseEnter = (): void => {
    if (this.state === 'closed' || this.state === 'closing') {
      this._openTimeout = setTimeout(() => this.open(), this.openDelay);
    } else {
      clearTimeout(this._closeTimeout);
    }
  };

  private _onTriggerMouseLeave = (): void => {
    if (this.state === 'opened' || this.state === 'opening') {
      this._closeTimeout = setTimeout(() => this.close(), this.closeDelay);
    } else {
      clearTimeout(this._openTimeout);
    }
  };

  private _onOverlayMouseEnter = (): void => {
    if (this.state !== 'opening') {
      clearTimeout(this._closeTimeout);
    }
  };

  private _onOverlayMouseLeave = (): void => {
    if (this.state !== 'opening') {
      this._closeTimeout = setTimeout(() => this.close(), this.closeDelay);
    }
  };

  // Set popover position (x, y) to '0' once the popover is closed and the transition ended to prevent the
  // viewport from overflowing. And set the focus to the first focusable element once the popover is open.
  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onPopoverAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._handleClosing();
    }
  }

  // Set focus on the first focusable element.
  private _setPopoverFocus(): void {
    const firstFocusable =
      this.shadowRoot!.querySelector<HTMLElement>('[sbb-popover-close]') ||
      getFirstFocusableElement(
        Array.from(this.children).filter((e): e is HTMLElement => e instanceof window.HTMLElement),
      );
    if (firstFocusable) {
      setModalityOnNextFocus(firstFocusable);
      firstFocusable.focus();
    } else {
      this._overlay.setAttribute('tabindex', '0');
      setModalityOnNextFocus(this._overlay);
      this._overlay.focus();

      // When a blur occurs, we know that the popover has to be closed,
      // because there are no interactive elements inside the popover.
      // When a window/tab change occurs, a blur event is also fired. However, when the current window/tab
      // becomes active again, it focuses once again the popover.
      // Therefore, we cannot listen to the blur event only once.
      // To prevent accidentally closing the popover, we need to check for the window/tab state.
      // We can achieve this by using visibilityState, which only works with setTimeout().
      this._overlay.addEventListener(
        'blur',
        (): void => {
          setTimeout(() => {
            if (document.visibilityState !== 'hidden') {
              this._overlay?.removeAttribute('tabindex');
              if (this.state === 'opened' || this.state === 'opening') {
                this._skipCloseFocus = true;
              }
              this.close();
            }
          });
        },
        {
          signal: this._openStateController.signal,
        },
      );
    }
  }

  private _setPopoverPosition(): void {
    if (!this._overlay || !this._triggerElement) {
      return;
    }

    const popoverPosition = getElementPosition(
      this._overlay,
      this._triggerElement,
      this.shadowRoot!.querySelector('.sbb-popover__container')!,
      {
        verticalOffset: VERTICAL_OFFSET,
        horizontalOffset: HORIZONTAL_OFFSET,
        centered: true,
        responsiveHeight: true,
      },
    );
    this.setAttribute('data-position', popoverPosition.alignment.vertical);

    const arrowXPosition =
      this._triggerElement.getBoundingClientRect().left -
      popoverPosition.left +
      this._triggerElement.clientWidth / 2 -
      8; // half the size of the popover arrow

    this.style.setProperty('--sbb-popover-position-x', `${popoverPosition.left}px`);
    this.style.setProperty('--sbb-popover-position-y', `${popoverPosition.top}px`);
    this.style.setProperty('--sbb-popover-arrow-position-x', `${arrowXPosition}px`);
  }

  protected override render(): TemplateResult {
    const closeButton = html`
      <span class="sbb-popover__close">
        <sbb-secondary-button
          aria-label=${this.accessibilityCloseLabel || i18nClosePopover[this._language.current]}
          size="s"
          type="button"
          icon-name="cross-small"
          sbb-popover-close
        ></sbb-secondary-button>
      </span>
    `;

    return html`
      <div class="sbb-popover__container">
        <div
          @animationend=${this._onPopoverAnimationEnd}
          class="sbb-popover"
          role="tooltip"
          ${ref((el?: Element) => (this._overlay = el as HTMLDivElement))}
        >
          <div
            @click=${(event: Event) => this._closeOnSbbPopoverCloseClick(event)}
            class="sbb-popover__content"
          >
            ${!this.hideCloseButton && !this._hoverTrigger ? closeButton : nothing}
            <span>
              <slot>No content</slot>
            </span>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-popover': SbbPopoverElement;
  }
}
