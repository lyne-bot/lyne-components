The sbb-sidebar-content is a container which should be used inside a `sbb-sidebar-container` to wrap the content.

```html
<sbb-sidebar-container>
  <sbb-sidebar role="navigation">Sidebar Content</sbb-sidebar>
  <sbb-sidebar-content role="main"></sbb-sidebar-content>
</sbb-sidebar-container>
```

## Accessibility

The `<sbb-sidebar-content>` should be given a role based on what it contains. If it
represents the primary content of the page, it may make sense to mark it `role="main"`. If no more
specific role makes sense, `role="region"` is a good fallback.

## Use with `sbb-header`

Check [sbb-sidebar-container](/docs/elements-sbb-sidebar-sbb-sidebar-container--docs) on how to
position and connect the `sbb-header` with the `sbb-sidebar-content`.

<!-- Auto Generated Below -->

## Slots

| Name | Description                                                                                      |
| ---- | ------------------------------------------------------------------------------------------------ |
|      | Use the unnamed slot to add any content elements. Further `sbb-sidebar-container`s are possible. |
