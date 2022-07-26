# sbb-title

The component renders a title according to the provided `level`.
Internally this is represented by the heading elements: h1, h2, h3, h4, h5 and h6.
In scenarios where the visual representation needs to be different from the semantic meaning of the title level,
it is possible to use the `visual-level`.

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                                                                            | Type                                     | Default                   |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ------------------------- |
| `level`          | `level`           | Title level                                                                                                                                                                                            | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `'1'`                     |
| `negative`       | `negative`        | Choose negative variant                                                                                                                                                                                | `boolean`                                | `false`                   |
| `titleId`        | `title-id`        | A11y Tip: Sometimes we need to set an id, especially if we want to associate a relationship with another element through the use of aria-labelledby or aria-describedby or just offer an anchor target | `string`                                 | ``sbb-title-${++nextId}`` |
| `visualLevel`    | `visual-level`    | Visual level for the title. Optional, if not set, the value of level will be used.                                                                                                                     | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `undefined`               |
| `visuallyHidden` | `visually-hidden` | Sometimes we need a title in the markup to present a proper hierarchy to the screenreaders while we do not want to let that title appear visually. In this case we set visuallyHidden to true          | `boolean`                                | `undefined`               |


## Dependencies

### Used by

 - [sbb-footer](../sbb-footer)
 - [sbb-link-list](../sbb-link-list)
 - [sbb-teaser](../sbb-teaser)

### Graph
```mermaid
graph TD;
  sbb-footer --> sbb-title
  sbb-link-list --> sbb-title
  sbb-teaser --> sbb-title
  style sbb-title fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


