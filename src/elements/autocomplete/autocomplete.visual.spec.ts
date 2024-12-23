import { sendKeys } from '@web/test-runner-commands';
import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import type { VisualDiffSetupBuilder } from '../core/testing/private.js';
import { describeViewports, visualDiffDefault, visualDiffFocus } from '../core/testing/private.js';

import '../form-field.js';
import '../form-error.js';
import '../option.js';
import './autocomplete.js';

describe('sbb-autocomplete', () => {
  const defaultArgs = {
    negative: false,
    disabled: false,
    readonly: false,
    required: false,
    withIcon: true,
    preserveIconSpace: true,
    disableOption: false,
    borderless: false,
    size: 'm',
    withGroup: false,
    disableGroup: false,
    withMixedOptionAndGroup: false,
  };

  const textBlock = (): TemplateResult => html`
    <div
      style=${styleMap({
        position: 'relative',
        marginBlockStart: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--sbb-color-milk)',
        border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud)',
        borderRadius: 'var(--sbb-border-radius-4x)',
        zIndex: '100',
      })}
    >
      This text block has a <code>z-index</code> greater than the form field, but it must always be
      covered by the autocomplete overlay.
    </div>
  `;

  const createOptionBlockOne = (withIcon: boolean, disableOption: boolean): TemplateResult => html`
    <sbb-option value="Option 1" icon-name=${withIcon ? 'clock-small' : nothing}>
      Option 1
    </sbb-option>
    <sbb-option
      value="Option 2"
      icon-name=${withIcon ? 'clock-small' : nothing}
      ?disabled=${disableOption}
    >
      Option 2
    </sbb-option>
    <sbb-option value="Option 3">
      ${withIcon ? html`<sbb-icon slot="icon" name="clock-small"></sbb-icon>` : nothing} Option 3
    </sbb-option>
  `;

  const createOptionBlockTwo = (): TemplateResult => html`
    <sbb-option value="Option 4">Option 4</sbb-option>
    <sbb-option value="Option 5">Option 5</sbb-option>
  `;

  const createOptions = (withIcon: boolean, disableOption: boolean): TemplateResult => html`
    ${createOptionBlockOne(withIcon, disableOption)} ${createOptionBlockTwo()}
  `;

  const createOptionsGroup = (
    withIcon: boolean,
    disableOption: boolean,
    disableGroup: boolean,
  ): TemplateResult => html`
    <sbb-optgroup label="Group 1" ?disabled=${disableGroup}>
      ${createOptionBlockOne(withIcon, disableOption)}
    </sbb-optgroup>
    <sbb-optgroup label="Group 2">${createOptionBlockTwo()}</sbb-optgroup>
  `;

  const createMixedOptionsGroup = (
    withIcon: boolean,
    disableOption: boolean,
    disableGroup: boolean,
  ): TemplateResult => html`
    <sbb-option value="Option 1" selected>
      <sbb-icon slot="icon" name="clock-small" style="color: var(--sbb-color-sky)"></sbb-icon>
      Option Value
    </sbb-option>
    ${createOptionsGroup(withIcon, disableOption, disableGroup)}
  `;

  const template = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-form-field ?negative=${args.negative} ?borderless=${args.borderless} size=${args.size}>
      <label>Label</label>
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />
      <sbb-autocomplete ?preserve-icon-space=${args.preserveIconSpace}>
        ${args.withGroup
          ? args.withMixedOptionAndGroup
            ? createMixedOptionsGroup(args.withIcon, args.disableOption, args.disableGroup)
            : createOptionsGroup(args.withIcon, args.disableOption, args.disableGroup)
          : createOptions(args.withIcon, args.disableOption)}
      </sbb-autocomplete>
      ${args.required
        ? html`<sbb-form-error slot="error">This is a required field.</sbb-form-error>`
        : nothing}
    </sbb-form-field>
    ${textBlock()}
  `;

  const openAutocomplete = async (setup: VisualDiffSetupBuilder): Promise<void> => {
    const input = setup.snapshotElement.querySelector('input')!;
    input.focus();
    await sendKeys({ press: 'O' });
  };

  describeViewports({ viewports: ['zero', 'medium'], viewportHeight: 500 }, () => {
    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
          describe(`state=above-${visualDiffState.name}`, () => {
            for (const borderless of [false, true]) {
              it(
                `borderless=${borderless}`,
                visualDiffState.with(async (setup) => {
                  await setup.withFixture(
                    html`
                      <div style="position: absolute; inset-block-end: 2rem;">
                        ${template({ ...defaultArgs, negative, borderless })}
                      </div>
                    `,
                    {
                      minHeight: '500px',
                      backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
                    },
                  );
                  setup.withPostSetupAction(() => openAutocomplete(setup));
                }),
              );
            }
          });
        }
      });
    }
  });

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        const style = {
          minHeight: '400px',
          backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
        };

        for (const size of ['m', 's']) {
          for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
            it(
              `state=${visualDiffState.name} size=${size}`,
              visualDiffState.with(async (setup) => {
                await setup.withFixture(template({ ...defaultArgs, negative, size }), style);
              }),
            );
          }
        }

        it(
          `state=required`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, negative, required: true }), style);
          }),
        );

        it(
          `state=disabled`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, negative, disabled: true }), style);
          }),
        );

        it(
          `state=readonly`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, negative, readonly: true }), style);
          }),
        );

        it(
          `state=borderless`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              template({ ...defaultArgs, negative, borderless: true }),
              style,
            );
          }),
        );

        it(
          `state=noIcon`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, negative, withIcon: false }), style);
            setup.withPostSetupAction(() => openAutocomplete(setup));
          }),
        );

        for (const withIcon of [false, true]) {
          it(
            `state=noSpace withIcon=${withIcon}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                template({ ...defaultArgs, negative, withIcon, preserveIconSpace: false }),
                style,
              );
              setup.withPostSetupAction(() => openAutocomplete(setup));
            }),
          );
        }

        for (const withGroup of [false, true]) {
          const wrapperStyle = {
            minHeight: withGroup ? '800px' : '400px',
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
          };

          it(
            `withGroup=${withGroup}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                template({ ...defaultArgs, negative, withGroup }),
                wrapperStyle,
              );
              setup.withPostSetupAction(() => openAutocomplete(setup));
            }),
          );

          it(
            `withGroup=${withGroup} disableOption=true`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                template({ ...defaultArgs, negative, withGroup, disableOption: true }),
                wrapperStyle,
              );
              setup.withPostSetupAction(() => openAutocomplete(setup));
            }),
          );
        }

        describe('withGroup=true ', () => {
          it(
            `disableGroup=true`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                template({
                  ...defaultArgs,
                  negative,
                  disableGroup: true,
                  withGroup: true,
                }),
                {
                  minHeight: '800px',
                  backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
                },
              );
              setup.withPostSetupAction(() => openAutocomplete(setup));
            }),
          );

          for (const size of ['m', 's']) {
            it(
              `size=${size} withMixedOptionAndGroup=true`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(
                  template({
                    ...defaultArgs,
                    negative,
                    size,
                    withGroup: true,
                    withMixedOptionAndGroup: true,
                  }),
                  {
                    minHeight: '800px',
                    backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
                  },
                );
                setup.withPostSetupAction(() => openAutocomplete(setup));
              }),
            );
          }
        });
      });
    }
  });
});
