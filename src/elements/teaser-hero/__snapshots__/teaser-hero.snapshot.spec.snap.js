/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-hero renders DOM"] = 
`<sbb-teaser-hero
  accessibility-label="label"
  data-action=""
  data-link=""
  data-slot-names="image link-content unnamed"
  href="https://www.sbb.ch"
>
  Break out and explore castles and palaces.
  <span slot="link-content">
    Find out more
  </span>
  <figure
    class="sbb-figure"
    slot="image"
  >
    <sbb-image data-loaded="">
    </sbb-image>
    <sbb-chip-label
      class="sbb-figure-overlap-start-start"
      color="charcoal"
      size="xxs"
    >
      Label
    </sbb-chip-label>
  </figure>
</sbb-teaser-hero>
`;
/* end snapshot sbb-teaser-hero renders DOM */

snapshots["sbb-teaser-hero renders Shadow DOM"] = 
`<a
  aria-label="label"
  class="sbb-action-base sbb-teaser-hero"
  href="https://www.sbb.ch"
>
  <span class="sbb-teaser-hero__panel">
    <p class="sbb-teaser-hero__panel-text">
      <slot>
      </slot>
    </p>
    <sbb-block-link-static
      class="sbb-teaser-hero__panel-link"
      data-action=""
      data-sbb-link=""
      data-slot-names="link-content unnamed"
      icon-name="chevron-small-right-small"
      icon-placement="end"
      negative=""
      size="m"
    >
      <slot name="link-content">
      </slot>
    </sbb-block-link-static>
  </span>
  <slot name="image">
  </slot>
</a>
`;
/* end snapshot sbb-teaser-hero renders Shadow DOM */

snapshots["sbb-teaser-hero renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "label",
      "value": "https://www.sbb.ch/"
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-hero renders A11y tree Firefox */

snapshots["sbb-teaser-hero renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-hero renders A11y tree Chrome */

snapshots["sbb-teaser-hero renders with img DOM"] = 
`<sbb-teaser-hero
  accessibility-label="label"
  data-action=""
  data-link=""
  data-slot-names="image unnamed"
  href="https://www.sbb.ch"
  link-content="Find out more"
  rel="external"
  target="_blank"
>
  Break out and explore castles and palaces.
  <figure
    class="sbb-figure"
    slot="image"
  >
    <img alt="alt">
    <sbb-chip-label
      class="sbb-figure-overlap-start-start"
      color="charcoal"
      size="xxs"
    >
      Label
    </sbb-chip-label>
  </figure>
</sbb-teaser-hero>
`;
/* end snapshot sbb-teaser-hero renders with img DOM */

snapshots["sbb-teaser-hero renders with img Shadow DOM"] = 
`<a
  aria-label="label"
  class="sbb-action-base sbb-teaser-hero"
  href="https://www.sbb.ch"
  rel="external"
  target="_blank"
>
  <span class="sbb-teaser-hero__panel">
    <p class="sbb-teaser-hero__panel-text">
      <slot>
      </slot>
    </p>
    <sbb-block-link-static
      class="sbb-teaser-hero__panel-link"
      data-action=""
      data-sbb-link=""
      data-slot-names="unnamed"
      icon-name="chevron-small-right-small"
      icon-placement="end"
      negative=""
      size="m"
    >
      <slot name="link-content">
        Find out more
      </slot>
    </sbb-block-link-static>
  </span>
  <slot name="image">
  </slot>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-teaser-hero renders with img Shadow DOM */

