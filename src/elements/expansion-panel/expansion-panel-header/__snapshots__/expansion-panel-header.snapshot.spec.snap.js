/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-expansion-panel-header renders DOM"] = 
`<sbb-expansion-panel-header
  data-action=""
  data-button=""
  data-slot-names="unnamed"
  slot="header"
  tabindex="0"
>
  Header
</sbb-expansion-panel-header>
`;
/* end snapshot sbb-expansion-panel-header renders DOM */

snapshots["sbb-expansion-panel-header renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-expansion-panel-header">
  <span class="sbb-expansion-panel-header__title">
    <span class="sbb-expansion-panel-header__icon">
      <slot name="icon">
      </slot>
    </span>
    <slot>
    </slot>
  </span>
  <span class="sbb-expansion-panel-header__toggle">
    <sbb-icon
      aria-hidden="true"
      class="sbb-expansion-panel-header__toggle-icon"
      data-namespace="default"
      name="chevron-small-down-medium"
      role="img"
    >
    </sbb-icon>
  </span>
</span>
`;
/* end snapshot sbb-expansion-panel-header renders Shadow DOM */

snapshots["sbb-expansion-panel-header renders with icon DOM"] = 
`<sbb-expansion-panel-header
  data-action=""
  data-button=""
  data-icon=""
  data-slot-names="unnamed"
  icon-name="pie-medium"
  slot="header"
  tabindex="0"
>
  Header
</sbb-expansion-panel-header>
`;
/* end snapshot sbb-expansion-panel-header renders with icon DOM */

snapshots["sbb-expansion-panel-header renders with icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-expansion-panel-header">
  <span class="sbb-expansion-panel-header__title">
    <span class="sbb-expansion-panel-header__icon">
      <slot name="icon">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="pie-medium"
          role="img"
        >
        </sbb-icon>
      </slot>
    </span>
    <slot>
    </slot>
  </span>
  <span class="sbb-expansion-panel-header__toggle">
    <sbb-icon
      aria-hidden="true"
      class="sbb-expansion-panel-header__toggle-icon"
      data-namespace="default"
      name="chevron-small-down-medium"
      role="img"
    >
    </sbb-icon>
  </span>
</span>
`;
/* end snapshot sbb-expansion-panel-header renders with icon Shadow DOM */

snapshots["sbb-expansion-panel-header renders with slotted icon DOM"] = 
`<sbb-expansion-panel-header
  data-action=""
  data-button=""
  data-icon=""
  data-slot-names="icon unnamed"
  slot="header"
  tabindex="0"
>
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="pie-medium"
    role="img"
    slot="icon"
  >
  </sbb-icon>
  Header
</sbb-expansion-panel-header>
`;
/* end snapshot sbb-expansion-panel-header renders with slotted icon DOM */

snapshots["sbb-expansion-panel-header renders with slotted icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-expansion-panel-header">
  <span class="sbb-expansion-panel-header__title">
    <span class="sbb-expansion-panel-header__icon">
      <slot name="icon">
      </slot>
    </span>
    <slot>
    </slot>
  </span>
  <span class="sbb-expansion-panel-header__toggle">
    <sbb-icon
      aria-hidden="true"
      class="sbb-expansion-panel-header__toggle-icon"
      data-namespace="default"
      name="chevron-small-down-medium"
      role="img"
    >
    </sbb-icon>
  </span>
</span>
`;
/* end snapshot sbb-expansion-panel-header renders with slotted icon Shadow DOM */

snapshots["sbb-expansion-panel-header renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Header"
    }
  ]
}
</p>
`;
/* end snapshot sbb-expansion-panel-header renders A11y tree Chrome */

snapshots["sbb-expansion-panel-header renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Header"
    }
  ]
}
</p>
`;
/* end snapshot sbb-expansion-panel-header renders A11y tree Firefox */

