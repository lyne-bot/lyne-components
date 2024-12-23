/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Summary",
      "level": 4
    },
    {
      "role": "button",
      "name": "Click on this card to show more details"
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot A11y tree Chrome */

snapshots["sbb-flip-card DOM"] = 
`<sbb-flip-card data-image-alignment="after">
  <sbb-flip-card-summary
    image-alignment="after"
    slot="summary"
  >
    <sbb-title
      aria-level="4"
      level="4"
      role="heading"
    >
      Summary
    </sbb-title>
    <sbb-image slot="image">
    </sbb-image>
  </sbb-flip-card-summary>
  <sbb-flip-card-details
    inert=""
    slot="details"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
          Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus
          vitae tortor ullamcorper maximus. In convallis consectetur felis.
    <sbb-link
      data-action=""
      data-card-focusable=""
      data-link=""
      data-sbb-link=""
      data-slot-names="unnamed"
      href="https://www.sbb.ch"
      negative=""
      size="s"
    >
      Link
    </sbb-link>
  </sbb-flip-card-details>
</sbb-flip-card>
`;
/* end snapshot sbb-flip-card DOM */

snapshots["sbb-flip-card Shadow DOM"] = 
`<div class="sbb-flip-card">
  <button
    aria-expanded="false"
    class="sbb-flip-card-button"
    type="button"
  >
    <sbb-screen-reader-only>
      Summary, Click on this card for details
    </sbb-screen-reader-only>
  </button>
  <slot name="summary">
  </slot>
  <slot name="details">
  </slot>
  <sbb-secondary-button-static
    class="sbb-flip-card--toggle-button"
    data-action=""
    data-sbb-button=""
    data-slot-names="icon"
    size="s"
  >
    <sbb-icon
      aria-hidden="true"
      class="sbb-flip-card--toggle-button-icon"
      data-namespace="default"
      name="plus-small"
      role="img"
      slot="icon"
    >
    </sbb-icon>
  </sbb-secondary-button-static>
</div>
`;
/* end snapshot sbb-flip-card Shadow DOM */

snapshots["sbb-flip-card A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Summary, Click on this card for details"
    },
    {
      "role": "heading",
      "name": "Summary",
      "level": 4
    }
  ]
}
</p>
`;
/* end snapshot sbb-flip-card A11y tree Chrome */

snapshots["sbb-flip-card A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Summary, Click on this card for details"
    },
    {
      "role": "heading",
      "name": "Summary",
      "level": 4
    }
  ]
}
</p>
`;
/* end snapshot sbb-flip-card A11y tree Firefox */

