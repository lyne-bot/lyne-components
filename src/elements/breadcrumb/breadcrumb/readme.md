The `sbb-breadcrumb` is a component used to display a link to a page.

When it's used within the [sbb-breadcrumb-group](/docs/elements-sbb-breadcrumb-sbb-breadcrumb-group--docs) component,
it can display the list of the links the user visited to arrive at the current page.

## Slots

It is possible to provide a text via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
Text and icon are not exclusive and can be used together.

```html
<sbb-breadcrumb href="/contact">Contact us</sbb-breadcrumb>

<sbb-breadcrumb href="/book-your-trip" icon-name="travel-backpack-medium"></sbb-breadcrumb>

<sbb-breadcrumb href="/info">
  Info
  <sbb-icon slot="icon" name="circle-information-small"></sbb-icon>
</sbb-breadcrumb>
```

## Link properties

It's possible to set all the link related properties (`download`, `href`, `rel` and `target`).

```html
<sbb-breadcrumb href="/info" target="_blank" rel="help">Info</sbb-breadcrumb>
```

## Accessibility

The `aria-current` property should be used to make the breadcrumb read correctly by screen-readers when the component
is used in the `sbb-breadcrumb-group`.

By default, the `sbb-breadcrumb-group` component sets `aria-current="page"` on the last slotted `sbb-breadcrumb`.

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                       | Default | Description                                                                                                                      |
| -------------------- | --------------------- | ------- | -------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                   | `''`    | This will be forwarded as aria-label to the inner anchor element.                                                                |
| `download`           | `download`            | public  | `boolean`                  | `false` | Whether the browser will show the download dialog on click.                                                                      |
| `href`               | `href`                | public  | `string`                   | `''`    | The href value you want to link to.                                                                                              |
| `iconName`           | `icon-name`           | public  | `string`                   | `''`    | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `rel`                | `rel`                 | public  | `string`                   | `''`    | The relationship of the linked URL as space-separated link types.                                                                |
| `target`             | `target`              | public  | `LinkTargetType \| string` | `''`    | Where to display the linked URL.                                                                                                 |

## Slots

| Name   | Description                                            |
| ------ | ------------------------------------------------------ |
|        | Use the unnamed slot to add content to the breadcrumb. |
| `icon` | Use this to display an icon as breadcrumb.             |
