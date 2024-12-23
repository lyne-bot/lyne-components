The `sbb-alert` is a component which should be used to display important messages to a client.

Multiple instances of this component can be used within
the [sbb-alert-group](/docs/elements-sbb-alert-sbb-alert-group--docs) component.

## Slots

The text content is projected using the unnamed slot which could also contain one or more `sbb-link`.
The title content uses the slot named `title` or alternatively the `titleContent` property.
The component can optionally display a `sbb-icon` at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-alert title-content="Interruption between Berne and Olten" icon-name="disruption">
  Between Bern and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
  construction work will take place. You have to expect changed travel times and changed
  connections.
  <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
</sbb-alert>

<sbb-alert>
  <span slot="title">Interruption between Berne and Olten</span>
  <sbb-icon slot="icon" name="disruption"></sbb-icon>
  Between Bern and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
  construction work will take place. You have to expect changed travel times and changed
  connections.
  <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
</sbb-alert>
```

The `sbb-alert` can optionally be hidden by a user, if the `readonly` prop is not set.

```html
<sbb-alert title-content="Interruption between Berne and Olten" readonly>
  Between Bern and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
  construction work will take place. You have to expect changed travel times and changed
  connections.
</sbb-alert>
```

## Style

Users can choose between three `size`: `s`, `m` (default) and `l`.

```html
<sbb-alert size="s"> ... </sbb-alert>

<sbb-alert size="l"> ... </sbb-alert>
```

## Accessibility

Accessibility is mainly done by wrapping the alerts into the `sbb-alert-group`.

The description text is wrapped into an `<p>` element to guarantee the semantic meaning.

Avoid slotting block elements (e.g. `<div>`) as this violates semantic rules and can have negative effects on screen readers.

## Animation

Set the `animation` property to manage which animations are enabled.
As a base rule, opening animations should be active if an alert arrives after the initial page load.

<!-- Auto Generated Below -->

## Properties

| Name           | Attribute       | Privacy | Type                                   | Default            | Description                                                                                                                                                      |
| -------------- | --------------- | ------- | -------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animation`    | `animation`     | public  | `'open' \| 'close' \| 'all' \| 'none'` | `'all'`            | The enabled animations.                                                                                                                                          |
| `iconName`     | `icon-name`     | public  | `string`                               | `'info'`           | Name of the icon which will be forward to the nested `sbb-icon`. Choose the icons from https://icons.app.sbb.ch. Styling is optimized for icons of type HIM-CUS. |
| `isOpen`       | -               | public  | `boolean`                              |                    | Whether the element is open.                                                                                                                                     |
| `readonly`     | `readonly`      | public  | `boolean`                              | `false`            | Whether the alert is readonly. In readonly mode, there is no dismiss button offered to the user.                                                                 |
| `size`         | `size`          | public  | `'s' \| 'm' \| 'l'`                    | `'m' / 's' (lean)` | You can choose between `s`, `m` or `l` size.                                                                                                                     |
| `titleContent` | `title-content` | public  | `string`                               | `''`               | Content of title.                                                                                                                                                |
| `titleLevel`   | `title-level`   | public  | `SbbTitleLevel`                        | `'3'`              | Level of title, will be rendered as heading tag (e.g. h3). Defaults to level 3.                                                                                  |

## Methods

| Name    | Privacy | Description      | Parameters | Return | Inherited From          |
| ------- | ------- | ---------------- | ---------- | ------ | ----------------------- |
| `close` | public  | Close the alert. |            | `void` | SbbOpenCloseBaseElement |
| `open`  | public  | Open the alert.  |            | `void` | SbbOpenCloseBaseElement |

## Events

| Name        | Type                | Description                                               | Inherited From          |
| ----------- | ------------------- | --------------------------------------------------------- | ----------------------- |
| `didClose`  | `CustomEvent<void>` | Emits when the closing animation ends.                    | SbbOpenCloseBaseElement |
| `didOpen`   | `CustomEvent<void>` | Emits when the opening animation ends.                    | SbbOpenCloseBaseElement |
| `willClose` | `CustomEvent<void>` | Emits when the closing animation starts. Can be canceled. | SbbOpenCloseBaseElement |
| `willOpen`  | `CustomEvent<void>` | Emits when the opening animation starts.                  | SbbOpenCloseBaseElement |

## Slots

| Name    | Description                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------ |
|         | Use the unnamed slot to add content to the `sbb-alert`.                                                      |
| `icon`  | Should be a `sbb-icon` which is displayed next to the title. Styling is optimized for icons of type HIM-CUS. |
| `title` | Title content.                                                                                               |
