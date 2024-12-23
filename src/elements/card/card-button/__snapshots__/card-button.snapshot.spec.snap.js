/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-card-button renders DOM"] = 
`<sbb-card
  color="white"
  data-action-role="button"
  data-has-action=""
  data-has-active-action=""
  size="m"
>
  <sbb-card-button
    active=""
    data-action=""
    data-button=""
    slot="action"
    tabindex="0"
  >
    Click me
  </sbb-card-button>
  Content
</sbb-card>
`;
/* end snapshot sbb-card-button renders DOM */

snapshots["sbb-card-button renders Shadow DOM"] = 
`<span class="sbb-card">
  <slot name="action">
  </slot>
  <span class="sbb-card__wrapper">
    <slot>
    </slot>
  </span>
  <span class="sbb-card__badge-wrapper">
    <slot name="badge">
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-card-button renders Shadow DOM */

snapshots["sbb-card-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Click me"
    },
    {
      "role": "text",
      "name": "Content"
    }
  ]
}
</p>
`;
/* end snapshot sbb-card-button renders A11y tree Chrome */

snapshots["sbb-card-button renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Click me"
    },
    {
      "role": "text leaf",
      "name": "Content"
    }
  ]
}
</p>
`;
/* end snapshot sbb-card-button renders A11y tree Firefox */

