/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-block-link-button renders DOM"] = 
`<sbb-block-link-button
  data-action=""
  data-button=""
  data-sbb-link=""
  data-slot-names="icon unnamed"
  form="formid"
  icon-placement="end"
  name="name"
  negative=""
  size="m"
  tabindex="0"
  type="submit"
>
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="chevron-small-right-small"
    role="img"
    slot="icon"
  >
  </sbb-icon>
  Travelcards & tickets.
</sbb-block-link-button>
`;
/* end snapshot sbb-block-link-button renders DOM */

snapshots["sbb-block-link-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-block-link-button">
  <span class="sbb-link__icon">
    <slot name="icon">
    </slot>
  </span>
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-block-link-button renders Shadow DOM */

snapshots["sbb-block-link-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Travelcards & tickets."
    }
  ]
}
</p>
`;
/* end snapshot sbb-block-link-button renders A11y tree Chrome */

snapshots["sbb-block-link-button renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Travelcards & tickets."
    }
  ]
}
</p>
`;
/* end snapshot sbb-block-link-button renders A11y tree Firefox */

