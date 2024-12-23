import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';
import { i18nPreviousDay, i18nSelectPreviousDay } from '../../core/i18n.js';
import { SbbDatepickerButton } from '../common.js';

import style from './datepicker-previous-day.scss?lit&inline';

/**
 * Combined with a `sbb-datepicker`, it can be used to move the date back.
 */
export
@customElement('sbb-datepicker-previous-day')
@hostAttributes({
  slot: 'prefix',
})
class SbbDatepickerPreviousDayElement<T = Date> extends SbbDatepickerButton<T> {
  public static override styles: CSSResultGroup = style;

  protected iconName: string = 'chevron-small-left-small';
  protected i18nOffBoundaryDay: Record<string, string> = i18nPreviousDay;
  protected i18nSelectOffBoundaryDay = i18nSelectPreviousDay;

  protected findAvailableDate(date: T): T {
    // When calling findAvailableDate, datepickerElement is always defined.
    return this.datePickerElement!.findPreviousAvailableDate(date);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker-previous-day': SbbDatepickerPreviousDayElement;
  }
}
