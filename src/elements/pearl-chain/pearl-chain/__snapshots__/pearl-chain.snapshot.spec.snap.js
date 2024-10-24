/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-pearl-chain renders with one leg DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T05:00"
    data-first-leg=""
    data-last-leg=""
    departure="2022-08-18T04:00"
    style="--sbb-pearl-chain-leg-weight: 0;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with one leg DOM */

snapshots["sbb-pearl-chain renders with one leg Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span class="sbb-pearl-chain__bullet">
    </span>
    <slot>
    </slot>
    <span class="sbb-pearl-chain__bullet">
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with one leg Shadow DOM */

snapshots["sbb-pearl-chain renders with two legs DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T05:00"
    data-first-leg=""
    departure="2022-08-18T04:00"
    style="--sbb-pearl-chain-leg-weight: 0;"
  >
  </sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T16:00"
    data-last-leg=""
    departure="2022-08-18T05:00"
    style="--sbb-pearl-chain-leg-weight: 0;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with two legs DOM */

snapshots["sbb-pearl-chain renders with two legs Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span class="sbb-pearl-chain__bullet">
    </span>
    <slot>
    </slot>
    <span class="sbb-pearl-chain__bullet">
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with two legs Shadow DOM */

snapshots["sbb-pearl-chain renders with departure stop skipped DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T05:00"
    data-first-leg=""
    departure="2022-08-18T04:00"
    style="--sbb-pearl-chain-leg-weight: 0;"
  >
  </sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T16:00"
    data-last-leg=""
    departure="2022-08-18T05:00"
    departure-skipped=""
    style="--sbb-pearl-chain-leg-weight: 0;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with departure stop skipped DOM */

snapshots["sbb-pearl-chain renders with departure stop skipped Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span class="sbb-pearl-chain__bullet">
    </span>
    <slot>
    </slot>
    <span class="sbb-pearl-chain__bullet">
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with departure stop skipped Shadow DOM */

snapshots["sbb-pearl-chain renders with arrival stop skipped DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T05:00"
    data-first-leg=""
    departure="2022-08-18T04:00"
    style="--sbb-pearl-chain-leg-weight: 0;"
  >
  </sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T16:00"
    arrival-skipped=""
    data-last-leg=""
    departure="2022-08-18T05:00"
    style="--sbb-pearl-chain-leg-weight: 0;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with arrival stop skipped DOM */

snapshots["sbb-pearl-chain renders with arrival stop skipped Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span class="sbb-pearl-chain__bullet">
    </span>
    <slot>
    </slot>
    <span class="sbb-pearl-chain__bullet sbb-pearl-chain__bullet-skipped">
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with arrival stop skipped Shadow DOM */

snapshots["sbb-pearl-chain renders with progress leg DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-17T16:00:00"
    data-first-leg=""
    data-progress=""
    departure="2022-08-14T14:00:00"
    style="--sbb-pearl-chain-leg-weight: 0; --sbb-pearl-chain-status-position: 66.21621621621621%; transform: translateX(-100%);"
  >
  </sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    arrival="2022-08-17T20:00:00"
    data-last-leg=""
    departure="2022-08-17T18:00:00"
    departure-skipped=""
    style="--sbb-pearl-chain-leg-weight: 0;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with progress leg DOM */

snapshots["sbb-pearl-chain renders with progress leg Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span class="sbb-pearl-chain__bullet sbb-pearl-chain__bullet-past">
    </span>
    <slot>
    </slot>
    <span class="sbb-pearl-chain__bullet">
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with progress leg Shadow DOM */

snapshots["sbb-pearl-chain renders with cancelled instead of progress leg DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-17T16:00:00"
    data-first-leg=""
    data-progress=""
    departure="2022-08-14T14:00:00"
    disruption=""
    style="--sbb-pearl-chain-leg-weight: 0; --sbb-pearl-chain-status-position: 66.21621621621621%; transform: translateX(-100%);"
  >
  </sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    arrival="2022-08-17T20:00:00"
    data-last-leg=""
    departure="2022-08-17T18:00:00"
    style="--sbb-pearl-chain-leg-weight: 0;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with cancelled instead of progress leg DOM */

snapshots["sbb-pearl-chain renders with cancelled instead of progress leg Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span class="sbb-pearl-chain__bullet sbb-pearl-chain__bullet-disruption sbb-pearl-chain__bullet-past">
    </span>
    <slot>
    </slot>
    <span class="sbb-pearl-chain__bullet">
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with cancelled instead of progress leg Shadow DOM */

