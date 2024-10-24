The `sbb-pearl-chain-leg` is a component used inside the
[sbb-pearl-chain](/docs/experimental-sbb-pearl-chain--docs) in order to render the journey's legs.

```html
<sbb-pearl-chain-leg departure="2022-08-18T05:00" arrival="2022-08-18T16:00"></sbb-pearl-chain-leg>
```

## States

The `past`, `arrival-skipped`, `departure-skipped`, and `disruption` properties are connected to the self-named states.

<!-- Auto Generated Below -->

## Properties

| Name               | Attribute           | Privacy | Type                  | Default | Description                                  |
| ------------------ | ------------------- | ------- | --------------------- | ------- | -------------------------------------------- |
| `arrival`          | `arrival`           | public  | `SbbDateLike \| null` | `null`  | Arrival time of the leg.                     |
| `arrivalDelay`     | `arrival-delay`     | public  | `number`              | `0`     | The number of minutes of delay on arrival.   |
| `arrivalSkipped`   | `arrival-skipped`   | public  | `boolean`             | `false` | Whether the leg's arrival is skipped.        |
| `departure`        | `departure`         | public  | `SbbDateLike \| null` | `null`  | Departure time of the leg.                   |
| `departureDelay`   | `departure-delay`   | public  | `number`              | `0`     | The number of minutes of delay on departure. |
| `departureSkipped` | `departure-skipped` | public  | `boolean`             | `false` | Whether the leg's departure is skipped.      |
| `disruption`       | `disruption`        | public  | `boolean`             | `false` | Whether the leg is disrupted.                |
| `past`             | `past`              | public  | `boolean`             | `false` | Whether current time is past arrival time.   |
