The `sbb-date-input` is an input component for a date. It is comparable to the
`<input type="date">` element, however without a datepicker attached (See
`<sbb-datepicker>` to provide a datepicker dropdown with the
`<sbb-date-input>`).

It supports a `value` attribute/property and a `valueAsDate` property.
The `valueAsDate` provides a date object (`Date` per default,
depending on the used `DateAdapter`), if `value` is parseable
to a valid date and null otherwise.

Both `value` and `valueAsDate` also work as setters and the other
property will be updated accordingly.

```html
<sbb-date-input value="2024-12-12"></sbb-date-input>
```

```html
<sbb-form-field>
  <label>Date</label>
  <sbb-date-input value="2024-12-12"></sbb-date-input>
</sbb-form-field>
```

## Weekday style

Due to business rules, a formatted date is always displayed with an abbreviated
weekday (e.g. `Th, 12.12.2024`).
To prevent this, set the `weekday-style` attribute to `none`.

```html
<sbb-date-input value="2024-12-12" weekday-style="none"></sbb-date-input>
```

## Events

Similar to the native `<input>` element, the `sbb-date-input` component
dispatches the usual `input`, `change`, `blur`, `invalid` and keyboard
and focus related events.

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute       | Privacy | Type                           | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | --------------- | ------- | ------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dateFilter`        | -               | public  | `(date: T \| null) => boolean` |           | A function used to filter out dates.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `disabled`          | `disabled`      | public  | `boolean`                      | `false`   | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `form`              | -               | public  | `HTMLFormElement \| null`      |           | Returns the form owner of this element.                                                                                                                                                                                                                                                                                                                                                                                                                |
| `max`               | `max`           | public  | `T \| null`                    | `null`    |                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `min`               | `min`           | public  | `T \| null`                    | `null`    |                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `name`              | `name`          | public  | `string`                       |           | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                            |
| `placeholder`       | -               | public  | `string`                       |           |                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `readOnly`          | `readonly`      | public  | `boolean`                      | `false`   | Whether the component is readonly.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `required`          | `required`      | public  | `boolean`                      | `false`   | Whether the component is required.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `type`              | -               | public  | `string`                       | `'text'`  | Form type of element.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `validationMessage` | -               | public  | `string`                       |           | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -               | public  | `ValidityState`                |           | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `value`             | `Accepts`       | public  | `string \| null`               | `null`    | The value of the date input. Reflects the current text value of this input.                                                                                                                                                                                                                                                                                                                                                                            |
| `valueAsDate`       | -               | public  | `T \| null`                    |           |                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `weekdayStyle`      | `weekday-style` | public  | `'short' \| 'none'`            | `'short'` | How to format the displayed date. `short`: Two letter abbreviation of the week day (e.g. Fr). `none`: The weekday is not displayed.                                                                                                                                                                                                                                                                                                                    |
| `willValidate`      | -               | public  | `boolean`                      |           | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                            |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters              | Return    | Inherited From              |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | --------- | --------------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                         | `boolean` | SbbFormAssociatedMixin      |
| `focus`             | public  |                                                                                                                                                                                            | `options: FocusOptions` | `void`    | SbbFormAssociatedInputMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                         | `boolean` | SbbFormAssociatedMixin      |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string`       | `void`    | SbbFormAssociatedMixin      |

## Events

| Name     | Type         | Description | Inherited From              |
| -------- | ------------ | ----------- | --------------------------- |
| `change` | `Event`      |             | SbbFormAssociatedInputMixin |
| `input`  | `InputEvent` |             | SbbFormAssociatedInputMixin |
