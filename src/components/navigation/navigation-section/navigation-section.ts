import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import {
  assignId,
  getFirstFocusableElement,
  getFocusableElements,
  setModalityOnNextFocus,
} from '../../core/a11y';
import { SbbLanguageController, SbbSlotStateController } from '../../core/controllers';
import { hostAttributes } from '../../core/decorators';
import {
  findReferencedElement,
  isBreakpoint,
  isValidAttribute,
  setAttribute,
} from '../../core/dom';
import { i18nGoBack } from '../../core/i18n';
import { SbbUpdateSchedulerMixin } from '../../core/mixins';
import type { SbbOverlayState } from '../../core/overlay';
import {
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
} from '../../core/overlay';
import type { SbbNavigationElement } from '../navigation';
import type { SbbNavigationButtonElement } from '../navigation-button';
import type { SbbNavigationLinkElement } from '../navigation-link';
import '../../divider';
import '../../button/transparent-button';

import style from './navigation-section.scss?lit&inline';

let nextId = 0;

/**
 * It can be used as a container for `sbb-navigation-list` within a `sbb-navigation`.
 *
 * @slot - Use the unnamed slot to add content into the `sbb-navigation-section`.
 */
@customElement('sbb-navigation-section')
@hostAttributes({
  slot: 'navigation-section',
})
export class SbbNavigationSectionElement extends SbbUpdateSchedulerMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /**
   * The label to be shown before the action list.
   */
  @property({ attribute: 'title-content', reflect: true }) public titleContent?: string;

  /**
   * The element that will trigger the navigation section.
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
   * This will be forwarded as aria-label to the nav element and is read as a title of the navigation-section.
   */
  @property({ attribute: 'accessibility-label' }) public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-label to the back button element.
   */
  @property({ attribute: 'accessibility-back-label' }) public accessibilityBackLabel:
    | string
    | undefined;

  /**
   * Whether the animation is enabled.
   */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  /**
   * The state of the navigation section.
   */
  private set _state(state: SbbOverlayState) {
    this.setAttribute('data-state', state);
    setAttribute(this, 'aria-hidden', this._state !== 'opened' ? 'true' : null);
  }
  private get _state(): SbbOverlayState {
    return this.getAttribute('data-state') as SbbOverlayState;
  }

  private _firstLevelNavigation?: SbbNavigationElement | null = null;
  private _navigationSection!: HTMLElement;
  private _navigationSectionContainerElement!: HTMLElement;
  private _triggerElement: SbbNavigationButtonElement | null = null;
  private _navigationSectionController!: AbortController;
  private _windowEventsController!: AbortController;
  private _navigationSectionId = `sbb-navigation-section-${++nextId}`;
  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    new SbbSlotStateController(this);
  }

  /**
   * Opens the navigation section on trigger click.
   */
  public open(): void {
    if (this._state !== 'closed' || !this._navigationSection) {
      return;
    }

    this._setActiveNavigationAction();
    this._closePreviousNavigationSection();
    this._state = 'opening';
    this.startUpdate();
    this.inert = true;
    this._triggerElement?.setAttribute('aria-expanded', 'true');
  }

  private _setActiveNavigationAction(): void {
    this._triggerElement?.marker?.select(this._triggerElement);
  }

  private _closePreviousNavigationSection(): void {
    (this._firstLevelNavigation?.activeNavigationSection as SbbNavigationSectionElement)?.close();
  }

  /**
   * Closes the navigation section.
   */
  public close(): void {
    if (this._state !== 'opened') {
      return;
    }

    this._state = 'closing';
    this.startUpdate();
    this.inert = true;
    this._triggerElement?.setAttribute('aria-expanded', 'false');
  }

  // Removes trigger click listener on trigger change.
  private _removeTriggerClickListener(
    newValue: string | HTMLElement | null,
    oldValue: string | HTMLElement | null,
  ): void {
    if (newValue !== oldValue) {
      this._navigationSectionController?.abort();
      this._windowEventsController?.abort();
      this._configure(this.trigger);
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

    setAriaOverlayTriggerAttributes(
      this._triggerElement,
      'menu',
      this.id || this._navigationSectionId,
      this._state,
    );
    this._navigationSectionController?.abort();
    this._navigationSectionController = new AbortController();
    this._triggerElement.connectedSection = this;
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._navigationSectionController.signal,
    });
    this.addEventListener('keydown', (event) => this._handleNavigationSectionFocus(event), {
      signal: this._navigationSectionController.signal,
    });
  }

  private _setNavigationInert(): void {
    if (!this._firstLevelNavigation) {
      return;
    }
    (
      this._firstLevelNavigation!.shadowRoot!.querySelector(
        '.sbb-navigation__content',
      ) as HTMLElement
    ).inert = this._isZeroToLargeBreakpoint() && this._state !== 'closed';
  }

  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this._state === 'opening') {
      this._state = 'opened';
      this.inert = false;
      this._attachWindowEvents();
      this._setNavigationInert();
      this._setNavigationSectionFocus();
      this._checkActiveAction();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._state = 'closed';
      this._navigationSectionContainerElement.scrollTo(0, 0);
      this._windowEventsController?.abort();
      this._resetLists();
      this._setNavigationInert();
      if (this._isZeroToLargeBreakpoint() && this._triggerElement) {
        setModalityOnNextFocus(this._triggerElement);
        this._triggerElement.focus();
      }
    }
    this.completeUpdate();
  }

  private _resetLists(): void {
    const activeActions = Array.from(
      this.querySelectorAll('[data-section-action][data-action-active]'),
    ) as (SbbNavigationButtonElement | SbbNavigationLinkElement)[];
    activeActions?.forEach((action) => action.toggleAttribute('data-action-active', false));
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    window.addEventListener('keydown', (event: KeyboardEvent) => this._onKeydownEvent(event), {
      signal: this._windowEventsController.signal,
    });

    // Close navigation section on action click or sbb-navigation-section-close click
    window.addEventListener('click', this._handleNavigationSectionClose, {
      signal: this._windowEventsController.signal,
    });
  }

  // Check if the click was triggered on an element that should close the section.
  private _handleNavigationSectionClose = (event: Event): void => {
    const composedPathElements = event
      .composedPath()
      .filter((el) => el instanceof window.HTMLElement);
    if (composedPathElements.some((el) => this._isCloseElement(el as HTMLElement))) {
      this.close();
    }
  };

  private _isCloseElement(element: HTMLElement): boolean {
    return (
      element.nodeName === 'A' ||
      (!isValidAttribute(element, 'disabled') &&
        (element.hasAttribute('sbb-navigation-close') ||
          element.hasAttribute('sbb-navigation-section-close')))
    );
  }

  private _isZeroToLargeBreakpoint(): boolean {
    return isBreakpoint('zero', 'large');
  }

  // Closes the navigation on "Esc" key pressed.
  private _onKeydownEvent(event: KeyboardEvent): void {
    if (this._state === 'opened' && event.key === 'Escape') {
      this.close();
    }
  }

  // Set focus on the first focusable element.
  private _setNavigationSectionFocus(): void {
    const firstFocusableElement = getFirstFocusableElement(
      [this.shadowRoot!.querySelector('#sbb-navigation-section-back-button')]
        .concat(Array.from(this.children))
        .filter((e): e is HTMLElement => e instanceof window.HTMLElement),
    );
    if (firstFocusableElement) {
      setModalityOnNextFocus(firstFocusableElement);
      firstFocusableElement.focus();
    }
  }

  private _checkActiveAction(): void {
    (
      this.querySelector(
        ':is(sbb-navigation-button, sbb-navigation-link).sbb-active',
      ) as HTMLElement
    )?.toggleAttribute('data-action-active', true);
  }

  private _handleNavigationSectionFocus(event: KeyboardEvent): void {
    if (event.key !== 'Tab' || this._isZeroToLargeBreakpoint()) {
      return;
    }

    // Dynamically get first and last focusable element, as this might have changed since opening overlay
    const navigationChildren: HTMLElement[] = Array.from(
      this.closest('sbb-navigation')!.shadowRoot!.children,
    ) as HTMLElement[];
    const navigationFocusableElements = getFocusableElements(navigationChildren, {
      filter: (el) => el.nodeName !== 'SBB-NAVIGATION-SECTION',
    });

    const sectionChildren: HTMLElement[] = Array.from(this.shadowRoot!.children) as HTMLElement[];
    const sectionFocusableElements = getFocusableElements(sectionChildren);

    const firstFocusable = sectionFocusableElements[0] as HTMLElement;
    const lastFocusable = sectionFocusableElements[
      sectionFocusableElements.length - 1
    ] as HTMLElement;

    const elementToFocus = event.shiftKey
      ? this._triggerElement
      : navigationFocusableElements[navigationFocusableElements.indexOf(this._triggerElement!) + 1];
    const pivot = event.shiftKey ? firstFocusable : lastFocusable;

    if (
      !!elementToFocus &&
      ((firstFocusable.getRootNode() as Document | ShadowRoot).activeElement === pivot ||
        (lastFocusable.getRootNode() as Document | ShadowRoot).activeElement === pivot)
    ) {
      elementToFocus.focus();
      event.preventDefault();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._state = this._state || 'closed';
    // Validate trigger element and attach event listeners
    this._configure(this.trigger);
    this._firstLevelNavigation = this._triggerElement?.closest?.('sbb-navigation');
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._navigationSectionController?.abort();
    this._windowEventsController?.abort();
  }

  protected override render(): TemplateResult {
    assignId(() => this._navigationSectionId)(this);

    return html`
      <div
        class="sbb-navigation-section__container"
        ${ref((el?: Element) => (this._navigationSectionContainerElement = el as HTMLElement))}
      >
        <nav
          @animationend=${(event: AnimationEvent) => this._onAnimationEnd(event)}
          class="sbb-navigation-section"
          aria-labelledby=${!this.accessibilityLabel ? 'title' : nothing}
          aria-label=${this.accessibilityLabel ? this.accessibilityLabel : nothing}
          ${ref(
            (navigationSectionRef?: Element) =>
              (this._navigationSection = navigationSectionRef as HTMLElement),
          )}
        >
          <div class="sbb-navigation-section__wrapper">
            <div class="sbb-navigation-section__content">
              <div class="sbb-navigation-section__header">
                <!-- Back button -->
                <sbb-transparent-button
                  id="sbb-navigation-section-back-button"
                  class="sbb-navigation-section__back"
                  aria-label=${this.accessibilityBackLabel || i18nGoBack[this._language.current]}
                  negative
                  size="m"
                  type="button"
                  icon-name="chevron-small-left-small"
                  sbb-navigation-section-close
                ></sbb-transparent-button>

                <span class="sbb-navigation-section__title" id="title">
                  <slot name="title">${this.titleContent}</slot>
                </span>
              </div>
              <slot></slot>
            </div>
          </div>
        </nav>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-section': SbbNavigationSectionElement;
  }
}
