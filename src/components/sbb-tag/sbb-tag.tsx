import { resolveButtonRenderVariables } from '../../global/interfaces';
import { TagStateChange } from './sbb-tag.custom';
import {
  createNamedSlotState,
  HandlerRepository,
  actionElementHandlerAspect,
  namedSlotChangeHandlerAspect,
  EventEmitter,
  ConnectedAbortController,
} from '../../global/eventing';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SbbTagGroup } from '../sbb-tag-group/index';
import { setAttributes } from '../../global/dom';
import Style from './sbb-tag.scss?lit&inline';

/**
 * @slot unnamed - This slot will show the provided tag label.
 * @slot icon - Use this slot to display an icon at the component start, by providing a `sbb-icon` component.
 * @slot amount - Provide an amount to show it at the component end.
 */
export const events = {
  stateChange: 'state-change',
  input: 'input',
  didChange: 'did-change',
  change: 'change',
};

@customElement('sbb-tag')
export class SbbTag extends LitElement {
  public static override styles: CSSResult = Style;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name: string | undefined;

  /** Value of the tag. */
  @property()
  public get value(): string | null {
    return this._value;
  }
  public set value(value: string | null) {
    const oldValue = this._value;
    this._value = value;
    this._handleValueChange(this._value, oldValue);
    this.requestUpdate('value', oldValue);
  }
  private _value: string | null = null;

  /** The <form> element to associate the button with. */
  @property() public form?: string;

  /** Amount displayed inside the tag. */
  @property() public amount?: string;

  /** Whether the toggle is checked. */
  @property({ reflect: true, type: Boolean })
  public get checked(): boolean {
    return this._checked;
  }
  public set checked(value: boolean) {
    const oldValue = this._checked;
    this._checked = value;
    this._handleCheckedChange(this._checked, oldValue);
    this.requestUpdate('checked', oldValue);
  }
  private _checked: boolean = false;

  /** Whether the tag is disabled. */
  @property({ reflect: true, type: Boolean }) public disabled = false;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('icon', 'amount');

  /**
   * The icon name we want to use, choose from the small icon variants from the ui-icons category
   * from https://icons.app.sbb.ch (optional).
   */
  @property({ attribute: 'icon-name' }) public iconName?: string;

  private _handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this._stateChange.emit({ type: 'checked', checked: currentValue });
    }
  }

  private _handleValueChange(currentValue: string, previousValue: string): void {
    if (this.checked && currentValue !== previousValue) {
      this._stateChange.emit({ type: 'value', value: currentValue });
    }
  }

  /**
   * Internal event that emits whenever the state of the tag
   * in relation to the parent toggle changes.
   */
  private _stateChange: EventEmitter<TagStateChange> = new EventEmitter(this, events.stateChange, {
    bubbles: true,
  });

  /** Input event emitter */
  private _input: EventEmitter = new EventEmitter(this, events.input, {
    bubbles: true,
    composed: true,
  });

  /** @deprecated only used for React. Will probably be removed once React 19 is available. */
  private _didChange: EventEmitter = new EventEmitter(this, events.didChange, { bubbles: true });

  /** Change event emitter */
  private _change: EventEmitter = new EventEmitter(this, events.change, { bubbles: true });

  private _handlerRepository = new HandlerRepository(
    this,
    actionElementHandlerAspect,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', () => this._handleClick(), { signal });
    this._handlerRepository.connect();
  }
  private _abort = new ConnectedAbortController(this);

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  /** Method triggered on button click. Inverts the checked value and emits events. */
  private _handleClick(): void {
    if (this.disabled) {
      return;
    }

    const tagGroup = this.closest('sbb-tag-group') as SbbTagGroup;

    // Prevent deactivating on exclusive / radio mode
    if (tagGroup && !tagGroup.multiple && this.checked) {
      return;
    }
    this.checked = !this.checked;
    this._input.emit();
    this._change.emit();
    this._didChange.emit();
  }

  protected override render(): TemplateResult {
    const { hostAttributes } = resolveButtonRenderVariables(this);
    // We have to ensure that the value is always present
    hostAttributes['aria-pressed'] = this.checked.toString();

    setAttributes(this, hostAttributes);

    return html`
      <span class="sbb-tag">
        ${this.iconName || this._namedSlots['icon']
          ? html`<span class="sbb-tag__icon sbb-tag--shift">
              <slot name="icon"
                >${this.iconName ? html`<sbb-icon name=${this.iconName} />` : nothing}</slot
              >
            </span>`
          : nothing}
        <span class="sbb-tag__text sbb-tag--shift">
          <slot></slot>
        </span>
        ${this.amount || this._namedSlots['amount']
          ? html`<span class="sbb-tag__amount sbb-tag--shift">
              <slot name="amount">${this.amount}</slot>
            </span>`
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tag': SbbTag;
  }
}
