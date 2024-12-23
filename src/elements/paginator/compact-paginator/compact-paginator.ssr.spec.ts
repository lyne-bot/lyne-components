import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbCompactPaginatorElement } from './compact-paginator.js';

describe(`sbb-compact-paginator ssr`, () => {
  let root: SbbCompactPaginatorElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-compact-paginator length="50" page-size="10"></sbb-compact-paginator>`,
      {
        modules: ['./compact-paginator.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCompactPaginatorElement);
  });
});
