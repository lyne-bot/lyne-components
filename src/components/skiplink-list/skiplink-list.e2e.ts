import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';
import type { SbbBlockLinkElement } from '../link';

import { SbbSkiplinkListElement } from './skiplink-list';

import '../link/block-link';

describe('sbb-skiplink-list', () => {
  let element: SbbSkiplinkListElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-skiplink-list>
        <sbb-block-link href="#" id="link-1">Link 1</sbb-block-link>
        <sbb-block-link href="#" id="link-2">Link 2</sbb-block-link>
        <sbb-block-link href="#" id="link-3">Link 3</sbb-block-link>
      </sbb-skiplink-list>
      <button id="button">Focus me</button>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSkiplinkListElement);
  });

  it('should be visible on focus', async () => {
    const listItemLinks = element.shadowRoot!.querySelectorAll('li');
    expect(listItemLinks.length).to.be.equal(3);

    expect(listItemLinks[0]).to.have.style('height', '0px');
    expect(listItemLinks[0]).to.have.style('overflow', 'hidden');

    const firstLink: SbbBlockLinkElement = element.querySelector('sbb-block-link:nth-child(1)')!;
    firstLink.focus();
    expect(listItemLinks[0]).not.to.have.style('height', '0px');
    expect(listItemLinks[0]).to.have.style('overflow', 'visible');

    const secondLink: SbbBlockLinkElement = element.querySelector('sbb-block-link:nth-child(2)')!;
    secondLink.focus();
    expect(listItemLinks[0]).to.have.style('height', '0px');
    expect(listItemLinks[0]).to.have.style('overflow', 'hidden');
    expect(listItemLinks[1]).not.to.have.style('height', '0px');
    expect(listItemLinks[1]).to.have.style('overflow', 'visible');
  });

  it('should detected later added links', async () => {
    element = await fixture(html`<sbb-skiplink-list></sbb-skiplink-list>`);

    element.innerHTML = `
        <sbb-block-link href='1'>Link 1</sbb-block-link>
        <sbb-block-link href='2'>Link 2</sbb-block-link>`;

    await waitForLitRender(element);

    expect(element.querySelector('sbb-block-link')).to.have.attribute('slot');
  });
});
