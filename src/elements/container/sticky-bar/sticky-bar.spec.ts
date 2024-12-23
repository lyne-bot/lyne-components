import { assert, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';
import type { SbbContainerElement } from '../container.js';

import { SbbStickyBarElement } from './sticky-bar.js';

import '../container.js';

describe(`sbb-sticky-bar`, () => {
  let container: SbbContainerElement;
  let stickyBar: SbbStickyBarElement;
  let willStickSpy: EventSpy<CustomEvent>;
  let didStickSpy: EventSpy<CustomEvent>;
  let willUnstickSpy: EventSpy<CustomEvent>;
  let didUnstickSpy: EventSpy<CustomEvent>;

  const isSticking = (): boolean => stickyBar.hasAttribute('data-sticking');

  describe('sticky', () => {
    beforeEach(async () => {
      await setViewport({ width: 320, height: 500 });

      container = await fixture(html`
        <sbb-container>
          <div><p>Situation 1</p></div>
          <div><p>Situation 2</p></div>
          <div><p>Situation 3</p></div>
          <div><p>Situation 4</p></div>
          <div><p>Situation 5</p></div>
          <div><p>Situation 6</p></div>
          <div><p>Situation 7</p></div>
          <div><p>Situation 8</p></div>
          <div><p>Situation 9</p></div>
          <div><p>Situation 10</p></div>
          <div><p>Situation 11</p></div>
          <div><p>Situation 12</p></div>
          <sbb-sticky-bar></sbb-sticky-bar>
        </sbb-container>
      `);
      stickyBar = container.querySelector('sbb-sticky-bar')!;
      willStickSpy = new EventSpy(SbbStickyBarElement.events.willStick, stickyBar);
      didStickSpy = new EventSpy(SbbStickyBarElement.events.didStick, stickyBar);
      willUnstickSpy = new EventSpy(SbbStickyBarElement.events.willUnstick, stickyBar);
      didUnstickSpy = new EventSpy(SbbStickyBarElement.events.didUnstick, stickyBar);
    });

    it('renders', async () => {
      assert.instanceOf(stickyBar, SbbStickyBarElement);
    });

    it('stops sticking when scrolling to bottom', async () => {
      expect(isSticking()).to.equal(true);
      expect(stickyBar).to.have.attribute('data-slide-vertically');

      window.scrollTo(0, 400);

      await waitForCondition(async () => !isSticking());
      await waitForLitRender(container);

      expect(isSticking()).to.equal(false);
      expect(stickyBar).not.to.have.attribute('data-slide-vertically');
    });

    it('expands the sticky-bar when container is expanded', async () => {
      container.expanded = true;

      await waitForLitRender(container);

      expect(stickyBar).to.have.attribute('data-expanded');
    });

    it('gets unsticky when calling unstick()', async () => {
      stickyBar.unstick();

      await willUnstickSpy.calledOnce();
      await didUnstickSpy.calledOnce();

      expect(willUnstickSpy.count).to.be.equal(1);
      expect(didUnstickSpy.count).to.be.equal(1);
    });

    it('doesnt get unsticky when prevented', async () => {
      stickyBar.addEventListener(
        SbbStickyBarElement.events.willUnstick,
        (e) => e.preventDefault(),
        { once: true },
      );
      stickyBar.unstick();

      await willUnstickSpy.calledOnce();

      expect(stickyBar).to.have.attribute('data-state', 'sticky');
      expect(willUnstickSpy.count).to.be.equal(1);
      expect(didUnstickSpy.count).to.be.equal(0);
    });

    it('send events when sticky but not currently sticking and calling unstick()', async () => {
      window.scrollTo(0, 400);
      await waitForCondition(async () => !isSticking());

      stickyBar.unstick();

      await willUnstickSpy.calledOnce();
      await didUnstickSpy.calledOnce();

      expect(willUnstickSpy.count).to.be.equal(1);
      expect(didUnstickSpy.count).to.be.equal(1);
    });

    it('gets sticky when calling stick()', async () => {
      stickyBar.unstick();
      await didUnstickSpy.calledOnce();

      stickyBar.stick();

      await willStickSpy.calledOnce();
      await didStickSpy.calledOnce();

      expect(willStickSpy.count).to.be.equal(1);
      expect(didStickSpy.count).to.be.equal(1);
    });

    it('doesnt get sticky when prevented', async () => {
      stickyBar.unstick();
      await didUnstickSpy.calledOnce();

      stickyBar.addEventListener(SbbStickyBarElement.events.willStick, (e) => e.preventDefault(), {
        once: true,
      });
      stickyBar.stick();

      await willStickSpy.calledOnce();

      expect(stickyBar).to.have.attribute('data-state', 'unsticky');
      expect(willStickSpy.count).to.be.equal(1);
      expect(didStickSpy.count).to.be.equal(0);
    });

    it('works with non-zero animation duration', async () => {
      stickyBar.style.setProperty('--sbb-sticky-bar-slide-vertically-animation-duration', '1ms');

      stickyBar.unstick();
      await didUnstickSpy.calledOnce();

      stickyBar.stick();

      await willStickSpy.calledOnce();
      await didStickSpy.calledOnce();

      expect(willStickSpy.count).to.be.equal(1);
      expect(didStickSpy.count).to.be.equal(1);
    });
  });

  it('is settled when content is not long enough', async () => {
    await setViewport({ width: 320, height: 600 });
    container = await fixture(html`
      <sbb-container>
        <button>Container button</button>
        <sbb-sticky-bar>
          <button>Sticky bar button</button>
        </sbb-sticky-bar>
      </sbb-container>
    `);
    stickyBar = container.querySelector('sbb-sticky-bar')!;

    expect(isSticking()).to.equal(false);
  });

  it('renders with expanded layout', async () => {
    container = await fixture(html`
      <sbb-container expanded>
        <button>Container button</button>
        <sbb-sticky-bar>
          <button>Sticky bar button</button>
        </sbb-sticky-bar>
      </sbb-container>
    `);
    stickyBar = container.querySelector('sbb-sticky-bar')!;

    expect(stickyBar).to.have.attribute('data-expanded');
  });
});
