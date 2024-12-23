The `sbb-journey-summary` displays the main information of a journey.
It contains information about the arrival and departure, the date when the journey takes place and how long the trip will be.
It also consists of a pearl-chain with arrival and departure time.
In addition to that, it is also possible to display the walktimes at the start and end of a journey.
The component has an unnamed slot where other elements can be added, i.e. buttons.

## Usage

The Example below shows how to render the component with a button in the slot.
To be displayed correctly, the trip prop has to include almost all properties mentioned in the table below.
It is important that the arrival and departure properties consist of a valid ISO 8601 date string.
If this is not the case, the times and the date will not be displayed.
If the tripBack prop is passed to the component a second journey-summary, without the header, is displayed.

```html
<sbb-journey-summary trip="{trip}"><sbb-button></sbb-button></sbb-journey-summary>
```

To simulate the current datetime, you can use the `now` property,
which accepts a `Date` or a timestamp in milliseconds (as number or string).
This is helpful if you need a specific state of the component.

<!-- Auto Generated Below -->

## Properties

| Name               | Attribute           | Privacy | Type                                   | Default | Description                                                                                                                   |
| ------------------ | ------------------- | ------- | -------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `a11yFootpath`     | `a11y-footpath`     | public  | `boolean`                              | `false` | The Footpath attribute for rendering different icons true: render a11y-icon false: render walk-icon default: render walk-icon |
| `disableAnimation` | `disable-animation` | public  | `boolean`                              | `false` | Per default, the current location has a pulsating animation. You can disable the animation with this property.                |
| `headerLevel`      | `header-level`      | public  | `SbbTitleLevel`                        | `'3'`   | Heading level of the journey header element (e.g. h1-h6).                                                                     |
| `now`              | `now`               | public  | `Date`                                 | `null`  | A configured date which acts as the current date instead of the real current date. Recommended for testing purposes.          |
| `roundTrip`        | `round-trip`        | public  | `boolean`                              | `false` | The RoundTrip prop. This prop controls if one or two arrows are displayed in the header.                                      |
| `trip`             | `trip`              | public  | `InterfaceSbbJourneySummaryAttributes` | `null!` | The trip prop                                                                                                                 |
| `tripBack`         | `trip-back`         | public  | `InterfaceSbbJourneySummaryAttributes` | `null!` | The tripBack prop                                                                                                             |

## Slots

| Name      | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| `content` | Use this slot to add `sbb-button`s or other interactive elements. |
