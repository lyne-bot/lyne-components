import { html, nothing, type TemplateResult } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './train-wagon.js';
import '../train-formation.js';
import '../train.js';

describe(`sbb-train-wagon`, () => {
  const wagonTypeCases = {
    type: [
      'wagon',
      'wagon-end-left',
      'wagon-end-right',
      'couchette',
      'sleeping',
      'restaurant',
      'locomotive',
      'closed',
    ],
    view: ['side', 'top'],
    forcedColors: [false, true],
  };

  const occupancyCases = ['high', 'medium', 'low', 'none', null];
  const wagonClassCases = [1, 2];

  const trainFormationWrapper = (content: TemplateResult): TemplateResult =>
    html`<sbb-train-formation><sbb-train>${content}</sbb-train></sbb-train-formation>`;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const occupancy of occupancyCases) {
      it(
        `occupancy=${occupancy}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            trainFormationWrapper(html`
              <sbb-train-wagon occupancy=${occupancy || nothing}></sbb-train-wagon>
            `),
          );
        }),
      );
    }

    for (const wagonClass of wagonClassCases) {
      it(
        `class=${wagonClass}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            trainFormationWrapper(
              html`<sbb-train-wagon wagon-class=${wagonClass}></sbb-train-wagon>`,
            ),
          );
        }),
      );
    }

    it(
      `one icon`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          trainFormationWrapper(html`
            <sbb-train-wagon wagon-class="2" label="38">
              <sbb-icon name="sa-bz"></sbb-icon>
            </sbb-train-wagon>
          `),
        );
      }),
    );

    it(
      `multiple icons`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          trainFormationWrapper(html`
            <sbb-train-wagon wagon-class="2" label="38">
              <sbb-icon name="sa-rs"></sbb-icon>
              <sbb-icon name="sa-nf"></sbb-icon>
              <sbb-icon name="sa-bz"></sbb-icon>
            </sbb-train-wagon>
          `),
        );
      }),
    );
  });

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(wagonTypeCases, ({ type, view, forcedColors }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-train-formation view=${view}>
              <sbb-train>
                ${type === 'sleeping' || type === 'couchette' || type === 'restaurant'
                  ? html`<sbb-train-wagon type=${type}></sbb-train-wagon>`
                  : html`<sbb-train-wagon
                      type=${type}
                      occupancy="medium"
                      wagon-class="2"
                    ></sbb-train-wagon>`}
              </sbb-train>
            </sbb-train-formation>`,
            { forcedColors },
          );
        }),
      );
    });
  });
});
