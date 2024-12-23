The `sbb-navigation-list` component is a collection of [sbb-navigation-button](/docs/elements-sbb-navigation-sbb-navigation-button--docs)
and [sbb-navigation-link](/docs/elements-sbb-navigation-sbb-navigation-link--docs).
Its intended use is inside a [sbb-navigation-section](/docs/elements-sbb-navigation-sbb-navigation-section--docs) component.
Optionally, a label can be provided via slot via the self-named property or the self-named slot.

```html
<sbb-navigation-list label="Label 1.1">
  <sbb-navigation-link href="...">Label 1.1.1</sbb-navigation-link>
  <sbb-navigation-link href="...">Label 1.1.2</sbb-navigation-link>
  <sbb-navigation-button>Label 1.1.3</sbb-navigation-link>
</sbb-navigation-list>
```

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type     | Default | Description                                   |
| ------- | --------- | ------- | -------- | ------- | --------------------------------------------- |
| `label` | `label`   | public  | `string` | `''`    | The label to be shown before the action list. |

## Slots

| Name    | Description                                                       |
| ------- | ----------------------------------------------------------------- |
|         | Use the unnamed slot to add content to the `sbb-navigation-list`. |
| `label` | Use this to provide a label element.                              |
