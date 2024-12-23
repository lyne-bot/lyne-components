The `sbb-navigation-link` component is an action element contained by
a [sbb-navigation-list](/docs/elements-sbb-navigation-sbb-navigation-list--docs) component
or a [sbb-navigation-marker](/docs/elements-sbb-navigation-sbb-navigation-marker--docs) component.

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

```html
<sbb-navigation-link href="#info" target="_blank">Link</sbb-navigation-link>
```

## State

The navigation button can have an initial active state which can be set by using the class `.sbb-active`.

```html
<sbb-navigation-link class="sbb-active" href="#info" target="_blank">Link</sbb-navigation-link>
```

## Style

The component has three different sizes, which can be changed using the `size` property (`l`, which is the default, `m` and `s`).

```html
<sbb-navigation-link href="#info" size="m">Link</sbb-navigation-link>
```

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                                       | Default            | Description                                                       |
| -------------------- | --------------------- | ------- | ------------------------------------------ | ------------------ | ----------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                                   | `''`               | This will be forwarded as aria-label to the inner anchor element. |
| `connectedSection`   | -                     | public  | `SbbNavigationSectionElement \| undefined` |                    | The section that is beign controlled by the action, if any.       |
| `download`           | `download`            | public  | `boolean`                                  | `false`            | Whether the browser will show the download dialog on click.       |
| `href`               | `href`                | public  | `string`                                   | `''`               | The href value you want to link to.                               |
| `marker`             | -                     | public  | `SbbNavigationMarkerElement \| null`       |                    | The navigation marker in which the action is nested.              |
| `rel`                | `rel`                 | public  | `string`                                   | `''`               | The relationship of the linked URL as space-separated link types. |
| `section`            | -                     | public  | `SbbNavigationSectionElement \| null`      |                    | The section in which the action is nested.                        |
| `size`               | `size`                | public  | `SbbNavigationActionSize`                  | `'l' / 's' (lean)` | Action size variant, either s, m or l.                            |
| `target`             | `target`              | public  | `LinkTargetType \| string`                 | `''`               | Where to display the linked URL.                                  |

## Slots

| Name | Description                                                       |
| ---- | ----------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-navigation-link`. |
