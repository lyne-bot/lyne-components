The `sbb-autocomplete` is a component that can be bonded to any text input (`trigger`) to display a panel of suggested options.  
The panel appears below/above the `origin` element. 

## Usage

If not explicitly set, the `sbb-autocomplete` will look for an `sbb-form-field` ancestor as `origin`.

Also, if not explicitly set, it will look for an `input` in `origin` to use as `trigger`.

```html
<!-- Origin element -->
<sbb-form-field label="Label">

  <!-- Trigger element -->
  <input placeholder="Trigger element" />

  <sbb-autocomplete>
    <sbb-option icon-name="clock-small" value="Option 1"> Option 1 </sbb-option>
    <sbb-option icon-name="clock-small" value="Option 2"> Option 2 </sbb-option>
    <sbb-divider />
    <sbb-option icon-name="clock-small" value="Option 3"> Option 3 </sbb-option>
  </sbb-autocomplete>
</sbb-form-field>
```
Or, you can specify a different `origin` and `trigger`

```html
<!-- Origin element -->
<div id="autocomplete-origin">Another origin</div>

<!-- Trigger element -->
<input id="autocomplete-txt" placeholder="Another trigger element" />

<sbb-autocomplete origin="#autocomplete-origin" trigger="#autocomplete-txt">
  ...
</sbb-autocomplete>
```

## Keyboard interaction
| Keyboard shortcut                      | Action                                                         |
|----------------------------------------|----------------------------------------------------------------|
| <kbd>Down Arrow</kbd>                  | Navigate to the next option. Open the panel, if closed.        |
| <kbd>Up Arrow</kbd>                    | Navigate to the previous option.                               |
| <kbd>Enter</kbd>                       | Select the active option.                                      |
| <kbd>Escape</kbd>                      | Close the autocomplete panel.                                  |

## Accessibility
`sbb-autocomplete` implements the ARIA combobox interaction pattern. The text input trigger specifies `role="combobox"` while the content of the pop-up applies `role="listbox"`. Because of this listbox pattern, you should not put other interactive controls, such as buttons or checkboxes, inside an autocomplete option. Nesting interactive controls like this interferes with most assistive technology.

`sbb-autocomplete` preserves focus on the text trigger, using aria-activedescendant to support navigation though the autocomplete options.

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                                                                                                                                        | Type                         | Default     |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | ----------- |
| `disableAnimation` | `disable-animation` | Whether the animation is enabled.                                                                                                                                                                                                                                  | `boolean`                    | `false`     |
| `origin`           | `origin`            | The element where the autocomplete will attach. Accepts both a string (id of an element) or an HTML element.  If not setted, will search for the first 'sbb-form-field' ancestor                                                                                   | `HTMLElement \| string`      | `undefined` |
| `trigger`          | `trigger`           | The element that will trigger the autocomplete opening. Accepts both a string (id of an element) or an HTML element. By default, the autocomplete will open on focus of the 'trigger' element.  If not setted, will search for the first 'input' child of 'origin' | `HTMLInputElement \| string` | `undefined` |


## Events

| Event        | Description                                            | Type                |
| ------------ | ------------------------------------------------------ | ------------------- |
| `did-close`  | Emits whenever the menu is closed.                     | `CustomEvent<void>` |
| `did-open`   | Emits whenever the menu is opened.                     | `CustomEvent<void>` |
| `will-close` | Emits whenever the menu begins the closing transition. | `CustomEvent<void>` |
| `will-open`  | Emits whenever the menu starts the opening transition. | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Closes the autocomplete.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the autocomplete.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                  |
| ----------- | ---------------------------- |
| `"unnamed"` | Use this slot to project options. |


----------------------------------------------


