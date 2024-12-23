import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbFlipCardDetailsElement } from '../flip-card-details.js';
import type { SbbFlipCardSummaryElement } from '../flip-card-summary.js';

import { SbbFlipCardElement } from './flip-card.js';

import '../flip-card-summary.js';
import '../flip-card-details.js';
import '../../title.js';
import '../../link/link.js';

describe('sbb-flip-card', () => {
  let element: SbbFlipCardElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-flip-card>
        <sbb-flip-card-summary>
          <sbb-title>Card Title</sbb-title>
        </sbb-flip-card-summary>
        <sbb-flip-card-details>
          Some additional text. <sbb-link href="#">Link</sbb-link>
        </sbb-flip-card-details>
      </sbb-flip-card>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbFlipCardElement);
  });

  it('should toggle on click', async () => {
    const flipSpy = new EventSpy(SbbFlipCardElement.events.flip);
    const summary: SbbFlipCardSummaryElement = element.summary!;
    const details: SbbFlipCardDetailsElement = element.details!;

    expect(summary.inert).to.be.equal(false);
    expect(details.inert).to.be.equal(true);
    expect(element.isFlipped).to.be.false;

    element.shadowRoot?.querySelector('button')!.click();
    await waitForLitRender(element);

    await flipSpy.calledOnce();
    expect(flipSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-flipped');
    expect(element.isFlipped).to.be.true;

    expect(summary.inert).to.be.equal(true);
    expect(details.inert).to.be.equal(false);
  });

  it('should toggle on host click', async () => {
    const flipSpy = new EventSpy(SbbFlipCardElement.events.flip);
    const summary: SbbFlipCardSummaryElement = element.summary!;
    const details: SbbFlipCardDetailsElement = element.details!;

    expect(summary.inert).to.be.equal(false);
    expect(details.inert).to.be.equal(true);
    expect(element.isFlipped).to.be.false;

    element.click();
    await waitForLitRender(element);

    await flipSpy.calledOnce();
    expect(flipSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-flipped');
    expect(element.isFlipped).to.be.true;

    expect(summary.inert).to.be.equal(true);
    expect(details.inert).to.be.equal(false);
  });

  it('should toggle programmatically', async () => {
    const flipSpy = new EventSpy(SbbFlipCardElement.events.flip);
    const summary: SbbFlipCardSummaryElement = element.summary!;
    const details: SbbFlipCardDetailsElement = element.details!;

    expect(summary.inert).to.be.equal(false);
    expect(details.inert).to.be.equal(true);
    expect(element.isFlipped).to.be.false;

    element.toggle();
    await waitForLitRender(element);

    await flipSpy.calledOnce();
    expect(flipSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-flipped');
    expect(element.isFlipped).to.be.true;

    expect(summary.inert).to.be.equal(true);
    expect(details.inert).to.be.equal(false);
  });

  it('should set accessibility-label from summary', async () => {
    await waitForLitRender(element);

    expect(element.shadowRoot!.querySelector('sbb-screen-reader-only')!.textContent).to.be.equal(
      'Card Title, Click on this card for details',
    );
  });

  it('should prefer accessibility-label', async () => {
    element.accessibilityLabel = 'A11Y-Label';
    await waitForLitRender(element);

    expect(element.shadowRoot!.querySelector('sbb-screen-reader-only')!.textContent).to.be.equal(
      'A11Y-Label, Click on this card for details',
    );
  });

  it('should present closing accessibility-label', async () => {
    element.toggle();
    await waitForLitRender(element);

    expect(element.shadowRoot!.querySelector('sbb-screen-reader-only')!.textContent).to.be.equal(
      'Click on this card to go back to the summary',
    );
  });

  it('should not close on interactive element click', async () => {
    element.toggle();
    await waitForLitRender(element);

    element.querySelector('sbb-link')!.click();
    await waitForLitRender(element);

    expect(element.isFlipped).to.be.true;
  });
});
