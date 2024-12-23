import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import { SbbFileSelectorDropzoneElement } from './file-selector-dropzone.js';

describe(`sbb-file-selector-dropzone`, () => {
  let form: HTMLFormElement;
  let element: SbbFileSelectorDropzoneElement;

  beforeEach(async () => {
    form = await fixture(html`
      <form>
        <fieldset>
          <sbb-file-selector-dropzone name="fs"></sbb-file-selector-dropzone>
          <input type="file" name="native" />
        </fieldset>
      </form>
    `);
    element = form.querySelector('sbb-file-selector-dropzone')!;

    await waitForLitRender(form);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbFileSelectorDropzoneElement);
  });

  // All the functionalities of sbb-file-selector-dropzone are tested in file-selector-common.spec.ts file
});
