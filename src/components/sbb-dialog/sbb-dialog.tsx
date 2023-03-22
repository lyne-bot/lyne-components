import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import { isEventOnElement } from '../../global/helpers/position';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { IS_FOCUSABLE_QUERY, FocusTrap } from '../../global/helpers/focus';
import { i18nCloseDialog, i18nGoBack } from '../../global/i18n';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import { hostContext } from '../../global/helpers/host-context';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
import { toggleDatasetEntry } from '../../global/helpers/dataset';
import { ScrollHandler } from '../../global/helpers/scroll';
import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';

type SbbDialogState = 'closed' | 'opening' | 'opened' | 'closing';

/**
 * @slot unnamed - Use this slot to provide the dialog content.
 * @slot title - Use this slot to provide a title.
 * @slot action-group - Use this slot to display an action group in the footer.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-dialog.scss',
  tag: 'sbb-dialog',
})
export class SbbDialog implements ComponentInterface {
  /**
   * Dialog title.
   */
  @Prop() public titleContent: string;

  /**
   * Level of title, will be rendered as heading tag (e.g. h1). Defaults to level 1.
   */
  @Prop() public titleLevel: InterfaceTitleAttributes['level'] = '1';

  /**
   * Whether a back button is displayed next to the title.
   */
  @Prop() public titleBackButton = false;

  /**
   * Negative coloring variant flag.
   */
  @Prop({ reflect: true }) public negative = false;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-label to the close button element.
   */
  @Prop() public accessibilityCloseLabel: string | undefined;

  /**
   * This will be forwarded as aria-label to the back button element.
   */
  @Prop() public accessibilityBackLabel: string | undefined;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('title', 'action-group');

  @State() private _hasTitle = false;

  @State() private _currentLanguage = documentLanguage();

  /*
   * The state of the dialog.
   */
  private set _state(state: SbbDialogState) {
    this._element.dataset.state = state;
  }
  private get _state(): SbbDialogState {
    return this._element.dataset.state as SbbDialogState;
  }

  private _dialogContentResizeObserver = new ResizeObserver(() => this._setOverflowAttribute());

  /**
   * Emits whenever the dialog starts the opening transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /**
   * Emits whenever the dialog is opened.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /**
   * Emits whenever the dialog begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<any>;

  /**
   * Emits whenever the dialog is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<any>;

  /**
   * Emits whenever the back button is clicked.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'request-back-action',
  })
  public backClick: EventEmitter<void>;

  private _dialog: HTMLDialogElement;
  private _dialogWrapperElement: HTMLElement;
  private _dialogContentElement: HTMLElement;
  private _firstFocusable: HTMLElement;
  private _dialogCloseElement: HTMLElement;
  private _dialogController: AbortController;
  private _windowEventsController: AbortController;
  private _focusTrap = new FocusTrap();
  private _scrollHandler = new ScrollHandler();
  private _returnValue: any;
  private _isPointerDownEventOnDialog: boolean;
  private _hasActionGroup = false;
  private _openedByKeyboard = false;

  @Element() private _element!: HTMLElement;

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleNamedSlotChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  /**
   * Opens the dialog element.
   */
  @Method()
  public async open(event?: PointerEvent): Promise<void> {
    if (this._state === 'closing' || !this._dialog) {
      return;
    }

    this._openedByKeyboard = event?.detail === 0;
    this.willOpen.emit();
    this._state = 'opening';
    this._dialog.show();
    this._setOverflowAttribute();
    // Disable scrolling for content below the dialog
    this._scrollHandler.disableScroll();
  }

  /**
   * Closes the dialog element.
   */
  @Method()
  public async close(result?: any, target?: HTMLElement): Promise<any> {
    if (this._state === 'opening') {
      return;
    }

    this._returnValue = result;
    this._dialogCloseElement = target;
    this.willClose.emit({ returnValue: this._returnValue, closeTarget: this._dialogCloseElement });
    this._state = 'closing';
    this._openedByKeyboard = false;
  }

  // Closes the dialog on "Esc" key pressed.
  private _onKeydownEvent(event: KeyboardEvent): void {
    if (this._state !== 'opened') {
      return;
    }

    if (event.key === 'Escape') {
      this.close();
      return;
    }
  }

  public connectedCallback(): void {
    this._state = 'closed';
    this._dialogController = new AbortController();
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);

    this._hasTitle = !!this.titleContent || this._namedSlots['title'];
    toggleDatasetEntry(this._element, 'fullscreen', !this._hasTitle);
    this._hasActionGroup = this._namedSlots['action-group'] && this._hasTitle;

    // Close dialog on backdrop click
    this._element.addEventListener('pointerdown', this._pointerDownListener, {
      signal: this._dialogController.signal,
    });
    this._element.addEventListener('pointerup', this._closeOnBackdropClick, {
      signal: this._dialogController.signal,
    });
  }

  public disconnectedCallback(): void {
    this._dialogController?.abort();
    this._windowEventsController?.abort();
    this._focusTrap.disconnect();
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    window.addEventListener('keydown', (event: KeyboardEvent) => this._onKeydownEvent(event), {
      signal: this._windowEventsController.signal,
    });
  }

  // Check if the pointerdown event target is triggered on the dialog.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnDialog = isEventOnElement(this._dialog, event);
  };

  // Close dialog on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (!this._isPointerDownEventOnDialog && !isEventOnElement(this._dialog, event)) {
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
  private _onDialogAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open') {
      this._state = 'opened';
      this.didOpen.emit();
      this._setDialogFocus();
      this._focusTrap.trap(this._element);
      this._dialogContentResizeObserver.observe(this._dialogContentElement);
      this._attachWindowEvents();
    } else if (event.animationName === 'close') {
      this._state = 'closed';
      this._dialogWrapperElement.querySelector('.sbb-dialog__content').scrollTo(0, 0);
      this._dialog.close();
      this.didClose.emit({ returnValue: this._returnValue, closeTarget: this._dialogCloseElement });
      this._windowEventsController?.abort();
      this._focusTrap.disconnect();
      this._dialogContentResizeObserver.disconnect();
      // Enable scrolling for content below the dialog
      this._scrollHandler.enableScroll();
    }
  }

  // Set focus on the first focusable element.
  private _setDialogFocus(): void {
    this._firstFocusable = this._element.shadowRoot.querySelector(
      IS_FOCUSABLE_QUERY
    ) as HTMLElement;

    if (this._openedByKeyboard) {
      this._firstFocusable.focus();
    } else {
      // Focusing sbb-dialog__wrapper in order to provide a consistent behavior in Safari where else
      // the focus-visible styles would be incorrectly applied
      this._dialogWrapperElement.tabIndex = 0;
      this._dialogWrapperElement.focus();

      this._dialogWrapperElement.addEventListener(
        'blur',
        () => this._dialogWrapperElement.removeAttribute('tabindex'),
        { once: true }
      );
    }
  }

  private _setOverflowAttribute(): void {
    toggleDatasetEntry(
      this._element,
      'overflows',
      this._dialogContentElement.scrollHeight > this._dialogContentElement.clientHeight
    );
  }

  public render(): JSX.Element {
    const closeButton = (
      <sbb-button
        class="sbb-dialog__close"
        accessibility-label={this.accessibilityCloseLabel || i18nCloseDialog[this._currentLanguage]}
        variant={this.negative ? 'transparent' : 'secondary'}
        negative={this.negative}
        size="m"
        type="button"
        icon-name="cross-small"
        sbb-dialog-close
      ></sbb-button>
    );

    const backButton = (
      <sbb-button
        class="sbb-dialog__back"
        accessibility-label={this.accessibilityBackLabel || i18nGoBack[this._currentLanguage]}
        variant={this.negative ? 'transparent' : 'secondary'}
        negative={this.negative}
        size="m"
        type="button"
        icon-name="chevron-small-left-small"
        onClick={() => this.backClick.emit()}
      ></sbb-button>
    );

    const dialogHeader = (
      <div class="sbb-dialog__header">
        {this.titleBackButton && backButton}
        {this._hasTitle && (
          <sbb-title
            class="sbb-dialog__title"
            level={this.titleLevel}
            visual-level="3"
            negative={this.negative}
          >
            <slot name="title">{this.titleContent}</slot>
          </sbb-title>
        )}
        {closeButton}
      </div>
    );

    const dialogFooter = (
      <div class="sbb-dialog__footer">
        <slot name="action-group" />
      </div>
    );

    return (
      <div class="sbb-dialog__container">
        <dialog
          ref={(dialogRef) => (this._dialog = dialogRef)}
          aria-label={this.accessibilityLabel}
          onAnimationEnd={(event: AnimationEvent) => this._onDialogAnimationEnd(event)}
          class="sbb-dialog"
        >
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            onClick={(event: Event) => this._closeOnSbbDialogCloseClick(event)}
            ref={(dialogWrapperRef) => (this._dialogWrapperElement = dialogWrapperRef)}
            class="sbb-dialog__wrapper"
          >
            {dialogHeader}
            <div
              class="sbb-dialog__content"
              ref={(dialogContent) => (this._dialogContentElement = dialogContent)}
            >
              <slot />
            </div>
            {this._hasActionGroup && dialogFooter}
          </div>
        </dialog>
      </div>
    );
  }
}
