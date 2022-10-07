import { Component, Event, EventEmitter, h, JSX, Prop, State } from '@stencil/core';
import { SbbSliderChange } from './sbb-slider.custom';

/**
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-slider.scss',
  tag: 'sbb-slider',
})
export class SbbSlider {
  @Prop() public value?: string = '';

  @Prop() public name?: string = '';

  @Prop() public min?: string = '0';

  @Prop() public max?: string = '100';

  @Prop() public step?: string = '';

  @Prop() public readonly?: boolean = false;

  @Prop() public disabled?: boolean = false;

  @Event() public sbbChange: EventEmitter<SbbSliderChange>;

  @State() private _valueFraction = 0;

  private _rangeInput!: HTMLInputElement;

  private _handleChange(): void {
    const value = this._rangeInput.valueAsNumber;
    const min = +this._rangeInput.min;
    const max = +this._rangeInput.max;
    this._valueFraction = (value - min) / (max - min);
  }

  private _emitChange(): void {
    this.sbbChange.emit({
      value: this._rangeInput.valueAsNumber,
      max: +this._rangeInput.max,
      min: +this._rangeInput.min,
    });
  }

  public render(): JSX.Element {
    const inputAttributes = {
      value: this.value || null,
      name: this.name || null,
      min: this.min || null,
      max: this.max || null,
      step: this.step || null,
      disabled: this.disabled || null,
      readonly: this.readonly || null,
    };
    const step = +this.step;
    const stepFraction = Number.isNaN(step)
      ? NaN
      : Math.abs((step - +this.min) / (+this.max - +this.min));
    // The width of a step must be larger than four pixels, as the gap size is four pixel and
    // the CSS calculation would only render white space if the size of a step is smaller or equal
    // to four pixels.
    // TODO: There is probably a better way to check this, as the width might also be variable.
    const isStepped = this.step && stepFraction > 0.01;
    return (
      <div class="slider__wrapper">
        <sbb-icon name="circle-minus-small" />
        <div
          class="slider__container"
          style={{
            '--slider-value-fraction': this._valueFraction.toString(),
            '--slider-step-fraction': stepFraction.toString(),
          }}
        >
          <input
            ref={(e) => {
              this._rangeInput = e;
              this._handleChange();
            }}
            class="slider__range-input"
            type="range"
            {...inputAttributes}
            onChange={() => this._emitChange()}
            onInput={() => this._handleChange()}
          ></input>
          <div
            class={{
              'slider__line': !this.disabled && !this.readonly,
              'slider__line-disabled': this.disabled,
              'slider__line-readonly': this.readonly,
              'slider__line--stepped': isStepped,
            }}
          >
            <div class={{
              'slider__selected-line': !this.disabled && !this.readonly,
              'slider__selected-line-disabled': this.disabled,
              'slider__selected-line-readonly': this.readonly,
              }}></div>
          </div>
          <div class="slider__knob"></div>
        </div>
        <sbb-icon name="circle-plus-small" />
      </div>
    );
  }
}
