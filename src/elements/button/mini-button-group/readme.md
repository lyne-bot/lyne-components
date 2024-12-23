The `sbb-mini-button-group` component displays a set of [sbb-mini-button](/docs/elements-sbb-button-sbb-mini-button--docs)
optionally separated by a [sbb-divider](/docs/elements-sbb-divider--docs).

```html
<sbb-mini-button-group accessibility-label="...">
  <sbb-mini-button icon-name="..." aria-label="..."></sbb-mini-button>
  <sbb-mini-button icon-name="..." aria-label="..."></sbb-mini-button>
  <sbb-divider orientation="vertical"></sbb-divider>
  <sbb-mini-button icon-name="..." aria-label="..."></sbb-mini-button>
</sbb-mini-button-group>
```

## Style

The component has a negative variant which can be set using the `negative` property.

There are four available sizes: `s`, `m` (default), `l` and `xl`.

```html
<sbb-mini-button-group negative size="l"> ... </sbb-mini-button-group>
```

## Accessibility

Use the `accessibility-label` property to describe the purpose of the `sbb-mini-button-group` for screen-reader users.

If `sbb-divider` components are used as separators, their `aria-hidden` property is automatically set to `true`
to ensure that the button list is read by screen readers with the correct size.

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                     | Default            | Description                                                                 |
| -------------------- | --------------------- | ------- | ------------------------ | ------------------ | --------------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                 | `''`               | This will be forwarded as aria-label to the list that contains the buttons. |
| `negative`           | `negative`            | public  | `boolean`                | `false`            | Negative coloring variant flag.                                             |
| `size`               | `size`                | public  | `SbbMiniButtonGroupSize` | `'m' / 's' (lean)` | Size variant, either s, m, l or xl.                                         |

## Slots

| Name | Description                                                               |
| ---- | ------------------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-mini-button` and `sbb-divider` elements. |
