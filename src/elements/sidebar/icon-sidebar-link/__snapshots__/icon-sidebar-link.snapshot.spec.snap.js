/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-icon-sidebar-link renders DOM"] = 
`<sbb-icon-sidebar-link
  accessibility-label="Go to the party"
  data-action=""
  data-link=""
  href="https://www.sbb.ch"
  icon-name="glass-cocktail-small"
>
</sbb-icon-sidebar-link>
`;
/* end snapshot sbb-icon-sidebar-link renders DOM */

snapshots["sbb-icon-sidebar-link renders Shadow DOM"] = 
`<a
  aria-label="Go to the party"
  class="sbb-action-base sbb-icon-sidebar-link"
  href="https://www.sbb.ch"
>
  <slot name="icon">
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="glass-cocktail-small"
      role="img"
    >
    </sbb-icon>
  </slot>
</a>
`;
/* end snapshot sbb-icon-sidebar-link renders Shadow DOM */

snapshots["sbb-icon-sidebar-link renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Go to the party"
    }
  ]
}
</p>
`;
/* end snapshot sbb-icon-sidebar-link renders A11y tree Chrome */

snapshots["sbb-icon-sidebar-link renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Go to the party",
      "value": "https://www.sbb.ch/"
    }
  ]
}
</p>
`;
/* end snapshot sbb-icon-sidebar-link renders A11y tree Firefox */

