import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, isServer, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import type { SbbMiniButtonElement } from '../../button/mini-button.js';
import type { CalendarView, SbbCalendarElement } from '../../calendar.js';
import { sbbInputModalityDetector } from '../../core/a11y.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { i18nShowCalendar } from '../../core/i18n.js';
import { SbbHydrationMixin, SbbNegativeMixin } from '../../core/mixins.js';
import type { SbbDateInputElement } from '../../date-input.js';
import type { SbbPopoverElement } from '../../popover/popover.js';
import { SbbDatepickerAssociationControlController, type SbbDatepickerControl } from '../common.js';
import type { SbbDatepickerElement } from '../datepicker.js';

import style from './datepicker-toggle.scss?lit&inline';

import '../../calendar.js';
import '../../popover/popover.js';
import '../../button/mini-button.js';

const isDateInput = <T>(
  element: HTMLInputElement | SbbDateInputElement<T> | null,
): element is SbbDateInputElement<T> => element?.localName === 'sbb-date-input';

/**
 * Combined with a `sbb-datepicker`, it can be used to select a date from a `sbb-calendar`.
 */
export
@customElement('sbb-datepicker-toggle')
class SbbDatepickerToggleElement<T = Date>
  extends SbbNegativeMixin(SbbHydrationMixin(LitElement))
  implements SbbDatepickerControl<T>
{
  public static override styles: CSSResultGroup = style;

  /**
   * Datepicker reference.
   * @internal
   * @deprecated Use property/attribute `datepicker` instead.
   */
  @property({ attribute: 'date-picker' })
  public set datePicker(value: string | SbbDatepickerElement<T> | null) {
    if (import.meta.env.DEV) {
      console.warn(
        `Property datePicker/Attribute date-picker is deprecated. Use 'datepicker' instead.`,
      );
    }
    this.datepicker = value as unknown as SbbDatepickerElement<T> | null;
  }
  /** @internal */
  public get datePicker(): string | SbbDatepickerElement<T> | null {
    return this.datepicker;
  }

  /** Datepicker reference. */
  @property({ attribute: 'datepicker' })
  public set datepicker(value: SbbDatepickerElement<T> | null) {
    this._datepicker =
      typeof value === 'string'
        ? ((this.getRootNode?.() as ParentNode)?.querySelector?.(`#${value}`) ?? null)
        : value;
  }
  public get datepicker(): SbbDatepickerElement<T> | null {
    return this._datepicker ?? null;
  }
  private _datepicker?: SbbDatepickerElement<T> | null;

  /** The initial view of calendar which should be displayed on opening. */
  @property() public accessor view: CalendarView = 'day';

  @state() private accessor _disabled = false;

  @state() private accessor _min: T | string | number | null | undefined = null;

  @state() private accessor _max: T | string | number | null | undefined = null;

  @state() private accessor _renderCalendar = false;

  private _calendarElement!: SbbCalendarElement<T>;
  private _triggerElement!: SbbMiniButtonElement;
  private _popoverElement!: SbbPopoverElement;
  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    this.addController(new SbbDatepickerAssociationControlController(this));
    this.addEventListener?.('click', (event) => {
      if (event.composedPath()[0] === this) {
        this.open();
      }
    });
    if (!isServer) {
      this.hydrationComplete.then(() => (this._renderCalendar = true));
    }
  }

  /**
   * Opens the calendar.
   */
  public open(): void {
    if (!this._triggerElement) {
      this._triggerElement = this.shadowRoot!.querySelector('sbb-mini-button')!;
    }
    this._triggerElement.click();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'prefix';
    const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
    if (formField) {
      this.negative = formField.hasAttribute('negative');
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (this.datepicker) {
      this._disabled =
        (this.datepicker.inputElement?.disabled || this.datepicker.inputElement?.readOnly) ?? true;
      this._min = this.datepicker.inputElement?.min;
      this._max = this.datepicker.inputElement?.max;

      this._configureCalendar();
      if (this._calendarElement) {
        this._calendarElement.selected = this.datepicker.valueAsDate ?? null;
      }
    } else {
      this._disabled = true;
      this._min = null;
      this._max = null;
    }
  }

  private _configureCalendar(): void {
    if (!this._calendarElement || !this.datepicker) {
      return;
    }
    this._calendarElement.wide = this.datepicker.wide;
    this._calendarElement.now = this._nowOrNull();
    this._calendarElement.dateFilter = this.datepicker.dateFilter;
  }

  private _assignCalendar(calendar: SbbCalendarElement<T>): void {
    if (this._calendarElement && this._calendarElement === calendar) {
      return;
    }
    this._calendarElement = calendar;
    if (!('valueAsDate' in (this.datepicker ?? {})) || !this._calendarElement?.resetPosition) {
      return;
    }
    this._calendarElement.selected = this.datepicker!.valueAsDate ?? null;
    this._configureCalendar();
    this._calendarElement.resetPosition();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    this._popoverElement.trigger = this._triggerElement;
  }

  private _nowOrNull(): T | null {
    return this.datepicker?.hasCustomNow() ? this.datepicker.now : null;
  }

  protected override render(): TemplateResult {
    return html`
      <sbb-mini-button
        class="sbb-datepicker-toggle__trigger"
        icon-name="calendar-small"
        aria-label=${i18nShowCalendar[this._language.current]}
        ?disabled=${!isServer && (!this.datepicker || this._disabled)}
        ?negative=${this.negative}
        ${ref((el?: Element) => (this._triggerElement = el as SbbMiniButtonElement))}
      ></sbb-mini-button>
      <sbb-popover
        @willOpen=${() => this._calendarElement.resetPosition()}
        @didOpen=${() => {
          if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
            this._calendarElement.focus();
          }
        }}
        .trigger=${this._triggerElement}
        hide-close-button
        ${ref((el?: Element) => (this._popoverElement = el as SbbPopoverElement))}
      >
        ${this._renderCalendar
          ? html`<sbb-calendar
              .view=${this.view}
              .min=${this._min}
              .max=${this._max}
              .now=${this._nowOrNull()}
              ?wide=${this.datepicker?.wide}
              .dateFilter=${this.datepicker?.dateFilter ?? null}
              @dateSelected=${(d: CustomEvent<T>) => {
                this._calendarElement.selected = d.detail;
                if (this.datepicker) {
                  const input = this.datepicker.inputElement;
                  if (isDateInput(input)) {
                    input.valueAsDate = d.detail;
                    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
                    // Emit blur event when value is changed programmatically to notify
                    // frameworks that rely on that event to update form status.
                    input.dispatchEvent(new Event('blur', { composed: true }));
                  } else {
                    this.datepicker.valueAsDate = d.detail;
                  }
                }
              }}
              ${ref((calendar?: Element) =>
                this._assignCalendar(calendar as SbbCalendarElement<T>),
              )}
            ></sbb-calendar>`
          : nothing}
      </sbb-popover>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker-toggle': SbbDatepickerToggleElement;
  }
}
