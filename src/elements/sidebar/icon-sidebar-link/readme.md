The `<sbb-icon-sidebar-link>` component provides the same functionality as a native `<a>`,
enhanced with the design of the icon sidebar link.
The `<sbb-icon-sidebar-link>` is intended to be used inside `<sbb-icon-sidebar>`.

```html
<sbb-icon-sidebar-link
  icon-name="glass-cocktail-small"
  href="https://www.sbb.ch"
  accessibility-label="Go to the party"
></sbb-icon-sidebar-link>
```

As an alternative, the icon can be slotted:

```html
<sbb-icon-sidebar-link accessibility-label="Go to the party" href="https://www.sbb.ch">
  <sbb-icon name="glass-cocktail-small" slot="icon"></sbb-icon>
</sbb-icon-sidebar-link>
```

## Active / current state

Use `sbb-active` CSS class to visually indicate whether the icon sidebar button is currently selected.

```html
<sbb-icon-sidebar-link
  href="https://www.sbb.ch"
  icon-name="glass-cocktail-small"
  accessibility-label="Go to the party"
  class="sbb-active"
  accessibility-current="page"
></sbb-icon-sidebar-link>
```

## Accessibility

The definition of a meaningful `accessibility-label` (forwarded as `aria-label` to the inner `<a>` element)
is mandatory as only an icon is displayed.
To show the user which entry is active, `accessibility-current='page'` should be set whenever `sbb-active` class is set.
See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current for more information.

<!-- Auto Generated Below -->

## Properties

| Name                   | Attribute               | Privacy | Type                       | Default | Description                                                                                                                      |
| ---------------------- | ----------------------- | ------- | -------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityCurrent` | `accessibility-current` | public  | `string`                   | `''`    | This will be forwarded as aria-current to the inner anchor element.                                                              |
| `accessibilityLabel`   | `accessibility-label`   | public  | `string`                   | `''`    | This will be forwarded as aria-label to the inner anchor element.                                                                |
| `download`             | `download`              | public  | `boolean`                  | `false` | Whether the browser will show the download dialog on click.                                                                      |
| `href`                 | `href`                  | public  | `string`                   | `''`    | The href value you want to link to.                                                                                              |
| `iconName`             | `icon-name`             | public  | `string`                   | `''`    | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `rel`                  | `rel`                   | public  | `string`                   | `''`    | The relationship of the linked URL as space-separated link types.                                                                |
| `target`               | `target`                | public  | `LinkTargetType \| string` | `''`    | Where to display the linked URL.                                                                                                 |

## Slots

| Name   | Description                    |
| ------ | ------------------------------ |
| `icon` | Slot used to display the icon. |
