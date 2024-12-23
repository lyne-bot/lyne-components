/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-train-formation should render with one train DOM"] = 
`<sbb-train-formation view="side">
  <sbb-train
    direction="left"
    slot="li-0"
  >
    <sbb-train-wagon
      sector="A"
      slot="li-0"
      type="wagon"
    >
    </sbb-train-wagon>
  </sbb-train>
</sbb-train-formation>
`;
/* end snapshot sbb-train-formation should render with one train DOM */

snapshots["sbb-train-formation should render with one train Shadow DOM"] = 
`<div class="sbb-train-formation">
  <div
    aria-hidden="true"
    class="sbb-train-formation__sectors"
  >
    <span
      class="sbb-train-formation__sector"
      style="
                --sbb-train-formation-wagon-count: 1;
                --sbb-train-formation-wagon-blocked-passage-count: 0"
    >
      <span class="sbb-train-formation__sector-sticky-wrapper">
        Sec. A
      </span>
    </span>
  </div>
  <div class="sbb-train-formation__trains">
    <sbb-screen-reader-only>
      Trains
    </sbb-screen-reader-only>
    <span class="sbb-train-formation__train-list">
      <span>
        <slot name="li-0">
        </slot>
      </span>
    </span>
    <span hidden="">
      <slot>
      </slot>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-train-formation should render with one train Shadow DOM */

snapshots["sbb-train-formation should render with multiple trains DOM"] = 
`<sbb-train-formation view="side">
  <sbb-train
    direction="left"
    slot="li-0"
  >
    <sbb-train-wagon
      sector="A"
      slot="li-0"
      type="wagon"
    >
    </sbb-train-wagon>
  </sbb-train>
  <sbb-train
    direction="left"
    slot="li-1"
  >
    <sbb-train-wagon
      sector="B"
      slot="li-0"
      type="wagon"
    >
    </sbb-train-wagon>
  </sbb-train>
</sbb-train-formation>
`;
/* end snapshot sbb-train-formation should render with multiple trains DOM */

snapshots["sbb-train-formation should render with multiple trains Shadow DOM"] = 
`<div class="sbb-train-formation">
  <div
    aria-hidden="true"
    class="sbb-train-formation__sectors"
  >
    <span
      class="sbb-train-formation__sector"
      style="
                --sbb-train-formation-wagon-count: 1;
                --sbb-train-formation-wagon-blocked-passage-count: 0"
    >
      <span class="sbb-train-formation__sector-sticky-wrapper">
        Sec. A
      </span>
    </span>
    <span
      class="sbb-train-formation__sector"
      style="
                --sbb-train-formation-wagon-count: 1;
                --sbb-train-formation-wagon-blocked-passage-count: 0"
    >
      <span class="sbb-train-formation__sector-sticky-wrapper">
        Sec. B
      </span>
    </span>
  </div>
  <div class="sbb-train-formation__trains">
    <ul
      aria-label="Trains"
      class="sbb-train-formation__train-list"
    >
      <li>
        <slot name="li-0">
        </slot>
      </li>
      <li>
        <slot name="li-1">
        </slot>
      </li>
    </ul>
    <span hidden="">
      <slot>
      </slot>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-train-formation should render with multiple trains Shadow DOM */

snapshots["sbb-train-formation should render with multiple trains A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Train.",
      "level": 6
    },
    {
      "role": "text",
      "name": "Coaches of the train"
    },
    {
      "role": "text",
      "name": "Train coach, Sector, A"
    },
    {
      "role": "heading",
      "name": "Train.",
      "level": 6
    },
    {
      "role": "text",
      "name": "Coaches of the train"
    },
    {
      "role": "text",
      "name": "Train coach, Sector, B"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-formation should render with multiple trains A11y tree Chrome */

snapshots["sbb-train-formation should render with multiple trains A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Train.",
      "level": 6
    },
    {
      "role": "text leaf",
      "name": "Coaches of the train"
    },
    {
      "role": "text leaf",
      "name": "Train coach, Sector, A"
    },
    {
      "role": "heading",
      "name": "Train.",
      "level": 6
    },
    {
      "role": "text leaf",
      "name": "Coaches of the train"
    },
    {
      "role": "text leaf",
      "name": "Train coach, Sector, B"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-formation should render with multiple trains A11y tree Firefox */

