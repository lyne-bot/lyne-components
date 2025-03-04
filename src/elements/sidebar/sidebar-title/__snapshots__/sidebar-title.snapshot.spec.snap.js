/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-sidebar-title renders Light DOM"] = 
`<sbb-sidebar-title
  aria-level="2"
  level="2"
  role="heading"
  slot="title-section"
  visual-level="5"
>
  Title
</sbb-sidebar-title>
`;
/* end snapshot sbb-sidebar-title renders Light DOM */

snapshots["sbb-sidebar-title renders Shadow DOM"] = 
`<div class="sbb-title">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-sidebar-title renders Shadow DOM */

snapshots["sbb-sidebar-title renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title",
      "level": 2
    }
  ]
}
</p>
`;
/* end snapshot sbb-sidebar-title renders A11y tree Chrome */

snapshots["sbb-sidebar-title renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title",
      "level": 2
    }
  ]
}
</p>
`;
/* end snapshot sbb-sidebar-title renders A11y tree Firefox */

