import { SbbMenuAction } from './sbb-menu-action';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-menu-action', () => {
  it('renders component as button', async () => {
    const { root } = await newSpecPage({
      components: [SbbMenuAction],
      html: `
        <sbb-menu-action form="formid" name="name" type="submit" accessibility-controls="id" accessibility-haspopup="true">
          <span>Action</span>
        </sbb-menu-action>
      `,
    });

    expect(root).toEqualHtml(`
        <sbb-menu-action form="formid" name="name" type="submit" accessibility-controls="id" accessibility-haspopup="true">
          <mock:shadow-root>
            <button class="sbb-menu-action" dir="ltr" id="sbb-menu-action-1" form="formid" name="name" type="submit" aria-controls="id" aria-haspopup="true">
              <span class="sbb-menu-action__content">
                <span class="sbb-menu-action__icon">
                  <slot name="icon"></slot>
                </span>
                <span class="sbb-menu-action__label">
                  <slot></slot>
                </span>
              </span>
            </button>
          </mock:shadow-root>
          <span>Action</span>
        </sbb-menu-action>
      `);
  });

  it('renders component as link with icon and amount', async () => {
    const { root } = await newSpecPage({
      components: [SbbMenuAction],
      html: `
        <sbb-menu-action icon-name="menu-small" amount="123456" href="https://github.com/lyne-design-system/lyne-components" target="_blank">
          <span>Action</span>
        </sbb-menu-action>
      `,
    });

    expect(root).toEqualHtml(`
        <sbb-menu-action amount="123456" icon-name="menu-small" href="https://github.com/lyne-design-system/lyne-components" target="_blank">
          <mock:shadow-root>
            <a class="sbb-menu-action" dir="ltr" id="sbb-menu-action-2" href="https://github.com/lyne-design-system/lyne-components" rel="external noopener nofollow" target="_blank">
              <span class="sbb-menu-action__content">
                <span class="sbb-menu-action__icon">
                  <slot name="icon">
                    <sbb-icon name='menu-small'/>
                  </slot>
                </span>
                <span class="sbb-menu-action__label">
                  <slot></slot>
                </span>
                <span class="sbb-menu-action__amount">
                  123456
                </span>
              </span>
            </a>
          </mock:shadow-root>
          <span>Action</span>
        </sbb-menu-action>
      `);
  });
});
