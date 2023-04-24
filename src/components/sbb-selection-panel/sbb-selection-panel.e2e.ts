import events from './sbb-selection-panel.events';
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-selection-panel', () => {
  let element: E2EElement, page: E2EPage;

  const getPageContent = (inputType: string): string => {
    return `
    <sbb-${inputType}-group name="input-group-name" ${
      inputType === 'radio-button' && 'value="Value one"'
    }>
      <sbb-selection-panel id="sbb-selection-panel-1">
        <sbb-${inputType} id="sbb-input-1" value="Value one" ${
      inputType === 'checkbox' && 'checked'
    }>Value one</sbb-${inputType}>
        <div id="panel-content-1" slot="content">
          Inner Content
          <sbb-link>Link</sbb-link>
        </div>
      </sbb-selection-panel>

      <sbb-selection-panel id="sbb-selection-panel-2">
        <sbb-${inputType} id="sbb-input-2" value="Value two">Value two</sbb-${inputType}>
        <div id="panel-content-2" slot="content">
          Inner Content
          <sbb-link>Link</sbb-link>
        </div>
      </sbb-selection-panel>

      <sbb-selection-panel id="sbb-selection-panel-3">
        <sbb-${inputType} id="sbb-input-3" value="Value three" disabled>Value three</sbb-${inputType}>
        <div id="panel-content-3" slot="content">
          Inner Content
          <sbb-link>Link</sbb-link>
        </div>
      </sbb-selection-panel>

      <sbb-selection-panel id="sbb-selection-panel-4">
        <sbb-${inputType} id="sbb-input-4" value="Value four">Value four</sbb-${inputType}>
        <div id="panel-content-4" slot="content">
          Inner Content
          <sbb-link>Link</sbb-link>
        </div>
      </sbb-selection-panel>
    </sbb-${inputType}-group>`;
  };

  describe('with radio buttons', () => {
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(getPageContent('radio-button'));
      element = await page.find('sbb-radio-button-group');
    });

    it('renders', () => {
      expect(element).toHaveClass('hydrated');
    });

    it('selects input on click and shows related content', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const input = await page.find('sbb-selection-panel > #sbb-input-2');
      const content = await page.find('#sbb-selection-panel-2 >>> .sbb-selection-panel__content');

      const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
      const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
      const willClose = await page.spyOnEvent(events.willClose);
      const didClose = await page.spyOnEvent(events.didClose);

      expect(firstInput).toHaveAttribute('checked');
      expect(content).not.toHaveAttribute('data-expanded');

      await input.click();

      await page.waitForChanges();
      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy).toHaveReceivedEventTimes(1);

      await page.waitForChanges();
      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy).toHaveReceivedEventTimes(1);

      await waitForCondition(() => willClose.events.length === 1);
      expect(willClose).toHaveReceivedEventTimes(1);
      await page.waitForChanges();

      await waitForCondition(() => didClose.events.length === 1);
      expect(didClose).toHaveReceivedEventTimes(1);
      await page.waitForChanges();

      expect(input).toHaveAttribute('checked');
      expect(content).toHaveAttribute('data-expanded');
      expect(firstInput).not.toHaveAttribute('checked');
    });

    it('always displays related content with forceOpen', async () => {
      const selectionPanel = await page.find('#sbb-selection-panel-1');
      selectionPanel.setProperty('forceOpen', true);

      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const input = await page.find('sbb-selection-panel > #sbb-input-2');
      const contentOne = await page.find(
        '#sbb-selection-panel-1 >>> .sbb-selection-panel__content'
      );

      expect(firstInput).toHaveAttribute('checked');
      expect(contentOne).toHaveAttribute('data-expanded');

      await input.click();

      expect(input).toHaveAttribute('checked');
      expect(contentOne).toHaveAttribute('data-expanded');
      expect(firstInput).not.toHaveAttribute('checked');
    });

    it('dispatches event on input change', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const checkedInput = await page.find('sbb-selection-panel > #sbb-input-2');
      const changeSpy = await page.spyOnEvent('change');
      const inputSpy = await page.spyOnEvent('input');

      await checkedInput.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(inputSpy).toHaveReceivedEventTimes(1);

      await firstInput.click();
      expect(firstInput).toHaveAttribute('checked');
    });

    it('does not select disabled input on click', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const disabledInput = await page.find('sbb-selection-panel > #sbb-input-3');

      await disabledInput.click();
      await page.waitForChanges();

      expect(disabledInput).not.toHaveAttribute('checked');
      expect(firstInput).toHaveAttribute('checked');
    });

    it('preserves input button disabled state after being disabled from group', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const secondInput = await page.find('sbb-selection-panel > #sbb-input-2');
      const disabledInput = await page.find('sbb-selection-panel > #sbb-input-3');

      element.setProperty('disabled', true);
      await page.waitForChanges();

      await disabledInput.click();
      await page.waitForChanges();
      expect(disabledInput).not.toHaveAttribute('checked');
      expect(firstInput).toHaveAttribute('checked');

      await secondInput.click();
      await page.waitForChanges();
      expect(secondInput).not.toHaveAttribute('checked');

      element.setProperty('disabled', false);
      await page.waitForChanges();

      await disabledInput.click();
      await page.waitForChanges();
      expect(disabledInput).not.toHaveAttribute('checked');
      expect(firstInput).toHaveAttribute('checked');
    });

    it('focuses input on left arrow key pressed and selects it on space key pressed', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');

      await firstInput.click();
      await page.keyboard.down('ArrowLeft');

      await page.waitForChanges();
      const input = (await page.find('sbb-selection-panel > #sbb-input-4')) as unknown as Element;

      const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
      const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
      const willClose = await page.spyOnEvent(events.willClose);
      const didClose = await page.spyOnEvent(events.didClose);

      expect(await page.evaluate(() => document.activeElement.id)).toBe(input.id);
      expect(input).not.toHaveAttribute('checked');

      await element.press(' ');

      await page.waitForChanges();
      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy).toHaveReceivedEventTimes(1);

      await page.waitForChanges();
      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy).toHaveReceivedEventTimes(1);

      await waitForCondition(() => willClose.events.length === 1);
      expect(willClose).toHaveReceivedEventTimes(1);
      await page.waitForChanges();

      await waitForCondition(() => didClose.events.length === 1);
      expect(didClose).toHaveReceivedEventTimes(1);
      await page.waitForChanges();

      expect(input).toHaveAttribute('checked');
      expect(firstInput).not.toHaveAttribute('checked');
    });

    it('focuses input on right arrow key pressed and selects it on space key pressed', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');

      await firstInput.click();
      await page.keyboard.down('ArrowRight');

      await page.waitForChanges();
      const input = await page.find('sbb-selection-panel > #sbb-input-2');

      const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
      const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
      const willClose = await page.spyOnEvent(events.willClose);
      const didClose = await page.spyOnEvent(events.didClose);

      expect(await page.evaluate(() => document.activeElement.id)).toBe(input.id);
      expect(input).not.toHaveAttribute('checked');

      await element.press(' ');

      await page.waitForChanges();
      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy).toHaveReceivedEventTimes(1);

      await page.waitForChanges();
      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy).toHaveReceivedEventTimes(1);

      await waitForCondition(() => willClose.events.length === 1);
      expect(willClose).toHaveReceivedEventTimes(1);
      await page.waitForChanges();

      await waitForCondition(() => didClose.events.length === 1);
      expect(didClose).toHaveReceivedEventTimes(1);
      await page.waitForChanges();

      expect(input).toHaveAttribute('checked');
      expect(firstInput).not.toHaveAttribute('checked');
    });

    it('wraps around on arrow key navigation', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const checkedInput = await page.find('sbb-selection-panel > #sbb-input-2');

      await checkedInput.click();
      await page.waitForChanges();
      expect(checkedInput).toHaveAttribute('checked');

      await page.keyboard.down('ArrowRight');
      await page.keyboard.down('ArrowRight');
      await page.waitForChanges();

      expect(await page.evaluate(() => document.activeElement.id)).toBe(firstInput.id);
    });
  });

  describe('with checkboxes', () => {
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(getPageContent('checkbox'));
      element = await page.find('sbb-checkbox-group');
    });

    it('renders', () => {
      expect(element).toHaveClass('hydrated');
    });

    it('selects input on click and shows related content', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const input = await page.find('sbb-selection-panel > #sbb-input-2');
      const content = await page.find('#sbb-selection-panel-2 >>> .sbb-selection-panel__content');

      const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
      const didOpenEventSpy = await page.spyOnEvent(events.didOpen);

      expect(firstInput).toHaveAttribute('checked');
      expect(content).not.toHaveAttribute('data-expanded');

      await input.click();

      await page.waitForChanges();
      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy).toHaveReceivedEventTimes(1);

      await page.waitForChanges();
      await waitForCondition(() => didOpenEventSpy.events.length === 2);
      expect(didOpenEventSpy).toHaveReceivedEventTimes(2);

      expect(input).toHaveAttribute('checked');
      expect(content).toHaveAttribute('data-expanded');
    });

    it('deselects input on click and hides related content', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const content = await page.find('#sbb-selection-panel-1 >>> .sbb-selection-panel__content');

      const willCloseEventSpy = await page.spyOnEvent(events.willClose);
      const didCloseEventSpy = await page.spyOnEvent(events.didClose);

      expect(firstInput).toHaveAttribute('checked');
      expect(content).toHaveAttribute('data-expanded');

      await firstInput.click();

      await page.waitForChanges();
      await waitForCondition(() => willCloseEventSpy.events.length === 1);
      expect(willCloseEventSpy).toHaveReceivedEventTimes(1);

      await page.waitForChanges();
      await waitForCondition(() => didCloseEventSpy.events.length === 1);
      expect(didCloseEventSpy).toHaveReceivedEventTimes(1);

      expect(firstInput).not.toHaveAttribute('checked');
      expect(content).not.toHaveAttribute('data-expanded');
    });

    it('always displays related content with forceOpen', async () => {
      const selectionPanel = await page.find('#sbb-selection-panel-1');
      selectionPanel.setProperty('forceOpen', true);

      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const input = await page.find('sbb-selection-panel > #sbb-input-2');
      const contentOne = await page.find(
        '#sbb-selection-panel-1 >>> .sbb-selection-panel__content'
      );

      expect(firstInput).toHaveAttribute('checked');
      expect(contentOne).toHaveAttribute('data-expanded');

      await input.click();

      expect(input).toHaveAttribute('checked');
      expect(contentOne).toHaveAttribute('data-expanded');
    });

    it('dispatches event on input change', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const changeSpy = await page.spyOnEvent('change');
      const inputSpy = await page.spyOnEvent('input');

      await firstInput.click();

      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(inputSpy).toHaveReceivedEventTimes(1);
      expect(firstInput).not.toHaveAttribute('checked');
    });

    it('does not select disabled input on click', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const disabledInput = await page.find('sbb-selection-panel > #sbb-input-3');

      await disabledInput.click();
      await page.waitForChanges();

      expect(disabledInput).not.toHaveAttribute('checked');
      expect(firstInput).toHaveAttribute('checked');
    });

    it('preserves input button disabled state after being disabled from group', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const secondInput = await page.find('sbb-selection-panel > #sbb-input-2');
      const disabledInput = await page.find('sbb-selection-panel > #sbb-input-3');

      element.setProperty('disabled', true);
      await page.waitForChanges();

      await disabledInput.click();
      await page.waitForChanges();
      expect(disabledInput).not.toHaveAttribute('checked');
      expect(firstInput).toHaveAttribute('checked');

      await secondInput.click();
      await page.waitForChanges();
      expect(secondInput).not.toHaveAttribute('checked');

      element.setProperty('disabled', false);
      await page.waitForChanges();

      await disabledInput.click();
      await page.waitForChanges();
      expect(disabledInput).not.toHaveAttribute('checked');
      expect(firstInput).toHaveAttribute('checked');
    });

    it('focuses input on left arrow key pressed and selects it on space key pressed', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');

      const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
      const didOpenEventSpy = await page.spyOnEvent(events.didOpen);

      await firstInput.click();
      await page.keyboard.down('ArrowLeft');

      await page.waitForChanges();
      const input = (await page.find('sbb-selection-panel > #sbb-input-4')) as unknown as Element;

      expect(await page.evaluate(() => document.activeElement.id)).toBe(input.id);
      expect(input).not.toHaveAttribute('checked');

      await element.press(' ');

      await page.waitForChanges();
      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy).toHaveReceivedEventTimes(1);

      await page.waitForChanges();
      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy).toHaveReceivedEventTimes(1);

      expect(input).toHaveAttribute('checked');
    });

    it('focuses input on right arrow key pressed and selects it on space key pressed', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');

      const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
      const didOpenEventSpy = await page.spyOnEvent(events.didOpen);

      await firstInput.click();
      await page.keyboard.down('ArrowRight');

      await page.waitForChanges();
      const input = await page.find('sbb-selection-panel > #sbb-input-2');

      expect(await page.evaluate(() => document.activeElement.id)).toBe(input.id);
      expect(input).not.toHaveAttribute('checked');

      await element.press(' ');

      await page.waitForChanges();
      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy).toHaveReceivedEventTimes(1);

      await page.waitForChanges();
      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy).toHaveReceivedEventTimes(1);

      expect(input).toHaveAttribute('checked');
    });

    it('wraps around on arrow key navigation', async () => {
      const firstInput = await page.find('sbb-selection-panel > #sbb-input-1');
      const checkedInput = await page.find('sbb-selection-panel > #sbb-input-2');

      await checkedInput.click();
      await page.waitForChanges();
      expect(checkedInput).toHaveAttribute('checked');

      await page.keyboard.down('ArrowRight');
      await page.keyboard.down('ArrowRight');
      await page.waitForChanges();

      expect(await page.evaluate(() => document.activeElement.id)).toBe(firstInput.id);
    });
  });
});
