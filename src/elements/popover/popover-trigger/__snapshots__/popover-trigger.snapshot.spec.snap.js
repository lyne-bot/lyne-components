/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-popover-trigger renders DOM"] = 
`<sbb-popover-trigger
  data-action=""
  data-button=""
  tabindex="0"
>
</sbb-popover-trigger>
`;
/* end snapshot sbb-popover-trigger renders DOM */

snapshots["sbb-popover-trigger renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-popover-trigger">
  <slot>
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="circle-information-small"
      role="img"
    >
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-popover-trigger renders Shadow DOM */

snapshots["sbb-popover-trigger renders with custom content DOM"] = 
`<sbb-popover-trigger
  data-action=""
  data-button=""
  tabindex="0"
>
  Custom Content
</sbb-popover-trigger>
`;
/* end snapshot sbb-popover-trigger renders with custom content DOM */

snapshots["sbb-popover-trigger renders with custom content Shadow DOM"] = 
`<span class="sbb-action-base sbb-popover-trigger">
  <slot>
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="circle-information-small"
      role="img"
    >
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-popover-trigger renders with custom content Shadow DOM */

snapshots["sbb-popover-trigger renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-popover-trigger renders A11y tree Chrome */

snapshots["sbb-popover-trigger renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-popover-trigger renders A11y tree Firefox */

