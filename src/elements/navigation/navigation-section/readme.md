The `sbb-navigation-section` is a container for both [sbb-navigation-list](/docs/elements-sbb-navigation-sbb-navigation-list--docs) and [sbb-button](/docs/elements-sbb-button--docs).
Its intended use is inside a [sbb-navigation](/docs/elements-sbb-navigation-sbb-navigation--docs) component, in which it can be seen as a 'second-level' panel.

## Trigger

To display the `sbb-navigation-section` component you must provide a trigger element using the `trigger` property,
Optionally a label can be provided via slot or via the `titleContent` property.

```html
<sbb-navigation-section trigger="nav1" titleContent="Title 1">
  <sbb-navigation-list label="Label 1.1">
    <sbb-navigation-link aria-current="page" href="...">Label 1.1.1</sbb-navigation-link>
    <sbb-navigation-link href="...">Label 1.1.2</sbb-navigation-link>
    ...
  </sbb-navigation-list>
  <sbb-button>Something</sbb-button>
</sbb-navigation-section>
```

## Accessibility

When a navigation action is marked to indicate the user is currently on that page, `aria-current="page"` should be set on that action.
Similarly, if a navigation action is marked to indicate a selected option (e.g., the selected language) `aria-pressed` should be set on that action.

<!-- Auto Generated Below -->

## Properties

| Name                     | Attribute                  | Privacy | Type                            | Default | Description                                                                                                        |
| ------------------------ | -------------------------- | ------- | ------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `accessibilityBackLabel` | `accessibility-back-label` | public  | `string`                        | `''`    | This will be forwarded as aria-label to the back button element.                                                   |
| `accessibilityLabel`     | `accessibility-label`      | public  | `string`                        | `''`    | This will be forwarded as aria-label to the nav element and is read as a title of the navigation-section.          |
| `titleContent`           | `title-content`            | public  | `string`                        | `''`    | The label to be shown before the action list.                                                                      |
| `trigger`                | `trigger`                  | public  | `string \| HTMLElement \| null` | `null`  | The element that will trigger the navigation section. Accepts both a string (id of an element) or an HTML element. |

## Methods

| Name    | Privacy | Description                                    | Parameters | Return | Inherited From |
| ------- | ------- | ---------------------------------------------- | ---------- | ------ | -------------- |
| `close` | public  | Closes the navigation section.                 |            | `void` |                |
| `open`  | public  | Opens the navigation section on trigger click. |            | `void` |                |

## Slots

| Name | Description                                                            |
| ---- | ---------------------------------------------------------------------- |
|      | Use the unnamed slot to add content into the `sbb-navigation-section`. |
