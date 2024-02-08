import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

import './notification';
import '../link';
import '../button';
import '../icon';
import '../divider';

describe('sbb-notification', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation
        >The quick brown fox jumps over the lazy dog.</sbb-notification
      >`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-notification role="status" disable-animation data-state="opened" type="info" data-slot-names="unnamed" style="--sbb-notification-height: auto;">
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with a title', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation title-content="Title"
        >The quick brown fox jumps over the lazy dog.</sbb-notification
      >`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-notification role="status" disable-animation data-state="opened" title-content="Title" type="info" data-slot-names="unnamed" style="--sbb-notification-height: auto;">
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with a slotted title', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation
        ><span slot="title">Slotted title</span>
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-notification role="status" disable-animation data-state="opened" type="info" data-slot-names="title unnamed" style="--sbb-notification-height: auto;">
        <span slot="title">
          Slotted title
        </span>
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders without the close button', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation title-content="Title" readonly
        >The quick brown fox jumps over the lazy dog.</sbb-notification
      >`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-notification role="status" disable-animation readonly data-state="opened" title-content="Title" type="info" data-slot-names="unnamed" style="--sbb-notification-height: auto;">
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});
