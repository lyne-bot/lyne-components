The `sbb-selection-expansion-panel` component wraps either a [sbb-checkbox](/docs/components-sbb-checkbox-sbb-checkbox--docs)
or a [sbb-radio-button](/docs/components-sbb-radio-button-sbb-radio-button--docs) that can optionally toggle a content section.

The content section can be opened by checking `sbb-checkbox-panel` or selecting the `sbb-radio-button-panel`.
Additionally, clicking on all the upper area sets the checked state and therefore opens the content;
clicking on the content area does not toggle anything.

The selection panel can also be used inside a [sbb-radio-button-group](/docs/components-sbb-radio-button-sbb-radio-button-group--docs)
or a [sbb-checkbox-group](/docs/components-sbb-checkbox-sbb-checkbox-group--docs).

### With `sbb-radio-button-group`

```html
<sbb-radio-button-group>
  <sbb-selection-expansion-panel>
    <sbb-card-badge>
      <span>%</span>
      <span>from CHF</span>
      <span>19.99</span>
    </sbb-card-badge>
    <sbb-radio-button-panel>
      Value
      <span slot="subtext">Subtext</span>
      <span slot="suffix">
        <sbb-icon></sbb-icon>
        <span class="sbb-text-xs sbb-text--bold">CHF</span>
        <span class="sbb-text-m sbb-text--bold">40.00</span>
      </span>
    </sbb-radio-button-panel>
    <div slot="content">Inner Content</div>
  </sbb-selection-expansion-panel>
</sbb-radio-button-group>
```

### With `sbb-checkbox-group`

```html
<sbb-checkbox-group>
  <sbb-selection-expansion-panel>
    <sbb-card-badge>
      <span>%</span>
      <span>from CHF</span>
      <span>19.99</span>
    </sbb-card-badge>
    <sbb-checkbox-panel>
      Value
      <span slot="subtext">Subtext</span>
      <span slot="suffix">
        <sbb-icon name="cross-small"></sbb-icon>
        <span class="sbb-text-xs sbb-text--bold">CHF</span>
        <span class="sbb-text-m sbb-text--bold">40.00</span>
      </span>
    </sbb-checkbox-panel>
    <div slot="content">Inner Content</div>
  </sbb-selection-expansion-panel>
</sbb-checkbox-group>
```

## Style

The component has two background options that can be set using the `color` variable: `milk` and `white` (default).

```html
<sbb-selection-expansion-panel color="milk"> ... </sbb-selection-expansion-panel>
```

It's also possible to display the `sbb-selection-expansion-panel` without border by setting the `borderless` variable to `true`.

```html
<sbb-selection-expansion-panel borderless> ... </sbb-selection-expansion-panel>
```

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute    | Privacy | Type                | Default   | Description                                    |
| ------------ | ------------ | ------- | ------------------- | --------- | ---------------------------------------------- |
| `color`      | `color`      | public  | `'white' \| 'milk'` | `'white'` | The background color of the panel.             |
| `forceOpen`  | `force-open` | public  | `boolean`           | `false`   | Whether the content section is always visible. |
| `borderless` | `borderless` | public  | `boolean`           | `false`   | Whether the unselected panel has a border.     |

## Events

| Name        | Type                | Description                                                       | Inherited From |
| ----------- | ------------------- | ----------------------------------------------------------------- | -------------- |
| `willOpen`  | `CustomEvent<void>` | Emits whenever the content section starts the opening transition. |                |
| `didOpen`   | `CustomEvent<void>` | Emits whenever the content section is opened.                     |                |
| `willClose` | `CustomEvent<void>` | Emits whenever the content section begins the closing transition. |                |
| `didClose`  | `CustomEvent<void>` | Emits whenever the content section is closed.                     |                |

## Slots

| Name      | Description                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
|           | Use the unnamed slot to add `sbb-checkbox` or `sbb-radio-button` elements to the `sbb-selection-expansion-panel`. |
| `badge`   | Use this slot to provide a `sbb-card-badge` (optional).                                                           |
| `content` | Use this slot to provide custom content for the panel (optional).                                                 |
