/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-sidebar-content renders DOM"] = 
`<sbb-sidebar-content
  class="sbb-scrollbar"
  role="main"
>
  Some content
</sbb-sidebar-content>
`;
/* end snapshot sbb-sidebar-content renders DOM */

snapshots["sbb-sidebar-content renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-sidebar-content renders Shadow DOM */

snapshots["sbb-sidebar-content renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Some content"
    }
  ]
}
</p>
`;
/* end snapshot sbb-sidebar-content renders A11y tree Chrome */

snapshots["sbb-sidebar-content renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Some content"
    }
  ]
}
</p>
`;
/* end snapshot sbb-sidebar-content renders A11y tree Firefox */

