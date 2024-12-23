The `sbb-option` is a component which can be used to display items in components like
[sbb-autocomplete](/docs/elements-sbb-autocomplete--docs) or a [sbb-select](/docs/elements-sbb-select--docs).

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-option>Option label</sbb-option>

<sbb-option icon-name="info">Option label</sbb-option>
```

## States

Like the native `option`, the component has a `value` property.

The `selected` and `disabled` properties are connected to the self-named states.
When disabled, the selection via click is prevented.
If the `sbb-option` is nested in a `sbb-optgroup` component, it inherits from the parent the `disabled` state.

```html
<sbb-option value="value" selected>Option label</sbb-option>

<sbb-option value="value" disabled>Option label</sbb-option>
```

## Events

Consumers can listen to the `optionSelected` event on the `sbb-option` component to intercept the selected value;
the event is triggered if the element has been selected by some user interaction. Alternatively,
the `selectionChange` event can be listened to, which is triggered if the element has been both selected or deselected.

## Style

If the label slot contains only a **text node**, it is possible to search for text in the `sbb-option` using the
`highlight` method, passing the desired text; if the text is present it will be highlighted in bold.

```html
<!-- Supported scenario -->
<sbb-option> Highlightable caption</sbb-option>

<!-- Not supported scenarios -->
<sbb-option>
  <span>Not highlightable caption</span>
</sbb-option>

<sbb-option>
  <img src="..." />
  Highlightable caption
</sbb-option>
```

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type      | Default | Description                                                                                                                      |
| ---------- | ----------- | ------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `disabled`  | public  | `boolean` | `false` | Whether the component is disabled.                                                                                               |
| `iconName` | `icon-name` | public  | `string`  | `''`    | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `selected` | `selected`  | public  | `boolean` |         | Whether the option is selected.                                                                                                  |
| `value`    | `value`     | public  | `string`  |         | Value of the option.                                                                                                             |

## Events

| Name                    | Type                | Description                                     | Inherited From |
| ----------------------- | ------------------- | ----------------------------------------------- | -------------- |
| `optionSelected`        | `CustomEvent<void>` | Emits when an option was selected by user.      |                |
| `optionSelectionChange` | `CustomEvent<void>` | Emits when the option selection status changes. |                |

## CSS Properties

| Name                                  | Default | Description                                                                                                   |
| ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `--sbb-option-icon-container-display` | `none`  | Can be used to reserve space even when preserve-icon-space on autocomplete is not set or iconName is not set. |

## Slots

| Name   | Description                                                                       |
| ------ | --------------------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the option label.                          |
| `icon` | Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used. |
