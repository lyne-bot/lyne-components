The `sbb-block-link-static` component mimics the look of the `<sbb-link>`,
and it's meant to be used whenever is required to nest one link inside another without breaking the HTML functionality.

```html
<sbb-block-link-static>Fake link</sbb-block-link-static>
```

## Slots

The text is provided via an unnamed slot; the component can optionally display a `sbb-icon` using
the `iconName` property or via custom content using the `icon` slot.
By default, the icon is placed at the component's end, but this can be changed using the `iconPlacement` property.

```html
<sbb-block-link-static icon-name="chevron-small-right-small"> Help </sbb-block-link-static>

<sbb-block-link-static icon-name="chevron-small-left-small" icon-placement="start">
  Contact
</sbb-block-link-static>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-block-link-static disabled>Refunds</sbb-block-link-static>
```

## Style

The component has three sizes (`xs`, `s`, which is the default, and `m`).

```html
<sbb-block-link-static size="m">Refunds</sbb-block-link-static>
```

### Active state

To show a currently active link, the CSS class `sbb-active` can be placed on the `sbb-block-link-static`.
One possible use case would be to use it within the `sbb-sidebar`.

```html
<sbb-block-link-static class="sbb-active" aria-current="page">Refunds</sbb-block-link-static>
```

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute        | Privacy | Type               | Default             | Description                                                                                                                      |
| --------------- | ---------------- | ------- | ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`      | `disabled`       | public  | `boolean`          | `false`             | Whether the component is disabled.                                                                                               |
| `iconName`      | `icon-name`      | public  | `string`           | `''`                | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `iconPlacement` | `icon-placement` | public  | `SbbIconPlacement` | `'start'`           | Moves the icon to the end of the component if set to true.                                                                       |
| `size`          | `size`           | public  | `SbbLinkSize`      | `'s' / 'xs' (lean)` | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used.       |

## Slots

| Name   | Description                                                         |
| ------ | ------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the `sbb-block-link-static`. |
| `icon` | Slot used to display the icon, if one is set.                       |
