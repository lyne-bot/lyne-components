import { type CSSResultGroup, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import {
  getNextElementIndex,
  interactivityChecker,
  IS_FOCUSABLE_QUERY,
  isArrowKeyOrPageKeysPressed,
  SbbFocusHandler,
  setModalityOnNextFocus,
} from '../../core/a11y.js';
import { SbbOpenCloseBaseElement } from '../../core/base-elements.js';
import {
  SbbInertController,
  SbbMediaMatcherController,
  SbbMediaQueryBreakpointSmallAndBelow,
} from '../../core/controllers.js';
import { forceType, hostAttributes } from '../../core/decorators.js';
import {
  findReferencedElement,
  isZeroAnimationDuration,
  SbbScrollHandler,
} from '../../core/dom.js';
import { forwardEvent } from '../../core/eventing.js';
import { SbbNamedSlotListMixin } from '../../core/mixins.js';
import {
  getElementPosition,
  isEventOnElement,
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
} from '../../core/overlay.js';
import type { SbbMenuButtonElement } from '../menu-button.js';
import type { SbbMenuLinkElement } from '../menu-link.js';

import style from './menu.scss?lit&inline';

const MENU_OFFSET = 8;
const INTERACTIVE_ELEMENTS = [
  'A',
  'BUTTON',
  'SBB-BUTTON',
  'SBB-BUTTON-LINK',
  'SBB-LINK',
  'SBB-BLOCK-LINK',
  'SBB-LINK-BUTTON',
  'SBB-BLOCK-LINK-BUTTON',
];

let nextId = 0;

/**
 * It displays a contextual menu with one or more action element.
 *
 * @slot - Use the unnamed slot to add `sbb-menu-button`/`sbb-menu-link` or other elements to the menu.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-menu` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-menu` is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the `sbb-menu` begins the closing transition. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits whenever the `sbb-menu` is closed.
 * @cssprop [--sbb-menu-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-menu')
@hostAttributes({
  popover: 'manual',
})
class SbbMenuElement extends SbbNamedSlotListMixin<
  SbbMenuButtonElement | SbbMenuLinkElement,
  typeof SbbOpenCloseBaseElement
>(SbbOpenCloseBaseElement) {
  public static override styles: CSSResultGroup = style;
  protected override readonly listChildLocalNames = ['sbb-menu-button', 'sbb-menu-link'];

  /**
   * The element that will trigger the menu overlay.
   * Accepts both a string (id of an element) or an HTML element.
   */
  @property()
  public set trigger(value: string | HTMLElement | null) {
    const oldValue = this._trigger;
    this._trigger = value;
    this._removeTriggerClickListener(this._trigger, oldValue);
  }
  public get trigger(): string | HTMLElement | null {
    return this._trigger;
  }
  private _trigger: string | HTMLElement | null = null;

  /**
   * This will be forwarded as aria-label to the inner list.
   * Used only if the menu automatically renders the actions inside as a list.
   */
  @forceType()
  @property({ attribute: 'list-accessibility-label' })
  public accessor listAccessibilityLabel: string = '';

  private _menu!: HTMLDivElement;
  private _triggerElement: HTMLElement | null = null;
  private _isPointerDownEventOnMenu: boolean = false;
  private _menuController!: AbortController;
  private _windowEventsController!: AbortController;
  private _focusHandler = new SbbFocusHandler();
  private _scrollHandler = new SbbScrollHandler();
  private _inertController = new SbbInertController(this);
  private _mediaMatcher = new SbbMediaMatcherController(this, {
    [SbbMediaQueryBreakpointSmallAndBelow]: (matches) => {
      if (matches && (this.state === 'opening' || this.state === 'opened')) {
        this._scrollHandler.disableScroll();
      } else {
        this._scrollHandler.enableScroll();
      }
    },
  });

  public constructor() {
    super();
    this.addEventListener?.('click', (e) => this._onClick(e));
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
  }

  /**
   * Opens the menu on trigger click.
   */
  public open(): void {
    if (this.state === 'closing' || !this._menu) {
      return;
    }

    if (!this.willOpen.emit()) {
      return;
    }

    this.showPopover?.();
    this.state = 'opening';
    this._setMenuPosition();
    this._triggerElement?.setAttribute('aria-expanded', 'true');

    // From zero to medium, disable scroll
    if (this._mediaMatcher.matches(SbbMediaQueryBreakpointSmallAndBelow)) {
      this._scrollHandler.disableScroll();
    }

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /**
   * Closes the menu.
   */
  public close(): void {
    if (this.state === 'opening') {
      return;
    }

    if (!this.willClose.emit()) {
      return;
    }

    this.state = 'closing';
    this._triggerElement?.setAttribute('aria-expanded', 'false');

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-menu-animation-duration');
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this._inertController.activate();
    this._setMenuFocus();
    this._focusHandler.trap(this);
    this._attachWindowEvents();
    this.didOpen.emit();
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.hidePopover?.();

    this._menu?.firstElementChild?.scrollTo(0, 0);
    this._inertController.deactivate();
    setModalityOnNextFocus(this._triggerElement);
    // Manually focus last focused element
    this._triggerElement?.focus({
      // When inside the sbb-header, we prevent the scroll to avoid the snapping to the top of the page
      preventScroll:
        this._triggerElement.localName === 'sbb-header-button' ||
        this._triggerElement.localName === 'sbb-header-link',
    });
    this.didClose.emit();
    this._windowEventsController?.abort();
    this._focusHandler.disconnect();

    // Starting from breakpoint medium, enable scroll
    this._scrollHandler.enableScroll();
  }

  /**
   * Handles click and checks if its target is a sbb-menu-button/sbb-menu-link.
   */
  private _onClick(event: Event): void {
    const target = event.target as HTMLElement | undefined;
    if (target?.localName === 'sbb-menu-button' || target?.localName === 'sbb-menu-link') {
      this.close();
    }
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    if (!isArrowKeyOrPageKeysPressed(evt)) {
      return;
    }
    evt.preventDefault();

    const enabledActions: Element[] = Array.from(
      this.querySelectorAll<SbbMenuButtonElement | SbbMenuLinkElement>(
        'sbb-menu-button, sbb-menu-link',
      ),
    ).filter(
      (el) => (!el.disabled || el.disabledInteractive) && interactivityChecker.isVisible(el),
    );
    const current = enabledActions.findIndex((e: Element) => e === evt.target);

    let nextIndex;
    switch (evt.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        nextIndex = getNextElementIndex(evt, current, enabledActions.length);
        break;

      case 'PageUp':
      case 'Home':
        nextIndex = 0;
        break;

      case 'End':
      case 'PageDown':
        nextIndex = enabledActions.length - 1;
        break;

      // this should never happen since all the case allowed by `isArrowKeyOrPageKeysPressed` should be covered
      default:
        nextIndex = 0;
    }

    (enabledActions[nextIndex] as HTMLElement).focus();
  }

  // Closes the menu on "Esc" key pressed and traps focus within the menu.
  private async _onKeydownEvent(event: KeyboardEvent): Promise<void> {
    if (this.state !== 'opened') {
      return;
    }

    if (event.key === 'Escape') {
      this.close();
      return;
    }
  }

  // Removes trigger click listener on trigger change.
  private _removeTriggerClickListener(
    newValue: string | HTMLElement | null,
    oldValue: string | HTMLElement | null,
  ): void {
    if (newValue !== oldValue) {
      this._menuController?.abort();
      this._windowEventsController?.abort();
      this._configure(this.trigger);
    }
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    const renderRoot = super.createRenderRoot();
    // Due to the fact that menu can both be a list and just a container, we need to check its
    // state before the SbbNamedSlotListMixin handles the slotchange event, in order to avoid
    // it interpreting the non list case as a list.
    this.shadowRoot?.addEventListener('slotchange', (e) => this._checkListCase(e), {
      capture: true,
    });
    return renderRoot;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    // Validate trigger element and attach event listeners
    this._configure(this.trigger);
    if (this.isOpen) {
      this._inertController.activate();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._menuController?.abort();
    this._windowEventsController?.abort();
    this._focusHandler.disconnect();
    this._scrollHandler.enableScroll();
  }

  private _checkListCase(event: Event): void {
    // If all children are sbb-menu-button/menu-link instances, we render them as a list.
    if (
      this.children?.length &&
      Array.from(this.children ?? []).every(
        (c) => c.localName === 'sbb-menu-button' || c.localName === 'sbb-menu-link',
      )
    ) {
      return;
    }

    event.stopImmediatePropagation();
    if (this.listChildren.length) {
      this.listChildren.forEach((c) => c.removeAttribute('slot'));
      this.listChildren = [];
    }
  }

  // Check if the trigger is valid and attach click event listeners.
  private _configure(trigger: string | HTMLElement | null): void {
    removeAriaOverlayTriggerAttributes(this._triggerElement);

    if (!trigger) {
      return;
    }

    this._triggerElement = findReferencedElement(trigger);

    if (!this._triggerElement) {
      return;
    }

    this.id = this.id || `sbb-menu-${nextId++}`;
    setAriaOverlayTriggerAttributes(this._triggerElement, 'menu', this.id, this.state);
    this._menuController?.abort();
    this._menuController = new AbortController();
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._menuController.signal,
    });
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    document.addEventListener('scroll', () => this._setMenuPosition(), {
      passive: true,
      signal: this._windowEventsController.signal,
      // Without capture, other scroll contexts would not bubble to this event listener.
      // Capture allows us to react to all scroll contexts in this DOM.
      capture: true,
    });
    window.addEventListener('resize', () => this._setMenuPosition(), {
      passive: true,
      signal: this._windowEventsController.signal,
    });
    window.addEventListener('keydown', (event: KeyboardEvent) => this._onKeydownEvent(event), {
      signal: this._windowEventsController.signal,
    });

    // Close menu on backdrop click
    window.addEventListener('pointerdown', this._pointerDownListener, {
      signal: this._windowEventsController.signal,
    });
    window.addEventListener('pointerup', this._closeOnBackdropClick, {
      signal: this._windowEventsController.signal,
    });
  }

  // Close menu at any click on an interactive element inside the <sbb-menu> that bubbles to the container.
  private _closeOnInteractiveElementClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (INTERACTIVE_ELEMENTS.includes(target.nodeName) && !target.hasAttribute('disabled')) {
      this.close();
    }
  }

  // Check if the pointerdown event target is triggered on the menu.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnMenu = isEventOnElement(this._menu, event);
  };

  // Close menu on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (!this._isPointerDownEventOnMenu && !isEventOnElement(this._menu, event)) {
      this.close();
    }
  };

  // Set menu position (x, y) to '0' once the menu is closed and the transition ended to prevent the
  // viewport from overflowing. And set the focus to the first focusable element once the menu is open.
  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onMenuAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._handleClosing();
    }
  }

  // Set focus on the first focusable element.
  private _setMenuFocus(): void {
    const firstFocusable = this.querySelector(IS_FOCUSABLE_QUERY) as HTMLElement;
    setModalityOnNextFocus(firstFocusable);
    firstFocusable.focus();
  }

  // Set menu position and max height if the breakpoint is medium-ultra.
  private _setMenuPosition(): void {
    // Starting from breakpoint medium
    if (
      (this._mediaMatcher.matches(SbbMediaQueryBreakpointSmallAndBelow) ?? true) ||
      !this._menu ||
      !this._triggerElement ||
      this.state === 'closing'
    ) {
      return;
    }

    const menuPosition = getElementPosition(
      this.shadowRoot!.querySelector('.sbb-menu__content')!,
      this._triggerElement,
      this.shadowRoot!.querySelector('.sbb-menu__container')!,
      {
        verticalOffset: MENU_OFFSET,
      },
    );

    this.style.setProperty('--sbb-menu-position-x', `${menuPosition.left}px`);
    this.style.setProperty('--sbb-menu-position-y', `${menuPosition.top}px`);
    this.style.setProperty('--sbb-menu-max-height', menuPosition.maxHeight);
  }

  protected override render(): TemplateResult {
    // TODO: Handle case with other elements than sbb-menu-button/sbb-menu-link.
    return html`
      <div class="sbb-menu__container">
        <div
          @animationend=${this._onMenuAnimationEnd}
          class="sbb-menu"
          ${ref((el?: Element) => (this._menu = el as HTMLDivElement))}
        >
          <div
            @click=${(event: Event) => this._closeOnInteractiveElementClick(event)}
            @scroll=${(e: Event) => forwardEvent(e, document)}
            class="sbb-menu__content"
          >
            ${this.listChildren.length
              ? this.renderList({ class: 'sbb-menu-list', ariaLabel: this.listAccessibilityLabel })
              : html`<slot></slot>`}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-menu': SbbMenuElement;
  }
}
