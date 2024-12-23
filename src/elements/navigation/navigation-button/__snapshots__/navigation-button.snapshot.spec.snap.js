/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-navigation-button renders DOM"] = 
`<sbb-navigation-button
  data-action=""
  data-button=""
  size="l"
  tabindex="0"
>
  Button
</sbb-navigation-button>
`;
/* end snapshot sbb-navigation-button renders DOM */

snapshots["sbb-navigation-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-navigation-button">
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="dash-small"
    role="img"
  >
  </sbb-icon>
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-navigation-button renders Shadow DOM */

snapshots["sbb-navigation-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Button"
    }
  ]
}
</p>
`;
/* end snapshot sbb-navigation-button renders A11y tree Chrome */

snapshots["sbb-navigation-button renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Button"
    }
  ]
}
</p>
`;
/* end snapshot sbb-navigation-button renders A11y tree Firefox */

