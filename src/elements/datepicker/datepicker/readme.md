The `sbb-datepicker` is a component which can be used together with an `<sbb-date-input>` element
to display the typed value as a formatted date (default: `dd.MM.yyyy`).

The component allows the insertion of up to 10 numbers, possibly with separators like `.`, `-`, ` `, `,` or `/`,
then automatically formats the value as date and displays it.
It also allows to get / set the value formatted as Date via the `valueAsDate` property.

The component and the native `<input>` can be connected using the `input` property,
which accepts the id of the native input, or directly its reference.

```html
<sbb-date-input id="datepicker-input"></sbb-date-input>
<sbb-datepicker input="datepicker-input" id="datepicker"></sbb-datepicker>
```

## In `sbb-form-field`

If the `sbb-datepicker` is used within a [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs) with a native input,
they are automatically linked; the component sets the input placeholder and the input's type as `text`,
then reads the `disabled`, `readonly`, `min` and `max` attributes from the input and emits then as payload of the `inputUpdated` event.

It's possible to remove unwanted dates from selection using the `dateFilter` function, however, this should **not**
be used as a replacement for the `min` and `max` properties will most likely result in a significant loss of performance.

It's also possible to display a two-months view using the `wide` property.

```html
<sbb-form-field>
  <sbb-date-input></sbb-date-input>
  <sbb-datepicker></sbb-datepicker>
</sbb-form-field>
```

```html
<!-- Component's usage with all the related components. -->
<sbb-form-field>
  <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
  <sbb-datepicker-toggle></sbb-datepicker-toggle>
  <sbb-date-input value="01.01.2023" min="2022-01-01" max="24-12-31"></sbb-date-input>
  <sbb-datepicker></sbb-datepicker>
  <sbb-datepicker-next-day></sbb-datepicker-next-day>
</sbb-form-field>
```

## Events

If the input's value changes, it is formatted then a `change` event is emitted with the new value.
If it's an invalid date, the `data-sbb-invalid` attribute is added to the input.
The component also listens for changes in its two properties, `wide` and `dateFilter`, and emits a
`datePickerUpdated` event when changed.

Consumers can listen to the native `change` and `input` events on the `sbb-datepicker` component to
intercept date changes. The `valueAsDate` property on the `sbb-datepicker` can be used to read the
current value (e.g. from `event.target.valueAsDate`) or to set the value programmatically.

When the `valueAsDate` property is programmatically assigned, a `blur` event is fired on the input
to ensure compatibility with any framework that relies on that event to update the current state.

## Custom current date

To simulate the current date, you can use the `now` property,
which accepts a `Date` or a timestamp in seconds (as number or string).
This is helpful if you need a specific state of the component.

<!-- TODO: add date adapter configuration documentation -->

## Validation Change

Whenever the validation state changes (e.g., a valid value becomes invalid or vice-versa), the `validationChange` event is emitted.

<!-- Auto Generated Below -->

## Properties

| Name           | Attribute | Privacy | Type                                                 | Default | Description                                                                                                                                                                                                                                                                            |
| -------------- | --------- | ------- | ---------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dateFilter`   | -         | public  | `(date: T \| null) => boolean`                       |         | A function used to filter out dates.<br><strong>Deprecated</strong>: Use dateFilter from SbbDateInputElement.                                                                                                                                                                          |
| `input`        | `input`   | public  | `string \| HTMLElement \| null`                      | `null`  | Reference of the sbb-date-input instance or the native input connected to the datepicker. If given a string, it will be treated as an id reference and an attempt is made to be resolved for the containing document fragment. If given a HTMLElement instance, it will be used as is. |
| `inputElement` | -         | public  | `HTMLInputElement \| SbbDateInputElement<T> \| null` | `null`  | The resolved associated input element, as defined by `input`.                                                                                                                                                                                                                          |
| `now`          | `now`     | public  | `T`                                                  |         | A configured date which acts as the current date instead of the real current date. Recommended for testing purposes.                                                                                                                                                                   |
| `valueAsDate`  | -         | public  | `T \| null`                                          |         | The currently selected date as a Date or custom date provider instance.<br><strong>Deprecated</strong>: Use valueAsDate from SbbDateInputElement.                                                                                                                                      |
| `wide`         | `wide`    | public  | `boolean`                                            | `false` | If set to true, two months are displayed.                                                                                                                                                                                                                                              |

## Methods

| Name                        | Privacy | Description                                                                                                                                                                            | Parameters | Return | Inherited From |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------ | -------------- |
| `findNextAvailableDate`     | public  | Calculates the first available date after the given one, considering the SbbDatepickerElement `dateFilter` property and `max` parameter (e.g. from the self-named input's attribute).  | `date: T`  | `T`    |                |
| `findPreviousAvailableDate` | public  | Calculates the first available date before the given one, considering the SbbDatepickerElement `dateFilter` property and `min` parameter (e.g. from the self-named input's attribute). | `date: T`  | `T`    |                |

## Events

| Name                | Type                                    | Description                                                                         | Inherited From |
| ------------------- | --------------------------------------- | ----------------------------------------------------------------------------------- | -------------- |
| `change`            | `CustomEvent<void>`                     | Notifies that the connected input has changes.                                      |                |
| `datePickerUpdated` | `CustomEvent<void>`                     | Notifies that the attributes of the datepicker have changes.                        |                |
| `input`             | `CustomEvent<void>`                     | Notifies that the connected input fired the input event.                            |                |
| `inputUpdated`      | `CustomEvent<SbbInputUpdateEvent>`      | Notifies that the attributes of the input connected to the datepicker have changes. |                |
| `validationChange`  | `CustomEvent<SbbValidationChangeEvent>` | Emits whenever the internal validation state changes.                               |                |
