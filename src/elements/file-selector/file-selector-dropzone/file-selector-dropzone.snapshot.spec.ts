import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbFileSelectorDropzoneElement } from './file-selector-dropzone.js';
import './file-selector-dropzone.js';

describe(`sbb-file-selector-dropzone`, () => {
  describe('renders', () => {
    let element: SbbFileSelectorDropzoneElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-file-selector-dropzone></sbb-file-selector-dropzone>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    // We skip safari because it has an inconsistent behavior on ci environment
    testA11yTreeSnapshot(undefined, undefined, { safari: true });
  });
});
