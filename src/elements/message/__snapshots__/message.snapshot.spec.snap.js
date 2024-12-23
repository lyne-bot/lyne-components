/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-message renders DOM"] = 
`<sbb-message title-content="Title.">
  <sbb-image
    data-loaded=""
    slot="image"
  >
  </sbb-image>
  <p slot="subtitle">
    Subtitle.
  </p>
  <p slot="legend">
    Error code: 0001
  </p>
  <sbb-button
    data-action=""
    data-button=""
    data-sbb-button=""
    icon-name="arrows-circle-small"
    size="l"
    slot="action"
    tabindex="0"
  >
  </sbb-button>
</sbb-message>
`;
/* end snapshot sbb-message renders DOM */

snapshots["sbb-message renders Shadow DOM"] = 
`<div class="sbb-message__container">
  <slot name="image">
  </slot>
  <sbb-title
    aria-level="3"
    class="sbb-message__title"
    level="3"
    role="heading"
    visual-level="5"
  >
    <slot name="title">
      Title.
    </slot>
  </sbb-title>
  <slot name="subtitle">
  </slot>
  <slot name="legend">
  </slot>
  <slot name="action">
  </slot>
</div>
`;
/* end snapshot sbb-message renders Shadow DOM */

snapshots["sbb-message renders without optional slots DOM"] = 
`<sbb-message title-content="Title.">
  <p slot="subtitle">
    Subtitle.
  </p>
</sbb-message>
`;
/* end snapshot sbb-message renders without optional slots DOM */

snapshots["sbb-message renders without optional slots Shadow DOM"] = 
`<div class="sbb-message__container">
  <slot name="image">
  </slot>
  <sbb-title
    aria-level="3"
    class="sbb-message__title"
    level="3"
    role="heading"
    visual-level="5"
  >
    <slot name="title">
      Title.
    </slot>
  </sbb-title>
  <slot name="subtitle">
  </slot>
  <slot name="legend">
  </slot>
  <slot name="action">
  </slot>
</div>
`;
/* end snapshot sbb-message renders without optional slots Shadow DOM */

snapshots["sbb-message renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title.",
      "level": 3
    },
    {
      "role": "text",
      "name": "Subtitle."
    },
    {
      "role": "text",
      "name": "Error code: 0001"
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-message renders A11y tree Chrome */

snapshots["sbb-message renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title.",
      "level": 3
    },
    {
      "role": "text leaf",
      "name": "Subtitle."
    },
    {
      "role": "text leaf",
      "name": "Error code: 0001"
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-message renders A11y tree Firefox */

