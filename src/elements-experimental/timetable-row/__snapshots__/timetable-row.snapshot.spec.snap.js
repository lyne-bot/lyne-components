/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-timetable-row renders defaultTrip DOM"] = 
`<sbb-timetable-row role="rowgroup">
</sbb-timetable-row>
`;
/* end snapshot sbb-timetable-row renders defaultTrip DOM */

snapshots["sbb-timetable-row renders defaultTrip Shadow DOM"] = 
`<sbb-card
  color="white"
  data-action-role="button"
  data-has-action=""
  size="l"
>
  <sbb-card-button
    data-action=""
    data-button=""
    slot="action"
    tabindex="0"
  >
    Departure: 11:08,   Train,  IR 37,  Direction Basel SBB,       Arrival: 12:13,   Travel time 1 Hour 15 Minutes,
  </sbb-card-button>
  <div
    class="sbb-timetable__row"
    role="row"
  >
    <div
      class="sbb-timetable__row-header"
      role="gridcell"
    >
      <div class="sbb-timetable__row-details">
        <span class="sbb-timetable__row-transport-wrapper">
          <sbb-icon
            aria-hidden="true"
            class="sbb-timetable__row-transport-icon"
            data-namespace="picto"
            name="picto:train-right"
            role="img"
          >
          </sbb-icon>
          <span class="sbb-screen-reader-only">
            Train
          </span>
        </span>
        <span class="sbb-timetable__row-transport">
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="ir-37"
            role="img"
          >
          </sbb-icon>
          <span class="sbb-screen-reader-only">
          </span>
        </span>
      </div>
      <p>
        Direction Basel SBB
      </p>
    </div>
    <sbb-pearl-chain-time role="gridcell">
    </sbb-pearl-chain-time>
    <div
      class="sbb-timetable__row-footer"
      role="gridcell"
    >
      <time>
        <span class="sbb-screen-reader-only">
          Travel time 1 Hour 15 Minutes
        </span>
        <span aria-hidden="true">
          1 h 15 min
        </span>
      </time>
    </div>
  </div>
</sbb-card>
`;
/* end snapshot sbb-timetable-row renders defaultTrip Shadow DOM */

snapshots["sbb-timetable-row renders platform DOM"] = 
`<sbb-timetable-row role="rowgroup">
</sbb-timetable-row>
`;
/* end snapshot sbb-timetable-row renders platform DOM */

snapshots["sbb-timetable-row renders platform Shadow DOM"] = 
`<sbb-card
  color="white"
  data-action-role="button"
  data-has-action=""
  size="l"
>
  <sbb-card-button
    data-action=""
    data-button=""
    slot="action"
    tabindex="0"
  >
    Departure: 16:30,  on Pl. 4,  Train,  IR 35,  Direction Chur,       Arrival: 17:06,   Travel time 41 Minutes,  2 changes,  First Class Low to medium occupancy expected. Second Class High occupancy expected.
  </sbb-card-button>
  <div
    class="sbb-timetable__row"
    role="row"
  >
    <div
      class="sbb-timetable__row-header"
      role="gridcell"
    >
      <div class="sbb-timetable__row-details">
        <span class="sbb-timetable__row-transport-wrapper">
          <sbb-icon
            aria-hidden="true"
            class="sbb-timetable__row-transport-icon"
            data-namespace="picto"
            name="picto:train-right"
            role="img"
          >
          </sbb-icon>
          <span class="sbb-screen-reader-only">
            Train
          </span>
        </span>
        <span class="sbb-timetable__row-transport">
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="ic-35"
            role="img"
          >
          </sbb-icon>
          <span class="sbb-screen-reader-only">
          </span>
        </span>
      </div>
      <p>
        Direction Chur
      </p>
    </div>
    <sbb-pearl-chain-time role="gridcell">
    </sbb-pearl-chain-time>
    <div
      class="sbb-timetable__row-footer"
      role="gridcell"
    >
      <span>
        <span class="sbb-screen-reader-only">
          Departure
        </span>
        <span class="sbb-timetable__row--quay">
          <span class="sbb-screen-reader-only">
            on Pl.
          </span>
          <span
            aria-hidden="true"
            class="sbb-timetable__row--quay-type"
          >
            Pl.
          </span>
        </span>
        4
      </span>
      <sbb-timetable-occupancy>
      </sbb-timetable-occupancy>
      <time>
        <span class="sbb-screen-reader-only">
          Travel time 41 Minutes
        </span>
        <span aria-hidden="true">
          41 min
        </span>
      </time>
    </div>
  </div>
</sbb-card>
`;
/* end snapshot sbb-timetable-row renders platform Shadow DOM */

snapshots["sbb-timetable-row renders bus strip DOM"] = 
`<sbb-timetable-row role="rowgroup">
</sbb-timetable-row>
`;
/* end snapshot sbb-timetable-row renders bus strip DOM */

snapshots["sbb-timetable-row renders bus strip Shadow DOM"] = 
`<sbb-card
  color="white"
  data-action-role="button"
  data-has-action=""
  size="l"
>
  <sbb-card-button
    data-action=""
    data-button=""
    slot="action"
    tabindex="0"
  >
    Departure: 16:30,  on Stand 4,  Bus,  B 19,  Direction Spiegel, Blinzern,       Arrival: 17:06,   Travel time 41 Minutes,  2 changes,  First Class Low to medium occupancy expected. Second Class High occupancy expected.
  </sbb-card-button>
  <div
    class="sbb-timetable__row"
    role="row"
  >
    <div
      class="sbb-timetable__row-header"
      role="gridcell"
    >
      <div class="sbb-timetable__row-details">
        <span class="sbb-timetable__row-transport-wrapper">
          <sbb-icon
            aria-hidden="true"
            class="sbb-timetable__row-transport-icon"
            data-namespace="picto"
            name="picto:bus-right"
            role="img"
          >
          </sbb-icon>
          <span class="sbb-screen-reader-only">
            Bus
          </span>
        </span>
        <span class="sbb-timetable__row-transportnumber">
          B 19
        </span>
      </div>
      <p>
        Direction Spiegel, Blinzern
      </p>
    </div>
    <sbb-pearl-chain-time role="gridcell">
    </sbb-pearl-chain-time>
    <div
      class="sbb-timetable__row-footer"
      role="gridcell"
    >
      <span>
        <span class="sbb-screen-reader-only">
          Departure
        </span>
        <span class="sbb-timetable__row--quay">
          <span class="sbb-screen-reader-only">
            on Stand
          </span>
          <span
            aria-hidden="true"
            class="sbb-timetable__row--quay-type"
          >
            Stand
          </span>
        </span>
        4
      </span>
      <sbb-timetable-occupancy>
      </sbb-timetable-occupancy>
      <time>
        <span class="sbb-screen-reader-only">
          Travel time 41 Minutes
        </span>
        <span aria-hidden="true">
          41 min
        </span>
      </time>
    </div>
  </div>
</sbb-card>
`;
/* end snapshot sbb-timetable-row renders bus strip Shadow DOM */

snapshots["sbb-timetable-row renders loading state DOM"] = 
`<sbb-timetable-row
  a11y-footpath=""
  loading-price=""
  loading-trip=""
>
</sbb-timetable-row>
`;
/* end snapshot sbb-timetable-row renders loading state DOM */

snapshots["sbb-timetable-row renders loading state Shadow DOM"] = 
`<sbb-card
  class="sbb-loading"
  color="white"
  data-has-card-badge=""
  size="l"
>
  <sbb-card-badge
    class="sbb-loading__badge"
    color="charcoal"
    role="text"
    slot="badge"
  >
  </sbb-card-badge>
  <div class="sbb-loading__wrapper">
    <div class="sbb-loading__row">
    </div>
    <div class="sbb-loading__row">
    </div>
    <div class="sbb-loading__row">
    </div>
  </div>
</sbb-card>
`;
/* end snapshot sbb-timetable-row renders loading state Shadow DOM */

snapshots["sbb-timetable-row renders defaultTrip A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Departure: 11:08, Train, IR 37, Direction Basel SBB, Arrival: 12:13, Travel time 1 Hour 15 Minutes,"
    },
    {
      "role": "text",
      "name": "Train"
    },
    {
      "role": "text",
      "name": "  "
    },
    {
      "role": "text",
      "name": "Direction Basel SBB"
    },
    {
      "role": "text",
      "name": "Departure"
    },
    {
      "role": "text",
      "name": ": "
    },
    {
      "role": "text",
      "name": "11:08"
    },
    {
      "role": "text",
      "name": "Arrival"
    },
    {
      "role": "text",
      "name": ": "
    },
    {
      "role": "text",
      "name": "12:13"
    },
    {
      "role": "text",
      "name": "Travel time 1 Hour 15 Minutes"
    }
  ]
}
</p>
`;
/* end snapshot sbb-timetable-row renders defaultTrip A11y tree Chrome */

snapshots["sbb-timetable-row renders defaultTrip A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Departure: 11:08, Train, IR 37, Direction Basel SBB, Arrival: 12:13, Travel time 1 Hour 15 Minutes,"
    },
    {
      "role": "text leaf",
      "name": "Train"
    },
    {
      "role": "text leaf",
      "name": "Direction Basel SBB"
    },
    {
      "role": "text leaf",
      "name": "Departure"
    },
    {
      "role": "text leaf",
      "name": ": "
    },
    {
      "role": "text leaf",
      "name": "11:08"
    },
    {
      "role": "text leaf",
      "name": "Arrival"
    },
    {
      "role": "text leaf",
      "name": ": "
    },
    {
      "role": "text leaf",
      "name": "12:13"
    },
    {
      "role": "text leaf",
      "name": "Travel time 1 Hour 15 Minutes"
    }
  ]
}
</p>
`;
/* end snapshot sbb-timetable-row renders defaultTrip A11y tree Firefox */

