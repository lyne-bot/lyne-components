/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-selection-expansion-panel renders - Dom"] = 
`<sbb-selection-expansion-panel
  data-has-card-badge=""
  data-has-selection-expansion-panel-label=""
  data-slot-names="badge content unnamed"
  data-state="closed"
>
  <sbb-card-badge
    color="charcoal"
    dir="ltr"
    role="text"
    slot="badge"
  >
    <span>
      %
    </span>
    <span>
      from CHF
    </span>
    <span>
      19.99
    </span>
  </sbb-card-badge>
  <sbb-checkbox-panel
    data-is-inside-selection-expansion-panel=""
    data-is-selection-expansion-panel-input=""
    data-slot-names="subtext suffix unnamed"
    tabindex="0"
  >
    Value one
    <span slot="subtext">
      Subtext
    </span>
    <span slot="suffix">
      Suffix
    </span>
  </sbb-checkbox-panel>
  <div slot="content">
    Inner content
  </div>
</sbb-selection-expansion-panel>
`;
/* end snapshot sbb-selection-expansion-panel renders - Dom */

snapshots["sbb-selection-expansion-panel renders - ShadowDom"] = 
`<div class="sbb-selection-expansion-panel">
  <div class="sbb-selection-expansion-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <div class="sbb-selection-expansion-panel__input">
    <slot>
    </slot>
    <sbb-screen-reader-only>
      , collapsed
    </sbb-screen-reader-only>
  </div>
  <div
    class="sbb-selection-expansion-panel__content--wrapper"
    inert=""
  >
    <div class="sbb-selection-expansion-panel__content">
      <sbb-divider
        aria-orientation="horizontal"
        orientation="horizontal"
        role="separator"
      >
      </sbb-divider>
      <slot name="content">
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-selection-expansion-panel renders - ShadowDom */

snapshots["sbb-selection-expansion-panel A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "%"
    },
    {
      "role": "text",
      "name": "from CHF"
    },
    {
      "role": "text",
      "name": "19.99"
    },
    {
      "role": "checkbox",
      "name": "​ Value one Suffix Subtext",
      "checked": false
    },
    {
      "role": "text",
      "name": ", collapsed"
    }
  ]
}
</p>
`;
/* end snapshot sbb-selection-expansion-panel A11y tree Chrome */

snapshots["sbb-selection-expansion-panel A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "%"
    },
    {
      "role": "text leaf",
      "name": "from CHF"
    },
    {
      "role": "text leaf",
      "name": "19.99"
    },
    {
      "role": "checkbox",
      "name": "​ Value one Suffix Subtext"
    },
    {
      "role": "text leaf",
      "name": ", collapsed"
    }
  ]
}
</p>
`;
/* end snapshot sbb-selection-expansion-panel A11y tree Firefox */

