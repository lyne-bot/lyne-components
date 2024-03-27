/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-secondary-button-link renders a sbb-secondary-button-link without icon Dom"] = 
`<sbb-secondary-button-link
  data-action=""
  data-link=""
  data-sbb-button=""
  data-slot-names="unnamed"
  dir="ltr"
  download=""
  href="https://www.sbb.ch"
  rel="noopener"
  role="link"
  size="m"
  tabindex="0"
  target="_blank"
>
  Label Text
</sbb-secondary-button-link>
`;
/* end snapshot sbb-secondary-button-link renders a sbb-secondary-button-link without icon Dom */

snapshots["sbb-secondary-button-link renders a sbb-secondary-button-link without icon ShadowDom"] = 
`<a
  class="sbb-action-base sbb-secondary-button-link"
  download=""
  href="https://www.sbb.ch"
  rel="noopener"
  role="presentation"
  tabindex="-1"
  target="_blank"
>
  <span class="sbb-button__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
  <sbb-screenreader-only>
    . Link target opens in a new window.
  </sbb-screenreader-only>
</a>
`;
/* end snapshot sbb-secondary-button-link renders a sbb-secondary-button-link without icon ShadowDom */

snapshots["sbb-secondary-button-link renders a sbb-secondary-button-link without icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Label Text . Link target opens in a new window.",
      "children": [
        {
          "role": "link",
          "name": "Label Text . Link target opens in a new window."
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-secondary-button-link renders a sbb-secondary-button-link without icon A11y tree Chrome */

snapshots["sbb-secondary-button-link renders a disabled sbb-secondary-button-link with slotted icon Dom"] = 
`<sbb-secondary-button-link
  aria-disabled="true"
  data-action=""
  data-link=""
  data-sbb-button=""
  data-slot-names="icon unnamed"
  dir="ltr"
  disabled=""
  href="https://www.sbb.ch"
  role="link"
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
</sbb-secondary-button-link>
`;
/* end snapshot sbb-secondary-button-link renders a disabled sbb-secondary-button-link with slotted icon Dom */

snapshots["sbb-secondary-button-link renders a disabled sbb-secondary-button-link with slotted icon ShadowDom"] = 
`<a
  class="sbb-action-base sbb-secondary-button-link"
  href="https://www.sbb.ch"
  role="presentation"
  tabindex="-1"
>
  <span class="sbb-button__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</a>
`;
/* end snapshot sbb-secondary-button-link renders a disabled sbb-secondary-button-link with slotted icon ShadowDom */

snapshots["sbb-secondary-button-link renders a sbb-secondary-button-link without icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Label Text . Link target opens in a new window.",
      "children": [
        {
          "role": "link",
          "name": "Label Text . Link target opens in a new window.",
          "value": "https://www.sbb.ch/"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-secondary-button-link renders a sbb-secondary-button-link without icon A11y tree Firefox */

