The `sbb-optgroup` is a component used to group more [sbb-option](/docs/components-sbb-option-sbb-option--docs)
within a [sbb-autocomplete](/docs/components-sbb-autocomplete--docs)
or a [sbb-select](/docs/components-sbb-select--docs) component.

A [sbb-divider](/docs/components-sbb-divider--docs) is displayed at the bottom of the component.

## Slots

It is possible to provide a set of `sbb-option` via an unnamed slot;
the component has also a `label` property as name of the group.

```html
<sbb-optgroup label="Group">
  <sbb-option value="1" selected>1</sbb-option>
  <sbb-option value="2">2</sbb-option>
  <sbb-option value="3">3</sbb-option>
</sbb-optgroup>
```

## States

The component has a `disabled` property which sets all the `sbb-option` in the group as disabled.

```html
<sbb-optgroup label="Disabled group" disabled>
  <sbb-option value="A">A</sbb-option>
  <sbb-option value="B">B</sbb-option>
  <sbb-option value="C">C</sbb-option>
</sbb-optgroup>
```

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type      | Default | Description                    |
| ---------- | ---------- | ------- | --------- | ------- | ------------------------------ |
| `label`    | `label`    | public  | `string`  |         | Option group label.            |
| `disabled` | `disabled` | public  | `boolean` | `false` | Whether the group is disabled. |

## Slots

| Name | Description                                                         |
| ---- | ------------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-option` elements to this optgroup. |
