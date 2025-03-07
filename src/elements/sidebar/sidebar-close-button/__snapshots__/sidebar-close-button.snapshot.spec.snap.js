/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-sidebar-close-button renders DOM"] = 
`<sbb-sidebar-close-button
  aria-label="Close navigation"
  data-action=""
  data-button=""
  data-sbb-button=""
  icon-name="cross-small"
  size="s"
  slot="title-section"
  tabindex="0"
>
</sbb-sidebar-close-button>
`;
/* end snapshot sbb-sidebar-close-button renders DOM */

snapshots["sbb-sidebar-close-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-sidebar-close-button">
  <slot name="icon">
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="cross-small"
      role="img"
    >
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-sidebar-close-button renders Shadow DOM */

snapshots["sbb-sidebar-close-button renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Close navigation"
    }
  ]
}
</p>
`;
/* end snapshot sbb-sidebar-close-button renders A11y tree Firefox */

snapshots["sbb-sidebar-close-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Close navigation"
    }
  ]
}
</p>
`;
/* end snapshot sbb-sidebar-close-button renders A11y tree Chrome */

