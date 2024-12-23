The `sbb-expansion-panel` is a component which acts as an expandable summary-details widget.

It can be used standalone or inside a [sbb-accordion](/docs/elements-sbb-accordion-sbb-accordion--docs).

## Slots

In order to correctly display the component, it must be used together with
a [sbb-expansion-panel-header](/docs/elements-sbb-accordion-sbb-expansion-panel-header--docs)
and a [sbb-expansion-panel-content](/docs/elements-sbb-accordion-sbb-expansion-panel-content--docs);
the first will work as a state controller, the last will act as the expandable content.

These two components automatically fill the two available slots, named `header` and `content`.

```html
<sbb-expansion-panel>
  <sbb-expansion-panel-header>This is the header.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

## States

The visibility of the content is controlled by the value of the `expanded` property.

```html
<sbb-expansion-panel expanded> ... </sbb-expansion-panel>
```

The `disabled` state can be set using the self-named variable. In this state, the component can not be collapsed or expanded.

```html
<sbb-expansion-panel disabled> ... </sbb-expansion-panel>
```

## Style

The component has two background options (`milk` and `white`, which is the default) that can be set using the `color` variable.

```html
<sbb-expansion-panel color="milk"> ... </sbb-expansion-panel>
```

The component has two different sizes, `l` (default) and `s`, which can be changed using the `size` property.
The property is overridden when the component is used within a `sbb-accordion`.

```html
<sbb-expansion-panel size="s"> ... </sbb-expansion-panel>
```

It's also possible to display the `sbb-expansion-panel` without border by setting the `borderless` variable.

```html
<sbb-expansion-panel borderless> ... </sbb-expansion-panel>
```

Using the `titleLevel` variable, it's possible to wrap the `sbb-expansion-panel-header` in a heading tag;
if it's unset, a `<div>` is used as a wrapper.

```html
<sbb-expansion-panel level="4">
  <sbb-expansion-panel-header
    >This is the header, and it will be wrapped in a h4 tag.</sbb-expansion-panel-header
  >
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

## Accessibility

When the `sbb-expansion-panel-header` and the `sbb-expansion-panel-content` are slotted into the component,
they both receive an `id`, if not set; then, the content's `id` is set as `aria-controls` attribute of the header,
and the header's `id` is set as `aria-labelledby` attribute on the content.

The `expanded` attribute is used to correctly set the `aria-expanded` attribute on the header
and the `aria-hidden` attribute on the content.

### Disabled elements

Generally speaking, `disabled` elements are considered a bad pattern for accessibility. They are invisible to assistive
technology and do not provide the reason for which they are disabled.
To partially address the problem, disabled elements are kept focusable (other interactions are still prevented).
However, it is still the consumers responsibility to provide a reason for the element being disabled.
This can be achieved by adding an `aria-label`, `aria-labelledby` or `aria-describedby` attribute.

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute     | Privacy | Type                    | Default            | Description                                                            |
| ------------ | ------------- | ------- | ----------------------- | ------------------ | ---------------------------------------------------------------------- |
| `borderless` | `borderless`  | public  | `boolean`               | `false`            | Whether the panel has no border.                                       |
| `color`      | `color`       | public  | `'white' \| 'milk'`     | `'white'`          | The background color of the panel.                                     |
| `disabled`   | `disabled`    | public  | `boolean`               | `false`            | Whether the panel is disabled, so its expanded state can't be changed. |
| `expanded`   | `expanded`    | public  | `boolean`               | `false`            | Whether the panel is expanded.                                         |
| `size`       | `size`        | public  | `'s' \| 'l'`            | `'l' / 's' (lean)` | Size variant, either l or s.                                           |
| `titleLevel` | `title-level` | public  | `SbbTitleLevel \| null` | `null`             | Heading level; if unset, a `div` will be rendered.                     |

## Events

| Name        | Type                | Description                                                             | Inherited From |
| ----------- | ------------------- | ----------------------------------------------------------------------- | -------------- |
| `didClose`  | `CustomEvent<void>` | Emits whenever the `sbb-expansion-panel` is closed.                     |                |
| `didOpen`   | `CustomEvent<void>` | Emits whenever the `sbb-expansion-panel` is opened.                     |                |
| `willClose` | `CustomEvent<void>` | Emits whenever the `sbb-expansion-panel` begins the closing transition. |                |
| `willOpen`  | `CustomEvent<void>` | Emits whenever the `sbb-expansion-panel` starts the opening transition. |                |

## Slots

| Name | Description                                                                                             |
| ---- | ------------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add a `sbb-expansion-panel-header` and a `sbb-expansion-panel-content` element. |
