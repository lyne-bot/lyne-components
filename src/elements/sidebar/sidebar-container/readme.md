The `sbb-sidebar-container` is a component that holds together the `sbb-sidebar-content`
and one or two `sbb-sidebar` elements. The container is responsible for orchestrating opening and closing of the sidebars
depending on available space.

Inside the `sbb-sidebar-content` another `sbb-sidebar-container` can be placed
to achieve multiple nested icon sidebars.

```html
<sbb-sidebar-container>
  <sbb-sidebar role="navigation">
    <sbb-sidebar-title>Start</sbb-sidebar-title>
    <sbb-sidebar-close-button></sbb-sidebar-close-button>
    Sidebar content
  </sbb-sidebar>
  <sbb-sidebar-content role="main">Content</sbb-sidebar-content>
  <sbb-sidebar position="end" role="navigation">
    <sbb-sidebar-title>End</sbb-sidebar-title>
    <sbb-sidebar-close-button></sbb-sidebar-close-button>
    Sidebar content
  </sbb-sidebar>
</sbb-sidebar-container>
```

## Style

If the `sbb-sidebar-container` is placed after the `sbb-header`, an automatic `margin-block-start` is added.
In other contexts you may need to set the margin manually, e.g. `margin-block-start: var(--sbb-header-height);`.

## Use with `sbb-header`

In order to correctly display the shadow of the header when scrolled,
you need to set the `scrollOrigin` property of the `<sbb-header>`.
The value should be either the id of the `<sbb-sidebar-content>`
or the element reference itself. Note that when using nested sidebars, it's required to
continuously update the `scrollOrigin` property with the id/reference of the
currently active `<sbb-sidebar-content>`. Also, depending
on how e.g. a RouterOutlet (Angular) is used, it may also be necessary to update the `scrollOrigin`
property when the navigation changes.

```html
<sbb-header scroll-origin="content">...</sbb-header>
<sbb-sidebar-container>
  <sbb-sidebar role="navigation">...</sbb-sidebar>
  <sbb-sidebar-content id="content" role="main">Content</sbb-sidebar-content>
</sbb-sidebar-container>
```

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute | Privacy | Type                        | Default | Description                                  |
| ---------- | --------- | ------- | --------------------------- | ------- | -------------------------------------------- |
| `end`      | -         | public  | `SbbSidebarElement \| null` |         | The sidebar child with the `end` position.   |
| `sidebars` | -         | public  | `SbbSidebarElement[]`       |         | The sidebar children.                        |
| `start`    | -         | public  | `SbbSidebarElement \| null` |         | The sidebar child with the `start` position. |

## Slots

| Name | Description                                                                   |
| ---- | ----------------------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements. |
