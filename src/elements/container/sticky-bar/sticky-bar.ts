import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';
import { isZeroAnimationDuration } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import { SbbUpdateSchedulerMixin } from '../../core/mixins.js';

import style from './sticky-bar.scss?lit&inline';

type StickyState = 'sticking' | 'sticky' | 'unsticking' | 'unsticky';

/**
 * A container that sticks to the bottom of the page if slotted into `sbb-container`.
 *
 * @slot - Use the unnamed slot to add content to the sticky bar.
 * @event {CustomEvent<void>} willStick - Emits when the animation from normal content flow to `position: sticky` starts. Can be canceled.
 * @event {CustomEvent<void>} didStick - Emits when the animation from normal content flow to `position: sticky` ends.
 * @event {CustomEvent<void>} willUnstick - Emits when the animation from `position: sticky` to normal content flow starts. Can be canceled.
 * @event {CustomEvent<void>} didUnstick - Emits when the animation from `position: sticky` to normal content flow ends.
 * @cssprop [--sbb-sticky-bar-padding-block=var(--sbb-spacing-responsive-xs)] - Block padding of the sticky bar.
 * @cssprop [--sbb-sticky-bar-bottom-overlapping-height=0px] - Define an additional area where
 * the sticky bar overlaps the following content on the bottom.
 * This area becomes visible when the sticky bar transitions from sticky to the normal document flow.
 * @cssprop [--sbb-sticky-bar-z-index] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable.
 */
export
@customElement('sbb-sticky-bar')
@hostAttributes({
  slot: 'sticky-bar',
})
class SbbStickyBarElement extends SbbUpdateSchedulerMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  public static readonly events = {
    willStick: 'willStick',
    didStick: 'didStick',
    willUnstick: 'willUnstick',
    didUnstick: 'didUnstick',
  } as const;

  /** Color of the container, like transparent, white etc. */
  @property({ reflect: true }) public accessor color: 'white' | 'milk' | null = null;

  /** The state of the component. */
  private set _state(state: StickyState) {
    this.setAttribute('data-state', state);
  }
  private get _state(): StickyState {
    return this.getAttribute('data-state') as StickyState;
  }

  private _willStick: EventEmitter = new EventEmitter(this, SbbStickyBarElement.events.willStick, {
    cancelable: true,
  });
  private _didStick: EventEmitter = new EventEmitter(this, SbbStickyBarElement.events.didStick, {
    cancelable: true,
  });
  private _willUnstick: EventEmitter = new EventEmitter(
    this,
    SbbStickyBarElement.events.willUnstick,
    { cancelable: true },
  );
  private _didUnstick: EventEmitter = new EventEmitter(
    this,
    SbbStickyBarElement.events.didUnstick,
    { cancelable: true },
  );

  private _intersector?: HTMLSpanElement;
  private _observer = new IntersectionController(this, {
    // Although `this` is observed, we have to postpone observing
    // into firstUpdated() to achieve a correct initial state.
    target: null,
    callback: (entries) => this._detectStickyState(entries[0]),
  });

  public override connectedCallback(): void {
    super.connectedCallback();
    this._state = 'sticky';

    // Sticky bar needs to be hidden until first observer callback
    this.startUpdate();

    const container = this.closest('sbb-container');
    if (container) {
      this.toggleAttribute('data-expanded', container.expanded);
    }
    if (this._intersector) {
      this._observer.observe(this._intersector);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.toggleAttribute('data-initialized', false);
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    if (!this._intersector) {
      this._intersector = this.shadowRoot!.querySelector('.sbb-sticky-bar__intersector')!;
      this._observer.observe(this._intersector);
    }
    this._observer.observe(this);
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-sticky-bar-slide-vertically-animation-duration');
  }

  private _detectStickyState(entry: IntersectionObserverEntry): void {
    this.toggleAttribute('data-initialized', true);

    const isSticky = !entry.isIntersecting && entry.boundingClientRect.top > 0;

    // To optimize the visual perception of the sticky bar, we have certain cases (e.g. on page load)
    // where we want the sticky bar to slide in from the bottom.
    // To decide whether to slide in from the bottom up,
    // we check how far away the sticky bar is from the intersector element. When scrolling fast, the
    // difference can vary slightly. To account for this we add a height tolerance.
    // This value was found by trial and error.
    const intersectorRect = this._intersector?.getBoundingClientRect();
    const stickyBarRect = this.shadowRoot!.querySelector(
      '.sbb-sticky-bar__wrapper',
    )!.getBoundingClientRect();
    const HEIGHT_TOLERANCE = 30;

    this.toggleAttribute(
      'data-slide-vertically',
      isSticky &&
        this._intersector &&
        Math.abs(intersectorRect!.bottom - stickyBarRect.bottom) > HEIGHT_TOLERANCE,
    );

    // Toggling data-sticking has to be after data-slide-vertically (prevents background color transition)
    this.toggleAttribute('data-sticking', isSticky);

    // Sticky bar needs to be hidden until first observer callback
    this.completeUpdate();
  }

  /** Animates from normal content flow position to `position: sticky`. */
  public stick(): void {
    if (this._state !== 'unsticky' || !this._willStick.emit()) {
      return;
    }

    this._state = 'sticking';
    if (!this.hasAttribute('data-sticking') || this._isZeroAnimationDuration()) {
      this._stickyCallback();
    }
  }

  /** Animates `position: sticky` to normal content flow position. */
  public unstick(): void {
    if (this._state !== 'sticky' || !this._willUnstick.emit()) {
      return;
    }

    this._state = 'unsticking';

    if (!this.hasAttribute('data-sticking') || this._isZeroAnimationDuration()) {
      this._unstickyCallback();
    }
  }

  private _stickyCallback(): void {
    this._state = 'sticky';
    this._didStick.emit();
  }

  private _unstickyCallback(): void {
    this._didUnstick.emit();
    this._state = 'unsticky';
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (
      (this._state === 'sticking' || this._state === 'sticky') &&
      event.animationName === 'slide-in'
    ) {
      this._stickyCallback();
    } else if (this._state === 'unsticking' && event.animationName === 'slide-out') {
      this._unstickyCallback();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-sticky-bar__wrapper" @animationend=${this._onAnimationEnd}>
        <div class="sbb-sticky-bar">
          <slot></slot>
        </div>
      </div>
      <div class="sbb-sticky-bar__intersector"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sticky-bar': SbbStickyBarElement;
  }
}
