# sbb-option

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description                                                                                                                               | Type      | Default     |
| ----------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `active`                | `active`                  | Whether or not the option is currently active.                                                                                            | `boolean` | `undefined` |
| `disableLabelHighlight` | `disable-label-highlight` | Disable the highlight of the label                                                                                                        | `boolean` | `undefined` |
| `disabled`              | `disabled`                | Whether or not the option is disabled. TBI: missing disabled style, will be implemented with the select component                         | `boolean` | `undefined` |
| `highlightString`       | `highlight-string`        | The portion of the highlighted label                                                                                                      | `string`  | `undefined` |
| `iconName`              | `icon-name`               | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons/. | `string`  | `undefined` |
| `preserveIconSpace`     | `preserve-icon-space`     | Wheter the icon space is preserved when no icon is set                                                                                    | `boolean` | `true`      |
| `value`                 | `value`                   | Value of the option.                                                                                                                      | `string`  | `undefined` |


## Events

| Event                 | Description                        | Type                                    |
| --------------------- | ---------------------------------- | --------------------------------------- |
| `option-did-deselect` | Emits whenever the menu is closed. | `CustomEvent<SbbOptionSelectionChange>` |
| `option-did-select`   | Emits whenever the menu is closed. | `CustomEvent<SbbOptionSelectionChange>` |


## Methods

### `deselect() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getId() => Promise<boolean>`

Whether or not the option is currently selected.

#### Returns

Type: `Promise<boolean>`



### `isSelected() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `select() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                                        |
| ----------- | ---------------------------------------------------------------------------------- |
| `"icon"`    | Use this slot to provide an icon. If `icon-name` is set, an sbb-icon will be used. |
| `"unnamed"` | Use this to provide the option label.                                              |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-option --> sbb-icon
  style sbb-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


