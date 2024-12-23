The `sbb-autocomplete-grid-button` component has the same appearance of a [sbb-mini-button](/docs/elements-sbb-button-sbb-mini-button--docs),
but it's only designed to be used within the [sbb-autocomplete-grid-cell](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-cell--docs)
inside a [sbb-autocomplete-grid](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid--docs).

```html
<sbb-form-field label="Label">
  <input />
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

## Slots

The component can display a `sbb-icon` using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>

<sbb-autocomplete-grid-button>
  <sbb-icon slot="icon" name="info"></sbb-icon>
</sbb-autocomplete-grid-button>
```

## Style

The component has a negative variant which can be set using the `negative` property.

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-autocomplete-grid-button icon-name="pen-small" negative></sbb-autocomplete-grid-button>

<sbb-autocomplete-grid-button icon-name="pen-small" disabled></sbb-autocomplete-grid-button>
```

If the component is used within a [sbb-autocomplete-grid-optgroup](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-optgroup--docs),
it can be disabled by disabling the optgroup.

## Interactions

When the button is clicked, an event is triggered; the behavior is up to the consumer.
It's possible to fetch the button's related `sbb-autocomplete-grid-option` using the `option` property.

```html
<sbb-form-field label="Label">
  <input />
  <sbb-autocomplete-grid>
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button
          id="button"
          icon-name="pen-small"
        ></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
    </sbb-autocomplete-grid-row>
  </sbb-autocomplete-grid>
</sbb-form-field>

<script>
  // get option
  const getOptionFromButton: () => SbbAutocompleteGridOptionElement = () => {
    return document.getElementById('button').option;
  }
  // get option from click event
  document.getElementById('button').addEventListener('click', (evt) => {
    const btn = evt.target as SbbAutocompleteGridButtonElement;
    console.log(`Button clicked on row ${btn.option.textContent} with value: '${btn.option.value}'`);
  });
</script>
```

## Accessibility

The `sbb-autocomplete-grid` follows the combobox `grid` pattern;
this means that the `sbb-autocomplete-grid-button` has a `button` role and its `id` is set based on the `sbb-autocomplete-grid-cell`'s `id`,
which is needed to correctly set the `aria-activedescendant` on the related `input`.
Moreover, the `sbb-autocomplete-grid-button` can't be focused via <kbd>Tab</kbd> due to the used pattern,
since the focus must always stay on the connected `<input>`.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type                                       | Default | Description                                                                                                                      |
| ---------- | ----------- | ------- | ------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `disabled`  | public  | `boolean`                                  | `false` | Whether the component is disabled.                                                                                               |
| `iconName` | `icon-name` | public  | `string`                                   | `''`    | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `negative` | `negative`  | public  | `boolean`                                  | `false` | Negative coloring variant flag.                                                                                                  |
| `option`   | -           | public  | `SbbAutocompleteGridOptionElement \| null` |         | Gets the SbbAutocompleteGridOptionElement on the same row of the button.                                                         |

## Slots

| Name   | Description                                  |
| ------ | -------------------------------------------- |
| `icon` | Slot used to display the icon, if one is set |
