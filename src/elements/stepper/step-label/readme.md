Use the `sbb-step-label` with the `sbb-stepper` to display a step label.

```html
<sbb-step-label>Step label</sbb-step-label>
```

## Slots

It has an implicit slot named `step-label`.

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-step-label disabled>Step label</sbb-step-label>
```

## Style

If it is used in an `sbb-stepper` and no `icon-name` is specified, it displays a counter in the label prefix to keep track of the step number.

```html
<!-- Displays a tick icon in the prefix circle -->
<sbb-step-label icon-name="tick-small">Step label</sbb-step-label>

<!-- Displays a number in the prefix circle -->
<sbb-step-label>Step label</sbb-step-label>
```

## Accessibility

The accessibility properties `aria-controls`, `aria-setsize`, `aria-posinset` are set automatically.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type                      | Default    | Description                                                                                                                      |
| ---------- | ----------- | ------- | ------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `disabled`  | public  | `boolean`                 | `false`    | Whether the component is disabled.                                                                                               |
| `form`     | `form`      | public  | `HTMLFormElement \| null` |            | The `<form>` element to associate the button with.                                                                               |
| `iconName` | `icon-name` | public  | `string`                  | `''`       | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `name`     | `name`      | public  | `string`                  |            | Name of the form element. Will be read from name attribute.                                                                      |
| `step`     | -           | public  | `SbbStepElement \| null`  | `null`     | The step controlled by the label.                                                                                                |
| `type`     | `type`      | public  | `SbbButtonType`           | `'button'` | The type attribute to use for the button.                                                                                        |
| `value`    | `value`     | public  | `string \| null`          | `null`     | Value of the form element.                                                                                                       |

## Slots

| Name   | Description                                      |
| ------ | ------------------------------------------------ |
|        | Use the unnamed slot to provide a label.         |
| `icon` | Use this to display an icon in the label bubble. |
