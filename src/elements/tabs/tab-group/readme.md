The `sbb-tab-group` is a component used to organize and gather tabs that the user can navigate through;
use it when you want to provide navigation within blocks of content, instead of showing everything in one place
or requiring the user to navigate between several different views.

Each tab has a related content, distinct from other tabs' content;
tab panels can present different sections of content and include text, images, forms, other tab groups, etc.

```html
<sbb-tab-group>
  <sbb-tab-label>I am the first</sbb-tab-label>
  <sbb-tab> Tab content 1 </sbb-tab>

  <sbb-tab-label>I am the second</sbb-tab-label>
  <sbb-tab> Tab content 2 </sbb-tab>

  <sbb-tab-label>I am the third</sbb-tab-label>
  <sbb-tab> Tab content 3 </sbb-tab>
</sbb-tab-group>
```

To display a tab label within the tab bar, provide a `sbb-tab-label` right before its related tab content;
please refer to the [sbb-tab-label](/docs/elements-sbb-tab-sbb-tab-label--docs) documentation for more details.

The content element must be wrapped in a `sbb-tab` and placed right after its relative `sbb-tab-label`.
Tab groups can also be nested, which means that a `sbb-tab` can contain another `sbb-tab-group`,
as shown in the "Nested Tab Groups" example.

## States

A tab can be selected, unselected, or in `disabled` state; disable a tab to mark it as unavailable.
Disabled tabs cannot be focused and may be invisible to assistive technologies such as screen readers.

It's possible to set the first selected tab using the `initialSelectedIndex` property.

```html
<sbb-tab-group initial-selected-index="1"> ... </sbb-tab-group>
```

## Events

Consumers can listen to the `didChange` event, whose `event.detail` is typed as `SbbTabChangedEventDetails`.
From it, it's possible to retrieve the information about the current `sbb-tab-label`, `sbb-tab` and index, and,
if available, also the information about the previous ones.

```ts
type SbbTabChangedEventDetails = {
  activeIndex: number;
  activeTabLabel: SbbTabLabelElement;
  activeTab: SbbTabElement;
  previousIndex: number;
  previousTabLabel: SbbTabLabelElement | undefined;
  previousTab: SbbTabElement | undefined;
};
```

<!-- Auto Generated Below -->

## Properties

| Name                   | Attribute                | Privacy | Type                              | Default            | Description                                                                                                                        |
| ---------------------- | ------------------------ | ------- | --------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `initialSelectedIndex` | `initial-selected-index` | public  | `number`                          | `0`                | Sets the initial tab. If it matches a disabled tab or exceeds the length of the tab group, the first enabled tab will be selected. |
| `size`                 | `size`                   | public  | `InterfaceSbbTabGroupTab['size']` | `'l' / 's' (lean)` | Size variant, either s, l or xl.                                                                                                   |

## Methods

| Name          | Privacy | Description               | Parameters         | Return | Inherited From |
| ------------- | ------- | ------------------------- | ------------------ | ------ | -------------- |
| `activateTab` | public  | Activates a tab by index. | `tabIndex: number` | `void` |                |
| `disableTab`  | public  | Disables a tab by index.  | `tabIndex: number` | `void` |                |
| `enableTab`   | public  | Enables a tab by index.   | `tabIndex: number` | `void` |                |

## Events

| Name        | Type                                     | Description                            | Inherited From |
| ----------- | ---------------------------------------- | -------------------------------------- | -------------- |
| `didChange` | `CustomEvent<SbbTabChangedEventDetails>` | Emits an event on selected tab change. |                |

## Slots

| Name | Description                                                                                             |
| ---- | ------------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-tab-group` via `sbb-tab-label` and `sbb-tab` instances. |
