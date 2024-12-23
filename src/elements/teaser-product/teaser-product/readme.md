The `sbb-teaser-product` is a component that can display a text and a footnote, combined with an image as background, to tease a product.
The whole component behaves like a link, and it is clickable; on small screens, the content follows the image.

The component can have at most a single interactive element in its static version (e.g. `sbb-button-static`).
If it has to include more than one interactive element, use the [sbb-teaser-product-static](/docs/elements-sbb-teaser-sbb-teaser-product-static--docs) instead.

```html
<sbb-teaser-product href="...">
  <sbb-image slot="image" image-src="..."></sbb-image>

  <p class="sbb-teaser-product--spacing">Content ...</p>

  <p slot="footnote" class="sbb-teaser-product--spacing">...</p>
</sbb-teaser-product>
```

## Slots

Use the `image` slot to pass an `sbb-image` or an `img` that will be used as background.
Optionally, you can add an overlapping `sbb-chip-label` by wrapping the `sbb-image` in a `figure` tag (see [sbb-image doc](/docs/elements-sbb-image--docs#utility%classes)).

Use the optional `footnote` slot to add a text anchored to the bottom-end of the component.

The default slot is reserved for the main content: it could be a simple text or a text combined with more elements,
like the `sbb-title` or an interactive element, like a button or a link (needs to be in static variant!).

```html
<sbb-teaser-product href="...">
  <figure slot="image" class="sbb-figure">
    <sbb-image image-src="..."></sbb-image>
    <sbb-chip-label class="sbb-figure-overlap-start-start">Chip label</sbb-chip-label>
  </figure>

  <p class="sbb-teaser-product--spacing">Content ...</p>
</sbb-teaser-product>
```

If paragraphs, title and/or button are used, consumers can apply the helper class `sbb-teaser-product--spacing`
to display the components with the correct spacings.

```html
<sbb-teaser-product href="...">
  <sbb-image slot="image" image-src="..."></sbb-image>
  <sbb-title level="3" class="sbb-teaser-product--spacing">
    Benefit from up to 70% discount
  </sbb-title>
  <p class="sbb-teaser-product--spacing">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus.
  </p>
  <sbb-button-static class="sbb-teaser-product--spacing">Label</sbb-button-static>
</sbb-teaser-product>
```

## Style

Use the `image-alignment` attribute to anchor the content `after` (on the left) or `before` (on the right).

```html
<sbb-teaser-product image-alignment="before"> ... </sbb-teaser-product>
```

Add the `negative` attribute to enable the negative variant.

```html
<sbb-teaser-product negative> ... </sbb-teaser-product>
```

## Accessibility

It's important to set the `accessibilityLabel` on the `<sbb-teaser-product>`, which describes the link for screen-reader users.

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                       | Default   | Description                                                                                                                           |
| -------------------- | --------------------- | ------- | -------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                   | `''`      | This will be forwarded as aria-label to the inner anchor element.                                                                     |
| `download`           | `download`            | public  | `boolean`                  | `false`   | Whether the browser will show the download dialog on click.                                                                           |
| `href`               | `href`                | public  | `string`                   | `''`      | The href value you want to link to.                                                                                                   |
| `imageAlignment`     | `image-alignment`     | public  | `'after' \| 'before'`      | `'after'` | Whether the fully visible part of the image is aligned 'before' or 'after' the content. Only relevant starting from large breakpoint. |
| `negative`           | `negative`            | public  | `boolean`                  | `false`   | Negative coloring variant flag.                                                                                                       |
| `rel`                | `rel`                 | public  | `string`                   | `''`      | The relationship of the linked URL as space-separated link types.                                                                     |
| `target`             | `target`              | public  | `LinkTargetType \| string` | `''`      | Where to display the linked URL.                                                                                                      |

## CSS Properties

| Name                                             | Default | Description                                                          |
| ------------------------------------------------ | ------- | -------------------------------------------------------------------- |
| `--sbb-teaser-product-background-gradient-end`   | `75%`   | At which percentage the background should be fully transparent.      |
| `--sbb-teaser-product-background-gradient-start` | `25%`   | At which percentage the background should start getting transparent. |

## Slots

| Name       | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
|            | Use this slot to provide the main content.                          |
| `footnote` | Use this slot to provide a footnote.                                |
| `image`    | Use this slot to provide an image or a `sbb-image` as a background. |
