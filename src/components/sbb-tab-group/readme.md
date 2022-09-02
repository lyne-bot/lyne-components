Tab groups are used to organize and gather tabs that the user can navigate through. Use tabs when you want to provide navigation within blocks of content, instead of showing everything in one place or requiring the user to navigate between several different views.

## Usage
In order to display a tab label within the tab bar, provide an `sbb-tab-title` right before the related tab content. The content element should be wrapped in a `div`, a `section` or an `article` and placed right after its relative tab title. Tab groups can also be nested, this means that a tab's content block can be represented by another `sbb-tab-group`, as shown in the "Nested Tab Groups" example.

Each tab has a related content, distinct from other tabs' content. Tab panels can present different sections of content and include text, images, forms, other tab groups, etc.

```html
<sbb-tab-title>Tab Label</sbb-tab-title>
<div>Tab content...</div>
```

A tab can be selected, unselected, or disabled. Disable a tab to mark it as unavailable. Disabled tabs cannot be focused and may be invisible to assistive technologies such as screen readers.

Tab buttons can show an icon on the left side of the label; provide an `sbb-icon` component within the `sbb-tab-title` tag using the `slot="icon"` to include the icon. They can also show numbers on the right side of the label by providing an `sbb-tab-amount` within the `sbb-tab-title` tag.

```html
<!-- Icon - remember to use the 'small' version of the icon to make it fit correctly into the tab button -->
<sbb-tab-title>
  <sbb-icon name="app-icon-small" slot="icon"></sbb-icon>
  Tab Label
</sbb-tab-title>

<!-- Amount -->
<sbb-tab-title>
  Tab Label
  <sbb-tab-amount>123</sbb-tab-amount>
</sbb-tab-title>

<!-- Icon and amount -->
<sbb-tab-title>
  <sbb-icon name="app-icon-small" slot="icon"></sbb-icon>
  Tab Label
  <sbb-tab-amount>123</sbb-tab-amount>
</sbb-tab-title>
```

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                                                                                        | Type     | Default |
| ---------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `initialSelectedIndex` | `initial-selected-index` | Sets the initial tab. If it matches a disabled tab or exceeds the length of the tab group, the first enabled tab will be selected. | `number` | `0`     |


## Events

| Event                      | Description                           | Type                |
| -------------------------- | ------------------------------------- | ------------------- |
| `sbb-tab-group_did-change` | Emits an event on selected tab change | `CustomEvent<void>` |


## Methods

### `activateTab(tabIndex: number) => Promise<void>`

Activates a tab by index.

#### Returns

Type: `Promise<void>`



### `disableTab(tabIndex: number) => Promise<void>`

Disables a tab by index.

#### Returns

Type: `Promise<void>`



### `enableTab(tabIndex: number) => Promise<void>`

Enables a tab by index.

#### Returns

Type: `Promise<void>`




----------------------------------------------


