/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-paginator renders DOM"] = 
`<sbb-paginator
  length="4"
  page-size="4"
  pager-position="start"
  role="group"
  size="m"
>
</sbb-paginator>
`;
/* end snapshot sbb-paginator renders DOM */

snapshots["sbb-paginator renders Shadow DOM"] = 
`<div class="sbb-paginator">
  <span class="sbb-paginator__wrapping-group">
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
        disabled=""
        icon-name="chevron-small-right-small"
        id="sbb-paginator-next-page"
        slot="li-2"
      >
      </sbb-mini-button>
    </sbb-mini-button-group>
    <ul class="sbb-paginator__pages">
      <li class="sbb-paginator__page--number">
        <button
          aria-current="true"
          aria-label="Page 1"
          class="sbb-paginator__page--number-item"
          data-index="0"
          data-selected=""
        >
          <span class="sbb-paginator__page--number-item-label">
            1
          </span>
        </button>
      </li>
    </ul>
  </span>
</div>
<sbb-screen-reader-only role="status">
  Page 1 selected.
</sbb-screen-reader-only>
`;
/* end snapshot sbb-paginator renders Shadow DOM */

snapshots["sbb-paginator renders ellipsis on end side DOM"] = 
`<sbb-paginator
  length="50"
  page-size="4"
  pager-position="start"
  role="group"
  size="m"
>
</sbb-paginator>
`;
/* end snapshot sbb-paginator renders ellipsis on end side DOM */

snapshots["sbb-paginator renders ellipsis on end side Shadow DOM"] = 
`<div class="sbb-paginator">
  <span class="sbb-paginator__wrapping-group">
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
    <ul class="sbb-paginator__pages">
      <li class="sbb-paginator__page--number">
        <button
          aria-current="true"
          aria-label="Page 1"
          class="sbb-paginator__page--number-item"
          data-index="0"
          data-selected=""
        >
          <span class="sbb-paginator__page--number-item-label">
            1
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 2"
          class="sbb-paginator__page--number-item"
          data-index="1"
        >
          <span class="sbb-paginator__page--number-item-label">
            2
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 3"
          class="sbb-paginator__page--number-item"
          data-index="2"
        >
          <span class="sbb-paginator__page--number-item-label">
            3
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 4"
          class="sbb-paginator__page--number-item"
          data-index="3"
        >
          <span class="sbb-paginator__page--number-item-label">
            4
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--ellipsis">
        <span class="sbb-paginator__page--ellipsis-item">
          …
        </span>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 13"
          class="sbb-paginator__page--number-item"
          data-index="12"
        >
          <span class="sbb-paginator__page--number-item-label">
            13
          </span>
        </button>
      </li>
    </ul>
  </span>
</div>
<sbb-screen-reader-only role="status">
  Page 1 selected.
</sbb-screen-reader-only>
`;
/* end snapshot sbb-paginator renders ellipsis on end side Shadow DOM */

snapshots["sbb-paginator renders ellipsis on start side DOM"] = 
`<sbb-paginator
  length="50"
  page-index="10"
  page-size="4"
  pager-position="start"
  role="group"
  size="m"
>
</sbb-paginator>
`;
/* end snapshot sbb-paginator renders ellipsis on start side DOM */

snapshots["sbb-paginator renders ellipsis on start side Shadow DOM"] = 
`<div class="sbb-paginator">
  <span class="sbb-paginator__wrapping-group">
    <sbb-mini-button-group size="l">
      <sbb-mini-button
        aria-label="Previous page"
        data-action=""
        data-button=""
        icon-name="chevron-small-left-small"
        id="sbb-paginator-prev-page"
        slot="li-0"
        tabindex="0"
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
    <ul class="sbb-paginator__pages">
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 1"
          class="sbb-paginator__page--number-item"
          data-index="0"
        >
          <span class="sbb-paginator__page--number-item-label">
            1
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--ellipsis">
        <span class="sbb-paginator__page--ellipsis-item">
          …
        </span>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 10"
          class="sbb-paginator__page--number-item"
          data-index="9"
        >
          <span class="sbb-paginator__page--number-item-label">
            10
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-current="true"
          aria-label="Page 11"
          class="sbb-paginator__page--number-item"
          data-index="10"
          data-selected=""
        >
          <span class="sbb-paginator__page--number-item-label">
            11
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 12"
          class="sbb-paginator__page--number-item"
          data-index="11"
        >
          <span class="sbb-paginator__page--number-item-label">
            12
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 13"
          class="sbb-paginator__page--number-item"
          data-index="12"
        >
          <span class="sbb-paginator__page--number-item-label">
            13
          </span>
        </button>
      </li>
    </ul>
  </span>
</div>
<sbb-screen-reader-only role="status">
  Page 11 selected.
</sbb-screen-reader-only>
`;
/* end snapshot sbb-paginator renders ellipsis on start side Shadow DOM */

snapshots["sbb-paginator renders ellipsis on both side DOM"] = 
`<sbb-paginator
  length="50"
  page-index="7"
  page-size="4"
  pager-position="start"
  role="group"
  size="m"
>
</sbb-paginator>
`;
/* end snapshot sbb-paginator renders ellipsis on both side DOM */

snapshots["sbb-paginator renders ellipsis on both side Shadow DOM"] = 
`<div class="sbb-paginator">
  <span class="sbb-paginator__wrapping-group">
    <sbb-mini-button-group size="l">
      <sbb-mini-button
        aria-label="Previous page"
        data-action=""
        data-button=""
        icon-name="chevron-small-left-small"
        id="sbb-paginator-prev-page"
        slot="li-0"
        tabindex="0"
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
    <ul class="sbb-paginator__pages">
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 1"
          class="sbb-paginator__page--number-item"
          data-index="0"
        >
          <span class="sbb-paginator__page--number-item-label">
            1
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--ellipsis">
        <span class="sbb-paginator__page--ellipsis-item">
          …
        </span>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 7"
          class="sbb-paginator__page--number-item"
          data-index="6"
        >
          <span class="sbb-paginator__page--number-item-label">
            7
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-current="true"
          aria-label="Page 8"
          class="sbb-paginator__page--number-item"
          data-index="7"
          data-selected=""
        >
          <span class="sbb-paginator__page--number-item-label">
            8
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 9"
          class="sbb-paginator__page--number-item"
          data-index="8"
        >
          <span class="sbb-paginator__page--number-item-label">
            9
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--ellipsis">
        <span class="sbb-paginator__page--ellipsis-item">
          …
        </span>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 13"
          class="sbb-paginator__page--number-item"
          data-index="12"
        >
          <span class="sbb-paginator__page--number-item-label">
            13
          </span>
        </button>
      </li>
    </ul>
  </span>
</div>
<sbb-screen-reader-only role="status">
  Page 8 selected.
</sbb-screen-reader-only>
`;
/* end snapshot sbb-paginator renders ellipsis on both side Shadow DOM */

snapshots["sbb-paginator renders with options Chrome-Firefox DOM"] = 
`<sbb-paginator
  length="50"
  page-size="10"
  pager-position="start"
  role="group"
  size="m"
>
</sbb-paginator>
`;
/* end snapshot sbb-paginator renders with options Chrome-Firefox DOM */

snapshots["sbb-paginator renders with options Chrome-Firefox Shadow DOM"] = 
`<div class="sbb-paginator">
  <span class="sbb-paginator__wrapping-group">
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
    <ul class="sbb-paginator__pages">
      <li class="sbb-paginator__page--number">
        <button
          aria-current="true"
          aria-label="Page 1"
          class="sbb-paginator__page--number-item"
          data-index="0"
          data-selected=""
        >
          <span class="sbb-paginator__page--number-item-label">
            1
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 2"
          class="sbb-paginator__page--number-item"
          data-index="1"
        >
          <span class="sbb-paginator__page--number-item-label">
            2
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 3"
          class="sbb-paginator__page--number-item"
          data-index="2"
        >
          <span class="sbb-paginator__page--number-item-label">
            3
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 4"
          class="sbb-paginator__page--number-item"
          data-index="3"
        >
          <span class="sbb-paginator__page--number-item-label">
            4
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 5"
          class="sbb-paginator__page--number-item"
          data-index="4"
        >
          <span class="sbb-paginator__page--number-item-label">
            5
          </span>
        </button>
      </li>
    </ul>
  </span>
  <div class="sbb-paginator__page-size-options">
    <label for="select">
      Items per page
    </label>
    <sbb-form-field
      borderless=""
      data-input-type="sbb-select"
      data-slot-names="unnamed"
      error-space="none"
      size="m"
      width="collapse"
    >
      <div
        aria-controls="sbb-select-2"
        aria-expanded="false"
        aria-haspopup="listbox"
        aria-label="Items per page"
        aria-owns="sbb-select-2"
        aria-required="false"
        class="sbb-screen-reader-only"
        role="combobox"
        style="top: 0px; height: 48px; width: 56px;"
        tabindex="0"
      >
        10
      </div>
      <sbb-select
        data-option-panel-origin-borderless=""
        data-state="closed"
        id="select"
        value="10"
      >
        <sbb-option
          aria-selected="true"
          data-disable-highlight=""
          data-slot-names="unnamed"
          data-variant="select"
          id="sbb-option-3"
          role="option"
          selected=""
          value="10"
        >
          10
        </sbb-option>
        <sbb-option
          aria-selected="false"
          data-disable-highlight=""
          data-slot-names="unnamed"
          data-variant="select"
          id="sbb-option-4"
          role="option"
          value="25"
        >
          25
        </sbb-option>
        <sbb-option
          aria-selected="false"
          data-disable-highlight=""
          data-slot-names="unnamed"
          data-variant="select"
          id="sbb-option-5"
          role="option"
          value="50"
        >
          50
        </sbb-option>
      </sbb-select>
    </sbb-form-field>
  </div>
</div>
<sbb-screen-reader-only role="status">
  Page 1 selected.
</sbb-screen-reader-only>
`;
/* end snapshot sbb-paginator renders with options Chrome-Firefox Shadow DOM */

snapshots["sbb-paginator renders with options Safari DOM"] = 
`<sbb-paginator
  length="50"
  page-size="10"
  pager-position="start"
  role="group"
  size="m"
>
</sbb-paginator>
`;
/* end snapshot sbb-paginator renders with options Safari DOM */

snapshots["sbb-paginator renders with options Safari Shadow DOM"] = 
`<div class="sbb-paginator">
  <span class="sbb-paginator__wrapping-group">
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
    <ul class="sbb-paginator__pages">
      <li class="sbb-paginator__page--number">
        <button
          aria-current="true"
          aria-label="Page 1"
          class="sbb-paginator__page--number-item"
          data-index="0"
          data-selected=""
        >
          <span class="sbb-paginator__page--number-item-label">
            1
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 2"
          class="sbb-paginator__page--number-item"
          data-index="1"
        >
          <span class="sbb-paginator__page--number-item-label">
            2
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 3"
          class="sbb-paginator__page--number-item"
          data-index="2"
        >
          <span class="sbb-paginator__page--number-item-label">
            3
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 4"
          class="sbb-paginator__page--number-item"
          data-index="3"
        >
          <span class="sbb-paginator__page--number-item-label">
            4
          </span>
        </button>
      </li>
      <li class="sbb-paginator__page--number">
        <button
          aria-label="Page 5"
          class="sbb-paginator__page--number-item"
          data-index="4"
        >
          <span class="sbb-paginator__page--number-item-label">
            5
          </span>
        </button>
      </li>
    </ul>
  </span>
  <div class="sbb-paginator__page-size-options">
    <label for="select">
      Items per page
    </label>
    <sbb-form-field
      borderless=""
      data-input-type="sbb-select"
      data-slot-names="unnamed"
      error-space="none"
      size="m"
      width="collapse"
    >
      <div
        aria-controls="sbb-select-2"
        aria-expanded="false"
        aria-haspopup="listbox"
        aria-label="Items per page"
        aria-owns="sbb-select-2"
        aria-required="false"
        class="sbb-screen-reader-only"
        role="combobox"
        style="top: 0px; height: 48px; width: 56px;"
        tabindex="0"
      >
        10
      </div>
      <sbb-select
        data-option-panel-origin-borderless=""
        data-state="closed"
        id="select"
        role="listbox"
        value="10"
      >
        <sbb-option
          aria-selected="true"
          data-disable-highlight=""
          data-slot-names="unnamed"
          data-variant="select"
          id="sbb-option-3"
          role="option"
          selected=""
          value="10"
        >
          10
        </sbb-option>
        <sbb-option
          aria-selected="false"
          data-disable-highlight=""
          data-slot-names="unnamed"
          data-variant="select"
          id="sbb-option-4"
          role="option"
          value="25"
        >
          25
        </sbb-option>
        <sbb-option
          aria-selected="false"
          data-disable-highlight=""
          data-slot-names="unnamed"
          data-variant="select"
          id="sbb-option-5"
          role="option"
          value="50"
        >
          50
        </sbb-option>
      </sbb-select>
    </sbb-form-field>
  </div>
</div>
<sbb-screen-reader-only role="status">
  Page 1 selected.
</sbb-screen-reader-only>
`;
/* end snapshot sbb-paginator renders with options Safari Shadow DOM */

snapshots["sbb-paginator renders with options A11y tree Chrome"] = 
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
      "role": "button",
      "name": "Page 1"
    },
    {
      "role": "button",
      "name": "Page 2"
    },
    {
      "role": "button",
      "name": "Page 3"
    },
    {
      "role": "button",
      "name": "Page 4"
    },
    {
      "role": "button",
      "name": "Page 5"
    },
    {
      "role": "text",
      "name": "Items per page"
    },
    {
      "role": "text",
      "name": "​"
    },
    {
      "role": "combobox",
      "name": "Items per page",
      "haspopup": "listbox",
      "value": "10"
    },
    {
      "role": "text",
      "name": "Page 1 selected."
    }
  ]
}
</p>
`;
/* end snapshot sbb-paginator renders with options A11y tree Chrome */

snapshots["sbb-paginator renders with options A11y tree Firefox"] = 
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
      "role": "button",
      "name": "Page 1"
    },
    {
      "role": "button",
      "name": "Page 2"
    },
    {
      "role": "button",
      "name": "Page 3"
    },
    {
      "role": "button",
      "name": "Page 4"
    },
    {
      "role": "button",
      "name": "Page 5"
    },
    {
      "role": "text leaf",
      "name": "Items per page"
    },
    {
      "role": "statictext",
      "name": "​"
    },
    {
      "role": "combobox",
      "name": "Items per page",
      "haspopup": "listbox",
      "value": "10"
    },
    {
      "role": "text leaf",
      "name": "Page 1 selected."
    }
  ]
}
</p>
`;
/* end snapshot sbb-paginator renders with options A11y tree Firefox */

