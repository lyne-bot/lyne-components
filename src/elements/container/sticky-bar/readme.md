The `sbb-sticky-bar` is a component meant to be slotted inside a `sbb-container` component.
It is displayed with sticky positioning at the bottom of the container that contains it.

```html
<sbb-container>
  <sbb-sticky-bar>
    <!-- Sticky bar content. -->
  </sbb-sticky-bar>
</sbb-container>
```

## Animate from sticky to normal content flow and vice versa

By default, the sticky bar is set to `position: sticky`. In certain cases, the consumer needs
to control the sliding out (or sliding in) of the sticky bar.
By calling the `stick()` or `unstick()` methods, the position property is toggled
between `position: sticky` and `position: relative` by displaying a slide animation. When the sticky bar is `unstick`,
the `sbb-sticky-bar` will behave like a normal container without any sticky behavior.
Whenever the sticky bar is currently not sticky (e.g. scrolled down),
calling `stick()` or `unstick()` won't have any visual effect.

An example use case is to call `unstick()`, which visually slides out the sticky bar, and
then the consumer can remove it from the DOM by listening to the `didUnstick` event.

## Slots

The `sbb-sticky-bar` content is provided via an unnamed slot.

## Style

The `sbb-sticky-bar` inherits its variant from the `sbb-container` it's placed in.
Optionally the user can set the `color` property on the `sbb-sticky-bar` in order to override the one inherited by the `sbb-container`. The color is only applied when the sticky bar is sticking, and will become transparent once it settles on the bottom of the container.

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type                        | Default | Description                                          |
| ------- | --------- | ------- | --------------------------- | ------- | ---------------------------------------------------- |
| `color` | `color`   | public  | `'white' \| 'milk' \| null` | `null`  | Color of the container, like transparent, white etc. |

## Methods

| Name      | Privacy | Description                                                       | Parameters | Return | Inherited From |
| --------- | ------- | ----------------------------------------------------------------- | ---------- | ------ | -------------- |
| `stick`   | public  | Animates from normal content flow position to `position: sticky`. |            | `void` |                |
| `unstick` | public  | Animates `position: sticky` to normal content flow position.      |            | `void` |                |

## Events

| Name          | Type                | Description                                                                                      | Inherited From |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------------ | -------------- |
| `didStick`    | `CustomEvent<void>` | Emits when the animation from normal content flow to `position: sticky` ends.                    |                |
| `didUnstick`  | `CustomEvent<void>` | Emits when the animation from `position: sticky` to normal content flow ends.                    |                |
| `willStick`   | `CustomEvent<void>` | Emits when the animation from normal content flow to `position: sticky` starts. Can be canceled. |                |
| `willUnstick` | `CustomEvent<void>` | Emits when the animation from `position: sticky` to normal content flow starts. Can be canceled. |                |

## CSS Properties

| Name                                         | Default                            | Description                                                                                                                                                                                     |
| -------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-sticky-bar-bottom-overlapping-height` | `0px`                              | Define an additional area where the sticky bar overlaps the following content on the bottom. This area becomes visible when the sticky bar transitions from sticky to the normal document flow. |
| `--sbb-sticky-bar-padding-block`             | `var(--sbb-spacing-responsive-xs)` | Block padding of the sticky bar.                                                                                                                                                                |
| `--sbb-sticky-bar-z-index`                   |                                    | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable.                                                                                                 |

## Slots

| Name | Description                                            |
| ---- | ------------------------------------------------------ |
|      | Use the unnamed slot to add content to the sticky bar. |
