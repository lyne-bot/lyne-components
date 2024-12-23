The `sbb-form-field-clear` component can be used with the [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs) component
to provide the possibility to display a clear button which can clear the input value.

```html
<sbb-form-field>
  <label>Label</label>
  <input type="text" placeholder="Input placeholder" value="Input value" />
  <sbb-form-field-clear></sbb-form-field-clear>
</sbb-form-field>
```

**Note:** it currently works with simple inputs and does not support, for example, `select` inputs.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type                      | Default    | Description                                                 |
| ---------- | ---------- | ------- | ------------------------- | ---------- | ----------------------------------------------------------- |
| `form`     | `form`     | public  | `HTMLFormElement \| null` |            | The `<form>` element to associate the button with.          |
| `name`     | `name`     | public  | `string`                  |            | Name of the form element. Will be read from name attribute. |
| `negative` | `negative` | public  | `boolean`                 | `false`    | Negative coloring variant flag.                             |
| `type`     | `type`     | public  | `SbbButtonType`           | `'button'` | The type attribute to use for the button.                   |
| `value`    | `value`    | public  | `string \| null`          | `null`     | Value of the form element.                                  |
