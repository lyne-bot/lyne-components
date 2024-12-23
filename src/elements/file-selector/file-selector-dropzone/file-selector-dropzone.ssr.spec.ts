import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbFileSelectorDropzoneElement } from './file-selector-dropzone.js';

describe(`sbb-file-selector-dropzone ssr`, () => {
  let root: SbbFileSelectorDropzoneElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-file-selector-dropzone></sbb-file-selector-dropzone>`,
      {
        modules: ['./file-selector-dropzone.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFileSelectorDropzoneElement);
  });
});
