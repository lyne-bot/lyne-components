/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-train renders DOM"] = 
`<sbb-train
  direction="left"
  direction-label="Driving direction"
  station="Bern"
>
</sbb-train>
`;
/* end snapshot sbb-train renders DOM */

snapshots["sbb-train renders Shadow DOM"] = 
`<div class="sbb-train">
  <h6 class="sbb-train__direction-label-sr">
    Train, Driving direction Bern.
  </h6>
  <div
    aria-hidden="true"
    class="sbb-train__direction-heading"
  >
    <span class="sbb-train__direction-sticky-wrapper">
      <sbb-icon
        aria-hidden="true"
        data-namespace="default"
        name="chevron-small-left-small"
        role="img"
      >
      </sbb-icon>
      <span class="sbb-train__direction-label">
        Driving direction Bern
      </span>
    </span>
  </div>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-train renders Shadow DOM */

