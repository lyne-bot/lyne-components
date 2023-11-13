import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy, waitForLitRender } from '../core/testing';
import { __nameUpperCase__ } from './__noPrefixName__';

describe('__name__', () => {
  let element: __nameUpperCase__;

  beforeEach(async () => {
    element = await fixture(html`<__name__></__name__>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, __nameUpperCase__);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(__nameUpperCase__.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});
