/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-chip renders DOM"] = 
`<sbb-chip
  role="row"
  value="Value"
>
</sbb-chip>
`;
/* end snapshot sbb-chip renders DOM */

snapshots["sbb-chip renders Shadow DOM"] = 
`<div class="sbb-chip">
  <div
    class="sbb-chip__label-wrapper"
    role="gridcell"
    tabindex="-1"
  >
    <span class="sbb-chip__label">
      <slot>
        Value
      </slot>
    </span>
  </div>
  <div role="gridcell">
    <sbb-mini-button
      aria-label="Remove Value"
      class="sbb-chip__delete"
      data-action=""
      data-button=""
      icon-name="cross-tiny-small"
      tabindex="0"
    >
    </sbb-mini-button>
  </div>
</div>
`;
/* end snapshot sbb-chip renders Shadow DOM */

snapshots["sbb-chip renders disabled DOM"] = 
`<sbb-chip
  disabled=""
  role="row"
  value="Value"
>
</sbb-chip>
`;
/* end snapshot sbb-chip renders disabled DOM */

snapshots["sbb-chip renders disabled Shadow DOM"] = 
`<div class="sbb-chip">
  <div
    class="sbb-chip__label-wrapper"
    role="gridcell"
  >
    <span class="sbb-chip__label">
      <slot>
        Value
      </slot>
    </span>
  </div>
  <div role="gridcell">
    <sbb-mini-button
      aria-label="Remove Value"
      class="sbb-chip__delete"
      data-action=""
      data-button=""
      icon-name="cross-tiny-small"
      tabindex="0"
    >
    </sbb-mini-button>
  </div>
</div>
`;
/* end snapshot sbb-chip renders disabled Shadow DOM */

snapshots["sbb-chip renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "gridcell",
      "name": "Value"
    },
    {
      "role": "button",
      "name": "Remove Value"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders A11y tree Chrome */

snapshots["sbb-chip renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "section",
      "name": "",
      "children": [
        {
          "role": "text leaf",
          "name": "Value"
        }
      ]
    },
    {
      "role": "button",
      "name": "Remove Value"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders A11y tree Firefox */

snapshots["sbb-chip renders disabled A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Value"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders disabled A11y tree Chrome */

snapshots["sbb-chip renders disabled A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Value"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders disabled A11y tree Firefox */

