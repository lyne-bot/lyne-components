The `sbb-datepicker-toggle` is a component
closely connected to the [sbb-datepicker](/docs/elements-sbb-datepicker-sbb-datepicker--docs).

When the two are used together, the `sbb-datepicker-toggle` can be used to link the `sbb-datepicker`
to a [sbb-calendar](/docs/elements-sbb-datepicker-sbb-calendar--docs):
a change in the latter, like selecting a date, is propagated to the former; and conversely, changes in the `sbb-datepicker`
properties, or in the date-picker's input attributes, are propagated to the `sbb-calendar` to modify its appearance.

The components can be connected using the `datePicker` property, which accepts the id of the `sbb-datepicker`,
or directly its reference.

```html
<sbb-datepicker-toggle date-picker="datepicker"></sbb-datepicker-toggle>
<input id="datepicker-input" />
<sbb-datepicker input="datepicker-input" id="datepicker"></sbb-datepicker>
```

## In `sbb-form-field`

If the two components are used within a [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs),
they are automatically linked and the `sbb-datepicker-toggle` will be projected in the `prefix` slot of the `sbb-form-field`;
otherwise, they can be connected using the `datePicker` property as described above.

```html
<sbb-form-field>
  <sbb-datepicker-toggle></sbb-datepicker-toggle>
  <input />
  <sbb-datepicker></sbb-datepicker>
</sbb-form-field>
```

NOTE: Since the component needs the `sbb-datepicker` to work properly,
both standalone or within the `sbb-form-field`, they must have the same parent element to be correctly connected.

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute     | Privacy | Type                                     | Default | Description                                                        |
| ------------ | ------------- | ------- | ---------------------------------------- | ------- | ------------------------------------------------------------------ |
| `datePicker` | `date-picker` | public  | `string \| SbbDatepickerElement \| null` | `null`  | Datepicker reference.                                              |
| `negative`   | `negative`    | public  | `boolean`                                | `false` | Negative coloring variant flag.                                    |
| `view`       | `view`        | public  | `CalendarView`                           | `'day'` | The initial view of calendar which should be displayed on opening. |

## Methods

| Name   | Privacy | Description         | Parameters | Return | Inherited From |
| ------ | ------- | ------------------- | ---------- | ------ | -------------- |
| `open` | public  | Opens the calendar. |            | `void` |                |
