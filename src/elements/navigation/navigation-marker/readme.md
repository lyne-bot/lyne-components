The `sbb-navigation-marker` component is a collection of of [sbb-navigation-button](/docs/elements-sbb-navigation-sbb-navigation-button--docs)
and [sbb-navigation-link](/docs/elements-sbb-navigation-sbb-navigation-link--docs).
Its intended use is inside a [sbb-navigation](/docs/elements-sbb-navigation-sbb-navigation--docs) component.

```html
<sbb-navigation-marker>
  <sbb-navigation-button id="nav1">Label 1</sbb-navigation-button>
  <sbb-navigation-button id="nav2">Label 2</sbb-navigation-button>
  <sbb-navigation-link href="https://www.sbb.ch/some/route">Label 3</sbb-navigation-link>
  <sbb-navigation-marker></sbb-navigation-marker
></sbb-navigation-marker>
```

## Style

The component has a property named `size` which is proxied to all the `sbb-navigation-button`/`sbb-navigation-link` within it.
Possible values are `l` (default) and `s`.

```html
<sbb-navigation-marker size="s">
  ...
  <sbb-navigation-marker></sbb-navigation-marker
></sbb-navigation-marker>
```

<!-- Auto Generated Below -->

## Properties

| Name   | Attribute | Privacy | Type         | Default            | Description                         |
| ------ | --------- | ------- | ------------ | ------------------ | ----------------------------------- |
| `size` | `size`    | public  | `'l' \| 's'` | `'l' / 's' (lean)` | Marker size variant, either s or l. |

## Methods

| Name     | Privacy | Description | Parameters                                                       | Return | Inherited From |
| -------- | ------- | ----------- | ---------------------------------------------------------------- | ------ | -------------- |
| `reset`  | public  |             |                                                                  | `void` |                |
| `select` | public  |             | `action: SbbNavigationButtonElement \| SbbNavigationLinkElement` | `void` |                |

## Slots

| Name | Description                                                                                                          |
| ---- | -------------------------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-navigation-button`/`sbb-navigation-link` elements into the `sbb-navigation-marker`. |
