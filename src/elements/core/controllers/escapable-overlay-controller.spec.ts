import { expect } from '@open-wc/testing';
import { html } from 'lit';

import type { SbbAutocompleteElement } from '../../autocomplete.js';
import type { SbbDialogElement } from '../../dialog.js';
import type { SbbMenuElement } from '../../menu.js';
import { fixture } from '../testing/private.js';

import '../../autocomplete.js';
import '../../dialog.js';
import '../../menu.js';

import { SbbEscapableOverlayController } from './escapable-overlay-controller.js';

import type { SbbOpenCloseBaseElement } from '@sbb-esta/lyne-elements/core/base-elements/open-close-base-element';

describe('SbbOverlayEscapeClosableController', () => {
  it('should correctly manage the stack', async () => {
    const overlayStack = new Array<SbbOpenCloseBaseElement>();
    const element = await fixture(html`
      <div>
        <sbb-dialog id="el-1"></sbb-dialog>
        <sbb-menu id="el-2"></sbb-menu>
        <sbb-autocomplete id="el-3"></sbb-autocomplete>
      </div>
    `);

    const elementOne: SbbDialogElement = element.querySelector('#el-1')!;
    const elementTwo: SbbMenuElement = element.querySelector('#el-2')!;
    const elementThree: SbbAutocompleteElement = element.querySelector('#el-3')!;

    const controllerOne = new SbbEscapableOverlayController(elementOne, overlayStack);
    const controllerTwo = new SbbEscapableOverlayController(elementTwo, overlayStack);
    const controllerThree = new SbbEscapableOverlayController(elementThree, overlayStack);

    controllerOne.connect();
    expect(overlayStack.length).to.equal(1);
    expect(overlayStack.at(-1)!.id).to.equal('el-1');
    controllerTwo.connect();
    expect(overlayStack.length).to.equal(2);
    expect(overlayStack.at(-1)!.id).to.equal('el-2');
    controllerOne.disconnect();
    expect(overlayStack.length).to.equal(1);
    expect(overlayStack.at(-1)!.id).to.equal('el-2');
    controllerThree.connect();
    expect(overlayStack.length).to.equal(2);
    expect(overlayStack.at(-1)!.id).to.equal('el-3');
    controllerThree.hostDisconnected();
    expect(overlayStack.length).to.equal(1);
    expect(overlayStack.at(-1)!.id).to.equal('el-2');
  });
});
