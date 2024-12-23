The `sbb-form-field` component is intended to be used as a form input wrapper with label and errors.

```html
<sbb-form-field>
  <label>Example</label>
  <input />
</sbb-form-field>

<sbb-form-field>
  <label>Example</label>
  <input required />
  <sbb-form-error>This field is required!</sbb-form-error>
</sbb-form-field>
```

In this document, "form field" refers to the wrapper component `sbb-form-field` and
"form field control" refers to the component that the `sbb-form-field` is wrapping
(e.g., the input, select, etc.)

The following components are designed to work inside a `sbb-form-field`:

- `<input>`
- `<select>`
- `<textarea>`
- [sbb-datepicker](/docs/elements-sbb-datepicker-sbb-datepicker--docs) and its associated components
- [sbb-select](/docs/elements-sbb-select--docs)
- [sbb-slider](/docs/elements-sbb-slider--docs)
- [sbb-time-input](/docs/elements-sbb-time-input--docs)
- [sbb-autocomplete](/docs/elements-sbb-autocomplete--docs)

## Slots

### Label

Use a `<label>` element to provide a label for a form input. The
`sbb-form-field` will automatically assign the correct id reference between label and input.

It's possible to use the `floatingLabel` property to display the label inside the input.
When using it and setting the value programmatically to empty or from empty to a specific value,
it's mandatory to call the `reset()` method of the `sbb-form-field` to update the state of the floating label.

```html
<sbb-form-field>
  <label>Example</label>
  <input />
</sbb-form-field>
```

### Error messages

Error messages can be shown under the form field by adding `sbb-form-error` elements inside the form field.
The component will automatically assign them to the `slot='error'`.

```html
<sbb-form-field floating-label>
  <label>Example</label>
  <input required />
  <sbb-form-error>This field is required!</sbb-form-error>
</sbb-form-field>
```

In order to avoid the layout from "jumping" when an error is shown, the option of setting `error-space="reserve"`
on the `sbb-form-field` will reserve space for a single line of an error message.

### Prefix & Suffix

It is possible to add content as a prefix or suffix in a `sbb-form-field`.
This can be done via the `prefix` and `suffix` slots.

```html
<sbb-form-field>
  <label>Example</label>
  <sbb-icon slot="prefix" name="pie-small"></sbb-icon>
  <input />
  <sbb-icon slot="suffix" name="circle-information-small"></sbb-icon>
</sbb-form-field>
```

It's also possible to slot an icon-only button using the [sbb-mini-button](/docs/elements-sbb-button-sbb-mini-button--docs).
Please note that only this component is correctly supported when slotting buttons in `negative` mode.

```html
<sbb-form-field>
  <label>Example</label>
  <input />
  <sbb-mini-button slot="suffix" icon-name="pen-small"></sbb-mini-button>
</sbb-form-field>
```

Some components, like the [sbb-form-field-clear](/docs/elements-sbb-form-field-sbb-form-field-clear--docs) or the
[sbb-slider](/docs/elements-sbb-slider--docs), when used within the form field, will automatically occupy
one or both of these slots.
Please refer to their documentation for more details.

## Style

The component has a `size` property, which accepts three different values: `s`, `m` (default) and `l`.

```html
<sbb-form-field size="s">
  <label>Example</label>
  <input />
</sbb-form-field>

<sbb-form-field size="l">
  <label>Example</label>
  <input required />
  <sbb-form-error>This field is required!</sbb-form-error>
</sbb-form-field>
```

By default, the component has a defined width and min-width. However, this behavior can be overridden by setting
the `width` property to `collapse`: in this way the component adapts its width to the inner slotted input component.
This is useful, for example, for the [sbb-time-input](/docs/elements-sbb-time-input--docs) component.
However, as the width-styles are exposed to the host,
it's possible to apply any desired width by setting just the `width` and `min-width` CSS properties.

```html
<sbb-form-field width="collapse">
  <input value="13:30" />
  <sbb-time-input></sbb-time-input>
</sbb-form-field>
```

## Accessibility

By itself, the `sbb-form-field` does not apply any additional accessibility treatment to a form
element. However, several of the form field's optional features interact with the form element
contained within the form field.

When you provide a label, the `sbb-form-field` automatically
associates this label with the form element using the `for`
attribute to reference the control's ID.
When using a non-native form element (e.g. `sbb-select`), the `aria-labelledby` is used to connect the
form element with the label, by setting an id on the label and referencing this id in the
`aria-labelledby` attribute placed on the form element.
Please note that only one `<label>` element is supported. Additionally, if you place the `<label>`
element outside the `sbb-form-field`, the automatic assignment is skipped, and it is up to the
consumer to use the correct id references.
If you like to visually hide a label, but still present it with screen readers, use the `hiddenLabel` property.

When you provide informational text via `sbb-form-error`, it automatically adds these elements' IDs
to the form element's `aria-describedby` attribute.
Additionally, `sbb-form-error` is slotted to an element having `aria-live="polite"` so that assistive
technology will announce errors when they appear.

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute        | Privacy | Type                                                                | Default            | Description                                                                                                                                                           |
| --------------- | ---------------- | ------- | ------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `borderless`    | `borderless`     | public  | `boolean`                                                           | `false`            | Whether to display the form field without a border.                                                                                                                   |
| `errorSpace`    | `error-space`    | public  | `'none' \| 'reserve'`                                               | `'none'`           | Whether to reserve space for an error message. `none` does not reserve any space. `reserve` does reserve one row for an error message.                                |
| `floatingLabel` | `floating-label` | public  | `boolean`                                                           | `false`            | Whether the label should float. If activated, the placeholder of the input is hidden.                                                                                 |
| `hiddenLabel`   | `hidden-label`   | public  | `boolean`                                                           | `false`            | Whether to visually hide the label. If hidden, screen readers will still read it.                                                                                     |
| `inputElement`  | -                | public  | `HTMLInputElement \| HTMLSelectElement \| HTMLElement \| undefined` |                    | Returns the input element.                                                                                                                                            |
| `negative`      | `negative`       | public  | `boolean`                                                           | `false`            | Negative coloring variant flag.                                                                                                                                       |
| `optional`      | `optional`       | public  | `boolean`                                                           | `false`            | Indicates whether the input is optional.                                                                                                                              |
| `size`          | `size`           | public  | `'l' \| 'm' \| 's'`                                                 | `'m' / 's' (lean)` | Size variant, either l, m or s.                                                                                                                                       |
| `width`         | `width`          | public  | `'default' \| 'collapse'`                                           | `'default'`        | Defines the width of the component: - `default`: the component has defined width and min-width; - `collapse`: the component adapts itself to its inner input content. |

## Methods

| Name    | Privacy | Description                                                                           | Parameters | Return | Inherited From |
| ------- | ------- | ------------------------------------------------------------------------------------- | ---------- | ------ | -------------- |
| `clear` | public  | Manually clears the input value. It only works for inputs, selects are not supported. |            | `void` |                |
| `reset` | public  | Manually reset the form field. Currently, this only resets the floating label.        |            | `void` |                |

## Slots

| Name     | Description                                                                |
| -------- | -------------------------------------------------------------------------- |
|          | Use this slot to render an input/select or a supported non-native element. |
| `error`  | Use this slot to render an error.                                          |
| `label`  | Use this slot to render a label.                                           |
| `prefix` | Use this slot to render an icon on the left side of the input.             |
| `suffix` | Use this slot to render an icon on the right side of the input.            |
