import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbTagElement } from '../tag.js';

import { SbbTagGroupElement } from './tag-group.js';

import '../tag.js';

describe(`sbb-tag-group`, () => {
  let element: SbbTagGroupElement;

  describe('multiple mode', () => {
    describe('no initialized checked tag', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('renders', async () => {
        assert.instanceOf(element, SbbTagGroupElement);
      });

      it('should have no default activated tag', async () => {
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(0);
        expect(element.value).to.be.an('array').that.is.empty;
      });

      it('should emit events and update value by checking manually', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        expect(tag1).not.to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(false);

        tag1.click();
        await waitForLitRender(element);

        expect(tag1).to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(true);
        await inputSpy.calledOnce();
        expect(inputSpy.count).to.be.equal(1);
        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);
        expect(element.value).to.be.eql(['tag1']);
      });

      it('should not emit events by setting checked programmatically [prop]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        tag1.checked = true;
        await waitForLitRender(element);

        expect(tag1).to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(true);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });

      it('should not emit events by setting checked programmatically [attribute]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        tag1.setAttribute('checked', 'true');
        await waitForLitRender(element);

        expect(tag1).to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(true);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });
    });

    describe('one initialized checked tag', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('should have one activated tag', async () => {
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(1);
        expect(element.value).to.be.eql(['tag2']);
      });

      it('should emit events and update value by unchecking manually', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        expect(tag2).to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(true);

        tag2.click();
        await waitForLitRender(element);

        expect(tag2).not.to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(false);
        await inputSpy.calledOnce();
        expect(inputSpy.count).to.be.equal(1);
        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);
        expect(element.value).to.be.an('array').that.is.empty;
      });

      it('should not emit events by setting checked programmatically [prop]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        tag2.checked = false;
        await waitForLitRender(element);

        expect(tag2).not.to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(false);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });

      it('should not emit events by setting checked programmatically [attribute]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        tag2.removeAttribute('checked');
        await waitForLitRender(element);

        expect(tag2).not.to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(false);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });
    });

    describe('initialization', () => {
      it('should read empty array as value [template attribute]', async () => {
        element = await fixture(html` <sbb-tag-group multiple value="[]"></sbb-tag-group> `);

        expect(element.value).to.be.an('array').that.is.empty;
      });

      it('should read array as value [template attribute]', async () => {
        element = await fixture(html`
          <sbb-tag-group multiple value='["tag1", "tag3"]'>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);

        expect(element.value).to.be.eql(['tag1', 'tag3']);
        expect(element.querySelector('sbb-tag#sbb-tag-1')).to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-2')).not.to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-3')).to.have.attribute('checked');
      });

      it('should read empty array as value [prop]', async () => {
        element = await fixture(html` <sbb-tag-group multiple></sbb-tag-group> `);
        element.value = [];
        await waitForLitRender(element);

        expect(element.value).to.be.an('array').that.is.empty;
      });

      it('should read array as value [prop]', async () => {
        element = await fixture(html`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        element.value = ['tag1', 'tag3'];
        await waitForLitRender(element);

        expect(element.value).to.be.eql(['tag1', 'tag3']);
        expect(element.querySelector('sbb-tag#sbb-tag-1')).to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-2')).not.to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-3')).to.have.attribute('checked');
      });

      it('should coerce non-array value to array value', async () => {
        element = await fixture(html`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        element.value = 'tag1';
        await waitForLitRender(element);

        expect(element.value).to.be.eql(['tag1']);
        expect(element.querySelector('sbb-tag#sbb-tag-1')).to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-2')).not.to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-3')).not.to.have.attribute('checked');
      });
    });

    describe('value change', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1" checked>Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3" checked>Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('should update group value if single value changes [prop]', async () => {
        expect(element.value).to.be.eql(['tag1', 'tag2', 'tag3']);
        const tag1 = element.querySelector('sbb-tag#sbb-tag-1') as SbbTagElement;

        tag1.value = 'new value';
        await waitForLitRender(element);

        expect(element.value).to.be.eql(['new value', 'tag2', 'tag3']);
      });

      it('should update group value if single value changes [attribute]', async () => {
        expect(element.value).to.be.eql(['tag1', 'tag2', 'tag3']);
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-1')!;

        tag1.setAttribute('value', 'new value');
        await waitForLitRender(element);

        expect(element.value).to.be.eql(['new value', 'tag2', 'tag3']);
      });
    });
  });

  describe('exclusive mode', () => {
    describe('no initialized checked tag', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('renders', async () => {
        assert.instanceOf(element, SbbTagGroupElement);
      });

      it('should have no default activated tag', async () => {
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(0);
        expect(element.value).to.be.equal(null);
      });

      it('should emit events and update value by checking manually', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        expect(tag1).not.to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(false);

        tag1.click();
        await waitForLitRender(element);

        expect(tag1).to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(true);
        await inputSpy.calledOnce();
        expect(inputSpy.count).to.be.equal(1);
        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);
        expect(element.value).to.be.equal('tag1');
      });

      it('should not emit events by setting checked programmatically [prop]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        tag1.checked = true;
        await waitForLitRender(element);

        expect(tag1).to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(true);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });

      it('should not emit events by setting checked programmatically [attribute]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        tag1.setAttribute('checked', 'true');
        await waitForLitRender(element);

        expect(tag1).to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(true);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });
    });

    describe('one initialized checked tag', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('should have one activated tag', async () => {
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(1);
        expect(element.value).to.be.equal('tag2');
      });

      it('should avoid unchecking manually', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        expect(tag2).to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(true);

        tag2.click();
        await waitForLitRender(element);

        expect(tag2).to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(true);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
        expect(element.value).to.be.equal('tag2');
      });

      it('should not emit events by setting checked programmatically to false [prop]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        tag2.checked = false;
        await waitForLitRender(element);

        expect(tag2).not.to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(false);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
        expect(element.value).to.be.equal(null);
      });

      it('should not emit events by setting checked programmatically to false [attribute]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        tag2.removeAttribute('checked');
        await waitForLitRender(element);

        expect(tag2).not.to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(false);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
        expect(element.value).to.be.equal(null);
      });

      it('should select another tag manually and uncheck others', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;
        const tag3 = element.querySelector('sbb-tag#sbb-tag-3') as SbbTagElement;

        tag3.click();
        await waitForLitRender(element);

        expect(tag3).to.have.attribute('checked');
        expect(tag3.checked).to.be.equal(true);

        expect(tag2).not.to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(false);

        await inputSpy.calledOnce();
        expect(inputSpy.count).to.be.equal(1);

        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);

        expect(element.value).to.be.equal('tag3');
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(1);
      });

      it('should select another tag (before) manually and uncheck others', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector('sbb-tag#sbb-tag-1') as SbbTagElement;
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        tag1.click();
        await waitForLitRender(element);

        expect(tag1).to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(true);

        expect(tag2).not.to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(false);

        await inputSpy.calledOnce();
        expect(inputSpy.count).to.be.equal(1);

        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);

        expect(element.value).to.be.equal('tag1');
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(1);
      });

      it('should select another tag programmatically and uncheck others', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;
        const tag3 = element.querySelector('sbb-tag#sbb-tag-3') as SbbTagElement;

        tag3.checked = true;
        await waitForLitRender(element);

        expect(tag3).to.have.attribute('checked');
        expect(tag3.checked).to.be.equal(true);

        expect(tag2).not.to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(false);

        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);

        expect(element.value).to.be.equal('tag3');
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(1);
      });
    });

    describe('initialization', () => {
      it('should read value [template attribute]', async () => {
        element = await fixture(html`
          <sbb-tag-group value="tag2">
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);

        expect(element.value).to.be.equal('tag2');
        expect(element.querySelector('sbb-tag#sbb-tag-1')).not.to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-2')).to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-3')).not.to.have.attribute('checked');
      });

      it('should read value [prop]', async () => {
        element = await fixture(html`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);

        element.value = 'tag2';
        await waitForLitRender(element);

        expect(element.value).to.be.equal('tag2');
        expect(element.querySelector('sbb-tag#sbb-tag-1')).not.to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-2')).to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-3')).not.to.have.attribute('checked');
      });

      it('should ignore because value is an array', async () => {
        element = await fixture(html` <sbb-tag-group></sbb-tag-group> `);
        element.value = [];
        await waitForLitRender(element);

        expect(element.value).to.be.null;
      });

      it('should ensure only first option selected', async () => {
        element = await fixture(html`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1" checked>Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(1);
        expect(element.value).to.be.equal('tag1');
      });
    });

    describe('value change', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1" checked>Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('should update group value if single value changes [prop]', async () => {
        expect(element.value).to.be.equal('tag1');

        const tag1 = element.querySelector('sbb-tag#sbb-tag-1') as SbbTagElement;
        tag1.value = 'new value';
        await waitForLitRender(element);

        expect(element.value).to.be.equal('new value');
      });

      it('should update group value if single value changes [attribute]', async () => {
        expect(element.value).to.be.equal('tag1');
        const tag1 = element.querySelector('sbb-tag#sbb-tag-1') as SbbTagElement;

        tag1.setAttribute('value', 'new value');
        await waitForLitRender(element);

        expect(element.value).to.be.equal('new value');
      });

      it('should reflect group value change [prop]', async () => {
        expect(element.value).to.be.equal('tag1');
        expect(element.querySelector('sbb-tag#sbb-tag-1')).to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-2')).not.to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-3')).not.to.have.attribute('checked');

        element.value = 'tag2';
        await waitForLitRender(element);

        expect(element.value).to.be.equal('tag2');
        expect(element.querySelector('sbb-tag#sbb-tag-1')).not.to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-2')).to.have.attribute('checked');
        expect(element.querySelector('sbb-tag#sbb-tag-3')).not.to.have.attribute('checked');
      });
    });
  });
});
