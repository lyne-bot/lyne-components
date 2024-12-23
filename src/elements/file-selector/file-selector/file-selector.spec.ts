import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import { SbbFileSelectorElement } from './file-selector.js';

describe(`sbb-file-selector-dropzone`, () => {
  let form: HTMLFormElement;
  let element: SbbFileSelectorElement;

  beforeEach(async () => {
    form = await fixture(html`
      <form>
        <fieldset>
          <sbb-file-selector name="fs"></sbb-file-selector>
          <input type="file" name="native" />
        </fieldset>
      </form>
    `);
    element = form.querySelector('sbb-file-selector')!;

    await waitForLitRender(form);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbFileSelectorElement);
  });

  // All the functionalities of sbb-file-selector are tested in file-selector-common.spec.ts file
});
