/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-button renders a sbb-button without icon DOM"] = 
`<sbb-button
  data-action=""
  data-button=""
  data-sbb-button=""
  data-slot-names="unnamed"
  disabled=""
  form="formid"
  name="name"
  negative=""
  size="m"
  type="button"
  value="value"
>
  Label Text
</sbb-button>
`;
/* end snapshot sbb-button renders a sbb-button without icon DOM */

snapshots["sbb-button renders a sbb-button without icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-button renders a sbb-button without icon Shadow DOM */

snapshots["sbb-button renders a sbb-button with slotted icon DOM"] = 
`<sbb-button
  data-action=""
  data-button=""
  data-sbb-button=""
  data-slot-names="icon unnamed"
  size="l"
  tabindex="0"
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
</sbb-button>
`;
/* end snapshot sbb-button renders a sbb-button with slotted icon DOM */

snapshots["sbb-button renders a sbb-button with slotted icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-button renders a sbb-button with slotted icon Shadow DOM */

snapshots["sbb-button renders a sbb-button with slotted icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Label Text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-button renders a sbb-button with slotted icon A11y tree Chrome */

snapshots["sbb-button renders a sbb-button with slotted icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Label Text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-button renders a sbb-button with slotted icon A11y tree Firefox */

