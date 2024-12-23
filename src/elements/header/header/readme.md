The `sbb-header` component is a container for actions and a logo, and it is displayed at the top of the page.

## Slots

The slot can contain:

- one or more actions ([sbb-header-button](/docs/elements-sbb-header-sbb-header-button--docs) or [sbb-header-link](/docs/elements-sbb-header-sbb-header-link--docs))
- other action items like [sbb-button](/docs/elements-sbb-button--docs) or [sbb-link](/docs/elements-sbb-link--docs)
- a logo or a signet with the `.sbb-header-logo` class (see [sbb-logo](/docs/elements-sbb-logo--docs))

Slotted elements are aligned to the left. Use `<div class="sbb-header-spacer">` to align elements after it to the right.

```html
<sbb-header>
  <sbb-header-link icon-name="hamburger-menu-small" href="https://sbb.ch/somewhere">
    Menu
  </sbb-header-link>
  <sbb-header-button icon-name="magnifying-glass-small">Search</sbb-header-button>
  <div class="sbb-header-spacer"></div>
  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-logo protective-room="none"></sbb-logo>
  </a>
</sbb-header>
```

## Style

Setting the `expanded` property will cause the `sbb-header` component to take up the full width of the page.

To avoid that tabbed/focused elements get hidden behind the header,
it's recommended to set on the `<html>` tag the CSS property `scroll-padding-top` to `var(--sbb-header-height)` or to a greater value.
With this, it's ensured that content will be visible all the time.

The component has two sizes, named `m` (default) and `s`.
For the latter, the usage of the `sbb-signet` with `protective-room='panel'` is suggested.

```html
<sbb-header size="s">
  <sbb-header-link icon-name="hamburger-menu-small" href="https://sbb.ch/somewhere">
    Menu
  </sbb-header-link>
  <sbb-header-button icon-name="magnifying-glass-small">Search</sbb-header-button>
  <div class="sbb-header-spacer"></div>
  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-signet protective-room="panel"></sbb-signet>
  </a>
</sbb-header>
```

### Active state

To indicate an active state of the `sbb-header-link` or `sbb-header-button`,
the CSS class `sbb-active` should be set on the corresponding element.

From accessibility perspective `aria-current="page"` should be set whenever the CSS class `sbb-active` is set.

```html
<sbb-header size="s">
  <sbb-header-link
    icon-name="magnifying-glass-small"
    href="https://sbb.ch/somewhere"
    class="sbb-active"
    aria-current="page"
  >
    Overview
  </sbb-header-link>
  <div class="sbb-header-spacer"></div>
  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-signet protective-room="panel"></sbb-signet>
  </a>
</sbb-header>
```

### Positioning and visibility

By default, the `sbb-header` has a fixed position at the top of the page;
when the page is scrolled down, a box-shadow appears below it and the component remains visible.
It's possible to change this behavior by setting the `hideOnScroll` property to `true`, or adding the `hide-on-scroll`
attribute: in this case, the box-shadow is still set, but the component disappears when the page is scrolled down and
then reappears as soon as it's scrolled up. It's also possible to bind this behaviour to something other than the `document`,
using the `scrollOrigin` property, which accepts an `HTMLElement` or the id of the element to search for.

```html
<sbb-header expanded hideOnScroll>
  <sbb-header-button icon-name="magnifying-glass-small">Search</sbb-header-button>
  <div class="sbb-header-spacer"></div>
  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-logo protective-room="none"></sbb-logo>
  </a>
</sbb-header>
```

### Customizing

Users can customize position and behaviour of actions inside the `sbb-header` component
by adding classes to `sbb-header-button`/`sbb-header-link` elements and then defining their own style rules.

[All the examples in Storybook](/story/elements-sbb-header-sbb-header--basic) have the following requirements:

1. four action items (with custom icons);
2. the first item is always left aligned and has `expand-from` set to `small`;
3. the other three items are left aligned in breakpoints zero to medium, and right aligned from large to ultra;
4. the last item is not visible in breakpoints zero to small;
5. the logo is always aligned to the right.

To achieve the alignment requirements, two `div` tags with a CSS class named `sbb-header-spacer` were added:

- one after the first `sbb-header-button` item (that will be hidden on smaller screen sizes);
- the second, before the logo. Since this spacer will only be shown on small screen sizes, we need a new class to target it (in this example `sbb-header-spacer-logo`);

We also need a class (in this example `last-element`) on the last `sbb-header-button` to achieve requirement n° 4.

Finally, the following custom CSS has been added(\*).

The result can also be seen in the [home](/story/pages-home--home) and [home-logged-in](/story/pages-home--home-logged-in) stories.

```css
.last-element,
.sbb-header-spacer-logo {
  display: none;
}

@media screen and (width >= 840px) {
  .last-element {
    display: block;
  }
}

@media screen and (width < 1024px) {
  .sbb-header-spacer {
    display: none;
  }

  .sbb-header-spacer-logo {
    display: block;
  }
}
```

```html
<sbb-header>
  <sbb-header-button icon-name="..." expand-from="small"> ... </sbb-header-button>

  <!-- Will be hidden on small screen sizes -->
  <div class="sbb-header-spacer"></div>

  <sbb-header-button icon-name="..."> ... </sbb-header-button>
  <sbb-header-button icon-name="..."> ... </sbb-header-button>
  <sbb-header-button icon-name="..." class="last-element"> ... </sbb-header-button>

  <!-- Will only be shown on small screen sizes -->
  <div class="sbb-header-spacer sbb-header-spacer-logo"></div>

  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-logo protective-room="none"></sbb-logo>
  </a>
</sbb-header>
```

The `sbb-header` can be also customized by adding the application's name and version:
a helper class named `sbb-header-info` is provided to achieve the correct visual result.

```html
<sbb-header size="s">
  <sbb-header-link icon-name="hamburger-menu-small" href="https://sbb.ch/somewhere">
    Menu
  </sbb-header-link>

  <span class="sbb-header-info">
    <strong>Application name</strong>
    <span>V. 1.1</span>
  </span>

  <div class="sbb-header-spacer"></div>

  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-signet protective-room="panel"></sbb-signet>
  </a>
</sbb-header>
```

### Content overflow

If a certain `sbb-header-button`/`sbb-header-link` should be shrunken (receive ellipsis) when there is too little space,
set the CSS class `sbb-header-shrinkable` on the desired `sbb-header-button`/`sbb-header-link`.

```html
<sbb-header>
  <sbb-header-link icon-name="hamburger-menu-small" href="https://sbb.ch/somewhere" target="_blank">
    Menu
  </sbb-header-link>
  <sbb-header-button class="sbb-header-shrinkable">
    Christina Müller has a long name
  </sbb-header-button>
  <div class="sbb-header-spacer"></div>
  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-logo protective-room="none"></sbb-logo>
  </a>
</sbb-header>
```

(\*) Technical note: Due the presence of media-query rules, it was not possible to add those rules directly
in the component's stories (see also [this Storybook issue](https://github.com/storybookjs/storybook/issues/8820)),
so they were wrapped into a `style` tag and added to the Storybook's configuration file named `preview-head.html`.

<!-- Auto Generated Below -->

## Properties

| Name           | Attribute        | Privacy | Type                                | Default            | Description                                                                                                          |
| -------------- | ---------------- | ------- | ----------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `expanded`     | `expanded`       | public  | `boolean`                           | `false`            | Whether to allow the header content to stretch to full width. By default, the content has the appropriate page size. |
| `hideOnScroll` | `hide-on-scroll` | public  | `boolean`                           | `false`            | Whether the header should hide and show on scroll.                                                                   |
| `scrollOrigin` | `scroll-origin`  | public  | `string \| HTMLElement \| Document` |                    | The element's id or the element on which the scroll listener is attached.                                            |
| `size`         | `size`           | public  | `'m' \| 's'`                        | `'m' / 's' (lean)` | Size of the header, either m or s.                                                                                   |

## CSS Properties

| Name                   | Default                                                                             | Description                                      |
| ---------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------ |
| `--sbb-header-height`  | `zero-small:var(--sbb-spacing-fixed-14x);medium-ultra:var(--sbb-spacing-fixed-24x)` | Can be used to modify height of the header.      |
| `--sbb-header-z-index` | `10`                                                                                | Can be used to modify the z-index of the header. |

## Slots

| Name | Description                                                          |
| ---- | -------------------------------------------------------------------- |
|      | Use the unnamed slot to add actions, content and logo to the header. |
