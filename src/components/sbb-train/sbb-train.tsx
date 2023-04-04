import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { InterfaceSbbTrainAttributes } from './sbb-train.custom.d';
import { i18nTrain, i18nWagonsLabel } from '../../global/i18n';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';

/**
 * @slot unnamed - Used for slotting sbb-train-wagons.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train.scss',
  tag: 'sbb-train',
})
export class SbbTrain implements ComponentInterface {
  @Element() private _element: HTMLSbbTrainElement;

  /** General label for "driving direction". */
  @Prop() public directionLabel!: string;

  /** Label for the destination station of the train. */
  @Prop() public station?: string;

  /** Accessibility label for additional information regarding the leaving direction of the train. */
  @Prop() public accessibilityLabel?: string;

  /** Controls the direction indicator to show the arrow left or right. Default is left.  */
  @Prop({ reflect: true }) public direction: InterfaceSbbTrainAttributes['direction'] = 'left';

  @State() private _wagons: (HTMLSbbTrainBlockedPassageElement | HTMLSbbTrainWagonElement)[];

  @State() private _currentLanguage = documentLanguage();

  /**
   * @internal
   * Emits whenever the train slot changes.
   */
  @Event({ bubbles: true, cancelable: true }) public trainSlotChange: EventEmitter;

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  public connectedCallback(): void {
    this._readWagons();
  }

  /**
   * Create the aria-label text out of the direction label, station and the accessibility label.
   */
  private _getDirectionAriaLabel(): string {
    const textParts: string[] = [i18nTrain[this._currentLanguage]];

    if (this.directionLabel && this.station) {
      textParts.push(`${this.directionLabel} ${this.station}`);
    }

    if (this.accessibilityLabel) {
      textParts.push(this.accessibilityLabel);
    }

    return `${textParts.join(', ')}.`;
  }

  private _readWagons(): void {
    const wagons = Array.from(this._element.children).filter(
      (e): e is HTMLSbbTrainBlockedPassageElement | HTMLSbbTrainWagonElement =>
        e.tagName === 'SBB-TRAIN-WAGON' || e.tagName === 'SBB-TRAIN-BLOCKED-PASSAGE'
    );
    // If the slotted sbb-train-wagon and sbb-train-blocked-passage instances have not changed, we can skip syncing and updating
    // the link reference list.
    if (
      this._wagons &&
      wagons.length === this._wagons.length &&
      this._wagons.every((e, i) => wagons[i] === e)
    ) {
      return;
    }

    this._wagons = wagons;
  }

  private _handleSlotChange(): void {
    this.trainSlotChange.emit();
    this._readWagons();
  }

  public render(): JSX.Element {
    this._wagons.forEach((wagon, index) => wagon.setAttribute('slot', `wagon-${index}`));

    return (
      <div class="sbb-train" aria-label={this._getDirectionAriaLabel()}>
        <ul class="sbb-train__wagons" aria-label={i18nWagonsLabel[this._currentLanguage]}>
          {this._wagons.map((_, index) => (
            <li>
              <slot name={`wagon-${index}`} onSlotchange={(): void => this._handleSlotChange()} />
            </li>
          ))}
        </ul>
        <span hidden>
          <slot onSlotchange={() => this._handleSlotChange()} />
        </span>

        {this.directionLabel && (
          <div class="sbb-train__direction" aria-hidden="true">
            <div class="sbb-train__direction-heading">
              <span class="sbb-train__direction-label">{this.directionLabel}</span>
              {this.station && <span class="sbb-train__direction-station">{this.station}</span>}
            </div>
            <div class="sbb-train__direction-indicator">
              <div class="sbb-train__sticky-wrapper">
                <sbb-icon
                  class="sbb-train__direction-arrow"
                  name={
                    this.direction === 'left'
                      ? 'chevron-small-left-small'
                      : 'chevron-small-right-small'
                  }
                ></sbb-icon>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
