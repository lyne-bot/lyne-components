The `sbb-checkbox-panel` component provides the same functionality as a native `<input type="checkbox"/>` enhanced with the selection panel design and functionalities.

## Slots

It is possible to provide a label via an unnamed slot;
additionally the slots named `subtext` can be used to provide a subtext and
the slot named `suffix` can be used to provide suffix items.
If you use a <sbb-card-badge>, the slot `badge` is automatically assigned.

```html
<sbb-checkbox-panel>
  <sbb-card-badge>%</sbb-card-badge>
  Label
  <span slot="subtext">Subtext</span>
  <span slot="suffix">Suffix</span>
</sbb-checkbox-panel>
```

## States

The component could be checked or not depending on the value of the `checked` attribute.

```html
<sbb-checkbox-panel value="example-value" checked>Checked state</sbb-checkbox-panel>
```

It has a third state too, which is set if the `indeterminate` property is true.
This is useful when multiple dependent checkbox-panels are used
(e.g., a parent which is checked only if all the children are checked, otherwise is in indeterminate state).
Clicking on a `sbb-checkbox-panel` in this state sets `checked` to `true` and `indeterminate` to false.

```html
<sbb-checkbox-panel value="indeterminate-checkbox-panel" indeterminate="true"
  >Indeterminate state</sbb-checkbox-panel
>
```

The component can be disabled by using the `disabled` property.

```html
<sbb-checkbox-panel value="disabled-checkbox" disabled="true">Disabled</sbb-checkbox-panel>
```

## Style

The component's label can be displayed in bold using the `sbb-text--bold` class on a wrapper tag:

```html
<sbb-checkbox-panel value="bold">
  <span class="sbb-text--bold">Bold label</span>
</sbb-checkbox-panel>
```

The component has two `size`, named `s` and `m` (default).
If the component is used within a group, the size is inherited from it;
since the `sbb-checkbox-group` has also `xs` size, this case will fall back to `s`.

```html
<sbb-checkbox-panel size="s"> Size </sbb-checkbox-panel>
```

## Events

Consumers can listen to the native `change` event on the `sbb-checkbox-panel` component to intercept the input's change;
the current state can be read from `event.target.checked`, while the value from `event.target.value`.

## Accessibility

The component provides the same accessibility features as the native checkbox.

Always provide an accessible label via `aria-label` for checkboxes without descriptive text content.
If you don't want the label to appear next to the checkbox, you can use `aria-label` to specify an appropriate label.

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute       | Privacy | Type                              | Default            | Description                                                    |
| --------------- | --------------- | ------- | --------------------------------- | ------------------ | -------------------------------------------------------------- |
| `borderless`    | `borderless`    | public  | `boolean`                         | `false`            | Whether the unselected panel has a border.                     |
| `checked`       | `checked`       | public  | `boolean`                         | `false`            | Whether the checkbox is checked.                               |
| `color`         | `color`         | public  | `'white' \| 'milk'`               | `'white'`          | The background color of the panel.                             |
| `disabled`      | `disabled`      | public  | `boolean`                         | `false`            | Whether the component is disabled.                             |
| `form`          | -               | public  | `HTMLFormElement \| null`         |                    | Returns the form owner of the internals of the target element. |
| `group`         | -               | public  | `SbbCheckboxGroupElement \| null` | `null`             | Reference to the connected checkbox group.                     |
| `indeterminate` | `indeterminate` | public  | `boolean`                         | `false`            | Whether the checkbox is indeterminate.                         |
| `name`          | `name`          | public  | `string`                          |                    | Name of the form element. Will be read from name attribute.    |
| `required`      | `required`      | public  | `boolean`                         | `false`            | Whether the component is required.                             |
| `size`          | `size`          | public  | `SbbPanelSize`                    | `'m' / 's' (lean)` | Size variant, either m or s.                                   |
| `type`          | -               | public  | `string`                          | `'checkbox'`       | Form type of element.                                          |
| `value`         | `value`         | public  | `string \| null`                  | `null`             | Value of the form element.                                     |

## Events

| Name     | Type         | Description            | Inherited From |
| -------- | ------------ | ---------------------- | -------------- |
| `change` | `Event`      | Event fired on change. |                |
| `input`  | `InputEvent` | Event fired on input.  |                |

## Slots

| Name      | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
|           | Use the unnamed slot to add content to the `sbb-checkbox`.                                      |
| `badge`   | Use this slot to provide a `sbb-card-badge` (optional).                                         |
| `subtext` | Slot used to render a subtext under the label (only visible within a selection panel).          |
| `suffix`  | Slot used to render additional content after the label (only visible within a selection panel). |
