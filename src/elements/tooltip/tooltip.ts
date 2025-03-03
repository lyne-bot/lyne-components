import {
  html,
  isServer,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbOverlayController } from '../core/controllers.js';
import { isAndroid, isIOS, queueDomContentLoaded } from '../core/dom.js';
import { SbbDisabledMixin, SbbNegativeMixin } from '../core/mixins.js';

import style from './tooltip.scss?lit&inline';

const isMobile = isAndroid || isIOS;
const tooltipTriggers = new WeakMap<HTMLElement, SbbTooltipElement>();
const tooltips = new Set<SbbTooltipElement>();
let nextId = 0;

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 */
export
@customElement('sbb-tooltip')
class SbbTooltipElement extends SbbNegativeMixin(SbbDisabledMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;

  private static _tooltipOutlet: Element;

  static {
    if (!isServer) {
      // We don't want to block execution for initialization,
      // so we defer it until the DOM content is loaded.
      queueDomContentLoaded(() => this._initializeTooltip());
    }
  }

  /** The trigger element for the tooltip. */
  public get trigger(): HTMLElement | null {
    return this._triggerElement?.deref() ?? null;
  }

  /** Whether the tooltip is visible or not. */
  public get isVisible(): boolean {
    return this.hasAttribute('data-show');
  }

  private readonly _internals = this.attachInternals();
  private readonly _overlay = new SbbOverlayController(this, true);

  /** A weak reference to the trigger element, to allow the trigger to be garbage collected. */
  private _triggerElement?: WeakRef<HTMLElement>;
  private _triggerAbortController?: AbortController;

  public constructor() {
    super();
    /** @internal */
    this._internals.role = 'tooltip';
    tooltips.add(this);
    const options: AddEventListenerOptions = {
      passive: true,
    };
    this.addEventListener(
      'mouseleave',
      (event) => {
        if (
          (!event.relatedTarget || !this.trigger?.contains(event.relatedTarget as Node)) &&
          this.isVisible
        ) {
          this.hide();
        }
      },
      options,
    );
    this.addEventListener(
      'overlayOutsidePointer',
      () => {
        if (this.isVisible) {
          this.hide();
        }
      },
      options,
    );
    this.addEventListener('transitionstart', () => this._updatePosition(), options);
  }

  private static _initializeTooltip(): void {
    this._tooltipOutlet = document.createElement('div');
    this._tooltipOutlet.classList.add('sbb-overlay-outlet');
    document.body.appendChild(this._tooltipOutlet);

    // We are using MutationObserver directly here, as it will only be called on client side
    // and we do not need to disconnect it, as we want it to work during the full lifetime
    // of the page.
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          this._handleTooltipTrigger(mutation.target as HTMLElement);
        } else if (mutation.type === 'childList') {
          for (const node of [...mutation.addedNodes, ...mutation.removedNodes].filter(
            (n): n is HTMLElement => n.nodeType === n.ELEMENT_NODE,
          )) {
            this._handleTooltipTrigger(node);
            this._findAndHandleTooltipTriggers(node);
          }
        }
      }
    }).observe(document.documentElement, {
      attributeFilter: ['sbb-tooltip'],
      childList: true,
      subtree: true,
    });
    this._findAndHandleTooltipTriggers(document.body);
  }

  private static _findAndHandleTooltipTriggers(root: HTMLElement): void {
    root
      .querySelectorAll<HTMLElement>('[sbb-tooltip]')
      .forEach((e) => this._handleTooltipTrigger(e));
  }

  private static _handleTooltipTrigger(triggerElement: HTMLElement): void {
    const tooltipMessage = triggerElement.getAttribute('sbb-tooltip');
    let tooltip = tooltipTriggers.get(triggerElement);
    if (tooltipMessage) {
      if (!tooltip) {
        tooltip = document.createElement('sbb-tooltip');
        tooltipTriggers.set(triggerElement, tooltip);
        this._tooltipOutlet.appendChild(tooltip);
        tooltip._attach(triggerElement);
      }
      tooltip.textContent = tooltipMessage;
    } else if (tooltip) {
      tooltipTriggers.delete(triggerElement);
      tooltip._destroy();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-tooltip-${++nextId}`;
  }

  public show(): void {
    if (!this.trigger || this.isVisible) {
      return;
    }
    this._overlay.connect(this.trigger);
    this._updatePosition();
    this.toggleAttribute('data-show', true);
  }

  public hide(): void {
    if (!this.isVisible) {
      return;
    }
    this.removeAttribute('data-show');
    this._overlay.disconnect();
  }

  private _attach(trigger: HTMLElement): void {
    if (this._triggerElement && this._triggerElement.deref() !== trigger) {
      this._detach();
    }

    this._triggerElement = new WeakRef(trigger);
    this._addTriggerEventHandlers();
  }

  private _detach(): void {
    this._triggerAbortController?.abort();
    this._triggerElement = undefined;
  }

  private _destroy(): void {
    this._detach();
    this.remove();
    tooltips.delete(this);
  }

  private _updatePosition(): void {
    this.setAttribute('data-position', this._overlay.currentPosition);
  }

  private _addTriggerEventHandlers(): void {
    const trigger = this._triggerElement?.deref();
    if (!trigger) {
      return;
    }

    this._triggerAbortController?.abort();
    this._triggerAbortController = new AbortController();
    const options: AddEventListenerOptions = {
      signal: this._triggerAbortController.signal,
      passive: true,
    };

    trigger.addEventListener('focus', () => this.show(), options);
    trigger.addEventListener('blur', () => this.hide(), options);
    if (isMobile) {
      trigger.addEventListener('touchstart', () => {}, options);
    } else {
      trigger.addEventListener('mouseenter', () => this.show(), options);
      trigger.addEventListener(
        'mouseleave',
        (event) => {
          const newTarget = event.relatedTarget as Node | null;
          if (!newTarget || !SbbTooltipElement._tooltipOutlet.contains(newTarget)) {
            this.hide();
          }
        },
        options,
      );
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this._triggerAbortController?.abort();
        this._triggerAbortController = undefined;
      } else {
        this._addTriggerEventHandlers();
      }
    }
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-tooltip"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tooltip': SbbTooltipElement;
  }
}
