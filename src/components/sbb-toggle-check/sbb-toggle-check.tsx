import {
  Component,
  ComponentInterface,
  Element,
  EventEmitter,
  Event,
  h,
  JSX,
  Prop,
  State,
  Host,
  Listen,
} from '@stencil/core';
import { forwardEventToHost } from '../../global/helpers/forward-event';
import { inputElement } from '../../global/helpers/input-element';
import { InterfaceToggleCheckAttributes } from './sbb-toggle-check.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-toggle-check.scss',
  tag: 'sbb-toggle-check',
})
export class SbbToggleCheck implements ComponentInterface {
  /** Whether the toggle-check is checked. */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /** Value of toggle-check. */
  @Prop() public value?: string;

  /** Name of the toggle-check. */
  @Prop({ reflect: true }) public name?: string;

  /** The svg name for the true state - default -> 'tick-small' */
  @Prop() public iconName = 'tick-small';

  /** The disabled prop for the disabled state. */
  @Prop({ reflect: true }) public disabled = false;

  /** The required prop for the required state. */
  @Prop() public required = false;

  /** The label position relative to the toggle. Defaults to 'after' */
  @Prop({ reflect: true }) public labelPosition?: InterfaceToggleCheckAttributes['labelPosition'] =
    'after';

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  @Element() private _element!: HTMLElement;

  @State() private _hasLabelText = false;

  public connectedCallback(): void {
    this._hasLabelText = Array.from(this._element.childNodes).some(
      (n: ChildNode) => !(n as Element).slot && n.textContent
    );
  }

  @Listen('click')
  public handleClick(): void {
    if (!this.disabled) {
      inputElement(this._element).click();
    }
  }

  @Listen('keyup')
  public handleKeyup(event: KeyboardEvent): void {
    // The native checkbox input toggles state on keyup with space.
    if (!this.disabled && event.key === ' ') {
      // The toggle needs to happen after the keyup event finishes, so we schedule
      // it to be triggered after the current event loop.
      setTimeout(() => this._element.shadowRoot.querySelector('input').click());
    }
  }

  public handleChangeEvent(event: Event): void {
    forwardEventToHost(event, this._element);
    this.didChange.emit();
  }

  /**
   * Method triggered on checkbox input event.
   * If not indeterminate, inverts the value; otherwise sets checked to true.
   */
  public handleInputEvent(): void {
    this.checked = this._element.shadowRoot.querySelector('input')?.checked ?? false;
  }

  private _onLabelSlotChange(event: Event): void {
    this._hasLabelText = (event.target as HTMLSlotElement)
      .assignedNodes()
      .some((n: Node) => !!n.textContent.trim());
  }

  public render(): JSX.Element {
    const attributes = {
      role: 'checkbox',
      'aria-checked': this.checked?.toString() ?? 'false',
      'aria-required': this.required.toString(),
      'aria-disabled': this.disabled.toString(),
      ...(this.disabled ? undefined : { tabIndex: '0' }),
    };
    return (
      <Host {...attributes}>
        <label class="sbb-toggle-check">
          <input
            type="checkbox"
            aria-hidden="true"
            tabIndex={-1}
            name={this.name}
            disabled={this.disabled}
            required={this.required}
            checked={this.checked}
            value={this.value}
            onInput={() => this.handleInputEvent()}
            onChange={(event) => this.handleChangeEvent(event)}
          />
          <span class="sbb-toggle-check__container">
            <span class="sbb-toggle-check__label" hidden={!this._hasLabelText}>
              <slot onSlotchange={(event): void => this._onLabelSlotChange(event)} />
            </span>
            <span class="sbb-toggle-check__track">
              <span class="sbb-toggle-check__circle">
                <span class="sbb-toggle-check__icon">
                  <slot name="icon">
                    {this.iconName && <sbb-icon name={this.iconName}></sbb-icon>}
                  </slot>
                </span>
              </span>
            </span>
          </span>
        </label>
      </Host>
    );
  }
}
