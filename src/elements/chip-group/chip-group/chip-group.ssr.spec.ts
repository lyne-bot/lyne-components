import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';
import type { SbbFormFieldElement } from '../../form-field.js';

import { SbbChipGroupElement } from './chip-group.js';
import '../chip.js';
import '../../form-field.js';

describe(`sbb-chip-group ssr`, () => {
  let root: SbbFormFieldElement;
  let element: SbbChipGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html` <sbb-form-field>
        <sbb-chip-group>
          <sbb-chip value="Value"></sbb-chip>
        </sbb-chip-group>
        <input />
      </sbb-form-field>`,
      {
        modules: ['./chip-group.js', '../chip.js', '../../form-field.js'],
      },
    );
    element = root.querySelector('sbb-chip-group')!;
  });

  it('renders', () => {
    assert.instanceOf(element, SbbChipGroupElement);
  });
});
