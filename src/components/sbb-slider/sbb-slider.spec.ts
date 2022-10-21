import { SbbSlider } from './sbb-slider';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-slider', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSlider],
      html: '<sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" value="100"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" value="100">
        <mock:shadow-root>
          <div class="sbb-slider__wrapper">
            <slot name="prefix">
              <sbb-icon name="walk-slow-small"></sbb-icon>
            </slot>
            <div class="sbb-slider__container" style="--sbb-slider-value-fraction: 0.2; --sbb-slider-step-fraction: 0;">
              <input class="sbb-slider__range-input" max="500" min="0" value="100" type="range">
              <div class="sbb-slider__line">
                <div class="sbb-slider__selected-line"></div>
              </div>
              <div class="sbb-slider__knob"></div>
            </div>
            <slot name="suffix">
              <sbb-icon name="walk-fast-small"></sbb-icon>
            </slot>
          </div>
        </mock:shadow-root>
      </sbb-slider>
    `);
  });
});
