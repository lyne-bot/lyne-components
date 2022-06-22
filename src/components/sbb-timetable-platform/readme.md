# sbb-timetable-platform

!! Please note that this component is not intended for direct use. It will get used within sbb-timetable. It is listed
here to show the various configuration options to component developers. !!

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute    | Description                                                                                                                               | Type                                                                  | Default         |
| --------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------- |
| `appearance`          | `appearance` | Set the desired appearance of the component.                                                                                              | `"first-level" \| "second-level-arrival" \| "second-level-departure"` | `'first-level'` |
| `config` _(required)_ | `config`     | Stringified JSON which defines most of the content of the component. Please check the individual stories to get an idea of the structure. | `string`                                                              | `undefined`     |


## Dependencies

### Used by

 - [sbb-timetable-row](../sbb-timetable-row)

### Graph
```mermaid
graph TD;
  sbb-timetable-row --> sbb-timetable-platform
  style sbb-timetable-platform fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


