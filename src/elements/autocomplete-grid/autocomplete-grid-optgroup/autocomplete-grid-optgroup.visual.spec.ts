import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../../form-field.js';
import '../autocomplete-grid.js';
import '../autocomplete-grid-option.js';
import '../autocomplete-grid-row.js';
import './autocomplete-grid-optgroup.js';

describe(`sbb-autocomplete-grid-optgroup`, () => {
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
        <sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-option
            value=${`Option ${i + 1}`}
            ?disabled=${disabledSingle && i === 0}
            icon-name=${iconName || nothing}
            >Option ${i + 1}</sbb-autocomplete-grid-option
          >
        </sbb-autocomplete-grid-row>
      `,
    )}
  `;

  const template = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-autocomplete-grid-optgroup label="Option group 1" ?disabled=${args.disabled}>
      ${createOptions(args.iconName, args.disabledSingle)}
    </sbb-autocomplete-grid-optgroup>
    <sbb-autocomplete-grid-optgroup label="Option group 2" ?disabled=${args.disabled}>
      ${createOptions(args.iconName, args.disabledSingle)}
    </sbb-autocomplete-grid-optgroup>
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
      <label>sbb-autocomplete-grid</label>
      <input placeholder="Placeholder" />
      <sbb-autocomplete-grid>${template(args)}</sbb-autocomplete-grid>
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

    describe('autocomplete-grid', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(autocompleteTemplate(defaultArgs), { minHeight: '800px' });
          setup.withPostSetupAction(() => setup.snapshotElement.querySelector('input')!.focus());
        }),
      );
    });
  });
});
