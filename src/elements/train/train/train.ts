import {
  type CSSResultGroup,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { SbbLanguageController } from '../../core/controllers.js';
import { forceType, omitEmptyConverter } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import { i18nTrain, i18nWagonsLabel } from '../../core/i18n.js';
import { SbbNamedSlotListMixin, type WithListChildren } from '../../core/mixins.js';
import type { SbbTitleLevel } from '../../title.js';
import type { SbbTrainBlockedPassageElement } from '../train-blocked-passage.js';
import type { SbbTrainWagonElement } from '../train-wagon.js';

import style from './train.scss?lit&inline';

import '../../icon.js';

/**
 * It can be used as a container for `sbb-train-wagon` or `sbb-train-blocked-passage` components.
 *
 * @slot - Use the unnamed slot to add 'sbb-train-wagon' elements to the `sbb-train`.
 */
export
@customElement('sbb-train')
class SbbTrainElement extends SbbNamedSlotListMixin<
  SbbTrainWagonElement | SbbTrainBlockedPassageElement,
  typeof LitElement
>(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    trainSlotChange: 'trainSlotChange',
  } as const;
  protected override readonly listChildLocalNames = [
    'sbb-train-wagon',
    'sbb-train-blocked-passage',
  ];

  /** General label for "driving direction". */
  @forceType()
  @property({ attribute: 'direction-label', reflect: true, converter: omitEmptyConverter })
  public accessor directionLabel: string = '';

  /** Heading level of the direction label, used for screen readers. */
  @property({ attribute: 'direction-label-level' })
  public accessor directionLabelLevel: SbbTitleLevel = '6';

  /** Label for the destination station of the train. */
  @forceType()
  @property()
  public accessor station: string = '';

  /** Accessibility label for additional information regarding the leaving direction of the train. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /** Controls the direction indicator to show the arrow left or right. Default is left.  */
  @property({ reflect: true }) public accessor direction: 'left' | 'right' = 'left';

  private _language = new SbbLanguageController(this);

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

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
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
        ${
          this.directionLabel
            ? html`<div class="sbb-train__direction-heading" aria-hidden="true">
                <span class="sbb-train__direction-sticky-wrapper">
                  ${this.direction === 'left'
                    ? html`<sbb-icon name="chevron-small-left-small"></sbb-icon>`
                    : nothing}

                  <span class="sbb-train__direction-label">
                    ${this.directionLabel} ${this.station}
                  </span>

                  ${this.direction === 'right'
                    ? html`<sbb-icon name="chevron-small-right-small"></sbb-icon>`
                    : nothing}
                </span>
              </div>`
            : nothing
        }
        ${this.renderList({
          class: 'sbb-train__wagons',
          ariaLabel: i18nWagonsLabel[this._language.current],
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train': SbbTrainElement;
  }
}
