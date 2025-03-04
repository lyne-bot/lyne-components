The `<sbb-icon-sidebar-button>` component provides the same functionality as a native `<button>`
enhanced with the design of the icon sidebar button.
The `<sbb-icon-sidebar-button>` is intended to be used inside `<sbb-icon-sidebar>`.

```html
<sbb-icon-sidebar-button
  icon-name="glass-cocktail-small"
  aria-label="Go to the party"
></sbb-icon-sidebar-button>
```

As an alternative, the icon can be slotted:

```html
<sbb-icon-sidebar-button aria-label="Go to the party">
  <sbb-icon name="glass-cocktail-small" slot="icon"></sbb-icon>
</sbb-icon-sidebar-button>
```

## Active / current state

Use `sbb-active` CSS class to visually indicate whether the icon sidebar button is currently selected.

```html
<sbb-icon-sidebar-button
  icon-name="glass-cocktail-small"
  aria-label="Go to the party"
  class="sbb-active"
  aria-current="page"
></sbb-icon-sidebar-button>
```

## Accessibility

The definition of a meaningful `aria-label` is mandatory as only an icon is displayed.
To show the user which entry is active, `accessibility-current='page'`
(or `aria-current="page"` for `sbb-icon-sidebar-button`s) should be set whenever `sbb-active` class is set.
See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current for more information.

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute   | Privacy | Type                      | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ----------- | ------- | ------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `form`              | `form`      | public  | `HTMLFormElement \| null` |            | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `iconName`          | `icon-name` | public  | `string`                  | `''`       | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                                                                                                                                                                                                                                                                                                                       |
| `name`              | `name`      | public  | `string`                  |            | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                            |
| `type`              | `type`      | public  | `SbbButtonType`           | `'button'` | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `validationMessage` | -           | public  | `string`                  |            | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -           | public  | `ValidityState`           |            | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `value`             | `value`     | public  | `string \| null`          | `null`     | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `willValidate`      | -           | public  | `boolean`                 |            | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                            |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

## Slots

| Name   | Description                    |
| ------ | ------------------------------ |
| `icon` | Slot used to display the icon. |
