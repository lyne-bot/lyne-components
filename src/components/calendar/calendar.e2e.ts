import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { waitForCondition, waitForLitRender, EventSpy } from '../core/testing';
import '../button';
import '../icon';
import './calendar';
import { SbbCalendar } from './calendar';

describe('sbb-calendar', () => {
  const selected = new Date(2023, 0, 15).getTime() / 1000;
  let element: SbbCalendar;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-calendar data-now="1673348400000" selected-date="${selected}"></sbb-calendar>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCalendar);
  });

  it('highlights current day', async () => {
    const currentDayButton = element.shadowRoot.querySelector('button[data-day="10 1 2023"]');
    expect(currentDayButton).to.have.class('sbb-calendar__cell-current');
  });

  it('renders and navigates to next month', async () => {
    let day = element.shadowRoot.querySelector('.sbb-calendar__day');
    expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');

    const nextMonthButton: HTMLElement = element.shadowRoot.querySelector(
      '#sbb-calendar__controls-next',
    );
    nextMonthButton.click();
    await waitForLitRender(element);

    day = element.shadowRoot.querySelector('.sbb-calendar__day');
    expect(await day.getAttribute('data-day')).to.be.equal('1 2 2023');
  });

  it('renders and navigates to previous month', async () => {
    let day = element.shadowRoot.querySelector('.sbb-calendar__day');
    expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');

    const nextMonthButton: HTMLElement = element.shadowRoot.querySelector(
      '#sbb-calendar__controls-previous',
    );
    nextMonthButton.click();
    await waitForLitRender(element);

    day = element.shadowRoot.querySelector('.sbb-calendar__day');
    expect(await day.getAttribute('data-day')).to.be.equal('1 12 2022');
  });

  it('sets max and next month button gets disabled', async () => {
    element.max = 1674946800;
    await waitForLitRender(element);

    let day = element.shadowRoot.querySelector('.sbb-calendar__day');
    expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');

    const nextMonthButton: HTMLElement = element.shadowRoot.querySelector(
      '#sbb-calendar__controls-next',
    );
    expect(nextMonthButton).to.have.attribute('disabled');
    nextMonthButton.click();
    await waitForLitRender(element);

    day = element.shadowRoot.querySelector('.sbb-calendar__day');
    expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');
  });

  it('sets min and previous month button gets disabled', async () => {
    element.min = 1673737200;
    await waitForLitRender(element);

    let day = element.shadowRoot.querySelector('.sbb-calendar__day');
    expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');

    const nextMonthButton = element.shadowRoot.querySelector(
      '#sbb-calendar__controls-previous',
    ) as HTMLElement;
    expect(nextMonthButton).to.have.attribute('disabled');
    nextMonthButton.click();
    await waitForLitRender(element);

    day = element.shadowRoot.querySelector('.sbb-calendar__day');
    expect(await day.getAttribute('data-day')).to.be.equal('1 1 2023');
  });

  it('selects a different date', async () => {
    const selectedSpy = new EventSpy('date-selected');
    const selectedDate = element.shadowRoot.querySelector('button[data-day="15 1 2023"]');

    expect(selectedDate).to.have.class('sbb-calendar__selected');

    const newSelectedDate = element.shadowRoot.querySelector(
      'button[data-day="18 1 2023"]',
    ) as HTMLElement;
    expect(newSelectedDate).not.to.have.class('sbb-calendar__selected');
    newSelectedDate.click();
    await waitForCondition(() => selectedSpy.events.length === 1);

    expect(selectedDate).not.to.have.class('sbb-calendar__selected');
    expect(newSelectedDate).to.have.class('sbb-calendar__selected');
    expect(selectedSpy.count).to.be.greaterThan(0);
  });

  it("clicks on disabled day and doesn't change selection", async () => {
    const selectedSpy = new EventSpy('date-selected');

    element.max = 1674946800;
    await waitForLitRender(element);

    const day = element.shadowRoot.querySelector('button[data-day="30 1 2023"]') as HTMLElement;
    expect(day).to.have.attribute('disabled');
    expect(day).not.to.have.class('sbb-calendar__selected');
    day.click();
    await waitForLitRender(element);

    expect(day).not.to.have.class('sbb-calendar__selected');
    expect(selectedSpy.count).not.to.be.greaterThan(0);
  });

  it('changes to year and month selection views', async () => {
    const yearSelectionButton: HTMLElement = element.shadowRoot.querySelector(
      '#sbb-calendar__date-selection',
    );
    let animationSpy = new EventSpy('animationend', element.shadowRoot.querySelector('table'));

    expect(yearSelectionButton).not.to.be.null;
    yearSelectionButton.click();
    await waitForLitRender(element);
    await waitForCondition(() => animationSpy.events.length >= 1);

    const yearSelection: HTMLElement = element.shadowRoot.querySelector(
      '#sbb-calendar__year-selection',
    );
    expect(yearSelection).not.to.be.null;
    expect(yearSelection).dom.to.be.equal(`
      <button aria-label="Choose date 2016 - 2039" class="sbb-calendar__controls-change-date" id="sbb-calendar__year-selection" type="button">
        2016 - 2039
        <sbb-icon aria-hidden="true" data-namespace="default" name="chevron-small-up-small" role="img"></sbb-icon>
      </button>
    `);

    const yearCells: HTMLElement[] = Array.from(
      element.shadowRoot.querySelectorAll('.sbb-calendar__table-year'),
    );
    expect(yearCells.length).to.be.equal(24);
    expect(yearCells[0]).dom.to.be.equal(`
      <td class="sbb-calendar__table-data sbb-calendar__table-year">
        <button aria-disabled="false" aria-label="2016" aria-pressed="false" class="sbb-calendar__cell sbb-calendar__pill" data-year="2016" tabindex="-1">
          2016
        </button>
      </td>
    `);

    animationSpy = new EventSpy('animationend', element.shadowRoot.querySelector('table'));

    const selectedYear: HTMLElement = yearCells.find((e) => e.innerText === '2023');
    const yearButton: HTMLElement = selectedYear.querySelector('button');
    expect(yearButton).to.have.class('sbb-calendar__selected');
    expect(yearCells[yearCells.length - 1].innerText).to.be.equal('2039');

    yearButton.click();
    await waitForLitRender(element);

    await waitForCondition(() => animationSpy.events.length >= 1);

    const monthSelection: HTMLElement = element.shadowRoot.querySelector(
      '#sbb-calendar__month-selection',
    );
    expect(monthSelection).not.to.be.null;
    expect(monthSelection).dom.to.be.equal(`
      <button aria-label="Choose date 2023" class="sbb-calendar__controls-change-date" id="sbb-calendar__month-selection" type="button">
        2023
        <sbb-icon aria-hidden="true" data-namespace="default" name="chevron-small-up-small" role="img"></sbb-icon>
      </button>
    `);

    const monthCells: HTMLElement[] = Array.from(
      element.shadowRoot.querySelectorAll('.sbb-calendar__table-month'),
    );
    expect(monthCells.length).to.be.equal(12);
    expect(monthCells[0]).dom.to.be.equal(`
      <td class="sbb-calendar__table-data sbb-calendar__table-month">
        <button aria-disabled="false" aria-label="January 2023" aria-pressed="true" class="sbb-calendar__cell sbb-calendar__pill sbb-calendar__selected sbb-calendar__cell-current" tabindex="0">
          Jan
        </button>
      </td>
    `);

    animationSpy = new EventSpy('animationend', element.shadowRoot.querySelector('table'));

    monthCells[0].querySelector('button').click();
    await waitForLitRender(element);

    await waitForCondition(() => animationSpy.events.length >= 1);

    const dayCells = Array.from(element.shadowRoot.querySelectorAll('.sbb-calendar__day'));
    expect(dayCells.length).to.be.equal(31);
  });

  describe('navigation', () => {
    it('navigates left via keyboard', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '15 1 2023',
      );

      element.focus();
      await sendKeys({ press: 'ArrowLeft' });
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '14 1 2023',
      );
    });

    it('navigates right via keyboard', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '15 1 2023',
      );

      element.focus();
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '16 1 2023',
      );
    });

    it('navigates up via keyboard', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '15 1 2023',
      );

      element.focus();
      await sendKeys({ press: 'ArrowUp' });
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '8 1 2023',
      );
    });

    it('navigates down via keyboard', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '15 1 2023',
      );

      element.focus();
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '22 1 2023',
      );
    });

    it('navigates to first day via keyboard', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '15 1 2023',
      );

      element.focus();
      await sendKeys({ press: 'Home' });
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '1 1 2023',
      );
    });

    it('navigates to last day via keyboard', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '15 1 2023',
      );

      element.focus();
      await sendKeys({ press: 'End' });
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '31 1 2023',
      );
    });

    it('navigates to column start via keyboard', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '15 1 2023',
      );

      element.focus();
      await sendKeys({ press: 'PageUp' });
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '1 1 2023',
      );
    });

    it('navigates to column end via keyboard', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '15 1 2023',
      );

      element.focus();
      await sendKeys({ press: 'PageDown' });
      await waitForLitRender(element);

      expect(document.activeElement.shadowRoot.activeElement.getAttribute('data-day')).to.be.equal(
        '29 1 2023',
      );
    });
  });

  describe('navigation for year view', () => {
    beforeEach(async () => {
      const yearSelectionButton: HTMLElement = element.shadowRoot.querySelector(
        '#sbb-calendar__date-selection',
      );

      const table: HTMLElement = element.shadowRoot.querySelector('table');
      const animationSpy = new EventSpy('animationend', table);

      yearSelectionButton.click();
      await waitForCondition(() => animationSpy.events.length >= 1);
      const selectedYear = Array.from(
        element.shadowRoot.querySelectorAll('.sbb-calendar__cell'),
      ).find((e) => (e as HTMLElement).innerText === '2023') as HTMLElement;
      selectedYear.focus();
    });

    it('navigates left via keyboard', async () => {
      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'ArrowLeft' });
      await waitForLitRender(element);

      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2022');
    });

    it('navigates right via keyboard', async () => {
      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);

      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2024');
    });

    it('navigates up via keyboard', async () => {
      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'ArrowUp' });
      await waitForLitRender(element);

      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2019');
    });

    it('navigates down via keyboard', async () => {
      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);

      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2027');
    });

    it('navigates to first day via keyboard', async () => {
      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'Home' });
      await waitForLitRender(element);

      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2016');
    });

    it('navigates to last day via keyboard', async () => {
      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'End' });
      await waitForLitRender(element);

      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2039');
    });

    it('navigates to column start via keyboard', async () => {
      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'PageUp' });
      await waitForLitRender(element);

      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2019');
    });

    it('navigates to column end via keyboard', async () => {
      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2023');

      element.focus();
      await sendKeys({ press: 'PageDown' });
      await waitForLitRender(element);

      expect(
        (document.activeElement.shadowRoot.activeElement as HTMLElement).innerText,
      ).to.be.equal('2039');
    });
  });
});
