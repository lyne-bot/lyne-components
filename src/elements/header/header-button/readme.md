The component represents a button element contained by the [sbb-header](/docs/elements-sbb-header-sbb-header--docs) component.

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-header-button>Text</sbb-header-button>

<sbb-header-button icon-name="pie-small">Another text</sbb-header-button>
```

If the component's icon is set, the property `expandFrom` can be used to define the minimum breakpoint
from which the label is displayed; below that, only the icon is visible.

```html
<sbb-header-button expand-from="medium">Text</sbb-header-button>
```

### Style

To indicate an active state, the CSS class `sbb-active` should be set.

From accessibility perspective `aria-current="page"` should be set whenever the CSS class `sbb-active` is set.

```html
<sbb-header-button
  icon-name="magnifying-glass-small"
  href="#"
  class="sbb-active"
  aria-current="page"
>
  Overview
</sbb-header-button>
```

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

```html
<sbb-header-button value="menu" name="menu">Button</sbb-header-button>
```

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute     | Privacy | Type                      | Default    | Description                                                                                                                                                                              |
| ------------ | ------------- | ------- | ------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expandFrom` | `expand-from` | public  | `SbbHorizontalFrom`       | `'medium'` | Used to set the minimum breakpoint from which the text is displayed. E.g. if set to 'large', the text will be visible for breakpoints large, wide, ultra, and hidden for all the others. |
| `form`       | `form`        | public  | `HTMLFormElement \| null` |            | The `<form>` element to associate the button with.                                                                                                                                       |
| `iconName`   | `icon-name`   | public  | `string`                  | `''`       | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                                                         |
| `name`       | `name`        | public  | `string`                  |            | Name of the form element. Will be read from name attribute.                                                                                                                              |
| `type`       | `type`        | public  | `SbbButtonType`           | `'button'` | The type attribute to use for the button.                                                                                                                                                |
| `value`      | `value`       | public  | `string \| null`          | `null`     | Value of the form element.                                                                                                                                                               |

## Slots

| Name   | Description                                                     |
| ------ | --------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the `sbb-header-button`. |
| `icon` | Slot used to render the button icon.                            |
