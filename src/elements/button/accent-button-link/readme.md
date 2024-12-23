The `sbb-accent-button-link` component provides the same functionality as a native `<a>`,
despite its appearance as a button enhanced with the SBB Design in the 'accent' variant.

```html
<sbb-accent-button-link href="https://www.sbb.ch">Button text</sbb-accent-button-link>
```

## Slots

The text is provided via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
At least one is mandatory, so you can have a `sbb-accent-button-link` with icon only, text only, or with both.

```html
<sbb-accent-button-link href="https://www.sbb.ch" icon-name="info">
  Button text
</sbb-accent-button-link>

<sbb-accent-button-link href="https://www.sbb.ch">
  <sbb-icon slot="icon" name="info"></sbb-icon>
  Button text
</sbb-accent-button-link>

<sbb-accent-button-link
  href="https://www.sbb.ch"
  icon-name="info"
  accessibility-label="Click for more information."
></sbb-accent-button-link>
```

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

```html
<sbb-accent-button-link
  href="https://github.com/sbb-design-systems/lyne-components"
  target="_blank"
>
  Go to site
</sbb-accent-button-link>
```

## Style

The component has a negative variant which can be set using the `negative` property.

There are two different sizes (`m` and `l`, which is the default) that can be set using the `size` property.

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-accent-button-link href="https://www.sbb.ch" negative>Button</sbb-accent-button-link>

<sbb-accent-button-link href="https://www.sbb.ch" size="m">Button</sbb-accent-button-link>

<sbb-accent-button-link href="https://www.sbb.ch" disabled>Button</sbb-accent-button-link>
```

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the CSS var on `sbb-accent-button-link` or any parent element:

```css
sbb-accent-button-link {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## Accessibility

Use the accessibility properties in case of an icon-only button to describe the purpose of the `sbb-accent-button-link` for screen-reader users.

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute              | Privacy | Type                       | Default            | Description                                                                                                                      |
| --------------------- | ---------------------- | ------- | -------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel`  | `accessibility-label`  | public  | `string`                   | `''`               | This will be forwarded as aria-label to the inner anchor element.                                                                |
| `disabled`            | `disabled`             | public  | `boolean`                  | `false`            | Whether the component is disabled.                                                                                               |
| `disabledInteractive` | `disabled-interactive` | public  | `boolean`                  | `false`            | Whether the button should be aria-disabled but stay interactive.                                                                 |
| `download`            | `download`             | public  | `boolean`                  | `false`            | Whether the browser will show the download dialog on click.                                                                      |
| `href`                | `href`                 | public  | `string`                   | `''`               | The href value you want to link to.                                                                                              |
| `iconName`            | `icon-name`            | public  | `string`                   | `''`               | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `negative`            | `negative`             | public  | `boolean`                  | `false`            | Negative coloring variant flag.                                                                                                  |
| `rel`                 | `rel`                  | public  | `string`                   | `''`               | The relationship of the linked URL as space-separated link types.                                                                |
| `size`                | `size`                 | public  | `SbbButtonSize`            | `'l' / 's' (lean)` | Size variant, either l, m or s.                                                                                                  |
| `target`              | `target`               | public  | `LinkTargetType \| string` | `''`               | Where to display the linked URL.                                                                                                 |

## Slots

| Name   | Description                                                    |
| ------ | -------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the accent-button-link. |
| `icon` | Slot used to display the icon, if one is set                   |
