/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-navigation renders DOM"] = 
`<sbb-navigation
  data-state="closed"
  id="sbb-navigation-0"
  role="navigation"
  trigger="nav-trigger"
>
  <sbb-navigation-marker size="l">
    <sbb-navigation-button
      data-action=""
      data-button=""
      id="nav-1"
      size="l"
      slot="li-0"
      tabindex="0"
    >
      Tickets & Offers
    </sbb-navigation-button>
    <sbb-navigation-button
      data-action=""
      data-button=""
      id="nav-2"
      size="l"
      slot="li-1"
      tabindex="0"
    >
      Vacations & Recreation
    </sbb-navigation-button>
  </sbb-navigation-marker>
</sbb-navigation>
`;
/* end snapshot sbb-navigation renders DOM */

snapshots["sbb-navigation renders Shadow DOM"] = 
`<div class="sbb-navigation__container">
  <div
    class="sbb-navigation"
    id="sbb-navigation-overlay"
  >
    <div class="sbb-navigation__header">
      <sbb-transparent-button
        aria-controls="sbb-navigation-overlay"
        aria-label="Close navigation"
        class="sbb-navigation__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        icon-name="cross-small"
        id="sbb-navigation-close-button"
        negative=""
        sbb-navigation-close=""
        size="m"
        tabindex="0"
        type="button"
      >
      </sbb-transparent-button>
    </div>
    <div class="sbb-navigation__wrapper">
      <div class="sbb-navigation__content">
        <slot>
        </slot>
      </div>
    </div>
  </div>
  <slot name="navigation-section">
  </slot>
</div>
`;
/* end snapshot sbb-navigation renders Shadow DOM */

