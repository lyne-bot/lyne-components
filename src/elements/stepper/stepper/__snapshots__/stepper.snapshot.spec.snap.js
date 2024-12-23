/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-stepper renders DOM"] = 
`<sbb-stepper
  data-disable-animation=""
  orientation="horizontal"
  selected-index="0"
  size="m"
>
  <sbb-step-label
    aria-controls="sbb-step-0"
    data-action=""
    data-button=""
    data-orientation="horizontal"
    data-selected=""
    data-size="m"
    id="sbb-step-label-0"
    role="tab"
    slot="step-label"
    tabindex="0"
  >
    Test step label 1
  </sbb-step-label>
  <sbb-step
    aria-labelledby="sbb-step-label-0"
    data-orientation="horizontal"
    data-selected=""
    id="sbb-step-0"
    role="tabpanel"
    slot="step"
  >
    Test step content 1
  </sbb-step>
  <sbb-step-label
    aria-controls="sbb-step-1"
    data-action=""
    data-button=""
    data-orientation="horizontal"
    data-size="m"
    id="sbb-step-label-1"
    role="tab"
    slot="step-label"
    tabindex="-1"
  >
    Test step label 2
  </sbb-step-label>
  <sbb-step
    aria-labelledby="sbb-step-label-1"
    data-orientation="horizontal"
    id="sbb-step-1"
    role="tabpanel"
    slot="step"
  >
    Test step content 2
  </sbb-step>
  <sbb-step-label
    aria-controls="sbb-step-2"
    data-action=""
    data-button=""
    data-disabled=""
    data-orientation="horizontal"
    data-size="m"
    disabled=""
    id="sbb-step-label-2"
    role="tab"
    slot="step-label"
    tabindex="-1"
  >
    Test step label 3
  </sbb-step-label>
  <sbb-step
    aria-labelledby="sbb-step-label-2"
    data-orientation="horizontal"
    id="sbb-step-2"
    role="tabpanel"
    slot="step"
  >
    Test step content 3
  </sbb-step>
  <sbb-step-label
    data-action=""
    data-button=""
    id="sbb-step-label-3"
    role="tab"
    slot="step-label"
    tabindex="-1"
  >
    Test step label 4
  </sbb-step-label>
</sbb-stepper>
`;
/* end snapshot sbb-stepper renders DOM */

snapshots["sbb-stepper renders Shadow DOM"] = 
`<div class="sbb-stepper">
  <div
    class="sbb-stepper__labels"
    role="tablist"
  >
    <slot name="step-label">
    </slot>
  </div>
  <div class="sbb-stepper__steps">
    <slot name="step">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-stepper renders Shadow DOM */

snapshots["sbb-stepper renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "tab",
      "name": "Test step label 1",
      "selected": true
    },
    {
      "role": "tab",
      "name": "Test step label 2"
    },
    {
      "role": "tab",
      "name": "Test step label 3",
      "disabled": true
    },
    {
      "role": "tab",
      "name": "Test step label 4"
    },
    {
      "role": "text",
      "name": "Test step content 1"
    }
  ]
}
</p>
`;
/* end snapshot sbb-stepper renders A11y tree Chrome */

snapshots["sbb-stepper renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "tab",
      "name": "1 Test step label 1",
      "selected": true
    },
    {
      "role": "tab",
      "name": "2 Test step label 2"
    },
    {
      "role": "tab",
      "name": "3 Test step label 3",
      "disabled": true
    },
    {
      "role": "tab",
      "name": "4 Test step label 4"
    },
    {
      "role": "text leaf",
      "name": "Test step content 1"
    },
    {
      "role": "tabpanel",
      "name": "2 Test step label 2"
    },
    {
      "role": "tabpanel",
      "name": "3 Test step label 3"
    }
  ]
}
</p>
`;
/* end snapshot sbb-stepper renders A11y tree Firefox */

