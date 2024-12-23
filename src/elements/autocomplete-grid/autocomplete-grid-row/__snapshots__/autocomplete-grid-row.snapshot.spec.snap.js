/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete-grid-row renders DOM"] = 
`<sbb-autocomplete-grid-row
  id="sbb-autocomplete-grid-row-1"
  role="row"
>
  <sbb-autocomplete-grid-option
    aria-selected="false"
    data-slot-names="unnamed"
    id="sbb-autocomplete-grid-option-0"
    role="gridcell"
    value="1"
  >
    Option 1
  </sbb-autocomplete-grid-option>
  <sbb-autocomplete-grid-cell role="gridcell">
    <sbb-autocomplete-grid-button
      data-action=""
      data-button=""
      icon-name="pie-small"
      id="sbb-autocomplete-grid-button-1"
      role="button"
    >
    </sbb-autocomplete-grid-button>
  </sbb-autocomplete-grid-cell>
</sbb-autocomplete-grid-row>
`;
/* end snapshot sbb-autocomplete-grid-row renders DOM */

snapshots["sbb-autocomplete-grid-row renders Shadow DOM"] = 
`<span class="sbb-autocomplete-grid-row">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-autocomplete-grid-row renders Shadow DOM */

snapshots["sbb-autocomplete-grid-row renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Option 1"
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid-row renders A11y tree Chrome */

snapshots["sbb-autocomplete-grid-row renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Option 1"
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid-row renders A11y tree Firefox */

