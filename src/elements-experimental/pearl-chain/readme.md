The `sbb-pearl-chain` component displays all parts of a journey, including changes of trains or other kinds of transports.
Also, it is possible to render the current position.

The compoent's configuration is done through slotted [sbb-pearl-chain-leg](/docs/experimental-sbb-pearl-chain-leg--docs)s.

```html
<sbb-pearl-chain>
  <sbb-pearl-chain-leg
    departure="2024-01-31T16:53:00.000Z"
    arrival="2024-01-31T17:53:00.000Z"
  ></sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    departure="2024-01-31T17:58:00.000Z"
    arrival="2024-01-31T19:45:00.000Z"
    disruption
  ></sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    departure="2024-01-31T19:52:00.000Z"
    arrival="2024-01-31T19:58:00.000Z"
  ></sbb-pearl-chain-leg>
</sbb-pearl-chain>
```

Optionally the properties `departure` and `arrival` can be set in order to display the departure time and the arrival time at the sides of the component.

With time displayed

```html
<sbb-pearl-chain departure="2024-01-31T16:53:00.000Z" arrival="2024-01-31T19:58:00.000Z">
  <sbb-pearl-chain-leg
    departure="2024-01-31T16:53:00.000Z"
    arrival="2024-01-31T17:53:00.000Z"
  ></sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    departure="2024-01-31T17:58:00.000Z"
    arrival="2024-01-31T19:45:00.000Z"
    disruption
  ></sbb-pearl-chain-leg>
  <sbb-pearl-chain-leg
    departure="2024-01-31T19:52:00.000Z"
    arrival="2024-01-31T19:58:00.000Z"
  ></sbb-pearl-chain-leg>
</sbb-pearl-chain>
```

To simulate the current datetime, you can use the `now` property,
which accepts a `Date` or a timestamp in milliseconds (as number or string).
This is helpful if you need a specific state of the component.

## Slots

The components allows to slot any number of `sbb-pearl-chain-leg` in the `unnamed` slot.

<!-- Auto Generated Below -->

## Properties

| Name               | Attribute           | Privacy | Type                   | Default | Description                                                                                                                                                                                                                                                                    |
| ------------------ | ------------------- | ------- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `disableAnimation` | `disable-animation` | public  | `boolean`              | `false` | Per default, the current location has a pulsating animation. You can disable the animation with this property.                                                                                                                                                                 |
| `legs`             | `legs`              | public  | `(Leg \| PtRideLeg)[]` | `[]`    | Define the legs of the pearl-chain. Format: `{"legs": \[{"duration": 25}, ...]}` `duration` in minutes. Duration of the leg is relative to the total travel time. Example: departure 16:30, change at 16:40, arrival at 17:00. So the change should have a duration of 33.33%. |
| `now`              | `now`               | public  | `Date \| null`         | `null`  | A configured date which acts as the current date instead of the real current date. Recommended for testing purposes.                                                                                                                                                           |
