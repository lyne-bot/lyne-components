/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-radio-button renders DOM"] = 
`<sbb-radio-button
  name="radio"
  size="m"
  tabindex="0"
  value="radio-value"
>
</sbb-radio-button>
`;
/* end snapshot sbb-radio-button renders DOM */

snapshots["sbb-radio-button renders Shadow DOM"] = 
`<label class="sbb-radio-button">
  <span class="sbb-radio-button__label-slot">
    <slot>
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-radio-button renders Shadow DOM */

snapshots["sbb-radio-button renders A11y tree Chrome"] = 
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
/* end snapshot sbb-radio-button renders A11y tree Chrome */

snapshots["sbb-radio-button renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button renders A11y tree Firefox */

snapshots["sbb-radio-button renders checked - A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button renders checked - A11y tree Chrome */

snapshots["sbb-radio-button renders checked - A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button renders checked - A11y tree Firefox */

snapshots["sbb-radio-button renders disabled - A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "",
      "disabled": true,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button renders disabled - A11y tree Chrome */

snapshots["sbb-radio-button renders disabled - A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button renders disabled - A11y tree Firefox */

snapshots["sbb-radio-button native - A11y tree Chrome"] = 
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
/* end snapshot sbb-radio-button native - A11y tree Chrome */

snapshots["sbb-radio-button native - A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button native - A11y tree Firefox */

snapshots["sbb-radio-button renders required - A11y tree Chrome"] = 
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
/* end snapshot sbb-radio-button renders required - A11y tree Chrome */

snapshots["sbb-radio-button renders required - A11y tree Firefox"] = 
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
/* end snapshot sbb-radio-button renders required - A11y tree Firefox */

