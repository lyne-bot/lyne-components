import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbBreadcrumbElement } from './breadcrumb.js';

describe(`sbb-breadcrumb`, () => {
  let element: SbbBreadcrumbElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-breadcrumb id="focus-id" href="#">Test</sbb-breadcrumb>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbBreadcrumbElement);
  });

  it('dispatches event on click', async () => {
    const changeSpy = new EventSpy('click');

    element.click();
    await changeSpy.calledOnce();
    expect(changeSpy.count).to.be.equal(1);
  });

  it('should receive focus', async () => {
    element.focus();
    await waitForLitRender(element);

    expect(document.activeElement!.id).to.be.equal('focus-id');
  });
});
