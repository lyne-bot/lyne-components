import { Component, h, Prop, Element } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row.scss',
  tag: 'sbb-timetable-row',
})
export class SbbTimetableRow {
  @Prop() public accessiblityLabel: string;

  @Prop() public pictogramName = 'tick-small';
  @Prop() public transportNumber?: string;
  @Prop() public direction = 'Richtung Hauptbahnhof';
  @Prop() public loading?: boolean;

  /** Host element */
  @Element() private _hostElement: HTMLElement;
  private _hasBadgeSlot: boolean;

  public componentWillLoad(): void {
    this._hasBadgeSlot = Boolean(this._hostElement.querySelector('[slot="badge"]'));
  }

  private _renderSkeleton(): JSX.Element {
    return (
      <div class="loading">
        <span class="loading__badge"></span>
        <div class="loading__row"></div>
        <div class="loading__row"></div>
        <div class="loading__row"></div>
      </div>
    );
  }

  public render(): JSX.Element {
    const badgeClass = this._hasBadgeSlot ? 'timetable__row-badge' : '';

    if (this.loading === true) {
      return this._renderSkeleton();
    }

    return (
      // <sbb-timetable-row-button role="presentation" accessiblity-label={this.accessiblityLabel}>
      <div class={`timetable__row ${badgeClass}`} role="row">
        <slot name="badge" />
        <div class="timetable__row-header" role="rowheader">
          <slot name="pictogram"></slot>
          <slot name="transportNumber">
            <span>{this.transportNumber}</span>
          </slot>
          <slot name="direction"></slot>
        </div>

        <div class="timetable__row-body" role="gridcell">
          <slot name="walkTimeBefore" />
          <slot name="leftTime" />
          <slot name="pearlChain" />
          <slot name="rightTime" />
          <slot name="walkTimeAfter" />
        </div>

        <div class="timetable__row-footer" role="gridcell">
          <slot name="plattform" />
          <ul class="timetable__row-occupancy">
            <li>
              <slot name="occupancyFirstClass">
                1.
                <sbb-icon name="walk-small"></sbb-icon>
              </slot>
            </li>
            <li>
              <slot name="occupancySecondClass">
                2.
                <sbb-icon name="walk-small"></sbb-icon>
              </slot>
            </li>
          </ul>
          <slot name="travelHints"></slot>
          <slot name="duration"></slot>
          <slot name="warning" />
        </div>
      </div>
      // </sbb-timetable-row-button>
    );
  }
}
