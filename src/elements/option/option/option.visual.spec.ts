import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../../form-field.js';
import '../../select.js';
import '../../autocomplete.js';
import './option.js';

describe(`sbb-option`, () => {
  const defaultArgs = {
    iconName: undefined as string | undefined,
    active: false,
    disabled: false,
    preserveIconSpace: false,
  };

  const createOptions = ({
    active,
    disabled,
    preserveIconSpace,
    iconName,
  }: typeof defaultArgs): TemplateResult => {
    const style = preserveIconSpace ? { '--sbb-option-icon-container-display': 'block' } : {};
    return html`
      ${repeat(
        new Array(5),
        (_, i) => html`
          <sbb-option
            style=${styleMap(style)}
            icon-name=${iconName || nothing}
            ?data-active=${active && i === 0}
            ?disabled=${disabled && i === 0}
            value=${`Value ${i + 1}`}
            >Value ${i + 1}</sbb-option
          >
        `,
      )}
    `;
  };

  const standaloneTemplate = (args: typeof defaultArgs): TemplateResult => html`
    <div
      style="border-width: var(--sbb-spacing-fixed-2x); border-style: dashed; border-color: #ad00ff; width: 320px;"
    >
      ${createOptions(args)}
    </div>
  `;

  const autocompleteTemplate = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-form-field>
      <label>sbb-autocomplete</label>
      <input placeholder="Please select." />
      <sbb-autocomplete>${createOptions(args)}</sbb-autocomplete>
    </sbb-form-field>
  `;

  const selectTemplate = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-form-field>
      <label>sbb-select</label>
      <sbb-select placeholder="Please select.">${createOptions(args)}</sbb-select>
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

    describe('autocomplete', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(autocompleteTemplate(defaultArgs), { minHeight: '400px' });
          setup.withPostSetupAction(() => setup.snapshotElement.querySelector('input')!.focus());
        }),
      );
    });

    describe('select', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(selectTemplate(defaultArgs), { minHeight: '400px' });
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
