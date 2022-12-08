# sbb-train-formation
The sbb-train-formation is the top container element for wrapping sbb-train´s. The sbb-train-formation has no properties.
It applies the possible scrollable-width to every given sbb-train as css var (--sbb-train-direction-width) 
initially and on resize.

```html
<sbb-train-formation>
  <sbb-train
    direction-label="Direction of travel"
    station="Bern"
    direction="left"
    accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction."
  >
    <sbb-sector label="Sector A">
      <sbb-wagon
        type="locomotive"
        accessibility-additional-wagon-text="Top of the train"
      ></sbb-wagon>
      <sbb-wagon type="closed"></sbb-wagon>
      <sbb-blocked-passage />
      <sbb-wagon
        type="wagon"
        label="38"
        occupancy="low"
        accessibility-label-icon-list-title="Additional wagon information"
        wagon-class="1"
      >
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon
          aria-hidden="false"
          aria-label="Business zone in 1st class: Reservation possible"
          name="sa-bz"
        ></sbb-icon>
      </sbb-wagon>
    </sbb-sector>
    ...
  </sbb-train>
  <sbb-train
    direction-label="Direction of travel"
    station="Luzern"
    direction="left"
    accessibility-label="The top of the train is in Sector E. The train leaves the station in this direction."
  >
    ...
  </sbb-train>
</sbb-train-formation>
```

<!-- Auto Generated Below -->


## Slots

| Slot        | Description                   |
| ----------- | ----------------------------- |
| `"unnamed"` | Used for slotting sbb-trains. |


----------------------------------------------


