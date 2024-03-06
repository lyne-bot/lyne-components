/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-selection-panel renders - Dom"] =
`<sbb-selection-panel
  data-slot-names="badge content unnamed"
  data-state="closed"
  disable-animation=""
>
  <sbb-card-badge slot="badge">
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
  <sbb-checkbox
    data-has-selection-panel-label=""
    data-is-inside-selection-panel=""
    data-is-selection-panel-input=""
    data-slot-names="subtext suffix unnamed"
    icon-placement="end"
    size="m"
    tabindex="0"
  >
    Value one
    <span slot="subtext">
      Subtext
    </span>
    <span slot="suffix">
      Suffix
    </span>
  </sbb-checkbox>
  <div slot="content">
    Inner content
  </div>
</sbb-selection-panel>
`;
/* end snapshot sbb-selection-panel renders - Dom */

snapshots["sbb-selection-panel renders - ShadowDom"] =
`<div class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <div class="sbb-selection-panel__input">
    <slot>
    </slot>
  </div>
  <div
    class="sbb-selection-panel__content--wrapper"
    inert=""
  >
    <div class="sbb-selection-panel__content">
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
/* end snapshot sbb-selection-panel renders - ShadowDom */

snapshots["sbb-selection-panel A11y tree Chrome"] =
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
      "name": " "
    },
    {
      "role": "text",
      "name": "from CHF"
    },
    {
      "role": "text",
      "name": " "
    },
    {
      "role": "text",
      "name": "19.99"
    },
    {
      "role": "checkbox",
      "name": "​ Value one Suffix Subtext , collapsed",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-selection-panel A11y tree Chrome */

snapshots["sbb-selection-panel A11y tree Firefox"] =
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
      "name": "​ Value one Suffix Subtext , collapsed"
    }
  ]
}
</p>
`;
/* end snapshot sbb-selection-panel A11y tree Firefox */

snapshots["sbb-selection-panel A11y tree Safari"] =
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
      "name": "​ Value one Suffix Subtext , collapsed",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-selection-panel A11y tree Safari */

