/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-chip-label renders DOM"] = 
`<sbb-chip-label
  color="milk"
  size="xxs"
>
  Label
</sbb-chip-label>
`;
/* end snapshot sbb-chip-label renders DOM */

snapshots["sbb-chip-label renders Shadow DOM"] = 
`<span class="sbb-chip-label">
  <span class="sbb-chip__text-wrapper">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-chip-label renders Shadow DOM */

snapshots["sbb-chip-label renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip-label renders A11y tree Chrome */

snapshots["sbb-chip-label renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip-label renders A11y tree Firefox */

