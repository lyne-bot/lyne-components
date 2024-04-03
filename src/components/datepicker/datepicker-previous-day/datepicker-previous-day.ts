import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators';
import { i18nPreviousDay, i18nSelectPreviousDay } from '../../core/i18n';
import { SbbDatepickerButton } from '../common/datepicker-button';
import { findPreviousAvailableDate, type SbbInputUpdateEvent } from '../datepicker';
import '../../icon';

import style from './datepicker-previous-day.scss?lit&inline';

/**
 * Combined with a `sbb-datepicker`, it can be used to move the date back.
 */
@customElement('sbb-datepicker-previous-day')
@hostAttributes({
  slot: 'prefix',
})
export class SbbDatepickerPreviousDayElement extends SbbDatepickerButton {
  public static override styles: CSSResultGroup = style;

  protected iconName: string = 'chevron-small-left-small';
  protected ariaLabelTranslationOffBoundaryDay: Record<string, string> = i18nPreviousDay;
  protected ariaLabelTranslationSelectOffBoundaryDay = i18nSelectPreviousDay;
  protected findAvailableDate = findPreviousAvailableDate;

  protected onInputUpdated(event: CustomEvent<SbbInputUpdateEvent>): void {
    if (this.boundary !== event.detail.min) {
      this.boundary = event.detail.min!;
      this.setDisabledState(this.datePickerElement!);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker-previous-day': SbbDatepickerPreviousDayElement;
  }
}
