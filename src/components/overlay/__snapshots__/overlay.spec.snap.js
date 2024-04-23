/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-overlay renders - Dom"] = 
`<sbb-overlay data-state="opening">
</sbb-overlay>
`;
/* end snapshot sbb-overlay renders - Dom */

snapshots["sbb-overlay renders - ShadowDom"] = 
`<div class="sbb-overlay__container">
  <div class="sbb-overlay">
    <div class="sbb-overlay__wrapper">
      <div class="sbb-overlay__header">
        <sbb-secondary-button
          aria-label="Close secondary window"
          class="sbb-overlay__close"
          data-action=""
          data-button=""
          data-sbb-button=""
          dir="ltr"
          icon-name="cross-small"
          role="button"
          sbb-overlay-close=""
          size="m"
          tabindex="0"
          type="button"
        >
        </sbb-secondary-button>
      </div>
      <div class="sbb-overlay__content">
        <sbb-container
          class="sbb-overlay__content-container"
          color="transparent"
        >
          <slot>
          </slot>
        </sbb-container>
      </div>
    </div>
  </div>
</div>
<sbb-screen-reader-only aria-live="polite">
</sbb-screen-reader-only>
`;
/* end snapshot sbb-overlay renders - ShadowDom */

snapshots["sbb-overlay A11y tree Chrome"] =
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Close secondary window",
      "focused": true
    },
    {
      "role": "text",
      "name": "Dialog "
    }
  ]
}
</p>
`;
/* end snapshot sbb-overlay A11y tree Chrome */

snapshots["sbb-overlay A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Close secondary window",
      "focused": true
    },
    {
      "role": "text leaf",
      "name": "Dialog "
    }
  ]
}
</p>
`;
/* end snapshot sbb-overlay A11y tree Firefox */

