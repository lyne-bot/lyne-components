The `sbb-dialog-actions` component extends the [sbb-action-group](/docs/elements-sbb-action-group--docs) component. Use it in combination with the [sbb-dialog](/docs/elements-sbb-dialog-sbb-dialog--docs) to display a footer with an action group.

```html
<sbb-dialog>
  <sbb-dialog-actions>
    <sbb-block-link sbb-dialog-close>Link</sbb-block-link>
    <sbb-secondary-button sbb-dialog-close> Cancel </sbb-secondary-button>
    <sbb-button sbb-dialog-close> Confirm </sbb-button>
  </sbb-dialog-actions>
</sbb-dialog>
```

<!-- Auto Generated Below -->

## Properties

| Name             | Attribute         | Privacy | Type                                        | Default             | Description                                                                                                             |
| ---------------- | ----------------- | ------- | ------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `alignGroup`     | `align-group`     | public  | `'start' \| 'center' \| 'stretch' \| 'end'` | `'start'`           | Set the slotted `<sbb-action-group>` children's alignment.                                                              |
| `buttonSize`     | `button-size`     | public  | `SbbButtonSize`                             | `'l' / 's' (lean)`  | Size of the nested sbb-button instances. This will overwrite the size attribute of nested sbb-button instances.         |
| `horizontalFrom` | `horizontal-from` | public  | `SbbHorizontalFrom`                         | `'medium'`          | Overrides the behaviour of `orientation` property.                                                                      |
| `linkSize`       | `link-size`       | public  | `SbbLinkSize`                               | `'m' / 'xs' (lean)` | Size of the nested sbb-block-link instances. This will overwrite the size attribute of nested sbb-block-link instances. |
| `orientation`    | `orientation`     | public  | `SbbOrientation`                            | `'horizontal'`      | Indicates the orientation of the components inside the `<sbb-action-group>`.                                            |

## Slots

| Name | Description                                                                                        |
| ---- | -------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-dialog-actions`. |
