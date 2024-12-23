/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-radio-button-panel should render unchecked DOM"] = 
`<sbb-radio-button-panel
  data-slot-names="subtext suffix unnamed"
  name="radio"
  size="m"
  tabindex="0"
  value="radio-value"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-radio-button-panel>
`;
/* end snapshot sbb-radio-button-panel should render unchecked DOM */

snapshots["sbb-radio-button-panel should render unchecked Shadow DOM"] = 
`<label class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-radio-button">
    <span class="sbb-radio-button__label-slot">
      <slot>
      </slot>
      <slot name="suffix">
      </slot>
    </span>
    <slot name="subtext">
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-radio-button-panel should render unchecked Shadow DOM */

snapshots["sbb-radio-button-panel should render checked DOM"] = 
`<sbb-radio-button-panel
  checked=""
  data-checked=""
  data-slot-names="subtext suffix unnamed"
  name="radio"
  size="m"
  tabindex="0"
  value="radio-value"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-radio-button-panel>
`;
/* end snapshot sbb-radio-button-panel should render checked DOM */

snapshots["sbb-radio-button-panel should render checked Shadow DOM"] = 
`<label class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-radio-button">
    <span class="sbb-radio-button__label-slot">
      <slot>
      </slot>
      <slot name="suffix">
      </slot>
    </span>
    <slot name="subtext">
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-radio-button-panel should render checked Shadow DOM */

snapshots["sbb-radio-button-panel should render unchecked A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label Suffix Subtext",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel should render unchecked A11y tree Chrome */

snapshots["sbb-radio-button-panel should render unchecked A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label Suffix Subtext"
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel should render unchecked A11y tree Firefox */

snapshots["sbb-radio-button-panel should render checked A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label Suffix Subtext",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel should render checked A11y tree Chrome */

snapshots["sbb-radio-button-panel should render checked A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label Suffix Subtext",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel should render checked A11y tree Firefox */

snapshots["sbb-radio-button-panel Disabled - A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label",
      "disabled": true,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel Disabled - A11y tree Chrome */

snapshots["sbb-radio-button-panel Disabled - A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel Disabled - A11y tree Firefox */

snapshots["sbb-radio-button-panel renders DOM"] = 
`<sbb-radio-button-panel
  data-slot-names="subtext suffix unnamed"
  name="radio"
  size="m"
  tabindex="0"
  value="radio-value"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-radio-button-panel>
`;
/* end snapshot sbb-radio-button-panel renders DOM */

snapshots["sbb-radio-button-panel renders Shadow DOM"] = 
`<label class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-radio-button">
    <span class="sbb-radio-button__label-slot">
      <slot>
      </slot>
      <slot name="suffix">
      </slot>
    </span>
    <slot name="subtext">
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-radio-button-panel renders Shadow DOM */

snapshots["sbb-radio-button-panel renders checked DOM"] = 
`<sbb-radio-button-panel
  checked=""
  data-checked=""
  data-slot-names="subtext suffix unnamed"
  name="radio"
  size="m"
  tabindex="0"
  value="radio-value"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-radio-button-panel>
`;
/* end snapshot sbb-radio-button-panel renders checked DOM */

snapshots["sbb-radio-button-panel renders checked Shadow DOM"] = 
`<label class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-radio-button">
    <span class="sbb-radio-button__label-slot">
      <slot>
      </slot>
      <slot name="suffix">
      </slot>
    </span>
    <slot name="subtext">
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-radio-button-panel renders checked Shadow DOM */

snapshots["sbb-radio-button-panel renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label Suffix Subtext",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders A11y tree Chrome */

snapshots["sbb-radio-button-panel renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label Suffix Subtext"
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders A11y tree Firefox */

snapshots["sbb-radio-button-panel renders checked A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label Suffix Subtext",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders checked A11y tree Chrome */

snapshots["sbb-radio-button-panel renders checked A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label Suffix Subtext",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders checked A11y tree Firefox */

snapshots["sbb-radio-button-panel renders disabled - A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label",
      "disabled": true,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders disabled - A11y tree Chrome */

snapshots["sbb-radio-button-panel renders disabled - A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders disabled - A11y tree Firefox */

snapshots["sbb-radio-button-panel renders required - A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders required - A11y tree Chrome */

snapshots["sbb-radio-button-panel renders required - A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "",
      "required": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders required - A11y tree Firefox */

