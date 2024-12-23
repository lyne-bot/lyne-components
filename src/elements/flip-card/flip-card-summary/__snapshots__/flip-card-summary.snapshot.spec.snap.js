/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Summary",
      "level": 4
    }
  ]
}
</p>
`;
/* end snapshot A11y tree Chrome */

snapshots["sbb-flip-card-summary DOM"] = 
`<sbb-flip-card-summary
  image-alignment="below"
  slot="summary"
>
  <sbb-title
    aria-level="4"
    level="4"
    role="heading"
  >
    Summary
  </sbb-title>
  <sbb-image slot="image">
  </sbb-image>
</sbb-flip-card-summary>
`;
/* end snapshot sbb-flip-card-summary DOM */

snapshots["sbb-flip-card-summary Shadow DOM"] = 
`<div class="sbb-flip-card-summary">
  <slot>
  </slot>
  <div class="sbb-flip-card-summary--image-wrapper">
    <slot name="image">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-flip-card-summary Shadow DOM */

snapshots["sbb-flip-card-summary A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Summary",
      "level": 4
    }
  ]
}
</p>
`;
/* end snapshot sbb-flip-card-summary A11y tree Chrome */

snapshots["sbb-flip-card-summary A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Summary",
      "level": 4
    }
  ]
}
</p>
`;
/* end snapshot sbb-flip-card-summary A11y tree Firefox */

