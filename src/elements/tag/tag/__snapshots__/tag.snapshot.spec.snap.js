/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tag renders unchecked DOM"] = 
`<sbb-tag
  aria-label="Check to remove filters"
  aria-pressed="false"
  data-action=""
  data-button=""
  data-slot-names="unnamed"
  size="m"
  tabindex="0"
  value="all"
>
  All
</sbb-tag>
`;
/* end snapshot sbb-tag renders unchecked DOM */

snapshots["sbb-tag renders unchecked Shadow DOM"] = 
`<span class="sbb-action-base sbb-tag">
  <span class="sbb-tag--shift sbb-tag__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__text">
    <slot>
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__amount">
    <slot name="amount">
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-tag renders unchecked Shadow DOM */

snapshots["sbb-tag renders checked DOM"] = 
`<sbb-tag
  aria-pressed="true"
  checked=""
  data-action=""
  data-button=""
  data-slot-names="unnamed"
  size="m"
  tabindex="0"
  value="info"
>
  Info
</sbb-tag>
`;
/* end snapshot sbb-tag renders checked DOM */

snapshots["sbb-tag renders checked Shadow DOM"] = 
`<span class="sbb-action-base sbb-tag">
  <span class="sbb-tag--shift sbb-tag__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__text">
    <slot>
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__amount">
    <slot name="amount">
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-tag renders checked Shadow DOM */

snapshots["sbb-tag renders disabled with icon and amount DOM"] = 
`<sbb-tag
  amount="123"
  aria-pressed="false"
  data-action=""
  data-button=""
  data-slot-names="unnamed"
  disabled=""
  icon-name="circle-information-small"
  size="m"
  value="information"
>
  Info
</sbb-tag>
`;
/* end snapshot sbb-tag renders disabled with icon and amount DOM */

snapshots["sbb-tag renders disabled with icon and amount Shadow DOM"] = 
`<span class="sbb-action-base sbb-tag">
  <span class="sbb-tag--shift sbb-tag__icon">
    <slot name="icon">
      <sbb-icon
        aria-hidden="true"
        data-namespace="default"
        name="circle-information-small"
        role="img"
      >
      </sbb-icon>
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__text">
    <slot>
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__amount">
    <slot name="amount">
      123
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-tag renders disabled with icon and amount Shadow DOM */

snapshots["sbb-tag renders slotted icon and amount DOM"] = 
`<sbb-tag
  aria-pressed="false"
  data-action=""
  data-button=""
  data-slot-names="amount icon unnamed"
  size="m"
  tabindex="0"
  value="foo"
>
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="cross-small"
    role="img"
    slot="icon"
  >
  </sbb-icon>
  Info
  <span slot="amount">
    123
  </span>
</sbb-tag>
`;
/* end snapshot sbb-tag renders slotted icon and amount DOM */

snapshots["sbb-tag renders slotted icon and amount Shadow DOM"] = 
`<span class="sbb-action-base sbb-tag">
  <span class="sbb-tag--shift sbb-tag__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__text">
    <slot>
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__amount">
    <slot name="amount">
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-tag renders slotted icon and amount Shadow DOM */

snapshots["sbb-tag A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Label",
      "pressed": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-tag A11y tree Chrome */

snapshots["sbb-tag A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "toggle button",
      "name": "Label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tag A11y tree Firefox */

