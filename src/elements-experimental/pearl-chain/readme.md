The `sbb-pearl-chain` component displays all parts of a journey, including changes of trains or other kinds of transports.
Also, it is possible to render the current position.

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
      }
    }
  },
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
      }
    }
  }
]
```

```html
<sbb-pearl-chain legs="{legs}"></sbb-pearl-chain>
```

To simulate the current datetime, you can use the `now` property,
which accepts a `Date` or a timestamp in milliseconds (as number or string).
This is helpful if you need a specific state of the component.

<!-- Auto Generated Below -->

## Properties

| Name               | Attribute           | Privacy | Type                   | Default | Description                                                                                                                                                                                                                                                                    |
| ------------------ | ------------------- | ------- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `disableAnimation` | `disable-animation` | public  | `boolean`              | `false` | Per default, the current location has a pulsating animation. You can disable the animation with this property.                                                                                                                                                                 |
| `legs`             | `legs`              | public  | `(Leg \| PtRideLeg)[]` | `[]`    | Define the legs of the pearl-chain. Format: `{"legs": \[{"duration": 25}, ...]}` `duration` in minutes. Duration of the leg is relative to the total travel time. Example: departure 16:30, change at 16:40, arrival at 17:00. So the change should have a duration of 33.33%. |
| `now`              | `now`               | public  | `Date \| null`         | `null`  | A configured date which acts as the current date instead of the real current date. Recommended for testing purposes.                                                                                                                                                           |
