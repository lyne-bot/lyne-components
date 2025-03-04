import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import type { SbbSidebarElement } from '../sidebar.js';

import { SbbIconSidebarContainerElement } from './icon-sidebar-container.js';

import '../../sidebar.js';

describe('sbb-icon-sidebar-container', () => {
  let element: SbbIconSidebarContainerElement,
    sidebar1: SbbSidebarElement,
    sidebar2: SbbSidebarElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-icon-sidebar-container>
        <sbb-icon-sidebar id="s1">Sidebar 1 start</sbb-icon-sidebar>
        <sbb-icon-sidebar-content>Content</sbb-icon-sidebar-content>
        <sbb-icon-sidebar id="s2">Sidebar 2 end</sbb-icon-sidebar>
      </sbb-icon-sidebar-container>`,
    );

    sidebar1 = element.querySelector('#s1')!;
    sidebar2 = element.querySelector('#s2')!;
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbIconSidebarContainerElement);
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
});
