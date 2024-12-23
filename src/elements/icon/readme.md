The `sbb-icon` component provides a solid way of rendering registered and named icons.

The component will dynamically load an SVG for each icon, avoiding multiple requests to the same icon.
The icon components are not tied to specific icon sets; you can register custom namespaces
and then provide the `sbb-icon` with the `name` property in the format `name="icon-name"` or `name="namespace:icon-name"`.

Note that if you do not provide a namespace, the default namespace will be used pointing to the `SBB Icons CDN`.

```html
<!-- Will use the default namespace -->
<sbb-icon name="app-icon-medium"></sbb-icon>
```

If using the SBB CDN, ensure that the icon name has the size suffix.
E.g. if in the Design (Figma) the icon is called 'circle-plus', the icon name will be either 'circle-plus-small' or 'circle-plus-medium'.

## Accessibility

Similar to an `<img>` element, an icon alone does not convey any useful information for a screen-reader user.
The user of `sbb-icon` must provide additional information pertaining to how the icon is used.
Based on the use-cases described below, `sbb-icon` is marked as `aria-hidden="true"` by default,
but this can be overridden by adding `aria-hidden="false"` to the element.

In thinking about accessibility, it is useful to place icon use into one of three categories:

1. **Decorative**: the icon conveys no real semantic meaning and is purely cosmetic.
2. **Interactive**: a user will click or otherwise interact with the icon to perform some action.
3. **Indicator**: the icon is not interactive, but it conveys some information, such as a status.
   This includes using the icon in place of a text inside a larger message.

<!-- TODO: add icon configuration documentation -->

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute     | Privacy | Type      | Default | Description                                                                                                                                                                                                   |
| ------------ | ------------- | ------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       | `name`        | public  | `string`  | `''`    | The provided name consisting of the namespace and the name of the icon. If the namespace is missing, the default namespace "sbb" will be used. E.g. `name` (will use "sbb" as namespace) or `namespace:name`. |
| `noSanitize` | `no-sanitize` | public  | `boolean` | `false` | When set to `true`, SVG content that is HTTP fetched will not be checked if the response SVG content has any `<script>` elements, or any attributes that start with `on`, such as `onclick`.                  |

## CSS Properties

| Name                    | Default | Description                         |
| ----------------------- | ------- | ----------------------------------- |
| `--sbb-icon-svg-height` | `auto`  | Can be used to set a custom height. |
| `--sbb-icon-svg-width`  | `auto`  | Can be used to set a custom width.  |
