The `sbb-flip-card-summary`, when used inside a [sbb-flip-card](/docs/elements-sbb-flip-card-sbb-flip-card--docs), shows its contents when the card is not flipped.
The component's slot is implicitly set to `"summary"`.

```html
<sbb-flip-card>
  <sbb-flip-card-summary>
    <sbb-title> Card Title </sbb-title>
    <sbb-image slot="image" image-src="..." alt="..."></sbb-image>
  </sbb-flip-card-summary>
</sbb-flip-card>
```

## Slots

Use the unnamed slot to provide a title and the `image` slot to provide an image (via either `sbb-image` or `img`).

Optionally, you can add an overlapping `sbb-chip-label` by wrapping the `sbb-image` in a `figure` tag (see [sbb-image doc](/docs/elements-sbb-image--docs#utility%classes)).

```html
<sbb-flip-card>
  <sbb-flip-card-summary>
    ...
    <figure class="sbb-figure" slot="image">
      <sbb-image
        image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Bahnhof-Luzern.jpg"
        alt="Station of Lucerne from outside"
      ></sbb-image>
      <sbb-chip-label class="sbb-figure-overlap-start-start">...</sbb-chip-label>
    </figure>
  </sbb-flip-card-summary>
</sbb-flip-card>
```

<!-- Auto Generated Below -->

## Properties

| Name             | Attribute         | Privacy | Type                        | Default   | Description                             |
| ---------------- | ----------------- | ------- | --------------------------- | --------- | --------------------------------------- |
| `imageAlignment` | `image-alignment` | public  | `SbbFlipCardImageAlignment` | `'after'` | The position where to render the image. |

## Slots

| Name    | Description                                                              |
| ------- | ------------------------------------------------------------------------ |
|         | Use the unnamed slot to provide a title for the `sbb-flip-card-summary`. |
| `image` | Use this slot to provide an image for the `sbb-flip-card-summary`.       |
