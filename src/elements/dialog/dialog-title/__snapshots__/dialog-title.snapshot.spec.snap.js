/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog-title renders Light DOM"] = 
`<sbb-dialog-title
  aria-level="2"
  level="2"
  role="heading"
  visual-level="3"
>
  Title
</sbb-dialog-title>
`;
/* end snapshot sbb-dialog-title renders Light DOM */

snapshots["sbb-dialog-title renders Shadow DOM"] = 
`<div class="sbb-dialog__header">
  <h2
    class="sbb-title"
    role="presentation"
  >
    <slot>
    </slot>
  </h2>
  <sbb-secondary-button
    aria-label="Close secondary window"
    class="sbb-dialog__close"
    data-action=""
    data-button=""
    data-sbb-button=""
    icon-name="cross-small"
    sbb-dialog-close=""
    size="m"
    tabindex="0"
    type="button"
  >
  </sbb-secondary-button>
</div>
`;
/* end snapshot sbb-dialog-title renders Shadow DOM */

snapshots["sbb-dialog-title renders A11y tree Chrome"] = 
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
      "name": "Close secondary window"
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog-title renders A11y tree Chrome */

snapshots["sbb-dialog-title renders A11y tree Firefox"] = 
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
      "name": "Close secondary window"
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog-title renders A11y tree Firefox */

