THe `sbb-train-wagon` is a component which represents a train compartment.

It is used inside the [sbb-train](/docs/elements-timetable-sbb-train--docs) element.

## Variants

With the `type` property, the component can visualize different types of wagons and locomotives.
For the types `wagon-end-left` and `wagon-end-right` the blocked passage information is set automatically.

```html
<sbb-train-wagon type="wagon"></sbb-train-wagon>
<sbb-train-wagon type="wagon-end-left"></sbb-train-wagon>
<sbb-train-wagon type="wagon-end-right"></sbb-train-wagon>
<sbb-train-wagon type="couchette"></sbb-train-wagon>
<sbb-train-wagon type="sleeping"></sbb-train-wagon>
<sbb-train-wagon type="restaurant"></sbb-train-wagon>
<sbb-train-wagon type="locomotive"></sbb-train-wagon>
<sbb-train-wagon type="closed"></sbb-train-wagon>
```

The property `occupancy` sets the component's inner icon; available values are `high`, `medium`, `low`, `none` and `null`;
it's also possible to display the wagon class at component's end using the `wagonClass` property
and a wagon number (property `label`) above the component.

```html
<sbb-train-wagon type="wagon" label="38" occupancy="low" wagon-class="1"></sbb-train-wagon>
```

**Note:**
A `sbb-train-wagon` with `type="wagon"` has the possibilities of slotting attribute icons.
They will be applied internally into a list (using `<ul>` and `<li>`) and requires an `aria-label` for each slotted icon.

```html
<sbb-train-wagon type="wagon">
  <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
  <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
  <sbb-icon
    aria-hidden="false"
    aria-label="Business zone in 1st class: Reservation possible"
    name="sa-bz"
  ></sbb-icon>
</sbb-train-wagon>
```

<!-- Auto Generated Below -->

## Properties

| Name                          | Attribute                       | Privacy | Type                                                                                                                        | Default   | Description                                                                                                                  |
| ----------------------------- | ------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `additionalAccessibilityText` | `additional-accessibility-text` | public  | `string`                                                                                                                    | `''`      | Additional accessibility text which will be appended to the end.                                                             |
| `blockedPassage`              | `blocked-passage`               | public  | `'previous' \| 'next' \| 'both' \| 'none'`                                                                                  | `'none'`  | Accessibility text for blocked passages of the wagon.                                                                        |
| `label`                       | `label`                         | public  | `string`                                                                                                                    | `''`      | Wagon number                                                                                                                 |
| `occupancy`                   | `occupancy`                     | public  | `SbbOccupancy \| null`                                                                                                      | `null`    | Occupancy of a wagon.                                                                                                        |
| `sector`                      | `sector`                        | public  | `string`                                                                                                                    | `''`      | Sector in which the wagon stops.                                                                                             |
| `type`                        | `type`                          | public  | `'wagon' \| 'wagon-end-left' \| 'wagon-end-right' \| 'couchette' \| 'sleeping' \| 'restaurant' \| 'locomotive' \| 'closed'` | `'wagon'` | Wagon type. For `wagon-end-left` and `wagon-end-right`, please set the corresponding value of the `blockedPassage` property. |
| `wagonClass`                  | `wagon-class`                   | public  | `'1' \| '2' \| null`                                                                                                        | `null`    | Class label                                                                                                                  |

## Slots

| Name | Description                                                                                       |
| ---- | ------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add one or more `sbb-icon` for meta-information of the `sbb-train-wagon`. |
