The `sbb-icon-sidebar-container` is a component that holds together the `sbb-icon-sidebar-content`
and one or two `sbb-icon-sidebar` elements.

Inside the `sbb-icon-sidebar-content` another `sbb-icon-sidebar-container` can be placed
to achieve multiple nested icon sidebars.

```html
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar>
    <sbb-icon-sidebar-link
      accessibility-label="Go to the party"
      icon-name="glass-cocktail-small"
      href="#"
    ></sbb-icon-sidebar-link>
  </sbb-icon-sidebar>
  <sbb-icon-sidebar-content role="main">Content</sbb-sidebar-content>
</sbb-icon-sidebar-container>
```

## Style

If the `sbb-sidebar-container` is placed after the `sbb-header`, an automatic `margin-block-start` is added.
In other contexts you may need to set the margin manually, e.g. `margin-block-start: var(--sbb-header-height);`.

## Use with `sbb-header`

In order to correctly display the shadow of the header when scrolled,
you need to set the `scrollOrigin` property of the `<sbb-header>`.
The value should be either the id of the `<sbb-sidebar-content>` / `<sbb-icon-sidebar-content>`
or the element reference itself. Note that when using nested sidebars, it's required to
continuously update the `scrollOrigin` property with the id/reference of the
currently active `<sbb-sidebar-content>` / `<sbb-icon-sidebar-content>`. Also, depending
on how e.g. a RouterOutlet (Angular) is used, it may also be necessary to update the `scrollOrigin`
property when the navigation changes.

```html
<sbb-header scroll-origin="content">...</sbb-header>
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar>...</sbb-icon-sidebar>
  <sbb-icon-sidebar-content id="content" role="main">Content</sbb-sidebar-content>
</sbb-icon-sidebar-container>
```

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute | Privacy | Type                            | Default | Description                                   |
| ---------- | --------- | ------- | ------------------------------- | ------- | --------------------------------------------- |
| `end`      | -         | public  | `SbbIconSidebarElement \| null` |         | The icon-sidebar child at the end position.   |
| `sidebars` | -         | public  | `SbbIconSidebarElement[]`       |         | The icon-sidebar children.                    |
| `start`    | -         | public  | `SbbIconSidebarElement \| null` |         | The icon-sidebar child at the start position. |

## Slots

| Name | Description                                                                   |
| ---- | ----------------------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements. |
