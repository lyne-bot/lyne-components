/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-compact-paginator renders DOM"] = 
`<sbb-compact-paginator
  length="50"
  page-size="5"
  pager-position="start"
  role="group"
  size="m"
>
</sbb-compact-paginator>
`;
/* end snapshot sbb-compact-paginator renders DOM */

snapshots["sbb-compact-paginator renders Shadow DOM"] = 
`<div class="sbb-compact-paginator">
  <sbb-mini-button-group size="l">
    <sbb-mini-button
      aria-label="Previous page"
      data-action=""
      data-button=""
      disabled=""
      icon-name="chevron-small-left-small"
      id="sbb-paginator-prev-page"
      slot="li-0"
    >
    </sbb-mini-button>
    <sbb-divider
      aria-orientation="vertical"
      orientation="vertical"
      role="separator"
      slot="li-1"
    >
    </sbb-divider>
    <sbb-mini-button
      aria-label="Next page"
      data-action=""
      data-button=""
      icon-name="chevron-small-right-small"
      id="sbb-paginator-next-page"
      slot="li-2"
      tabindex="0"
    >
    </sbb-mini-button>
  </sbb-mini-button-group>
  <span class="sbb-paginator__pages">
    1
    <sbb-divider
      aria-hidden="true"
      aria-orientation="vertical"
      class="sbb-compact-paginator__divider"
      orientation="vertical"
      role="separator"
    >
    </sbb-divider>
    10
  </span>
</div>
<sbb-screen-reader-only role="status">
  Page 1 selected.
</sbb-screen-reader-only>
`;
/* end snapshot sbb-compact-paginator renders Shadow DOM */

snapshots["sbb-compact-paginator renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Previous page",
      "disabled": true
    },
    {
      "role": "button",
      "name": "Next page"
    },
    {
      "role": "text leaf",
      "name": "1"
    },
    {
      "role": "text leaf",
      "name": "10"
    },
    {
      "role": "text leaf",
      "name": "Page 1 selected."
    }
  ]
}
</p>
`;
/* end snapshot sbb-compact-paginator renders A11y tree Firefox */

snapshots["sbb-compact-paginator renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Previous page",
      "disabled": true
    },
    {
      "role": "button",
      "name": "Next page"
    },
    {
      "role": "text",
      "name": "1"
    },
    {
      "role": "text",
      "name": "10"
    },
    {
      "role": "text",
      "name": "Page 1 selected."
    }
  ]
}
</p>
`;
/* end snapshot sbb-compact-paginator renders A11y tree Chrome */

