import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbMiniButtonElement } from '../button/mini-button.js';
import { tabKey } from '../core/testing/private/keys.js';
import { fixture } from '../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../core/testing.js';

import { SbbPaginatorElement } from './paginator.js';

describe('sbb-paginator', () => {
  let element: SbbPaginatorElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-paginator length="50" page-size="5"></sbb-paginator>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbPaginatorElement);
  });

  it('change pages via buttons', async () => {
    const pageChangedEventSpy = new EventSpy(SbbPaginatorElement.events.pageChanged);
    const goToPrev: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-prev-page',
    )!;
    const goToNext: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;

    expect(goToPrev).to.have.attribute('disabled');
    goToPrev.click();
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(0);

    expect(goToNext).not.to.have.attribute('disabled');
    goToNext.click();
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(1);
    expect(element.pageIndex).to.be.equal(1);
    expect(goToPrev).not.to.have.attribute('disabled');
    expect(goToNext).not.to.have.attribute('disabled');

    goToPrev.click();
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(2);
    expect(element.pageIndex).to.be.equal(0);
  });

  it('emits on click', async () => {
    const pageChangedEventSpy = new EventSpy(SbbPaginatorElement.events.pageChanged);
    const pages = element.shadowRoot!.querySelectorAll('.sbb-paginator__page--number-item');
    pages[2].dispatchEvent(new Event('click'));
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(1);
  });

  it('arrow navigation', async () => {
    // verify page rendering
    const pageContainer = element.shadowRoot!.querySelector('.sbb-paginator__pages')!;
    const pages = pageContainer.querySelectorAll('.sbb-paginator__page--number-item');
    expect(pages.length).to.be.equal(5);

    // tab navigation
    await sendKeys({ press: tabKey });
    expect(document.activeElement!.localName).to.equal('sbb-paginator');
    expect(document.activeElement!.shadowRoot!.activeElement).not.to.be.null;
    expect(document.activeElement!.shadowRoot!.activeElement!.localName).to.equal(
      'sbb-mini-button',
    );
    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '0',
    );

    // arrow navigation
    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '1',
    );
    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '2',
    );
    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '3',
    );
    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '9',
    );
    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '0',
    );

    // first-last navigation
    await sendKeys({ press: 'End' });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '9',
    );
    await sendKeys({ press: 'Home' });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '0',
    );
    await sendKeys({ press: 'PageDown' });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '9',
    );
    await sendKeys({ press: 'PageUp' });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '0',
    );
  });

  it('keyboard selection', async () => {
    const pageChangedEventSpy = new EventSpy(SbbPaginatorElement.events.pageChanged);
    await sendKeys({ press: tabKey });
    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '0',
    );
    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement!.shadowRoot!.activeElement!.getAttribute('data-index')).to.equal(
      '1',
    );
    await sendKeys({ press: 'Space' });
    await waitForLitRender(element);
    expect(pageChangedEventSpy.count).to.be.equal(1);
  });
});
