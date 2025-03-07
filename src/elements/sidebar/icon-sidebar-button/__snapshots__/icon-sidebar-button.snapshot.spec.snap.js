/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-icon-sidebar-button renders DOM"] = 
`<sbb-icon-sidebar-button
  aria-label="Go to the party"
  data-action=""
  data-button=""
  icon-name="glass-cocktail-small"
  tabindex="0"
>
</sbb-icon-sidebar-button>
`;
/* end snapshot sbb-icon-sidebar-button renders DOM */

snapshots["sbb-icon-sidebar-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-icon-sidebar-button">
  <slot name="icon">
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="glass-cocktail-small"
      role="img"
    >
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-icon-sidebar-button renders Shadow DOM */

snapshots["sbb-icon-sidebar-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Go to the party"
    }
  ]
}
</p>
`;
/* end snapshot sbb-icon-sidebar-button renders A11y tree Chrome */

snapshots["sbb-icon-sidebar-button renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Go to the party"
    }
  ]
}
</p>
`;
/* end snapshot sbb-icon-sidebar-button renders A11y tree Firefox */

