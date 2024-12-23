import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbExpansionPanelContentElement } from '../expansion-panel-content.js';
import '../expansion-panel-content.js';
import { SbbExpansionPanelHeaderElement } from '../expansion-panel-header.js';

import { SbbExpansionPanelElement } from './expansion-panel.js';

describe(`sbb-expansion-panel`, () => {
  let element: SbbExpansionPanelElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-expansion-panel>
        <sbb-expansion-panel-header icon-name="dog-medium">Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbExpansionPanelElement);
  });

  it('has slotted elements with the correct properties', async () => {
    const header = element.querySelector('sbb-expansion-panel-header');
    expect(header).to.have.attribute('id', 'sbb-expansion-panel-header-2');
    expect(header).to.have.attribute('aria-controls', 'sbb-expansion-panel-content-2');
    expect(header).to.have.attribute('data-icon');
    expect(header).to.have.attribute('data-size', 'l');

    const content = element.querySelector('sbb-expansion-panel-content');
    expect(content).to.have.attribute('id', 'sbb-expansion-panel-content-2');
    expect(content).to.have.attribute('aria-labelledby', `sbb-expansion-panel-header-2`);
    expect(content).to.have.attribute('data-icon-space');
    expect(content).to.have.attribute('data-size', 'l');
  });

  it('has slotted elements with the correct properties when id are set', async () => {
    element = await fixture(html`
      <sbb-expansion-panel>
        <sbb-expansion-panel-header id="header">Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content id="content">Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);

    const header = element.querySelector('sbb-expansion-panel-header');
    expect(header).to.have.attribute('aria-controls', 'content');
    const content = element.querySelector('sbb-expansion-panel-content');
    expect(content).to.have.attribute('aria-labelledby', `header`);
  });

  it('click the header expands the panel, click again collapses it', async () => {
    const header: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('sbb-expansion-panel-header')!;
    const content: SbbExpansionPanelContentElement =
      element.querySelector<SbbExpansionPanelContentElement>('sbb-expansion-panel-content')!;
    expect(element.expanded).to.be.equal(false);
    expect(header.getAttribute('aria-expanded')).to.be.equal('false');
    expect(content.getAttribute('aria-hidden')).to.be.equal('true');

    const toggleExpandedEventSpy = new EventSpy(
      SbbExpansionPanelHeaderElement.events.toggleExpanded,
    );
    const willOpenEventSpy = new EventSpy(SbbExpansionPanelElement.events.willOpen, element);
    const willCloseEventSpy = new EventSpy(SbbExpansionPanelElement.events.willClose, element);
    const didOpenEventSpy = new EventSpy(SbbExpansionPanelElement.events.didOpen, element);
    const didCloseEventSpy = new EventSpy(SbbExpansionPanelElement.events.didClose, element);

    await waitForLitRender(element);

    header.click();
    await toggleExpandedEventSpy.calledOnce();
    expect(toggleExpandedEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    expect(element.expanded).to.be.equal(true);
    expect(header.getAttribute('aria-expanded')).to.be.equal('true');
    expect(content.getAttribute('aria-hidden')).to.be.equal('false');
    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);
    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);

    header.click();
    await toggleExpandedEventSpy.calledTimes(2);
    expect(toggleExpandedEventSpy.count).to.be.equal(2);
    await waitForLitRender(element);
    expect(element.expanded).to.be.equal(false);
    expect(header.getAttribute('aria-expanded')).to.be.equal('false');
    expect(content.getAttribute('aria-hidden')).to.be.equal('true');
    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);
    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
  });

  it('disabled property is proxied to header', async () => {
    const header: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('sbb-expansion-panel-header')!;
    expect(header.disabled).to.be.equal(false);

    element.disabled = true;
    await waitForLitRender(element);
    expect(header.disabled).to.be.equal(true);

    element.disabled = false;
    await waitForLitRender(element);
    expect(header.disabled).to.be.equal(false);
  });

  it('size property is proxied to children', async () => {
    const header: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('sbb-expansion-panel-header')!;
    const content: SbbExpansionPanelContentElement =
      element.querySelector<SbbExpansionPanelContentElement>('sbb-expansion-panel-content')!;
    expect(header).to.have.attribute('data-size', 'l');
    expect(content).to.have.attribute('data-size', 'l');

    element.size = 's';
    await waitForLitRender(element);
    expect(header).to.have.attribute('data-size', 's');
    expect(content).to.have.attribute('data-size', 's');

    element.size = 'l';
    await waitForLitRender(element);
    expect(header).to.have.attribute('data-size', 'l');
    expect(content).to.have.attribute('data-size', 'l');
  });

  it('should fire animation events with non-zero animation duration', async () => {
    element.style.setProperty('--sbb-expansion-panel-animation-duration', '1ms');

    const didOpenSpy = new EventSpy(SbbExpansionPanelElement.events.didOpen, element);
    const didCloseSpy = new EventSpy(SbbExpansionPanelElement.events.didClose, element);

    element.expanded = true;

    await didOpenSpy.calledOnce();

    element.expanded = false;

    await didCloseSpy.calledOnce();
    expect(didCloseSpy.count).to.be.equal(1);
  });
});
