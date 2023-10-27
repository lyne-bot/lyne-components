The `sbb-tag-group` component is used as a container for one or multiple `sbb-tag` components,
which are projected inside the unnamed slot.

To work properly, it's mandatory to provide a value to each `sbb-tag`. 
See [its documentation]((/docs/components-sbb-tag-sbb-tag--docs)) for more details.

```html
<sbb-tag-group>
  <sbb-tag value="all">All</sbb-tag>
  <sbb-tag value="phones">Phones</sbb-tag>
  <sbb-tag value="computer">Computer</sbb-tag>
  <sbb-tag value="laptop">Laptop</sbb-tag>
</sbb-tag-group>
```

## Interactions

### Exclusive selection vs. multiple selection

By default, `sbb-tag-group` acts like a radio-button group: only one item can be selected. 
In this mode, the value of the `sbb-tag-group` will reflect the value of the selected `sbb-tag`.

Setting `multiple` property to `true` allows multiple items to be selected (checkbox behavior).
In this mode the value of the `sbb-tag-group` is an array containing all values of the selected `sbb-tag` items.

```html
<sbb-tag-group multiple>
  <sbb-tag value="all">All</sbb-tag>
  <sbb-tag value="phones" checked>Phones</sbb-tag>
  <sbb-tag value="computer" checked>Computer</sbb-tag>
  <sbb-tag value="laptop">Laptop</sbb-tag>
</sbb-tag-group>
```

### Changing multiple property during run time

There is no support for changing multiple mode during run time (e.g., update value automatically).
So this flag should be provided at component's instantiation time.

### Advanced usage: multiple and exclusive mixed

```ts
const uncheckAllTag = () => {
  document.getElementById('all').removeAttribute('checked');
};

const uncheckTags = () => {
  Array.from(document.querySelectorAll('sbb-tag'))
    .filter((e) => e.getAttribute('id') !== 'all' && !e.getAttribute('disabled'))
    .forEach((e) => e.removeAttribute('checked'));
};

```

```html
<sbb-tag-group aria-label="Select your desired device to filter it" multiple>
  <sbb-tag id="all" onChange={() => uncheckTags()} value="All" checked>
    All
  </sbb-tag>
  <sbb-tag value="phones" onChange={() => uncheckAllTag()}>Phones</sbb-tag>
  <sbb-tag value="computer" onChange={() => uncheckAllTag()}>Computer</sbb-tag>
  <sbb-tag value="laptop" onChange={() => uncheckAllTag()}>Laptop</sbb-tag>
</sbb-tag-group>
```

## Accessibility

The property `listAccessibilityLabel` is forwarded as `aria-label` to the inner list that the component uses to display the tags,
to use the implicit `role="list"` of the `ul`.

If the `listAccessibilityLabel` property is not defined, the `sbb-tag-group` surrounding the buttons applies `role="group"` 
to convey the association between the individual `sbb-tag`s. 

When using the `role="group"`, each `sbb-tag-group` element should be given a label with `aria-label` or `aria-labelledby`,
that communicates the collective meaning of all `sbb-tag`s.

```html
<sbb-tag-group aria-label="Select your desired font styles to filter it">
  <sbb-tag value="all" checked>All</sbb-tag>
  <sbb-tag value="phones" >Bold</sbb-tag>
  <sbb-tag value="computer">Italic</sbb-tag>
  <sbb-tag value="laptop">Underline</sbb-tag>
</sbb-tag-group>
```

<!-- Auto Generated Below --> 
 

## Properties 

| Name                     | Attribute                     | Privacy | Type                         | Default | Description                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------ | ------- | ---------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `listAccessibilityLabel` | `list-accessibility-label` | public  | `string \| undefined`        |         |                |
| `multiple`               | `multiple`               | public  | `boolean`                    | `false` | If set multiple to false, the selection is exclusive and the value is a string (or null).&#xA;If set multiple to true, the selection can have multiple values and therefore value is an array.&#xA;&#xA;Changing multiple during run time is not supported. |
| `value`                  | `value`                  | public  | `string \| string[] \| null` | Value of the sbb-tag-group.&#xA;If set multiple to false, the value is a string (or null).&#xA;If set multiple to true, the value is an array.                                                                                                              |                |

## Slots

| Name      | Description                                        |
| --------- | -------------------------------------------------- |
| `unnamed` | Provide one or more 'sbb-tag' to add to the group. |

