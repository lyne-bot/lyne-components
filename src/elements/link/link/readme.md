The `sbb-link` component provides the same functionality as a native `<a>` enhanced with the SBB Design.

## Slots

The text is provided via an unnamed slot.

```html
<sbb-link value="help"> Help </sbb-link>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-link href="https://www.sbb.ch" disabled>Refunds</sbb-link>
```

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

```html
<sbb-link href="https://github.com/sbb-design-systems/lyne-components" target="_blank">
  Travel-cards and tickets
</sbb-link>
```

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                       | Default             | Description                                                                                                                |
| -------------------- | --------------------- | ------- | -------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                   | `''`                | This will be forwarded as aria-label to the inner anchor element.                                                          |
| `disabled`           | `disabled`            | public  | `boolean`                  | `false`             | Whether the component is disabled.                                                                                         |
| `download`           | `download`            | public  | `boolean`                  | `false`             | Whether the browser will show the download dialog on click.                                                                |
| `href`               | `href`                | public  | `string`                   | `''`                | The href value you want to link to.                                                                                        |
| `negative`           | `negative`            | public  | `boolean`                  | `false`             | Negative coloring variant flag.                                                                                            |
| `rel`                | `rel`                 | public  | `string`                   | `''`                | The relationship of the linked URL as space-separated link types.                                                          |
| `size`               | `size`                | public  | `SbbLinkSize`              | `'s' / 'xs' (lean)` | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used. |
| `target`             | `target`              | public  | `LinkTargetType \| string` | `''`                | Where to display the linked URL.                                                                                           |

## Slots

| Name | Description                                            |
| ---- | ------------------------------------------------------ |
|      | Use the unnamed slot to add content to the `sbb-link`. |
