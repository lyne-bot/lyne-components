import { SbbDatepickerNextDay } from './sbb-datepicker-next-day';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SbbFormField } from '../sbb-form-field/sbb-form-field';
import { SbbDatepicker } from '../sbb-datepicker/sbb-datepicker';

describe('sbb-datepicker-next-day', () => {
  it('renders', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepickerNextDay],
      html: '<sbb-datepicker-next-day />',
    });

    expect(page.root).toEqualHtml(`
      <sbb-datepicker-next-day slot="suffix">
        <mock:shadow-root>
          <button>
            <sbb-icon name="chevron-small-right-small" />
          </button>
        </mock:shadow-root>
      </sbb-datepicker-next-day>
    `);
  });

  it('renders disabled with datepicker disabled', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbFormField, SbbDatepicker, SbbDatepickerNextDay],
      html: `
        <sbb-form-field>
          <sbb-datepicker disabled="true"></sbb-datepicker>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
        </sbb-form-field>
      `,
    });

    const element: HTMLSbbDatepickerNextDayElement =
      page.doc.querySelector('sbb-datepicker-next-day');
    const button: HTMLButtonElement = element.shadowRoot.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });

  it('renders disabled with datepicker readonly', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbFormField, SbbDatepicker, SbbDatepickerNextDay],
      html: `
        <sbb-form-field>
          <sbb-datepicker readonly="true"></sbb-datepicker>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
        </sbb-form-field>
      `,
    });

    const element: HTMLSbbDatepickerNextDayElement =
      page.doc.querySelector('sbb-datepicker-next-day');
    const button: HTMLButtonElement = element.shadowRoot.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });
});
