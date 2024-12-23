The `sbb-journey-header` is a component used to display the journey's details.

The component has two required properties, named `origin` and `destination`,
which represents the two ends of the journey.
An icon is placed between them: if the property `roundTrip` is set to false (default),
the icon is an arrow pointing to the `destination`, otherwise it is a double arrow to display the round-trip.

```html
<sbb-journey-header origin="Point A" destination="Point B"></sbb-journey-header>

<sbb-journey-header origin="Point A" destination="Point B" round-trip></sbb-journey-header>
```

## Style

The component has a `level` property, which is passed to its inner `sbb-title` component;
it is rendered as a heading from `h1` to `h6`. Default `level` is `3`.

The component also has three sizes, named `s`, `m` (default) and `l`, and a `negative` background variant.

```html
<sbb-journey-header origin="Point A" destination="Point B" size="s"></sbb-journey-header>

<sbb-journey-header origin="Point A" destination="Point B" size="l"></sbb-journey-header>

<sbb-journey-header origin="Point A" destination="Point B" level="5"></sbb-journey-header>

<sbb-journey-header origin="Point A" destination="Point B" negative></sbb-journey-header>
```

## Accessibility

The component has some hidden elements in order to be correctly read from a screen-reader.

The following example will be read as (locale: ENG): `Connection from Point A to Point B.`.

```html
<sbb-journey-header origin="Point A" destination="Point B"></sbb-journey-header>
```

The following one will be read as (locale: ENG): `Connection from Point A to Point B and back to Point A.`.

```html
<sbb-journey-header origin="Point A" destination="Point B" round-trip="true"></sbb-journey-header>
```

<!-- Auto Generated Below -->

## Properties

| Name          | Attribute     | Privacy | Type                | Default            | Description                                                                       |
| ------------- | ------------- | ------- | ------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `destination` | `destination` | public  | `string`            | `''`               | Destination location for the journey header.                                      |
| `level`       | `level`       | public  | `SbbTitleLevel`     | `'3'`              | Heading level of the journey header element (e.g. h1-h6).                         |
| `negative`    | `negative`    | public  | `boolean`           | `false`            | Negative coloring variant flag.                                                   |
| `origin`      | `origin`      | public  | `string`            | `''`               | Origin location for the journey header.                                           |
| `roundTrip`   | `round-trip`  | public  | `boolean`           | `false`            | Whether the journey is a round trip. If so, the icon changes to a round-trip one. |
| `size`        | `size`        | public  | `JourneyHeaderSize` | `'m' / 's' (lean)` | Journey header size, either s, m or l.                                            |
