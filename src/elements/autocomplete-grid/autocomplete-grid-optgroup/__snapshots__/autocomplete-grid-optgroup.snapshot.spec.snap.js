/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete-grid-optgroup renders Safari DOM"] = 
`<sbb-autocomplete-grid-optgroup label="Group">
  <sbb-autocomplete-grid-row
    id="sbb-autocomplete-grid-row-1"
    role="row"
  >
    <sbb-autocomplete-grid-option
      aria-selected="false"
      data-group-label="Group"
      data-slot-names="unnamed"
      id="sbb-autocomplete-grid-option-0"
      role="gridcell"
      value="1"
    >
      Option 1
    </sbb-autocomplete-grid-option>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row
    id="sbb-autocomplete-grid-row-2"
    role="row"
  >
    <sbb-autocomplete-grid-option
      aria-selected="false"
      data-group-label="Group"
      data-slot-names="unnamed"
      id="sbb-autocomplete-grid-option-1"
      role="gridcell"
      value="2"
    >
      Option 2
    </sbb-autocomplete-grid-option>
  </sbb-autocomplete-grid-row>
</sbb-autocomplete-grid-optgroup>
`;
/* end snapshot sbb-autocomplete-grid-optgroup renders Safari DOM */

snapshots["sbb-autocomplete-grid-optgroup renders Safari Shadow DOM"] = 
`<div class="sbb-optgroup__divider">
  <sbb-divider
    aria-orientation="horizontal"
    orientation="horizontal"
    role="separator"
  >
  </sbb-divider>
</div>
<div
  aria-hidden="true"
  class="sbb-optgroup__label"
>
  <div class="sbb-optgroup__icon-space">
  </div>
  <span>
    Group
  </span>
</div>
<slot>
</slot>
`;
/* end snapshot sbb-autocomplete-grid-optgroup renders Safari Shadow DOM */

snapshots["sbb-autocomplete-grid-optgroup renders Chrome-Firefox DOM"] = 
`<sbb-autocomplete-grid-optgroup
  aria-label="Group"
  label="Group"
  role="group"
>
  <sbb-autocomplete-grid-row
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
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row
    id="sbb-autocomplete-grid-row-2"
    role="row"
  >
    <sbb-autocomplete-grid-option
      aria-selected="false"
      data-slot-names="unnamed"
      id="sbb-autocomplete-grid-option-1"
      role="gridcell"
      value="2"
    >
      Option 2
    </sbb-autocomplete-grid-option>
  </sbb-autocomplete-grid-row>
</sbb-autocomplete-grid-optgroup>
`;
/* end snapshot sbb-autocomplete-grid-optgroup renders Chrome-Firefox DOM */

snapshots["sbb-autocomplete-grid-optgroup renders Chrome-Firefox Shadow DOM"] = 
`<div class="sbb-optgroup__divider">
  <sbb-divider
    aria-orientation="horizontal"
    orientation="horizontal"
    role="separator"
  >
  </sbb-divider>
</div>
<div
  aria-hidden="true"
  class="sbb-optgroup__label"
>
  <div class="sbb-optgroup__icon-space">
  </div>
  <span>
    Group
  </span>
</div>
<slot>
</slot>
`;
/* end snapshot sbb-autocomplete-grid-optgroup renders Chrome-Firefox Shadow DOM */

snapshots["sbb-autocomplete-grid-optgroup renders Chrome-Firefox A11y tree Chrome"] = 
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
      "role": "text",
      "name": "Option 2"
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid-optgroup renders Chrome-Firefox A11y tree Chrome */

snapshots["sbb-autocomplete-grid-optgroup renders Chrome-Firefox A11y tree Firefox"] = 
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
      "role": "text leaf",
      "name": "Option 2"
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid-optgroup renders Chrome-Firefox A11y tree Firefox */

