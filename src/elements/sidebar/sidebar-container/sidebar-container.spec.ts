import { assert, aTimeout, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';
import type { SbbSidebarElement } from '../sidebar.js';

import { SbbSidebarContainerElement } from './sidebar-container.js';

import '../sidebar.js';
import '../sidebar-content.js';

describe('sbb-sidebar-container', () => {
  let element: SbbSidebarContainerElement,
    sidebar1: SbbSidebarElement,
    sidebar2: SbbSidebarElement,
    sidebar3: SbbSidebarElement,
    sidebar4: SbbSidebarElement;

  async function setViewportWidth(width: number): Promise<void> {
    await setViewport({ width, height: 600 });

    if (element) {
      await waitForLitRender(element);
    }

    // In Safari it takes a little bit longer to render everything
    await aTimeout(100);
  }

  beforeEach(async () => {
    await setViewportWidth(1280);

    element = await fixture(
      html`<sbb-sidebar-container id="c1">
        <sbb-sidebar id="s1" opened>Sidebar 1 start</sbb-sidebar>
        <sbb-sidebar-content>
          <sbb-sidebar-container id="c2">
            <sbb-sidebar id="s3" opened>Sidebar 3 start</sbb-sidebar>
            <sbb-sidebar-content>Content</sbb-sidebar-content>
            <sbb-sidebar id="s4" position="end" mode="over" opened>Sidebar 4 end</sbb-sidebar>
          </sbb-sidebar-container>
        </sbb-sidebar-content>
        <sbb-sidebar id="s2" position="end" opened>Sidebar 2 end</sbb-sidebar>
      </sbb-sidebar-container>`,
    );

    sidebar1 = element.querySelector('#s1')!;
    sidebar2 = element.querySelector('#s2')!;
    sidebar3 = element.querySelector('#s3')!;
    sidebar4 = element.querySelector('#s4')!;
  });

  it('should render', async () => {
    assert.instanceOf(element, SbbSidebarContainerElement);
  });

  it('should return sidebars', async () => {
    expect(element.sidebars[0]).to.be.equal(sidebar1);
    expect(element.sidebars[1]).to.be.equal(sidebar2);

    expect(element.start).to.be.equal(sidebar1);
    expect(element.end).to.be.equal(sidebar2);
  });

  it('should return start sidebar if no end is present', async () => {
    sidebar2.remove();
    expect(element.start).to.be.equal(sidebar1);
    expect(element.end).to.be.equal(null);
  });

  it('should return end sidebar if no start is present', async () => {
    sidebar1.remove();
    expect(element.end).to.be.equal(sidebar2);
    expect(element.start).to.be.equal(null);
  });

  async function testResizing(): Promise<void> {
    expect(sidebar1.isOpen, 'sidebar 1, initially').to.be.true;
    expect(sidebar2.isOpen, 'sidebar 2, initially').to.be.true;
    expect(sidebar3.isOpen, 'sidebar 3, initially').to.be.true;
    expect(sidebar4.isOpen, 'sidebar 4, initially').to.be.true;

    await setViewportWidth(1279);
    await aTimeout(1);

    expect(sidebar1.isOpen, 'sidebar 1, after reduction').to.be.true;
    expect(sidebar2.isOpen, 'sidebar 2, after reduction').to.be.true;
    expect(sidebar3.isOpen, 'sidebar 3, after reduction').to.be.false;
    expect(sidebar4.isOpen, 'sidebar 4, after reduction').to.be.true;
    expect(sidebar3).to.have.attribute('data-minimum-space');
    expect(sidebar3).not.to.have.attribute('data-minimum-space-closing');

    await setViewportWidth(320);
    await aTimeout(1);

    expect(sidebar1.isOpen, 'sidebar 1, zero').to.be.false;
    expect(sidebar2.isOpen, 'sidebar 2, zero').to.be.false;
    expect(sidebar3.isOpen, 'sidebar 3, zero').to.be.false;
    expect(sidebar4.isOpen, 'sidebar 4, zero').to.be.true;

    await setViewportWidth(1179);
    await aTimeout(1);

    expect(sidebar1.isOpen, 'sidebar 1, after increasing').to.be.true;
    expect(sidebar2.isOpen, 'sidebar 2, after increasing').to.be.true;
    expect(sidebar3.isOpen, 'sidebar 3, after increasing').to.be.false;
    expect(sidebar4.isOpen, 'sidebar 4, after increasing').to.be.true;

    await setViewportWidth(1280);
    await aTimeout(1);

    expect(sidebar1.isOpen, 'sidebar 1, after max resolution').to.be.true;
    expect(sidebar2.isOpen, 'sidebar 2, after max resolution').to.be.true;
    expect(sidebar3.isOpen, 'sidebar 3, after max resolution').to.be.true;
    expect(sidebar4.isOpen, 'sidebar 4, after max resolution').to.be.true;
  }

  it('should collapse when space gets below minimum', async () => {
    await testResizing();
  });

  it('should collapse when space gets below minimum with non-zero animation duration', async () => {
    element.style.setProperty('--sbb-sidebar-container-animation-duration', '1ms');
    element
      .querySelector('sbb-sidebar-container')!
      .style.setProperty('--sbb-sidebar-container-animation-duration', '1ms');

    await testResizing();
  });

  it('should react to new sidebar', async () => {
    await setViewportWidth(960);

    expect(sidebar1.isOpen, 'sidebar 1, before sidebar 1 removal').to.be.true;
    expect(sidebar2.isOpen, 'sidebar 2, before sidebar 1 removal').to.be.true;
    expect(sidebar3.isOpen, 'sidebar 3, before sidebar 1 removal').to.be.false;
    expect(sidebar4.isOpen, 'sidebar 4, before sidebar 1 removal').to.be.true;

    sidebar1.remove();
    // We need to wait a tick in order to settle the new situation
    await aTimeout(0);

    expect(sidebar2.isOpen, 'sidebar 2, after removal').to.be.true;
    expect(sidebar3.isOpen, 'sidebar 3, after removal').to.be.true;
    expect(sidebar4.isOpen, 'sidebar 4, after removal').to.be.true;

    element.prepend(sidebar1);

    // We need to wait a tick in order to settle the new situation
    await aTimeout(0);

    expect(sidebar1.isOpen, 'sidebar 1, after sidebar 1 insertion').to.be.true;
    expect(sidebar2.isOpen, 'sidebar 2, after sidebar 1 insertion').to.be.true;
    expect(sidebar3.isOpen, 'sidebar 3, after sidebar 1 insertion').to.be.false;
    expect(sidebar4.isOpen, 'sidebar 4, after sidebar 1 insertion').to.be.true;
  });

  it('should not reopen sidebar which was always closed', async () => {
    sidebar1.opened = false;

    // Reduce width
    await setViewportWidth(320);
    expect(sidebar1.isOpen, 'sidebar 1, not enough space').to.be.false;

    // Maximize width
    await setViewportWidth(1280);
    expect(sidebar1.isOpen, 'sidebar 1, enough space').to.be.false;
  });

  it('should respect forced closed parent containers', async () => {
    await setViewportWidth(959);
    expect(sidebar3.isOpen).to.be.false;

    // Should stay stable during other resize
    await setViewportWidth(930);
    expect(sidebar3.isOpen).to.be.false;
  });

  it('should not close manually opened sidebar', async () => {
    // We close over mode sidebar to not interfere with other sidebar
    sidebar4.close();

    // We shrink to a size where sidebar2 gets closed
    await setViewportWidth(900);
    expect(sidebar2.isOpen, 'initially').to.be.false;

    sidebar2.open();
    expect(sidebar2.isOpen, 'after calling open').to.be.true;

    await setViewportWidth(901);
    expect(sidebar2.isOpen, 'after increase viewport').to.be.true;
  });

  it('should remove inert mechanism (and focus trap) if opened on small viewport and space becomes available', async () => {
    // We close over mode sidebar to not interfere with other sidebar
    sidebar4.close();

    await setViewportWidth(320);
    await aTimeout(1);

    // Should be forced closed because little space available
    expect(sidebar1.opened).to.be.false;

    // Open sidebar 1 in forced over mode
    sidebar1.open();
    await waitForLitRender(element);
    expect(sidebar1.opened).to.be.true;
    expect(sidebar2).to.have.attribute('inert');

    // Resize to bigger viewport
    await setViewportWidth(1600);
    await aTimeout(1);

    expect(sidebar1.opened).to.be.true;
    expect(sidebar2).not.to.have.attribute('inert');
  });
});
