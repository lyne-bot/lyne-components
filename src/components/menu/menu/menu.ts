import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import {
  FocusHandler,
  getNextElementIndex,
  interactivityChecker,
  IS_FOCUSABLE_QUERY,
  isArrowKeyPressed,
  setModalityOnNextFocus,
} from '../../core/a11y';
import { NamedSlotListElement } from '../../core/common-behaviors';
import {
  findReferencedElement,
  isBreakpoint,
  isValidAttribute,
  ScrollHandler,
  setAttribute,
} from '../../core/dom';
import { EventEmitter, ConnectedAbortController } from '../../core/eventing';
import type { SbbOverlayState } from '../../core/overlay';
import {
  applyInertMechanism,
  getElementPosition,
  isEventOnElement,
  removeAriaOverlayTriggerAttributes,
  removeInertMechanism,
  setAriaOverlayTriggerAttributes,
} from '../../core/overlay';
import type { SbbMenuActionElement } from '../menu-action';

import style from './menu.scss?lit&inline';

const MENU_OFFSET = 8;
const INTERACTIVE_ELEMENTS = ['A', 'BUTTON', 'SBB-BUTTON', 'SBB-LINK'];

let nextId = 0;

/**
 * It displays a contextual menu with one or more action element.
 *
 * @slot - Use the unnamed slot to add `sbb-menu-action` or other elements to the menu.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-menu` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-menu` is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the `sbb-menu` begins the closing transition. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits whenever the `sbb-menu` is closed.
 */
@customElement('sbb-menu')
export class SbbMenuElement extends NamedSlotListElement<SbbMenuActionElement> {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;
  protected override readonly listChildTagNames = ['SBB-MENU-ACTION'];

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
   * Whether the animation is enabled.
   */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  /**
   * This will be forwarded as aria-label to the inner list.
   * Used only if the menu automatically renders the actions inside as a list.
   */
  @property({ attribute: 'list-accessibility-label' }) public listAccessibilityLabel?: string;

  /**
   * The state of the menu.
   */
  @state() private _state: SbbOverlayState = 'closed';

  /** Emits whenever the `sbb-menu` starts the opening transition. */
  private _willOpen: EventEmitter<void> = new EventEmitter(this, SbbMenuElement.events.willOpen);

  /** Emits whenever the `sbb-menu` is opened. */
  private _didOpen: EventEmitter<void> = new EventEmitter(this, SbbMenuElement.events.didOpen);

  /** Emits whenever the `sbb-menu` begins the closing transition. */
  private _willClose: EventEmitter<void> = new EventEmitter(this, SbbMenuElement.events.willClose);

  /** Emits whenever the `sbb-menu` is closed. */
  private _didClose: EventEmitter<void> = new EventEmitter(this, SbbMenuElement.events.didClose);

  private _menu!: HTMLDivElement;
  private _triggerElement: HTMLElement | null = null;
  private _isPointerDownEventOnMenu: boolean = false;
  private _menuController!: AbortController;
  private _windowEventsController!: AbortController;
  private _abort = new ConnectedAbortController(this);
  private _focusHandler = new FocusHandler();
  private _scrollHandler = new ScrollHandler();

  public constructor() {
    super();
    /** @ignore id is already a well known property. */
    this.id = this.id || `sbb-menu-${nextId++}`;
  }

  /**
   * Opens the menu on trigger click.
   */
  public open(): void {
    if (this._state === 'closing' || !this._menu) {
      return;
    }

    if (!this._willOpen.emit()) {
      return;
    }

    this._state = 'opening';
    this._setMenuPosition();
    this._triggerElement?.setAttribute('aria-expanded', 'true');

    // Starting from breakpoint medium, disable scroll
    if (!isBreakpoint('medium')) {
      this._scrollHandler.disableScroll();
    }
  }

  /**
   * Closes the menu.
   */
  public close(): void {
    if (this._state === 'opening') {
      return;
    }

    if (!this._willClose.emit()) {
      return;
    }

    this._state = 'closing';
    this._triggerElement?.setAttribute('aria-expanded', 'false');
  }

  /**
   * Handles click and checks if its target is a sbb-menu-action.
   */
  private _onClick(event: Event): void {
    const target = event.target as HTMLElement | undefined;
    if (target?.tagName === 'SBB-MENU-ACTION') {
      this.close();
    }
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    if (!isArrowKeyPressed(evt)) {
      return;
    }
    evt.preventDefault();

    const enabledActions: Element[] = Array.from(this.querySelectorAll('sbb-menu-action')).filter(
      (el: HTMLElement) => el.tabIndex === 0 && interactivityChecker.isVisible(el),
    );

    const current = enabledActions.findIndex((e: Element) => e === evt.target);
    const nextIndex = getNextElementIndex(evt, current, enabledActions.length);

    (enabledActions[nextIndex] as HTMLElement).focus();
  }

  // Closes the menu on "Esc" key pressed and traps focus within the menu.
  private async _onKeydownEvent(event: KeyboardEvent): Promise<void> {
    if (this._state !== 'opened') {
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

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', (e) => this._onClick(e), { signal });
    this.addEventListener('keydown', (e) => this._handleKeyDown(e), { signal });
    // Validate trigger element and attach event listeners
    this._configure(this.trigger);

    if (this._state === 'opened') {
      applyInertMechanism(this);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._menuController?.abort();
    this._windowEventsController?.abort();
    this._focusHandler.disconnect();
    removeInertMechanism();
  }

  protected override checkChildren(): void {
    // If all children are sbb-menu-action instances, we render them as a list.
    if (
      this.children?.length &&
      Array.from(this.children ?? []).every((c) => c.tagName === 'SBB-MENU-ACTION')
    ) {
      super.checkChildren();
    } else if (this.listChildren.length) {
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

    setAriaOverlayTriggerAttributes(this._triggerElement, 'menu', this.id, this._state);
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
    if (INTERACTIVE_ELEMENTS.includes(target.nodeName) && !isValidAttribute(target, 'disabled')) {
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
    if (event.animationName === 'open' && this._state === 'opening') {
      this._state = 'opened';
      this._didOpen.emit();
      applyInertMechanism(this);
      this._setMenuFocus();
      this._focusHandler.trap(this);
      this._attachWindowEvents();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._state = 'closed';
      this._menu?.firstElementChild?.scrollTo(0, 0);
      removeInertMechanism();
      setModalityOnNextFocus(this._triggerElement);
      // Manually focus last focused element
      this._triggerElement?.focus({
        // When inside the sbb-header, we prevent the scroll to avoid the snapping to the top of the page
        preventScroll: this._triggerElement.tagName === 'SBB-HEADER-ACTION',
      });
      this._didClose.emit();
      this._windowEventsController?.abort();
      this._focusHandler.disconnect();

      // Starting from breakpoint medium, enable scroll
      this._scrollHandler.enableScroll();
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
      !isBreakpoint('medium') ||
      !this._menu ||
      !this._triggerElement ||
      this._state === 'closing'
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
    setAttribute(this, 'data-state', this._state);

    // TODO: Handle case with other elements than sbb-menu-action.
    return html`
      <div class="sbb-menu__container">
        <div
          @animationend=${(event: AnimationEvent) => this._onMenuAnimationEnd(event)}
          class="sbb-menu"
          ${ref((el?: Element) => (this._menu = el as HTMLDivElement))}
        >
          <div
            @click=${(event: Event) => this._closeOnInteractiveElementClick(event)}
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
