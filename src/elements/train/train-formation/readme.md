The `sbb-train-formation` is a component used as a top container element
for wrapping [sbb-train](/docs/elements-timetable-sbb-train--docs)s.

```html
<sbb-train-formation>
  <sbb-train
    direction-label="Direction of travel"
    station="Bern"
    direction="left"
    accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
  >
    <sbb-train-wagon
      sector="A"
      type="locomotive"
      additional-accessibility-text="Top of the train"
    ></sbb-train-wagon>
    <sbb-train-wagon sector="A" type="closed"> </sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
    <sbb-train-wagon
      sector="A"
      type="wagon"
      label="38"
      occupancy="low"
      wagon-class="1"
      blocked-passage="previous"
    >
      <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
      <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      <sbb-icon
        aria-hidden="false"
        aria-label="Business zone in 1st class: Reservation possible"
        name="sa-bz"
      ></sbb-icon>
    </sbb-train-wagon>
    ...
  </sbb-train>
  <sbb-train
    direction-label="Direction of travel"
    station="Luzern"
    direction="left"
    accessibility-label="The top of the train is in Sector E. The train leaves the station in this direction"
  >
    ...
  </sbb-train>
</sbb-train-formation>
```

### View

The perspective of the train can be switched with the `view` property between `side` (default) and `top`.

### Inline padding

In certain circumstances there should be a left and right padding applied, but including the scrollbar.
To achieve the inline padding, set a value to the
CSS variable `--sbb-train-formation-padding-inline` like `var(--sbb-spacing-fixed-4x)`.

<!-- Auto Generated Below -->

## Properties

| Name   | Attribute | Privacy | Type              | Default  | Description                                                     |
| ------ | --------- | ------- | ----------------- | -------- | --------------------------------------------------------------- |
| `view` | `view`    | public  | `'side' \| 'top'` | `'side'` | Whether the view of the wagons is from side or top perspective. |

## CSS Properties

| Name                                   | Default | Description                                                      |
| -------------------------------------- | ------- | ---------------------------------------------------------------- |
| `--sbb-train-formation-padding-inline` | `0px`   | Defines the inline padding inside the horizontal scrolling area. |

## Slots

| Name | Description                                                                    |
| ---- | ------------------------------------------------------------------------------ |
|      | Use the unnamed slot to add 'sbb-train' elements to the `sbb-train-formation`. |
