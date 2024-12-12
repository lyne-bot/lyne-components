The `sbb-pearl-chain-time` component adds an optional walk icon and a duration in minutes
before and/or after the [sbb-pearl-chain-legacy](/docs/experimental-sbb-pearl-chain-legacy--docs).

The walk time indicates that the user has to walk to get to the destination, or to the station to begin the journey.

The `legs` property is mandatory.

```json
[
  {
    "__typename": "PTRideLeg",
    "arrival": {
      "time": "2022-12-11T12:13:00+01:00"
    },
    "departure": {
      "time": "2022-12-07T12:11:00+01:00"
    },
    "serviceJourney": {
      "serviceAlteration": {
        "cancelled": false,
        "delayText": "string",
        "reachable": true,
        "unplannedStopPointsText": ""
      },
      "notices": [
        {
          "name": "CI",
          "text": {
            "template": "Extended boarding time (45')"
          }
        }
      ]
    }
  }
]
```

```html
<sbb-pearl-chain-time
  legs="{legs}"
  departure-time="20:30"
  arrival-time="21:30"
  departure-walk="5"
  arrival-walk="3"
></sbb-pearl-chain-time>
```

To simulate the current datetime, you can use the `now` property,
which accepts a `Date` or a timestamp in milliseconds (as number or string).
This is helpful if you need a specific state of the component.

<!-- Auto Generated Below -->

## Properties

| Name               | Attribute           | Privacy | Type                   | Default | Description                                                                                                                                                                                                                                                                    |
| ------------------ | ------------------- | ------- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `a11yFootpath`     | `a11y-footpath`     | public  | `boolean`              | `false` | Optional prop to render wheelchair-small instead of walk-small                                                                                                                                                                                                                 |
| `arrivalTime`      | `arrival-time`      | public  | `string`               | `''`    | Prop to render the arrival time - will be formatted as "H:mm"                                                                                                                                                                                                                  |
| `arrivalWalk`      | `arrival-walk`      | public  | `number`               | `NaN`   | Optional prop to render the walk time (in minutes) after arrival                                                                                                                                                                                                               |
| `departureTime`    | `departure-time`    | public  | `string`               | `''`    | Prop to render the departure time - will be formatted as "H:mm"                                                                                                                                                                                                                |
| `departureWalk`    | `departure-walk`    | public  | `number`               | `NaN`   | Optional prop to render the walk time (in minutes) before departure                                                                                                                                                                                                            |
| `disableAnimation` | `disable-animation` | public  | `boolean`              | `false` | Per default, the current location has a pulsating animation. You can disable the animation with this property.                                                                                                                                                                 |
| `legs`             | `legs`              | public  | `(Leg \| PtRideLeg)[]` | `[]`    | define the legs of the pearl-chain. Format: `{"legs": \[{"duration": 25}, ...]}` `duration` in minutes. Duration of the leg is relative to the total travel time. Example: departure 16:30, change at 16:40, arrival at 17:00. So the change should have a duration of 33.33%. |
| `now`              | `now`               | public  | `Date`                 | `null`  | A configured date which acts as the current date instead of the real current date. Recommended for testing purposes.                                                                                                                                                           |
