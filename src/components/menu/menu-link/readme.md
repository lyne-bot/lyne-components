The component represents a link element contained by the [sbb-menu](/docs/components-sbb-menu-sbb-menu--docs) component.

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-menu-link href="#">Text</sbb-menu-link>

<sbb-menu-link href="#" icon-name="pie-small">Another text</sbb-menu-link>
```

An amount can be rendered at the end of the action element as white text in a red circle via the `amount` property.

```html
<sbb-menu-link href="#" amount="123">Amount text</sbb-menu-link>
```

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

```html
<sbb-menu-link href="#info" target="_blank">Link</sbb-menu-link>
```

## Style

For cases where smaller outer paddings are needed,
you can set the css variable `--sbb-menu-action-outer-horizontal-padding` to your desired outer padding.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type                                    | Default | Description                                                                                                                      |
| ---------- | ----------- | ------- | --------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `amount`   | `amount`    | public  | `string \| undefined`                   |         | Value shown as badge at component end.                                                                                           |
| `iconName` | `icon-name` | public  | `string \| undefined`                   |         | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `disabled` | `disabled`  | public  | `boolean \| undefined`                  | `false` | Whether the button is disabled.                                                                                                  |
| `href`     | `href`      | public  | `string \| undefined`                   |         | The href value you want to link to.                                                                                              |
| `target`   | `target`    | public  | `LinkTargetType \| string \| undefined` |         | Where to display the linked URL.                                                                                                 |
| `rel`      | `rel`       | public  | `string \| undefined`                   |         | The relationship of the linked URL as space-separated link types.                                                                |
| `download` | `download`  | public  | `boolean \| undefined`                  |         | Whether the browser will show the download dialog on click.                                                                      |

## Slots

| Name   | Description                                                                         |
| ------ | ----------------------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the `sbb-menu-link`.                         |
| `icon` | Use this slot to provide an icon. If `icon-name` is set, a `sbb-icon` will be used. |
