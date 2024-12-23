import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../../form-field.js';
import '../../autocomplete.js';
import '../../select.js';
import '../option.js';
import './optgroup.js';

describe(`sbb-optgroup`, () => {
  const defaultArgs = {
    iconName: undefined as string | undefined,
    disabled: false,
    disabledSingle: false,
  };

  const createOptions = (
    iconName: string | undefined,
    disabledSingle: boolean,
  ): TemplateResult => html`
    ${repeat(
      new Array(3),
      (_, i) => html`
        <sbb-option
          value=${`Option ${i + 1}`}
          ?disabled=${disabledSingle && i === 0}
          icon-name=${iconName || nothing}
          >Option ${i + 1}</sbb-option
        >
      `,
    )}
  `;

  const template = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-optgroup label="Option group 1" ?disabled=${args.disabled}>
      ${createOptions(args.iconName, args.disabledSingle)}
    </sbb-optgroup>
    <sbb-optgroup label="Option group 2" ?disabled=${args.disabled}>
      ${createOptions(args.iconName, args.disabledSingle)}
    </sbb-optgroup>
  `;

  const standaloneTemplate = (args: typeof defaultArgs): TemplateResult => html`
    <div
      style="border-width: var(--sbb-spacing-fixed-2x); border-style: dashed; border-color: #ad00ff; width: 320px;"
    >
      ${template(args)}
    </div>
  `;

  const autocompleteTemplate = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-form-field>
      <label>Autocomplete</label>
      <input placeholder="Placeholder" />
      <sbb-autocomplete>${template(args)}</sbb-autocomplete>
    </sbb-form-field>
  `;

  const selectTemplate = (args: typeof defaultArgs, multiple: boolean): TemplateResult => html`
    <sbb-form-field>
      <label>Select</label>
      <sbb-select ?multiple=${multiple} placeholder="Select"> ${template(args)} </sbb-select>
    </sbb-form-field>
  `;

  describeViewports({ viewports: ['micro', 'medium'] }, () => {
    describe('standalone', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(standaloneTemplate(defaultArgs));
        }),
      );

      it(
        `icon`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(standaloneTemplate({ ...defaultArgs, iconName: 'clock-small' }));
        }),
      );

      it(
        `disabled`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(standaloneTemplate({ ...defaultArgs, disabled: true }));
        }),
      );

      it(
        `disabledSingle`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(standaloneTemplate({ ...defaultArgs, disabledSingle: true }));
        }),
      );
    });

    describe('autocomplete', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(autocompleteTemplate(defaultArgs), { minHeight: '600px' });
          setup.withPostSetupAction(() => setup.snapshotElement.querySelector('input')!.focus());
        }),
      );
    });

    describe('select', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(selectTemplate(defaultArgs, false), { minHeight: '600px' });
          setup.withPostSetupAction(() => {
            const select = setup.snapshotElement.querySelector('sbb-select')!;
            select.focus();
            select.open();
          });
        }),
      );

      it(
        'multiple',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(selectTemplate(defaultArgs, true), { minHeight: '600px' });
          setup.withPostSetupAction(() => {
            const select = setup.snapshotElement.querySelector('sbb-select')!;
            select.focus();
            select.open();
          });
        }),
      );
    });
  });
});
