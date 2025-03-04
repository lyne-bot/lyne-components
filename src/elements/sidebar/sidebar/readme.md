The `<sbb-sidebar>` is a component that can display items on the left or right side of the viewport.
Every slotted content will be displayed, but it's designed to use for navigation.

The sidebar components are designed to add side content to a fullscreen app.
To set up a sidebar we use three components: `<sbb-sidebar-container>` which acts as a structural container for
our content and sidebar, `<sbb-sidebar-content>` which represents the main content,
and `<sbb-sidebar>` which represents the added side content.

Per `<sbb-sidebar-container>` it's allowed to place one `<sbb-sidebar>` with `position="start"`
and one `<sbb-sidebar>` with `position="end"`. More than one sidebar of the same position value is not allowed.

```html
<sbb-sidebar-container>
  <sbb-sidebar role="navigation">
    <sbb-sidebar-title>Sidebar Title</sbb-sidebar-title>
    <sbb-sidebar-close-button></sbb-sidebar-close-button>
    <sbb-link-list>
      <sbb-block-link href="#">Link 1</sbb-block-link>
      <sbb-block-link href="#" class="sbb-active" accessibility-current="page">
        Link 2
      </sbb-block-link>
    </sbb-link-list>
  </sbb-sidebar>
  <sbb-sidebar-content role="main">
    <p style="padding: var(--sbb-spacing-fixed-4x); margin: 0">
      In the enchanting world of fantasy, unicorns are legendary creatures known for their grace,
      purity, and magical abilities. These mystical beings have inspired countless tales of bravery
      and wonder. Here, we delve into some captivating unicorn success stories that continue to
      enchant and inspire, each with a touch of public transport magic.
    </p>
  </sbb-sidebar-content>
</sbb-sidebar-container>
```

## Opening and closing a sidebar

A `<sbb-sidebar>` can be opened or closed using the `open()`, `close()` and `toggle()` methods.

The opened state can also be set via the `opened` property.

Listening to the `didOpen` and `didClose` events allows to react after transitions have been executed.
If for a certain reason the opening or closing should be prevented,
it's possible to call `preventDefault()` on the `willOpen` or `willClose` events.

**It is strongly recommended to use a button to toggle the sidebar.**
Even with `mode="side"` and an opened sidebar at larger sizes, the sidebar will collapse if there is not enough space.
In this case a toggle button is strongly recommended, otherwise the user will not be able to open the sidebar.
Ideally the button can be placed in the `<sbb-header>`.

### Close button

By slotting a `<sbb-sidebar-close-button>` into the `<sbb-sidebar>`, a close button will be shown.

```html
<sbb-sidebar role="navigation">
  <sbb-sidebar-close-button></sbb-sidebar-close-button>
  Sidebar Content
</sbb-sidebar>
```

## Title

We recommend to give the sidebar a title by using the `<sbb-sidebar-title>` element.

```html
<sbb-sidebar role="navigation">
  <sbb-sidebar-title>Title</sbb-sidebar-title>
</sbb-sidebar>
```

## Mode

The `<sbb-sidebar>` can render in one of two different ways based on the `mode` property.

| Mode   | Description                                                                                                           |
| ------ | --------------------------------------------------------------------------------------------------------------------- |
| `side` | Sidebar appears side-by-side with the main content, shrinking the main content's width to make space for the sidebar. |
| `over` | Sidebar floats over the primary content, which is covered by a backdrop                                               |

If no `mode` is specified, `side` is used by default. The `over` sidebar mode shows a backdrop,
while the `side` mode does not.

If there is not enough space available and the mode is `side`, the sidebar collapses and automatically
changes to a forced `over` mode (the mode property itself will not change).
Whenever there is enough space available, the `<sbb-sidebar>` changes back to mode `side`.

At maximum, one `<sbb-sidebar>` with `mode="over"` should be opened simultaneously on a page.

```html
<sbb-sidebar mode="over" role="navigation"></sbb-sidebar>
```

## Color

Per default, the `<sbb-sidebar>` receives a white background color. As alternative,
it's possible to set the color property to `milk`.
If using the `<sbb-sidebar>` along with a `<sbb-icon-sidebar>`, it's recommended to alternate
the background colors (`white` / `milk`) for a clear visual distinction.

```html
<sbb-sidebar color="milk" role="navigation"></sbb-sidebar>
```

## Position

An `<sbb-sidebar>` can be positioned via `position` property and its values `start` or `end`.
To display the sidebar on the right side, place the `<sbb-sidebar>`
after the `<sbb-sidebar-content>` in the DOM which guarantees a logical order for focusing.

```html
<sbb-sidebar-container>
  <sbb-sidebar-content role="main">Content</sbb-sidebar-content>
  <sbb-sidebar position="end" role="navigation">Sidebar Content</sbb-sidebar>
</sbb-sidebar-container>
```

## Size

The `<sbb-sidebar>` has a default width. The width can
be explicitly set via CSS:

```css
sbb-sidebar {
  width: 200px;
}
```

## Accessibility

If the sidebar is on `mode="over"`, the sidebar acts like an overlay element:
There is a focus trap and other content is inert.

### Roles

The `<sbb-sidebar>` and `<sbb-sidebar-content>` should each be given an appropriate role attribute
depending on the context in which they are used.

For example, a `<sbb-sidebar>` that contains links
to other pages might be marked `role="navigation"`, whereas one that contains a table of
contents about might be marked as `role="directory"`. If there is no more specific role that
describes your sidebar, `role="region"` is recommended.

Similarly, the `<sbb-sidebar-content>` should be given a role based on what it contains. If it
represents the primary content of the page, it may make sense to mark it `role="main"`. If no more
specific role makes sense, `role="region"` is again a good fallback.

### Active / Current State

Whenever an action item has an active state, it's recommended to set `aria-current="page"`
respectively `accessibility-current="page"` for link elements.
For link elements, the class `sbb-active` can be used to visually display an active state.

```html
<sbb-sidebar role="navigation">
  <sbb-link-list>
    <sbb-block-link>Link 1</sbb-block-link>
    <sbb-block-link class="sbb-active" accessibility-current="page">Link 2</sbb-block-link>
  </sbb-link-list>
</sbb-sidebar
```

### Trigger Button

If a button should trigger the opening or closing, certain
accessibility information on the trigger button should be set.

- `aria-controls="id of the sidebar"` (id should be linked to the sidebar)
- `aria-expanded="true"` or `aria-expanded="false"` (should be updated to the opened state of the sidebar)
- `aria-label` (Describes the toggle action)

```html
<sbb-header expanded scroll-origin="content" size="s">
  <sbb-header-button
    id="toggle-button"
    icon-name="hamburger-menu-small"
    aria-label="Toggle menu"
    aria-controls="sidebar"
    aria-expanded="true"
    @click="${() => document.querySelector('#sidebar')?.toggle() }"
  >
    Menu
  </sbb-header-button>
</sbb-header>
<sbb-sidebar-container>
  <sbb-sidebar
    id="sidebar"
    role="navigation"
    @didOpen="${() => document.querySelector('#toggle-button')?.setAttribute('aria-expanded', 'true') }"
    @didClose="${() => document.querySelector('#toggle-button')?.setAttribute('aria-expanded', 'false') }"
  >
    <sbb-link-list>
      <sbb-block-link>Link 1</sbb-block-link>
      <sbb-block-link class="sbb-active" accessibility-current="page">Link 2</sbb-block-link>
    </sbb-link-list>
  </sbb-sidebar>
  <sbb-sidebar-content role="main" id="content">Content</sbb-sidebar-content>
</sbb-sidebar-container>
```

## Combine with `<sbb-icon-sidebar>`

It's possible the combine the `<sbb-sidebar>` with the `<sbb-icon-sidebar>` as following:

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

Check [sbb-sidebar-container](/docs/elements-sbb-sidebar-sbb-sidebar-container--docs) on how to
position and connect the `<sbb-header>` with the sidebar.

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute  | Privacy | Type                                 | Default   | Description                                                                                                                  |
| ------------------- | ---------- | ------- | ------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `animationComplete` | -          | public  | `Promise<void>`                      |           | Returns a promise which completes whenever an animation ends. When a new animation starts, a new Promise is returned.        |
| `color`             | `color`    | public  | `'white' \| 'milk'`                  | `'white'` | Background color of the sidebar. Either `white` or `milk`.                                                                   |
| `container`         | -          | public  | `SbbSidebarContainerElement \| null` | `null`    | Returns the SbbSidebarContainerElement where this sidebar is contained.                                                      |
| `isAnimating`       | -          | public  | `boolean`                            | `false`   | Whether the component is currently animating.                                                                                |
| `isOpen`            | -          | public  | `boolean`                            |           | Whether the element is open.                                                                                                 |
| `mode`              | `mode`     | public  | `'side' \| 'over'`                   | `'side'`  | Mode of the sidebar; one of 'side' or 'over'.                                                                                |
| `opened`            | `opened`   | public  | `boolean`                            | `false`   | Whether the sidebar is opened or closed. Can be used to initially set the opened state, where the animation will be skipped. |
| `position`          | `position` | public  | `'start' \| 'end'`                   | `'start'` | The side that the sidebar is attached to.                                                                                    |

## Methods

| Name     | Privacy | Description                     | Parameters | Return | Inherited From          |
| -------- | ------- | ------------------------------- | ---------- | ------ | ----------------------- |
| `close`  | public  | Closes the sidebar.             |            | `void` | SbbOpenCloseBaseElement |
| `open`   | public  | Opens the sidebar.              |            | `void` | SbbOpenCloseBaseElement |
| `toggle` | public  | Toggles the sidebar visibility. |            | `void` |                         |

## Events

| Name        | Type                | Description                                               | Inherited From          |
| ----------- | ------------------- | --------------------------------------------------------- | ----------------------- |
| `didClose`  | `CustomEvent<void>` | Emits when the closing animation ends.                    | SbbOpenCloseBaseElement |
| `didOpen`   | `CustomEvent<void>` | Emits when the opening animation ends.                    | SbbOpenCloseBaseElement |
| `willClose` | `CustomEvent<void>` | Emits when the closing animation starts. Can be canceled. | SbbOpenCloseBaseElement |
| `willOpen`  | `CustomEvent<void>` | Emits when the opening animation starts. Can be canceled. | SbbOpenCloseBaseElement |

## Slots

| Name    | Description                                                |
| ------- | ---------------------------------------------------------- |
|         | Use the unnamed slot to slot any content into the sidebar. |
| `title` | Use the title slot to add an <sbb-title>.                  |
