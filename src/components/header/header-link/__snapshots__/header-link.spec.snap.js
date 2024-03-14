/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-header-link renders the component as a button with icon Light DOM"] = 
`<sbb-header-link
  data-action=""
  data-link=""
  dir="ltr"
  expand-from="small"
  href="https://github.com/lyne-design-system/lyne-components"
  icon-name="pie-small"
  role="link"
  tabindex="0"
  target="_blank"
>
  Action
</sbb-header-link>
`;
/* end snapshot sbb-header-link renders the component as a button with icon Light DOM */

snapshots["sbb-header-link renders the component as a button with icon Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-header-link"
  href="https://github.com/lyne-design-system/lyne-components"
  rel="external noopener nofollow"
  role="presentation"
  tabindex="-1"
  target="_blank"
>
  <span class="sbb-header-action__wrapper">
    <span class="sbb-header-action__icon">
      <slot name="icon">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="pie-small"
          role="img"
        >
        </sbb-icon>
      </slot>
    </span>
    <span class="sbb-header-action__text">
      <slot>
      </slot>
    </span>
  </span>
  <sbb-screenreader-only>
    . Link target opens in a new window.
  </sbb-screenreader-only>
</a>
`;
/* end snapshot sbb-header-link renders the component as a button with icon Shadow DOM */

snapshots["sbb-header-link renders the component as a button with icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Action . Link target opens in a new window.",
      "children": [
        {
          "role": "link",
          "name": "Action . Link target opens in a new window."
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-header-link renders the component as a button with icon A11y tree Chrome */

snapshots["sbb-header-link renders the component as a button with icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Action . Link target opens in a new window.",
      "children": [
        {
          "role": "link",
          "name": "Action . Link target opens in a new window.",
          "value": "https://github.com/lyne-design-system/lyne-components"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-header-link renders the component as a button with icon A11y tree Firefox */

snapshots["sbb-header-link renders the component as a button with icon A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "",
      "children": [
        {
          "role": "link",
          "name": "Action . Link target opens in a new window.",
          "children": [
            {
              "role": "text",
              "name": "Action"
            },
            {
              "role": "text",
              "name": ". "
            },
            {
              "role": "text",
              "name": "Link target opens in a new window."
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-header-link renders the component as a button with icon A11y tree Safari */

