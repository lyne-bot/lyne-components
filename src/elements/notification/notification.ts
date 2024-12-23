import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbLanguageController } from '../core/controllers.js';
import { forceType, omitEmptyConverter, slotState } from '../core/decorators.js';
import { isLean, isZeroAnimationDuration } from '../core/dom.js';
import { EventEmitter } from '../core/eventing.js';
import { i18nCloseNotification } from '../core/i18n.js';
import type { SbbOpenedClosedState } from '../core/interfaces.js';
import type { SbbTitleLevel } from '../title.js';

import style from './notification.scss?lit&inline';

import '../button/secondary-button.js';
import '../divider.js';
import '../icon.js';
import '../title.js';

const notificationTypes = new Map([
  ['info', 'circle-information-small'],
  ['success', 'circle-tick-small'],
  ['warn', 'circle-exclamation-point-small'],
  ['error', 'circle-cross-small'],
]);

const DEBOUNCE_TIME = 150;

/**
 * It displays messages which require a user's attention without interrupting its tasks.
 *
 * @slot - Use the unnamed slot to add content to the notification message.
 * @slot title - Use this to provide a notification title (optional).
 * @event {CustomEvent<void>} willOpen - Emits when the opening animation starts.
 * @event {CustomEvent<void>} didOpen - Emits when the opening animation ends.
 * @event {CustomEvent<void>} willClose - Emits when the closing animation starts.
 * @event {CustomEvent<void>} didClose - Emits when the closing animation ends.
 * @cssprop [--sbb-notification-margin=0] - Can be used to modify the margin in order to get a smoother animation.
 * See style section for more information.
 */
export
@customElement('sbb-notification')
@slotState()
class SbbNotificationElement extends LitElement {
  // TODO: fix inheriting from SbbOpenCloseBaseElement requires: https://github.com/open-wc/custom-elements-manifest/issues/253
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;

  /** The type of the notification. */
  @property({ reflect: true }) public accessor type: 'info' | 'success' | 'warn' | 'error' = 'info';

  /** Content of title. */
  @forceType()
  @property({ attribute: 'title-content', reflect: true, converter: omitEmptyConverter })
  public accessor titleContent: string = '';

  /** Level of title, it will be rendered as heading tag (e.g. h3). Defaults to level 3. */
  @property({ attribute: 'title-level' }) public accessor titleLevel: SbbTitleLevel = '3';

  /**
   * Whether the notification is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor readonly: boolean = false;

  /**
   * Size variant, either s or m.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 'm' | 's' = isLean() ? 's' : 'm';

  /** The enabled animations. */
  @property({ reflect: true }) public accessor animation: 'open' | 'close' | 'all' | 'none' = 'all';

  /** The state of the notification. */
  private set _state(state: SbbOpenedClosedState) {
    this.setAttribute('data-state', state);
  }
  private get _state(): SbbOpenedClosedState {
    return this.getAttribute('data-state') as SbbOpenedClosedState;
  }

  private _notificationElement!: HTMLElement;
  private _resizeObserverTimeout: ReturnType<typeof setTimeout> | null = null;
  private _language = new SbbLanguageController(this);
  private _notificationResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => this._onNotificationResize(),
  });

  /** Emits whenever the `sbb-notification` starts the opening transition. */
  private _willOpen: EventEmitter<void> = new EventEmitter(
    this,
    SbbNotificationElement.events.willOpen,
    { cancelable: true },
  );

  /** Emits whenever the `sbb-notification` is opened. */
  private _didOpen: EventEmitter<void> = new EventEmitter(
    this,
    SbbNotificationElement.events.didOpen,
    { cancelable: true },
  );

  /** Emits whenever the `sbb-notification` begins the closing transition. */
  private _willClose: EventEmitter<void> = new EventEmitter(
    this,
    SbbNotificationElement.events.willClose,
    { cancelable: true },
  );

  /** Emits whenever the `sbb-notification` is closed. */
  private _didClose: EventEmitter<void> = new EventEmitter(
    this,
    SbbNotificationElement.events.didClose,
    { cancelable: true },
  );

  private _open(): void {
    if (this._state === 'closed') {
      this._state = 'opening';
      this._willOpen.emit();

      // If the animation duration is zero, the animationend event is not always fired reliably.
      // In this case we directly set the `opened` state.
      if (this._isZeroAnimationDuration()) {
        this._handleOpening();
      }
    }
  }

  public close(): void {
    if (this._state === 'opened' && this._willClose.emit()) {
      this._state = 'closing';

      // If the animation duration is zero, the animationend event is not always fired reliably.
      // In this case we directly set the `closed` state.
      if (this._isZeroAnimationDuration()) {
        this._handleClosing();
      }
    }
  }

  public override connectedCallback(): void {
    this._state ||= 'closed';

    super.connectedCallback();
  }

  protected override async firstUpdated(changedProperties: PropertyValues<this>): Promise<void> {
    super.firstUpdated(changedProperties);

    this._notificationElement = this.shadowRoot?.querySelector(
      '.sbb-notification__wrapper',
    ) as HTMLElement;
    // We need to wait for the component's `updateComplete` in order to set the correct
    // height to the notification element.
    await this.updateComplete;
    this._setNotificationHeight();
    this._open();
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-notification-animation-duration');
  }

  private _setNotificationHeight(): void {
    if (!this._notificationElement?.scrollHeight) {
      return;
    }
    const notificationHeight = `${this._notificationElement.scrollHeight}px`;
    this.style.setProperty('--sbb-notification-height', notificationHeight);
  }

  private _onNotificationResize(): void {
    if (this._state !== 'opened') {
      return;
    }

    if (this._resizeObserverTimeout) {
      clearTimeout(this._resizeObserverTimeout);
    }

    // Disable the animation when resizing the notification to avoid strange height transition effects.
    this.toggleAttribute('data-resize-disable-animation', true);
    this._resizeObserverTimeout = setTimeout(
      () => this.removeAttribute('data-resize-disable-animation'),
      DEBOUNCE_TIME,
    );

    // To avoid ResizeObserver loops, we set the height a tick later.
    setTimeout(() => this._setNotificationHeight());
  }

  private _onNotificationAnimationEnd(event: AnimationEvent): void {
    if (this._state === 'opening' && event.animationName === 'open') {
      this._handleOpening();
    }

    if (this._state === 'closing' && event.animationName === 'close-height') {
      this._handleClosing();
    }
  }

  private _handleOpening(): void {
    this._state = 'opened';
    this._notificationResizeObserver.observe(this._notificationElement);
    this._didOpen.emit();
  }

  private _handleClosing(): void {
    this._state = 'closed';
    this._didClose.emit();
    this._notificationResizeObserver.unobserve(this._notificationElement);
    setTimeout(() => this.remove());
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-notification__wrapper" @animationend=${this._onNotificationAnimationEnd}>
        <div class="sbb-notification">
          <sbb-icon
            class="sbb-notification__icon"
            name=${notificationTypes.get(this.type)!}
          ></sbb-icon>

          <span class="sbb-notification__content">
            <sbb-title
              class="sbb-notification__title"
              level=${this.titleLevel}
              visual-level=${this.size === 'm' ? '5' : '6'}
            >
              <slot name="title">${this.titleContent}</slot>
            </sbb-title>
            <slot></slot>
          </span>

          ${!this.readonly
            ? html`<span class="sbb-notification__close-wrapper">
                <sbb-divider class="sbb-notification__divider" orientation="vertical"></sbb-divider>
                <sbb-secondary-button
                  size=${this.size}
                  icon-name="cross-small"
                  @click=${() => this.close()}
                  aria-label=${i18nCloseNotification[this._language.current]}
                  class="sbb-notification__close"
                ></sbb-secondary-button>
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-notification': SbbNotificationElement;
  }
}
