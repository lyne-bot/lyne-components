# lyne-accordion-item



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute       | Description                                                       | Type                                     | Default     |
| ---------------------- | --------------- | ----------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `disabled`             | `disabled`      | If set, an accordion can not be toggled                           | `boolean`                                | `undefined` |
| `eventId`              | `event-id`      | Id which is sent in the event after opening/closing accordion     | `string`                                 | `undefined` |
| `heading` _(required)_ | `heading`       | Text to show as title for the accordion.                          | `string`                                 | `undefined` |
| `headingLevel`         | `heading-level` | Heading level.                                                    | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `'1'`       |
| `open`                 | `open`          | Set to true to open the accordion item. Set to false to close it. | `boolean`                                | `undefined` |


## Slots

| Slot        | Description                                                                                                                                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"content"` | Pass html-content to show as the content of the accordion. Use flat html: This is ok: `<p>Some text</p><p>Some other text</p>` This instead would not be ok: `<div><p>Some text</p><p>Some other text</p></div>` |
| `"icon"`    | Pass an svg to display an icon left to the title.                                                                                                                                                                |


----------------------------------------------


