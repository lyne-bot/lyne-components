import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbBreadcrumbElement } from '../breadcrumb.js';

import { SbbBreadcrumbGroupElement } from './breadcrumb-group.js';

import '../breadcrumb.js';

describe(`sbb-breadcrumb-group`, () => {
  describe('without ellipsis', () => {
    let element: SbbBreadcrumbGroupElement;

    describe('with three breadcrumbs', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-breadcrumb-group>
            <sbb-breadcrumb href="#" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
            <sbb-breadcrumb href="#" id="breadcrumb-1">One</sbb-breadcrumb>
            <sbb-breadcrumb href="#" id="breadcrumb-2">Two</sbb-breadcrumb>
          </sbb-breadcrumb-group>
        `);
      });

      it('renders', async () => {
        assert.instanceOf(element, SbbBreadcrumbGroupElement);
      });

      it('keyboard navigation', async () => {
        const first: SbbBreadcrumbElement =
          element.querySelector<SbbBreadcrumbElement>('#breadcrumb-0')!;
        const second: SbbBreadcrumbElement =
          element.querySelector<SbbBreadcrumbElement>('#breadcrumb-1')!;
        const third: SbbBreadcrumbElement =
          element.querySelector<SbbBreadcrumbElement>('#breadcrumb-2')!;

        first.focus();
        await sendKeys({ press: 'ArrowRight' });
        expect(document.activeElement!.id).to.be.equal(second.id);
        await sendKeys({ press: 'ArrowRight' });
        expect(document.activeElement!.id).to.be.equal(third.id);
      });
    });

    describe('with two breadcrumns', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-breadcrumb-group>
            <sbb-breadcrumb href="#" id="breadcrumb-0">Level 0</sbb-breadcrumb>
            <sbb-breadcrumb href="#" id="breadcrumb-1">Level 1</sbb-breadcrumb>
          </sbb-breadcrumb-group>
        `);
      });

      it('should not collapse', async () => {
        await setViewport({ width: 80, height: 1000 });
        await waitForLitRender(element);
        // We need to ensure that the collapsed state is really rendered
        await aTimeout(20);

        const ellipsisButton = element.shadowRoot!.querySelector<HTMLButtonElement>(
          '#sbb-breadcrumb-ellipsis',
        )!;

        expect(ellipsisButton).to.be.null;
      });
    });
  });

  describe('with ellipsis', () => {
    let element: SbbBreadcrumbGroupElement;
    let ellipsisListItemElement: HTMLLIElement;
    let ellipsisButton: HTMLButtonElement;

    beforeEach(async () => {
      await setViewport({ width: 160, height: 320 });
      element = await fixture(html`
        <sbb-breadcrumb-group id="sbb-breadcrumb-group">
          <sbb-breadcrumb href="#" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-1">First</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-2">Second</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-3">Third</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-4">Fourth</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-5">Fifth</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-6">Sixth</sbb-breadcrumb>
        </sbb-breadcrumb-group>
      `);

      ellipsisListItemElement = element.shadowRoot!.querySelector<HTMLLIElement>(
        '#sbb-breadcrumb-group-ellipsis',
      )!;
      ellipsisButton = element.shadowRoot!.querySelector<HTMLButtonElement>(
        '#sbb-breadcrumb-ellipsis',
      )!;
    });

    it('renders', async () => {
      expect(ellipsisListItemElement).not.to.be.null;
      expect(ellipsisButton).not.to.be.null;

      // only three list items are displayed, and the middle one is the ellipsis button
      const li = element.shadowRoot!.querySelectorAll('li');
      expect(li).not.to.be.null;
      expect(li.length).to.be.equal(3);
      expect(li[1]).dom.to.be.equal(`
        <li class="sbb-breadcrumb-group__item" id="sbb-breadcrumb-group-ellipsis">
          <sbb-icon aria-hidden="true" class="sbb-breadcrumb-group__divider-icon" data-namespace="default" name="chevron-small-right-small" role="img"></sbb-icon>
          <button aria-expanded="false" aria-label="Show more breadcrumbs" id="sbb-breadcrumb-ellipsis" type="button">
            ...
          </button>
        </li>
      `);

      // only two slots are displayed, and the second is the last one
      const slots = element.shadowRoot!.querySelectorAll('li > slot');
      expect(slots.length).to.be.equal(2);
      expect(slots[0]).to.have.attribute('name', 'li-0');
      expect(slots[1]).to.have.attribute('name', 'li-6');
    });

    it('keyboard navigation with ellipsis', async () => {
      expect(ellipsisListItemElement).not.to.be.null;
      expect(ellipsisButton).not.to.be.null;
      const first: SbbBreadcrumbElement =
        element.querySelector<SbbBreadcrumbElement>('#breadcrumb-0')!;
      const last: SbbBreadcrumbElement =
        element.querySelector<SbbBreadcrumbElement>('#breadcrumb-6')!;

      first.focus();
      expect(document.activeElement!.id).to.be.equal(first.id);

      await sendKeys({ press: 'ArrowRight' });
      expect(document.activeElement!.id).to.be.equal(element.id);
      expect(element.shadowRoot!.activeElement!.id).to.be.equal(ellipsisButton.id);

      await sendKeys({ press: 'ArrowRight' });
      expect(document.activeElement!.id).to.be.equal(last.id);

      await sendKeys({ press: 'ArrowRight' });
      expect(document.activeElement!.id).to.be.equal(first.id);
    });

    it('expand breadcrumbs with ellipsis', async () => {
      expect(ellipsisListItemElement).not.to.be.null;
      expect(ellipsisButton).not.to.be.null;
      const changeSpy = new EventSpy('click', ellipsisButton);
      ellipsisButton.click();
      await waitForLitRender(ellipsisListItemElement);
      await changeSpy.calledOnce();

      ellipsisListItemElement = element.shadowRoot!.querySelector(
        '#sbb-breadcrumb-group-ellipsis',
      )!;
      ellipsisButton = element.shadowRoot!.querySelector('#sbb-breadcrumb-ellipsis')!;
      expect(ellipsisListItemElement).to.be.null;
      expect(ellipsisButton).to.be.null;
    });

    it('should expand breadcrumbs and focus correctly by keyboard', async () => {
      expect(ellipsisListItemElement).not.to.be.null;
      expect(ellipsisButton).not.to.be.null;
      // When pressing the space key on ellipsis button
      ellipsisButton.focus();
      await sendKeys({ press: 'Space' });
      await waitForLitRender(element);

      // Then focus should be on first breadcrumb
      expect(document.activeElement!.id).to.be.equal('breadcrumb-1');

      // When blurring the focus
      (document.activeElement as HTMLElement).blur();

      // Then the body should be focused
      expect(document.activeElement!.localName).to.be.equal('body');

      // When triggering a slotChange by removing a breadcrumb
      element.querySelector('#breadcrumb-6')!.remove();
      await waitForLitRender(element);

      // Then the body should still be focused
      expect(document.activeElement!.localName).to.be.equal('body');
    });

    it('should remove expand button when too less breadcrumbs available', async () => {
      expect(ellipsisListItemElement).not.to.be.null;
      expect(ellipsisButton).not.to.be.null;

      // Remove every breadcrumb from DOM except the first two
      Array.from(element.querySelectorAll('sbb-breadcrumb'))
        .slice(2)
        .forEach((el) => el.remove());

      await waitForLitRender(element);

      ellipsisListItemElement = element.shadowRoot!.querySelector(
        '#sbb-breadcrumb-group-ellipsis',
      )!;
      ellipsisButton = element.shadowRoot!.querySelector('#sbb-breadcrumb-ellipsis')!;
      expect(ellipsisListItemElement).to.be.null;
      expect(ellipsisButton).to.be.null;
    });
  });
});
