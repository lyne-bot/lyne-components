/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-accordion renders DOM"] = 
`<sbb-accordion size="l">
  <sbb-expansion-panel
    data-accordion=""
    data-accordion-first=""
    size="l"
  >
    <sbb-expansion-panel-header
      aria-controls="sbb-expansion-panel-content-1"
      aria-expanded="false"
      data-action=""
      data-button=""
      data-size="l"
      data-slot-names="unnamed"
      id="sbb-expansion-panel-header-1"
      slot="header"
      tabindex="0"
    >
      Header 1
    </sbb-expansion-panel-header>
    <sbb-expansion-panel-content
      aria-hidden="true"
      aria-labelledby="sbb-expansion-panel-header-1"
      data-size="l"
      id="sbb-expansion-panel-content-1"
      role="region"
      slot="content"
    >
      Content 1
    </sbb-expansion-panel-content>
  </sbb-expansion-panel>
  <sbb-expansion-panel
    data-accordion=""
    data-accordion-last=""
    size="l"
  >
    <sbb-expansion-panel-header
      aria-controls="sbb-expansion-panel-content-2"
      aria-expanded="false"
      data-action=""
      data-button=""
      data-size="l"
      data-slot-names="unnamed"
      id="sbb-expansion-panel-header-2"
      slot="header"
      tabindex="0"
    >
      Header 2
    </sbb-expansion-panel-header>
    <sbb-expansion-panel-content
      aria-hidden="true"
      aria-labelledby="sbb-expansion-panel-header-2"
      data-size="l"
      id="sbb-expansion-panel-content-2"
      role="region"
      slot="content"
    >
      Content 2
    </sbb-expansion-panel-content>
  </sbb-expansion-panel>
</sbb-accordion>
`;
/* end snapshot sbb-accordion renders DOM */

snapshots["sbb-accordion renders Shadow DOM"] = 
`<div class="sbb-accordion">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-accordion renders Shadow DOM */

snapshots["sbb-accordion renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Header 1"
    },
    {
      "role": "button",
      "name": "Header 2"
    }
  ]
}
</p>
`;
/* end snapshot sbb-accordion renders A11y tree Chrome */

snapshots["sbb-accordion renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Header 1"
    },
    {
      "role": "button",
      "name": "Header 2"
    }
  ]
}
</p>
`;
/* end snapshot sbb-accordion renders A11y tree Firefox */

