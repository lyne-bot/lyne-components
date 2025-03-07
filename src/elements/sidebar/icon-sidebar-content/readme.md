The sbb-icon-sidebar-content is a container which should be used inside a `sbb-icon-sidebar-container` to wrap the content.

```html
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar>Sidebar Content</sbb-icon-sidebar>
  <sbb-icon-sidebar-content role="main">Content</sbb-icon-sidebar-content>
</sbb-icon-sidebar-container>
```

## Accessibility

The `<sbb-icon-sidebar-content>` should be given a role based on what it contains. If it
represents the primary content of the page, it may make sense to mark it `role="main"`. If no more
specific role makes sense, `role="region"` is a good fallback.

## Use with `sbb-header`

Check [sbb-icon-sidebar-container](/docs/elements-sbb-sidebar-sbb-icon-sidebar-container--docs) on how to
position and connect the `sbb-header` with the `sbb-icon-sidebar-content`.

<!-- Auto Generated Below -->

## Slots

| Name | Description                                       |
| ---- | ------------------------------------------------- |
|      | Use the unnamed slot to add any content elements. |
