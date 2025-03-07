The `sbb-datepicker-next-day` is a component closely connected to the [sbb-datepicker](/docs/elements-sbb-datepicker-sbb-datepicker--docs);
when the two are used together, the `sbb-datepicker-next-day` can be used to choose
the date after the selected date, or tomorrow's date if the date-picker's input has no defined value.

The components can be connected using the `datePicker` property, which accepts the id of the `sbb-datepicker`,
or directly its reference.

```html
<sbb-date-input id="datepicker-input"></sbb-date-input>
<sbb-datepicker input="datepicker-input" id="datepicker"></sbb-datepicker>
<sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
```

## In `sbb-form-field`

If the two components are used within a [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs),
they are automatically linked and the `sbb-datepicker-next-day` will be projected in the `suffix` slot of the `sbb-form-field`;
otherwise, they can be connected using the `datePicker` property as described above.

The `sbb-datepicker-next-day` has an internal disabled state, which is set looking at the `sbb-datepicker`'s input:
if it is disabled, or if the selected date is equal to the input's `max` attribute, the component is disabled.

```html
<sbb-form-field>
  <sbb-date-input></sbb-date-input>
  <sbb-datepicker></sbb-datepicker>
  <sbb-datepicker-next-day></sbb-datepicker-next-day>
</sbb-form-field>
```

NOTE: Since the component needs the `sbb-datepicker` to work properly,
both standalone or within the `sbb-form-field`, they must have the same parent element to be correctly connected.

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute    | Privacy | Type                              | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ------------ | ------- | --------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `datepicker`        | `datepicker` | public  | `SbbDatepickerElement<T> \| null` |            | Datepicker reference.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `form`              | `form`       | public  | `HTMLFormElement \| null`         |            | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `name`              | `name`       | public  | `string`                          |            | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                            |
| `negative`          | `negative`   | public  | `boolean`                         | `false`    | Negative coloring variant flag.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `type`              | `type`       | public  | `SbbButtonType`                   | `'button'` | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `validationMessage` | -            | public  | `string`                          |            | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -            | public  | `ValidityState`                   |            | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `value`             | `value`      | public  | `string \| null`                  | `null`     | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `willValidate`      | -            | public  | `boolean`                         |            | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                            |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |
