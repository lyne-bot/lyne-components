import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForCondition, waitForLitRender, EventSpy } from '../../core/testing';
import { fixture } from '../../core/testing/private';
import type { SbbExpansionPanelContentElement } from '../expansion-panel-content';
import '../expansion-panel-content';
import { SbbExpansionPanelHeaderElement } from '../expansion-panel-header';

import { SbbExpansionPanelElement } from './expansion-panel';

describe(`sbb-expansion-panel with ${fixture.name}`, () => {
  let element: SbbExpansionPanelElement;

  beforeEach(async () => {
    element = await fixture(
      html`
        <sbb-expansion-panel disable-animation>
          <sbb-expansion-panel-header icon-name="dog-medium">Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      `,
      {
        modules: [
          './expansion-panel.ts',
          '../expansion-panel-header/index.ts',
          '../expansion-panel-content/index.ts',
        ],
      },
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbExpansionPanelElement);
  });

  it('has slotted elements with the correct properties', async () => {
    const header = element.querySelector('sbb-expansion-panel-header');
    expect(header).to.have.attribute('id', 'sbb-expansion-panel-header-2');
    expect(header).to.have.attribute('aria-controls', 'sbb-expansion-panel-content-2');
    expect(header).to.have.attribute('data-icon');

    const content = element.querySelector('sbb-expansion-panel-content');
    expect(content).to.have.attribute('id', 'sbb-expansion-panel-content-2');
    expect(content).to.have.attribute('aria-labelledby', `sbb-expansion-panel-header-2`);
    expect(content).to.have.attribute('data-icon-space');
  });

  it('has slotted elements with the correct properties when id are set', async () => {
    element = await fixture(
      html`
        <sbb-expansion-panel disable-animation>
          <sbb-expansion-panel-header id="header">Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content id="content">Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      `,
      {
        modules: [
          './expansion-panel.ts',
          '../expansion-panel-header/index.ts',
          '../expansion-panel-content/index.ts',
        ],
      },
    );

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
    const willOpenEventSpy = new EventSpy(SbbExpansionPanelElement.events.willOpen);
    const willCloseEventSpy = new EventSpy(SbbExpansionPanelElement.events.willClose);
    const didOpenEventSpy = new EventSpy(SbbExpansionPanelElement.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbExpansionPanelElement.events.didClose);

    header.click();
    await waitForCondition(() => toggleExpandedEventSpy.events.length === 1);
    expect(toggleExpandedEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    expect(element.expanded).to.be.equal(true);
    expect(header.getAttribute('aria-expanded')).to.be.equal('true');
    expect(content.getAttribute('aria-hidden')).to.be.equal('false');
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    header.click();
    await waitForCondition(() => toggleExpandedEventSpy.events.length === 2);
    expect(toggleExpandedEventSpy.count).to.be.equal(2);
    await waitForLitRender(element);
    expect(element.expanded).to.be.equal(false);
    expect(header.getAttribute('aria-expanded')).to.be.equal('false');
    expect(content.getAttribute('aria-hidden')).to.be.equal('true');
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
  });

  it('disabled property is proxied to header', async () => {
    const header: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('sbb-expansion-panel-header')!;
    expect(header.disabled).to.be.equal(false);
    expect(header).not.to.have.attribute('aria-disabled');

    element.disabled = true;
    await waitForLitRender(element);
    expect(header.disabled).to.be.equal(true);
    expect(header).to.have.attribute('aria-disabled', 'true');

    element.disabled = false;
    await waitForLitRender(element);
    expect(header.disabled).to.be.equal(false);
    expect(header).not.to.have.attribute('aria-disabled');
  });
});
