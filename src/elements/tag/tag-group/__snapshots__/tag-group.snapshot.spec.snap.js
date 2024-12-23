/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tag-group renders DOM"] = 
`<sbb-tag-group
  role="group"
  size="m"
>
  <sbb-tag
    aria-pressed="false"
    data-action=""
    data-button=""
    data-slot-names="unnamed"
    size="m"
    slot="li-0"
    tabindex="0"
    value="tag-1"
  >
    First tag
  </sbb-tag>
  <sbb-tag
    aria-pressed="false"
    data-action=""
    data-button=""
    data-slot-names="unnamed"
    size="m"
    slot="li-1"
    tabindex="0"
    value="tag-2"
  >
    Second tag
  </sbb-tag>
  <div slot="li-2">
  </div>
  <sbb-tag
    aria-pressed="false"
    data-action=""
    data-button=""
    data-slot-names="unnamed"
    size="m"
    slot="li-3"
    tabindex="0"
    value="tag-3"
  >
    Third tag
  </sbb-tag>
</sbb-tag-group>
`;
/* end snapshot sbb-tag-group renders DOM */

snapshots["sbb-tag-group renders Shadow DOM"] = 
`<div class="sbb-tag-group">
  <ul class="sbb-tag-group__list">
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
</div>
`;
/* end snapshot sbb-tag-group renders Shadow DOM */

snapshots["sbb-tag-group renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "First tag",
      "pressed": false
    },
    {
      "role": "button",
      "name": "Second tag",
      "pressed": false
    },
    {
      "role": "button",
      "name": "Third tag",
      "pressed": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-tag-group renders A11y tree Chrome */

snapshots["sbb-tag-group renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "toggle button",
      "name": "First tag"
    },
    {
      "role": "toggle button",
      "name": "Second tag"
    },
    {
      "role": "toggle button",
      "name": "Third tag"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tag-group renders A11y tree Firefox */

