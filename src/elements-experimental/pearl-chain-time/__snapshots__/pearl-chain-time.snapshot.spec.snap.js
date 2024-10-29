/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-pearl-chain-time renders with time DOM"] = 
`<sbb-pearl-chain-time
  arrival-time="2022-08-16T15:00:00"
  departure-time="2022-08-16T12:00:00"
>
</sbb-pearl-chain-time>
`;
/* end snapshot sbb-pearl-chain-time renders with time DOM */

snapshots["sbb-pearl-chain-time renders with time Shadow DOM"] = 
`<div class="sbb-pearl-chain__time">
  <time
    class="sbb-pearl-chain__time-time"
    datetime="2022-08-16T12:00:00"
  >
    <span class="sbb-screen-reader-only">
      Departure:
    </span>
    12:00
  </time>
  <sbb-pearl-chain-legacy class="sbb-pearl-chain__time-chain">
  </sbb-pearl-chain-legacy>
  <time
    class="sbb-pearl-chain__time-time"
    datetime="2022-08-16T15:00:00"
  >
    <span class="sbb-screen-reader-only">
      Arrival:
    </span>
    15:00
  </time>
</div>
`;
/* end snapshot sbb-pearl-chain-time renders with time Shadow DOM */

snapshots["sbb-pearl-chain-time renders with departure walk DOM"] = 
`<sbb-pearl-chain-time
  arrival-time="2022-08-16T15:00:00"
  departure-time="2022-08-16T12:00:00"
  departure-walk="10"
>
</sbb-pearl-chain-time>
`;
/* end snapshot sbb-pearl-chain-time renders with departure walk DOM */

snapshots["sbb-pearl-chain-time renders with departure walk Shadow DOM"] = 
`<div class="sbb-pearl-chain__time">
  <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--walk-small-left">
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="walk-small"
      role="img"
    >
    </sbb-icon>
    <time datetime="10M">
      <span class="sbb-screen-reader-only">
        minutes of walking time before departure:
      </span>
      10
      <span
        aria-hidden="true"
        class="sbb-pearl-chain__time-walktime-prime-symbol"
      >
        '
      </span>
    </time>
  </span>
  <time
    class="sbb-pearl-chain__time-time"
    datetime="2022-08-16T12:00:00"
  >
    <span class="sbb-screen-reader-only">
      Departure:
    </span>
    12:00
  </time>
  <sbb-pearl-chain-legacy class="sbb-pearl-chain__time-chain">
  </sbb-pearl-chain-legacy>
  <time
    class="sbb-pearl-chain__time-time"
    datetime="2022-08-16T15:00:00"
  >
    <span class="sbb-screen-reader-only">
      Arrival:
    </span>
    15:00
  </time>
</div>
`;
/* end snapshot sbb-pearl-chain-time renders with departure walk Shadow DOM */

snapshots["sbb-pearl-chain-time renders with arrival walk DOM"] = 
`<sbb-pearl-chain-time
  arrival-time="2022-08-16T15:00:00"
  arrival-walk="10"
  departure-time="2022-08-16T12:00:00"
>
</sbb-pearl-chain-time>
`;
/* end snapshot sbb-pearl-chain-time renders with arrival walk DOM */

snapshots["sbb-pearl-chain-time renders with arrival walk Shadow DOM"] = 
`<div class="sbb-pearl-chain__time">
  <time
    class="sbb-pearl-chain__time-time"
    datetime="2022-08-16T12:00:00"
  >
    <span class="sbb-screen-reader-only">
      Departure:
    </span>
    12:00
  </time>
  <sbb-pearl-chain-legacy class="sbb-pearl-chain__time-chain">
  </sbb-pearl-chain-legacy>
  <time
    class="sbb-pearl-chain__time-time"
    datetime="2022-08-16T15:00:00"
  >
    <span class="sbb-screen-reader-only">
      Arrival:
    </span>
    15:00
  </time>
  <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--walk-small-right">
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="walk-small"
      role="img"
    >
    </sbb-icon>
    <time datetime="10M">
      <span class="sbb-screen-reader-only">
        minutes of walking time after arrival:
      </span>
      10
      <span
        aria-hidden="true"
        class="sbb-pearl-chain__time-walktime-prime-symbol"
      >
        '
      </span>
    </time>
  </span>
</div>
`;
/* end snapshot sbb-pearl-chain-time renders with arrival walk Shadow DOM */

snapshots["sbb-pearl-chain-time renders with departure and arrival walk DOM"] = 
`<sbb-pearl-chain-time
  arrival-time="2022-08-16T15:00:00"
  arrival-walk="10"
  departure-time="2022-08-16T12:00:00"
  departure-walk="20"
>
</sbb-pearl-chain-time>
`;
/* end snapshot sbb-pearl-chain-time renders with departure and arrival walk DOM */

snapshots["sbb-pearl-chain-time renders with departure and arrival walk Shadow DOM"] = 
`<div class="sbb-pearl-chain__time">
  <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--walk-small-left">
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="walk-small"
      role="img"
    >
    </sbb-icon>
    <time datetime="20M">
      <span class="sbb-screen-reader-only">
        minutes of walking time before departure:
      </span>
      20
      <span
        aria-hidden="true"
        class="sbb-pearl-chain__time-walktime-prime-symbol"
      >
        '
      </span>
    </time>
  </span>
  <time
    class="sbb-pearl-chain__time-time"
    datetime="2022-08-16T12:00:00"
  >
    <span class="sbb-screen-reader-only">
      Departure:
    </span>
    12:00
  </time>
  <sbb-pearl-chain-legacy class="sbb-pearl-chain__time-chain">
  </sbb-pearl-chain-legacy>
  <time
    class="sbb-pearl-chain__time-time"
    datetime="2022-08-16T15:00:00"
  >
    <span class="sbb-screen-reader-only">
      Arrival:
    </span>
    15:00
  </time>
  <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--walk-small-right">
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="walk-small"
      role="img"
    >
    </sbb-icon>
    <time datetime="10M">
      <span class="sbb-screen-reader-only">
        minutes of walking time after arrival:
      </span>
      10
      <span
        aria-hidden="true"
        class="sbb-pearl-chain__time-walktime-prime-symbol"
      >
        '
      </span>
    </time>
  </span>
</div>
`;
/* end snapshot sbb-pearl-chain-time renders with departure and arrival walk Shadow DOM */

