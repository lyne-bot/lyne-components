# sbb-link

The `<sbb-link>` implements the design of the Lyne Link. It can both be used as a anchor (`<a>`)
(if the href property is set) or as a button (`<button>`). If the `<sbb-link>` is placed inside another
anchor or button tag, it is internally rendered as a span in order to not break HTML functionality.
  
<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                   | Description                                                                                                                                                                                                                     | Type                                                            | Default     |
| -------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------- |
| `accessibilityControls`    | `accessibility-controls`    | When an interaction of this button has an impact on another element(s) in the document, the id of that element(s) needs to be set. The value will be forwarded to the 'aria-controls' attribute to the relevant nested element. | `string`                                                        | `undefined` |
| `accessibilityDescribedby` | `accessibility-describedby` | This will be forwarded as aria-describedby to the relevant nested element.                                                                                                                                                      | `string`                                                        | `undefined` |
| `accessibilityHaspopup`    | `accessibility-haspopup`    | If you use the button to trigger another widget which itself is covering the page, you must provide an according attribute for aria-haspopup.                                                                                   | `"dialog" \| "grid" \| "listbox" \| "menu" \| "tree" \| "true"` | `undefined` |
| `accessibilityLabel`       | `accessibility-label`       | This will be forwarded as aria-label to the relevant nested element.                                                                                                                                                            | `string`                                                        | `undefined` |
| `accessibilityLabelledby`  | `accessibility-labelledby`  | This will be forwarded as aria-labelledby to the relevant nested element.                                                                                                                                                       | `string`                                                        | `undefined` |
| `disabled`                 | `disabled`                  | Whether the button is disabled.                                                                                                                                                                                                 | `boolean`                                                       | `false`     |
| `download`                 | `download`                  | Whether the browser will show the download dialog on click.                                                                                                                                                                     | `boolean`                                                       | `undefined` |
| `form`                     | `form`                      | The <form> element to associate the button with.                                                                                                                                                                                | `string`                                                        | `undefined` |
| `href`                     | `href`                      | The href value you want to link to (if its not present link becomes a button).                                                                                                                                                  | `string`                                                        | `undefined` |
| `iconName`                 | `icon-name`                 | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons/. Inline variant doesn't support icons.                                                 | `string`                                                        | `undefined` |
| `iconPlacement`            | `icon-placement`            | Moves the icon to the end of the component if set to true.                                                                                                                                                                      | `"end" \| "start"`                                              | `'start'`   |
| `idValue`                  | `id-value`                  | Pass in an id, if you need to identify the inner element.                                                                                                                                                                       | `string`                                                        | `undefined` |
| `isStatic`                 | `static`                    | Set this property to true if you want only a visual representation of a link, but no interaction (a span instead of a link/button will be rendered).                                                                            | `boolean`                                                       | `false`     |
| `name`                     | `name`                      | The name attribute to use for the button.                                                                                                                                                                                       | `string`                                                        | `undefined` |
| `negative`                 | `negative`                  | Negative coloring variant flag.                                                                                                                                                                                                 | `boolean`                                                       | `false`     |
| `rel`                      | `rel`                       | The relationship of the linked URL as space-separated link types.                                                                                                                                                               | `string`                                                        | `undefined` |
| `target`                   | `target`                    | Where to display the linked URL.                                                                                                                                                                                                | `string`                                                        | `undefined` |
| `textSize`                 | `text-size`                 | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used.                                                                                                      | `"m" \| "s" \| "xs"`                                            | `'s'`       |
| `type`                     | `type`                      | The type attribute to use for the button.                                                                                                                                                                                       | `"button" \| "reset" \| "submit"`                               | `undefined` |
| `value`                    | `value`                     | The value attribute to use for the button.                                                                                                                                                                                      | `string`                                                        | `undefined` |
| `variant`                  | `variant`                   | Variant of the link (block or inline).                                                                                                                                                                                          | `"block" \| "inline"`                                           | `'block'`   |


## Events

| Event                   | Description                      | Type               |
| ----------------------- | -------------------------------- | ------------------ |
| `sbb-link-button_click` | Emits the event on button click. | `CustomEvent<any>` |


## Slots

| Slot        | Description                                  |
| ----------- | -------------------------------------------- |
| `"icon"`    | Slot used to display the icon, if one is set |
| `"unnamed"` | Link Content                                 |


## Dependencies

### Used by

 - [sbb-alert](../sbb-alert)
 - [sbb-teaser-hero](../sbb-teaser-hero)

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-link --> sbb-icon
  sbb-alert --> sbb-link
  sbb-teaser-hero --> sbb-link
  style sbb-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


