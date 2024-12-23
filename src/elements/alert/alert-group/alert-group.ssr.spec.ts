import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbAlertGroupElement } from './alert-group.js';

import '../alert/alert.js';

describe(`sbb-alert-group ssr`, () => {
  let root: SbbAlertGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-alert-group accessibility-title="Disruptions" accessibility-title-level="3">
          <sbb-alert title-content="Interruption">First</sbb-alert>
          <sbb-alert title-content="Interruption">Second</sbb-alert>
        </sbb-alert-group>
      `,
      { modules: ['./alert-group.js', '../alert.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAlertGroupElement);
  });
});
