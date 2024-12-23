The `sbb-chip` is a visual component used to display compact information, like a filter's name or a tag.

```html
<sbb-chip>On sale</sbb-chip>
```

## Style

It's possible to choose among three different values for the `size` property (`s`, `xs` and `xxs`, which is the default),
and four different values for the `color` property (`charcoal`, `granite`, `white` and `milk`, which is the default).

```html
<sbb-chip-label color="charcoal" size="s">Label</sbb-chip-label>

<sbb-chip-label color="granite" size="xs">Label</sbb-chip-label>

<sbb-chip-label color="white">Label</sbb-chip-label>
```

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type                                           | Default  | Description        |
| ------- | --------- | ------- | ---------------------------------------------- | -------- | ------------------ |
| `color` | `color`   | public  | `'milk' \| 'charcoal' \| 'white' \| 'granite'` | `'milk'` | Color of the chip. |
| `size`  | `size`    | public  | `'xxs' \| 'xs' \| 's'`                         | `'xxs'`  | Size of the chip.  |

## Slots

| Name | Description                                                  |
| ---- | ------------------------------------------------------------ |
|      | Use the unnamed slot to add content to the `sbb-chip-label`. |
