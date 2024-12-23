/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-file-selector renders DOM"] = 
`<sbb-file-selector size="m">
</sbb-file-selector>
`;
/* end snapshot sbb-file-selector renders DOM */

snapshots["sbb-file-selector renders Shadow DOM"] = 
`<div class="sbb-file-selector">
  <div class="sbb-file-selector__input-container">
    <label>
      <sbb-secondary-button-static
        data-action=""
        data-sbb-button=""
        data-slot-names="unnamed"
        icon-name="folder-open-small"
        size="m"
      >
        Choose a file
      </sbb-secondary-button-static>
      <input
        class="sbb-file-selector__visually-hidden"
        type="file"
      >
    </label>
  </div>
  <p
    class="sbb-file-selector__visually-hidden"
    role="status"
  >
  </p>
  <div class="sbb-file-selector__error">
    <slot name="error">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-file-selector renders Shadow DOM */

snapshots["sbb-file-selector renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Choose a file"
    },
    {
      "role": "button",
      "name": "Choose a file",
      "value": "No file chosen"
    }
  ]
}
</p>
`;
/* end snapshot sbb-file-selector renders A11y tree Chrome */

snapshots["sbb-file-selector renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Choose a file"
    },
    {
      "role": "button",
      "name": "Choose a file Browse… …"
    }
  ]
}
</p>
`;
/* end snapshot sbb-file-selector renders A11y tree Firefox */

