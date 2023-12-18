import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import {
  SbbFocusHandler,
  IS_FOCUSABLE_QUERY,
  setModalityOnNextFocus,
  sbbInputModalityDetector,
} from '../core/a11y';
import { SbbLanguageController, SbbSlotStateController } from '../core/controllers';
import { hostContext, isValidAttribute, SbbScrollHandler, setAttribute } from '../core/dom';
import { EventEmitter, throttle} from '../core/eventing';
import { i18nCloseDialog, i18nDialog, i18nGoBack } from '../core/i18n';
import { SbbNegativeMixin } from '../core/mixins';
import { AgnosticResizeObserver } from '../core/observers';
import type { SbbOverlayState } from '../core/overlay';
import { applyInertMechanism, removeInertMechanism } from '../core/overlay';
import type { SbbTitleLevel } from '../title';

import style from './dialog.scss?lit&inline';

import '../button/secondary-button';
import '../button/transparent-button';
import '../screen-reader-only';
import '../title';

// A global collection of existing dialogs
const dialogRefs: SbbDialogElement[] = [];
let nextId = 0;

/**
 * It displays an interactive overlay element.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-dialog`.
 * @slot title - Use this slot to provide a title.
 * @slot action-group - Use this slot to display a `sbb-action-group` in the footer.
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-dialog` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-dialog` is opened.
 * @event {CustomEvent<void>} willClose - Emits whenever the `sbb-dialog` begins the closing transition. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits whenever the `sbb-dialog` is closed.
 * @event {CustomEvent<void>} requestBackAction - Emits whenever the back button is clicked.
 * @cssprop [--sbb-dialog-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@customElement('sbb-dialog')
export class SbbDialogElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
    backClick: 'requestBackAction',
  } as const;

  /**
   * Dialog title.
   */
  @property({ attribute: 'title-content', reflect: true }) public titleContent?: string;

  /**
   * Level of title, will be rendered as heading tag (e.g. h1). Defaults to level 1.
   */
  @property({ attribute: 'title-level' }) public titleLevel: SbbTitleLevel = '1';

  /**
   * Whether a back button is displayed next to the title.
   */
  @property({ attribute: 'title-back-button', type: Boolean }) public titleBackButton = false;

  /**
   * Backdrop click action.
   */
  @property({ attribute: 'backdrop-action' }) public backdropAction: 'close' | 'none' = 'close';

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @property({ attribute: 'accessibility-label' }) public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-label to the close button element.
   */
  @property({ attribute: 'accessibility-close-label' }) public accessibilityCloseLabel:
    | string
    | undefined;

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

  /*
   * The state of the dialog.
   */
  private set _state(state: SbbOverlayState) {
    this.dataset.state = state;
  }
  private get _state(): SbbOverlayState {
    return this.dataset?.state as SbbOverlayState;
  }
  
  private get _hasTitle(): boolean {
    return !!this.titleContent || this._namedSlots.slots.has('title');
  }

  // We use a timeout as a workaround to the "ResizeObserver loop completed with undelivered notifications" error.
  // For more details:
  // - https://github.com/WICG/resize-observer/issues/38#issuecomment-422126006
  // - https://github.com/juggle/resize-observer/issues/103#issuecomment-1711148285
  private _dialogContentResizeObserver = new AgnosticResizeObserver(() =>
    setTimeout(() => this._onContentResize()),
  );
  private _ariaLiveRef!: HTMLElement;
  private _ariaLiveRefToggle = false;

  /** Emits whenever the `sbb-dialog` starts the opening transition. */
  private _willOpen: EventEmitter<void> = new EventEmitter(this, SbbDialogElement.events.willOpen);

  /** Emits whenever the `sbb-dialog` is opened. */
  private _didOpen: EventEmitter<void> = new EventEmitter(this, SbbDialogElement.events.didOpen);

  /** Emits whenever the `sbb-dialog` begins the closing transition. */
  private _willClose: EventEmitter = new EventEmitter(this, SbbDialogElement.events.willClose);

  /** Emits whenever the `sbb-dialog` is closed. */
  private _didClose: EventEmitter = new EventEmitter(this, SbbDialogElement.events.didClose);

  /** Emits whenever the back button is clicked. */
  private _backClick: EventEmitter<void> = new EventEmitter(
    this,
    SbbDialogElement.events.backClick,
  );

  private _dialogHeaderElement!: HTMLElement;
  private _dialogHeaderHeight!: number;
  private _dialogContentElement!: HTMLElement;
  private _dialogCloseElement?: HTMLElement;
  private _dialogController!: AbortController;
  private _openDialogController!: AbortController;
  private _focusHandler = new SbbFocusHandler();
  private _scrollHandler = new SbbScrollHandler();
  private _returnValue: any;
  private _isPointerDownEventOnDialog: boolean = false;
  private _overflows: boolean;
  private _lastScroll = 0;
  private _dialogId = `sbb-dialog-${nextId++}`;

  // Last element which had focus before the dialog was opened.
  private _lastFocusedElement?: HTMLElement;

  private _language = new SbbLanguageController(this);
  private _namedSlots = new SbbSlotStateController(this, () =>
    setAttribute(this, 'data-fullscreen', !this._hasTitle),
  );

  /**
   * Opens the dialog element.
   */
  public open(): void {
    if (this._state !== 'closed') {
      return;
    }
    this._lastFocusedElement = document.activeElement as HTMLElement;

    // Initialize dialog elements
    this._dialogHeaderElement = this.shadowRoot.querySelector('.sbb-dialog__header');
    this._dialogContentElement = this.shadowRoot.querySelector('.sbb-dialog__content');

    if (!this._willOpen.emit()) {
      return;
    }
    this._state = 'opening';

    // Add this dialog to the global collection
    dialogRefs.push(this as SbbDialogElement);
    this._dialogContentResizeObserver.observe(this._dialogContentElement);

    // Disable scrolling for content below the dialog
    this._scrollHandler.disableScroll();
  }

  /**
   * Closes the dialog element.
   */
  public close(result?: any, target?: HTMLElement): any {
    if (this._state !== 'opened') {
      return;
    }

    this._returnValue = result;
    this._dialogCloseElement = target;
    const eventData = {
      returnValue: this._returnValue,
      closeTarget: this._dialogCloseElement,
    };

    if (!this._willClose.emit(eventData)) {
      return;
    }
    this._state = 'closing';
    this._removeAriaLiveRefContent();
  }

  // Closes the dialog on "Esc" key pressed.
  private _onKeydownEvent(event: KeyboardEvent): void {
    if (this._state !== 'opened') {
      return;
    }

    if (event.key === 'Escape') {
      dialogRefs[dialogRefs.length - 1].close();
      return;
    }
  }

  private _onContentScroll(): void {
    const hasVisibleHeader = this.dataset.hideHeader === undefined;

    // Check whether hiding the header would make the scrollbar disappear
    // and prevent the hiding animation if so.
    if (
      hasVisibleHeader &&
      this._dialogContentElement.clientHeight + this._dialogHeaderHeight >=
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
      toggleDatasetEntry(this, 'hideHeader', true);
    } else {
      // Scrolling up
      toggleDatasetEntry(this, 'hideHeader', false);
    }
    // `currentScroll` can be negative, e.g. on mobile; this is not allowed.
    this._lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._state = this._state || 'closed';
    this._dialogController?.abort();
    this._dialogController = new AbortController();

    // Close dialog on backdrop click
    this.addEventListener('pointerdown', this._pointerDownListener, {
      signal: this._dialogController.signal,
    });
    this.addEventListener('pointerup', this._closeOnBackdropClick, {
      signal: this._dialogController.signal,
    });

    if (this._state === 'opened') {
      applyInertMechanism(this);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._dialogController?.abort();
    this._openDialogController?.abort();
    this._focusHandler.disconnect();
    this._dialogContentResizeObserver.disconnect();
    this._removeInstanceFromGlobalCollection();
    removeInertMechanism();
  }

  private _removeInstanceFromGlobalCollection(): void {
    dialogRefs.splice(dialogRefs.indexOf(this as SbbDialogElement), 1);
  }

  private _attachOpenDialogEvents(): void {
    this._openDialogController = new AbortController();
    // Remove dialog label as soon as it is not needed anymore to prevent accessing it with browse mode.
    window.addEventListener(
      'keydown',
      async (event: KeyboardEvent) => {
        this._removeAriaLiveRefContent();
        await this._onKeydownEvent(event);
      },
      {
        signal: this._openDialogController.signal,
      },
    );
    window.addEventListener('click', () => this._removeAriaLiveRefContent(), {
      signal: this._openDialogController.signal,
    });
    // If the content overflows, show/hide the dialog header on scroll.
    this._dialogContentElement?.addEventListener('scroll', () => this._onContentScroll(), {
      passive: true,
      signal: this._openDialogController.signal,
    });
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

  // Close the dialog on click of any element that has the 'sbb-dialog-close' attribute.
  private _closeOnSbbDialogCloseClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.hasAttribute('sbb-dialog-close') && !isValidAttribute(target, 'disabled')) {
      // Check if the target is a submission element within a form and return the form, if present
      const closestForm =
        target.getAttribute('type') === 'submit'
          ? (hostContext('form', target) as HTMLFormElement)
          : undefined;
      this.close(closestForm, target);
    }
  }

  // Wait for dialog transition to complete.
  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onDialogAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this._state === 'opening') {
      this._state = 'opened';
      this._didOpen.emit();
      applyInertMechanism(this);
      this._attachOpenDialogEvents();
      this._setDialogFocus();
      // Use timeout to read label after focused element
      setTimeout(() => this._setAriaLiveRefContent());
      this._focusHandler.trap(this);
    } else if (event.animationName === 'close' && this._state === 'closing') {
      toggleDatasetEntry(this, 'hideHeader', false);
      this._dialogContentElement.scrollTo(0, 0);
      this._state = 'closed';
      removeInertMechanism();
      setModalityOnNextFocus(this._lastFocusedElement);
      // Manually focus last focused element
      this._lastFocusedElement?.focus();
      this._didClose.emit({
        returnValue: this._returnValue,
        closeTarget: this._dialogCloseElement,
      });
      this._openDialogController?.abort();
      this._focusHandler.disconnect();
      this._dialogContentResizeObserver.disconnect();
      this._removeInstanceFromGlobalCollection();
      // Enable scrolling for content below the dialog if no dialog is open
      !dialogRefs.length && this._scrollHandler.enableScroll();
    }
  }

  private _setAriaLiveRefContent(): void {
    this._ariaLiveRefToggle = !this._ariaLiveRefToggle;

    // Take accessibility label or current string in title section
    const label =
      this.accessibilityLabel ||
      (this.shadowRoot!.querySelector('.sbb-dialog__title') as HTMLElement)?.innerText.trim();

    // If the text content remains the same, on VoiceOver the aria-live region is not announced a second time.
    // In order to support reading on every opening, we toggle an invisible space.
    this._ariaLiveRef.textContent = `${i18nDialog[this._language.current]}${
      label ? `, ${label}` : ''
    }${this._ariaLiveRefToggle ? ' ' : ''}`;
  }

  private _removeAriaLiveRefContent(): void {
    this._ariaLiveRef.textContent = '';
  }

  // Set focus on the first focusable element.
  private _setDialogFocus(): void {
    // Determine whether the dialog header has a visible focus within.
    Array.from(this._dialogHeaderElement.querySelectorAll('sbb-button'))?.forEach((el) => {
      el.addEventListener(
        'focusin',
        () => {
          if (this._overflows) {
            toggleDatasetEntry(
              this._dialogHeaderElement,
              'hasVisibleFocusWithin',
              sbbInputModalityDetector.mostRecentModality === 'keyboard',
            );
          }
        },
        { signal: this._openDialogController.signal },
      );
      el.addEventListener(
        'blur',
        () => {
          toggleDatasetEntry(this._dialogHeaderElement, 'hasVisibleFocusWithin', false);
        },
        { signal: this._openDialogController.signal },
      );
    });
    const firstFocusable = this.shadowRoot!.querySelector(IS_FOCUSABLE_QUERY) as HTMLElement;
    setModalityOnNextFocus(firstFocusable);
    firstFocusable.focus();
  }

  private _setDialogHeaderHeight(): void {
    this._dialogHeaderHeight = this._dialogHeaderElement.clientHeight;
    this.style.setProperty(
      '--sbb-dialog-header-height',
      `${this._dialogHeaderElement.clientHeight}px`,
    );
  }

  private _onContentResize(): void {
    this._setDialogHeaderHeight();
    // Check whether the content overflows and set the `overflows` attribute.
    this._overflows =
      this._dialogContentElement.scrollHeight > this._dialogContentElement.clientHeight;
    // If the content doesn't overflow anymore after resizing and the header is currently hidden, shows the header again.
    if (!this._overflows && this.dataset.hideHeader === '') {
      this.toggleAttribute('data-hide-header', false);
    }
    this.toggleAttribute('data-overflows', this._overflows);
  }

  protected override render(): TemplateResult {
    const TAG_NAME = this.negative ? 'sbb-transparent-button' : 'sbb-secondary-button';

    /* eslint-disable lit/binding-positions */
    const closeButton = html`
      <${unsafeStatic(TAG_NAME)}
        class="sbb-dialog__close"
        aria-label=${this.accessibilityCloseLabel || i18nCloseDialog[this._language.current]}
        ?negative=${this.negative}
        size="m"
        type="button"
        icon-name="cross-small"
        sbb-dialog-close
      ></${unsafeStatic(TAG_NAME)}>
    `;

    const backButton = html`
      <${unsafeStatic(TAG_NAME)}
        class="sbb-dialog__back"
        aria-label=${this.accessibilityBackLabel || i18nGoBack[this._language.current]}
        ?negative=${this.negative}
        size="m"
        type="button"
        icon-name="chevron-small-left-small"
        @click=${() => this._backClick.emit()}
      ></${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-enable lit/binding-positions */

    const dialogHeader = html`
      <div class="sbb-dialog__header">
        ${this.titleBackButton ? backButton : nothing}
        <sbb-title
          class="sbb-dialog__title"
          level=${this.titleLevel}
          visual-level="3"
          ?negative=${this.negative}
          id="title"
        >
          <slot name="title">${this.titleContent}</slot>
        </sbb-title>
        ${closeButton}
      </div>
    `;

    setAttribute(this, 'data-fullscreen', !this._hasTitle);

    return html`
      <div class="sbb-dialog__container">
        <div
          @animationend=${(event: AnimationEvent) => this._onDialogAnimationEnd(event)}
          class="sbb-dialog"
          id=${this._dialogId}
        >
          <div
            @click=${(event: Event) => this._closeOnSbbDialogCloseClick(event)}
            class="sbb-dialog__wrapper"
          >
            ${dialogHeader}
            <div class="sbb-dialog__content">
              <slot></slot>
            </div>
            <div class="sbb-dialog__footer">
              <slot name="action-group"></slot>
            </div>
          </div>
        </div>
      </div>
      <sbb-screen-reader-only
        aria-live="polite"
        ${ref((el?: Element) => (this._ariaLiveRef = el as HTMLElement))}
      ></sbb-screen-reader-only>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-dialog': SbbDialogElement;
  }
}
