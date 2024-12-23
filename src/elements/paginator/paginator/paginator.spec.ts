import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { spy } from 'sinon';

import type { SbbMiniButtonElement } from '../../button/mini-button.js';
import { fixture, tabKey } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbOptionElement } from '../../option.js';
import { SbbSelectElement } from '../../select.js';

import { SbbPaginatorElement } from './paginator.js';

describe('sbb-paginator', () => {
  let element: SbbPaginatorElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-paginator length="50" page-size="5"></sbb-paginator>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbPaginatorElement);
  });

  it('change pages via prev/next buttons and emits `page` event', async () => {
    const pageEventSpy = spy();
    const goToPrev: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-prev-page',
    )!;
    const goToNext: SbbMiniButtonElement = element.shadowRoot!.querySelector(
      '#sbb-paginator-next-page',
    )!;

    element.addEventListener('page', (event) => {
      expect(event.detail.pageIndex).to.be.equal(element.pageIndex);
      pageEventSpy();
    });

    expect(goToPrev).to.have.attribute('disabled');
    goToPrev.click();
    await waitForLitRender(element);
    expect(pageEventSpy).not.to.have.been.called;

    expect(goToNext).not.to.have.attribute('disabled');
    goToNext.click();
    await waitForLitRender(element);
    expect(pageEventSpy).to.have.been.calledOnce;
    expect(element.pageIndex).to.be.equal(1);
    expect(goToPrev).not.to.have.attribute('disabled');
    expect(goToNext).not.to.have.attribute('disabled');

    goToPrev.click();
    await waitForLitRender(element);
    expect(pageEventSpy).to.have.been.calledTwice;
    expect(element.pageIndex).to.be.equal(0);
  });

  it('changes to the correct selected page when pageSize changes', async () => {
    // go to page 5 / pageIndex=4, which includes items 21-25
    element.setAttribute('page-index', '4');
    await waitForLitRender(element);
    let selectedElement = element.shadowRoot!.querySelector('[data-selected]')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('4');

    // switching to pageSize=10, item 21 should be on page 3 / pageIndex=2
    element.setAttribute('page-size', '10');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('[data-selected]')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('2');

    // go to page 4 / pageIndex=3, which now includes items 31-40
    element.setAttribute('page-index', '3');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('[data-selected]')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('3');

    // switching to pageSize=2, item 31 should be on page 16 / pageIndex=15
    element.setAttribute('page-size', '2');
    await waitForLitRender(element);
    selectedElement = element.shadowRoot!.querySelector('[data-selected]')!;
    expect(selectedElement.getAttribute('data-index')).to.be.equal('15');
  });

  it('emits `page` event when pageIndex changes via page button click', async () => {
    const pageEventSpy = spy();

    element.addEventListener('page', (event) => {
      expect(event.detail.pageSize).to.be.equal(element.pageSize);
      expect(event.detail.pageSize).to.be.equal(5);
      expect(event.detail.pageIndex).to.be.equal(2);
      expect(event.detail.previousPageIndex).to.be.equal(0);
      expect(event.detail.length).to.be.equal(50);

      pageEventSpy();
    });

    const pages = element.shadowRoot!.querySelectorAll('.sbb-paginator__page--number-item');
    pages[2].dispatchEvent(new Event('click'));
    await waitForLitRender(element);
    expect(pageEventSpy).to.have.been.calledOnce;
  });

  it('emits `page` event when pageSize changes via select', async () => {
    const pageEventSpy = new EventSpy(SbbPaginatorElement.events.page);
    element.setAttribute('page-size-options', '[10, 20, 50]');
    await waitForLitRender(element);
    const select: SbbSelectElement = element.shadowRoot!.querySelector('sbb-select')!;
    expect(select).not.to.be.null;

    const willOpen = new EventSpy(
      SbbSelectElement.events.willOpen,
      element.shadowRoot!.querySelector('sbb-select'),
    );
    const didOpen = new EventSpy(
      SbbSelectElement.events.didOpen,
      element.shadowRoot!.querySelector('sbb-select'),
    );
    select.click();
    await willOpen.calledOnce();
    expect(willOpen.count).to.be.equal(1);
    await didOpen.calledOnce();
    expect(didOpen.count).to.be.equal(1);
    await waitForLitRender(element);

    const firstOption = select.querySelector<SbbOptionElement>('[value="10"]')!;
    expect(firstOption).not.to.be.null;
    firstOption.click();
    await waitForLitRender(element);
    expect(pageEventSpy.count).to.be.equal(1);
    expect((pageEventSpy.lastEvent as CustomEvent).detail['pageSize']).to.be.equal(10);
    expect((pageEventSpy.lastEvent as CustomEvent).detail['pageIndex']).to.be.equal(0);
    expect((pageEventSpy.lastEvent as CustomEvent).detail['previousPageIndex']).to.be.equal(0);
    expect((pageEventSpy.lastEvent as CustomEvent).detail['length']).to.be.equal(50);
  });

  it('the `page` event is not emitted when pageSize and pageIndex change programmatically', async () => {
    const pageEventSpy = new EventSpy(SbbPaginatorElement.events.page);
    element.setAttribute('page-index', '4');
    await waitForLitRender(element);
    expect(element.pageIndex).to.be.equal(4);
    expect(pageEventSpy.count).to.be.equal(0);

    element.setAttribute('page-size', '10');
    await waitForLitRender(element);
    expect(element.pageSize).to.be.equal(10);
    expect(pageEventSpy.count).to.be.equal(0);
  });

  it('handles length change', () => {
    element.pageIndex = 9;
    element.length = 100;
    expect(element.pageIndex).to.be.equal(9);

    element.length = 10;
    expect(element.pageIndex).to.be.equal(1);

    element.length = -1;
    expect(element.length).to.be.equal(0);
    expect(element.pageIndex).to.be.equal(0);
  });

  it('handles pageSize change', () => {
    element.pageIndex = 9;
    expect(element.pageIndex).to.be.equal(9);

    element.pageSize = 1;
    expect(element.pageIndex).to.be.equal(45);

    element.pageSize = 10;
    expect(element.pageIndex).to.be.equal(4);

    element.pageSize = -1;
    expect(element.pageSize).to.be.equal(0);
    expect(element.pageIndex).to.be.equal(0);
  });

  it('handles pageIndex change', () => {
    element.pageIndex = 10;
    expect(element.pageIndex).to.be.equal(9);

    element.pageIndex = -1;
    expect(element.pageIndex).to.be.equal(0);

    element.pageIndex = 0;
    expect(element.pageIndex).to.be.equal(0);

    element.pageIndex = 5;
    expect(element.pageIndex).to.be.equal(5);
  });

  it('keyboard selection', async () => {
    // start sbb-mini-button-group
    await sendKeys({ press: tabKey });
    // end sbb-mini-button-group

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!).to.have.attribute('data-index', '0');

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);
    expect(document.activeElement!.shadowRoot!.activeElement!).to.have.attribute('data-index', '1');

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'Space' });
    await waitForLitRender(element);
    expect(document.activeElement!.shadowRoot!.activeElement!).to.have.attribute('data-index', '2');

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);
    expect(document.activeElement!.shadowRoot!.activeElement!).to.have.attribute('data-index', '3');

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);
    expect(document.activeElement!.shadowRoot!.activeElement!).to.have.attribute('data-index', '4');
    expect(
      element.shadowRoot!.querySelector('sbb-screen-reader-only')!.textContent?.trim(),
    ).to.be.equal('Page 5 selected.');

    const pageEventSpy = new EventSpy(SbbPaginatorElement.events.page);
    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'Space' });
    await waitForLitRender(element);
    expect(pageEventSpy.count).to.be.equal(1);
  });

  it('should update items per page label on language change', async () => {
    element = await fixture(
      html`<sbb-paginator length="50" page-size="5" .pageSizeOptions=${[5, 10]}></sbb-paginator>`,
    );

    const comboBoxElement = element.shadowRoot!.querySelector('[role="combobox"]')!;

    expect(comboBoxElement).to.have.attribute('aria-label', 'Items per page');

    const lang = document.documentElement.getAttribute('lang')!;
    document.documentElement.setAttribute('lang', 'de');

    await waitForLitRender(element);
    // We have to wait a tick until the label sync can happen
    await aTimeout(0);

    expect(comboBoxElement).to.have.attribute('aria-label', 'Einträge pro Seite');

    // Restore language
    document.documentElement.setAttribute('lang', lang);
  });
});
