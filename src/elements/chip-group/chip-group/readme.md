The `sbb-chip-group` component is a container for one or multiple `sbb-chip`.
Generally, it is used in combination with an `sbb-form-field` to allow the input of multiple string values.

The `value` property reflects the list of slotted chips. Adding or removing an `sbb-chip` updates the value property, and vice versa.

```html
<sbb-form-field>
  <label>Field label</label>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input />
  </sbb-chip-group>
</sbb-form-field>
```

## Slots

Use the unnamed slot to provide the `sbb-chip` and the `input` field.

## States

The `sbb-chip-group` has a `disabled` and a `readonly` state and reacts to the respective `input` properties.
The `disabled`/`readonly` property is proxied to the slotted `sbb-chip`.

```html
<sbb-form-field>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input disabled />
    <!-- Or -->
    <input readonly />
  </sbb-chip-group>
</sbb-form-field>
```

## Style

The `sbb-chip-group` has a `negative` variant. If within an `sbb-form-field`, the properties automatically sync.

```html
<sbb-form-field negative>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input />
  </sbb-chip-group>
</sbb-form-field>
```

## Usage

By default, when the user presses `Enter`, the `sbb-chip-group` will create a new `sbb-chip` and add it to the slotted elements.

Consumers can customize or prevent this behavior by listening to the `chipInputTokenEnd` event.

```html
<!-- Preventing the event will stop the chip-group from converting the input value into a chip -->
<sbb-chip-group name="field-name" @chipInputTokenEnd="${(ev)" ="">
  ev.preventDefault()}> ...
  <input />
</sbb-chip-group>
```

```html
<!-- Use the event.detail object to override the default behavior -->
<sbb-chip-group
  name="field-name"
  @chipInputTokenEnd=${(ev: CustomEvent<SbbChipInputTokenEndEventDetails>) => {
    ev.detail.setValue(transformedValue);
    ev.detail.setLabel('Custom label');
  }}>
  ...
  <input />
</sbb-chip-group>
```

### Use within forms

The `sbb-chip-group` is a form-associated element that can be part of a form. Its value is an array of strings.

**Note:** The `name` must be set on the `sbb-chip-group`, not on the `input`

```html
<form>
  <sbb-form-field>
    <sbb-chip-group name="field-name">
      <sbb-chip value="Value 1"></sbb-chip>
      ...
      <input />
    </sbb-chip-group>
  </sbb-form-field>
</form>
```

### Use with Autocomplete

It is possible to combine the functionalities of `chip-group` and the [sbb-autocomplete](/docs/elements-sbb-autocomplete--docs).

In this scenario, selecting an option will create a new chip using the option value.

```html
<sbb-form-field>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input />
  </sbb-chip-group>
  <sbb-autocomplete>
    <sbb-option value="Option A">Option A</sbb-option>
    ...
  </sbb-autocomplete>
</sbb-form-field>
```

## Keyboard interaction

At any time, only a single chip (usually, the last one) is focusable and part of the tab order. Users can move between them using the arrow keys.

| Keyboard                    | Action                                                    |
| --------------------------- | --------------------------------------------------------- |
| <kbd>Enter</kbd>            | When the `input` is focused, add a new chip.              |
| <kbd>Backspace</kbd>        | When the `input` is empty & focused, focus the last chip. |
| <kbd>Backspace</kbd>        | When the `sbb-chip` is focused, delete it.                |
| <kbd>Left/Up Arrow</kbd>    | Move the next `sbb-chip`.                                 |
| <kbd>Right/Down Arrow</kbd> | Move the previous `sbb-chip`.                             |

## Accessibility

The `sbb-chip-group` follows the `grid` aria pattern.

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute        | Privacy | Type                      | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ---------------- | ------- | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `disabled`          | `disabled`       | public  | `boolean`                 | `false` | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `form`              | -                | public  | `HTMLFormElement \| null` |         | Returns the form owner of this element.                                                                                                                                                                                                                                                                                                                                                                                                                |
| `name`              | `name`           | public  | `string`                  |         | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                            |
| `negative`          | `negative`       | public  | `boolean`                 | `false` | Negative coloring variant flag.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `separatorKeys`     | `separator-keys` | public  | `string`                  | `null!` | The keys that will be used to split the token when the user creates a new chip (e.g. ',;.')                                                                                                                                                                                                                                                                                                                                                            |
| `validationMessage` | -                | public  | `string`                  |         | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -                | public  | `ValidityState`           |         | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `value`             | `value`          | public  | `string[] \| null`        | `null`  | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `willValidate`      | -                | public  | `boolean`                 |         | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                            |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

## Events

| Name                | Type                                            | Description                                                    | Inherited From |
| ------------------- | ----------------------------------------------- | -------------------------------------------------------------- | -------------- |
| `change`            | `CustomEvent<void>`                             | Notifies that the component's value has changed.               |                |
| `chipInputTokenEnd` | `CustomEvent<SbbChipInputTokenEndEventDetails>` | Notifies that a chip is about to be created. Can be prevented. |                |
| `input`             | `CustomEvent<void>`                             | Notifies that the component's value has changed.               |                |

## Slots

| Name | Description                                      |
| ---- | ------------------------------------------------ |
|      | Use the unnamed slot to add `sbb-chip` elements. |
