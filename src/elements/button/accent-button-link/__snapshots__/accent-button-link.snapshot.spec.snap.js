/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-accent-button-link renders a sbb-accent-button-link without icon DOM"] = 
`<sbb-accent-button-link
  data-action=""
  data-link=""
  data-sbb-button=""
  data-slot-names="unnamed"
  download=""
  href="https://www.sbb.ch"
  rel="noopener"
  size="m"
  target="_blank"
>
  Label Text
</sbb-accent-button-link>
`;
/* end snapshot sbb-accent-button-link renders a sbb-accent-button-link without icon DOM */

snapshots["sbb-accent-button-link renders a sbb-accent-button-link without icon Shadow DOM"] = 
`<a
  class="sbb-accent-button-link sbb-action-base"
  download=""
  href="https://www.sbb.ch"
  rel="noopener"
  target="_blank"
>
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-accent-button-link renders a sbb-accent-button-link without icon Shadow DOM */

snapshots["sbb-accent-button-link renders a disabled sbb-accent-button-link with slotted icon DOM"] = 
`<sbb-accent-button-link
  data-action=""
  data-link=""
  data-sbb-button=""
  data-slot-names="icon unnamed"
  disabled=""
  href="https://www.sbb.ch"
  size="l"
>
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="chevron-small-left-small"
    role="img"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-accent-button-link>
`;
/* end snapshot sbb-accent-button-link renders a disabled sbb-accent-button-link with slotted icon DOM */

snapshots["sbb-accent-button-link renders a disabled sbb-accent-button-link with slotted icon Shadow DOM"] = 
`<a
  aria-disabled="true"
  class="sbb-accent-button-link sbb-action-base"
  href="https://www.sbb.ch"
  tabindex="-1"
>
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</a>
`;
/* end snapshot sbb-accent-button-link renders a disabled sbb-accent-button-link with slotted icon Shadow DOM */

snapshots["sbb-accent-button-link renders a sbb-accent-button-link without icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Label Text . Link target opens in a new window."
    }
  ]
}
</p>
`;
/* end snapshot sbb-accent-button-link renders a sbb-accent-button-link without icon A11y tree Chrome */

snapshots["sbb-accent-button-link renders a sbb-accent-button-link without icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Label Text . Link target opens in a new window.",
      "value": "https://www.sbb.ch/"
    }
  ]
}
</p>
`;
/* end snapshot sbb-accent-button-link renders a sbb-accent-button-link without icon A11y tree Firefox */

