import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  SbbMediaQueryForcedColors,
  SbbLanguageController,
  SbbMediaMatcherController,
} from '../core/controllers.js';
import { setOrRemoveAttribute } from '../core/dom.js';
import { i18nOccupancy } from '../core/i18n.js';
import type { SbbOccupancy } from '../core/interfaces.js';
import { SbbNegativeMixin } from '../core/mixins.js';
import { SbbIconBase } from '../icon.js';

import style from './timetable-occupancy-icon.scss?lit&inline';

/**
 * It displays a wagon's occupancy icon.
 */
export
@customElement('sbb-timetable-occupancy-icon')
class SbbTimetableOccupancyIconElement extends SbbNegativeMixin(SbbIconBase) {
  public static override styles: CSSResultGroup = [SbbIconBase.styles, style];

  /** Wagon occupancy. */
  @property() public accessor occupancy: SbbOccupancy = 'none';

  private _language = new SbbLanguageController(this).withHandler(() => this._setAriaLabel());
  private _mediaMatcher = new SbbMediaMatcherController(this, {
    [SbbMediaQueryForcedColors]: (matches) => {
      this._forcedColors = matches;
      this._setNameAndAriaLabel();
    },
  });

  private _forcedColors: boolean = this._mediaMatcher.matches(SbbMediaQueryForcedColors) ?? false;

  private async _setNameAndAriaLabel(): Promise<void> {
    if (!this.occupancy) {
      return;
    }

    let icon = `utilization-${this.occupancy}`;
    if (this._forcedColors) {
      icon += '-high-contrast';
    } else if (this.negative) {
      icon += '-negative';
    }

    await this.loadSvgIcon(icon);
  }

  protected override async fetchSvgIcon(namespace: string, name: string): Promise<string> {
    this._setAriaLabel();
    return super.fetchSvgIcon(namespace, name);
  }

  private _setAriaLabel(): void {
    const label = (i18nOccupancy[this.occupancy] as Record<string, string>)?.[
      this._language.current
    ];
    setOrRemoveAttribute(this, 'aria-label', label);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._setNameAndAriaLabel();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('occupancy') || changedProperties.has('negative')) {
      this._setNameAndAriaLabel();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-occupancy-icon': SbbTimetableOccupancyIconElement;
  }
}
