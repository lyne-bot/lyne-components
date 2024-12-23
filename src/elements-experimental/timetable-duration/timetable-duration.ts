import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { i18nDurationHour, i18nDurationMinute } from '@sbb-esta/lyne-elements/core/i18n.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './timetable-duration.scss?lit&inline';

/**
 * Used in `sbb-timetable-row`, it displays information about the trip duration.
 */
export
@customElement('sbb-timetable-duration')
class SbbTimetableDurationElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @forceType()
  @property()
  public accessor config: string = '';

  private _language = new SbbLanguageController(this);

  protected override render(): TemplateResult {
    const config = JSON.parse(this.config);

    const hoursLabelShort = i18nDurationHour.multiple.short[this._language.current];
    const minutesLabelShort = i18nDurationMinute.multiple.short[this._language.current];

    let visualText = '';
    let a11yLabel = '';

    let hoursLabelLong = i18nDurationHour.multiple.long[this._language.current];
    let minutesLabelLong = i18nDurationMinute.multiple.long[this._language.current];

    if (config.hours === 1) {
      hoursLabelLong = i18nDurationHour.single.long[this._language.current];
    }

    if (config.minutes === 1) {
      minutesLabelLong = i18nDurationMinute.single.long[this._language.current];
    }

    if (config.hours !== 0) {
      visualText += `${config.hours} ${hoursLabelShort}`;
      a11yLabel += `${config.hours} ${hoursLabelLong}`;
    }

    visualText += ` ${config.minutes} ${minutesLabelShort}`;
    a11yLabel += ` ${config.minutes} ${minutesLabelLong}.`;

    return html`
      <p aria-label=${a11yLabel} class="duration" role="text">
        <span aria-hidden="true" class="duration__text--visual" role="presentation">
          ${visualText}
        </span>
        <span class="duration__text--visually-hidden">${a11yLabel}</span>
      </p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-duration': SbbTimetableDurationElement;
  }
}
