import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import '../../form-field';
import './button';

describe('sbb-button', () => {
  it('renders a button without icon', async () => {
    const root = await fixture(
      html` <sbb-button
        negative
        size="m"
        type="button"
        disabled
        name="name"
        value="value"
        form="formid"
      >
        Label Text
      </sbb-button>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-button
        negative
        size="m"
        type="button"
        disabled
        aria-disabled="true"
        name="name"
        value="value"
        form="formid"
        role="button"
        dir="ltr"
        data-slot-names="unnamed"
      >

        Label Text
      </sbb-button>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-action-base sbb-button">
        <span class="sbb-button__icon">
          <slot name="icon">
          </slot>
        </span>
        <span class="sbb-button__label"><slot></slot></span>
      </span>
    `);
  });

  it('renders a button with slotted icon', async () => {
    const root = await fixture(
      html`<sbb-button>
        <sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>
        Label Text
      </sbb-button> `,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-button size="l" role="button" tabindex="0" dir="ltr" data-slot-names="icon unnamed">
        <sbb-icon slot="icon" name="chevron-small-left-small" role="img" aria-hidden="true" data-namespace="default"></sbb-icon>
        Label Text
      </sbb-button>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-action-base sbb-button">
        <span class="sbb-button__icon">
          <slot name="icon"></slot>
        </span>
        <span class="sbb-button__label"><slot></slot></span>
      </span>
    `);
  });

  it('should detect icon button', async () => {
    const root = await fixture(
      html`<sbb-button><sbb-icon slot="icon" name="app-icon-medium"></sbb-icon></sbb-button>`,
    );

    await waitForLitRender(root);

    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  it('should detect icon button when there is space around icon', async () => {
    const root = await fixture(
      html`<sbb-button> <sbb-icon slot="icon" name="app-icon-medium"></sbb-icon> </sbb-button>`,
    );

    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });
});
