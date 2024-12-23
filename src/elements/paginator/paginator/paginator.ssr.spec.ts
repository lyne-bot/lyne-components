import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbPaginatorElement } from './paginator.js';

describe(`sbb-paginator ssr`, () => {
  let root: SbbPaginatorElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-paginator
        length="50"
        page-size="10"
        page-size-options="[10, 25, 50]"
      ></sbb-paginator>`,
      {
        modules: ['./paginator.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPaginatorElement);
  });
});
