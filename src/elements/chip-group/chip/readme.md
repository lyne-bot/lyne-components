The `sbb-chip` is a component meant to be used in combination with the [sbb-chip-group](/docs/elements-sbb-chip-group-sbb-chip-group--docs) to display a list of string user inputs.

```html
<sbb-chip-group>
  <sbb-chip value="Value 1"></sbb-chip>
  ...
</sbb-chip-group>
```

## Slots

It is possible to provide a label via the unnamed slot. If not present, the `value` will be used.

## States

The `disabled`/`readonly` properties are controlled by the `sbb-chip-group`.

## Accessibility

Use the `accessibility-label` property to add info on the chip content.

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type      | Default | Description                                                       |
| -------------------- | --------------------- | ------- | --------- | ------- | ----------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string`  | `''`    | This will be forwarded as aria-label to the inner anchor element. |
| `disabled`           | `disabled`            | public  | `boolean` | `false` | Whether the component is disabled.                                |
| `negative`           | `negative`            | public  | `boolean` | `false` | Negative coloring variant flag.                                   |
| `readonly`           | `readonly`            | public  | `boolean` | `false` | Whether the component is readonly                                 |
| `value`              | `value`               | public  | `string`  | `''`    | The value of chip. Will be used as label.                         |

## Methods

| Name    | Privacy | Description | Parameters | Return | Inherited From |
| ------- | ------- | ----------- | ---------- | ------ | -------------- |
| `click` | public  |             |            | `void` |                |
| `focus` | public  |             |            | `void` |                |

## Slots

| Name | Description                                                                               |
| ---- | ----------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add the display value. If not provided, the 'value' will be used. |
