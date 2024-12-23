import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';
import { i18nNextDay, i18nSelectNextDay } from '../../core/i18n.js';
import { SbbDatepickerButton } from '../common.js';

import style from './datepicker-next-day.scss?lit&inline';

/**
 * Combined with a `sbb-datepicker`, it can be used to move the date ahead.
 */
export
@customElement('sbb-datepicker-next-day')
@hostAttributes({
  slot: 'suffix',
})
class SbbDatepickerNextDayElement<T = Date> extends SbbDatepickerButton<T> {
  public static override styles: CSSResultGroup = style;

  protected iconName: string = 'chevron-small-right-small';
  protected i18nOffBoundaryDay: Record<string, string> = i18nNextDay;
  protected i18nSelectOffBoundaryDay = i18nSelectNextDay;

  protected findAvailableDate(date: T): T {
    // When calling findAvailableDate, datepickerElement is always defined.
    return this.datePickerElement!.findNextAvailableDate(date);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker-next-day': SbbDatepickerNextDayElement;
  }
}
