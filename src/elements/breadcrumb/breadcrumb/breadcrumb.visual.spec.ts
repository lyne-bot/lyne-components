import { html, nothing } from 'lit';

import {
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './breadcrumb.js';

describe('sbb-breadcrumb', () => {
  let root: HTMLElement;

  const cases = [
    { case: 'only label', icon: undefined, text: 'Breadcrumb' },
    { case: 'only icon', icon: 'house-small', text: undefined },
    { case: 'label and icon', icon: 'house-small', text: 'Breadcrumb' },
  ];

  describeViewports({ viewports: ['wide'] }, () => {
    for (const singleCase of cases) {
      describe(`${singleCase.case}`, () => {
        beforeEach(async function () {
          root = await visualRegressionFixture(html`
            <sbb-breadcrumb
              href="https://www.sbb.ch"
              target="_blank"
              icon-name=${singleCase.icon || nothing}
              >${singleCase.text || nothing}</sbb-breadcrumb
            >
          `);
        });

        for (const state of visualDiffStandardStates) {
          it(
            `${state.name}`,
            state.with((setup) => {
              setup.withSnapshotElement(root);
            }),
          );
        }
      });
    }

    describe('slotted icon', () => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-breadcrumb href="https://www.sbb.ch" target="_blank">
            Slotted icon
            <sbb-icon slot="icon" name="dog-small"></sbb-icon
          ></sbb-breadcrumb>
        `);
      });

      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });

    describe('long label', () => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <div style="max-width: 200px;">
            <sbb-breadcrumb href="https://www.sbb.ch" target="_blank" icon-name="house-small">
              This label name is so long that it needs ellipsis to fit
            </sbb-breadcrumb>
          </div>
        `);
      });

      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });
  });
});
