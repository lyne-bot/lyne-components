The `sbb-teaser` is a component which can display an image with a caption, and it behaves like a link on user interaction.

Simple teaser example:

```html
<sbb-teaser
  href="https://www.sbb.ch"
  title-level="2"
  title-content="Title"
  chip-content="Chip label"
>
  <img slot="image" src="..." alt="400x300" />
  A brief description.
</sbb-teaser>
```

## Slots

The default slot is reserved for the description. The component displays the `image` and the `title` with the self-named slots.
It's also possible to display a [sbb-chip](/docs/elements-sbb-chip--docs) using the `chip` slot.

```html
<sbb-teaser href="https://www.sbb.ch" title-level="2">
  <img slot="image" src="..." alt="400x300" />
  <span slot="chip">Chip label</span>
  <span slot="title">Title</span>
  A brief description.
</sbb-teaser>
```

## Style

Using the `alignment` property, it is possible to change the text position respect to the image.
Possible values are `after-centered` (default), `after` and `below`.

```html
<sbb-teaser href="https://www.sbb.ch" alignment="below"> ... </sbb-teaser>
```

By default, the image dimensions are set using the width and the aspect ratio.
Default values are `300px` and `4/3`. Consumers can change these values on their slotted image element.

### Flexible Layouts

If using the teaser in a flexible layout like CSS grid or flex together with `alignment=below`,
the CSS variable `--sbb-teaser-align-items` with `stretch` as value can be used
to achieve the image width taking the full available space. On the image itself, the width must be set to `100%`.

```html
<div style="display: grid; gap: 1rem; grid-template-rows: repeat(2, 1fr)">
  <sbb-teaser style="--sbb-teaser-align-items: stretch" href="https://www.sbb.ch" alignment="below">
    <sbb-image style="width: 100%;" slot="image" image-src="..." alt="description"></sbb-image>
    ...
  </sbb-teaser>
  <sbb-teaser style="--sbb-teaser-align-items: stretch" href="https://www.sbb.ch" alignment="below">
    <sbb-image style="width: 100%;" slot="image" image-src="..." alt="description"></sbb-image>
    ...
  </sbb-teaser>
</div>
```

## Accessibility

It's important to set the `accessibilityLabel` on the `<sbb-teaser>`, which describes the `sbb-teaser` for screen-reader users.

The description text is wrapped into an `<p>` element to guarantee the semantic meaning.

Avoid slotting block elements (e.g. `<div>`) as this violates semantic rules and can have negative effects on screen readers.

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                                     | Default            | Description                                                               |
| -------------------- | --------------------- | ------- | ---------------------------------------- | ------------------ | ------------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string \| undefined`                    |                    | This will be forwarded as aria-label to the inner anchor element.         |
| `alignment`          | `alignment`           | public  | `'after-centered' \| 'after' \| 'below'` | `'after-centered'` | Teaser variant - define the position and the alignment of the text block. |
| `chipContent`        | `chip-content`        | public  | `string \| undefined`                    |                    | Content of chip.                                                          |
| `download`           | `download`            | public  | `boolean \| undefined`                   |                    | Whether the browser will show the download dialog on click.               |
| `href`               | `href`                | public  | `string \| undefined`                    |                    | The href value you want to link to.                                       |
| `rel`                | `rel`                 | public  | `string \| undefined`                    |                    | The relationship of the linked URL as space-separated link types.         |
| `target`             | `target`              | public  | `LinkTargetType \| string \| undefined`  |                    | Where to display the linked URL.                                          |
| `titleContent`       | `title-content`       | public  | `string \| undefined`                    |                    | Content of title.                                                         |
| `titleLevel`         | `title-level`         | public  | `SbbTitleLevel`                          | `'5'`              | Heading level of the sbb-title element (e.g. h1-h6).                      |

## Slots

| Name    | Description                                     |
| ------- | ----------------------------------------------- |
|         | Use the unnamed slot to render the description. |
| `chip`  | Slot used to render the sbb-chip label.         |
| `image` | Slot used to render the image.                  |
| `title` | Slot used to render the title.                  |
