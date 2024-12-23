/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-expansion-panel renders DOM"] = 
`<sbb-expansion-panel size="l">
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
    Header
  </sbb-expansion-panel-header>
  <sbb-expansion-panel-content
    aria-hidden="true"
    aria-labelledby="sbb-expansion-panel-header-1"
    data-size="l"
    id="sbb-expansion-panel-content-1"
    role="region"
    slot="content"
  >
    Content
  </sbb-expansion-panel-content>
</sbb-expansion-panel>
`;
/* end snapshot sbb-expansion-panel renders DOM */

snapshots["sbb-expansion-panel renders Shadow DOM"] = 
`<div class="sbb-expansion-panel">
  <div class="sbb-expansion-panel__header">
    <slot name="header">
    </slot>
  </div>
  <div class="sbb-expansion-panel__content-wrapper">
    <span class="sbb-expansion-panel__content">
      <slot name="content">
      </slot>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-expansion-panel renders Shadow DOM */

snapshots["sbb-expansion-panel renders size s DOM"] = 
`<sbb-expansion-panel size="s">
  <sbb-expansion-panel-header
    aria-controls="sbb-expansion-panel-content-3"
    aria-expanded="false"
    data-action=""
    data-button=""
    data-size="s"
    data-slot-names="unnamed"
    id="sbb-expansion-panel-header-3"
    slot="header"
    tabindex="0"
  >
    Header
  </sbb-expansion-panel-header>
  <sbb-expansion-panel-content
    aria-hidden="true"
    aria-labelledby="sbb-expansion-panel-header-3"
    data-size="s"
    id="sbb-expansion-panel-content-3"
    role="region"
    slot="content"
  >
    Content
  </sbb-expansion-panel-content>
</sbb-expansion-panel>
`;
/* end snapshot sbb-expansion-panel renders size s DOM */

snapshots["sbb-expansion-panel renders size s Shadow DOM"] = 
`<div class="sbb-expansion-panel">
  <div class="sbb-expansion-panel__header">
    <slot name="header">
    </slot>
  </div>
  <div class="sbb-expansion-panel__content-wrapper">
    <span class="sbb-expansion-panel__content">
      <slot name="content">
      </slot>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-expansion-panel renders size s Shadow DOM */

snapshots["sbb-expansion-panel renders with level set DOM"] = 
`<sbb-expansion-panel
  size="l"
  title-level="4"
>
  <sbb-expansion-panel-header
    aria-controls="sbb-expansion-panel-content-5"
    aria-expanded="false"
    data-action=""
    data-button=""
    data-size="l"
    data-slot-names="unnamed"
    id="sbb-expansion-panel-header-5"
    slot="header"
    tabindex="0"
  >
    Header
  </sbb-expansion-panel-header>
  <sbb-expansion-panel-content
    aria-hidden="true"
    aria-labelledby="sbb-expansion-panel-header-5"
    data-size="l"
    id="sbb-expansion-panel-content-5"
    role="region"
    slot="content"
  >
    Content
  </sbb-expansion-panel-content>
</sbb-expansion-panel>
`;
/* end snapshot sbb-expansion-panel renders with level set DOM */

snapshots["sbb-expansion-panel renders with level set Shadow DOM"] = 
`<div class="sbb-expansion-panel">
  <h4 class="sbb-expansion-panel__header">
    <slot name="header">
    </slot>
  </h4>
  <div class="sbb-expansion-panel__content-wrapper">
    <span class="sbb-expansion-panel__content">
      <slot name="content">
      </slot>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-expansion-panel renders with level set Shadow DOM */

snapshots["sbb-expansion-panel renders with level set A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Header"
    }
  ]
}
</p>
`;
/* end snapshot sbb-expansion-panel renders with level set A11y tree Chrome */

snapshots["sbb-expansion-panel renders with level set A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Header"
    }
  ]
}
</p>
`;
/* end snapshot sbb-expansion-panel renders with level set A11y tree Firefox */

