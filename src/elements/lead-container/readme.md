The `sbb-lead-container` can be used for product pages to display a lead image and following content.

Please note that the gaps between elements inside the unnamed slot (main content) need to be controlled by the consumer.
However, consumers can use the predefined classes
(`sbb-lead-container-lead-spacing` and `sbb-lead-container-lead-text`) to achieve a correct spacing.

As per design rules, the spacings are defined as following:

```html
<sbb-alert-group></sbb-alert-group>
<!-- var(--sbb-spacing-responsive-m) -->
<sbb-breadcrump-group></sbb-breadcrump-group>
<!-- var(--sbb-spacing-4x) -->
<sbb-block-link></sbb-block-link>
<!-- var(--sbb-spacing-4x) -->
<sbb-title></sbb-title>
<!-- var(--sbb-spacing-responsive-s) -->
<p></p>
<!-- var(--sbb-spacing-responsive-s) -->
<sbb-notification></sbb-notification>
<!-- var(--sbb-spacing-responsive-xxxs) -->
...
<!-- The last element should have zero block-end spacing to the container -->
```

Full example with applied spacings (CSS classes) in content:

```html
<sbb-lead-container>
  <style>
    p.other-content {
      margin-block: 0;
    }
  </style>
  <sbb-image
    slot="image"
    image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Bahnhof-Luzern.jpg"
    alt="Station of Lucerne from outside"
  ></sbb-image>
  <sbb-alert-group class="sbb-lead-container-spacing">
    <sbb-alert title-content="Interruption between Genève and Lausanne" size="m">
      The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
      <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
    </sbb-alert>
  </sbb-alert-group>
  <sbb-breadcrumb-group class="sbb-lead-container-spacing">
    <sbb-breadcrumb href="#" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
    <sbb-breadcrumb href="#" id="breadcrumb-1">Level 1</sbb-breadcrumb>
  </sbb-breadcrumb-group>
  <sbb-block-link
    icon-placement="start"
    icon-name="chevron-small-left-small"
    size="xs"
    href="https://www.sbb.ch"
    class="sbb-lead-container-spacing"
  >
    Link
  </sbb-block-link>
  <sbb-title class="sbb-lead-container-spacing">Title</sbb-title>
  <p class="sbb-text-xl sbb-lead-container-lead-text">Lead text.</p>
  <sbb-notification type="info" class="sbb-lead-container-spacing">
    Vestibulum rutrum elit et lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at
    augue quis tellus vulputate tempor. Vivamus urna velit, varius nec est ac, mollis efficitur
    lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat metus.
  </sbb-notification>
  <p class="sbb-text-m other-content">Other content.</p>
</sbb-lead-container>
```

Optionally, you can add an overlapping `sbb-chip-label` by wrapping the `sbb-image` in a `figure` tag (see [sbb-image doc](/docs/elements-sbb-image--docs#utility%classes)).

```html
<sbb-lead-container>
  <figure class="sbb-figure" slot="image">
    <sbb-image
      image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Bahnhof-Luzern.jpg"
      alt="Station of Lucerne from outside"
    ></sbb-image>
    <sbb-chip-label class="sbb-figure-overlap-start-start">...</sbb-chip-label>
  </figure>
  ...
</sbb-lead-container>
```

## Accessibility

Please either define the `alt` attribute of your image or set `aria-hidden="true"` to the image
to hide it from the accessibility tree.

<!-- Auto Generated Below -->

## Slots

| Name    | Description                                                                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|         | Use the unnamed slot to add any content to the container.                                                                                                          |
| `image` | Use the image slot to provide the lead image. `sbb-image`, `img` and `picture` elements are supported. For other elements the aspect ratio has to be set manually. |
