import { expect } from '@open-wc/testing';
import { a11ySnapshot } from '@web/test-runner-commands';
import type { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbButtonBaseElement } from '../base-elements.js';
import { fixture } from '../testing/private.js';
import { waitForLitRender } from '../testing.js';

import { SbbDisabledMixin, SbbDisabledTabIndexActionMixin } from './disabled-mixin.js';

/** Dummy docs */
@customElement('sbb-disabled-test')
class SbbDisabledTestElement extends SbbDisabledTabIndexActionMixin(
  SbbDisabledMixin(SbbButtonBaseElement),
) {
  public override renderTemplate(): TemplateResult {
    return html`Button`;
  }
}

describe(`disabled mixin`, () => {
  let element: SbbDisabledTestElement;

  async function getA11ySnapshot(): Promise<{ disabled: boolean }> {
    return (await a11ySnapshot({ selector: 'sbb-disabled-test' })) as unknown as {
      disabled: boolean;
    };
  }

  async function assertDisabled(element: SbbDisabledTestElement): Promise<void> {
    expect(element.tabIndex).to.be.equal(-1);
    expect(element).not.to.have.attribute('tabindex');
    expect((await getA11ySnapshot()).disabled).to.be.true;
  }

  async function assertEnabled(element: SbbDisabledTestElement): Promise<void> {
    expect(element.tabIndex).to.be.equal(0);
    expect(element).to.have.attribute('tabindex', '0');
    expect((await getA11ySnapshot()).disabled).to.be.undefined;
  }

  async function assertDisabledInteractive(element: SbbDisabledTestElement): Promise<void> {
    expect(element.tabIndex).to.be.equal(0);
    expect(element).to.have.attribute('tabindex', '0');
    expect((await getA11ySnapshot()).disabled).to.be.true;
  }

  describe('disabled initially', () => {
    it('should set attributes', async () => {
      element = await fixture(
        html`<sbb-disabled-test disabled>I am a test button</sbb-disabled-test>`,
      );
      await assertDisabled(element);
    });
  });

  describe('disabled', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-disabled-test>I am a test button</sbb-disabled-test>`);
    });

    it('should set attributes when enabled', async () => {
      await assertEnabled(element);
    });

    it('should update attributes on attribute change', async () => {
      element.setAttribute('disabled', 'true');
      await waitForLitRender(element);

      await assertDisabled(element);

      element.removeAttribute('disabled');
      await waitForLitRender(element);

      await assertEnabled(element);
    });

    it('should update attributes on property change', async () => {
      element.disabled = true;
      await waitForLitRender(element);

      await assertDisabled(element);

      element.disabled = false;
      await waitForLitRender(element);

      await assertEnabled(element);
    });

    it('should ignore disabledInteractive when disabled', async () => {
      element.disabled = true;
      element.disabledInteractive = true;
      await waitForLitRender(element);

      await assertDisabled(element);
    });
  });

  describe('disabled interactive initially', () => {
    it('should set attributes when disabled initially', async () => {
      element = await fixture(
        html`<sbb-disabled-test disabled-interactive>I am a test button</sbb-disabled-test>`,
      );

      await assertDisabledInteractive(element);
    });
  });

  describe('disabled interactive', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-disabled-test>I am a test button</sbb-disabled-test>`);
    });

    it('should update attributes on attribute change', async () => {
      element.setAttribute('disabled-interactive', 'true');
      await waitForLitRender(element);

      await assertDisabledInteractive(element);

      element.removeAttribute('disabled-interactive');
      await waitForLitRender(element);

      await assertEnabled(element);
    });

    it('should update attributes on property change', async () => {
      element.disabledInteractive = true;
      await waitForLitRender(element);

      await assertDisabledInteractive(element);

      element.disabledInteractive = false;
      await waitForLitRender(element);

      await assertEnabled(element);
    });
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-disabled-test': SbbDisabledTestElement;
  }
}
