import { LitElement, CSSResultGroup, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { FocusTrap, assignId, setModalityOnNextFocus } from '../../core/a11y';
import { LanguageController, UpdateScheduler } from '../../core/common-behaviors';
import {
  ScrollHandler,
  isValidAttribute,
  findReferencedElement,
  setAttribute,
} from '../../core/dom';
import { EventEmitter, ConnectedAbortController } from '../../core/eventing';
import { i18nCloseNavigation } from '../../core/i18n';
import { AgnosticMutationObserver } from '../../core/observers';
import {
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
  isEventOnElement,
  SbbOverlayState,
  applyInertMechanism,
  removeInertMechanism,
} from '../../core/overlay';
import '../../button';

import style from './navigation.scss?lit&inline';

/** Configuration for the attribute to look at if a navigation section is displayed */
const navigationObserverConfig: MutationObserverInit = {
  subtree: true,
  attributeFilter: ['data-state'],
};

let nextId = 0;

/**
 * It displays a navigation menu, wrapping one or more `sbb-navigation-*` components.
 *
 * @slot - Use the unnamed slot to add `sbb-navigation-action` elements into the sbb-navigation menu.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-navigation` begins the opening transition.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-navigation` is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the `sbb-navigation` begins the closing transition.
 * @event {CustomEvent<void>} didClose - Emits whenever the `sbb-navigation` is closed.
 */
@customElement('sbb-navigation')
export class SbbNavigationElement extends UpdateScheduler(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;

  /**
   * The element that will trigger the navigation.
   * Accepts both a string (id of an element) or an HTML element.
   */
  @property()
  public set trigger(value: string | HTMLElement) {
    const oldValue = this._trigger;
    this._trigger = value;
    this._removeTriggerClickListener(this._trigger, oldValue);
  }
  public get trigger(): string | HTMLElement {
    return this._trigger;
  }
  private _trigger: string | HTMLElement = null;

  /**
   * This will be forwarded as aria-label to the close button element.
   */
  @property({ attribute: 'accessibility-close-label' }) public accessibilityCloseLabel:
    | string
    | undefined;

  /**
   * Whether the animation is enabled.
   */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  /**
   * The state of the navigation.
   */
  @state() private _state: SbbOverlayState = 'closed';

  /**
   * Whether a navigation section is displayed.
   */
  @state() private _activeNavigationSection: HTMLElement;

  /** Emits whenever the `sbb-navigation` begins the opening transition. */
  private _willOpen: EventEmitter<void> = new EventEmitter(
    this,
    SbbNavigationElement.events.willOpen,
  );

  /** Emits whenever the `sbb-navigation` is opened. */
  private _didOpen: EventEmitter<void> = new EventEmitter(
    this,
    SbbNavigationElement.events.didOpen,
  );

  /** Emits whenever the `sbb-navigation` begins the closing transition. */
  private _willClose: EventEmitter<void> = new EventEmitter(
    this,
    SbbNavigationElement.events.willClose,
  );

  /** Emits whenever the `sbb-navigation` is closed. */
  private _didClose: EventEmitter<void> = new EventEmitter(
    this,
    SbbNavigationElement.events.didClose,
  );

  private _navigation: HTMLDivElement;
  private _navigationContentElement: HTMLElement;
  private _triggerElement: HTMLElement;
  private _navigationController: AbortController;
  private _windowEventsController: AbortController;
  private _abort = new ConnectedAbortController(this);
  private _language = new LanguageController(this);
  private _focusTrap = new FocusTrap();
  private _scrollHandler = new ScrollHandler();
  private _isPointerDownEventOnNavigation: boolean;
  private _navigationObserver = new AgnosticMutationObserver((mutationsList: MutationRecord[]) =>
    this._onNavigationSectionChange(mutationsList),
  );
  private _navigationId = `sbb-navigation-${++nextId}`;

  /**
   * Opens the navigation.
   */
  public open(): void {
    if (this._state !== 'closed' || !this._navigation) {
      return;
    }

    this._willOpen.emit();
    this._state = 'opening';
    this.startUpdate();

    // Disable scrolling for content below the navigation
    this._scrollHandler.disableScroll();
    this._triggerElement?.setAttribute('aria-expanded', 'true');
  }

  /**
   * Closes the navigation.
   */
  public close(): void {
    if (this._state !== 'opened') {
      return;
    }

    this._willClose.emit();
    this._state = 'closing';
    this.startUpdate();
    this._triggerElement?.setAttribute('aria-expanded', 'false');
  }

  // Removes trigger click listener on trigger change.
  private _removeTriggerClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement,
  ): void {
    if (newValue !== oldValue) {
      this._navigationController?.abort();
      this._windowEventsController?.abort();
      this._configure(this.trigger);
    }
  }

  // Check if the trigger is valid and attach click event listeners.
  private _configure(trigger: string | HTMLElement): void {
    removeAriaOverlayTriggerAttributes(this._triggerElement);

    if (!trigger) {
      return;
    }

    this._triggerElement = findReferencedElement(trigger);

    if (!this._triggerElement) {
      return;
    }

    setAriaOverlayTriggerAttributes(
      this._triggerElement,
      'menu',
      this.id || this._navigationId,
      this._state,
    );
    this._navigationController?.abort();
    this._navigationController = new AbortController();
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._navigationController.signal,
    });
  }

  private _trapFocusFilter = (el: HTMLElement): boolean => {
    return el.nodeName === 'SBB-NAVIGATION-SECTION' && el.getAttribute('data-state') !== 'opened';
  };

  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this._state === 'opening') {
      this._state = 'opened';
      this._didOpen.emit();
      applyInertMechanism(this);
      this._focusTrap.trap(this, this._trapFocusFilter);
      this._attachWindowEvents();
      this._setNavigationFocus();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._state = 'closed';
      this._navigationContentElement.scrollTo(0, 0);
      setModalityOnNextFocus(this._triggerElement);
      removeInertMechanism();
      // To enable focusing other element than the trigger, we need to call focus() a second time.
      this._triggerElement?.focus();
      this._didClose.emit();
      this._windowEventsController?.abort();
      this._focusTrap.disconnect();

      // Enable scrolling for content below the navigation
      this._scrollHandler.enableScroll();
    }
    this.completeUpdate();
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    window.addEventListener('keydown', (event: KeyboardEvent) => this._onKeydownEvent(event), {
      signal: this._windowEventsController.signal,
    });
  }

  private _handleNavigationClose(event: Event): void {
    const composedPathElements = event
      .composedPath()
      .filter((el) => el instanceof window.HTMLElement);
    if (composedPathElements.some((el) => this._isCloseElement(el as HTMLElement))) {
      this.close();
    }
  }

  private _isCloseElement(element: HTMLElement): boolean {
    return (
      element.nodeName === 'A' ||
      (element.hasAttribute('sbb-navigation-close') && !isValidAttribute(element, 'disabled'))
    );
  }

  // Closes the navigation on "Esc" key pressed.
  private _onKeydownEvent(event: KeyboardEvent): void {
    if (this._state === 'opened' && event.key === 'Escape') {
      this.close();
    }
  }

  // Set focus on the first focusable element.
  private _setNavigationFocus(): void {
    const closeButton = this.shadowRoot.querySelector(
      '#sbb-navigation-close-button',
    ) as HTMLElement;
    setModalityOnNextFocus(closeButton);
    closeButton.focus();
  }

  // Check if the pointerdown event target is triggered on the navigation.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnNavigation =
      isEventOnElement(this._navigation, event) ||
      isEventOnElement(
        this.querySelector('sbb-navigation-section[data-state="opened"]')?.shadowRoot.querySelector(
          'nav.sbb-navigation-section',
        ) as HTMLElement,
        event,
      );
  };

  // Close navigation on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (!this._isPointerDownEventOnNavigation && !isEventOnElement(this._navigation, event)) {
      this.close();
    }
  };

  // Observe changes on navigation section data-state.
  private _onNavigationSectionChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if ((mutation.target as HTMLElement).nodeName === 'SBB-NAVIGATION-SECTION') {
        this._activeNavigationSection = this.querySelector(
          'sbb-navigation-section[data-state="opening"], sbb-navigation-section[data-state="opened"]',
        );
      }
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', (e) => this._handleNavigationClose(e), { signal });
    // Validate trigger element and attach event listeners
    this._configure(this.trigger);
    this._navigationObserver.observe(this, navigationObserverConfig);
    this.addEventListener('pointerup', (event) => this._closeOnBackdropClick(event), { signal });
    this.addEventListener('pointerdown', (event) => this._pointerDownListener(event), { signal });

    if (this._state === 'opened') {
      applyInertMechanism(this);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._navigationController?.abort();
    this._windowEventsController?.abort();
    this._focusTrap.disconnect();
    this._navigationObserver.disconnect();
    removeInertMechanism();
  }

  protected override render(): TemplateResult {
    const closeButton = html`
      <sbb-button
        id="sbb-navigation-close-button"
        class="sbb-navigation__close"
        aria-label=${this.accessibilityCloseLabel || i18nCloseNavigation[this._language.current]}
        aria-controls="sbb-navigation-overlay"
        variant="transparent"
        negative
        size="m"
        type="button"
        icon-name="cross-small"
        sbb-navigation-close
      ></sbb-button>
    `;

    setAttribute(this, 'role', 'navigation');
    setAttribute(this, 'data-has-navigation-section', !!this._activeNavigationSection);
    setAttribute(this, 'data-state', this._state);
    assignId(() => this._navigationId)(this);

    return html`
      <div class="sbb-navigation__container">
        <div
          id="sbb-navigation-overlay"
          @animationend=${(event: AnimationEvent) => this._onAnimationEnd(event)}
          class="sbb-navigation"
          ${ref((navigationRef) => (this._navigation = navigationRef as HTMLDivElement))}
        >
          <div class="sbb-navigation__header">${closeButton}</div>
          <div class="sbb-navigation__wrapper">
            <div
              class="sbb-navigation__content"
              ${ref((el) => (this._navigationContentElement = el as HTMLElement))}
            >
              <slot></slot>
            </div>
          </div>
        </div>
        <slot name="navigation-section"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation': SbbNavigationElement;
  }
}
