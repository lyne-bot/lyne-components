import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';

import {
  i18nDurationHour,
  i18nDurationMinute
} from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-timetable-duration.default.scss',
    shared: 'styles/sbb-timetable-duration.shared.scss'
  },
  tag: 'sbb-timetable-duration'
})

export class SbbTimetableDuration {

  private _currentLanguage = getDocumentLang();

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @Prop() public config!: string;

  public render(): JSX.Element {

    const config = JSON.parse(this.config);

    const hoursLabelShort = i18nDurationHour.multiple.short[this._currentLanguage];
    const minutesLabelShort = i18nDurationMinute.multiple.short[this._currentLanguage];

    let visualText = '';
    let a11yLabel = '';

    let hoursLabelLong = i18nDurationHour.multiple.long[this._currentLanguage];
    let minutesLabelLong = i18nDurationMinute.multiple.long[this._currentLanguage];

    if (config.hours === 1) {
      hoursLabelLong = i18nDurationHour.single.long[this._currentLanguage];
    }

    if (config.minutes === 1) {
      minutesLabelLong = i18nDurationMinute.single.long[this._currentLanguage];
    }

    if (config.hours !== 0) {
      visualText += `${config.hours} ${hoursLabelShort}`;
      a11yLabel += `${config.hours} ${hoursLabelLong}`;
    }

    visualText += ` ${config.minutes} ${minutesLabelShort}`;
    a11yLabel += ` ${config.minutes} ${minutesLabelLong}.`;

    return (
      <p
        aria-label={a11yLabel}
        class='duration'
        role='text'
      >
        <span
          aria-hidden='true'
          class='duration__text--visual'
          role='presentation'
        >
          {visualText}
        </span>
        <span class='duration__text--visually-hidden'>
          {a11yLabel}
        </span>
      </p>
    );
  }
}
