import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { setOrRemoveAttribute } from '../../core/dom.js';
import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbIconElement } from '../../icon.js';

import { SbbTrainWagonElement } from './train-wagon.js';

describe(`sbb-train-wagon`, () => {
  let element: SbbTrainWagonElement;

  async function extractAriaLabels(
    properties: Partial<
      Pick<
        SbbTrainWagonElement,
        | 'type'
        | 'occupancy'
        | 'sector'
        | 'blockedPassage'
        | 'wagonClass'
        | 'label'
        | 'additionalAccessibilityText'
      >
    >,
  ): Promise<string[]> {
    // attributes
    (
      [
        'type',
        'occupancy',
        'sector',
        'blockedPassage',
        'wagonClass',
        'label',
        'additionalAccessibilityText',
      ] as const
    ).forEach((attr) => {
      const defaultValueMap = new Map<string, string | null>();

      defaultValueMap.set('type', 'wagon');
      defaultValueMap.set('occupancy', null);
      defaultValueMap.set('sector', '');
      defaultValueMap.set('blockedPassage', 'none');
      defaultValueMap.set('wagonClass', null);
      defaultValueMap.set('label', '');
      defaultValueMap.set('additionalAccessibilityText', '');

      const attributeValue = properties[attr];
      // Convert camelCase to kebab-case
      const attributeName = attr.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
      );
      setOrRemoveAttribute(element, attributeName, attributeValue ?? defaultValueMap.get(attr));
    });

    await waitForLitRender(element);

    // Select all accessibility relevant text parts
    // The alternative of a11ySnapshot() does not work as the list title can't be extracted reliable.
    return Array.from(
      element.shadowRoot!.querySelectorAll(
        '[aria-label]:not(.sbb-train-wagon__attribute-icon-list), .sbb-screen-reader-only',
      ),
    ).map((entry) =>
      entry.hasAttribute('aria-label')
        ? entry.getAttribute('aria-label')!
        : entry.textContent!.replace(/\s+/g, ' ').trim(),
    );
  }

  it('renders', async () => {
    element = await fixture(html`<sbb-train-wagon></sbb-train-wagon>`);
    assert.instanceOf(element, SbbTrainWagonElement);
  });

  it('should emit sectorChange', async () => {
    element = await fixture(html`<sbb-train-wagon sector="A"></sbb-train-wagon>`);
    const sectorChangeSpy = new EventSpy(SbbTrainWagonElement.events.sectorChange);
    element.sector = 'B';

    await sectorChangeSpy.calledOnce();
    expect(sectorChangeSpy.count).to.be.greaterThan(0);
  });

  it('should change slot name when changing from multiple to single icon', async () => {
    element = await fixture(
      html`<sbb-train-wagon sector="A">
        <sbb-icon name="sa-rs"></sbb-icon>
        <sbb-icon name="sa-rs"></sbb-icon>
      </sbb-train-wagon>`,
    );

    Array.from(element.querySelectorAll('sbb-icon')).forEach((icon, index) => {
      expect(icon.getAttribute('slot')).to.equal(`li-${index}`);
    });

    // Remove one icon
    (element.querySelector('sbb-icon') as SbbIconElement).remove();
    await waitForLitRender(element);

    Array.from(element.querySelectorAll('sbb-icon')).forEach((icon, index) => {
      expect(icon.getAttribute('slot')).to.equal(`li-${index}`);
    });
  });

  it('should set aria labels correctly', async () => {
    element = await fixture(html`<sbb-train-wagon></sbb-train-wagon>`);

    expect(await extractAriaLabels({ type: 'wagon' })).to.be.eql(['Train coach']);
    expect(await extractAriaLabels({ type: 'locomotive' })).to.be.eql(['Locomotive']);
    expect(await extractAriaLabels({ type: 'sleeping' })).to.be.eql(['Sleeping car']);
    expect(await extractAriaLabels({ type: 'restaurant' })).to.be.eql(['Dining car']);

    expect(
      await extractAriaLabels({ type: 'closed', additionalAccessibilityText: `Don't enter` }),
    ).to.be.eql(['Closed train coach', `, Don't enter`]);
    expect(await extractAriaLabels({ type: 'wagon' })).to.be.eql(['Train coach']);

    expect(await extractAriaLabels({ sector: 'A', type: 'locomotive' })).to.be.eql([
      'Locomotive, Sector, A',
    ]);
    expect(await extractAriaLabels({ sector: 'A', type: 'closed' })).to.be.eql([
      'Closed train coach, Sector, A',
    ]);
    expect(await extractAriaLabels({ sector: 'A', type: 'wagon' })).to.be.eql([
      'Train coach, Sector, A',
    ]);

    expect(
      await extractAriaLabels({
        sector: 'A',
        type: 'wagon',
        label: '38',
        wagonClass: '1',
        occupancy: 'none',
        blockedPassage: 'previous',
      }),
    ).to.be.eql([
      'Train coach',
      'Sector, A',
      'Number, 38',
      'First Class',
      'No occupancy forecast available',
      'No passage to the previous train coach',
    ]);

    expect(await extractAriaLabels({ type: 'wagon', wagonClass: '2' })).to.be.eql([
      'Train coach',
      'Second Class',
    ]);

    expect(await extractAriaLabels({ type: 'wagon', occupancy: 'low' })).to.be.eql([
      'Train coach',
      'Low to medium occupancy expected',
    ]);
    expect(await extractAriaLabels({ type: 'wagon', occupancy: 'medium' })).to.be.eql([
      'Train coach',
      'High occupancy expected',
    ]);
    expect(await extractAriaLabels({ type: 'wagon', occupancy: 'high' })).to.be.eql([
      'Train coach',
      'Very high occupancy expected',
    ]);

    expect(await extractAriaLabels({ type: 'wagon', blockedPassage: 'next' })).to.be.eql([
      'Train coach',
      'No passage to the next train coach',
    ]);
    expect(await extractAriaLabels({ type: 'wagon', blockedPassage: 'both' })).to.be.eql([
      'Train coach',
      'No passage to the next and previous train coach',
    ]);
    expect(await extractAriaLabels({ type: 'wagon', blockedPassage: 'none' })).to.be.eql([
      'Train coach',
    ]);

    expect(await extractAriaLabels({ type: 'wagon-end-left' })).to.be.eql([
      'Train coach',
      'No passage to the previous train coach',
    ]);

    expect(await extractAriaLabels({ type: 'wagon-end-right' })).to.be.eql([
      'Train coach',
      'No passage to the next train coach',
    ]);

    expect(await extractAriaLabels({ type: 'wagon-end-right', blockedPassage: 'both' })).to.be.eql([
      'Train coach',
      'No passage to the next and previous train coach',
    ]);

    expect(await extractAriaLabels({ type: 'wagon-end-left', sector: 'A' })).to.be.eql([
      'Train coach',
      'Sector, A',
      'No passage to the previous train coach',
    ]);

    expect(await extractAriaLabels({ type: 'wagon-end-right', sector: 'A' })).to.be.eql([
      'Train coach',
      'Sector, A',
      'No passage to the next train coach',
    ]);

    expect(
      await extractAriaLabels({ type: 'wagon-end-right', blockedPassage: 'both', sector: 'A' }),
    ).to.be.eql(['Train coach', 'Sector, A', 'No passage to the next and previous train coach']);
  });
});
