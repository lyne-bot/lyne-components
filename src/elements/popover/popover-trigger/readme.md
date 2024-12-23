The `sbb-popover-trigger` component is used to trigger a [sbb-popover](/docs/elements-sbb-popover-sbb-popover--docs)
by pressing or hovering on it.

```html
<sbb-popover-trigger id="popover-trigger"></sbb-popover-trigger>

<sbb-popover trigger="popover-trigger">
  <sbb-title level="2" visual-level="6" style="margin-block-start: 0">Popover title.</sbb-title>
  <p>Popover content.</p>
</sbb-popover>
```

## Slots

By default, it renders the `sbb-icon` named `information-circle-small`;
it is possible to define a custom icon with the property `iconName`.
Moreover, it is possible to override the `sbb-icon` with custom content by slotting it.

```html
<sbb-popover-trigger id="popover-trigger" icon-name="pie-small"> </sbb-popover-trigger>

<sbb-popover trigger="popover-trigger">
  <sbb-title level="2" visual-level="6" style="margin-block-start: 0">Popover title.</sbb-title>
  <p>Popover content.</p>
</sbb-popover>

<sbb-popover-trigger id="popover-trigger2"> Custom Content </sbb-popover-trigger>

<sbb-popover trigger="popover-trigger2">
  <sbb-title level="2" visual-level="6" style="margin-block-start: 0">Popover title.</sbb-title>
  <p>Another popover content.</p>
</sbb-popover>
```

## State

It is possible to display the component in `disabled` state by using the self-named properties.

```html
<sbb-popover-trigger id="popover-trigger" disabled></sbb-popover-trigger>

<sbb-popover trigger="popover-trigger">
  <sbb-title level="2" visual-level="6" style="margin-block-start: 0">Popover title.</sbb-title>
  <p>Popover content.</p>
</sbb-popover>
```

## Accessibility

To make screen-readers announce the type of the trigger when is focused,
use the `aria-label` attribute, as shown below:

```html
<sbb-popover-trigger aria-label="Custom label" id="popover-trigger"></sbb-popover-trigger>
```

To make screen-readers announce the popover content when the trigger is focused,
associate the popover trigger with the popover via `aria-describedby` and an `id`.

```html
<sbb-popover-trigger aria-describedby="popover-content" id="popover-trigger"></sbb-popover-trigger>

<!-- Popover component -->
<sbb-popover id="popover" trigger="popover-trigger">
  <sbb-title level="2" visual-level="6" style="margin-block-start: 0">Popover title.</sbb-title>
  <p id="popover-content">Popover content. <sbb-link id="popover-link">Link</sbb-link></p>
</sbb-popover>
```

### Interactive disabled buttons

Native disabled elements cannot receive focus and do not dispatch any events. This can
be problematic in some cases because it can prevent the app from telling the user why the button is
disabled. Consumers can use the `disabledInteractive` property to style the button as disabled but allow for
it to receive focus and dispatch events. The button will have `aria-disabled="true"` for assistive
technology. It is the consumers responsibility to provide a reason for the element being disabled.
This can be achieved by adding an `aria-label`, `aria-labelledby` or `aria-describedby` attribute.

**Note:** Using the `disabledInteractive` property can result in buttons that previously prevented
actions to no longer do so, for example a submit button in a form. When using this input, you should
guard against such cases in your component.

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute              | Privacy | Type                      | Default    | Description                                                                                                                      |
| --------------------- | ---------------------- | ------- | ------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`            | `disabled`             | public  | `boolean`                 | `false`    | Whether the component is disabled.                                                                                               |
| `disabledInteractive` | `disabled-interactive` | public  | `boolean`                 | `false`    | Whether the button should be aria-disabled but stay interactive.                                                                 |
| `form`                | `form`                 | public  | `HTMLFormElement \| null` |            | The `<form>` element to associate the button with.                                                                               |
| `iconName`            | `icon-name`            | public  | `string`                  | `''`       | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `name`                | `name`                 | public  | `string`                  |            | Name of the form element. Will be read from name attribute.                                                                      |
| `negative`            | `negative`             | public  | `boolean`                 | `false`    | Negative coloring variant flag.                                                                                                  |
| `type`                | `type`                 | public  | `SbbButtonType`           | `'button'` | The type attribute to use for the button.                                                                                        |
| `value`               | `value`                | public  | `string \| null`          | `null`     | Value of the form element.                                                                                                       |

## Slots

| Name | Description                                                       |
| ---- | ----------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-popover-trigger`. |
