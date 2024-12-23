The `sbb-toast` is a component that can be used to display toast notifications.

It can be shown/dismissed by calling the `open/close` methods.
Only one toast can ever be opened at one time:
if a new `sbb-toast` is opened while a previous message is still showing, the older message will be automatically dismissed.

```html
<sbb-button onclick="document.querySelector('sbb-toast').open()">Open toast</sbb-button>
<sbb-toast>Toast content</sbb-toast>
```

## Important note

You should carefully consider every use of the `sbb-toast` component since it can be a source of
stress for people with visual impairments (see the ["Accessibility"](#accessibility) section for more info).

Here are a few tips for correct usage:

- Try to avoid actions inside a `sbb-toast` since they are not easily reachable;
- If an action is needed, you should provide an alternative way to perform it;
- If not strictly necessary, use the `polite` (_default_) configuration since it is less aggressive for screen-reader users.

## Slots

It is possible to provide a text via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-button onclick="document.querySelector('sbb-toast').open()">Open toast</sbb-button>
<sbb-toast icon-name="dog-small">Toast content</sbb-toast>
```

A `sbb-toast` can also be given a custom action that, if marked with the `sbb-toast-close` attribute, will also dismiss it.

```html
<sbb-button onclick="document.querySelector('sbb-toast').open()">Open toast</sbb-button>
<sbb-toast position="bottom-left">
  Toast content
  <!-- Toast action can be a button -->
  <sbb-transparent-button
    slot="action"
    icon-name="clock-small"
    sbb-toast-close
  ></sbb-transparent-button>
  <!-- Or a link -->
  <sbb-link-button slot="action">Link action</sbb-link-button>
</sbb-toast>
```

## Style

If the `dismissible` property is set to true, a close button is displayed at the component end.
The time before the component auto-closing can be set with the `timeout` property (in milliseconds, default is 6000).

The position on the page where the toast will be opened can be configured with the `position` property,
which accepts all the combinations of the vertical positions `top` and `bottom`
with the horizontal positions `left`, `start`, `center`, `right` and `end` (default: `bottom-center`).

```html
<sbb-button onclick="document.querySelector('sbb-toast').open()">Open toast bottom left</sbb-button>
<sbb-toast position="bottom-left" dismissible="true">Toast content</sbb-toast>

<sbb-button onclick="document.querySelector('sbb-toast#top-center').open()"
  >Open toast top center</sbb-button
>
<sbb-toast position="top-center" timeout="5000" id="top-center">Toast content</sbb-toast>
```

## Accessibility

The `sbb-toast` announces messages via an aria-live region.
Use the `politeness` property to customize the politeness announcement behaviour.
Check [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#live_regions) for further info.

The `sbb-toast` does not move focus to the toast element, because it would disrupt users in the middle of a workflow.

For any action offered in the `sbb-toast`, your application should provide an alternative way to perform the action
(e.g. a keyboard combination).

Avoid setting a `timeout` for toasts that have an action available,
as screen reader users may want to navigate to the toast element to activate the action.

### Known issue

Slotted text is not interpreted correctly by screen readers on Chrome.
To address the problem, the component will automatically wrap any slotted text in a `span` element.
Unless strictly necessary, we advise you not to wrap it preventively and let the component do it for you.

```html
<sbb-toast position="bottom-left">
  <!-- This text would not be read on Chrome -->
  Free text node
</sbb-toast>

<sbb-toast position="bottom-left">
  <span>Toast content</span>
  <!-- This is OK! -->
</sbb-toast>
```

<!-- Auto Generated Below -->

## Properties

| Name          | Attribute     | Privacy | Type                               | Default           | Description                                                                                                                                         |
| ------------- | ------------- | ------- | ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dismissible` | `dismissible` | public  | `boolean`                          | `false`           | Whether the toast has a close button.                                                                                                               |
| `iconName`    | `icon-name`   | public  | `string`                           | `''`              | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                    |
| `isOpen`      | -             | public  | `boolean`                          |                   | Whether the element is open.                                                                                                                        |
| `politeness`  | `politeness`  | public  | `'polite' \| 'assertive' \| 'off'` | `'polite'`        | The ARIA politeness level. Check https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA\_Live\_Regions#live\_regions for further info |
| `position`    | `position`    | public  | `SbbToastPosition`                 | `'bottom-center'` | The position where to place the toast.                                                                                                              |
| `timeout`     | `timeout`     | public  | `number`                           | `6000`            | The length of time in milliseconds to wait before automatically dismissing the toast. If 0, it stays open indefinitely.                             |

## Methods

| Name    | Privacy | Description                                                                     | Parameters | Return | Inherited From          |
| ------- | ------- | ------------------------------------------------------------------------------- | ---------- | ------ | ----------------------- |
| `close` | public  | Close the toast.                                                                |            | `void` | SbbOpenCloseBaseElement |
| `open`  | public  | Open the toast. If there are other opened toasts in the page, close them first. |            | `void` | SbbOpenCloseBaseElement |

## Events

| Name        | Type                | Description                                                                    | Inherited From          |
| ----------- | ------------------- | ------------------------------------------------------------------------------ | ----------------------- |
| `didClose`  | `CustomEvent<void>` | Emits whenever the `sbb-toast` is closed.                                      | SbbOpenCloseBaseElement |
| `didOpen`   | `CustomEvent<void>` | Emits whenever the `sbb-toast` is opened.                                      | SbbOpenCloseBaseElement |
| `willClose` | `CustomEvent<void>` | Emits whenever the `sbb-toast` begins the closing transition. Can be canceled. | SbbOpenCloseBaseElement |
| `willOpen`  | `CustomEvent<void>` | Emits whenever the `sbb-toast` starts the opening transition. Can be canceled. | SbbOpenCloseBaseElement |

## CSS Properties

| Name                  | Default                              | Description                                                                                                                                                                                                   |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-toast-z-index` | `var(--sbb-overlay-default-z-index)` | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`. |

## Slots

| Name     | Description                                             |
| -------- | ------------------------------------------------------- |
|          | Use the unnamed slot to add content to the `sbb-toast`. |
| `action` | Provide a custom action for this toast.                 |
| `icon`   | Assign a custom icon via slot.                          |
