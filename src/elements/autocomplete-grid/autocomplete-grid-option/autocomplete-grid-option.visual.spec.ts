import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../../form-field.js';
import '../../autocomplete-grid.js';
import './autocomplete-grid-option.js';

describe(`sbb-autocomplete-grid-option`, () => {
  const defaultArgs = {
    iconName: undefined as string | undefined,
    active: false,
    disabled: false,
    preserveIconSpace: false,
  };

  const createOption = (
    { active, disabled, preserveIconSpace, iconName }: typeof defaultArgs,
    i: number,
  ): TemplateResult => {
    const style = preserveIconSpace ? { '--sbb-option-icon-container-display': 'block' } : {};
    return html`
      <sbb-autocomplete-grid-option
        style=${styleMap(style)}
        icon-name=${iconName || nothing}
        ?data-active=${active && i === 0}
        ?disabled=${disabled && i === 0}
        value=${`Value ${i + 1}`}
        >Value ${i + 1}</sbb-autocomplete-grid-option
      >
    `;
  };

  const standaloneTemplate = (args: typeof defaultArgs): TemplateResult => html`
    <div
      style="border-width: var(--sbb-spacing-fixed-2x); border-style: dashed; border-color: #ad00ff; width: 320px;"
    >
      ${repeat(new Array(5), (_, i) => createOption(args, i))}
    </div>
  `;

  const autocompleteTemplate = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-form-field>
      <label>sbb-autocomplete-grid</label>
      <input placeholder="Please select." />
      <sbb-autocomplete-grid>
        ${repeat(
          new Array(5),
          (_, i) => html`
            <sbb-autocomplete-grid-row> ${createOption(args, i)} </sbb-autocomplete-grid-row>
          `,
        )}
      </sbb-autocomplete-grid>
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
        `active`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(standaloneTemplate({ ...defaultArgs, active: true }));
        }),
      );

      it(
        `preserveIconSpace`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(standaloneTemplate({ ...defaultArgs, preserveIconSpace: true }));
        }),
      );
    });

    describe('autocomplete-grid', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(autocompleteTemplate(defaultArgs), { minHeight: '400px' });
          setup.withPostSetupAction(() => setup.snapshotElement.querySelector('input')!.focus());
        }),
      );

      it(
        'disabled',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(autocompleteTemplate({ ...defaultArgs, disabled: true }), {
            minHeight: '400px',
          });
          setup.withPostSetupAction(() => setup.snapshotElement.querySelector('input')!.focus());
        }),
      );
    });
  });
});
