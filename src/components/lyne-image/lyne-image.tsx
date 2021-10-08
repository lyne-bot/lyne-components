import * as LyneDesignTokens from '../../../node_modules/lyne-design-tokens/dist/js/tokens.es6.js';

import {
  Component,
  h,
  Prop,
  State
} from '@stencil/core';

import { InterfaceImageAttributes } from './lyne-image.custom.d';
import pictureSizesConfigData from './lyne-image.helper';

const eventListenerOptions = {
  once: true,
  passive: true
};

@Component({
  shadow: true,
  styleUrl: 'lyne-image.scss',
  tag: 'lyne-image'
})

export class LyneImage {

  private _captionElement?: HTMLElement;
  private _imageElement!: HTMLElement;
  private _linksInCaption;

  @State() private _loadedClass: string;

  /**
   * An alt text is not always necessary (e.g. in teaser cards when
   * additional link text is provided). In this case we can leave
   * the value of the alt attribute blank, but the attribute itself
   * still needs to be present. That way we can signal assistive
   * technology, that they can skip the image.
   */
  @Prop() public alt?: string;

  /**
   * If set to true, we show a blurred version of the image as
   * placeholder before the actual image shows up. This will help
   * to improve the perceived loading performance. Read more about
   * the idea of lqip here:
   * https://medium.com/@imgix/lqip-your-images-for-fast-loading-2523d9ee4a62
   */
  @Prop() public lqip = true;

  /**
   * A caption can provide additional context to the image (e.g.
   * name of the photographer, copyright information and the like).
   * Links will automatically receive tabindex=-1 if hideFromScreenreader
   * is set to true. That way they will no longer become focusable.
   */
  @Prop() public caption?: string;

  /**
   * Set this to true, if you want to pass a custom focal point
   * for the image. See full documentation here:
   * https://docs.imgix.com/apis/rendering/focalpoint-crop
   */
  @Prop() public customFocalPoint = false;

  /**
   * If the lazy property is set to true, the module will automatically
   * change the decoding to async, otherwise the decoding is set to auto
   * which leaves the handling up to the browser. Read more about the
   * decoding attribute here:
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding
   */
  @Prop() public decoding: InterfaceImageAttributes['decoding'] = 'auto';

  /**
   * Set this to true, to receive visual guideance where the custom focal
   * point is currently set.
   */
  @Prop() public focalPointDebug = false;

  /**
   * Pass in a floating number between 0 (left) and 1 (right).
   */
  @Prop() public focalPointX = 1;

  /**
   * Pass in a floating number between 0 (top) and 1 (bottom).
   */
  @Prop() public focalPointY = 1;

  /**
   * In cases when the image is just serving a decorative purpose,
   * we can hide it from assistive technologies (e.g. an image
   * in a teaser card)
   */
  @Prop() public hideFromScreenreader = false;

  /**
   * Right now the module is heavily coupled with the image delivery
   * service imgix and depends on the original files being stored
   * inside of AEM. You can pass in any https://cdn.img.sbb.ch img
   * src address you find on sbb.ch to play around with it. Just
   * strip the url parameters and paste in the plain file address.
   * If you want to know how to best work with this module with
   * images coming from a different source, please contact the
   * LYNE Core Team.
   */
  @Prop() public imageSrc?: string;

  /**
   * Just some example image filey you can use to play around with
   * the module.
   */
  @Prop() public imageSrcExamples!: string;

  /**
   * With the support of native image lazy loading, we can now
   * decide whether we want to load the image immediately or only
   * once it is close to the visible viewport. The value eager is
   * best used for images within the initial viewport. We want to
   * load these images as fast as possible to improve the Core Web
   * Vitals values. lazy on the other hand works best for images
   * which are further down the page or invisible during the loading
   * of the initial viewport.
   */
  @Prop() public loading: InterfaceImageAttributes['loading'] = 'eager';

  /**
   * With performance.mark you can log a timestamp associated with
   * the name you define in performanceMark when a certain event is
   * happening. In our case we will log the performance.mark into
   * the PerformanceEntry API once the image is fully loaded.
   * Performance monitoring tools like SpeedCurve or Lighthouse are
   * then able to grab these entries from the PerformanceEntry API
   * and give us additional information and insights about our page
   * loading behaviour. We are then also able to monitor these
   * values over a long period to see if our performance
   * increases or decreases over time. Best to use lowercase strings
   * here, separate words with underscores or dashes.
   */
  @Prop() public performanceMark?: string;

  /**
   * With the pictureSizesConfig object, you can pass in information
   * into lyne-image about what kind of source elements should get
   * rendered. mediaQueries accepts multiple Media Query entries
   * which can get combined by defining a conditionOperator. An
   * example could look like this:
   * {
   *    "breakpoints": [
   *      {
   *        "image": {
   *          "height": "675",
   *          "width": "1200"
   *        },
   *        "mediaQueries": [
   *          {
   *            "conditionFeature": "min-width",
   *            "conditionFeatureValue": {
   *              "lyneDesignToken": true,
   *              "value": "BreakpointLargeMin"
   *            },
   *            "conditionOperator": false
   *          }
   *        ]
   *      },
   *      {
   *        "image": {
   *          "height": "549",
   *          "width": "976"
   *        },
   *        "mediaQueries": [
   *          {
   *            "conditionFeature": "min-width",
   *            "conditionFeatureValue": {
   *              "lyneDesignToken": true,
   *              "value": "BreakpointSmallMin"
   *            },
   *            "conditionOperator": false
   *          }
   *        ]
   *      },
   *      {
   *        "image": {
   *          "height": "180",
   *          "width": "320"
   *        },
   *        "mediaQueries": [
   *          {
   *            "conditionFeature": "max-width",
   *            "conditionFeatureValue": {
   *              "lyneDesignToken": true,
   *              "value": "BreakpointMicroMax"
   *            },
   *            "conditionOperator": "and"
   *          },
   *          {
   *            "conditionFeature": "orientation",
   *            "conditionFeatureValue": {
   *              "lyneDesignToken": false,
   *              "value": "landscape"
   *            },
   *            "conditionOperator": false
   *          }
   *        ]
   *      }
   *    ]
   *  }
   */
  @Prop() public pictureSizesConfig?: string;

  private _addLoadedClass(): void {
    this._loadedClass = 'image__figure--loaded';
  }

  private _logPerformanceMarks(): void {
    if (window.performance.mark && this.performanceMark) {
      performance.clearMarks(this.performanceMark);
      performance.mark(this.performanceMark);
    }
  }

  private _matchMediaQueryDesignToken(breakpointSizeName): string {
    const breakpointSizeNameValue = LyneDesignTokens[breakpointSizeName];

    return `${breakpointSizeNameValue / LyneDesignTokens.TypoScaleDefault}rem`;

  }

  private _removeFocusAbilityFromLinksInCaption(): void {
    this._linksInCaption.forEach((link) => {
      link.setAttribute('tabindex', '-1');
    });
  }

  private _addFocusAbilityToLinksInCaption(): void {
    this._linksInCaption.forEach((link) => {
      link.removeAttribute('tabindex');
    });
  }

  public render(): JSX.Element {

    if (!this.imageSrc) {
      this.imageSrc = this.imageSrcExamples;
    }

    const attributes: {
      ariaHidden?: string;
      role?: string;
    } = {};

    const qualitySettings = {
      nonRetina: '45',
      nonRetinaDataSaver: '30',
      retina: '20',
      retinaDataSaver: '10'
    };

    const retinaQuality = qualitySettings.retina;
    const nonRetinaQuality = qualitySettings.nonRetina;

    const imageParameters = {
      autoImprove: 'auto=format,compress,cs=tinysrgb',
      avif: '&fm=avif&auto',
      crop: `&fit=crop&crop=focalpoint&fp-x=${this.focalPointX}&fp-y=${this.focalPointY}&fp-z=1`,
      focalPointDebug: '&fp-debug=true'
    };

    let imageUrlLQIP = `${this.imageSrc}?blur=100&w=100&h=56`;
    let imageUrlWithParams = `${this.imageSrc}?${imageParameters.autoImprove}`;
    let imageUrlWithParamsAVIF = `${this.imageSrc}?${imageParameters.avif}`;

    if (this.customFocalPoint) {
      imageUrlWithParams = `${imageUrlWithParams}${imageParameters.crop}`;
      imageUrlWithParamsAVIF = `${imageUrlWithParamsAVIF}${imageParameters.crop}`;
      imageUrlLQIP = `${imageUrlLQIP}${imageParameters.crop}`;
    }

    if (this.focalPointDebug) {
      imageUrlWithParams = `${imageUrlWithParams}${imageParameters.focalPointDebug}`;
      imageUrlWithParamsAVIF = `${imageUrlWithParamsAVIF}${imageParameters.focalPointDebug}`;
    }

    if (this.hideFromScreenreader) {
      attributes.ariaHidden = 'true';
      attributes.role = 'presentation';
    }

    if (this.loading === 'lazy') {
      this.decoding = 'async';
    }

    if (this.pictureSizesConfig === undefined) {
      this.pictureSizesConfig = `{
        "breakpoints": [
          {
            "image": {
              "height": "675",
              "width": "1200"
            },
            "mediaQueries": [
              {
                "conditionFeature": "min-width",
                "conditionFeatureValue": {
                  "lyneDesignToken": true,
                  "value": "BreakpointLargeMin"
                },
                "conditionOperator": false
              }
            ]
          },
          {
            "image": {
              "height": "549",
              "width": "976"
            },
            "mediaQueries": [
              {
                "conditionFeature": "min-width",
                "conditionFeatureValue": {
                  "lyneDesignToken": true,
                  "value": "BreakpointSmallMin"
                },
                "conditionOperator": false
              }
            ]
          },
          {
            "image": {
              "height": "180",
              "width": "320"
            },
            "mediaQueries": [
              {
                "conditionFeature": "max-width",
                "conditionFeatureValue": {
                  "lyneDesignToken": true,
                  "value": "BreakpointMicroMax"
                },
                "conditionOperator": false
              }
            ]
          }
        ]
      }`;
    }

    const configs = pictureSizesConfigData(this.pictureSizesConfig);

    return (

      <figure
        class={`image__figure ${this._loadedClass}`}
        {...attributes}
      >
        <div class='image__wrapper'>
          {
            this.lqip
              ? (
                <img
                  alt=''
                  class='image__blur-hash'
                  src={imageUrlLQIP}
                  width='1000'
                  height='562'
                  loading={this.loading}
                  decoding={this.decoding}
                />
              )
              : ''
          }

          <picture>
            {/* render picture element sources */}
            {configs.map((config) => {

              const {
                mediaQueries
              } = config;

              const imageHeight = config.image.height;
              const imageWidth = config.image.width;

              let mediaQuery = '';

              mediaQueries.forEach((mq) => {
                const mqCondition = mq.conditionFeature;
                let mqValue;

                if (mq.conditionFeatureValue.lyneDesignToken) {
                  mqValue = this._matchMediaQueryDesignToken(mq.conditionFeatureValue.value);
                } else {
                  mqValue = mq.conditionFeatureValue.value;
                }

                const mqCombiner = mq.conditionOperator
                  ? ` ${mq.conditionOperator} `
                  : '';

                mediaQuery += `(${mqCondition}: ${mqValue})${mqCombiner}`;

              });

              return [
                <source
                  media={`${mediaQuery}`}
                  sizes={`${imageWidth}px`}
                  srcSet={
                    `${imageUrlWithParamsAVIF}&w=${imageWidth}&h=${imageHeight} ${imageWidth}w, ` +
                    `${imageUrlWithParamsAVIF}&w=${imageWidth * 2}&h=${imageHeight * 2} ${imageWidth * 2}w`
                  }
                  type='image/avif'
                />,
                <source
                  media={`${mediaQuery}`}
                  sizes={`${imageWidth}px`}
                  srcSet={
                    `${imageUrlWithParams}&w=${imageWidth}&h=${imageHeight}&q=${nonRetinaQuality} ${imageWidth}w, ` +
                    `${imageUrlWithParams}&w=${imageWidth * 2}&h=${imageHeight * 2}&q=${retinaQuality} ${imageWidth * 2}w`
                  }
                />
              ];
            })}
            <img
              alt={this.alt}
              class='image__img'
              src={this.imageSrc}
              width='1000'
              height='562'
              loading={this.loading}
              decoding={this.decoding}
              ref={(el): void => {
                this._imageElement = el;
              }}
            />
          </picture>

        </div>
        {
          this.caption
            ? (
              <figcaption
                class='image__caption'
                innerHTML={this.caption}
                ref={(el): void => {
                  this._captionElement = el;
                }}
              >
              </figcaption>
            )
            : ''
        }
      </figure>
    );
  }

  public componentDidRender(): void {

    this._imageElement.addEventListener('load', () => {
      this._logPerformanceMarks();
      this._addLoadedClass();
    }, eventListenerOptions);

    this._linksInCaption = this._captionElement.querySelectorAll('a');

    if (!this._linksInCaption) {
      return;
    }

    if (this.hideFromScreenreader) {
      this._removeFocusAbilityFromLinksInCaption();
    } else {
      this._addFocusAbilityToLinksInCaption();
    }

  }

}
