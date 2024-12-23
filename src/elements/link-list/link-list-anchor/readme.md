The `sbb-link-list-anchor` is a component that can be used to collect and display [sbb-block-link](/docs/elements-sbb-link-sbb-block-link--docs).
It is mainly intended to be used as a link list for page anchors.

```html
<sbb-link-list-anchor>
  <sbb-block-link href="#refunds">Refunds</sbb-block-link>
  <sbb-block-link href="#loss-report">Loss Report</sbb-block-link>
  ...
</sbb-link-list-anchor>
```

## Slots

The component can display an optional title,
which is visually shown as a level-5 [sbb-title](/docs/elements-sbb-title--docs)
and is used as the `aria-labelledby` attribute of the `ul` element.

The title can be set using the `titleContent` property or, alternatively, can be projected using the `title` slot.

```html
<sbb-link-list-anchor title-content="Help & Contact"> ... </sbb-link-list-anchor>
```

## Style

The component will accept only `sbb-block-link` or `sbb-block-link-button` instances,
and it will sync its `size` and `negative` property with the inner links.

```html
<sbb-link-list-anchor size="xs" negative>
  <sbb-block-link href="#refunds">Refunds</sbb-block-link>
  <sbb-block-link href="#loss-report">Loss Report</sbb-block-link>
  ...
</sbb-link-list-anchor>
```

<!-- Auto Generated Below -->

## Properties

| Name           | Attribute       | Privacy | Type            | Default             | Description                                                                                                                  |
| -------------- | --------------- | ------- | --------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `negative`     | `negative`      | public  | `boolean`       | `false`             | Negative coloring variant flag.                                                                                              |
| `size`         | `size`          | public  | `SbbLinkSize`   | `'s' / 'xs' (lean)` | Text size of the nested sbb-block-link instances. This will overwrite the size attribute of nested sbb-block-link instances. |
| `titleContent` | `title-content` | public  | `string`        | `''`                | The title text we want to show before the list.                                                                              |
| `titleLevel`   | `title-level`   | public  | `SbbTitleLevel` | `'2'`               | The semantic level of the title, e.g. 2 = h2.                                                                                |

## Slots

| Name    | Description                                               |
| ------- | --------------------------------------------------------- |
|         | Use the unnamed slot to add one or more `sbb-block-link`. |
| `title` | Use this slot to provide a title.                         |
