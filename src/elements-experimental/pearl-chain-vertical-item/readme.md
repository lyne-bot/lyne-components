The `sbb-pearl-chain-vertical-item` is intended to be used
with the [sbb-pearl-chain-vertical](/docs/experimental-sbb-pearl-chain-vertical--docs)` component.

It renders a table-row with three table-cells, and it is used to display the dots and line of the pearl-chain.
There are two slots named `left` and `right` which make it possible to display content on the component sides.

The `pearlChainVerticalItemAttributes` property is mandatory.

```json
{
  "lineType": "standard",
  "lineColor": "charcoal",
  "minHeight": "89",
  "hideLine": false,
  "bulletType": "thick-bullet",
  "bulletSize": "small"
}
```

```html
<sbb-pearl-chain-vertical-item
  pearlChainVerticalItemAttributes="{pearlChainVerticalItemAttributes}"
>
  <div slot="right">content</div>
  <div slot="left">content</div>
  ></sbb-pearl-chain-vertical-item
>
```

## Style

The component has many styling options, which can be configured through the 'pearlChainVerticalItemAttributes' property.
The slots themselves are unstyled, so that they can be used in various ways.

<!-- Auto Generated Below -->

## Properties

| Name                               | Attribute                              | Privacy | Type                               | Default | Description                                                                 |
| ---------------------------------- | -------------------------------------- | ------- | ---------------------------------- | ------- | --------------------------------------------------------------------------- |
| `disableAnimation`                 | `disable-animation`                    | public  | `boolean`                          | `false` | If true, the position won't be animated.                                    |
| `pearlChainVerticalItemAttributes` | `pearl-chain-vertical-item-attributes` | public  | `PearlChainVerticalItemAttributes` | `null!` | The pearlChainVerticalItemAttributes Prop for styling the bullets and line. |

## Slots

| Name    | Description                           |
| ------- | ------------------------------------- |
| `left`  | Content of the left side of the item  |
| `right` | Content of the right side of the item |
