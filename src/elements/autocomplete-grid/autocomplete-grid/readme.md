The `sbb-autocomplete-grid` is a component that can be used to display a panel of suggested options connected to a text input,
with each option connected to one or more buttons.
Use it when you need an autocomplete in which every selectable option in the panel needs one or more related button.
If you don't need actions, use the [sbb-autocomplete](/docs/elements-sbb-autocomplete---docs).

The component is strictly connected to:

- the [sbb-autocomplete-grid-row](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-row--docs), which is a wrapper for both option and buttons;
- the [sbb-autocomplete-grid-option](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-option--docs), which displays a selectable option within a panel;
- the [sbb-autocomplete-grid-cell](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-cell--docs), which is a wrapper a for button element;
- the [sbb-autocomplete-grid-button](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-button--docs), which displays a button within a row;
- the [sbb-autocomplete-grid-optgroup](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-optgroup--docs), which can be used to group more row within a group.

It's possible to set the element to which the component's panel will be attached using the `origin` prop,
and the input which will work as a trigger using the `trigger` prop.
Both accept an id or an element reference.

```html
<!-- Origin element -->
<div id="autocomplete-origin">Another origin</div>

<!-- Trigger element -->
<input id="autocomplete-txt" placeholder="Another trigger element" />

<sbb-autocomplete-grid origin="autocomplete-origin" trigger="autocomplete-txt">
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
</sbb-autocomplete-grid>
```

## In `sbb-form-field`

If the component is used within a [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs),
it will automatically connect to the native `<input>` as trigger and will display the option panel above or below the `sbb-form-field`.

```html
<!-- Origin element -->
<sbb-form-field label="Label">
  <!-- Trigger element -->
  <input placeholder="Trigger element" />

  <sbb-autocomplete-grid>
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
  </sbb-autocomplete-grid>
</sbb-form-field>
```

## Style

### Option highlight

By default, the `sbb-autocomplete-grid` will highlight the label of the `sbb-autocomplete-grid-option` in the panel,
if it matches the typed text.
See the [sbb-autocomplete-grid-option](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-option--docs) for more details.

### Option grouping

The displayed `sbb-autocomplete-grid-option` can be collected into groups using `sbb-autocomplete-grid-optgroup` element:

```html
<!-- Origin element -->
<sbb-form-field label="Label">
  <!-- Trigger element -->
  <input placeholder="Trigger element" />

  <sbb-autocomplete-grid>
    <sbb-autocomplete-grid-optgroup>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
      ...
    </sbb-autocomplete-grid-optgroup>
    <sbb-autocomplete-grid-optgroup>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value="100">Option 100</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
      ...
    </sbb-autocomplete-grid-optgroup>
  </sbb-autocomplete-grid>
</sbb-form-field>
```

### Size

The component has no `size` property but, when slotted in a `sbb-form-field`, it adapts to the parent `size`.

```html
<sbb-form-field size="s">
  <label>Label</label>
  <input placeholder="Trigger element" />
  <sbb-autocomplete-grid> ... </sbb-autocomplete-grid>
</sbb-form-field>
```

## Events

The `sbb-autocomplete-grid-option` emits the `optionSelected` event when selected via user interaction.

## Keyboard interaction

The options panel opens on `focus`, `click` or `input` events on the trigger element, or on `ArrowDown` keypress;
it can be closed on backdrop click, or using the `Escape` or `Tab` keys.

| Keyboard               | Action                                                  |
| ---------------------- | ------------------------------------------------------- |
| <kbd>Down Arrow</kbd>  | Navigate to the next option. Open the panel, if closed. |
| <kbd>Up Arrow</kbd>    | Navigate to the previous option.                        |
| <kbd>Right Arrow</kbd> | Navigate to the next button.                            |
| <kbd>Left Arrow</kbd>  | Navigate to the previous button.                        |
| <kbd>Enter</kbd>       | Select the active option/button.                        |
| <kbd>Escape</kbd>      | Close the autocomplete panel.                           |

## Accessibility

The `sbb-autocomplete-grid` implements the [ARIA combobox-grid interaction pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/grid-combo/).

The text input trigger specifies `role="combobox"` while the content of the pop-up applies `role="grid"`.
The inner option and actions have `role="gridcell"`, while the buttons inside the action have `role="button"`.
Note that since the focus must always be on the connected input, those buttons can't be reached via <kbd>Tab</kbd>,
but only with arrow navigation; note also that when a button is reached, going up or down will move to the previous/next option
and not to the previous/next button.

The component preserves focus on the input trigger,
using `aria-activedescendant` to support navigation though the autocomplete options.

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute             | Privacy | Type                                 | Default | Description                                                                                                                                                                                                                                                                                                       |
| ------------------- | --------------------- | ------- | ------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isOpen`            | -                     | public  | `boolean`                            |         | Whether the element is open.                                                                                                                                                                                                                                                                                      |
| `negative`          | `negative`            | public  | `boolean`                            | `false` | Negative coloring variant flag.                                                                                                                                                                                                                                                                                   |
| `origin`            | `origin`              | public  | `string \| HTMLElement \| null`      | `null`  | The element where the autocomplete will attach; accepts both an element's id or an HTMLElement. If not set, it will search for the first 'sbb-form-field' ancestor.                                                                                                                                               |
| `originElement`     | -                     | public  | `HTMLElement`                        |         | Returns the element where autocomplete overlay is attached to.                                                                                                                                                                                                                                                    |
| `preserveIconSpace` | `preserve-icon-space` | public  | `boolean`                            | `false` | Whether the icon space is preserved when no icon is set.                                                                                                                                                                                                                                                          |
| `trigger`           | `trigger`             | public  | `string \| HTMLInputElement \| null` | `null`  | The input element that will trigger the autocomplete opening; accepts both an element's id or an HTMLElement. By default, the autocomplete will open on focus, click, input or `ArrowDown` keypress of the 'trigger' element. If not set, will search for the first 'input' child of a 'sbb-form-field' ancestor. |
| `triggerElement`    | -                     | public  | `HTMLInputElement \| undefined`      |         | Returns the trigger element.                                                                                                                                                                                                                                                                                      |

## Methods

| Name    | Privacy | Description              | Parameters | Return | Inherited From          |
| ------- | ------- | ------------------------ | ---------- | ------ | ----------------------- |
| `close` | public  | Closes the autocomplete. |            | `void` | SbbOpenCloseBaseElement |
| `open`  | public  | Opens the autocomplete.  |            | `void` | SbbOpenCloseBaseElement |

## Events

| Name        | Type                | Description                                                                                | Inherited From          |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------ | ----------------------- |
| `didClose`  | `CustomEvent<void>` | Emits whenever the `sbb-autocomplete-grid` is closed.                                      | SbbOpenCloseBaseElement |
| `didOpen`   | `CustomEvent<void>` | Emits whenever the `sbb-autocomplete-grid` is opened.                                      | SbbOpenCloseBaseElement |
| `willClose` | `CustomEvent<void>` | Emits whenever the `sbb-autocomplete-grid` begins the closing transition. Can be canceled. | SbbOpenCloseBaseElement |
| `willOpen`  | `CustomEvent<void>` | Emits whenever the `sbb-autocomplete-grid` starts the opening transition. Can be canceled. | SbbOpenCloseBaseElement |

## CSS Properties

| Name                         | Default                              | Description                                                                                                                                                                                                   |
| ---------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-autocomplete-z-index` | `var(--sbb-overlay-default-z-index)` | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`. |

## Slots

| Name | Description                                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ |
|      | Use the unnamed slot to add `sbb-autocomplete-grid-row` or `sbb-autocomplete-grid-optgroup` elements to the `sbb-autocomplete-grid`. |
