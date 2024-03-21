import {
  type CSSResultGroup,
  nothing,
  LitElement,
  type PropertyValueMap,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { SbbNamedSlotListMixin, type WithListChildren } from '../../core/common-behaviors';
import { LanguageController } from '../../core/common-behaviors';
import { EventEmitter } from '../../core/eventing';
import { i18nTrain, i18nWagonsLabel } from '../../core/i18n';
import type { SbbTitleLevel } from '../../title';
import type { SbbTrainBlockedPassageElement } from '../train-blocked-passage';
import type { SbbTrainWagonElement } from '../train-wagon';

import style from './train.scss?lit&inline';

import '../../icon';

/**
 * It can be used as a container for `sbb-train-wagon` or `sbb-train-blocked-passage` components.
 *
 * @slot - Use the unnamed slot to add 'sbb-train-wagon' elements to the `sbb-train`.
 */
@customElement('sbb-train')
export class SbbTrainElement extends SbbNamedSlotListMixin<
  SbbTrainWagonElement | SbbTrainBlockedPassageElement,
  typeof LitElement
>(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    trainSlotChange: 'trainSlotChange',
  } as const;
  protected override readonly listChildTagNames = ['SBB-TRAIN-WAGON', 'SBB-TRAIN-BLOCKED-PASSAGE'];

  /** General label for "driving direction". */
  @property({ attribute: 'direction-label' }) public directionLabel!: string;

  /** Heading level of the direction label, used for screen readers. */
  @property({ attribute: 'direction-label-level' }) public directionLabelLevel: SbbTitleLevel = '6';

  /** Label for the destination station of the train. */
  @property() public station?: string;

  /** Accessibility label for additional information regarding the leaving direction of the train. */
  @property({ attribute: 'accessibility-label' }) public accessibilityLabel?: string;

  /** Controls the direction indicator to show the arrow left or right. Default is left.  */
  @property({ reflect: true }) public direction: 'left' | 'right' = 'left';

  private _language = new LanguageController(this);

  /**
   * @internal
   * Emits whenever the train slot changes.
   */
  private _trainSlotChange: EventEmitter = new EventEmitter(
    this,
    SbbTrainElement.events.trainSlotChange,
    {
      bubbles: true,
      cancelable: true,
    },
  );

  /**
   * Create the aria-label text out of the direction label, station and the accessibility label.
   */
  private _getDirectionAriaLabel(): string {
    const textParts: string[] = [i18nTrain[this._language.current]];

    if (this.directionLabel && this.station) {
      textParts.push(`${this.directionLabel} ${this.station}`);
    }

    if (this.accessibilityLabel) {
      textParts.push(this.accessibilityLabel);
    }

    return `${textParts.join(', ')}.`;
  }

  protected override willUpdate(changedProperties: PropertyValueMap<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('listChildren')) {
      this._trainSlotChange.emit();
    }
  }

  protected override render(): TemplateResult {
    const TITLE_TAG_NAME = `h${this.directionLabelLevel}`;

    /* eslint-disable lit/binding-positions */
    return html`
      <div class="sbb-train">
        <${unsafeStatic(TITLE_TAG_NAME)} class="sbb-train__direction-label-sr">
          ${this._getDirectionAriaLabel()}
        </${unsafeStatic(TITLE_TAG_NAME)}>
        ${this.renderList({
          class: 'sbb-train__wagons',
          ariaLabel: i18nWagonsLabel[this._language.current],
        })}

        ${
          this.directionLabel
            ? html`<div class="sbb-train__direction" aria-hidden="true">
                <div class="sbb-train__direction-heading">
                  <span class="sbb-train__direction-label">${this.directionLabel}</span>
                  ${this.station
                    ? html`<span class="sbb-train__direction-station">${this.station}</span>`
                    : nothing}
                </div>
                <div class="sbb-train__direction-indicator">
                  <div class="sbb-train__sticky-wrapper">
                    <sbb-icon
                      class="sbb-train__direction-arrow"
                      name=${this.direction === 'left'
                        ? 'chevron-small-left-small'
                        : 'chevron-small-right-small'}
                    ></sbb-icon>
                  </div>
                </div>
              </div>`
            : nothing
        }
      </div>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train': SbbTrainElement;
  }
}
