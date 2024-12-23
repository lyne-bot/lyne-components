import { assert, aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../core/testing.js';
import {
  SbbExpansionPanelElement,
  type SbbExpansionPanelHeaderElement,
} from '../expansion-panel.js';

import { SbbAccordionElement } from './accordion.js';

describe(`sbb-accordion`, () => {
  let element: SbbAccordionElement;

  beforeEach(async function () {
    element = await fixture(html`
      <sbb-accordion title-level="4">
        <sbb-expansion-panel id="panel-1">
          <sbb-expansion-panel-header id="header-1">Header 1</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id="panel-2">
          <sbb-expansion-panel-header id="header-2">Header 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id="panel-3">
          <sbb-expansion-panel-header id="header-3">Header 3</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 3</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbAccordionElement);
  });

  it('should set accordion context on expansion panel', () => {
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));

    expect(panels[0]).to.have.attribute('data-accordion-first');
    expect(panels[0]).to.have.attribute('data-accordion');
    expect(panels[0]).to.have.attribute('size');
    expect(panels[0].size).to.be.equal('l');
    expect(panels[1]).to.have.attribute('data-accordion');
    expect(panels[1]).to.have.attribute('size');
    expect(panels[1].size).to.be.equal('l');
    expect(panels[2]).to.have.attribute('data-accordion');
    expect(panels[2]).to.have.attribute('data-accordion-last');
    expect(panels[2]).to.have.attribute('size');
    expect(panels[2].size).to.be.equal('l');
  });

  it('should set accordion context on expansion panel when removing and adding expansion-panels', async () => {
    let panels: SbbExpansionPanelElement[];

    element.querySelector('sbb-expansion-panel')!.remove();
    await waitForLitRender(element);

    panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels[0]).to.have.attribute('data-accordion-first');
    expect(panels[1]).to.have.attribute('data-accordion-last');

    element.querySelector('sbb-expansion-panel')!.remove();
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

  it('should inherit titleLevel prop by panels', () => {
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels.length).to.be.equal(3);
    expect(
      panels[0].shadowRoot!.querySelector('.sbb-expansion-panel')!.firstElementChild!.localName,
    ).to.be.equal('h4');
    expect(
      panels[1].shadowRoot!.querySelector('.sbb-expansion-panel')!.firstElementChild!.localName,
    ).to.be.equal('h4');
    expect(
      panels[2].shadowRoot!.querySelector('.sbb-expansion-panel')!.firstElementChild!.localName,
    ).to.be.equal('h4');
  });

  it('should dynamically update titleLevel prop', async () => {
    element.titleLevel = '6';
    await waitForLitRender(element);
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels.length).to.be.equal(3);
    expect(
      panels[0].shadowRoot!.querySelector('.sbb-expansion-panel')!.firstElementChild!.localName,
    ).to.be.equal('h6');
    expect(
      panels[1].shadowRoot!.querySelector('.sbb-expansion-panel')!.firstElementChild!.localName,
    ).to.be.equal('h6');
    expect(
      panels[2].shadowRoot!.querySelector('.sbb-expansion-panel')!.firstElementChild!.localName,
    ).to.be.equal('h6');
  });

  it('should dynamically update size prop', async () => {
    element.size = 's';
    await waitForLitRender(element);
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels.length).to.be.equal(3);
    expect(panels[0].size).to.be.equal('s');
    expect(panels[1].size).to.be.equal('s');
    expect(panels[2].size).to.be.equal('s');
  });

  it('should close others when expanding and multi = false', async () => {
    const willOpenEventSpy = new EventSpy(SbbExpansionPanelElement.events.willOpen, null, {
      capture: true,
    });
    const panelOne: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-1')!;
    const headerOne: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-1')!;
    const panelTwo: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-2')!;
    const headerTwo: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-2')!;
    const panelThree: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-3')!;
    const headerThree: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-3')!;

    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(panel.expanded).to.be.equal(false);
    }

    headerTwo.click();
    await willOpenEventSpy.calledOnce();
    await aTimeout(0);
    expect(willOpenEventSpy.count).to.be.equal(1);
    expect(panelOne.expanded, 'headerTwo panelOne.expanded').to.be.equal(false);
    expect(panelTwo.expanded, 'headerTwo panelTwo.expanded').to.be.equal(true);
    expect(panelThree.expanded, 'headerTwo panelThree.expanded').to.be.equal(false);

    headerOne.click();
    await willOpenEventSpy.calledTimes(2);
    await aTimeout(0);
    expect(willOpenEventSpy.count).to.be.equal(2);
    expect(panelOne.expanded, 'headerOne panelOne.expanded').to.be.equal(true);
    expect(panelTwo.expanded, 'headerOne panelTwo.expanded').to.be.equal(false);
    expect(panelThree.expanded, 'headerOne panelThree.expanded').to.be.equal(false);

    headerThree.click();
    await willOpenEventSpy.calledTimes(3);
    await aTimeout(0);
    expect(willOpenEventSpy.count).to.be.equal(3);
    expect(panelOne.expanded, 'headerThree panelOne.expanded').to.be.equal(false);
    expect(panelTwo.expanded, 'headerThree panelTwo.expanded').to.be.equal(false);
    expect(panelThree.expanded, 'headerThree panelThree.expanded').to.be.equal(true);
  });

  it('should not change others when expanding and multi = false', async () => {
    element.multi = true;
    await waitForLitRender(element);
    const willOpenEventSpy = new EventSpy(SbbExpansionPanelElement.events.willOpen, null, {
      capture: true,
    });
    const panelOne: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-1')!;
    const headerOne: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-1')!;
    const panelTwo: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-2')!;
    const headerTwo: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-2')!;
    const panelThree: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-3')!;
    const headerThree: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-3')!;

    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(panel.expanded).to.be.equal(false);
    }

    headerTwo.click();
    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);
    expect(panelOne.expanded).to.be.equal(false);
    expect(panelTwo.expanded).to.be.equal(true);
    expect(panelThree.expanded).to.be.equal(false);

    headerOne.click();
    await willOpenEventSpy.calledTimes(2);
    expect(willOpenEventSpy.count).to.be.equal(2);
    expect(panelOne.expanded).to.be.equal(true);
    expect(panelTwo.expanded).to.be.equal(true);
    expect(panelThree.expanded).to.be.equal(false);

    headerThree.click();
    await willOpenEventSpy.calledTimes(3);
    expect(willOpenEventSpy.count).to.be.equal(3);
    expect(panelOne.expanded).to.be.equal(true);
    expect(panelTwo.expanded).to.be.equal(true);
    expect(panelThree.expanded).to.be.equal(true);
  });

  it('should close all panels except the first when multi changes from true to false', async () => {
    element.multi = true;
    await waitForLitRender(element);
    const panelOne: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-1')!;
    const panelTwo: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-2')!;
    const headerTwo: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-2')!;
    const panelThree: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-3')!;
    const headerThree: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-3')!;

    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(panel.expanded).to.be.equal(false);
    }

    const willOpenEventSpy = new EventSpy(SbbExpansionPanelElement.events.willOpen, null, {
      capture: true,
    });

    headerTwo.click();
    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);
    expect(panelTwo.expanded).to.be.equal(true);

    headerThree.click();
    await willOpenEventSpy.calledTimes(2);
    expect(willOpenEventSpy.count).to.be.equal(2);
    expect(panelThree.expanded).to.be.equal(true);

    element.multi = false;
    await waitForLitRender(element);
    expect(panelOne.expanded).to.be.equal(true);
    expect(panelTwo.expanded).to.be.equal(false);
    expect(panelThree.expanded).to.be.equal(false);
  });
});
