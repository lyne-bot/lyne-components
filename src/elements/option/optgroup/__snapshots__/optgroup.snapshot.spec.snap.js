/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-optgroup autocomplete renders Safari DOM"] = 
`<sbb-optgroup
  data-variant="autocomplete"
  label="Label"
>
  <sbb-option
    aria-selected="false"
    data-group-label="Label"
    data-slot-names="unnamed"
    data-variant="autocomplete"
    id="sbb-option-0"
    role="option"
    value="1"
  >
    1
  </sbb-option>
  <sbb-option
    aria-selected="false"
    data-group-label="Label"
    data-slot-names="unnamed"
    data-variant="autocomplete"
    id="sbb-option-1"
    role="option"
    value="2"
  >
    2
  </sbb-option>
</sbb-optgroup>
`;
/* end snapshot sbb-optgroup autocomplete renders Safari DOM */

snapshots["sbb-optgroup autocomplete renders Safari Shadow DOM"] = 
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
    Label
  </span>
</div>
<slot>
</slot>
`;
/* end snapshot sbb-optgroup autocomplete renders Safari Shadow DOM */

snapshots["sbb-optgroup autocomplete renders disabled Safari DOM"] = 
`<sbb-optgroup
  data-variant="autocomplete"
  disabled=""
  label="Label"
>
  <sbb-option
    aria-disabled="true"
    aria-selected="false"
    data-group-disabled=""
    data-group-label="Label"
    data-slot-names="unnamed"
    data-variant="autocomplete"
    id="sbb-option-4"
    role="option"
    value="1"
  >
    1
  </sbb-option>
  <sbb-option
    aria-disabled="true"
    aria-selected="false"
    data-group-disabled=""
    data-group-label="Label"
    data-slot-names="unnamed"
    data-variant="autocomplete"
    id="sbb-option-5"
    role="option"
    value="2"
  >
    2
  </sbb-option>
</sbb-optgroup>
`;
/* end snapshot sbb-optgroup autocomplete renders disabled Safari DOM */

snapshots["sbb-optgroup autocomplete renders disabled Safari Shadow DOM"] = 
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
    Label
  </span>
</div>
<slot>
</slot>
`;
/* end snapshot sbb-optgroup autocomplete renders disabled Safari Shadow DOM */

snapshots["sbb-optgroup autocomplete renders Chrome-Firefox DOM"] = 
`<sbb-optgroup
  aria-label="Label"
  data-variant="autocomplete"
  label="Label"
  role="group"
>
  <sbb-option
    aria-selected="false"
    data-slot-names="unnamed"
    data-variant="autocomplete"
    id="sbb-option-0"
    role="option"
    value="1"
  >
    1
  </sbb-option>
  <sbb-option
    aria-selected="false"
    data-slot-names="unnamed"
    data-variant="autocomplete"
    id="sbb-option-1"
    role="option"
    value="2"
  >
    2
  </sbb-option>
</sbb-optgroup>
`;
/* end snapshot sbb-optgroup autocomplete renders Chrome-Firefox DOM */

snapshots["sbb-optgroup autocomplete renders Chrome-Firefox Shadow DOM"] = 
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
    Label
  </span>
</div>
<slot>
</slot>
`;
/* end snapshot sbb-optgroup autocomplete renders Chrome-Firefox Shadow DOM */

snapshots["sbb-optgroup autocomplete renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "combobox",
      "name": "",
      "expanded": true,
      "focused": true,
      "autocomplete": "list",
      "haspopup": "listbox"
    },
    {
      "role": "listbox",
      "name": "",
      "orientation": "vertical"
    }
  ]
}
</p>
`;
/* end snapshot sbb-optgroup autocomplete renders A11y tree Chrome */

snapshots["sbb-optgroup autocomplete renders disabled Chrome-Firefox DOM"] = 
`<sbb-optgroup
  aria-disabled="true"
  aria-label="Label"
  data-variant="autocomplete"
  disabled=""
  label="Label"
  role="group"
>
  <sbb-option
    aria-disabled="true"
    aria-selected="false"
    data-group-disabled=""
    data-slot-names="unnamed"
    data-variant="autocomplete"
    id="sbb-option-6"
    role="option"
    value="1"
  >
    1
  </sbb-option>
  <sbb-option
    aria-disabled="true"
    aria-selected="false"
    data-group-disabled=""
    data-slot-names="unnamed"
    data-variant="autocomplete"
    id="sbb-option-7"
    role="option"
    value="2"
  >
    2
  </sbb-option>
</sbb-optgroup>
`;
/* end snapshot sbb-optgroup autocomplete renders disabled Chrome-Firefox DOM */

snapshots["sbb-optgroup autocomplete renders disabled Chrome-Firefox Shadow DOM"] = 
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
    Label
  </span>
</div>
<slot>
</slot>
`;
/* end snapshot sbb-optgroup autocomplete renders disabled Chrome-Firefox Shadow DOM */

snapshots["sbb-optgroup autocomplete renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "combobox",
      "name": "",
      "expanded": true,
      "focused": true,
      "autocomplete": "list",
      "haspopup": "listbox"
    },
    {
      "role": "listbox",
      "name": "",
      "children": [
        {
          "role": "option",
          "name": "1"
        },
        {
          "role": "option",
          "name": "2"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-optgroup autocomplete renders A11y tree Firefox */

