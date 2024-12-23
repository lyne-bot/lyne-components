import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbCardElement } from '../card.js';

import type { SbbCardLinkElement } from './card-link.js';

import '../card.js';
import './card-link.js';

describe(`sbb-card-link`, () => {
  let element: SbbCardElement;

  it('should render an sbb-card-link as a link opening in a new window', async () => {
    element = await fixture(html`
      <sbb-card>
        <sbb-card-link href="https://github.com/sbb-design-systems/lyne-components" target="_blank"
          >Follow me</sbb-card-link
        >
        Content text
      </sbb-card>
    `);

    expect(element).to.have.attribute('data-has-action');
    expect(element).not.to.have.attribute('data-has-active-action');
    expect(element).to.have.attribute('data-action-role', 'link');
  });

  it('should correctly toggle active state', async () => {
    element = await fixture(
      html`<sbb-card><sbb-card-link href="#">Click me</sbb-card-link>Content</sbb-card>`,
    );
    expect(element).not.to.have.attribute('data-has-active-action');

    element.querySelector<SbbCardLinkElement>('sbb-card-link')!.toggleAttribute('active', true);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-has-active-action');
  });

  it('should remove data properties from host', async () => {
    element = await fixture(
      html`<sbb-card
        ><sbb-card-link active href="#">Click me</sbb-card-link
        ><span><button>Content</button></span></sbb-card
      >`,
    );

    expect(element).to.have.attribute('data-has-action');
    expect(element).to.have.attribute('data-has-active-action');
    expect(element).to.have.attribute('data-action-role', 'link');

    // Remove action from DOM
    element.querySelector<SbbCardLinkElement>('sbb-card-link')!.remove();
    await waitForLitRender(element);

    expect(element).not.to.have.attribute('data-has-action');
    expect(element).not.to.have.attribute('data-has-active-action');
    expect(element).not.to.have.attribute('data-action-role', 'button');
  });

  it('should detect added link in slotted content to update focusable elements', async () => {
    element = await fixture(
      html` <sbb-card>
        <sbb-card-link href="#">Click me</sbb-card-link>
        <span id="content">
          <button>Content</button>
        </span>
      </sbb-card>`,
    );
    expect(element.querySelector('button')).to.have.attribute('data-card-focusable');

    // Add a second button in content
    element
      .querySelector('#content')!
      .insertBefore(document.createElement('button'), element.querySelector('button'));

    // Both buttons should be marked as focusable
    await waitForLitRender(element);
    const buttons = element.querySelectorAll('button');
    expect(buttons.length).to.be.equal(2);
    expect(
      Array.from(buttons).every((el) => el.getAttribute('data-card-focusable') !== null),
    ).to.be.equal(true);

    // Remove all buttons
    buttons.forEach((el) => el.remove());
    await waitForLitRender(element);

    // Card should not have marker anymore
    expect(element.querySelectorAll('button').length).to.be.equal(0);
  });

  it('should detect added second element of slot to update focusable elements', async () => {
    element = await fixture(
      html` <sbb-card>
        <sbb-card-link href="#">Click me</sbb-card-link>
        <span id="content"></span>
      </sbb-card>`,
    );

    // Add a button to slot
    element.insertBefore(document.createElement('button'), element.querySelector('#content'));
    await waitForLitRender(element);

    // Button should be marked as focusable
    expect(element.querySelector('button')).to.have.attribute('data-card-focusable');
  });

  it('should detect focusable elements when action was added at later point', async () => {
    element = await fixture(
      html` <sbb-card>
        <span id="content">
          <button></button>
        </span>
      </sbb-card>`,
    );

    // Add a sbb-card-link
    const link = document.createElement('sbb-card-link');
    link.setAttribute('href', '#');
    element.appendChild(link);
    await waitForLitRender(element);

    // Button should be marked as focusable
    expect(element.querySelector('button')).to.have.attribute('data-card-focusable');
  });

  describe('events', () => {
    let action: SbbCardLinkElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-card>
          <sbb-card-link id="focus-id" href="#">Card</sbb-card-link>
          Content
        </sbb-card>
      `);
      action = element.querySelector<SbbCardLinkElement>('sbb-card-link')!;
    });

    it('dispatches event on click', async () => {
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');

      action.click();

      await clickSpy.calledOnce();
      expect(clickSpy.count).to.be.equal(1);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const clickSpy = new EventSpy('click');
      action.focus();
      await sendKeys({ press: 'Enter' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Space', async () => {
      const clickSpy = new EventSpy('click');
      action.focus();
      await sendKeys({ press: ' ' });
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      action.focus();
      await waitForLitRender(element);

      expect(document.activeElement!.id).to.be.equal('focus-id');
    });
  });
});
