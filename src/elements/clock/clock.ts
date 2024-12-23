import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, isServer, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import type { SbbTime } from '../core/interfaces.js';

import clockFaceSVG from './assets/sbb_clock_face.svg?raw';
import clockHandleHoursSVG from './assets/sbb_clock_hours.svg?raw';
import clockHandleMinutesSVG from './assets/sbb_clock_minutes.svg?raw';
import clockHandleSecondsSVG from './assets/sbb_clock_seconds.svg?raw';
import style from './clock.scss?lit&inline';

/** Number of hours on the clock face. */
const TOTAL_HOURS_ON_CLOCK_FACE = 12;

/** Number of minutes on the clock face. */
const TOTAL_MINUTES_ON_CLOCK_FACE = 60;

/** Number of seconds on the clock face. */
const TOTAL_SECONDS_ON_CLOCK_FACE = 60;

/** Timeout for the clock start. */
const INITIAL_TIMEOUT_DURATION = 50;

/** Angle in a single rotation. */
const FULL_ANGLE = 360;

/** Angle between two consecutive hours: 360/12, means a full rotation / number of hours in a rotation. */
const HOURS_ANGLE = 30;

/** Angle between two consecutive minutes: 360/60, means a full rotation / number of minutes in one hour. */
const MINUTES_ANGLE = 6;

/** Angle between two consecutive seconds for SBB clock custom behavior. */
const SBB_SECONDS_ANGLE = 360 / 58.5;

/** Number of seconds in a minute. */
const SECONDS_IN_A_MINUTE = 60;

/** Number of seconds in an hour. */
const SECONDS_IN_AN_HOUR = 3600;

const ADD_EVENT_LISTENER_OPTIONS: AddEventListenerOptions = {
  once: true,
  passive: true,
};

/**
 * It displays an analog clock with the classic SBB face.
 */
export
@customElement('sbb-clock')
class SbbClockElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * Define a specific time which the clock should show statically.
   * @param value HH:MM:ss
   */
  @property() public accessor now: SbbTime | null = null;

  /** Reference to the hour hand. */
  private _clockHandHours!: HTMLElement;

  /** Reference to the minute hand. */
  private _clockHandMinutes!: HTMLElement;

  /** Reference to the second hand. */
  private _clockHandSeconds!: HTMLElement;

  /** Hours value for the current date. */
  private _hours!: number;

  /** Minutes value for the current date. */
  private _minutes!: number;

  /** Seconds value for the current date. */
  private _seconds!: number;

  /** Move the minutes hand every minute. */
  private _handMovement?: ReturnType<typeof setInterval>;

  /** Callback function for hours hand. */
  private _moveHoursHandFn = (): void => this._moveHoursHand();

  /** Callback function for minutes hand. */
  private _moveMinutesHandFn = (): void => this._moveMinutesHand();

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (!isServer && changedProperties.has('now')) {
      this._startOrConfigureClock();
    }
  }

  protected override async firstUpdated(changedProperties: PropertyValues<this>): Promise<void> {
    super.firstUpdated(changedProperties);

    if (!isServer) {
      document.addEventListener('visibilitychange', this._handlePageVisibilityChange, false);
      await this._startOrConfigureClock();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removeEventListeners();
  }

  private _handlePageVisibilityChange = async (): Promise<void> => {
    if (document.visibilityState === 'hidden') {
      await this._stopClock();
    } else if (!this.now) {
      await this._startClock();
    }
  };

  private async _startOrConfigureClock(): Promise<void> {
    if (this.now) {
      await this._stopClock();
      this._resetSecondsHandAnimation();
      this._setHandsStartingPosition();
    } else {
      await this._startClock();
    }
  }

  /** Starts the clock by defining the hands starting position then starting the animations. */
  private async _startClock(): Promise<void> {
    this._clockHandHours?.addEventListener(
      'animationend',
      this._moveHoursHandFn,
      ADD_EVENT_LISTENER_OPTIONS,
    );
    this._clockHandSeconds?.addEventListener(
      'animationend',
      this._moveMinutesHandFn,
      ADD_EVENT_LISTENER_OPTIONS,
    );

    await new Promise<void>((resolve) =>
      setTimeout(() => {
        this._setHandsStartingPosition();

        this.style?.setProperty('--sbb-clock-animation-play-state', 'running');
        resolve();
      }, INITIAL_TIMEOUT_DURATION),
    );
  }

  /** Stops the clock by removing all the animations. */
  private async _stopClock(): Promise<void> {
    clearInterval(this._handMovement);

    this._removeSecondsAnimationStyles();
    this._removeHoursAnimationStyles();

    this._clockHandHours?.removeEventListener('animationend', this._moveHoursHandFn);
    this._clockHandSeconds?.removeEventListener('animationend', this._moveMinutesHandFn);

    this._clockHandMinutes?.classList.add('sbb-clock__hand-minutes--no-transition');

    this.style?.setProperty('--sbb-clock-animation-play-state', 'paused');
  }

  /** Set the starting position for the three hands on the clock face. */
  private _setHandsStartingPosition(): void {
    this._assignCurrentTime();
    const remainingSeconds = TOTAL_SECONDS_ON_CLOCK_FACE - this._seconds;
    const remainingMinutes = TOTAL_MINUTES_ON_CLOCK_FACE - this._minutes;
    const remainingHours = TOTAL_HOURS_ON_CLOCK_FACE - this._hours;

    let hoursAnimationDuration = 0;
    let hasRemainingMinutesOrSeconds = 0;

    if (remainingSeconds > 0) {
      hoursAnimationDuration += remainingSeconds;
      hasRemainingMinutesOrSeconds = 1;
    }

    if (remainingMinutes > 0) {
      hoursAnimationDuration +=
        (remainingMinutes - hasRemainingMinutesOrSeconds) * SECONDS_IN_A_MINUTE;
      hasRemainingMinutesOrSeconds = 1;
    }

    if (remainingHours > 0) {
      hoursAnimationDuration +=
        (remainingHours - hasRemainingMinutesOrSeconds) * SECONDS_IN_AN_HOUR;
    }

    this.style?.setProperty(
      '--sbb-clock-hours-animation-start-angle',
      `${Math.ceil(this._hours * HOURS_ANGLE + this._minutes / 2)}deg`,
    );
    this.style?.setProperty('--sbb-clock-hours-animation-duration', `${hoursAnimationDuration}s`);
    this.style?.setProperty(
      '--sbb-clock-seconds-animation-start-angle',
      `${Math.ceil(this._seconds * SBB_SECONDS_ANGLE)}deg`,
    );
    this.style?.setProperty('--sbb-clock-seconds-animation-duration', `${remainingSeconds}s`);

    this._setMinutesHand();

    this._clockHandSeconds?.classList.add('sbb-clock__hand-seconds--initial-minute');
    this._clockHandHours?.classList.add('sbb-clock__hand-hours--initial-hour');

    this.toggleAttribute('data-initialized', true);
  }

  /** Given the current date, calculates the hh/mm/ss values and the hh/mm/ss left to the next midnight. */
  private _assignCurrentTime(): void {
    const date = this.now ? null : new Date();
    const [hours, minutes, seconds] = date
      ? [date.getHours(), date.getMinutes(), date.getSeconds()]
      : this.now!.split(':').map((p) => +p);

    this._hours = hours % 12;
    this._minutes = minutes;
    this._seconds = seconds;
  }

  /** Set the starting position for the minutes hand. */
  private _setMinutesHand(): void {
    this._clockHandMinutes?.style.setProperty(
      'transform',
      `rotateZ(${Math.ceil(this._minutes * MINUTES_ANGLE)}deg)`,
    );
  }

  /** Move the hours hand to the next value. */
  private _moveHoursHand(): void {
    this._removeHoursAnimationStyles();

    let hoursAngle = Math.ceil(this._hours * HOURS_ANGLE + this._minutes / 2);

    if (hoursAngle >= FULL_ANGLE) {
      hoursAngle -= FULL_ANGLE;
    }

    this._clockHandHours?.style.setProperty('transform', `rotateZ(${hoursAngle}deg)`);
  }

  /** Move the minutes hand to the next value. */
  private _moveMinutesHand(): void {
    this._clockHandSeconds?.removeEventListener('animationend', this._moveMinutesHandFn);

    this._removeSecondsAnimationStyles();

    this._addMinutesAndSetHands();

    this._handMovement = setInterval(
      () => this._addMinutesAndSetHands(),
      TOTAL_SECONDS_ON_CLOCK_FACE * 1000,
    );
  }

  private _addMinutesAndSetHands(): void {
    this._minutes++;
    this._setMinutesHand();
  }

  /**
   * Removing animation by overriding with empty string,
   * then triggering a reflow and re add original animation by removing override.
   * @private
   */
  private _resetSecondsHandAnimation(): void {
    if (!this._clockHandSeconds) {
      return;
    }
    this._clockHandSeconds.style.animation = '';
    // Hack to trigger reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this._clockHandSeconds.offsetHeight;
    this._clockHandSeconds.style.removeProperty('animation');
  }

  private _removeEventListeners(): void {
    document?.removeEventListener('visibilitychange', this._handlePageVisibilityChange);
    this._clockHandHours?.removeEventListener('animationend', this._moveHoursHandFn);
    this._clockHandSeconds?.removeEventListener('animationend', this._moveMinutesHandFn);
    clearInterval(this._handMovement);
  }

  private _removeHoursAnimationStyles(): void {
    this._clockHandHours?.classList.remove('sbb-clock__hand-hours--initial-hour');
    this.style.removeProperty('--sbb-clock-hours-animation-start-angle');
    this.style.removeProperty('--sbb-clock-hours-animation-duration');
  }

  private _removeSecondsAnimationStyles(): void {
    this._clockHandSeconds?.classList.remove('sbb-clock__hand-seconds--initial-minute');
    this._clockHandMinutes?.classList.remove('sbb-clock__hand-minutes--no-transition');
    this.style.removeProperty('--sbb-clock-seconds-animation-start-angle');
    this.style.removeProperty('--sbb-clock-seconds-animation-duration');
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-clock">
        <span class="sbb-clock__face" .innerHTML=${clockFaceSVG}></span>
        <span
          class="sbb-clock__hand-hours"
          .innerHTML=${clockHandleHoursSVG}
          ${ref((e?: Element): void => {
            this._clockHandHours = e as HTMLSpanElement;
          })}
        ></span>
        <span
          class="sbb-clock__hand-minutes sbb-clock__hand-minutes--no-transition"
          .innerHTML=${clockHandleMinutesSVG}
          ${ref((el?: Element): void => {
            this._clockHandMinutes = el as HTMLSpanElement;
          })}
        ></span>
        <span
          class="sbb-clock__hand-seconds"
          .innerHTML=${clockHandleSecondsSVG}
          ${ref((el?: Element): void => {
            this._clockHandSeconds = el as HTMLSpanElement;
          })}
        ></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-clock': SbbClockElement;
  }
}
