/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-sidebar renders DOM"] = 
`<sbb-sidebar
  color="white"
  data-state="closed"
  mode="side"
  position="start"
  role="navigation"
>
</sbb-sidebar>
`;
/* end snapshot sbb-sidebar renders DOM */

snapshots["sbb-sidebar renders Shadow DOM"] = 
`<div class="sbb-sidebar">
  <div class="sbb-sidebar-title-section">
    <slot name="title-section">
    </slot>
  </div>
  <div class="sbb-sidebar-content-section">
    <div class="sbb-sidebar__intersector">
    </div>
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-sidebar renders Shadow DOM */

snapshots["sbb-sidebar renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-sidebar renders A11y tree Chrome */

snapshots["sbb-sidebar renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-sidebar renders A11y tree Firefox */

