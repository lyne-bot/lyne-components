/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog renders an open dialog DOM"] = 
`<sbb-dialog data-state="opened">
  <sbb-dialog-title
    aria-level="2"
    level="2"
    role="heading"
    visual-level="3"
  >
    Title
  </sbb-dialog-title>
  <sbb-dialog-content>
    Content
  </sbb-dialog-content>
</sbb-dialog>
`;
/* end snapshot sbb-dialog renders an open dialog DOM */

snapshots["sbb-dialog renders an open dialog Shadow DOM"] = 
`<div class="sbb-dialog__container">
  <div
    class="sbb-dialog"
    id="sbb-dialog-1"
  >
    <div class="sbb-dialog__wrapper">
      <slot>
      </slot>
    </div>
  </div>
</div>
<sbb-screen-reader-only aria-live="polite">
</sbb-screen-reader-only>
`;
/* end snapshot sbb-dialog renders an open dialog Shadow DOM */

snapshots["sbb-dialog renders an open dialog A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Title"
    },
    {
      "role": "button",
      "name": "Close secondary window",
      "focused": true
    },
    {
      "role": "text",
      "name": "Content"
    },
    {
      "role": "text",
      "name": "Dialog, Title "
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog renders an open dialog A11y tree Chrome */

snapshots["sbb-dialog renders an open dialog A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Title"
    },
    {
      "role": "button",
      "name": "Close secondary window",
      "focused": true
    },
    {
      "role": "text leaf",
      "name": "Content"
    },
    {
      "role": "text leaf",
      "name": "Dialog, Title "
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog renders an open dialog A11y tree Firefox */

