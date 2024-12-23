import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbNavigationLinkElement } from './navigation-link.js';

describe(`sbb-navigation-link`, () => {
  let element: SbbNavigationLinkElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-navigation-link href="#" id="focus-id">Navigation Action</sbb-navigation-link>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbNavigationLinkElement);
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      const changeSpy = new EventSpy('click');
      element.click();
      await changeSpy.calledOnce();
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const changeSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(changeSpy.count).to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Space', async () => {
      const changeSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: ' ' });
      expect(changeSpy.count).not.to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      element.focus();
      await waitForLitRender(element);
      expect(document.activeElement!.id).to.be.equal('focus-id');
    });
  });
});
