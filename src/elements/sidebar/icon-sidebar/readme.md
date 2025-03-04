The `<sbb-icon-sidebar>` is a component that can display action items with an icon on the left or right side of the viewport.

The icon sidebar components are designed to add side content to a fullscreen app.
To set up an icon sidebar we use three components: `<sbb-icon-sidebar-container>` which acts as a structural container for
our content and sidebar, `<sbb-icon-sidebar-content>` which represents the main content,
and `<sbb-icon-sidebar>` which represents the added side content.

```html
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar>
    <sbb-icon-sidebar-link
      accessibility-label="Go to the party"
      icon-name="glass-cocktail-small"
      href="#"
    ></sbb-icon-sidebar-link>
    <sbb-icon-sidebar-link
      accessibility-label="Be a unicorn"
      icon-name="unicorn-small"
      href="#"
      class="sbb-active"
      accessibility-current="page"
    ></sbb-icon-sidebar-link>
  </sbb-icon-sidebar>
  <sbb-icon-sidebar-content role="main">
    <p style="padding: var(--sbb-spacing-fixed-4x); margin: 0">
      In the enchanting world of fantasy, unicorns are legendary creatures known for their grace,
      purity, and magical abilities. These mystical beings have inspired countless tales of bravery
      and wonder. Here, we delve into some captivating unicorn success stories that continue to
      enchant and inspire, each with a touch of public transport magic.
    </p>
  </sbb-icon-sidebar-content>
</sbb-icon-sidebar-container>
```

## Color

Per default, the `<sbb-icon-sidebar>` receives a white background color. As alternative,
it's possible to set the color property to `milk`.
If using the `<sbb-icon-sidebar>` along with a `<sbb-sidebar>`, it's recommended to alternate
the background colors (`white` / `milk`) for a clear visual distinction.

```html
<sbb-icon-sidebar color="milk"></sbb-icon-sidebar>
```

## Position

An `<sbb-icon-sidebar>` can be positioned at the left or right side of the viewport.
To display the icon sidebar on the right side, place the `<sbb-icon-sidebar>`
after the `<sbb-icon-sidebar-content>` in the DOM.
Technically it's possible to place two icon sidebars, but from UX perspective it's not recommended.

**positioned on the right side:**

```html
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar-content role="main">Content</sbb-icon-sidebar-content>
  <sbb-icon-sidebar>Sidebar Content</sbb-icon-sidebar>
</sbb-icon-sidebar-container>
```

## Accessibility

The `<sbb-icon-sidebar>` has the role `navigation` applied.

The `<sbb-sidebar-content>` should be given a role based on what it contains. If it
represents the primary content of the page, it may make sense to mark it `role="main"`. If no more
specific role makes sense, `role="region"` is a good fallback.

Like described in [sbb-icon-sidebar-link](/docs/elements-sbb-sidebar-sbb-icon-sidebar-link--docs) and
[sbb-icon-sidebar-button](/docs/elements-sbb-sidebar-sbb-icon-sidebar-button--docs) it's important to set
a label to the action elements. It's also described how to set the current icon as active (aria-current).

## Combine with `sbb-sidebar`

It's possible the combine the `<sbb-icon-sidebar>` with the `<sbb-sidebar>` as following:

```html
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar>Icon sidebar content</sbb-icon-sidebar>
  <sbb-icon-sidebar-content>
    <sbb-sidebar-container>
      <sbb-sidebar role="navigation">Sidebar content</sbb-sidebar>
      <sbb-sidebar-content role="main">Content</sbb-sidebar-content>
    </sbb-sidebar-container>
  </sbb-icon-sidebar-content>
</sbb-icon-sidebar-container>
```

## Use with `sbb-header`

Check [sbb-icon-sidebar-container](/docs/elements-sbb-sidebar-sbb-icon-sidebar-container--docs) on how to
position and connect the `sbb-header` with the icon sidebar.

<!-- Auto Generated Below -->

## Properties

| Name        | Attribute | Privacy | Type                                     | Default   | Description                                                                      |
| ----------- | --------- | ------- | ---------------------------------------- | --------- | -------------------------------------------------------------------------------- |
| `color`     | `color`   | public  | `'white' \| 'milk'`                      | `'white'` | Background color of the icon sidebar. Either `white` or `milk`. \*               |
| `container` | -         | public  | `SbbIconSidebarContainerElement \| null` |           | Returns the SbbIconSidebarContainerElement where this icon-sidebar is contained. |

## Slots

| Name | Description                                                     |
| ---- | --------------------------------------------------------------- |
|      | Use the unnamed slot to slot any content into the icon-sidebar. |
