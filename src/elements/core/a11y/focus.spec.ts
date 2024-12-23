import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';

import { fixture, tabKey } from '../testing/private.js';

import { getFirstFocusableElement, getFocusableElements, SbbFocusHandler } from './focus.js';

describe('focus', () => {
  describe(`getFocusables`, () => {
    let lightDOM: HTMLElement, shadowDOM: HTMLElement;

    customElements.define(
      'my-custom-element',
      class extends HTMLElement {
        public constructor() {
          super();
          const shadowRoot = this.attachShadow({ mode: 'open' });
          shadowRoot.innerHTML = `<div><button id="shadow-button">Button</button><slot></slot></div>`;
        }
      },
    );

    beforeEach(async () => {
      await customElements.whenDefined('my-custom-element');
      lightDOM = await fixture(html`
        <div>
          <span tabindex="0" id="custom-button">Button</span>
          <span tabindex="0" id="custom-link">Link</span>
          <div>
            <input id="input" />
            <button style="visibility: hidden" id="hidden-button">Button</button>
          </div>
        </div>
      `);

      shadowDOM = await fixture(html` <my-custom-element></my-custom-element> `);
    });

    it('should retrieve focusable elements', () => {
      const elements = getFocusableElements([lightDOM, shadowDOM]);

      expect(elements.map((el) => el.id)).to.deep.equal([
        'custom-button',
        'custom-link',
        'input',
        'shadow-button',
      ]);
    });

    it('should retrieve focusable elements including invisible ones', () => {
      const elements = getFocusableElements([lightDOM, shadowDOM], {
        includeInvisibleElements: true,
      });

      expect(elements.map((el) => el.id)).to.deep.equal([
        'custom-button',
        'custom-link',
        'input',
        'hidden-button',
        'shadow-button',
      ]);
    });

    it('should retrieve filtered focusable elements', () => {
      const elements = getFocusableElements([lightDOM, shadowDOM], {
        filter: (el) => el.localName === 'div' || el.id === 'custom-link',
      });

      expect(elements.map((el) => el.id)).to.deep.equal(['custom-link']);
    });

    it('should prefer slotted over shadow DOM', () => {
      shadowDOM.innerHTML = '<button id="slotted-button">Button</button>';

      const elements = getFocusableElements([shadowDOM]);

      expect(elements.map((el) => el.id)).to.deep.equal(['slotted-button']);
    });

    it('should retrieve first focusable element', () => {
      const element = getFirstFocusableElement([lightDOM, shadowDOM]);

      expect(element!.id).to.equal('custom-button');
    });
  });

  describe(`focus trap`, () => {
    let element: HTMLElement;

    customElements.define(
      'my-container-element',
      class extends HTMLElement {
        public constructor() {
          super();
          const shadowRoot = this.attachShadow({ mode: 'open' });
          shadowRoot.innerHTML = `
          <span tabindex="0" id="custom-button">Button</span>
          <span tabindex="0" id="custom-link">Link</span>
          <div>
            <input id="input" />
            <button style="visibility: hidden" id="hidden-button">Button</button>
          </div>
          <slot></slot>
          <button id="disabled-button" disabled>Disabled button</button>
          <span id="disabled-interactive-button" disabled-interactive tabindex="0">Disabled interactive button</span>
          <span id="inert-button" tabindex="0" inert>Inert button</span>
      `;
        }
      },
    );

    beforeEach(async () => {
      await customElements.whenDefined('my-container-element');
      element = await fixture(html`
        <my-container-element><button id="slotted-button">Button</button></my-container-element>
      `);
    });

    it('should focus next element', async () => {
      const focusHandler = new SbbFocusHandler();
      focusHandler.trap(element);

      element.shadowRoot!.querySelector<HTMLElement>('#custom-button')!.focus();
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-button');

      await sendKeys({ press: tabKey });
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-link');

      await sendKeys({ press: tabKey });
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');

      await sendKeys({ press: tabKey });
      expect(document.activeElement!.id).to.equal('slotted-button');

      await sendKeys({ press: tabKey });
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal(
        'disabled-interactive-button',
      );

      // Wrap around
      await sendKeys({ press: tabKey });
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-button');
    });

    it('should focus next element with filter', async () => {
      const focusHandler = new SbbFocusHandler();
      focusHandler.trap(element, {
        filter: (el) => ['div', 'input'].includes(el.localName),
      });

      element.shadowRoot!.querySelector('input')!.focus();
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');

      await sendKeys({ press: tabKey });
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');
    });

    it('should focus next element with post filter', async () => {
      const focusHandler = new SbbFocusHandler();
      focusHandler.trap(element, {
        postFilter: (el) => ['custom-button', 'custom-link'].includes(el.id),
      });

      element.shadowRoot!.querySelector<HTMLElement>('#custom-button')!.focus();
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-button');

      await sendKeys({ press: tabKey });
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-link');

      await sendKeys({ press: tabKey });
      expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-button');
    });
  });
});
