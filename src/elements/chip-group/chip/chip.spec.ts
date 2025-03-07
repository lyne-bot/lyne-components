import { assert, expect } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, tabKey } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import { SbbChipElement } from './chip.js';

describe('sbb-chip', () => {
  let element: SbbChipElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-chip value="value"></sbb-chip>`);
    await waitForLitRender(element);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbChipElement);
  });

  it('should focus the chip label', async () => {
    element.focus();

    expect(document.activeElement!.localName).to.be.equal('sbb-chip');
    expect(element.shadowRoot!.activeElement).to.have.class('sbb-chip__label-wrapper');
  });

  it('should focus the chip label on click', async () => {
    element.click();

    expect(document.activeElement!.localName).to.be.equal('sbb-chip');
    expect(element.shadowRoot!.activeElement).to.have.class('sbb-chip__label-wrapper');

    await sendKeys({ press: tabKey }); // reset the focus
    await sendMouse({ type: 'click', position: [element.offsetTop + 10, element.offsetLeft + 10] });
    await waitForLitRender(element);

    expect(document.activeElement!.localName).to.be.equal('sbb-chip');
    expect(element.shadowRoot!.activeElement).to.have.class('sbb-chip__label-wrapper');
  });

  it('should ignore click when disabled', async () => {
    element.disabled = true;
    await waitForLitRender(element);
    element.click();

    expect(document.activeElement!.localName).not.to.be.equal('sbb-chip');
  });

  it('should focus on click when readonly', async () => {
    element.readonly = true;
    await waitForLitRender(element);
    element.click();

    expect(document.activeElement!.localName).to.be.equal('sbb-chip');
    expect(element.shadowRoot!.activeElement).to.have.class('sbb-chip__label-wrapper');
  });
});
