/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-sticky-bar renders DOM"] = 
`<sbb-sticky-bar
  data-initialized=""
  data-state="sticky"
  slot="sticky-bar"
>
</sbb-sticky-bar>
`;
/* end snapshot sbb-sticky-bar renders DOM */

snapshots["sbb-sticky-bar renders Shadow DOM"] = 
`<div class="sbb-sticky-bar__wrapper">
  <div class="sbb-sticky-bar">
    <slot>
    </slot>
  </div>
</div>
<div class="sbb-sticky-bar__intersector">
</div>
`;
/* end snapshot sbb-sticky-bar renders Shadow DOM */

snapshots["sbb-sticky-bar renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-sticky-bar renders A11y tree Chrome */

snapshots["sbb-sticky-bar renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-sticky-bar renders A11y tree Firefox */

