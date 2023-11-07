import { documentLanguage, sbbLanguageChangeEventName } from './language-change-handler';
import { EventSpy } from '../testing';
import { expect, fixture, nextFrame } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import '../../button';

describe('language', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('lang');
  });

  it('should detect language of html tag', async () => {
    document.documentElement.setAttribute('lang', 'de');
    expect(documentLanguage()).to.be.equal('de');
  });

  it('should fallback to English if no lang attribute is present', () => {
    document.documentElement.removeAttribute('lang');
    expect(documentLanguage()).to.be.equal('en');
  });

  it('should extract language from composed language key', () => {
    document.documentElement.setAttribute('lang', 'fr-ch');
    expect(documentLanguage()).to.be.equal('fr');
  });

  it('should fallback to English if language is unknown', () => {
    document.documentElement.setAttribute('lang', 'foo');
    expect(documentLanguage()).to.be.equal('en');
  });

  it('should react to language change', async () => {
    // Use component which uses language
    await fixture(html`<sbb-button></sbb-button>`);
    const changeSpy = new EventSpy<CustomEvent>(sbbLanguageChangeEventName);

    document.documentElement.setAttribute('lang', 'fr');
    await nextFrame();

    expect(document.documentElement.lang).to.be.equal('fr');
    expect(changeSpy.firstEvent.detail).to.be.equal('fr');
  });

  it('should not react to language change if language was not changed', async () => {
    // Use component which uses language
    await fixture(html`<sbb-button></sbb-button>`);

    document.documentElement.setAttribute('lang', 'fr');
    await nextFrame();

    const changeSpy = new EventSpy<CustomEvent>(sbbLanguageChangeEventName);

    document.documentElement.setAttribute('lang', 'fr');
    await nextFrame();

    expect(document.documentElement.lang).to.be.equal('fr');
    expect(changeSpy.count).to.be.equal(0);
  });
});
