import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import '../train.js';
import '../train-wagon.js';
import '../train-blocked-passage.js';
import './train-formation.js';

describe(`sbb-train-formation`, () => {
  const train1 = html`<sbb-train
    direction-label="Direction of travel"
    station="Bern"
    direction="left"
  >
    <sbb-train-wagon type="locomotive" sector="A"></sbb-train-wagon>
    <sbb-train-wagon type="closed" sector="A"></sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
    <sbb-train-wagon
      type="wagon"
      label="38"
      occupancy="low"
      blocked-passage="previous"
      wagon-class="1"
      sector="A"
    >
      <sbb-icon name="sa-rs"></sbb-icon>
      <sbb-icon name="sa-nf"></sbb-icon>
      <sbb-icon name="sa-bz"></sbb-icon>
      <sbb-icon name="sa-bz"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-wagon type="wagon" label="39" occupancy="none" wagon-class="1" sector="B">
      <sbb-icon name="sa-nf"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-wagon type="restaurant" label="40" sector="B">
      <sbb-icon name="sa-rs"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-wagon type="wagon" label="41" occupancy="high" wagon-class="2" sector="B">
      <sbb-icon name="sa-nf"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="42"
      occupancy="low"
      wagon-class="2"
      blocked-passage="next"
      sector="C"
    >
      <sbb-icon name="sa-nf"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
    <sbb-train-wagon
      type="wagon"
      label="43"
      occupancy="low"
      wagon-class="2"
      blocked-passage="both"
      sector="C"
    >
      <sbb-icon name="sa-abteilkinderwagen"></sbb-icon>
      <sbb-icon name="sa-nf"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
    <sbb-train-wagon
      blocked-passage="previous"
      type="wagon"
      label="44"
      occupancy="low"
      wagon-class="2"
      sector="C"
    >
      <sbb-icon name="sa-nf"></sbb-icon>
      <sbb-icon name="sa-fz"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="45"
      occupancy="low"
      wagon-class="2"
      sector="D"
    ></sbb-train-wagon>
    <sbb-train-wagon type="couchette" label="46" sector="D"></sbb-train-wagon>
    <sbb-train-wagon type="sleeping" label="47" sector="D" blocked-passage="next"></sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
  </sbb-train>`;

  const train2 = html`<sbb-train
    direction-label="Direction of travel"
    station="Luzern"
    direction="left"
  >
    <sbb-train-wagon
      type="wagon-end-left"
      blocked-passage="previous"
      occupancy="none"
      wagon-class="2"
      sector="E"
    ></sbb-train-wagon>
    <sbb-train-wagon type="closed" label="49" sector="E"></sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
    <sbb-train-wagon
      type="wagon"
      label="50"
      occupancy="low"
      wagon-class="2"
      blocked-passage="previous"
      sector="E"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="51"
      occupancy="low"
      wagon-class="2"
      sector="F"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="52"
      occupancy="low"
      wagon-class="2"
      sector="F"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="53"
      occupancy="low"
      wagon-class="2"
      sector="F"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="54"
      occupancy="low"
      wagon-class="2"
      sector="G"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="55"
      occupancy="low"
      wagon-class="2"
      sector="G"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="56"
      occupancy="low"
      wagon-class="2"
      sector="G"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="57"
      occupancy="low"
      wagon-class="2"
      sector="H"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="58"
      occupancy="low"
      wagon-class="2"
      sector="H"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon-end-right"
      label="59"
      occupancy="low"
      wagon-class="2"
      sector="H"
    ></sbb-train-wagon>
  </sbb-train>`;

  describeViewports({ viewports: ['zero', 'medium', 'ultra'] }, () => {
    it(
      `multiple trains`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-train-formation>${train1} ${train2}</sbb-train-formation>`,
        );
      }),
    );

    it(
      `single train`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-train-formation>${train1}</sbb-train-formation>`);
      }),
    );

    it(
      `padding`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-train-formation
            style="--sbb-train-formation-padding-inline:var(--sbb-spacing-fixed-4x)"
          >
            ${train1} ${train2}
          </sbb-train-formation>`,
        );
      }),
    );

    it(
      `no label`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-train-formation> ${train1} ${train2} </sbb-train-formation>`,
        );

        Array.from(setup.snapshotElement.querySelectorAll('sbb-train-wagon')!).forEach(
          (wagon) => (wagon.label = ''),
        );

        await waitForLitRender(setup.snapshotElement);
      }),
    );

    it(
      `no sectors`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-train-formation> ${train1} ${train2} </sbb-train-formation>`,
        );

        Array.from(setup.snapshotElement.querySelectorAll('sbb-train-wagon')!).forEach(
          (wagon) => (wagon.sector = ''),
        );

        await waitForLitRender(setup.snapshotElement);
      }),
    );

    it(
      `no direction label`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-train-formation> ${train1} ${train2} </sbb-train-formation>`,
        );

        Array.from(setup.snapshotElement.querySelectorAll('sbb-train')!).forEach(
          (wagon) => (wagon.directionLabel = ''),
        );

        await waitForLitRender(setup.snapshotElement);
      }),
    );
  });
});
