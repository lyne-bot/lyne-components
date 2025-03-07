The `sbb-sidebar-title` component extends the [sbb-title](/docs/elements-sbb-title--docs) component.
Use it in inside the [sbb-sidebar](/docs/elements-sbb-sidebar-sbb-sidebar--docs)
to display a header in the sidebar with a title.

```html
<sbb-sidebar role="navigation">
  <sbb-sidebar-title>A describing title of the sidebar</sbb-sidebar-title>
</sbb-sidebar>
```

<!-- Auto Generated Below -->

## Properties

| Name             | Attribute         | Privacy | Type                    | Default | Description                                                                                                                                                                                     |
| ---------------- | ----------------- | ------- | ----------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `level`          | `level`           | public  | `SbbTitleLevel`         | `'2'`   | Title level                                                                                                                                                                                     |
| `visualLevel`    | `visual-level`    | public  | `SbbTitleLevel \| null` | `'5'`   | Visual level for the title. Optional, if not set, the value of level will be used.                                                                                                              |
| `visuallyHidden` | `visually-hidden` | public  | `boolean`               | `false` | Sometimes we need a title in the markup to present a proper hierarchy to the screen readers while we do not want to let that title appear visually. In this case we set visuallyHidden to true. |

## Slots

| Name | Description                                             |
| ---- | ------------------------------------------------------- |
|      | Use the unnamed slot to place the content of the title. |
