The `sbb-timetable-row` component displays a journey.
A Journey consists of various icons that display information about the means of transport,
the occupancy in the first and second class, the most important warning for the trip and travel hints.
Train changes are displayed in a pearl chain, which has the capability to show,
if a connection is in the past, future or cancelled.
In addition to that, the current position within the journey can be shown.

The whole component is clickable and therefore emits a click-event.

## Usage with props

_`priceProp` property_

```json
{ "price": "12", "text": "CHF", "isDiscount": true }
```

_`tripProp` property_

```json
{
  "legs": [
    {
      "duration": 360,
      "id": "test",
      "arrival": { "time": "2022-08-40T15:00:00+02:00" },
      "departure": { "time": "2022-04-30T15:00:00+02:00" },
      "serviceJourney": {
        "serviceAlteration": {
          "cancelled": false
        }
      }
    }
  ]
}
```

```html
<sbb-timetable-row price="{priceProp}" trip="{tripProp}"></sbb-timetable-row>
```

To simulate the current datetime, you can use the `now` property,
which accepts a `Date` or a timestamp in milliseconds (as number or string).
This is helpful if you need a specific state of the component.

<!-- Auto Generated Below -->

## Properties

| Name                    | Attribute                | Privacy | Type        | Default | Description                                                                                                                                                                                   |
| ----------------------- | ------------------------ | ------- | ----------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a11yFootpath`          | `a11y-footpath`          | public  | `boolean`   | `false` | The Footpath attribute for rendering different icons true: render a11y-icon false: render walk-icon default: render walk-icon                                                                 |
| `accessibilityExpanded` | `accessibility-expanded` | public  | `boolean`   | `false` | This will be forwarded to the sbb-card component as aria-expanded.                                                                                                                            |
| `active`                | `active`                 | public  | `boolean`   | `false` | When this prop is true the sbb-card will be in the active state.                                                                                                                              |
| `boarding`              | `boarding`               | public  | `Boarding`  | `null!` | This will be forwarded to the notices section                                                                                                                                                 |
| `cardActionLabel`       | `card-action-label`      | public  | `string`    | `''`    | Hidden label for the card action. It overrides the automatically generated accessibility text for the component. Use this prop to provide custom accessibility information for the component. |
| `disableAnimation`      | `disable-animation`      | public  | `boolean`   | `false` | This will be forwarded to the sbb-pearl-chain component - if true the position won't be animated.                                                                                             |
| `loadingPrice`          | `loading-price`          | public  | `boolean`   | `false` | The loading state - when this is true it will be render skeleton with an idling animation                                                                                                     |
| `loadingTrip`           | `loading-trip`           | public  | `boolean`   | `false` | The loading state - when this is true it will be render skeleton with an idling animation                                                                                                     |
| `now`                   | `now`                    | public  | `Date`      | `null`  | A configured date which acts as the current date instead of the real current date. Recommended for testing purposes.                                                                          |
| `price`                 | `price`                  | public  | `Price`     | `null!` | The price Prop, which consists of the data for the badge.                                                                                                                                     |
| `trip`                  | `trip`                   | public  | `ITripItem` | `null!` | The trip Prop.                                                                                                                                                                                |
