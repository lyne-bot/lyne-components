import { isServer } from 'lit';
import { property } from 'lit/decorators.js';

import { hostAttributes } from '../decorators.js';
import { isEventPrevented } from '../eventing.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbFormAssociatedMixin,
} from '../mixins.js';

import { SbbActionBaseElement } from './action-base-element.js';

/** Enumeration for type attribute in <button> HTML tag. */
export type SbbButtonType = 'button' | 'reset' | 'submit';

/** Button base class. */
export
@hostAttributes({
  tabindex: '0',
  'data-button': '',
})
abstract class SbbButtonBaseElement extends SbbFormAssociatedMixin(SbbActionBaseElement) {
  /**
   * The type attribute to use for the button.
   * @default 'button'
   */
  @property()
  public override set type(name: SbbButtonType) {
    this.setAttribute('type', `${name}`);
  }
  public override get type(): SbbButtonType {
    return (this.getAttribute('type') as SbbButtonType) ?? 'button';
  }

  /** The `<form>` element to associate the button with. */
  @property()
  public override set form(value: string) {
    this._formId = value;
  }
  public override get form(): HTMLFormElement | null {
    // Use querySelector with form and id selector, as the form property must
    // reference a valid <form> element
    return this._formId
      ? ((this.ownerDocument?.querySelector?.(`form#${this._formId}`) as HTMLFormElement) ?? null)
      : this.internals.form;
  }
  private _formId: string = '';

  public constructor() {
    super();

    /** @internal */
    this.internals.role = 'button';

    if (!isServer) {
      this.setupBaseEventHandlers();

      const passiveOptions = { passive: true };
      this.addEventListener('click', this._handleButtonClick);
      this.addEventListener('keydown', this._preventScrollOnSpaceKeydown);
      this.addEventListener('keyup', this._dispatchClickEventOnSpaceKeyup, passiveOptions);
      this.addEventListener('blur', this._removeActiveMarker, passiveOptions);
      this.addEventListener(
        'keypress',
        (event: KeyboardEvent): void => {
          if (event.key === 'Enter' || event.key === '\n') {
            this._dispatchClickEvent(event);
          }
        },
        passiveOptions,
      );
    }
  }
  private _handleButtonClick = async (event: MouseEvent): Promise<void> => {
    if (this.type === 'button' || (await isEventPrevented(event))) {
      return;
    }

    const form = this.form;
    if (!form) {
      return;
    } else if (this.type === 'submit') {
      // `form.requestSubmit(element);` seems not to work for CustomElements, so the `element` parameter has been removed;
      // TODO: Check if solved in any way, see https://github.com/WICG/webcomponents/issues/814#issuecomment-1218452137
      // We use the workaround described in the github issue by cloning the submit button and pass this one as an argument.

      const submitButtonClone = document.createElement('button');
      submitButtonClone.inert = true;
      submitButtonClone.hidden = true;
      submitButtonClone.name = this.name;
      submitButtonClone.value = this.value ?? '';

      form.append(submitButtonClone);
      form.requestSubmit(submitButtonClone);
      submitButtonClone.remove();
    } else if (this.type === 'reset') {
      form.reset();
    }
  };

  /**
   * Prevents scrolling from pressing Space, when the event target is an action element.
   * Also sets data-active attribute.
   * @param event The origin event.
   */
  private _preventScrollOnSpaceKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      event.preventDefault();
      (event.target as HTMLElement).toggleAttribute('data-active', true);
    }
  };

  private _removeActiveMarker = (event: Event): void => {
    (event.target as HTMLElement).removeAttribute('data-active');
  };

  /**
   * Dispatches a 'click' PointerEvent if the original keyboard event is a 'Space' press.
   * As verified with the native button, when 'Space' is pressed, a 'click' event is dispatched
   * after the 'keyup' event.
   * @param event The origin event.
   */
  private _dispatchClickEventOnSpaceKeyup = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      this._removeActiveMarker(event);
      this._dispatchClickEvent(event);
    }
  };

  private _dispatchClickEvent = (event: KeyboardEvent): void => {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    (event.target as Element).dispatchEvent(
      new PointerEvent('click', {
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerId: -1,
        pointerType: '',
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
      }),
    );
  };

  public override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null,
  ): void {
    if (!['name', 'value'].includes(name) || old !== value) {
      super.attributeChangedCallback(name, old, value);
    }
  }

  /**
   * Intentionally empty, as buttons are not targeted by form reset
   * @internal
   */
  public override formResetCallback(): void {}

  /**
   * Intentionally empty, as buttons are not targeted by form restore
   * @internal
   */
  public override formStateRestoreCallback(
    _state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {}

  /**
   * Intentionally empty, as button does not write its data in form.
   * The data is only applied on submit button click as submitter of requestSubmit();
   * @internal
   */
  protected updateFormValue(): void {}
}
