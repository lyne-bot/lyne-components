The `sbb-visual-checkbox` is an 'internal-use-only' component used to display a non-interactive checkbox within an interactive component.
It is used in the [sbb-checkbox](/docs/elements-sbb-checkbox-sbb-checkbox--docs) component,
and in the [sbb-option](/docs/elements-sbb-option-sbb-option--docs) component
when it's used within a multiple [sbb-select](/docs/elements-sbb-select--docs).

## States

It has four different states related to the properties `checked`, `indeterminate` and `disabled`:

- a default unchecked state: an empty square is shown;
- a checked state (`checked` set to `true`): a tick appears in the square;
- an indeterminate state (`checked` unset and `indeterminate` set to `true`): a horizontal line is displayed in the square;
- a disabled state (`disabled` set to `true`): a grayed out empty square is shown.

## Style

The component has three `size`, named `xs`, `s` and `m` (default).

```html
<sbb-visual-checkbox size="xs"></sbb-visual-checkbox>

<sbb-visual-checkbox size="s"></sbb-visual-checkbox>
```

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute       | Privacy | Type              | Default             | Description                              |
| --------------- | --------------- | ------- | ----------------- | ------------------- | ---------------------------------------- |
| `checked`       | `checked`       | public  | `boolean`         | `false`             | Checked state.                           |
| `disabled`      | `disabled`      | public  | `boolean`         | `false`             | Whether the component is disabled.       |
| `indeterminate` | `indeterminate` | public  | `boolean`         | `false`             | Indeterminate state.                     |
| `negative`      | `negative`      | public  | `boolean`         | `false`             | Negative coloring variant flag.          |
| `size`          | `size`          | public  | `SbbCheckboxSize` | `'m' / 'xs' (lean)` | Size of the checkbox, either xs, s or m. |
