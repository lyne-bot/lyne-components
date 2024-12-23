/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-datepicker-next-day renders DOM"] = 
`<sbb-datepicker-next-day
  aria-disabled="true"
  aria-label="Next day"
  data-action=""
  data-button=""
  data-disabled=""
  slot="suffix"
>
</sbb-datepicker-next-day>
`;
/* end snapshot sbb-datepicker-next-day renders DOM */

snapshots["sbb-datepicker-next-day renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-datepicker-next-day">
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="chevron-small-right-small"
    role="img"
  >
  </sbb-icon>
</span>
`;
/* end snapshot sbb-datepicker-next-day renders Shadow DOM */

snapshots["sbb-datepicker-next-day renders with connected datepicker DOM"] = 
`<sbb-datepicker-next-day
  aria-label="Change to the next day, currently selected December 31, 2022."
  data-action=""
  data-button=""
  date-picker="datepicker"
  slot="suffix"
  tabindex="0"
>
</sbb-datepicker-next-day>
`;
/* end snapshot sbb-datepicker-next-day renders with connected datepicker DOM */

snapshots["sbb-datepicker-next-day renders with connected datepicker Shadow DOM"] = 
`<span class="sbb-action-base sbb-datepicker-next-day">
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="chevron-small-right-small"
    role="img"
  >
  </sbb-icon>
</span>
`;
/* end snapshot sbb-datepicker-next-day renders with connected datepicker Shadow DOM */

snapshots["sbb-datepicker-next-day renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Next day",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker-next-day renders A11y tree Chrome */

snapshots["sbb-datepicker-next-day renders with connected datepicker A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "textbox",
      "name": "DD.MM.YYYY",
      "value": "Sa, 31.12.2022"
    },
    {
      "role": "text",
      "name": "Date changed to Saturday, 31.12.2022"
    },
    {
      "role": "button",
      "name": "Change to the next day, currently selected December 31, 2022."
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker-next-day renders with connected datepicker A11y tree Chrome */

snapshots["sbb-datepicker-next-day renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Next day",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker-next-day renders A11y tree Firefox */

snapshots["sbb-datepicker-next-day renders with connected datepicker A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "textbox",
      "name": "DD.MM.YYYY",
      "value": "Sa, 31.12.2022"
    },
    {
      "role": "text leaf",
      "name": "Date changed to Saturday, 31.12.2022"
    },
    {
      "role": "button",
      "name": "Change to the next day, currently selected December 31, 2022."
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker-next-day renders with connected datepicker A11y tree Firefox */

