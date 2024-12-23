The `sbb-overlay` component provides a way to present content on top of the app's content
and it's similar to the [sbb-dialog](/docs/elements-sbb-dialog-sbb-dialog--docs).
It offers the following features:

- disables scrolling of the page content while open;
- manages focus properly by setting it on the first focusable element;
- has a close button, which is always visible;
- can display a back button;
- adds the appropriate ARIA roles automatically.

```html
<sbb-overlay id="my-overlay">
  <p>Overlay content.</p>
</sbb-overlay>
```

## Slots

There is only one unnamed slot to provide the overlay content.

## Style

Setting the `expanded` property will cause the `sbb-overlay` component to take up the full width of the page.

It's possible to display the component in `negative` variant using the self-named property.

```html
<sbb-overlay negative>
  <p>Overlay content.</p>
</sbb-overlay>
```

## Interactions

In order to show the overlay, you need to call the `open(event?: PointerEvent)` method on the `sbb-overlay` component.
It is necessary to pass the event object to the `open()` method to allow the overlay to detect
whether it has been opened by click or keyboard, so that the focus can be better handled.

```html
<sbb-button
  label="Open overlay"
  click="openDialog(event, 'my-overlay')"
  aria-haspopup="dialog"
  aria-controls="my-overlay"
></sbb-button>

<sbb-overlay id="my-overlay">
  <p>Overlay content.</p>
</sbb-overlay>

<script>
  const openOverlay = (event, id) => {
    const overlay = document.getElementById(id);
    overlay.open(event);
  };
</script>
```

To dismiss the overlay, you need to get a reference to the `sbb-overlay` element and call
the `close(result?: any, target?: HTMLElement)` method, which will close the overlay element and
emit a close event with an optional result as a payload.

The component can also be dismissed by clicking on the close button, clicking on the backdrop, pressing the `Esc` key,
or, if an element within the `sbb-overlay` has the `sbb-overlay-close` attribute, by clicking on it.

You can also set the property `backButton` on the `sbb-overlay-title` component to display the back button in the title section which will emit the event `requestBackAction` when clicked.

## Accessibility

When using a button to trigger the overlay, ensure to manage the appropriate ARIA attributes on the button element itself. This includes: `aria-haspopup="dialog"` that signals to assistive technologies that the button controls an overlay element,
`aria-controls="overlay-id"` that connects the button to the overlay by referencing the overlay's ID. Consider using `aria-expanded` to indicate the overlay's current state (open or closed).

<!-- Auto Generated Below -->

## Properties

| Name                      | Attribute                   | Privacy | Type      | Default | Description                                                                                                           |
| ------------------------- | --------------------------- | ------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `accessibilityBackLabel`  | `accessibility-back-label`  | public  | `string`  | `''`    | This will be forwarded as aria-label to the back button element.                                                      |
| `accessibilityCloseLabel` | `accessibility-close-label` | public  | `string`  | `''`    | This will be forwarded as aria-label to the close button element.                                                     |
| `accessibilityLabel`      | `accessibility-label`       | public  | `string`  | `''`    | This will be forwarded as aria-label to the relevant nested element to describe the purpose of the overlay.           |
| `backButton`              | `back-button`               | public  | `boolean` | `false` | Whether a back button is displayed next to the title.                                                                 |
| `expanded`                | `expanded`                  | public  | `boolean` | `false` | Whether to allow the overlay content to stretch to full width. By default, the content has the appropriate page size. |
| `isOpen`                  | -                           | public  | `boolean` |         | Whether the element is open.                                                                                          |
| `negative`                | `negative`                  | public  | `boolean` | `false` | Negative coloring variant flag.                                                                                       |

## Methods

| Name    | Privacy | Description           | Parameters                         | Return | Inherited From          |
| ------- | ------- | --------------------- | ---------------------------------- | ------ | ----------------------- |
| `close` | public  | Closes the component. | `result: any, target: HTMLElement` | `any`  | SbbOpenCloseBaseElement |
| `open`  | public  | Opens the component.  |                                    | `void` | SbbOpenCloseBaseElement |

## Events

| Name                | Type                                       | Description                                                                      | Inherited From          |
| ------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- | ----------------------- |
| `didClose`          | `CustomEvent<SbbOverlayCloseEventDetails>` | Emits whenever the `sbb-overlay` is closed.                                      | SbbOpenCloseBaseElement |
| `didOpen`           | `CustomEvent<void>`                        | Emits whenever the `sbb-overlay` is opened.                                      | SbbOpenCloseBaseElement |
| `requestBackAction` | `CustomEvent<void>`                        | Emits whenever the back button is clicked.                                       |                         |
| `willClose`         | `CustomEvent<void>`                        | Emits whenever the `sbb-overlay` begins the closing transition. Can be canceled. | SbbOpenCloseBaseElement |
| `willOpen`          | `CustomEvent<void>`                        | Emits whenever the `sbb-overlay` starts the opening transition. Can be canceled. | SbbOpenCloseBaseElement |

## CSS Properties

| Name                    | Default                              | Description                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-overlay-z-index` | `var(--sbb-overlay-default-z-index)` | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`. |

## Slots

| Name | Description                                                |
| ---- | ---------------------------------------------------------- |
|      | Use the unnamed slot to provide a content for the overlay. |
