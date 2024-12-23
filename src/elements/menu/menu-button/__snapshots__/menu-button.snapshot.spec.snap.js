/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-menu-button renders DOM"] = 
`<sbb-menu-button
  aria-label="a11y label"
  data-action=""
  data-button=""
  form="formid"
  name="name"
  tabindex="0"
  type="submit"
>
  <span>
    Action
  </span>
</sbb-menu-button>
`;
/* end snapshot sbb-menu-button renders DOM */

snapshots["sbb-menu-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-menu-button">
  <span class="sbb-menu-action__content">
    <span class="sbb-menu-action__icon">
      <slot name="icon">
      </slot>
    </span>
    <span class="sbb-menu-action__label">
      <slot>
      </slot>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-menu-button renders Shadow DOM */

snapshots["sbb-menu-button renders component with icon and amount DOM"] = 
`<sbb-menu-button
  amount="123456"
  data-action=""
  data-button=""
  icon-name="menu-small"
  tabindex="0"
>
  <span>
    Action
  </span>
</sbb-menu-button>
`;
/* end snapshot sbb-menu-button renders component with icon and amount DOM */

snapshots["sbb-menu-button renders component with icon and amount Shadow DOM"] = 
`<span class="sbb-action-base sbb-menu-button">
  <span class="sbb-menu-action__content">
    <span class="sbb-menu-action__icon">
      <slot name="icon">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="menu-small"
          role="img"
        >
        </sbb-icon>
      </slot>
    </span>
    <span class="sbb-menu-action__label">
      <slot>
      </slot>
    </span>
    <span class="sbb-menu-action__amount">
      123456
    </span>
  </span>
</span>
`;
/* end snapshot sbb-menu-button renders component with icon and amount Shadow DOM */

snapshots["sbb-menu-button renders component with icon and amount A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Action 123456"
    }
  ]
}
</p>
`;
/* end snapshot sbb-menu-button renders component with icon and amount A11y tree Chrome */

snapshots["sbb-menu-button renders component with icon and amount A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Action 123456"
    }
  ]
}
</p>
`;
/* end snapshot sbb-menu-button renders component with icon and amount A11y tree Firefox */

