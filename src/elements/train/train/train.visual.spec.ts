import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './train.js';

describe(`sbb-train`, () => {
  const cases = { direction: ['left', 'right'], station: [undefined, 'Berne'] };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ direction, station }) => {
      let root: HTMLElement;

      beforeEach(async () => {
        root = await visualRegressionFixture(
          html`<sbb-train
            direction=${direction}
            station=${station || nothing}
            direction-label="Direction of travel"
          ></sbb-train>`,
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    it(
      'display ellipsis with long label',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-train
            direction="right"
            station="Berne"
            direction-label="Direction of travel"
          ></sbb-train>`,
          { maxWidth: '200px' },
        );
      }),
    );
  });
});
