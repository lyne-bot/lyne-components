/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-navigation-list renders DOM"] = 
`<sbb-navigation-list data-slot-names="li-0 li-1 li-2 li-3">
  <sbb-navigation-button
    data-action=""
    data-button=""
    size="m"
    slot="li-0"
    tabindex="0"
  >
    Tickets & Offers
  </sbb-navigation-button>
  <sbb-navigation-button
    data-action=""
    data-button=""
    size="m"
    slot="li-1"
    tabindex="0"
  >
    Vacations & Recreation
  </sbb-navigation-button>
  <sbb-navigation-button
    data-action=""
    data-button=""
    size="m"
    slot="li-2"
    tabindex="0"
  >
    Travel information
  </sbb-navigation-button>
  <sbb-navigation-button
    data-action=""
    data-button=""
    size="m"
    slot="li-3"
    tabindex="0"
  >
    Help & Contact
  </sbb-navigation-button>
</sbb-navigation-list>
`;
/* end snapshot sbb-navigation-list renders DOM */

snapshots["sbb-navigation-list renders Shadow DOM"] = 
`<span
  class="sbb-navigation-list__label"
  id="sbb-navigation-link-label-id"
>
  <slot name="label">
  </slot>
</span>
<ul
  aria-labelledby="sbb-navigation-link-label-id"
  class="sbb-navigation-list__content"
>
  <li>
    <slot name="li-0">
    </slot>
  </li>
  <li>
    <slot name="li-1">
    </slot>
  </li>
  <li>
    <slot name="li-2">
    </slot>
  </li>
  <li>
    <slot name="li-3">
    </slot>
  </li>
</ul>
<span hidden="">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-navigation-list renders Shadow DOM */

snapshots["sbb-navigation-list should render named slots if data-ssr-child-count attribute is set DOM"] = 
`<sbb-navigation-list data-ssr-child-count="3">
</sbb-navigation-list>
`;
/* end snapshot sbb-navigation-list should render named slots if data-ssr-child-count attribute is set DOM */

snapshots["sbb-navigation-list should render named slots if data-ssr-child-count attribute is set Shadow DOM"] = 
`<span
  class="sbb-navigation-list__label"
  id="sbb-navigation-link-label-id"
>
  <slot name="label">
  </slot>
</span>
<ul
  aria-labelledby="sbb-navigation-link-label-id"
  class="sbb-navigation-list__content"
>
  <li>
    <slot name="li-0">
    </slot>
  </li>
  <li>
    <slot name="li-1">
    </slot>
  </li>
  <li>
    <slot name="li-2">
    </slot>
  </li>
</ul>
<span hidden="">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-navigation-list should render named slots if data-ssr-child-count attribute is set Shadow DOM */

snapshots["sbb-navigation-list renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Tickets & Offers"
    },
    {
      "role": "button",
      "name": "Vacations & Recreation"
    },
    {
      "role": "button",
      "name": "Travel information"
    },
    {
      "role": "button",
      "name": "Help & Contact"
    }
  ]
}
</p>
`;
/* end snapshot sbb-navigation-list renders A11y tree Chrome */

snapshots["sbb-navigation-list renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Tickets & Offers"
    },
    {
      "role": "button",
      "name": "Vacations & Recreation"
    },
    {
      "role": "button",
      "name": "Travel information"
    },
    {
      "role": "button",
      "name": "Help & Contact"
    }
  ]
}
</p>
`;
/* end snapshot sbb-navigation-list renders A11y tree Firefox */

