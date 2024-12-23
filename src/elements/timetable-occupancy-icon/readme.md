The `sbb-timetable-occupancy-icon` displays the wagon occupancy depending on occupancy property
and the page style (normal, negative, high contrast mode).

```html
<sbb-timetable-occupancy-icon occupancy="high"></sbb-timetable-occupancy-icon>
```

## Style

It's possible to display the component in `negative` variant using the self-named property;
in this case, the rendered icon will change accordingly.

```html
<sbb-timetable-occupancy-icon occupancy="low" negative></sbb-timetable-occupancy-icon>
```

## Accessibility

In high contrast mode, the rendered icon changes for a better user experience.

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute     | Privacy | Type           | Default  | Description                                                                                                                                                                                  |
| ------------ | ------------- | ------- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `negative`   | `negative`    | public  | `boolean`      | `false`  | Negative coloring variant flag.                                                                                                                                                              |
| `noSanitize` | `no-sanitize` | public  | `boolean`      | `false`  | When set to `true`, SVG content that is HTTP fetched will not be checked if the response SVG content has any `<script>` elements, or any attributes that start with `on`, such as `onclick`. |
| `occupancy`  | `occupancy`   | public  | `SbbOccupancy` | `'none'` | Wagon occupancy.                                                                                                                                                                             |

## CSS Properties

| Name                    | Default | Description                         |
| ----------------------- | ------- | ----------------------------------- |
| `--sbb-icon-svg-height` | `auto`  | Can be used to set a custom height. |
| `--sbb-icon-svg-width`  | `auto`  | Can be used to set a custom width.  |
