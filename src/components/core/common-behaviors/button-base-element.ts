import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { buttonHandlerAspect, HandlerRepository } from '../eventing';

import { hostProperties } from './host-properties';

/** Enumeration for type attribute in <button> HTML tag. */
export type ButtonType = 'button' | 'reset' | 'submit';

/** The interface contains attributes that can be set on a <button> tag.  */
export interface ButtonProperties {
  type?: ButtonType;
  name?: string;
  value?: string;
  form?: string;
  disabled?: boolean;
}

/** Button base class. */
export abstract class SbbButtonBaseElement extends LitElement implements ButtonProperties {
  /** The type attribute to use for the button. */
  @property() public type?: ButtonType;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name?: string;

  /** The value attribute to use for the button. */
  @property() public value?: string;

  /** The <form> element to associate the button with. */
  @property() public form?: string;

  private _handlerRepository = new HandlerRepository(this, buttonHandlerAspect);

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }
}

/** Sets default render variables for button-like elements. */
export function resolveButtonRenderVariables(
  disabled: boolean = false,
): Record<string, string | undefined> {
  return hostProperties('button', disabled);
}
