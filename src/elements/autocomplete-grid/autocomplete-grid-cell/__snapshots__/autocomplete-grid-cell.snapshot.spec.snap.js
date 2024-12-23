/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete-grid-cell renders DOM"] = 
`<sbb-autocomplete-grid-cell role="gridcell">
  <sbb-autocomplete-grid-button
    data-action=""
    data-button=""
    icon-name="pie-small"
    id="sbb-autocomplete-grid-button-1"
    role="button"
  >
  </sbb-autocomplete-grid-button>
</sbb-autocomplete-grid-cell>
`;
/* end snapshot sbb-autocomplete-grid-cell renders DOM */

snapshots["sbb-autocomplete-grid-cell renders Shadow DOM"] = 
`<span class="sbb-autocomplete-grid-cell">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-autocomplete-grid-cell renders Shadow DOM */

snapshots["sbb-autocomplete-grid-cell renders A11y tree Chrome"] = 
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
/* end snapshot sbb-autocomplete-grid-cell renders A11y tree Chrome */

snapshots["sbb-autocomplete-grid-cell renders A11y tree Firefox"] = 
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
/* end snapshot sbb-autocomplete-grid-cell renders A11y tree Firefox */

