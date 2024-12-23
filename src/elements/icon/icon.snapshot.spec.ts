import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { mergeConfig, readConfig, type SbbIconConfig } from '../core/config.js';
import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';
import { waitForLitRender } from '../core/testing.js';

import type { SbbIconElement } from './icon.js';

import './icon.js';

describe(`sbb-icon`, () => {
  let iconConfig: SbbIconConfig;

  beforeEach(() => {
    iconConfig = readConfig().icon!;
  });

  afterEach(() => {
    mergeConfig({ icon: iconConfig });
  });

  describe('renders', async () => {
    let element: SbbIconElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-icon></sbb-icon>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders aria-hidden and no aria-label', async () => {
    let element: SbbIconElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-icon name="app-icon-medium"></sbb-icon>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders default aria-label', async () => {
    let element: SbbIconElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-icon name="app-icon-medium" aria-hidden="false"></sbb-icon>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders custom aria-label', async () => {
    let element: SbbIconElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-icon
          name="app-icon-medium"
          aria-hidden="false"
          aria-label="Custom label"
        ></sbb-icon>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  it('renders default label after changing source', async () => {
    const icon: SbbIconElement = await fixture(
      html`<sbb-icon name="app-icon-medium" aria-hidden="false"></sbb-icon>`,
    );

    expect(icon).dom.to.be.equal(`
      <sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Icon app icon medium" role="img" data-namespace="default">
      </sbb-icon>
    `);
    expect(icon).shadowDom.to.be.equal(`
      <span class="sbb-icon-inner"><svg-fake data-name="app-icon-medium" height="36" width="36" style="width:36px;height:36px"></svg-fake></span>
    `);

    icon.setAttribute('name', 'pie-medium');
    await waitForLitRender(icon);

    expect(icon).dom.to.be.equal(`
      <sbb-icon name="pie-medium" aria-hidden="false" aria-label="Icon pie medium" role="img" data-namespace="default">
      </sbb-icon>
    `);
    expect(icon).shadowDom.to.be.equal(`
      <span class="sbb-icon-inner"><svg-fake data-name="pie-medium" height="36" width="36" style="width:36px;height:36px"></svg-fake></span>
    `);
  });

  it('registers a custom namespace', async () => {
    const globalConfig = readConfig();
    let interceptorCalled = false;
    globalConfig.icon = {};

    const sbbIconConfig: SbbIconConfig = globalThis.sbbConfig.icon!;
    sbbIconConfig.namespaces = new Map<string, string>().set(
      'kom',
      'https://icons.app.sbb.ch/kom/',
    );
    sbbIconConfig.interceptor = (parameters) => {
      expect(parameters.namespace).to.be.equal('kom');
      expect(parameters.name).to.be.equal('heart-medium');
      expect(parameters.url).to.be.equal('https://icons.app.sbb.ch/kom/heart-medium.svg');
      interceptorCalled = true;
      return Promise.resolve(
        `<svg-fake
    data-name="${parameters.name}"
    height="36"
    style="width:36px;height:36px"
    width="36"
  >
  </svg-fake>`,
      );
    };

    const root = await fixture(html`<sbb-icon name="kom:heart-medium"></sbb-icon>`);

    expect(root).dom.to.be.equal(`
      <sbb-icon name="kom:heart-medium" aria-hidden="true" role="img" data-namespace="kom">
      </sbb-icon>
    `);
    await expect(root).shadowDom.to.equalSnapshot();

    expect(interceptorCalled).to.be.true;

    // Reset icon config
    delete globalThis.sbbConfig.icon;
  });

  testA11yTreeSnapshot(html`<sbb-icon name="app-icon-medium"></sbb-icon>`);
});
