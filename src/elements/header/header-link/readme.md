The component represents a link element contained by the [sbb-header](/docs/elements-sbb-header-sbb-header--docs) component.

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-header-link href="#">Text</sbb-header-link>

<sbb-header-link href="#" icon-name="pie-small">Another text</sbb-header-link>
```

If the component's icon is set, the property `expandFrom` can be used to define the minimum breakpoint
from which the label is displayed; below that, only the icon is visible.

```html
<sbb-header-link href="#" expand-from="medium">Text</sbb-header-link>
```

### Style

To indicate an active state, the CSS class `sbb-active` should be set.

From accessibility perspective `aria-current="page"` should be set whenever the CSS class `sbb-active` is set.

```html
<sbb-header-link icon-name="magnifying-glass-small" href="#" class="sbb-active" aria-current="page">
  Overview
</sbb-header-link>
```

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

```html
<sbb-header-link href="#info" target="_blank">Link</sbb-header-link>
```

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                       | Default    | Description                                                                                                                                                                              |
| -------------------- | --------------------- | ------- | -------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                   | `''`       | This will be forwarded as aria-label to the inner anchor element.                                                                                                                        |
| `download`           | `download`            | public  | `boolean`                  | `false`    | Whether the browser will show the download dialog on click.                                                                                                                              |
| `expandFrom`         | `expand-from`         | public  | `SbbHorizontalFrom`        | `'medium'` | Used to set the minimum breakpoint from which the text is displayed. E.g. if set to 'large', the text will be visible for breakpoints large, wide, ultra, and hidden for all the others. |
| `href`               | `href`                | public  | `string`                   | `''`       | The href value you want to link to.                                                                                                                                                      |
| `iconName`           | `icon-name`           | public  | `string`                   | `''`       | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                                                         |
| `rel`                | `rel`                 | public  | `string`                   | `''`       | The relationship of the linked URL as space-separated link types.                                                                                                                        |
| `target`             | `target`              | public  | `LinkTargetType \| string` | `''`       | Where to display the linked URL.                                                                                                                                                         |

## Slots

| Name   | Description                                                   |
| ------ | ------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the `sbb-header-link`. |
| `icon` | Slot used to render the link icon.                            |
