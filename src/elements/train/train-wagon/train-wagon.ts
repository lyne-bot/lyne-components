import { type CSSResultGroup, LitElement, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { html } from 'lit/static-html.js';

import { SbbLanguageController } from '../../core/controllers.js';
import { forceType, handleDistinctChange, omitEmptyConverter } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import {
  i18nAdditionalWagonInformationHeading,
  i18nBlockedPassage,
  i18nClass,
  i18nClosedCompartmentLabel,
  i18nCouchetteWagonLabel,
  i18nLocomotiveLabel,
  i18nRestaurantWagonLabel,
  i18nSector,
  i18nSleepingWagonLabel,
  i18nWagonLabel,
  i18nWagonLabelNumber,
} from '../../core/i18n.js';
import type { SbbOccupancy } from '../../core/interfaces.js';
import { SbbNamedSlotListMixin } from '../../core/mixins.js';
import type { SbbIconElement } from '../../icon.js';

import style from './train-wagon.scss?lit&inline';

import '../../icon.js';
import '../../timetable-occupancy-icon.js';

const typeToIconMap: Record<string, string> = {
  couchette: 'sa-cc',
  sleeping: 'sa-wl',
  restaurant: 'sa-wr',
};

/**
 * It displays a train compartment within a `sbb-train` component.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-icon` for meta-information of the `sbb-train-wagon`.
 */
export
@customElement('sbb-train-wagon')
class SbbTrainWagonElement extends SbbNamedSlotListMixin<SbbIconElement, typeof LitElement>(
  LitElement,
) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    sectorChange: 'sectorChange',
  } as const;

  /**
   * Wagon type.
   * For `wagon-end-left` and `wagon-end-right`, please set the corresponding value of the `blockedPassage` property.
   */
  @property({ reflect: true }) public accessor type:
    | 'wagon'
    | 'wagon-end-left'
    | 'wagon-end-right'
    | 'couchette'
    | 'sleeping'
    | 'restaurant'
    | 'locomotive'
    | 'closed' = 'wagon';

  protected override readonly listChildLocalNames = ['sbb-icon'];

  /** Occupancy of a wagon. */
  @property() public accessor occupancy: SbbOccupancy | null = null;

  /** Sector in which the wagon stops. */
  @forceType()
  @handleDistinctChange((e) => e._sectorChanged())
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor sector: string = '';

  /** Accessibility text for blocked passages of the wagon. */
  @property({ attribute: 'blocked-passage' })
  public accessor blockedPassage: 'previous' | 'next' | 'both' | 'none' = 'none';

  /** Class label */
  @property({ attribute: 'wagon-class' }) public accessor wagonClass: '1' | '2' | null = null;

  /** Wagon number */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor label: string = '';

  /** Additional accessibility text which will be appended to the end. */
  @forceType()
  @property({ attribute: 'additional-accessibility-text' })
  public accessor additionalAccessibilityText: string = '';

  private _language = new SbbLanguageController(this);

  /**
   * @internal
   * Emits whenever the sector value changes.
   */
  private _sectorChange: EventEmitter = new EventEmitter(
    this,
    SbbTrainWagonElement.events.sectorChange,
    {
      bubbles: true,
      cancelable: true,
    },
  );

  private _sectorChanged(): void {
    this._sectorChange.emit();
  }

  private _typeLabel(): string {
    if (this.type === 'closed') {
      return i18nClosedCompartmentLabel[this._language.current];
    } else if (this.type === 'locomotive') {
      return i18nLocomotiveLabel[this._language.current];
    } else if (this.type === 'couchette') {
      return i18nCouchetteWagonLabel[this._language.current];
    } else if (this.type === 'sleeping') {
      return i18nSleepingWagonLabel[this._language.current];
    } else if (this.type === 'restaurant') {
      return i18nRestaurantWagonLabel[this._language.current];
    }
    return i18nWagonLabel[this._language.current];
  }

  protected override render(): TemplateResult {
    const blockedPassage =
      this.type === 'wagon-end-left' && this.blockedPassage === 'none'
        ? 'previous'
        : this.type === 'wagon-end-right' && this.blockedPassage === 'none'
          ? 'next'
          : (this.blockedPassage ?? 'none');

    const hasBlockedPassageEntry = blockedPassage !== 'none';

    // From accessibility perspective we cannot create a list with only one entry.
    // We need to know what will be presented and switch semantics based on count.
    const listEntriesCount =
      +!!this.sector +
      +!!this.label +
      +(!!this.wagonClass && this.type !== 'closed') +
      +(!!this.occupancy && this.type !== 'closed') +
      +hasBlockedPassageEntry;

    const sectorString = `${i18nSector[this._language.current]}, ${this.sector}`;

    const labelContent = this.label
      ? html`<span class="sbb-screen-reader-only">
            ${`${i18nWagonLabelNumber[this._language.current]}, ${this.label}`}
          </span>
          <span aria-hidden="true">${this.label}</span>`
      : nothing;

    const wagonClassContent = html`<span class="sbb-screen-reader-only">
        ${this.wagonClass === '1'
          ? i18nClass['first'][this._language.current]
          : i18nClass['second'][this._language.current]}
      </span>
      <span aria-hidden="true">${this.wagonClass}</span>`;

    const mainIcon = typeToIconMap[this.type]
      ? html`<sbb-icon
          name=${typeToIconMap[this.type]}
          class="sbb-train-wagon__main-icon"
        ></sbb-icon>`
      : nothing;

    return html`
      <div class="sbb-train-wagon">
        ${when(
          listEntriesCount > 1,
          () =>
            html`<ul aria-label=${this._typeLabel()} class="sbb-train-wagon__compartment">
              ${this.sector
                ? html`<li class="sbb-screen-reader-only">${sectorString}</li>`
                : nothing}
              <li class="sbb-train-wagon__label" aria-hidden=${`${!this.label}`}>
                ${labelContent}
              </li>
              ${this.wagonClass && this.type !== 'closed'
                ? html`<li class="sbb-train-wagon__class">${wagonClassContent}</li>`
                : nothing}
              ${this.occupancy && this.type !== 'closed'
                ? html`<sbb-timetable-occupancy-icon
                    class="sbb-train-wagon__occupancy"
                    role="listitem"
                    occupancy=${this.occupancy}
                  ></sbb-timetable-occupancy-icon>`
                : nothing}
              ${hasBlockedPassageEntry
                ? html`<li class="sbb-screen-reader-only">
                    ${i18nBlockedPassage[blockedPassage][this._language.current]}
                  </li>`
                : nothing}
              ${mainIcon}
            </ul>`,
          () =>
            html`<div class="sbb-train-wagon__compartment">
              <span class="sbb-screen-reader-only">
                ${`${this._typeLabel()}${this.sector ? `, ${sectorString}` : ''}`}
              </span>
              <span class="sbb-train-wagon__label" aria-hidden=${`${!this.label}`}>
                ${labelContent}
              </span>

              ${this.wagonClass && this.type !== 'closed'
                ? html`<span class="sbb-train-wagon__class">${wagonClassContent}</span>`
                : nothing}
              ${this.occupancy && this.type !== 'closed'
                ? html`<sbb-timetable-occupancy-icon
                    class="sbb-train-wagon__occupancy"
                    occupancy=${this.occupancy}
                  ></sbb-timetable-occupancy-icon>`
                : nothing}
              ${hasBlockedPassageEntry
                ? html`<span class="sbb-screen-reader-only">
                    ${i18nBlockedPassage[blockedPassage][this._language.current]}
                  </span>`
                : nothing}
              ${mainIcon}
            </div> `,
        )}
        ${this.additionalAccessibilityText
          ? html`<span class="sbb-screen-reader-only">, ${this.additionalAccessibilityText}</span>`
          : nothing}
        ${this.renderList({
          class: 'sbb-train-wagon__attribute-icon-list',
          ariaLabel: i18nAdditionalWagonInformationHeading[this._language.current],
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train-wagon': SbbTrainWagonElement;
  }
}
