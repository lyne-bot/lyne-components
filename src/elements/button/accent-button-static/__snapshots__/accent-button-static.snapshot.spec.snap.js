/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-accent-button-static renders without icon DOM"] = 
`<sbb-accent-button-static
  data-action=""
  data-sbb-button=""
  data-slot-names="unnamed"
  disabled=""
  negative=""
  size="m"
>
  Label Text
</sbb-accent-button-static>
`;
/* end snapshot sbb-accent-button-static renders without icon DOM */

snapshots["sbb-accent-button-static renders without icon Shadow DOM"] = 
`<span class="sbb-accent-button-static sbb-action-base">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-accent-button-static renders without icon Shadow DOM */

snapshots["sbb-accent-button-static renders with slotted icon DOM"] = 
`<sbb-accent-button-static
  data-action=""
  data-sbb-button=""
  data-slot-names="icon unnamed"
  size="l"
>
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="chevron-small-left-small"
    role="img"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-accent-button-static>
`;
/* end snapshot sbb-accent-button-static renders with slotted icon DOM */

snapshots["sbb-accent-button-static renders with slotted icon Shadow DOM"] = 
`<span class="sbb-accent-button-static sbb-action-base">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-accent-button-static renders with slotted icon Shadow DOM */

snapshots["sbb-accent-button-static renders with slotted icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Label Text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-accent-button-static renders with slotted icon A11y tree Chrome */

snapshots["sbb-accent-button-static renders with slotted icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Label Text "
    }
  ]
}
</p>
`;
/* end snapshot sbb-accent-button-static renders with slotted icon A11y tree Firefox */

