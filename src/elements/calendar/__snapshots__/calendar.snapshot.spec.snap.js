/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-calendar renders DOM"] = 
`<sbb-calendar
  now="2023-01-04T00:00:00"
  selected="2023-01-20T00:00:00"
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar renders DOM */

snapshots["sbb-calendar renders Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      data-action=""
      data-button=""
      data-sbb-button=""
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      role="button"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="chevron-small-down-small"
          role="img"
        >
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      data-action=""
      data-button=""
      data-sbb-button=""
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      role="button"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
    <table class="sbb-calendar__table">
      <thead class="sbb-calendar__table-header">
        <tr class="sbb-calendar__table-header-row">
          <th class="sbb-calendar__table-header">
            <sbb-screen-reader-only>
              Monday
            </sbb-screen-reader-only>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header">
            <sbb-screen-reader-only>
              Tuesday
            </sbb-screen-reader-only>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header">
            <sbb-screen-reader-only>
              Wednesday
            </sbb-screen-reader-only>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header">
            <sbb-screen-reader-only>
              Thursday
            </sbb-screen-reader-only>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header">
            <sbb-screen-reader-only>
              Friday
            </sbb-screen-reader-only>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header">
            <sbb-screen-reader-only>
              Saturday
            </sbb-screen-reader-only>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header">
            <sbb-screen-reader-only>
              Sunday
            </sbb-screen-reader-only>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="sbb-calendar__table-body">
        <tr>
          <td
            class="sbb-calendar__table-data"
            data-day="0 1 2023"
          >
          </td>
          <td
            class="sbb-calendar__table-data"
            data-day="0 1 2023"
          >
          </td>
          <td
            class="sbb-calendar__table-data"
            data-day="0 1 2023"
          >
          </td>
          <td
            class="sbb-calendar__table-data"
            data-day="0 1 2023"
          >
          </td>
          <td
            class="sbb-calendar__table-data"
            data-day="0 1 2023"
          >
          </td>
          <td
            class="sbb-calendar__table-data"
            data-day="0 1 2023"
          >
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 1, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="1 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              1
            </button>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 2, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="2 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              2
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 3, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="3 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              3
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-current="date"
              aria-disabled="false"
              aria-label="January 4, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__cell-current sbb-calendar__day"
              data-day="4 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              4
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 5, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="5 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              5
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 6, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="6 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              6
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 7, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="7 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              7
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 8, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="8 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              8
            </button>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 9, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="9 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              9
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 10, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="10 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              10
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 11, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="11 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              11
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 12, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="12 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              12
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 13, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="13 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              13
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 14, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="14 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              14
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 15, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="15 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              15
            </button>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 16, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="16 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              16
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 17, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="17 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              17
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 18, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="18 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              18
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 19, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="19 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              19
            </button>
          </td>
          <td class="sbb-calendar__table-data sbb-calendar__table-data-selected">
            <button
              aria-disabled="false"
              aria-label="January 20, 2023"
              aria-pressed="true"
              class="sbb-calendar__cell sbb-calendar__day sbb-calendar__selected"
              data-day="20 1 2023"
              sbb-popover-close=""
              tabindex="0"
            >
              20
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 21, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="21 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              21
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 22, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="22 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              22
            </button>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 23, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="23 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              23
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 24, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="24 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              24
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 25, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="25 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              25
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 26, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="26 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              26
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 27, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="27 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              27
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 28, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="28 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              28
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 29, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="29 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              29
            </button>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 30, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="30 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              30
            </button>
          </td>
          <td class="sbb-calendar__table-data">
            <button
              aria-disabled="false"
              aria-label="January 31, 2023"
              aria-pressed="false"
              class="sbb-calendar__cell sbb-calendar__day"
              data-day="31 1 2023"
              sbb-popover-close=""
              tabindex="-1"
            >
              31
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar renders Shadow DOM */

snapshots["sbb-calendar renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Change to the previous month"
    },
    {
      "role": "button",
      "name": "Choose year and month January 2023"
    },
    {
      "role": "text",
      "name": "January 2023"
    },
    {
      "role": "button",
      "name": "Change to the next month"
    },
    {
      "role": "text",
      "name": "Monday"
    },
    {
      "role": "text",
      "name": "Tuesday"
    },
    {
      "role": "text",
      "name": "Wednesday"
    },
    {
      "role": "text",
      "name": "Thursday"
    },
    {
      "role": "text",
      "name": "Friday"
    },
    {
      "role": "text",
      "name": "Saturday"
    },
    {
      "role": "text",
      "name": "Sunday"
    },
    {
      "role": "button",
      "name": "January 1, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 2, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 3, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 4, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 5, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 6, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 7, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 8, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 9, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 10, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 11, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 12, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 13, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 14, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 15, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 16, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 17, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 18, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 19, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 20, 2023",
      "pressed": true
    },
    {
      "role": "button",
      "name": "January 21, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 22, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 23, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 24, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 25, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 26, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 27, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 28, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 29, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 30, 2023",
      "pressed": false
    },
    {
      "role": "button",
      "name": "January 31, 2023",
      "pressed": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-calendar renders A11y tree Chrome */

snapshots["sbb-calendar renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Change to the previous month"
    },
    {
      "role": "button",
      "name": "Choose year and month January 2023"
    },
    {
      "role": "text leaf",
      "name": "January 2023 "
    },
    {
      "role": "button",
      "name": "Change to the next month"
    },
    {
      "role": "text leaf",
      "name": "Monday"
    },
    {
      "role": "text leaf",
      "name": "Tuesday"
    },
    {
      "role": "text leaf",
      "name": "Wednesday"
    },
    {
      "role": "text leaf",
      "name": "Thursday"
    },
    {
      "role": "text leaf",
      "name": "Friday"
    },
    {
      "role": "text leaf",
      "name": "Saturday"
    },
    {
      "role": "text leaf",
      "name": "Sunday"
    },
    {
      "role": "toggle button",
      "name": "January 1, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 2, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 3, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 4, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 5, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 6, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 7, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 8, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 9, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 10, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 11, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 12, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 13, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 14, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 15, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 16, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 17, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 18, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 19, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 20, 2023",
      "pressed": true
    },
    {
      "role": "toggle button",
      "name": "January 21, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 22, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 23, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 24, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 25, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 26, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 27, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 28, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 29, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 30, 2023"
    },
    {
      "role": "toggle button",
      "name": "January 31, 2023"
    }
  ]
}
</p>
`;
/* end snapshot sbb-calendar renders A11y tree Firefox */

