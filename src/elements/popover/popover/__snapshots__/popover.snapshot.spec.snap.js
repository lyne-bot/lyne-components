/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-popover renders DOM"] = 
`<sbb-popover
  data-state="closed"
  id="sbb-popover-1"
>
</sbb-popover>
`;
/* end snapshot sbb-popover renders DOM */

snapshots["sbb-popover renders Shadow DOM"] = 
`<div class="sbb-popover__container">
  <div
    class="sbb-popover"
    role="tooltip"
  >
    <div class="sbb-popover__content">
      <span class="sbb-popover__close">
        <sbb-secondary-button
          aria-label="Close note"
          data-action=""
          data-button=""
          data-sbb-button=""
          icon-name="cross-small"
          sbb-popover-close=""
          size="s"
          tabindex="0"
          type="button"
        >
        </sbb-secondary-button>
      </span>
      <span>
        <slot>
          No content
        </slot>
      </span>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-popover renders Shadow DOM */

snapshots["sbb-popover renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-popover renders A11y tree Chrome */

snapshots["sbb-popover renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-popover renders A11y tree Firefox */

