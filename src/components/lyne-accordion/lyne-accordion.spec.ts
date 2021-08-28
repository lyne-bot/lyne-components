import { LyneAccordion } from './lyne-accordion';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-accordion', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneAccordion],
      html: '<lyne-accordion />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-accordion>
          <mock:shadow-root>
            <div class="accordion">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </lyne-accordion>
      `);
  });

});
