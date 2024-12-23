/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-lead-container DOM"] = 
`<sbb-lead-container>
  <sbb-image
    data-loaded=""
    slot="image"
  >
  </sbb-image>
</sbb-lead-container>
`;
/* end snapshot sbb-lead-container DOM */

snapshots["sbb-lead-container Shadow DOM"] = 
`<div class="sbb-lead-container">
  <div class="sbb-lead-container-image">
    <slot name="image">
    </slot>
  </div>
  <div class="sbb-lead-container-content-wrapper">
    <div class="sbb-lead-container-content">
      <slot>
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-lead-container Shadow DOM */

snapshots["sbb-lead-container A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-lead-container A11y tree Chrome */

snapshots["sbb-lead-container A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-lead-container A11y tree Firefox */

