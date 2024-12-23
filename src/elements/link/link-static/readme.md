The `sbb-link-static` component mimics the look of the `<sbb-link>`,
and it's meant to be used whenever is required to nest one link inside another without breaking the HTML functionality.

## Slots

The text is provided via an unnamed slot.

```html
<sbb-link-static>Fake link</sbb-link-static>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-link-static disabled>Refunds</sbb-link-static>
```

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type          | Default             | Description                                                                                                                |
| ---------- | ---------- | ------- | ------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `disabled` | public  | `boolean`     | `false`             | Whether the component is disabled.                                                                                         |
| `negative` | `negative` | public  | `boolean`     | `false`             | Negative coloring variant flag.                                                                                            |
| `size`     | `size`     | public  | `SbbLinkSize` | `'s' / 'xs' (lean)` | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used. |

## Slots

| Name | Description                                                   |
| ---- | ------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-link-static`. |
