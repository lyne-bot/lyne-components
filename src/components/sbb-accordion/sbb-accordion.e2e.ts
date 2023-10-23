import { waitForCondition, waitForLitRender } from '../../global/testing';
import { SbbExpansionPanel } from '../sbb-expansion-panel';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbAccordion } from './sbb-accordion';
import { type SbbExpansionPanelHeader } from '../sbb-expansion-panel-header';
import '../sbb-expansion-panel-header';
import '../sbb-expansion-panel-content';

describe('sbb-accordion', () => {
  let element: SbbAccordion;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-accordion title-level="4">
        <sbb-expansion-panel id="panel-1" disable-animation>
          <sbb-expansion-panel-header id="header-1">Header 1</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id="panel-2" disable-animation>
          <sbb-expansion-panel-header id="header-2">Header 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id="panel-3" disable-animation>
          <sbb-expansion-panel-header id="header-3">Header 3</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 3</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbAccordion);
  });

  it('should set accordion context on expansion panel', async () => {
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));

    expect(panels[0]).to.have.attribute('data-accordion-first');
    expect(panels[0]).to.have.attribute('data-accordion');
    expect(panels[1]).to.have.attribute('data-accordion');
    expect(panels[2]).to.have.attribute('data-accordion');
    expect(panels[2]).to.have.attribute('data-accordion-last');
  });

  it('should set accordion context on expansion panel when removing and adding expansion-panels', async () => {
    let panels: SbbExpansionPanel[];

    element.querySelector('sbb-expansion-panel').remove();
    await waitForLitRender(element);

    panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels[0]).to.have.attribute('data-accordion-first');
    expect(panels[1]).to.have.attribute('data-accordion-last');

    element.querySelector('sbb-expansion-panel').remove();
    await waitForLitRender(element);

    const lastRemainingPanel = element.querySelector('sbb-expansion-panel');
    expect(lastRemainingPanel).to.have.attribute('data-accordion-first');
    expect(lastRemainingPanel).to.have.attribute('data-accordion-last');

    const panel = document.createElement('sbb-expansion-panel');
    element.append(panel);
    await waitForLitRender(element);

    panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels[0]).to.have.attribute('data-accordion-first');
    expect(panels[0]).not.to.have.attribute('data-accordion-last');
    expect(panels[1]).to.have.attribute('data-accordion-last');
  });

  it('should inherit titleLevel prop by panels', async () => {
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels.length).to.be.equal(3);
    expect(
      panels[0].shadowRoot.querySelector('.sbb-expansion-panel').firstElementChild.tagName,
    ).to.be.equal('H4');
    expect(
      panels[1].shadowRoot.querySelector('.sbb-expansion-panel').firstElementChild.tagName,
    ).to.be.equal('H4');
    expect(
      panels[2].shadowRoot.querySelector('.sbb-expansion-panel').firstElementChild.tagName,
    ).to.be.equal('H4');
  });

  it('should dynamically update titleLevel prop', async () => {
    element.titleLevel = '6';
    await waitForLitRender(element);
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels.length).to.be.equal(3);
    expect(
      panels[0].shadowRoot.querySelector('.sbb-expansion-panel').firstElementChild.tagName,
    ).to.be.equal('H6');
    expect(
      panels[1].shadowRoot.querySelector('.sbb-expansion-panel').firstElementChild.tagName,
    ).to.be.equal('H6');
    expect(
      panels[2].shadowRoot.querySelector('.sbb-expansion-panel').firstElementChild.tagName,
    ).to.be.equal('H6');
  });

  it('should close others when expanding and multi = false', async () => {
    const willOpenEventSpy = new EventSpy(SbbExpansionPanel.events.willOpen);
    const panelOne: SbbExpansionPanel = element.querySelector('#panel-1');
    const headerOne: SbbExpansionPanelHeader = element.querySelector('#header-1');
    const panelTwo: SbbExpansionPanel = element.querySelector('#panel-2');
    const headerTwo: SbbExpansionPanelHeader = element.querySelector('#header-2');
    const panelThree: SbbExpansionPanel = element.querySelector('#panel-3');
    const headerThree: SbbExpansionPanelHeader = element.querySelector('#header-3');

    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(panel.expanded).to.be.equal(false);
    }

    headerTwo.click();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    expect(panelOne.expanded).to.be.equal(false);
    expect(panelTwo.expanded).to.be.equal(true);
    expect(panelThree.expanded).to.be.equal(false);

    headerOne.click();
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy.count).to.be.equal(2);
    expect(panelOne.expanded).to.be.equal(true);
    expect(panelTwo.expanded).to.be.equal(false);
    expect(panelThree.expanded).to.be.equal(false);

    headerThree.click();
    await waitForCondition(() => willOpenEventSpy.events.length === 3);
    expect(willOpenEventSpy.count).to.be.equal(3);
    expect(panelOne.expanded).to.be.equal(false);
    expect(panelTwo.expanded).to.be.equal(false);
    expect(panelThree.expanded).to.be.equal(true);
  });

  it('should not change others when expanding and multi = false', async () => {
    element.multi = true;
    await waitForLitRender(element);
    const willOpenEventSpy = new EventSpy(SbbExpansionPanel.events.willOpen);
    const panelOne: SbbExpansionPanel = element.querySelector('#panel-1');
    const headerOne: SbbExpansionPanelHeader = element.querySelector('#header-1');
    const panelTwo: SbbExpansionPanel = element.querySelector('#panel-2');
    const headerTwo: SbbExpansionPanelHeader = element.querySelector('#header-2');
    const panelThree: SbbExpansionPanel = element.querySelector('#panel-3');
    const headerThree: SbbExpansionPanelHeader = element.querySelector('#header-3');

    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(panel.expanded).to.be.equal(false);
    }

    headerTwo.click();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    expect(panelOne.expanded).to.be.equal(false);
    expect(panelTwo.expanded).to.be.equal(true);
    expect(panelThree.expanded).to.be.equal(false);

    headerOne.click();
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy.count).to.be.equal(2);
    expect(panelOne.expanded).to.be.equal(true);
    expect(panelTwo.expanded).to.be.equal(true);
    expect(panelThree.expanded).to.be.equal(false);

    headerThree.click();
    await waitForCondition(() => willOpenEventSpy.events.length === 3);
    expect(willOpenEventSpy.count).to.be.equal(3);
    expect(panelOne.expanded).to.be.equal(true);
    expect(panelTwo.expanded).to.be.equal(true);
    expect(panelThree.expanded).to.be.equal(true);
  });

  it('should close all panels except the first when multi changes from true to false', async () => {
    element.multi = true;
    await waitForLitRender(element);
    const panelOne: SbbExpansionPanel = element.querySelector('#panel-1');
    const panelTwo: SbbExpansionPanel = element.querySelector('#panel-2');
    const headerTwo: SbbExpansionPanelHeader = element.querySelector('#header-2');
    const panelThree: SbbExpansionPanel = element.querySelector('#panel-3');
    const headerThree: SbbExpansionPanelHeader = element.querySelector('#header-3');

    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(panel.expanded).to.be.equal(false);
    }

    const willOpenEventSpy = new EventSpy(SbbExpansionPanel.events.willOpen);

    headerTwo.click();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    expect(panelTwo.expanded).to.be.equal(true);

    headerThree.click();
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy.count).to.be.equal(2);
    expect(panelThree.expanded).to.be.equal(true);

    element.multi = false;
    await waitForLitRender(element);
    expect(panelOne.expanded).to.be.equal(true);
    expect(panelTwo.expanded).to.be.equal(false);
    expect(panelThree.expanded).to.be.equal(false);
  });
});
