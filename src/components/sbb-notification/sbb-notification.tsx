import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import { i18nCloseNotification } from '../../global/i18n';
import {
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';
import { InterfaceNotificationAttributes } from './sbb-notification.custom';
import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';

enum NotificationIconName {
  info = 'circle-information-small',
  success = 'circle-tick-small',
  warn = 'sign-exclamation-point-small',
  error = 'sign-x-small',
}

/**
 * @slot title - Use this to provide a notification title (optional).
 * @slot unnamed - Use this to provide the notification message.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-notification.scss',
  tag: 'sbb-notification',
})
export class SbbNotification implements ComponentInterface {
  /**
   * The type of the notification.
   */
  @Prop({ reflect: true }) public type?: InterfaceNotificationAttributes['type'] = 'info';

  /**
   * The variant of the notification.
   */
  @Prop({ reflect: true }) public variant?: InterfaceNotificationAttributes['variant'] = 'default';

  /**
   * Content of title.
   */
  @Prop() public titleContent?: string;

  /**
   * Level of title, will be rendered as heading tag (e.g. h3). Defaults to level 3.
   */
  @Prop() public titleLevel: InterfaceTitleAttributes['level'] = '3';

  /**
   * Whether the alert is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @Prop({ reflect: true }) public readonly = false;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true, mutable: true }) public disableAnimation = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('title');

  /**
   * The state of the notification.
   */
  @State() private _state: InterfaceNotificationAttributes['state'] = 'closed';

  @State() private _iconName: NotificationIconName = NotificationIconName[this.type];

  @State() private _hasTitle = false;

  @State() private _negative = this._isNegative();

  @State() private _currentLanguage = documentLanguage();

  @State() private _resizeDisableAnimation = false;

  @Element() private _element!: HTMLElement;

  private _notificationElement: HTMLElement;
  private _resizeObserverTimeout: ReturnType<typeof setTimeout> | null = null;
  private _notificationResizeObserver = new ResizeObserver(() => this._onNotificationResize());

  @Watch('variant')
  @Watch('type')
  public updateNotificationState(): void {
    this._iconName = NotificationIconName[this.type];
    this._negative = this._isNegative();
  }

  /**
   * Emits whenever the content section starts the opening transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /**
   * Emits whenever the content section is opened.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /**
   * Emits whenever the content section begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /**
   * Emits whenever the content section is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  private _open(): void {
    if (this._state === 'closed') {
      this._state = 'opening';
      this.willOpen.emit();
      this.disableAnimation && this._handleOpening();
    }
  }

  @Method()
  public async close(): Promise<void> {
    if (this._state === 'opened') {
      this._state = 'closing';
      this.willClose.emit();
      this.disableAnimation && this._handleClosing();
    }
  }

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._hasTitle = !!this.titleContent || this._namedSlots['title'];
    this._element.querySelectorAll('sbb-link')?.forEach((link) => (link.variant = 'inline'));
  }

  public componentDidLoad(): void {
    this._setNotificationHeight();
    this._open();
    this._notificationResizeObserver.observe(this._notificationElement);
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
    this._notificationResizeObserver.disconnect();
  }

  private _isNegative(): boolean {
    return this.variant === 'colorful' && this.type !== 'warn';
  }

  private _setNotificationHeight(): void {
    const notificationHeight =
      this._notificationElement.scrollHeight && !this.disableAnimation
        ? `${this._notificationElement.scrollHeight}px`
        : 'auto';
    this._element.style.setProperty('--sbb-notification-height', notificationHeight);
  }

  private _onNotificationResize(): void {
    if (this._state !== 'opened') {
      return;
    }

    clearTimeout(this._resizeObserverTimeout);

    this._resizeDisableAnimation = true;
    this._setNotificationHeight();

    this._resizeObserverTimeout = setTimeout(() => (this._resizeDisableAnimation = false), 150);
  }

  private _onNotificationTransitionEnd(event: TransitionEvent): void {
    if (this._state === 'opening' && event.propertyName === 'opacity') {
      this._handleOpening();
    } else if (this._state === 'closing' && event.propertyName === 'max-height') {
      this._handleClosing();
    }
  }

  private _handleOpening(): void {
    this._state = 'opened';
    this.didOpen.emit();
    this._notificationResizeObserver.observe(this._notificationElement);
  }

  private _handleClosing(): void {
    this._state = 'closed';
    this.didClose.emit();
    this._notificationResizeObserver.unobserve(this._notificationElement);
    this._element.remove();
  }

  public render(): JSX.Element {
    return (
      <Host
        data-state={this._state}
        data-resize-disable-animation={this._resizeDisableAnimation}
        data-has-title={this._hasTitle}
        inert={this._state !== 'opened'}
        aria-hidden={this._state !== 'opened'}
      >
        <div
          class="sbb-notification__wrapper"
          ref={(el) => (this._notificationElement = el)}
          onTransitionEnd={(event) => this._onNotificationTransitionEnd(event)}
        >
          <div class="sbb-notification">
            <sbb-icon class="sbb-notification__icon" name={this._iconName} />

            <span class="sbb-notification__content">
              {this._hasTitle && (
                <sbb-title
                  class="sbb-notification__title"
                  level={this.titleLevel}
                  visualLevel="5"
                  negative={this._negative}
                >
                  <slot name="title">{this.titleContent}</slot>
                </sbb-title>
              )}
              <slot />
            </span>

            {!this.readonly && (
              <span class="sbb-notification__close-wrapper">
                <sbb-divider
                  class="sbb-notification__divider"
                  orientation="vertical"
                  negative={this.variant === 'colorful' && this.type === 'warn'}
                />
                <sbb-button
                  variant="transparent"
                  negative={this._negative}
                  size="m"
                  icon-name="cross-small"
                  onClick={() => this.close()}
                  aria-label={i18nCloseNotification[this._currentLanguage]}
                  class="sbb-notification__close"
                />
              </span>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
