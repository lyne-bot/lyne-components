/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-pearl-chain renders with one leg DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T05:00"
    departure="2022-08-18T04:00"
    past=""
    style="--sbb-pearl-chain-leg-weight: 1;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with one leg DOM */

snapshots["sbb-pearl-chain renders with one leg Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span
      class="sbb-pearl-chain__bullet"
      data-past=""
    >
    </span>
    <slot>
    </slot>
    <span
      class="sbb-pearl-chain__bullet"
      data-past=""
    >
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with one leg Shadow DOM */

snapshots["sbb-pearl-chain renders with two legs DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T05:00"
    departure="2022-08-18T04:00"
    past=""
    style="--sbb-pearl-chain-leg-weight: 0.08333333333333333;"
  >
  </sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T16:00"
    departure="2022-08-18T05:00"
    past=""
    style="--sbb-pearl-chain-leg-weight: 0.9166666666666666;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with two legs DOM */

snapshots["sbb-pearl-chain renders with two legs Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span
      class="sbb-pearl-chain__bullet"
      data-past=""
    >
    </span>
    <slot>
    </slot>
    <span
      class="sbb-pearl-chain__bullet"
      data-past=""
    >
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with two legs Shadow DOM */

snapshots["sbb-pearl-chain renders with departure stop skipped DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T05:00"
    departure="2022-08-18T04:00"
    past=""
    style="--sbb-pearl-chain-leg-weight: 0.08333333333333333;"
  >
  </sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T16:00"
    departure="2022-08-18T05:00"
    departure-skipped=""
    past=""
    style="--sbb-pearl-chain-leg-weight: 0.9166666666666666;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with departure stop skipped DOM */

snapshots["sbb-pearl-chain renders with departure stop skipped Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span
      class="sbb-pearl-chain__bullet"
      data-past=""
    >
    </span>
    <slot>
    </slot>
    <span
      class="sbb-pearl-chain__bullet"
      data-past=""
    >
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with departure stop skipped Shadow DOM */

snapshots["sbb-pearl-chain renders with arrival stop skipped DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T05:00"
    departure="2022-08-18T04:00"
    past=""
    style="--sbb-pearl-chain-leg-weight: 0.08333333333333333;"
  >
  </sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    arrival="2022-08-18T16:00"
    arrival-skipped=""
    departure="2022-08-18T05:00"
    past=""
    style="--sbb-pearl-chain-leg-weight: 0.9166666666666666;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with arrival stop skipped DOM */

snapshots["sbb-pearl-chain renders with arrival stop skipped Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span
      class="sbb-pearl-chain__bullet"
      data-past=""
    >
    </span>
    <slot>
    </slot>
    <span
      class="sbb-pearl-chain__bullet"
      data-past=""
      data-skipped=""
    >
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with arrival stop skipped Shadow DOM */

snapshots["sbb-pearl-chain renders with progress leg DOM"] = 
`<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    arrival="2022-08-17T16:00:00"
    data-progress=""
    departure="2022-08-14T14:00:00"
    style="--sbb-pearl-chain-leg-weight: 0.9736842105263158; --sbb-pearl-chain-status-position: 0.6621621621621622;"
  >
  </sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    arrival="2022-08-17T20:00:00"
    departure="2022-08-17T18:00:00"
    departure-skipped=""
    style="--sbb-pearl-chain-leg-weight: 0.02631578947368421;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with progress leg DOM */

snapshots["sbb-pearl-chain renders with progress leg Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span
      class="sbb-pearl-chain__bullet"
      data-past=""
    >
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
    data-progress=""
    departure="2022-08-14T14:00:00"
    disruption=""
    style="--sbb-pearl-chain-leg-weight: 0.9736842105263158; --sbb-pearl-chain-status-position: 0.6621621621621622;"
  >
  </sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    arrival="2022-08-17T20:00:00"
    departure="2022-08-17T18:00:00"
    style="--sbb-pearl-chain-leg-weight: 0.02631578947368421;"
  >
  </sbb-pearl-chain-leg>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain renders with cancelled instead of progress leg DOM */

snapshots["sbb-pearl-chain renders with cancelled instead of progress leg Shadow DOM"] = 
`<div class="sbb-pearl-chain__wrapper">
  <div class="sbb-pearl-chain">
    <span
      class="sbb-pearl-chain__bullet"
      data-disrupted=""
      data-past=""
    >
    </span>
    <slot>
    </slot>
    <span class="sbb-pearl-chain__bullet">
    </span>
  </div>
</div>
`;
/* end snapshot sbb-pearl-chain renders with cancelled instead of progress leg Shadow DOM */

snapshots["sbb-pearl-chain renders with one leg A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with one leg A11y tree Chrome */

snapshots["sbb-pearl-chain renders with two legs A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with two legs A11y tree Chrome */

snapshots["sbb-pearl-chain renders with departure stop skipped A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with departure stop skipped A11y tree Chrome */

snapshots["sbb-pearl-chain renders with arrival stop skipped A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with arrival stop skipped A11y tree Chrome */

snapshots["sbb-pearl-chain renders with progress leg A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with progress leg A11y tree Chrome */

snapshots["sbb-pearl-chain renders with cancelled instead of progress leg A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with cancelled instead of progress leg A11y tree Chrome */

snapshots["sbb-pearl-chain renders with one leg A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with one leg A11y tree Firefox */

snapshots["sbb-pearl-chain renders with two legs A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with two legs A11y tree Firefox */

snapshots["sbb-pearl-chain renders with departure stop skipped A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with departure stop skipped A11y tree Firefox */

snapshots["sbb-pearl-chain renders with arrival stop skipped A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with arrival stop skipped A11y tree Firefox */

snapshots["sbb-pearl-chain renders with progress leg A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with progress leg A11y tree Firefox */

snapshots["sbb-pearl-chain renders with cancelled instead of progress leg A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-pearl-chain renders with cancelled instead of progress leg A11y tree Firefox */

