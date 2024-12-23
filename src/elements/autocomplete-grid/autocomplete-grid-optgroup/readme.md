The `sbb-autocomplete-grid-optgroup` is a component used to group more [sbb-autocomplete-grid-option](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-option--docs)
within a [sbb-autocomplete-grid](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid--docs).

A [sbb-divider](/docs/elements-sbb-divider--docs) is displayed at the bottom of the component.

```html
<sbb-form-field label="Label">
  <input />
  <sbb-autocomplete-grid>
    <sbb-autocomplete-grid-optgroup>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value="2">Option 2</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button icon-name="trash-small"></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
    </sbb-autocomplete-grid-optgroup>
  </sbb-autocomplete-grid>
</sbb-form-field>
```

## Slots

It is possible to provide a set of `sbb-autocomplete-grid-option` via an unnamed slot;
the component has also a `label` property as name of the group.

```html
<sbb-autocomplete-grid-optgroup label="Group">
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option value="1" selected>1</sbb-autocomplete-grid-option>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option value="2">2</sbb-autocomplete-grid-option>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option value="3">3</sbb-autocomplete-grid-option>
  </sbb-autocomplete-grid-row>
</sbb-autocomplete-grid-optgroup>
```

## States

The component has a `disabled` property which sets all the `sbb-autocomplete-grid-option` in the group as disabled.

```html
<sbb-autocomplete-grid-optgroup label="Disabled group" disabled>
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option value="A">A</sbb-autocomplete-grid-option>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option value="B">B</sbb-autocomplete-grid-option>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option value="C">C</sbb-autocomplete-grid-option>
  </sbb-autocomplete-grid-row>
</sbb-autocomplete-grid-optgroup>
```

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type      | Default | Description                        |
| ---------- | ---------- | ------- | --------- | ------- | ---------------------------------- |
| `disabled` | `disabled` | public  | `boolean` | `false` | Whether the component is disabled. |
| `label`    | `label`    | public  | `string`  | `''`    | Option group label.                |

## Slots

| Name | Description                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------ |
|      | Use the unnamed slot to add `sbb-autocomplete-grid-option` elements to the `sbb-autocomplete-grid-optgroup`. |
