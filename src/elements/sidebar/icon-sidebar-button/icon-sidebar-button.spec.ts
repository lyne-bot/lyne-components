import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbIconSidebarButtonElement } from './icon-sidebar-button.js';

describe(`sbb-icon-sidebar-button`, () => {
  let element: SbbIconSidebarButtonElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-icon-sidebar-button
        id="focus-id"
        icon-name="glass-cocktail-small"
      ></sbb-icon-sidebar-button>`,
    );

    assert.instanceOf(element, SbbIconSidebarButtonElement);
  });

  describe('events', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-icon-sidebar-button
          id="focus-id"
          icon-name="glass-cocktail-small"
        ></sbb-icon-sidebar-button>`,
      );
    });

    it('dispatches event on click', async () => {
      const clickSpy = new EventSpy('click');

      element.click();
      await clickSpy.calledOnce();
      expect(clickSpy.count).to.be.equal(1);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const clickSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Space', async () => {
      const clickSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: ' ' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement!.id).to.be.equal('focus-id');
    });
  });
});
