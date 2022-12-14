import { newSpecPage } from '@stencil/core/testing';
import { SbbHeaderAction } from './sbb-header-action';

describe('sbb-header-action', () => {
  it('renders the component as a button with icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeaderAction],
      html: `
        <sbb-header-action icon-name='pie-small' name="test" type="reset" value="value" accessibility-controls="id" accessibility-haspopup="dialog">
          Action
        </sbb-header-action>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-header-action icon-name='pie-small' expand-from="medium" name="test" type="reset" value="value" accessibility-controls="id" accessibility-haspopup="dialog">
        <mock:shadow-root>
          <button aria-controls="id" aria-haspopup="dialog" class="sbb-header-action" dir="ltr" name="test" type="reset" value="value">
            <span class="sbb-header-action__icon">
              <slot name="icon">
                <sbb-icon name="pie-small"></sbb-icon>
              </slot>
            </span>
            <span class="sbb-header-action__text">
              <slot></slot>
            </span>
          </button>
        </mock:shadow-root>
        Action
      </sbb-header-action>
    `);
  });

  it('renders the component as a link without icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeaderAction],
      html: '<sbb-header-action expand-from="small" href="https://github.com/lyne-design-system/lyne-components" target="_blank">Action</sbb-header-action>',
    });

    expect(root).toEqualHtml(`
      <sbb-header-action expand-from="small" href="https://github.com/lyne-design-system/lyne-components" target="_blank" >
        <mock:shadow-root>
          <a class="sbb-header-action" dir="ltr" href="https://github.com/lyne-design-system/lyne-components" rel="external noopener nofollow" target="_blank">
            <span class="sbb-header-action__icon">
              <slot name="icon"/>
            </span>
            <span class="sbb-header-action__text">
              <slot></slot>
              <span class="sbb-header-action__opens-in-new-window">
                . Link target opens in new window.
              </span>
            </span>
          </a>
        </mock:shadow-root>
        Action
      </sbb-header-action>
    `);
  });
});
