The `sbb-toggle-option` component is used inside the 
[sbb-toggle](/docs/components-sbb-toggle-sbb-toggle--docs) in order to render the toggle's options. 

```html
<sbb-toggle-option value="Value">Option</sbb-toggle-option>
```

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
Text and icon are not exclusive and can be used together.

```html
<sbb-toggle-option value="Value" icon-name="app-icon-small"></sbb-toggle-option>

<sbb-toggle-option value="Value" icon-name="app-icon-small">Option</sbb-toggle-option>
```

## States

The component can be displayed in `checked` or `disabled` states using the self-named properties.

```html
<sbb-toggle-option value="Value" checked>Option</sbb-toggle-option>

<sbb-toggle-option value="Value" disabled>Option</sbb-toggle-option>
```

<!-- Auto Generated Below --> 
 

## Properties 

| Name       | Attribute   | Privacy | Type                  | Default | Description                            |
| ---------- | ----------- | ------- | --------------------- | ------- | -------------------------------------- |
| `checked`  | `checked`   | public  | `boolean`             |         | Whether the toggle-option is checked.  |
| `disabled` | `disabled`  | public  | `boolean`             |         | Whether the toggle option is disabled. |
| `iconName` | `icon-name` | public  | `string \| undefined` |         | Name of the icon for `\<sbb-icon>`.  |
| `value`    | `value`     | public  | `string \| null`      |         | Value of toggle-option.                |

## Slots

| Name   | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the label of the toggle option. |
| `icon` | Slot used to render the `\<sbb-icon>`.                               |

