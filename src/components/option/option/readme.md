The `sbb-option` is a component which can be used to display items in components like
[sbb-autocomplete](/docs/components-sbb-autocomplete--docs) or a [sbb-select](/docs/components-sbb-select--docs).

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
Icon space can be reserved even if the `iconName` property is not set by overriding the `--sbb-option-icon-container-display` variable.

```html
<sbb-option>Option label</sbb-option>

<sbb-option icon-name="info">Option label</sbb-option>
```

## States

Like the native `option`, the component has a `value` property.

The `selected`, `disabled` and `active` properties are connected to the self-named states.
When disabled, the selection via click is prevented.
If the `sbb-option` is nested in a `sbb-optgroup` component, it inherits from the parent the `disabled` state.

```html
<sbb-option value="value" selected>Option label</sbb-option>

<sbb-option value="value" active>Option label</sbb-option>

<sbb-option value="value" ß disabled>Option label</sbb-option>
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

| Name       | Attribute   | Privacy | Type                   | Default | Description                                                                                                                      |
| ---------- | ----------- | ------- | ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `value`    | `value`     | public  | `string \| undefined`  |         | Value of the option.                                                                                                             |
| `iconName` | `icon-name` | public  | `string \| undefined`  |         | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `active`   | `active`    | public  | `boolean \| undefined` |         | Whether the option is currently active.                                                                                          |
| `selected` | `selected`  | public  | `boolean`              | `false` | Whether the option is selected.                                                                                                  |
| `disabled` | `disabled`  | public  | `boolean \| undefined` |         | Whether the option is disabled.                                                                                                  |

## Methods

| Name            | Privacy | Description                                | Parameters      | Return | Inherited From |
| --------------- | ------- | ------------------------------------------ | --------------- | ------ | -------------- |
| `setGroupLabel` | public  | Set the option group label (used for a11y) | `value: string` | `void` |                |

## Events

| Name                      | Type                | Description                                     | Inherited From |
| ------------------------- | ------------------- | ----------------------------------------------- | -------------- |
| `option-selection-change` | `CustomEvent<void>` | Emits when the option selection status changes. |                |
| `option-selected`         | `CustomEvent<void>` | Emits when an option was selected by user.      |                |

## Slots

| Name   | Description                                                                       |
| ------ | --------------------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the option label.                          |
| `icon` | Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used. |
