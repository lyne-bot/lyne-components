The `sbb-skiplink-list` is a component that can be used to collect one or more hidden [sbb-block-link](/docs/elements-sbb-block-link--docs)s,
which become visible only when focused, e.g., using the `Tab` key.

When the component contains multiple link elements, only one of them is shown (the focused one), while the others stay visually hidden.

It has an optional `sbb-title` element, which is visually hidden too, but it's read from screen-readers,
and it can be set using the `title-content` property.

```html
<sbb-skiplink-list title-level="2" title-content="Title text">
  <sbb-block-link href="https://www.sbb.ch/">Content</sbb-block-link>
  <sbb-block-link href="https://www.sbb.ch/en/help-and-contact.html">Contact</sbb-block-link>
  ...
</sbb-skiplink-list>
```

<!-- Auto Generated Below -->

## Properties

| Name           | Attribute       | Privacy | Type            | Default | Description                                      |
| -------------- | --------------- | ------- | --------------- | ------- | ------------------------------------------------ |
| `titleContent` | `title-content` | public  | `string`        | `''`    | The title text we want to place before the list. |
| `titleLevel`   | `title-level`   | public  | `SbbTitleLevel` | `'2'`   | The semantic level of the title, e.g. 2 = h2.    |

## CSS Properties

| Name                          | Default                              | Description                                                                                                                                                                                                   |
| ----------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-skiplink-list-z-index` | `var(--sbb-overlay-default-z-index)` | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`. |

## Slots

| Name    | Description                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------- |
|         | Use the unnamed slot to add `sbb-block-link`/`sbb-block-link-button` elements to the `sbb-skiplink-list`. |
| `title` | Use this to provide a title for the skiplink-list (optional).                                             |
