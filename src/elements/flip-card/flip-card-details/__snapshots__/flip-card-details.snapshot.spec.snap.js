/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Example text"
    }
  ]
}
</p>
`;
/* end snapshot A11y tree Chrome */

snapshots["sbb-flip-card-details DOM"] = 
`<sbb-flip-card-details slot="details">
  Example text
</sbb-flip-card-details>
`;
/* end snapshot sbb-flip-card-details DOM */

snapshots["sbb-flip-card-details Shadow DOM"] = 
`<div class="sbb-flip-card-details--wrapper">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-flip-card-details Shadow DOM */

snapshots["sbb-flip-card-details A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Example text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-flip-card-details A11y tree Chrome */

snapshots["sbb-flip-card-details A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Example text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-flip-card-details A11y tree Firefox */

