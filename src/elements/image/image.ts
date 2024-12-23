import {
  SbbBreakpointZeroMin,
  SbbBreakpointZeroMax,
  SbbBreakpointMicroMin,
  SbbBreakpointMicroMax,
  SbbBreakpointSmallMin,
  SbbBreakpointSmallMax,
  SbbBreakpointMediumMin,
  SbbBreakpointMediumMax,
  SbbBreakpointLargeMin,
  SbbBreakpointLargeMax,
  SbbBreakpointWideMin,
  SbbBreakpointWideMax,
  SbbBreakpointUltraMin,
  SbbBreakpointUltraMax,
  SbbTypoScaleDefault,
} from '@sbb-esta/lyne-design-tokens';
import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

import { forceType } from '../core/decorators.js';

import style from './image.scss?lit&inline';

export interface InterfaceImageAttributesSizesConfig {
  breakpoints: InterfaceImageAttributesSizesConfigBreakpoint[];
}

export interface InterfaceImageAttributesSizesConfigBreakpoint {
  image: {
    height: number;
    width: number;
  };
  mediaQueries: InterfaceImageAttributesSizesConfigMediaQuery[];
}

export interface InterfaceImageAttributesSizesConfigMediaQuery {
  conditionFeature: string;
  conditionFeatureValue: {
    lyneDesignToken: boolean;
    value: string;
  };
  conditionOperator: false;
}

/**
 * we check the structure of the data manually, so it's safe to use `any` as return type
 */
const imageHelperGetBreakpoints = (
  jsonString: string,
): InterfaceImageAttributesSizesConfigBreakpoint[] => {
  if (!jsonString || jsonString.length === 0) {
    return [];
  }

  // make sure that we have `breakpoints` key in object
  const logWarning = import.meta.env.DEV
    ? () =>
        console.warn(
          'sbb-image error: attribute breakpoints has wrong data format. Reference the documentation to see how you should format the data for this attribute.',
        )
    : null;
  let jsonObject: InterfaceImageAttributesSizesConfig;

  try {
    jsonObject = JSON.parse(jsonString);
  } catch {
    logWarning?.();
    return [];
  }

  if (!jsonObject.breakpoints || jsonObject.breakpoints.length === 0) {
    logWarning?.();
    return [];
  }

  // make sure we get an array of breakpoints
  if (!Array.isArray(jsonObject.breakpoints)) {
    logWarning?.();
    return [];
  }

  /**
   * 1. make sure that each entry within the breakpoints object contains only allowed keys
   * 2. make sure that all necessary keys are present
   */
  let wrongKeyDetected = false;
  let missingKeyDetected = false;

  const allowedKeys = ['image', 'mediaQueries'];

  jsonObject.breakpoints.forEach((breakpoint) => {
    const breakpointKeys = Object.keys(breakpoint);

    breakpointKeys.forEach((breakpointKey) => {
      if (!allowedKeys.includes(breakpointKey)) {
        wrongKeyDetected = true;
      }
    });

    allowedKeys.forEach((allowedKey) => {
      if (!breakpointKeys.includes(allowedKey)) {
        missingKeyDetected = true;
      }
    });
  });

  if (wrongKeyDetected || missingKeyDetected) {
    logWarning?.();
    return [];
  }

  return jsonObject.breakpoints;
};

const eventListenerOptions = {
  once: true,
  passive: true,
};

const pxToRem = (px: number): number => px / SbbTypoScaleDefault;

const breakpointMap: Record<string, number> = {
  'sbb-breakpoint-zero-min': pxToRem(SbbBreakpointZeroMin),
  'sbb-breakpoint-zero-max': pxToRem(SbbBreakpointZeroMax),
  'sbb-breakpoint-micro-min': pxToRem(SbbBreakpointMicroMin),
  'sbb-breakpoint-micro-max': pxToRem(SbbBreakpointMicroMax),
  'sbb-breakpoint-small-min': pxToRem(SbbBreakpointSmallMin),
  'sbb-breakpoint-small-max': pxToRem(SbbBreakpointSmallMax),
  'sbb-breakpoint-medium-min': pxToRem(SbbBreakpointMediumMin),
  'sbb-breakpoint-medium-max': pxToRem(SbbBreakpointMediumMax),
  'sbb-breakpoint-large-min': pxToRem(SbbBreakpointLargeMin),
  'sbb-breakpoint-large-max': pxToRem(SbbBreakpointLargeMax),
  'sbb-breakpoint-wide-min': pxToRem(SbbBreakpointWideMin),
  'sbb-breakpoint-wide-max': pxToRem(SbbBreakpointWideMax),
  'sbb-breakpoint-ultra-min': pxToRem(SbbBreakpointUltraMin),
  'sbb-breakpoint-ultra-max': pxToRem(SbbBreakpointUltraMax),
};

/**
 * It displays an image.
 *
 * @event {Event} load - Emits when the image has been loaded.
 * @event {Event} error - Emits when the image loading ended in an error.
 * @cssprop [--sbb-image-aspect-ratio=auto] - Can be used to override `aspectRatio` property.
 * This way we can have, for example, an image component with an aspect
 * ratio of 4/3 in smaller viewports and 16/9 in larger viewports.
 * @cssprop [--sbb-image-object-position] - Can be used to set the object-position CSS property of the image itself if the image itself is cropped.
 * @cssprop [--sbb-image-object-fit=cover] - Can be used to set the object-fit CSS property of the image itself if the image itself is cropped.
 */
export
@customElement('sbb-image')
class SbbImageElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    error: 'error',
    load: 'load',
  } as const;

  private _captionElement?: HTMLElement;
  private _linksInCaption?: NodeListOf<HTMLLinkElement>;
  private _config = {
    nonRetinaQuality: '45',
    retinaQuality: '20',
  };

  /**
   * An alt text is not always necessary (e.g. in teaser cards when
   * additional link text is provided). In this case we can leave
   * the value of the alt attribute blank, but the attribute itself
   * still needs to be present. That way we can signal assistive
   * technology, that they can skip the image.
   */
  @forceType()
  @property()
  public accessor alt: string = '';

  /**
   * If set to false, we show a blurred version of the image as
   * placeholder before the actual image shows up. This will help
   * to improve the perceived loading performance. Read more about
   * the idea of lqip here:
   * https://medium.com/@imgix/lqip-your-images-for-fast-loading-2523d9ee4a62
   */
  @forceType()
  @property({ attribute: 'skip-lqip', type: Boolean, reflect: true })
  public accessor skipLqip: boolean = false;

  /**
   * Set this to true, if you want to pass a custom focal point
   * for the image. See full documentation here:
   * https://docs.imgix.com/apis/rendering/focalpoint-crop
   */
  @forceType()
  @property({ attribute: 'custom-focal-point', type: Boolean })
  public accessor customFocalPoint: boolean = false;

  /**
   * If the lazy property is set to true, the module will automatically
   * change the decoding to async, otherwise the decoding is set to auto
   * which leaves the handling up to the browser. Read more about the
   * decoding attribute here:
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding
   */
  @property() public accessor decoding: 'sync' | 'async' | 'auto' = 'auto';

  /**
   * Set this to true, to receive visual guidance where the custom focal
   * point is currently set.
   */
  @forceType()
  @property({ attribute: 'focal-point-debug', type: Boolean })
  public accessor focalPointDebug: boolean = false;

  /**
   * Pass in a floating number between 0 (left) and 1 (right).
   */
  @forceType()
  @property({ attribute: 'focal-point-x', type: Number })
  public accessor focalPointX: number = 1;

  /**
   * Pass in a floating number between 0 (top) and 1 (bottom).
   */
  @forceType()
  @property({ attribute: 'focal-point-y', type: Number })
  public accessor focalPointY: number = 1;

  /**
   * Right now the module is heavily coupled with the image delivery
   * service imgix and depends on the original files being stored
   * inside AEM. You can pass in any https://cdn.img.sbb.ch img
   * src address you find on sbb.ch to play around with it. Just
   * strip the url parameters and paste in the plain file address.
   * If you want to know how to best work with this module with
   * images coming from a different source, please contact the
   * LYNE Core Team.
   */
  @forceType()
  @property({ attribute: 'image-src' })
  public accessor imageSrc: string = '';

  /**
   * The importance attribute is fairly new attribute which should
   * help the browser decide which resources it should prioritise
   * during page load. We will set the attribute value based on the
   * value, we receive in the loading attribute. 'eager', which we use
   * for the largest image within the initial viewport, will set the
   * attribute value to 'high'. 'lazy', which we use for images below
   * the fold, will set the attribute value to 'low'.
   */
  @property() public accessor importance: 'auto' | 'high' | 'low' = 'high';

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
  @property() public accessor loading: 'eager' | 'lazy' = 'eager';

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
  @forceType()
  @property({ attribute: 'performance-mark' })
  public accessor performanceMark: string = '';

  /**
   * With the pictureSizesConfig object, you can pass in information
   * into image about what kind of source elements should get
   * rendered. mediaQueries accepts multiple Media Query entries
   * which can get combined by defining a conditionOperator.
   * Type is: stringified InterfaceImageAttributesSizesConfig-Object
   * An example could look like this:
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
   *              "value": "sbb-breakpoint-large-min"
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
   *              "value": "sbb-breakpoint-small-min"
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
   *              "value": "sbb-breakpoint-micro-max"
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
  @forceType()
  @property({ attribute: 'picture-sizes-config' })
  public accessor pictureSizesConfig: string = '';

  /** Whether the image is finished loading or failed to load. */
  public get complete(): boolean {
    return this.shadowRoot?.querySelector?.<HTMLImageElement>('.sbb-image__img')?.complete ?? false;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    if (!this._captionElement) {
      return;
    }

    this._linksInCaption = this._captionElement.querySelectorAll<HTMLLinkElement>('a');

    if (!this._linksInCaption) {
      return;
    }

    this._addFocusAbilityToLinksInCaption();
  }

  protected override async firstUpdated(changedProperties: PropertyValues<this>): Promise<void> {
    super.firstUpdated(changedProperties);

    // We need to wait until the update is complete to check whether the image has already been completely loaded.
    await this.updateComplete;
    if (this.complete) {
      this.toggleAttribute('data-loaded', true);
    }
  }

  private _logPerformanceMarks(): void {
    if (this.performanceMark) {
      performance.clearMarks(this.performanceMark);
      performance.mark(this.performanceMark);
    }
  }

  private _matchMediaQueryDesignToken(breakpointSizeName: string): string {
    const value = breakpointMap[breakpointSizeName];
    return value ? `${value}rem` : '';
  }

  private _addFocusAbilityToLinksInCaption(): void {
    this._linksInCaption?.forEach((link) => {
      link.removeAttribute('tabindex');
    });
  }

  private _prepareImageUrl(baseUrl: string | undefined, lquip = false): string {
    if (!baseUrl || baseUrl === '') {
      return '';
    }

    // Creating an URL without a schema will fail, but is a valid input for baseUrl.
    // e.g. image-src can be https://example.com/my-image.png or /my-image.png
    const isFullyQualifiedUrl = !!baseUrl.match(/^\w+:\/\//);
    const imageUrlObj = isFullyQualifiedUrl ? new URL(baseUrl) : new URL(`http://noop/${baseUrl}`);

    if (lquip) {
      // blur and size: ?blur=100&w=100&h=56
      imageUrlObj.searchParams.append('blur', '100');
      imageUrlObj.searchParams.append('w', '100');
      imageUrlObj.searchParams.append('h', '56');
    } else {
      // CDN Information: https://docs.imgix.com/apis/rendering
      // param.auto: ?auto=format,compress,cs=tinysrgb
      imageUrlObj.searchParams.append('auto', 'format,compress,cs=tinysrgb');
    }

    if (this.customFocalPoint) {
      // crop: `&fit=crop&crop=focalpoint&fp-x=${this.focalPointX}&fp-y=${this.focalPointY}&fp-z=1`,
      imageUrlObj.searchParams.append('fit', 'crop');
      imageUrlObj.searchParams.append('crop', 'focalpoint');
      imageUrlObj.searchParams.append('fp-x', this.focalPointX.toString(10));
      imageUrlObj.searchParams.append('fp-y', this.focalPointY.toString(10));
      imageUrlObj.searchParams.append('fp-z', '1');
    }

    if (this.focalPointDebug) {
      // focalPointDebug: '&fp-debug=true'
      imageUrlObj.searchParams.append('fp-debug', 'true');
    }

    // In case of "noop" host, we don't return the host and must remove the
    // starting `/` of the pathname.
    return isFullyQualifiedUrl
      ? imageUrlObj.href
      : imageUrlObj.pathname.substring(1) + imageUrlObj.search;
  }

  private _preparePictureSizeConfigs(): InterfaceImageAttributesSizesConfigBreakpoint[] {
    let pictureSizesConfig;

    if (this.pictureSizesConfig) {
      pictureSizesConfig = this.pictureSizesConfig;
    } else {
      // default config
      pictureSizesConfig = `{
        "breakpoints": [
          {
            "image": {
              "height": 675,
              "width": 1200
            },
            "mediaQueries": [
              {
                "conditionFeature": "min-width",
                "conditionFeatureValue": {
                  "lyneDesignToken": true,
                  "value": "sbb-breakpoint-large-min"
                },
                "conditionOperator": false
              }
            ]
          },
          {
            "image": {
              "height": 549,
              "width": 976
            },
            "mediaQueries": [
              {
                "conditionFeature": "min-width",
                "conditionFeatureValue": {
                  "lyneDesignToken": true,
                  "value": "sbb-breakpoint-micro-min"
                },
                "conditionOperator": false
              }
            ]
          },
          {
            "image": {
              "height": 180,
              "width": 320
            },
            "mediaQueries": [
              {
                "conditionFeature": "max-width",
                "conditionFeatureValue": {
                  "lyneDesignToken": true,
                  "value": "sbb-breakpoint-zero-max"
                },
                "conditionOperator": false
              }
            ]
          }
        ]
      }`;
    }

    return imageHelperGetBreakpoints(pictureSizesConfig);
  }

  private _createMediaQueryString(
    mediaQueries: InterfaceImageAttributesSizesConfigMediaQuery[],
  ): string {
    let mediaQuery = '';

    mediaQueries.forEach((mq) => {
      const mqCondition = mq.conditionFeature;
      let mqValue;

      if (mq.conditionFeatureValue.lyneDesignToken) {
        mqValue = this._matchMediaQueryDesignToken(mq.conditionFeatureValue.value);
      } else {
        mqValue = mq.conditionFeatureValue.value;
      }

      const mqCombiner = mq.conditionOperator ? ` ${mq.conditionOperator} ` : '';

      mediaQuery += `(${mqCondition}: ${mqValue})${mqCombiner}`;
    });

    return mediaQuery;
  }

  @eventOptions(eventListenerOptions)
  private _imageLoaded(): void {
    this._logPerformanceMarks();
    this.toggleAttribute('data-loaded', true);
    this.dispatchEvent(new Event('load'));
  }

  protected override render(): TemplateResult {
    const imageUrlLQIP = this._prepareImageUrl(this.imageSrc, true);
    const imageUrlWithParams = this._prepareImageUrl(this.imageSrc, false);

    if (this.loading === 'lazy') {
      this.decoding = 'async';
      this.importance = 'low';
    }

    const pictureSizeConfigs = this._preparePictureSizeConfigs();

    /**
     * The alt attribute should always be present for the img element.
     * If it has an empty string as its value, it is simply ignored
     * by assistive technologies. If we leave it out completely,
     * they might try to interpret the img element.
     */
    return html`
      <div class="sbb-image__wrapper">
        ${!this.skipLqip
          ? html`<img
              alt=""
              class="sbb-image__blurred"
              src=${imageUrlLQIP}
              width="1000"
              height="562"
              loading=${this.loading ?? nothing}
              decoding=${this.decoding ?? nothing}
            />`
          : nothing}

        <picture>
          <!-- render picture element sources -->
          ${pictureSizeConfigs.map((config) => {
            const imageHeight = config.image.height;
            const imageWidth = config.image.width;
            const mediaQuery = this._createMediaQueryString(config.mediaQueries);
            return html`
              <source
                media=${`${mediaQuery}`}
                sizes=${`${imageWidth}px`}
                srcset=${
                  `${imageUrlWithParams}&w=${imageWidth}&h=${imageHeight}&q=${this._config.nonRetinaQuality} ${imageWidth}w, ` +
                  `${imageUrlWithParams}&w=${imageWidth * 2}&h=${imageHeight * 2}&q=${
                    this._config.retinaQuality
                  } ${imageWidth * 2}w`
                }
              ></source>`;
          })}
          <img
            alt=${this.alt || ''}
            @load=${this._imageLoaded}
            @error=${() => this.dispatchEvent(new Event('error'))}
            class="sbb-image__img"
            src=${this.imageSrc!}
            width="1000"
            height="562"
            loading=${this.loading ?? nothing}
            decoding=${this.decoding ?? nothing}
            .fetchPriority=${this.importance ?? nothing}
          />
        </picture>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-image': SbbImageElement;
  }
}
