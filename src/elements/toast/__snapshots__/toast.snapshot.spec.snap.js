/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toast renders Chrome-Safari DOM"] = 
`<sbb-toast
  data-slot-names="unnamed"
  data-state="closed"
  dismissible=""
  icon-name="circle-tick-small"
  position="bottom-center"
>
  <span>
    'Lorem ipsum dolor'
  </span>
</sbb-toast>
`;
/* end snapshot sbb-toast renders Chrome-Safari DOM */

snapshots["sbb-toast renders Chrome-Safari Shadow DOM"] = 
`<div class="sbb-toast__overlay-container">
  <div class="sbb-toast">
    <div class="sbb-toast__icon">
      <slot name="icon">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="circle-tick-small"
          role="img"
        >
        </sbb-icon>
      </slot>
    </div>
    <div
      aria-live="polite"
      class="sbb-toast__content"
    >
      <slot>
      </slot>
    </div>
    <div class="sbb-toast__action">
      <slot name="action">
        <sbb-transparent-button
          aria-label="Close message"
          class="sbb-toast__action-button"
          data-action=""
          data-button=""
          data-sbb-button=""
          icon-name="cross-small"
          negative=""
          sbb-toast-close=""
          size="m"
          tabindex="0"
        >
        </sbb-transparent-button>
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-toast renders Chrome-Safari Shadow DOM */

snapshots["sbb-toast renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-toast renders A11y tree Chrome */

snapshots["sbb-toast renders Firefox DOM"] = 
`<sbb-toast
  data-slot-names="unnamed"
  data-state="closed"
  dismissible=""
  icon-name="circle-tick-small"
  position="bottom-center"
>
  <span>
    'Lorem ipsum dolor'
  </span>
</sbb-toast>
`;
/* end snapshot sbb-toast renders Firefox DOM */

snapshots["sbb-toast renders Firefox Shadow DOM"] = 
`<div class="sbb-toast__overlay-container">
  <div
    class="sbb-toast"
    role="status"
  >
    <div class="sbb-toast__icon">
      <slot name="icon">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="circle-tick-small"
          role="img"
        >
        </sbb-icon>
      </slot>
    </div>
    <div
      aria-live="polite"
      class="sbb-toast__content"
    >
      <slot>
      </slot>
    </div>
    <div class="sbb-toast__action">
      <slot name="action">
        <sbb-transparent-button
          aria-label="Close message"
          class="sbb-toast__action-button"
          data-action=""
          data-button=""
          data-sbb-button=""
          icon-name="cross-small"
          negative=""
          sbb-toast-close=""
          size="m"
          tabindex="0"
        >
        </sbb-transparent-button>
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-toast renders Firefox Shadow DOM */

snapshots["sbb-toast renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-toast renders A11y tree Firefox */

