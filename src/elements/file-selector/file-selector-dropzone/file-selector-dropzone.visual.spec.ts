import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import '../../form-error.js';
import './file-selector-dropzone.js';
import type { SbbFileSelectorDropzoneElement } from './file-selector-dropzone.js';

describe(`sbb-file-selector-dropzone`, () => {
  function addFilesToComponentInput(elem: SbbFileSelectorDropzoneElement): void {
    const dataTransfer: DataTransfer = new DataTransfer();
    for (let i: number = 0; i < 5; i++) {
      dataTransfer.items.add(
        new File([`Hello world - ${i}`], `hello${i}.txt`, {
          type: 'text/plain',
          lastModified: new Date(i).getMilliseconds(),
        }),
      );
    }
    const input: HTMLInputElement = elem.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    input.files = dataTransfer.files;
    input.dispatchEvent(new Event('change'));
  }

  let root: HTMLElement;

  const states = {
    state: [
      { disabled: false, error: false },
      { disabled: true, error: false },
      { disabled: false, error: true },
    ],
  };

  describeViewports({ viewports: ['small', 'medium'] }, () => {
    describeEach(states, ({ state }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-file-selector-dropzone
            id="fs"
            title-content="Title"
            multiple
            ?disabled=${state.disabled}
          ></sbb-file-selector-dropzone>
          ${state.error
            ? html`<sbb-form-error slot="error">There has been an error.</sbb-form-error>`
            : nothing}
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          if (!state.disabled && state.error) {
            addFilesToComponentInput(root.querySelector('#fs')!);
          }
          setup.withSnapshotElement(root);
        }),
      );
    });

    describeEach({ size: ['s', 'm'] }, ({ size }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-file-selector-dropzone
            id="fs"
            title-content="Title"
            multiple
            size=${size}
          ></sbb-file-selector-dropzone>
        `);
      });

      for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
        it(
          visualDiffState.name,
          visualDiffState.with((setup) => {
            addFilesToComponentInput(root.querySelector('#fs')!);
            setup.withSnapshotElement(root);
          }),
        );
      }
    });
  });
});
