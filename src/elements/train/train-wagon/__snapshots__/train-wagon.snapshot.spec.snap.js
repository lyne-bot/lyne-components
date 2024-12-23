/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-train-wagon should render as type wagon DOM"] = 
`<sbb-train-wagon
  blocked-passage="previous"
  label="38"
  occupancy="none"
  type="wagon"
  wagon-class="1"
>
</sbb-train-wagon>
`;
/* end snapshot sbb-train-wagon should render as type wagon DOM */

snapshots["sbb-train-wagon should render as type wagon Shadow DOM"] = 
`<div class="sbb-train-wagon">
  <ul
    aria-label="Train coach"
    class="sbb-train-wagon__compartment"
  >
    <li
      aria-hidden="false"
      class="sbb-train-wagon__label"
    >
      <span class="sbb-screen-reader-only">
        Number, 38
      </span>
      <span aria-hidden="true">
        38
      </span>
    </li>
    <li class="sbb-train-wagon__class">
      <span class="sbb-screen-reader-only">
        First Class
      </span>
      <span aria-hidden="true">
        1
      </span>
    </li>
    <sbb-timetable-occupancy-icon
      aria-label="No occupancy forecast available"
      class="sbb-train-wagon__occupancy"
      data-namespace="default"
      occupancy="none"
      role="listitem"
    >
    </sbb-timetable-occupancy-icon>
    <li class="sbb-screen-reader-only">
      No passage to the previous train coach
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon should render as type wagon Shadow DOM */

snapshots["sbb-train-wagon should render as type wagon with one icon DOM"] = 
`<sbb-train-wagon type="wagon">
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="sa-rs"
    role="img"
    slot="li-0"
  >
  </sbb-icon>
</sbb-train-wagon>
`;
/* end snapshot sbb-train-wagon should render as type wagon with one icon DOM */

snapshots["sbb-train-wagon should render as type wagon with one icon Shadow DOM"] = 
`<div class="sbb-train-wagon">
  <div class="sbb-train-wagon__compartment">
    <span class="sbb-screen-reader-only">
      Train coach
    </span>
    <span
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </span>
  </div>
  <sbb-screen-reader-only>
    Additional wagon information
  </sbb-screen-reader-only>
  <span class="sbb-train-wagon__attribute-icon-list">
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
`;
/* end snapshot sbb-train-wagon should render as type wagon with one icon Shadow DOM */

snapshots["sbb-train-wagon should render as type wagon with multiple icons DOM"] = 
`<sbb-train-wagon type="wagon">
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="sa-rs"
    role="img"
    slot="li-0"
  >
  </sbb-icon>
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="sa-rs"
    role="img"
    slot="li-1"
  >
  </sbb-icon>
</sbb-train-wagon>
`;
/* end snapshot sbb-train-wagon should render as type wagon with multiple icons DOM */

snapshots["sbb-train-wagon should render as type wagon with multiple icons Shadow DOM"] = 
`<div class="sbb-train-wagon">
  <div class="sbb-train-wagon__compartment">
    <span class="sbb-screen-reader-only">
      Train coach
    </span>
    <span
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </span>
  </div>
  <ul
    aria-label="Additional wagon information"
    class="sbb-train-wagon__attribute-icon-list"
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
`;
/* end snapshot sbb-train-wagon should render as type wagon with multiple icons Shadow DOM */

snapshots["sbb-train-wagon should render as type locomotive DOM"] = 
`<sbb-train-wagon
  additional-accessibility-text="Top of the train"
  type="locomotive"
>
</sbb-train-wagon>
`;
/* end snapshot sbb-train-wagon should render as type locomotive DOM */

snapshots["sbb-train-wagon should render as type locomotive Shadow DOM"] = 
`<div class="sbb-train-wagon">
  <div class="sbb-train-wagon__compartment">
    <span class="sbb-screen-reader-only">
      Locomotive
    </span>
    <span
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </span>
  </div>
  <span class="sbb-screen-reader-only">
    , Top of the train
  </span>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon should render as type locomotive Shadow DOM */

snapshots["sbb-train-wagon should render as type closed wagon without number DOM"] = 
`<sbb-train-wagon type="closed">
</sbb-train-wagon>
`;
/* end snapshot sbb-train-wagon should render as type closed wagon without number DOM */

snapshots["sbb-train-wagon should render as type closed wagon without number Shadow DOM"] = 
`<div class="sbb-train-wagon">
  <div class="sbb-train-wagon__compartment">
    <span class="sbb-screen-reader-only">
      Closed train coach
    </span>
    <span
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </span>
  </div>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon should render as type closed wagon without number Shadow DOM */

snapshots["sbb-train-wagon should render as type wagon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Number, 38"
    },
    {
      "role": "text",
      "name": "First Class"
    },
    {
      "role": "text",
      "name": "No passage to the previous train coach"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon should render as type wagon A11y tree Chrome */

snapshots["sbb-train-wagon should render as type wagon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Number, 38"
    },
    {
      "role": "text leaf",
      "name": "First Class"
    },
    {
      "role": "text leaf",
      "name": "No passage to the previous train coach"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon should render as type wagon A11y tree Firefox */

snapshots["sbb-train-wagon should render as type wagon end with only one property DOM"] = 
`<sbb-train-wagon
  type="wagon-end-right"
  wagon-class="1"
>
</sbb-train-wagon>
`;
/* end snapshot sbb-train-wagon should render as type wagon end with only one property DOM */

snapshots["sbb-train-wagon should render as type wagon end with only one property Shadow DOM"] = 
`<div class="sbb-train-wagon">
  <div class="sbb-train-wagon__compartment">
    <span class="sbb-screen-reader-only">
      Train coach
    </span>
    <span
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </span>
    <span class="sbb-train-wagon__class">
      <span class="sbb-screen-reader-only">
        First Class
      </span>
      <span aria-hidden="true">
        1
      </span>
    </span>
  </div>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon should render as type wagon end with only one property Shadow DOM */

snapshots["sbb-train-wagon should render as type wagon end with only one property A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Train coach"
    },
    {
      "role": "text",
      "name": "First Class"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon should render as type wagon end with only one property A11y tree Chrome */

snapshots["sbb-train-wagon should render as type wagon end with only one property A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Train coach"
    },
    {
      "role": "text leaf",
      "name": "First Class"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon should render as type wagon end with only one property A11y tree Firefox */

snapshots["sbb-train-wagon should render as type wagon-end-right with only one property DOM"] = 
`<sbb-train-wagon
  type="wagon-end-right"
  wagon-class="1"
>
</sbb-train-wagon>
`;
/* end snapshot sbb-train-wagon should render as type wagon-end-right with only one property DOM */

snapshots["sbb-train-wagon should render as type wagon-end-right with only one property Shadow DOM"] = 
`<div class="sbb-train-wagon">
  <ul
    aria-label="Train coach"
    class="sbb-train-wagon__compartment"
  >
    <li
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </li>
    <li class="sbb-train-wagon__class">
      <span class="sbb-screen-reader-only">
        First Class
      </span>
      <span aria-hidden="true">
        1
      </span>
    </li>
    <li class="sbb-screen-reader-only">
      No passage to the next train coach
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon should render as type wagon-end-right with only one property Shadow DOM */

snapshots["sbb-train-wagon should render as type wagon-end-right with only one property A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "First Class"
    },
    {
      "role": "text",
      "name": "No passage to the next train coach"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon should render as type wagon-end-right with only one property A11y tree Chrome */

snapshots["sbb-train-wagon should render as type wagon-end-right with only one property A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "First Class"
    },
    {
      "role": "text leaf",
      "name": "No passage to the next train coach"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon should render as type wagon-end-right with only one property A11y tree Firefox */

snapshots["sbb-train-wagon should render with only label DOM"] = 
`<sbb-train-wagon
  label="1"
  type="wagon"
>
</sbb-train-wagon>
`;
/* end snapshot sbb-train-wagon should render with only label DOM */

snapshots["sbb-train-wagon should render with only label Shadow DOM"] = 
`<div class="sbb-train-wagon">
  <div class="sbb-train-wagon__compartment">
    <span class="sbb-screen-reader-only">
      Train coach
    </span>
    <span
      aria-hidden="false"
      class="sbb-train-wagon__label"
    >
      <span class="sbb-screen-reader-only">
        Number, 1
      </span>
      <span aria-hidden="true">
        1
      </span>
    </span>
  </div>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon should render with only label Shadow DOM */

snapshots["sbb-train-wagon should render with only label A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Train coach"
    },
    {
      "role": "text leaf",
      "name": "Number, 1"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon should render with only label A11y tree Firefox */

snapshots["sbb-train-wagon should render with only label A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Train coach"
    },
    {
      "role": "text",
      "name": "Number, 1"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon should render with only label A11y tree Chrome */

snapshots["sbb-train-wagon should render as type wagon-end-left DOM"] = 
`<sbb-train-wagon type="wagon-end-left">
</sbb-train-wagon>
`;
/* end snapshot sbb-train-wagon should render as type wagon-end-left DOM */

snapshots["sbb-train-wagon should render as type wagon-end-left Shadow DOM"] = 
`<div class="sbb-train-wagon">
  <div class="sbb-train-wagon__compartment">
    <span class="sbb-screen-reader-only">
      Train coach
    </span>
    <span
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </span>
    <span class="sbb-screen-reader-only">
      No passage to the previous train coach
    </span>
  </div>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon should render as type wagon-end-left Shadow DOM */

snapshots["sbb-train-wagon should render as type wagon-end-left A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Train coach"
    },
    {
      "role": "text",
      "name": "No passage to the previous train coach"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon should render as type wagon-end-left A11y tree Chrome */

snapshots["sbb-train-wagon should render as type wagon-end-left A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Train coach"
    },
    {
      "role": "text leaf",
      "name": "No passage to the previous train coach"
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon should render as type wagon-end-left A11y tree Firefox */

