import {
  LinkProperties,
  LinkTargetType,
  resolveLinkOrStaticRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import { TitleLevel } from '../sbb-title';
import {
  documentLanguage,
  HandlerRepository,
  linkHandlerAspect,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { CSSResult, LitElement, nothing, TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import { setAttributes } from '../../global/dom';
import Style from './sbb-teaser.scss?lit&inline';
import '../sbb-title';

/**
 * @slot image - Slot used to render the image
 * @slot title - Slot used to render the title
 * @slot description - Slot used to render the description
 */
@customElement('sbb-teaser')
export class SbbTeaser extends LitElement implements LinkProperties {
  public static override styles: CSSResult = Style;

  /**
   * Teaser variant -
   * when this is true the text-content will be under the image
   * otherwise it will be displayed next to the image.
   */
  @property({ attribute: 'is-stacked', reflect: true, type: Boolean }) public isStacked: boolean;

  /**
   * Heading level of the sbb-title element (e.g. h1-h6).
   */
  @property({ attribute: 'title-level' }) public titleLevel: TitleLevel = '5';

  /** The href value you want to link to. */
  @property() public href: string | undefined;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string | undefined;

  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this,
    linkHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    } = resolveLinkOrStaticRenderVariables(this);

    setAttributes(this, hostAttributes);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-teaser" ${spread(attributes)}>
        <span class="sbb-teaser__container">
          <span class="sbb-teaser__image-wrapper">
            <slot name="image"></slot>
          </span>
          <span class="sbb-teaser__text">
            <sbb-title level=${this.titleLevel} visual-level="5" class="sbb-teaser__lead">
              <slot name="title"></slot>
            </sbb-title>
            <p class="sbb-teaser__description">
              <slot name="description"></slot>
            </p>
            ${
              targetsNewWindow(this)
                ? html`<span class="sbb-teaser__opens-in-new-window">
                    . ${i18nTargetOpensInNewWindow[this._currentLanguage]}
                  </span>`
                : nothing
            }
          </span>
        </span>
      </${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser': SbbTeaser;
  }
}
