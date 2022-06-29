import { Component, h, Prop, Watch } from '@stencil/core';

import { InterfaceTeaserAttributes } from './sbb-teaser.custom';

/**
 * @slot image - Slot used to render the image
 * @slot headline - Slot used to render the headline
 * @slot description - Slot used to render the description
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-teaser.default.scss',
    shared: 'styles/sbb-teaser.shared.scss',
  },
  tag: 'sbb-teaser',
})

/**
 * Generalized Teaser - for displaying an image, headline and paragraph
 */
export class SbbTeaser {
  /** Teaser appearance */
  @Prop() public appearance?: InterfaceTeaserAttributes['appearance'] = 'primary';

  /**
   * The text which gets exposed to screen reader users. The text should
   * reflect all the information
   *
   * Example text: Connection from X to Y, via Z, on date X.
   * Ticket price starts at X.
   */
  @Prop() public accessibilityLabel!: string;

  /**
   * Check if accessibilityLabel is provided since it is a required prop,
   * otherwise throw an error.
   */
  /* eslint-disable */
  @Watch('accessibilityLabel')
  validateAccessibilityLabel(newValue: string) {
    const isBlank = typeof newValue !== 'string' || newValue === '';
    if (isBlank) {
      throw new Error('accessibilityLabel: required');
    }
  }
  /* eslint-enable */

  /**
   * component attributes
   * ----------------------------------------------------------------
   */

  /** The href value you want to link to */
  @Prop() public hrefValue!: string;

  /**
   * Teaser variant -
   * when this is true the text-content will be under the image
   * otherwise it will be displayed next to the image.
   */
  @Prop() public isStacked: boolean;

  public componentWillLoad(): void {
    // Validate props
    this.validateAccessibilityLabel(this.accessibilityLabel);
  }

  public render(): JSX.Element {
    const ariaLabel = this.accessibilityLabel;

    return (
      <a
        aria-label={ariaLabel}
        class={`teaser teaser--${this.appearance} ${
          this.isStacked === true ? 'teaser--is-stacked' : ''
        }`}
        href={this.hrefValue}
      >
        <span class="teaser__content">
          <span class="teaser__inner">
            <span class="teaser__image-wrapper">
              <slot name="image" />
            </span>
            <span class="teaser__text">
              <span class="teaser__lead">
                <slot name="headline" />
              </span>
              <span class="teaser__description">
                <slot name="description" />
              </span>
            </span>
          </span>
        </span>
      </a>
    );
  }
}
