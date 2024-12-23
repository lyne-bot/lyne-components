The `sbb-flip-card` component displays an informative card that reveals more informations when clicked or toggled programmatically.
It's meant to be used together with [sbb-flip-card-summary](/docs/elements-sbb-flip-card-sbb-flip-card-summary--docs) and [sbb-flip-card-details](/docs/elements-sbb-flip-card-sbb-flip-card-details--docs).

```html
<sbb-flip-card>
  <sbb-flip-card-summary>
    <sbb-title> Card Title </sbb-title>
    <sbb-image slot="image" image-src="..." alt="..."></sbb-image>
  </sbb-flip-card-summary>
  <sbb-flip-card-details> Some additional text. </sbb-flip-card-details>
</sbb-flip-card>
```

## Style

The `sbb-flip-card` component has a predefined minimum height that can be customized by specifying the `min-height` property directly in the style of the host element with a custom height. Alternatively, when used within a CSS grid layout alongside other cards, the height can be adjusted using the `grid-template-rows` property. For consistent behavior and flexibility, it is recommended to use the `minmax()` function, for example: `grid-template-rows: minmax(320px, 1fr)`.

```html
<div
  style="display: grid; grid-template-rows: minmax(320px, 1fr); grid-template-columns: repeat(2, 1fr);"
>
  <sbb-flip-card>
    <sbb-flip-card-summary>
      <sbb-title> Card Title </sbb-title>
      <sbb-image slot="image" image-src="..." alt="..."></sbb-image>
    </sbb-flip-card-summary>
    <sbb-flip-card-details> Some additional text. </sbb-flip-card-details>
  </sbb-flip-card>

  <sbb-flip-card>
    <sbb-flip-card-summary>
      <sbb-title> Card Title </sbb-title>
      <sbb-image slot="image" image-src="..." alt="..."></sbb-image>
    </sbb-flip-card-summary>
    <sbb-flip-card-details> Some additional text. </sbb-flip-card-details>
  </sbb-flip-card>
</div>
```

## Slots

The component will display the content slotted in the `summary` slot in the main view, and the content slotted inside the `details` slot after the card has been flipped.

## States

The `sbb-flip-card` will switch to the flipped state after the user clicks on it or after the `toggle` method is called.

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                                | Default | Description                                                                                                                                       |
| -------------------- | --------------------- | ------- | ----------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                            | `''`    | This will be forwarded as aria-label to the action in the non flipped state. If not set, the textContent of the `sbb-flip-card-summary` is taken. |
| `details`            | -                     | public  | `SbbFlipCardDetailsElement \| null` |         | Returns the slotted sbb-flip-card-details.                                                                                                        |
| `isFlipped`          | -                     | public  | `boolean`                           |         | Whether the flip card is flipped.                                                                                                                 |
| `summary`            | -                     | public  | `SbbFlipCardSummaryElement \| null` |         | Returns the slotted sbb-flip-card-summary.                                                                                                        |

## Methods

| Name     | Privacy | Description                             | Parameters | Return | Inherited From |
| -------- | ------- | --------------------------------------- | ---------- | ------ | -------------- |
| `toggle` | public  | Toggles the state of the sbb-flip-card. |            | `void` |                |

## Events

| Name   | Type                | Description                     | Inherited From |
| ------ | ------------------- | ------------------------------- | -------------- |
| `flip` | `CustomEvent<void>` | Emits when the flip card flips. |                |

## Slots

| Name | Description                                                                                  |
| ---- | -------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add a `sbb-flip-card-summary` and a `sbb-flip-card-details` element. |
