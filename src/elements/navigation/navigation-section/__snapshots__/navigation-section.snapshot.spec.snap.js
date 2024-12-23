/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-navigation-section renders DOM"] = 
`<sbb-navigation-section
  aria-hidden="true"
  data-state="closed"
  id="sbb-navigation-section-0"
  slot="navigation-section"
>
</sbb-navigation-section>
`;
/* end snapshot sbb-navigation-section renders DOM */

snapshots["sbb-navigation-section renders Shadow DOM"] = 
`<div class="sbb-navigation-section__container">
  <nav
    aria-labelledby="title"
    class="sbb-navigation-section"
  >
    <div class="sbb-navigation-section__wrapper">
      <div class="sbb-navigation-section__content">
        <div class="sbb-navigation-section__header">
          <sbb-transparent-button
            aria-label="Go back"
            class="sbb-navigation-section__back"
            data-action=""
            data-button=""
            data-sbb-button=""
            icon-name="chevron-small-left-small"
            id="sbb-navigation-section-back-button"
            negative=""
            sbb-navigation-section-close=""
            size="m"
            tabindex="0"
            type="button"
          >
          </sbb-transparent-button>
          <span
            class="sbb-navigation-section__title"
            id="title"
          >
            <slot name="title">
            </slot>
          </span>
        </div>
        <slot>
        </slot>
      </div>
    </div>
  </nav>
</div>
`;
/* end snapshot sbb-navigation-section renders Shadow DOM */

