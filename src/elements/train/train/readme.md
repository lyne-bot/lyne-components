A `sbb-train` is a component used as a container element for a collection of
[sbb-train-wagon](/docs/elements-timetable-sbb-train-wagon--docs)s
or [sbb-train-blocked-passage](/docs/elements-timetable-sbb-train-blocked-passage--docs)s,
and it can be used within the [sbb-train-formation](/docs/elements-timetable-sbb-train-formation--docs) component.

```html
<sbb-train
  direction-label="driving direction"
  direction-label-level="3"
  station="Genève-Aéroport"
  direction="left"
  accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
>
  ...
</sbb-train>
```

It's possible to use the `station` property to display the label of the `sbb-train` destination,
while the `direction` property can be used to display the direction indicator (default: `left`).
The direction label and the level of its heading tag are set, respectively,
with the property `directionLabel` and `directionLabelLevel`.

## Accessibility

The `accessibility-label` property should be used to give further information about the leaving direction of the `sbb-train`.
It should refer to the section where the locomotive is placed.

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute               | Privacy | Type                | Default  | Description                                                                                  |
| --------------------- | ----------------------- | ------- | ------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `accessibilityLabel`  | `accessibility-label`   | public  | `string`            | `''`     | Accessibility label for additional information regarding the leaving direction of the train. |
| `direction`           | `direction`             | public  | `'left' \| 'right'` | `'left'` | Controls the direction indicator to show the arrow left or right. Default is left.           |
| `directionLabel`      | `direction-label`       | public  | `string`            | `''`     | General label for "driving direction".                                                       |
| `directionLabelLevel` | `direction-label-level` | public  | `SbbTitleLevel`     | `'6'`    | Heading level of the direction label, used for screen readers.                               |
| `station`             | `station`               | public  | `string`            | `''`     | Label for the destination station of the train.                                              |

## Slots

| Name | Description                                                                |
| ---- | -------------------------------------------------------------------------- |
|      | Use the unnamed slot to add 'sbb-train-wagon' elements to the `sbb-train`. |
