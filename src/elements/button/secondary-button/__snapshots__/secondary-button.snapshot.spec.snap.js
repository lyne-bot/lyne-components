/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-secondary-button renders a sbb-secondary-button without icon DOM"] = 
`<sbb-secondary-button
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
</sbb-secondary-button>
`;
/* end snapshot sbb-secondary-button renders a sbb-secondary-button without icon DOM */

snapshots["sbb-secondary-button renders a sbb-secondary-button without icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-secondary-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-secondary-button renders a sbb-secondary-button without icon Shadow DOM */

snapshots["sbb-secondary-button renders a sbb-secondary-button with slotted icon DOM"] = 
`<sbb-secondary-button
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
</sbb-secondary-button>
`;
/* end snapshot sbb-secondary-button renders a sbb-secondary-button with slotted icon DOM */

snapshots["sbb-secondary-button renders a sbb-secondary-button with slotted icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-secondary-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-secondary-button renders a sbb-secondary-button with slotted icon Shadow DOM */

snapshots["sbb-secondary-button renders a sbb-secondary-button with slotted icon A11y tree Chrome"] = 
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
/* end snapshot sbb-secondary-button renders a sbb-secondary-button with slotted icon A11y tree Chrome */

snapshots["sbb-secondary-button renders a sbb-secondary-button with slotted icon A11y tree Firefox"] = 
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
/* end snapshot sbb-secondary-button renders a sbb-secondary-button with slotted icon A11y tree Firefox */

