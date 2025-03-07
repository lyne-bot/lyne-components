import { type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbFocusHandler } from '../core/a11y.js';
import { type SbbButtonBaseElement, SbbOpenCloseBaseElement } from '../core/base-elements.js';
import {
  SbbInertController,
  SbbLanguageController,
  SbbEscapableOverlayController,
} from '../core/controllers.js';
import { forceType, hostAttributes } from '../core/decorators.js';
import { SbbScrollHandler } from '../core/dom.js';
import { EventEmitter } from '../core/eventing.js';
import { i18nDialog } from '../core/i18n.js';
import type { SbbOverlayCloseEventDetails } from '../core/interfaces.js';
import { SbbNegativeMixin } from '../core/mixins.js';
import type { SbbScreenReaderOnlyElement } from '../screen-reader-only.js';

// A global collection of existing overlays.
export const overlayRefs: SbbOverlayBaseElement[] = [];

export
@hostAttributes({
  popover: 'manual',
})
abstract class SbbOverlayBaseElement extends SbbNegativeMixin(SbbOpenCloseBaseElement) {
  /** This will be forwarded as aria-label to the relevant nested element to describe the purpose of the overlay. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /** Emits whenever the component is closed. */
  protected override didClose: EventEmitter<SbbOverlayCloseEventDetails> = new EventEmitter(
    this,
    SbbOverlayBaseElement.events.didClose,
    { cancelable: true },
  );

  // The last element which had focus before the component was opened.
  protected lastFocusedElement?: HTMLElement;
  protected overlayCloseElement?: HTMLElement;
  /** @deprecated */
  protected overlayController!: AbortController;
  protected openOverlayController!: AbortController;
  protected focusHandler = new SbbFocusHandler();
  protected scrollHandler = new SbbScrollHandler();
  protected returnValue: any;
  protected ariaLiveRefToggle = false;
  protected ariaLiveRef!: SbbScreenReaderOnlyElement;
  protected language = new SbbLanguageController(this);
  protected inertController = new SbbInertController(this);
  protected sbbEscapableOverlayController = new SbbEscapableOverlayController(this);

  protected abstract closeAttribute: string;
  protected abstract onOverlayAnimationEnd(event: AnimationEvent): void;
  protected abstract setOverlayFocus(): void;
  protected abstract handleClosing(): void;
  protected abstract isZeroAnimationDuration(): boolean;

  /** Closes the component. */
  public close(result?: any, target?: HTMLElement): any {
    if (this.state !== 'opened') {
      return;
    }

    this.returnValue = result;
    this.overlayCloseElement = target;
    const eventData: SbbOverlayCloseEventDetails = {
      returnValue: this.returnValue,
      closeTarget: this.overlayCloseElement,
    };

    if (!this.willClose.emit(eventData)) {
      return;
    }
    this.state = 'closing';
    this.removeAriaLiveRefContent();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this.isZeroAnimationDuration()) {
      this.handleClosing();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.overlayController?.abort();
    this.overlayController = new AbortController();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    this.ariaLiveRef =
      this.shadowRoot!.querySelector<SbbScreenReaderOnlyElement>('sbb-screen-reader-only')!;

    super.firstUpdated(changedProperties);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.overlayController?.abort();
    this.openOverlayController?.abort();
    this.focusHandler.disconnect();
    this.removeInstanceFromGlobalCollection();
    this.scrollHandler.enableScroll();
  }

  protected attachOpenOverlayEvents(): void {
    this.openOverlayController = new AbortController();
    // Remove overlay label as soon as it is not needed any more to prevent accessing it with browse mode.
    window.addEventListener(
      'keydown',
      () => {
        this.removeAriaLiveRefContent();
      },
      {
        signal: this.openOverlayController.signal,
      },
    );
    window.addEventListener('click', () => this.removeAriaLiveRefContent(), {
      signal: this.openOverlayController.signal,
    });
  }

  protected removeInstanceFromGlobalCollection(): void {
    overlayRefs.splice(overlayRefs.indexOf(this as SbbOverlayBaseElement), 1);
  }

  // Close the component on click of any element that has the `closeAttribute` attribute.
  protected closeOnSbbOverlayCloseClick(event: Event): void {
    const overlayCloseElement = event
      .composedPath()
      .filter((e): e is HTMLElement => e instanceof window.HTMLElement)
      .find(
        (target) => target.hasAttribute(this.closeAttribute) && !target.hasAttribute('disabled'),
      );

    if (!overlayCloseElement) {
      return;
    }

    // Check if the target is a submission element within a form and return the form, if present
    const closestForm =
      overlayCloseElement.getAttribute('type') === 'submit'
        ? ((overlayCloseElement as HTMLButtonElement | SbbButtonBaseElement).form ?? null)
        : null;
    overlayRefs[overlayRefs.length - 1].close(closestForm, overlayCloseElement);
  }

  protected removeAriaLiveRefContent(): void {
    this.ariaLiveRef.textContent = '';
  }

  protected setAriaLiveRefContent(label?: string): void {
    this.ariaLiveRefToggle = !this.ariaLiveRefToggle;

    // If the text content remains the same, on VoiceOver the aria-live region is not announced a second time.
    // In order to support reading on every opening, we toggle an invisible space.
    this.ariaLiveRef.textContent = `${i18nDialog[this.language.current]}${
      label ? `, ${label}` : ''
    }${this.ariaLiveRefToggle ? ' ' : ''}`;
  }
}
