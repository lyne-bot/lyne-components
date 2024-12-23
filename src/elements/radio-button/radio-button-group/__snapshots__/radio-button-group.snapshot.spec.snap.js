/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-radio-button-group renders DOM"] = 
`<sbb-radio-button-group
  data-slot-names="unnamed"
  name="group-1"
  orientation="horizontal"
  role="radiogroup"
  value="2"
>
  <sbb-radio-button
    data-slot-names="unnamed"
    name="group-1"
    size="m"
    value="1"
  >
    1
  </sbb-radio-button>
  <sbb-radio-button
    data-checked=""
    data-slot-names="unnamed"
    name="group-1"
    size="m"
    tabindex="0"
    value="2"
  >
    2
  </sbb-radio-button>
  <sbb-radio-button
    data-slot-names="unnamed"
    name="group-1"
    size="m"
    value="3"
  >
    3
  </sbb-radio-button>
</sbb-radio-button-group>
`;
/* end snapshot sbb-radio-button-group renders DOM */

snapshots["sbb-radio-button-group renders Shadow DOM"] = 
`<div class="sbb-radio-group">
  <slot>
  </slot>
</div>
<div class="sbb-radio-group__error">
  <slot name="error">
  </slot>
</div>
`;
/* end snapshot sbb-radio-button-group renders Shadow DOM */

snapshots["sbb-radio-button-group renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "1",
      "checked": false
    },
    {
      "role": "radio",
      "name": "2",
      "checked": true
    },
    {
      "role": "radio",
      "name": "3",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-group renders A11y tree Chrome */

snapshots["sbb-radio-button-group renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "1"
    },
    {
      "role": "radio",
      "name": "2",
      "checked": true
    },
    {
      "role": "radio",
      "name": "3"
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-group renders A11y tree Firefox */

