import lyneIcons from 'lyne-icons/dist/icons.json';
import { SbbLink } from './sbb-link';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-link', () => {
  it('renders a plain link', async () => {
    const { root } = await newSpecPage({
      components: [SbbLink],
      html: `<sbb-link href="https://github.com/lyne-design-system/lyne-components" icon-placement="end"
            icon="chevron-small-right-small" text-size="m" accessibility-label="Travelcards &amp; tickets">
            <span slot="icon">${lyneIcons.icons['chevron-small-right-small']}</span>
            Travelcards &amp; tickets.
            </sbb-link>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link
            href="https://github.com/lyne-design-system/lyne-components"
            icon-placement="end"
            icon="chevron-small-right-small"
            text-size="m"
            accessibility-label="Travelcards &amp; tickets">
          <mock:shadow-root>
            <a
                aria-label="Travelcards & tickets. Link target opens in new window."
                class="sbb-link sbb-link--icon-placement-end sbb-link--text-m"
                dir="ltr"
                href="https://github.com/lyne-design-system/lyne-components"
                target="_blank"
                rel="external noopener nofollow"
            >
                 <slot name="icon">
                  <sbb-icon name="chevron-small-right-small"></sbb-icon>
                  </slot>
                <slot></slot>
            </a>
          </mock:shadow-root>
          <span slot="icon">
            <svg height="24" viewBox="0,0,24,24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="m10.6776,7.74045,3.949,3.90395.3597.3557-.3597.3555-3.95,3.904-.70297-.7112L13.5639,12,9.97459,8.4516l.70301-.71115z">
                </path>
            </svg>
          </span>
          Travelcards &amp; tickets.
        </sbb-link>
      `);
  });
  it('renders a link as a button', async () => {
    const { root } = await newSpecPage({
      components: [SbbLink],
      html: `<sbb-link icon-placement="end" icon="chevron-small-right-small" text-size="m">
            <span slot="icon">${lyneIcons.icons['chevron-small-right-small']}</span>
            Travelcards &amp; tickets.
            </sbb-link>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link
            icon-placement="end"
            icon="chevron-small-right-small"
            text-size="m">
          <mock:shadow-root>
            <button
                class="sbb-link sbb-link--icon-placement-end sbb-link--text-m"
                dir="ltr"
                type="button">
                <slot name="icon">
                  <sbb-icon name="chevron-small-right-small"></sbb-icon>
                  </slot>
                <slot></slot>
            </button>
          </mock:shadow-root>
          <span slot="icon">
            <svg height="24" viewBox="0,0,24,24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="m10.6776,7.74045,3.949,3.90395.3597.3557-.3597.3555-3.95,3.904-.70297-.7112L13.5639,12,9.97459,8.4516l.70301-.71115z">
                </path>
            </svg>
          </span>
          Travelcards &amp; tickets.
        </sbb-link>
      `);
  });
  it('renders a link as a span', async () => {
    const { root } = await newSpecPage({
      components: [SbbLink],
      html: `
      <a>
        <sbb-link icon-placement="end" icon="chevron-small-right-small" text-size="m">
          <span slot="icon">${lyneIcons.icons['chevron-small-right-small']}</span>
            Travelcards &amp; tickets.
        </sbb-link>
      </a>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link
            icon-placement="end"
            icon="chevron-small-right-small"
            text-size="m">
          <mock:shadow-root>
            <span
                class="sbb-link sbb-link--icon-placement-end sbb-link--text-m"
                dir="ltr">
                <slot name="icon">
                  <sbb-icon name="chevron-small-right-small"></sbb-icon>
                </slot>
                <slot></slot>
            </span>
          </mock:shadow-root>
          <span slot="icon">
            <svg height="24" viewBox="0,0,24,24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="m10.6776,7.74045,3.949,3.90395.3597.3557-.3597.3555-3.95,3.904-.70297-.7112L13.5639,12,9.97459,8.4516l.70301-.71115z">
                </path>
            </svg>
          </span>
          Travelcards &amp; tickets.
        </sbb-link>
      `);
  });
});
