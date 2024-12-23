The `sbb-datepicker-previous-day` is a component closely connected to the [sbb-datepicker](/docs/elements-sbb-datepicker-sbb-datepicker--docs);
when the two are used together, the `sbb-datepicker-previous-day` can be used to choose
the date before the selected date, or yesterday's date if the date-picker's input has no defined value.

The components can be connected using the `datePicker` property, which accepts the id of the `sbb-datepicker`,
or directly its reference.

```html
<sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
<input id="datepicker-input" />
<sbb-datepicker input="datepicker-input" id="datepicker"></sbb-datepicker>
```

## In `sbb-form-field`

If the two components are used within a [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs),
they are automatically linked and the `sbb-datepicker-previous-day` will be projected in the `prefix` slot of the `sbb-form-field`;
otherwise, they can be connected using the `datePicker` property as described above.

The `sbb-datepicker-previous-day` has an internal disabled state, which is set looking at the `sbb-datepicker`'s input:
if it is disabled, or if the selected date is equal to the input's `min` attribute, the component is disabled.

```html
<sbb-form-field>
  <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
  <input />
  <sbb-datepicker></sbb-datepicker>
</sbb-form-field>
```

NOTE: Since the component needs the `sbb-datepicker` to work properly,
both standalone or within the `sbb-form-field`, they must have the same parent element to be correctly connected.

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute     | Privacy | Type                                        | Default    | Description                                                 |
| ------------ | ------------- | ------- | ------------------------------------------- | ---------- | ----------------------------------------------------------- |
| `datePicker` | `date-picker` | public  | `string \| SbbDatepickerElement<T> \| null` | `null`     | Datepicker reference.                                       |
| `form`       | `form`        | public  | `HTMLFormElement \| null`                   |            | The `<form>` element to associate the button with.          |
| `name`       | `name`        | public  | `string`                                    |            | Name of the form element. Will be read from name attribute. |
| `negative`   | `negative`    | public  | `boolean`                                   | `false`    | Negative coloring variant flag.                             |
| `type`       | `type`        | public  | `SbbButtonType`                             | `'button'` | The type attribute to use for the button.                   |
| `value`      | `value`       | public  | `string \| null`                            | `null`     | Value of the form element.                                  |
