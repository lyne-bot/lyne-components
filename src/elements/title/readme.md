The `sbb-title` is a component which renders a heading element according to the provided `level` (default: `1`).

```html
<sbb-title>Hello</sbb-title>
```

## Style

In scenarios where the visual representation needs to be different from the semantic meaning of the title level,
it is possible to use the `visualLevel` property.
The available values for both `level` and `visualLevel` are the numbers from 1 to 6 (`h1` to `h6`).

```html
<sbb-title level="3" visual-level="4">Hi!</sbb-title>
```

The component has a `negative` variant which can be set with the self-named property.

```html
<sbb-title negative>Negative</sbb-title>
```

As a default the `sbb-title` contains spacing on top and bottom on the host.
This can be removed or customized via simple CSS rules.

## Accessibility

If the title is needed, but it must to not be displayed, it's possible to use the `visuallyHidden` property to hide it.

```html
<sbb-title visually-hidden>Screen-reader only.</sbb-title>
```

<!-- Auto Generated Below -->

## Properties

| Name             | Attribute         | Privacy | Type                    | Default | Description                                                                                                                                                                                     |
| ---------------- | ----------------- | ------- | ----------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `level`          | `level`           | public  | `SbbTitleLevel`         | `'1'`   | Title level                                                                                                                                                                                     |
| `negative`       | `negative`        | public  | `boolean`               | `false` | Negative coloring variant flag.                                                                                                                                                                 |
| `visualLevel`    | `visual-level`    | public  | `SbbTitleLevel \| null` | `null`  | Visual level for the title. Optional, if not set, the value of level will be used.                                                                                                              |
| `visuallyHidden` | `visually-hidden` | public  | `boolean`               | `false` | Sometimes we need a title in the markup to present a proper hierarchy to the screen readers while we do not want to let that title appear visually. In this case we set visuallyHidden to true. |

## CSS Properties

| Name                             | Default                           | Description                      |
| -------------------------------- | --------------------------------- | -------------------------------- |
| `--sbb-title-margin-block-end`   | `var(--sbb-spacing-responsive-s)` | Margin block end of the title.   |
| `--sbb-title-margin-block-start` | `var(--sbb-spacing-responsive-m)` | Margin block start of the title. |

## Slots

| Name | Description                                             |
| ---- | ------------------------------------------------------- |
|      | Use the unnamed slot to place the content of the title. |
