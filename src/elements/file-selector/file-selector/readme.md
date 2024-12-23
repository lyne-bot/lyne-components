The `sbb-file-selector` is a component which allows user to select one or more files from storage devices.
When files are selected, they appear as a list below the button.
For each file, the name and the size are displayed and an icon allows for deletion.
The component mimics the native `<input type="file"/>`; for the drag-and-drop variant, see
[sbb-file-selector-dropzone](/docs/elements-sbb-file-selector-sbb-file-selector-dropzone--docs)

```html
<sbb-file-selector></sbb-file-selector>
```

## Slots

The `error` named slot can be used to display an error message using the `sbb-form-error` component.

```html
<sbb-file-selector>
  <sbb-form-error slot="error">An error occurred during file upload.</sbb-form-error>
</sbb-file-selector>
```

## States

User interaction can be disabled using the `disabled` property.

```html
<sbb-file-selector disabled></sbb-file-selector>
```

### Multiple and multipleMode

A single file can be selected by default; this can be changed setting the `multiple` property to `true`.

```html
<sbb-file-selector multiple></sbb-file-selector>
```

The value of the `multipleMode` property determines whether added files should overwrite existing files (`default`) or be appended to them (`persistent`).

```html
<sbb-file-selector multiple multiple-mode="persistent"></sbb-file-selector>
```

### Accept

The `accept` property can be used to force the user to select one or more specific file types;
in the next example, only images are allowed.

```html
<sbb-file-selector accept=".png,.jpg,.jpeg"></sbb-file-selector>
```

## Style

The component has also two different sizes, `m` (default) and `s`, which can be changed using the `size` property.

```html
<sbb-file-selector size="s"></sbb-file-selector>
```

### Events

Whenever the selection changes, a `fileChanged` event is fired, whose `event.detail` property contains the list
of currently selected files. The list can also be retrieved using the public `files` getter.

## Accessibility

It's possible to improve the component accessibility using the `accessibilityLabel` property; this will be set
as `aria-label` of the inner native input and read together with the visible button text.
It's suggested to have a different value for each variant, e.g.:

```html
<sbb-file-selector accessibility-label="Select a file from hard disk"></sbb-file-selector>
<sbb-file-selector
  multiple
  accessibility-label="Select from hard disk - multiple selection allowed"
></sbb-file-selector>
```

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                        | Default            | Description                                                                   |
| -------------------- | --------------------- | ------- | --------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| `accept`             | `accept`              | public  | `string`                    | `''`               | A comma-separated list of allowed unique file type specifiers.                |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                    | `''`               | This will be forwarded as aria-label to the native input element.             |
| `disabled`           | `disabled`            | public  | `boolean`                   | `false`            | Whether the component is disabled.                                            |
| `files`              | -                     | public  | `Readonly<File>[]`          | `[]`               | The list of selected files.                                                   |
| `form`               | -                     | public  | `HTMLFormElement \| null`   |                    | Returns the form owner of the internals of the target element.                |
| `multiple`           | `multiple`            | public  | `boolean`                   | `false`            | Whether more than one file can be selected.                                   |
| `multipleMode`       | `multiple-mode`       | public  | `'default' \| 'persistent'` | `'default'`        | Whether the newly added files should override the previously added ones.      |
| `name`               | `name`                | public  | `string`                    |                    | Name of the form element. Will be read from name attribute.                   |
| `size`               | `size`                | public  | `'s' \| 'm'`                | `'m' / 's' (lean)` | Size variant, either s or m.                                                  |
| `type`               | -                     | public  | `string`                    | `'file'`           | Form type of element.                                                         |
| `value`              | `value`               | public  | `string \| null`            | `null`             | The path of the first selected file. Empty string ('') if no file is selected |

## Methods

| Name                       | Privacy | Description | Parameters                                                    | Return | Inherited From                    |
| -------------------------- | ------- | ----------- | ------------------------------------------------------------- | ------ | --------------------------------- |
| `formResetCallback`        | public  |             |                                                               | `void` | SbbFileSelectorCommonElementMixin |
| `formStateRestoreCallback` | public  |             | `state: FormRestoreState \| null, _reason: FormRestoreReason` | `void` | SbbFileSelectorCommonElementMixin |

## Events

| Name          | Type                            | Description                                                                                                                                                                  | Inherited From                    |
| ------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `change`      | `Event`                         | An event which is emitted each time the user modifies the value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value | SbbFileSelectorCommonElementMixin |
| `fileChanged` | `CustomEvent<Readonly<File>[]>` | An event which is emitted each time the file list changes.                                                                                                                   |                                   |
| `input`       | `Event`                         | An event which is emitted each time the value changes as a direct result of a user action.                                                                                   | SbbFileSelectorCommonElementMixin |

## Slots

| Name    | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| `error` | Use this to provide a `sbb-form-error` to show an error message. |
