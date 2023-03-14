import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import {
  InterfaceSbbRadioButtonAttributes,
  RadioButtonStateChange,
} from './sbb-radio-button.custom';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';

/** Configuration for the attribute to look at if component is nested in a sbb-radio-button-group */
const radioButtonObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-required', 'data-group-disabled'],
};

/**
 * @slot unnamed - Use this slot to provide the radio label.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-radio-button.scss',
  tag: 'sbb-radio-button',
})
export class SbbRadioButton implements ComponentInterface {
  /**
   * Whether the radio can be deselected.
   */
  @Prop() public allowEmptySelection = false;

  /**
   * Value of radio button.
   */
  @Prop() public value: string;

  /**
   * Whether the radio button is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * Whether the radio button is required.
   */
  @Prop() public required = false;

  /**
   * Whether the radio button is checked.
   */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /**
   * Label size variant, either m or s.
   */
  @Prop({ reflect: true }) public size: InterfaceSbbRadioButtonAttributes['size'] = 'm';

  /**
   * Whether the component must be set disabled due disabled attribute on sbb-radio-button-group.
   */
  @State() private _disabledFromGroup = false;

  /**
   * Whether the component must be set required due required attribute on sbb-radio-button-group.
   */
  @State() private _requiredFromGroup = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('subtext', 'suffix');

  private _isSelectionPanelInput = false;
  private _withinSelectionPanel = false;
  private _radioButtonAttributeObserver = new MutationObserver(
    this._onRadioButtonAttributesChange.bind(this)
  );

  @Element() private _element: HTMLElement;

  /**
   * Internal event that emits whenever the state of the radio option
   * in relation to the parent selection panel changes.
   */
  @Event({
    bubbles: true,
    eventName: 'state-change',
  })
  public stateChange: EventEmitter<RadioButtonStateChange>;

  @Watch('checked')
  public handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.stateChange.emit({ type: 'checked', checked: currentValue });
    }
  }

  @Watch('disabled')
  public handleDisabledChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.stateChange.emit({ type: 'disabled', disabled: currentValue });
    }
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  @Listen('click')
  public handleClick(event: Event): void {
    this.select();
    event.preventDefault();
  }

  @Method()
  public async select(): Promise<void> {
    if (this.disabled || this._disabledFromGroup) {
      return;
    }

    if (this.allowEmptySelection) {
      this.checked = !this.checked;
    } else if (!this.checked) {
      this.checked = true;
    }
  }

  public connectedCallback(): void {
    // We can use closest here, as we expect the parent sbb-selection-panel to be in light DOM.
    this._withinSelectionPanel = !!this._element.closest('sbb-selection-panel');
    this._isSelectionPanelInput =
      this._withinSelectionPanel && !this._element.closest('[slot="content"]');
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
    this._setupInitialStateAndAttributeObserver();
  }

  public disconnectedCallback(): void {
    this._radioButtonAttributeObserver.disconnect();
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    if (evt.code === 'Space') {
      this.select();
    }
  }

  // Set up the initial disabled/required values and start observe attributes changes.
  private _setupInitialStateAndAttributeObserver(): void {
    this._disabledFromGroup = !!this._element.dataset.groupDisabled;
    this._requiredFromGroup = !!this._element.dataset.groupRequired;
    this._radioButtonAttributeObserver.observe(this._element, radioButtonObserverConfig);
  }

  /** Observe changes on data attributes and set the appropriate values. */
  private _onRadioButtonAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this._disabledFromGroup = !!isValidAttribute(this._element, 'data-group-disabled');
      }
      if (mutation.attributeName === 'data-group-required') {
        this._requiredFromGroup = !!isValidAttribute(this._element, 'data-group-required');
      }
    }
  }

  public render(): JSX.Element {
    return (
      <Host
        data-is-selection-panel-input={this._isSelectionPanelInput}
        /* eslint-disable jsx-a11y/aria-proptypes */
        aria-checked={`${this.checked}`}
        aria-disabled={`${this.disabled || this._disabledFromGroup}`}
        /* eslint-enable jsx-a11y/aria-proptypes */
        role="radio"
      >
        <label class="sbb-radio-button">
          <input
            type="radio"
            aria-hidden="true"
            tabindex="-1"
            disabled={this.disabled || this._disabledFromGroup}
            required={this.required || this._requiredFromGroup}
            checked={this.checked}
            value={this.value}
            class="sbb-radio-button__input"
            onChange={(): void => console.log('Changed')}
          />
          <span class="sbb-radio-button__label-slot">
            <slot />
            {this._withinSelectionPanel && this._namedSlots['suffix'] && <slot name="suffix" />}
          </span>
          {this._withinSelectionPanel && this._namedSlots['subtext'] && <slot name="subtext" />}
          <span data-selection-panel-expanded></span>
        </label>
      </Host>
    );
  }
}
