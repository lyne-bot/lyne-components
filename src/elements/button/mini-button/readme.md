The `sbb-mini-button` component provides the same functionality as a native icon-only `<button>` enhanced with the SBB Design.
It's mainly designed to be used within the [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs)
in the `prefix` or `suffix` slot.

```html
<sbb-mini-button icon-name="pen-small"></sbb-mini-button>

<sbb-form-field>
  <input />
  <sbb-mini-button slot="prefix" icon-name="pen-small"></sbb-mini-button>
</sbb-form-field>
```

## Slots

The component can display a `sbb-icon` using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-mini-button icon-name="info" aria-label="Click for more information."></sbb-mini-button>

<sbb-mini-button aria-label="Click for more information.">
  <sbb-icon slot="icon" name="info"></sbb-icon>
</sbb-mini-button>
```

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

```html
<sbb-form-field>
  <label>Tickets</label>
  <input placeholder="Insert the number of tickets you want to purchase." />
  <sbb-mini-button
    slot="suffix"
    icon-name="coins-small"
    type="button"
    name="tickets"
    form="buy"
    value="tickets"
  ></sbb-mini-button>
</sbb-form-field>
```

## Style

The component has a negative variant which can be set using the `negative` property.

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-mini-button icon-name="pie-small" negative></sbb-mini-button>

<sbb-mini-button icon-name="pie-small" disabled></sbb-mini-button>
```

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the CSS var on `sbb-mini-button` or any parent element:

```css
sbb-mini-button {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## Accessibility

Use the accessibility properties to describe the purpose of the `sbb-mini-button` for screen-reader users.

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

| Name   | Description                                  |
| ------ | -------------------------------------------- |
| `icon` | Slot used to display the icon, if one is set |
