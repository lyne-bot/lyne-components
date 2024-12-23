/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete-grid-button renders DOM"] = 
`<sbb-autocomplete-grid-button
  data-action=""
  data-button=""
  icon-name="pie-small"
  id="sbb-autocomplete-grid-button-1"
  role="button"
>
</sbb-autocomplete-grid-button>
`;
/* end snapshot sbb-autocomplete-grid-button renders DOM */

snapshots["sbb-autocomplete-grid-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-autocomplete-grid-button">
  <slot name="icon">
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="pie-small"
      role="img"
    >
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-autocomplete-grid-button renders Shadow DOM */

snapshots["sbb-autocomplete-grid-button renders disabled DOM"] = 
`<sbb-autocomplete-grid-button
  aria-disabled="true"
  data-action=""
  data-button=""
  disabled=""
  icon-name="pie-small"
  id="sbb-autocomplete-grid-button-3"
  role="button"
>
</sbb-autocomplete-grid-button>
`;
/* end snapshot sbb-autocomplete-grid-button renders disabled DOM */

snapshots["sbb-autocomplete-grid-button renders disabled Shadow DOM"] = 
`<span class="sbb-action-base sbb-autocomplete-grid-button">
  <slot name="icon">
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="pie-small"
      role="img"
    >
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-autocomplete-grid-button renders disabled Shadow DOM */

snapshots["sbb-autocomplete-grid-button renders negative without icon DOM"] = 
`<sbb-autocomplete-grid-button
  data-action=""
  data-button=""
  id="sbb-autocomplete-grid-button-5"
  negative=""
  role="button"
>
</sbb-autocomplete-grid-button>
`;
/* end snapshot sbb-autocomplete-grid-button renders negative without icon DOM */

snapshots["sbb-autocomplete-grid-button renders negative without icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-autocomplete-grid-button">
  <slot name="icon">
  </slot>
</span>
`;
/* end snapshot sbb-autocomplete-grid-button renders negative without icon Shadow DOM */

snapshots["sbb-autocomplete-grid-button A11y tree Chrome"] = 
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
/* end snapshot sbb-autocomplete-grid-button A11y tree Chrome */

snapshots["sbb-autocomplete-grid-button A11y tree Firefox"] = 
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
/* end snapshot sbb-autocomplete-grid-button A11y tree Firefox */

