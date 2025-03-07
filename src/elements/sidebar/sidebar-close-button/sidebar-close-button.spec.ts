import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { i18nCloseNavigation } from '../../core/i18n.js';
import { fixture } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import { SbbSidebarCloseButtonElement } from './sidebar-close-button.js';

describe('sbb-sidebar-close-button', () => {
  let element: SbbSidebarCloseButtonElement;

  beforeEach(async () => {
    document.documentElement.removeAttribute('lang');

    element = await fixture(html`<sbb-sidebar-close-button></sbb-sidebar-close-button>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSidebarCloseButtonElement);
  });

  it('should update the aria-label when language changes', async () => {
    expect(element).to.have.attribute('aria-label', i18nCloseNavigation['en']);

    document.documentElement.setAttribute('lang', 'de');
    await waitForLitRender(element);

    expect(element).to.have.attribute('aria-label', i18nCloseNavigation['de']);
  });

  it('should not update the aria-label when language changes and aria-label is customized', async () => {
    element.setAttribute('aria-label', 'Close this thing');

    document.documentElement.setAttribute('lang', 'de');
    await waitForLitRender(element);

    expect(element).to.have.attribute('aria-label', 'Close this thing');
  });
});
