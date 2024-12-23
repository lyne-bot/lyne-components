/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-header renders DOM"] = 
`<sbb-header size="m">
</sbb-header>
`;
/* end snapshot sbb-header renders DOM */

snapshots["sbb-header renders Shadow DOM"] = 
`<header class="sbb-header">
  <div class="sbb-header__wrapper">
    <slot>
    </slot>
  </div>
</header>
`;
/* end snapshot sbb-header renders Shadow DOM */

snapshots["sbb-header renders actions and logo DOM"] = 
`<sbb-header size="m">
  <sbb-header-link
    data-action=""
    data-link=""
    expand-from="medium"
    href="https://github.com/sbb-design-systems/lyne-components"
    icon-name="hamburger-menu-small"
  >
    Menu
  </sbb-header-link>
  <div class="sbb-header-spacer">
  </div>
  <div class="sbb-header-logo">
    <circle
      cx="25"
      cy="75"
      r="20"
    >
    </circle>
  </div>
</sbb-header>
`;
/* end snapshot sbb-header renders actions and logo DOM */

snapshots["sbb-header renders actions and logo Shadow DOM"] = 
`<header class="sbb-header">
  <div class="sbb-header__wrapper">
    <slot>
    </slot>
  </div>
</header>
`;
/* end snapshot sbb-header renders actions and logo Shadow DOM */

snapshots["sbb-header renders actions and logo A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Menu"
    }
  ]
}
</p>
`;
/* end snapshot sbb-header renders actions and logo A11y tree Chrome */

snapshots["sbb-header renders actions and logo A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Menu",
      "value": "https://github.com/sbb-design-systems/lyne-components"
    }
  ]
}
</p>
`;
/* end snapshot sbb-header renders actions and logo A11y tree Firefox */

