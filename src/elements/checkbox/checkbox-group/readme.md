The `sbb-checkbox-group` component is used as a container for a collection of either
[sbb-checkbox](/docs/elements-sbb-checkbox-sbb-checkbox--docs)s, [sbb-checkbox-panel](/docs/elements-sbb-checkbox-sbb-checkbox-panel--docs)s,
or [sbb-selection-expansion-panel](/docs/elements-sbb-selection-expansion-panel--docs).

```html
<sbb-checkbox-group>
  <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
  <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
  <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
</sbb-checkbox-group>

<sbb-checkbox-group>
  <sbb-selection-expansion-panel>
    <sbb-checkbox>
      Value
      <span slot="suffix">
        <sbb-icon></sbb-icon>
        <span class="sbb-text-xs sbb-text--bold">CHF</span>
        <span class="sbb-text-m sbb-text--bold">40.00</span>
      </span>
    </sbb-checkbox>
  </sbb-selection-expansion-panel>
</sbb-checkbox-group>
```

## Slots

The content is projected in an unnamed slot.

The component can display one or more [sbb-form-error](/docs/elements-sbb-form-field-sbb-form-error--docs) components
right below the `sbb-checkbox-group` using the `error` slot.

```html
<sbb-checkbox-group>
  <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
  <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
  <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
  <sbb-form-error slot="error">You must accept all the terms and conditions.</sbb-form-error>
</sbb-checkbox-group>
```

## States

It is possible to mark the entire group as disabled or required using the properties `disabled` and `required`.

```html
<!-- All the child sbb-checkbox will be marked as required. -->
<sbb-checkbox-group required> ... </sbb-checkbox-group>

<!-- All the child sbb-checkbox will be marked as disabled. -->
<sbb-checkbox-group disabled> ... </sbb-checkbox-group>
```

## Style

The `orientation` property is used to set item orientation.
Possible values are `horizontal` (default) and `vertical`.
The optional property `horizontalFrom` can be used in combination with `orientation='vertical'` to
indicate the minimum breakpoint from which the orientation changes to `horizontal`.

```html
<sbb-checkbox-group orientation="vertical" horizontal-from="large"> ... </sbb-checkbox-group>
```

The component has a `size` property too, which can be used to change the size of all the inner `sbb-checkbox`.
Two values are available, `s` and `m`, which is the default

```html
<sbb-checkbox-group size="s"> ... </sbb-checkbox-group>
```

<!-- Auto Generated Below -->

## Properties

| Name             | Attribute         | Privacy | Type                                                | Default             | Description                                                                    |
| ---------------- | ----------------- | ------- | --------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------ |
| `checkboxes`     | -                 | public  | `(SbbCheckboxElement \| SbbCheckboxPanelElement)[]` |                     | List of contained checkbox elements.                                           |
| `disabled`       | `disabled`        | public  | `boolean`                                           | `false`             | Whether the component is disabled.                                             |
| `horizontalFrom` | `horizontal-from` | public  | `SbbHorizontalFrom \| null`                         | `null`              | Overrides the behaviour of `orientation` property.                             |
| `orientation`    | `orientation`     | public  | `SbbOrientation`                                    | `'horizontal'`      | Indicates the orientation of the checkboxes inside the `<sbb-checkbox-group>`. |
| `required`       | `required`        | public  | `boolean`                                           | `false`             | Whether the checkbox group is required.                                        |
| `size`           | `size`            | public  | `SbbCheckboxSize`                                   | `'m' / 'xs' (lean)` | Size variant, either m, s or xs.                                               |

## Slots

| Name    | Description                                                                      |
| ------- | -------------------------------------------------------------------------------- |
|         | Use the unnamed slot to add `sbb-checkbox` elements to the `sbb-checkbox-group`. |
| `error` | Slot used to render a `sbb-form-error` inside the `sbb-checkbox-group`.          |
