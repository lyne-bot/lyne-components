/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser renders after centered DOM"] = 
`<sbb-teaser
  accessibility-label="SBB teaser"
  alignment="after-centered"
  data-action=""
  data-link=""
  href="https://github.com/sbb-design-systems/lyne-components"
>
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders after centered DOM */

snapshots["sbb-teaser renders after centered Shadow DOM"] = 
`<div class="sbb-teaser__wrapper">
  <a
    aria-label="SBB teaser"
    class="sbb-action-base sbb-teaser"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    <sbb-screen-reader-only>
      SBB teaser
    </sbb-screen-reader-only>
  </a>
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <sbb-chip-label
        class="sbb-teaser__chip-label"
        color="charcoal"
        size="xxs"
      >
        <slot name="chip">
        </slot>
      </sbb-chip-label>
      <sbb-title
        aria-level="5"
        class="sbb-teaser__lead"
        level="5"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
        </slot>
      </sbb-title>
      <span class="sbb-teaser__description">
        <slot>
        </slot>
      </span>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-teaser renders after centered Shadow DOM */

snapshots["sbb-teaser renders after with title level set DOM"] = 
`<sbb-teaser
  accessibility-label="SBB teaser"
  alignment="after"
  data-action=""
  data-link=""
  href="https://github.com/sbb-design-systems/lyne-components"
  title-level="2"
>
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders after with title level set DOM */

snapshots["sbb-teaser renders after with title level set Shadow DOM"] = 
`<div class="sbb-teaser__wrapper">
  <a
    aria-label="SBB teaser"
    class="sbb-action-base sbb-teaser"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    <sbb-screen-reader-only>
      SBB teaser
    </sbb-screen-reader-only>
  </a>
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <sbb-chip-label
        class="sbb-teaser__chip-label"
        color="charcoal"
        size="xxs"
      >
        <slot name="chip">
        </slot>
      </sbb-chip-label>
      <sbb-title
        aria-level="2"
        class="sbb-teaser__lead"
        level="2"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
        </slot>
      </sbb-title>
      <span class="sbb-teaser__description">
        <slot>
        </slot>
      </span>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-teaser renders after with title level set Shadow DOM */

snapshots["sbb-teaser renders below with projected content DOM"] = 
`<sbb-teaser
  accessibility-label="SBB teaser"
  alignment="below"
  data-action=""
  data-link=""
  data-slot-names="chip image title unnamed"
  href="https://github.com/sbb-design-systems/lyne-components"
>
  <figure
    class="sbb-figure"
    slot="image"
  >
    <img
      alt="400x300"
      src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg"
    >
  </figure>
  <span slot="chip">
    Chip
  </span>
  <span slot="title">
    TITLE
  </span>
  description
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders below with projected content DOM */

snapshots["sbb-teaser renders below with projected content Shadow DOM"] = 
`<div class="sbb-teaser__wrapper">
  <a
    aria-label="SBB teaser"
    class="sbb-action-base sbb-teaser"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    <sbb-screen-reader-only>
      SBB teaser
    </sbb-screen-reader-only>
  </a>
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <sbb-chip-label
        class="sbb-teaser__chip-label"
        color="charcoal"
        size="xxs"
      >
        <slot name="chip">
        </slot>
      </sbb-chip-label>
      <sbb-title
        aria-level="5"
        class="sbb-teaser__lead"
        level="5"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
        </slot>
      </sbb-title>
      <span class="sbb-teaser__description">
        <slot>
        </slot>
      </span>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-teaser renders below with projected content Shadow DOM */

snapshots["sbb-teaser renders after centered A11y tree Chrome"] = 
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
      "role": "link",
      "name": "SBB teaser"
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser renders after centered A11y tree Chrome */

snapshots["sbb-teaser renders after centered A11y tree Firefox"] = 
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
      "role": "link",
      "name": "SBB teaser",
      "value": "https://github.com/sbb-design-systems/lyne-components"
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser renders after centered A11y tree Firefox */

