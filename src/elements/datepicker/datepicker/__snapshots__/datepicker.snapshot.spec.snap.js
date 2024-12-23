/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-datepicker renders DOM"] = 
`<sbb-form-field
  data-input-empty=""
  data-input-type="input"
  data-slot-names="prefix suffix unnamed"
  error-space="none"
  size="m"
  width="default"
>
  <input
    placeholder="DD.MM.YYYY"
    type="text"
  >
  <sbb-datepicker>
  </sbb-datepicker>
  <sbb-datepicker-previous-day
    aria-disabled="true"
    aria-label="Previous day"
    data-action=""
    data-button=""
    data-disabled=""
    slot="prefix"
  >
  </sbb-datepicker-previous-day>
  <sbb-datepicker-next-day
    aria-disabled="true"
    aria-label="Next day"
    data-action=""
    data-button=""
    data-disabled=""
    slot="suffix"
  >
  </sbb-datepicker-next-day>
  <sbb-datepicker-toggle slot="prefix">
  </sbb-datepicker-toggle>
</sbb-form-field>
`;
/* end snapshot sbb-datepicker renders DOM */

snapshots["sbb-datepicker renders Shadow DOM"] = 
`<div class="sbb-form-field__space-wrapper">
  <div
    class="sbb-form-field__wrapper"
    id="overlay-anchor"
  >
    <slot name="prefix">
    </slot>
    <div class="sbb-form-field__input-container">
      <span
        aria-hidden="true"
        class="sbb-form-field__label-spacer"
      >
      </span>
      <span class="sbb-form-field__label">
        <span class="sbb-form-field__label-ellipsis">
          <slot name="label">
          </slot>
        </span>
      </span>
      <div class="sbb-form-field__input">
        <slot>
        </slot>
      </div>
    </div>
    <slot name="suffix">
    </slot>
  </div>
  <div class="sbb-form-field__error">
    <slot name="error">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-datepicker renders Shadow DOM */

snapshots["sbb-datepicker renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "​"
    },
    {
      "role": "button",
      "name": "Previous day",
      "disabled": true
    },
    {
      "role": "button",
      "name": "Show calendar",
      "haspopup": "dialog"
    },
    {
      "role": "textbox",
      "name": "DD.MM.YYYY"
    },
    {
      "role": "button",
      "name": "Next day",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker renders A11y tree Chrome */

snapshots["sbb-datepicker renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "statictext",
      "name": "​"
    },
    {
      "role": "button",
      "name": "Previous day",
      "disabled": true
    },
    {
      "role": "button",
      "name": "Show calendar",
      "haspopup": "dialog"
    },
    {
      "role": "textbox",
      "name": "DD.MM.YYYY"
    },
    {
      "role": "button",
      "name": "Next day",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker renders A11y tree Firefox */

