import { assert, expect } from '@open-wc/testing';
import { SbbBreakpointLargeMin } from '@sbb-esta/lyne-design-tokens';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonElement } from '../button/secondary-button.js';
import { fixture } from '../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing.js';

import { SbbCalendarElement } from './calendar.js';

import '../button.js';

describe(`sbb-calendar`, () => {
  let element: SbbCalendarElement;

  const waitForTransition = async (): Promise<void> => {
    //Wait for the transition to be over
    await waitForCondition(() => !element.hasAttribute('data-transition'));

    await waitForLitRender(element);

    //Wait for the new table to be rendered completely
    await waitForCondition(
      () => Array.from(element.shadowRoot!.querySelectorAll('.sbb-calendar__cell')).length > 0,
    );
  };

  const goToNextView = async (element: SbbCalendarElement): Promise<void> => {
    const nextButton = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
      "sbb-secondary-button[icon-name='chevron-small-right-small']",
    )!;

    nextButton.click();
    await waitForTransition();
  };

  describe('basic', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-calendar now="1673348400" selected="1673744400"></sbb-calendar>`,
      );
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbCalendarElement);
    });

    it('highlights current day', async () => {
      const currentDayButton = element.shadowRoot!.querySelector('button[data-day="10 1 2023"]');
      expect(currentDayButton).to.have.class('sbb-calendar__cell-current');
    });

    it('renders and navigates to next month', async () => {
      let day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');

      const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-next',
      )!;
      nextMonthButton.click();
      await waitForLitRender(element);

      day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('data-day')).to.be.equal('1 2 2023');
    });

    it('renders and navigates to previous month', async () => {
      let day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');

      const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-previous',
      )!;
      nextMonthButton.click();
      await waitForLitRender(element);

      day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('data-day')).to.be.equal('1 12 2022');
    });

    it('sets max and next month button gets disabled', async () => {
      element.max = 1674946800;
      await waitForLitRender(element);

      let day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');

      const nextMonthButton: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-next',
      )!;
      expect(nextMonthButton).to.have.attribute('disabled');
      nextMonthButton.click();
      await waitForLitRender(element);

      day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');
    });

    it('sets min and previous month button gets disabled', async () => {
      element.min = 1673737200;
      await waitForLitRender(element);

      let day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');

      const nextMonthButton = element.shadowRoot!.querySelector(
        '#sbb-calendar__controls-previous',
      ) as HTMLElement;
      expect(nextMonthButton).to.have.attribute('disabled');
      nextMonthButton.click();
      await waitForLitRender(element);

      day = element.shadowRoot!.querySelector('.sbb-calendar__day') as HTMLButtonElement;
      expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');
    });

    it('selects a different date', async () => {
      const selectedSpy = new EventSpy(SbbCalendarElement.events.dateSelected);
      const selectedDate = element.shadowRoot!.querySelector('button[data-day="15 1 2023"]');

      expect(selectedDate).to.have.class('sbb-calendar__selected');

      const newSelectedDate = element.shadowRoot!.querySelector(
        'button[data-day="18 1 2023"]',
      ) as HTMLElement;
      expect(newSelectedDate).not.to.have.class('sbb-calendar__selected');
      newSelectedDate.click();
      await selectedSpy.calledOnce();

      expect(selectedDate).not.to.have.class('sbb-calendar__selected');
      expect(newSelectedDate).to.have.class('sbb-calendar__selected');
      expect(selectedSpy.count).to.be.greaterThan(0);
    });

    it("clicks on disabled day and doesn't change selection", async () => {
      const selectedSpy = new EventSpy(SbbCalendarElement.events.dateSelected);

      element.max = 1674946800;
      await waitForLitRender(element);

      const day = element.shadowRoot!.querySelector('button[data-day="30 1 2023"]') as HTMLElement;
      expect(day).to.have.attribute('disabled');
      expect(day).not.to.have.class('sbb-calendar__selected');
      day.click();
      await waitForLitRender(element);

      expect(day).not.to.have.class('sbb-calendar__selected');
      expect(selectedSpy.count).not.to.be.greaterThan(0);
    });

    it('changes to year and month selection views', async () => {
      const yearSelectionButton: HTMLElement = element.shadowRoot!.querySelector(
        '.sbb-calendar__date-selection',
      )!;

      expect(yearSelectionButton).not.to.be.null;
      yearSelectionButton.click();
      await waitForTransition();

      const yearSelection: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__year-selection',
      )!;
      expect(yearSelection).not.to.be.null;
      expect(yearSelection).dom.to.be.equal(`
      <button aria-label="Choose date 2016 - 2039" class="sbb-calendar__controls-change-date" id="sbb-calendar__year-selection" type="button">
        2016 - 2039
        <sbb-icon aria-hidden="true" data-namespace="default" name="chevron-small-up-small" role="img"></sbb-icon>
      </button>
    `);

      const yearCells: HTMLElement[] = Array.from(
        element.shadowRoot!.querySelectorAll('.sbb-calendar__table-year'),
      );
      expect(yearCells.length).to.be.equal(24);
      expect(yearCells[0]).dom.to.be.equal(`
      <td class="sbb-calendar__table-data sbb-calendar__table-year">
        <button aria-disabled="false" aria-label="2016" aria-pressed="false" class="sbb-calendar__cell sbb-calendar__pill" data-year="2016" tabindex="-1">
          2016
        </button>
      </td>
    `);

      const yearButton: HTMLButtonElement =
        element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2023"]')!;
      expect(yearButton).to.have.class('sbb-calendar__selected');
      expect(yearCells[yearCells.length - 1].innerText).to.be.equal('2039');

      yearButton.click();

      await waitForTransition();

      const monthSelection: HTMLElement = element.shadowRoot!.querySelector(
        '#sbb-calendar__month-selection',
      )!;
      expect(monthSelection).not.to.be.null;
      expect(monthSelection).dom.to.be.equal(`
      <button aria-label="Choose date 2023" class="sbb-calendar__controls-change-date" id="sbb-calendar__month-selection" type="button">
        2023
        <sbb-icon aria-hidden="true" data-namespace="default" name="chevron-small-up-small" role="img"></sbb-icon>
      </button>
    `);

      const monthCells: HTMLElement[] = Array.from(
        element.shadowRoot!.querySelectorAll('.sbb-calendar__table-month'),
      );
      expect(monthCells.length).to.be.equal(12);
      expect(monthCells[0]).dom.to.be.equal(`
      <td class="sbb-calendar__table-data sbb-calendar__table-month">
        <button
          aria-disabled="false"
          aria-label="January 2023"
          aria-pressed="true"
          class="sbb-calendar__cell sbb-calendar__pill sbb-calendar__selected sbb-calendar__cell-current"
          data-month="1"
          tabindex="0">
          Jan
        </button>
      </td>
    `);

      monthCells[0].querySelector('button')!.click();
      await waitForLitRender(element);

      await waitForTransition();

      const dayCells = Array.from(element.shadowRoot!.querySelectorAll('.sbb-calendar__day'));
      expect(dayCells.length).to.be.equal(31);
    });

    it('opens year view', async () => {
      element.view = 'year';
      await waitForLitRender(element);

      expect(element.shadowRoot!.querySelector('.sbb-calendar__table-year-view')).not.to.be.null;
    });

    it('opens month view', async () => {
      element.view = 'month';
      await waitForLitRender(element);

      expect(element.shadowRoot!.querySelector('.sbb-calendar__table-month-view')).not.to.be.null;
      expect(
        element.shadowRoot!.querySelector('#sbb-calendar__month-selection')!.textContent!.trim(),
      ).to.be.equal('2023');
    });

    it('opens month view with selected date', async () => {
      element.selected = '2017-01-22';
      element.view = 'month';
      await waitForLitRender(element);

      expect(
        element.shadowRoot!.querySelector('#sbb-calendar__month-selection')!.textContent!.trim(),
      ).to.be.equal('2017');
    });

    it('opens month view with current date', async () => {
      element.selected = null;
      element.now = '2022-08-15';
      element.view = 'month';
      await waitForLitRender(element);

      expect(
        element.shadowRoot!.querySelector('#sbb-calendar__month-selection')!.textContent!.trim(),
      ).to.be.equal('2022');
    });

    describe('navigation', () => {
      it('navigates left via keyboard', async () => {
        element.focus();
        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('15 1 2023');

        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(element);

        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('14 1 2023');
      });

      it('navigates right via keyboard', async () => {
        element.focus();
        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('15 1 2023');

        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(element);

        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('16 1 2023');
      });

      it('navigates up via keyboard', async () => {
        element.focus();
        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('15 1 2023');

        await sendKeys({ press: 'ArrowUp' });
        await waitForLitRender(element);

        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('8 1 2023');
      });

      it('navigates down via keyboard', async () => {
        element.focus();
        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('15 1 2023');

        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);

        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('22 1 2023');
      });

      it('navigates to first day via keyboard', async () => {
        element.focus();
        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('15 1 2023');

        await sendKeys({ press: 'Home' });
        await waitForLitRender(element);

        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('1 1 2023');
      });

      it('navigates to last day via keyboard', async () => {
        element.focus();
        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('15 1 2023');

        await sendKeys({ press: 'End' });
        await waitForLitRender(element);

        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('31 1 2023');
      });

      it('navigates to column start via keyboard', async () => {
        element.focus();
        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('15 1 2023');

        await sendKeys({ press: 'PageUp' });
        await waitForLitRender(element);

        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('1 1 2023');
      });

      it('navigates to column end via keyboard', async () => {
        element.focus();
        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('15 1 2023');

        await sendKeys({ press: 'PageDown' });
        await waitForLitRender(element);

        expect(
          document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-day'),
        ).to.be.equal('29 1 2023');
      });
    });
  });

  it('renders with min and max', async () => {
    const page: HTMLElement = await fixture(
      html`<sbb-calendar
        selected="2023-01-20T00:00:00"
        min="2023-01-09T00:00:00"
        max="2023-01-29T00:00:00"
      ></sbb-calendar>`,
    );

    const buttonPrevDay = page.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
      "sbb-secondary-button[icon-name='chevron-small-left-small']",
    );
    expect(buttonPrevDay).to.have.attribute('disabled');
    const buttonNextDay = page.shadowRoot!.querySelector(
      "sbb-secondary-button[icon-name='chevron-small-right-small']",
    );
    expect(buttonNextDay).to.have.attribute('disabled');

    const emptyCells = page.shadowRoot!.querySelectorAll("[data-day='0 1 2023']");
    expect(emptyCells.length).to.be.equal(6);

    const lastDisabledMinDate = page.shadowRoot!.querySelector("[data-day='8 1 2023']");
    expect(lastDisabledMinDate).to.have.attribute('disabled');
    expect(lastDisabledMinDate).to.have.attribute('aria-disabled', 'true');
    const firstNotDisabledMinDate = page.shadowRoot!.querySelector("[data-day='9 1 2023']");
    expect(firstNotDisabledMinDate).not.to.have.attribute('disabled');
    expect(firstNotDisabledMinDate).to.have.attribute('aria-disabled', 'false');

    const lastNotDisabledMaxDate = page.shadowRoot!.querySelector("[data-day='29 1 2023']");
    expect(lastNotDisabledMaxDate).not.to.have.attribute('disabled');
    expect(lastNotDisabledMaxDate).to.have.attribute('aria-disabled', 'false');
    const firstDisabledMaxDate = page.shadowRoot!.querySelector("[data-day='30 1 2023']");
    expect(firstDisabledMaxDate).to.have.attribute('disabled');
    expect(firstDisabledMaxDate).to.have.attribute('aria-disabled', 'true');
  });

  describe('wide', () => {
    beforeEach(async () => {
      await setViewport({ width: SbbBreakpointLargeMin, height: 1000 });
    });

    it('changes to year and month selection views', async () => {
      element = await fixture(
        html`<sbb-calendar now="1673348400" selected="1673744400" wide></sbb-calendar>`,
      );

      // Open year selection
      element
        .shadowRoot!.querySelector<HTMLButtonElement>('button.sbb-calendar__date-selection')!
        .click();

      await waitForTransition();

      // Open month selection
      element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2063"]')!.click();

      await waitForTransition();

      element.shadowRoot!.querySelector<HTMLButtonElement>('[aria-label="December 2063"]')!.click();

      await waitForTransition();

      // Day view should be opened with December 2062
      expect(
        element
          .shadowRoot!.querySelector<HTMLButtonElement>('button.sbb-calendar__date-selection')!
          .innerText.trim(),
      ).to.be.equal('December 2063');
    });

    it('renders with min and max', async () => {
      await setViewport({ width: SbbBreakpointLargeMin, height: 1000 });
      element = await fixture(
        html`<sbb-calendar
          now="2024-11-04"
          selected="2024-11-20"
          min="2023-11-04"
          max="2026-12-31"
          wide
        ></sbb-calendar>`,
      );

      // Open year selection
      element
        .shadowRoot!.querySelector<HTMLButtonElement>('button.sbb-calendar__date-selection')!
        .click();

      await waitForTransition();

      // Open month selection
      element.shadowRoot!.querySelector<HTMLButtonElement>('[data-year="2023"]')!.click();

      await waitForTransition();

      // Check if January 2024 is clickable (first possible)
      expect(
        element.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="January 2024"]'),
      ).not.to.have.attribute('disabled');

      // Check if November 2023 is clickable
      expect(
        element.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="November 2023"]'),
      ).not.to.have.attribute('disabled');

      // Navigate to max page
      await goToNextView(element);
      await goToNextView(element);

      const nextButton = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
        "sbb-secondary-button[icon-name='chevron-small-right-small']",
      )!;
      expect(nextButton).to.have.attribute('disabled');

      // Check if December 2026 is clickable (last possible)
      expect(
        element.shadowRoot!.querySelector<HTMLButtonElement>('button[aria-label="December 2026"]'),
      ).not.to.have.attribute('disabled');
    });
  });

  describe('navigation for year view', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-calendar now="1673348400" selected="1673744400"></sbb-calendar>`,
      );

      const yearSelectionButton: HTMLElement = element.shadowRoot!.querySelector(
        '.sbb-calendar__date-selection',
      )!;

      expect(yearSelectionButton).not.to.be.null;
      yearSelectionButton.click();
      await waitForTransition();

      const years = Array.from(element.shadowRoot!.querySelectorAll('.sbb-calendar__cell'));
      expect(years.length).to.equal(24);

      const selectedYear = years.find(
        (e) => (e as HTMLElement).innerText === '2023',
      ) as HTMLElement;
      await waitForLitRender(element);
      selectedYear.focus();
    });

    it('navigates left via keyboard', async () => {
      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'ArrowLeft' });
      await waitForLitRender(element);

      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2022');
    });

    it('navigates right via keyboard', async () => {
      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);

      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2024');
    });

    it('navigates up via keyboard', async () => {
      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'ArrowUp' });
      await waitForLitRender(element);

      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2019');
    });

    it('navigates down via keyboard', async () => {
      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);

      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2027');
    });

    it('navigates to first day via keyboard', async () => {
      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'Home' });
      await waitForLitRender(element);

      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2016');
    });

    it('navigates to last day via keyboard', async () => {
      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'End' });
      await waitForLitRender(element);

      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2039');
    });

    it('navigates to column start via keyboard', async () => {
      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'PageUp' });
      await waitForLitRender(element);

      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2019');
    });

    it('navigates to column end via keyboard', async () => {
      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'PageDown' });
      await waitForLitRender(element);

      expect(
        (document.activeElement!.shadowRoot!.activeElement as HTMLElement).innerText,
      ).to.be.equal('2039');
    });
  });
});
