import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './__noPrefixName__';

describe('__name__', () => {
  it('renders', async () => {
    const root = await fixture(html`<__name__ my-prop="Label"></__name__>`);

    expect(root).dom.to.be.equal(`<__name__ my-prop="Label"></__name__>`);

    expect(root).shadowDom.to.be.equal(`
      <div class="__name__">
        Label
      </div>
    `);
  });
});
