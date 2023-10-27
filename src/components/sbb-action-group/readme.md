The `sbb-action-group` component is a generic content container which can contain up to three action items 
([sbb-button](/docs/components-sbb-button--docs) or [sbb-link](/docs/components-sbb-link--docs) or other HTML elements) 
in various [allocations](#allocations).

## Style

### Orientation

The `orientation` property is used to set item's orientation. 
Possible values are `horizontal` (default) and `vertical`.

The optional property `horizontalFrom` can be used in combination with `orientation='vertical'` to
indicate the minimum breakpoint from which the orientation changes to `horizontal`.

```html
<sbb-action-group orientation="vertical" horizontal-from='small'>
  <sbb-button variant="secondary">Action 1</sbb-button>
  <sbb-button>Action 2</sbb-button>
  <sbb-link
    align-self="end"
    icon-name="chevron-small-left-small"
    href="https://github.com/lyne-design-system/lyne-components"
  >
    Action 3
  </sbb-link>
</sbb-action-group>
```

### Button-size and link-size

The two props `button-size` and `link-size` can be used to override, respectively, the size of the inner `sbb-button` and `sbb-link`.
Default values are `l` for `sbb-button` and `m` for `sbb-link`.

```html
<sbb-action-group button-size='m' link-size='s'>
  <sbb-button variant="secondary">Action 1</sbb-button>
  <sbb-link
    icon-name="chevron-small-left-small"
    href="https://github.com/lyne-design-system/lyne-components"
  >
    Action 3
  </sbb-link>
</sbb-action-group>
```

### Align-group and align-self

The `align-group` property can be used to set the default alignment of the contained elements; 
possible values are `start`, `center`, `stretch` and `end`.

It is also possible to set the `align-self` attribute on action items in order to move them in the
opposite direction to the group; possible values are `start`, `center` or `end`.

**NOTE**: The `sbb-action-group` will automatically set variant `block` and will sync the `linkSize`
 property with nested `sbb-link` and the `buttonSize` property with the nested `sbb-button`
 instances.

```html
<sbb-action-group align-group="end">
  <sbb-button align-self="start" variant="secondary">Action 1</sbb-button>
  <sbb-button variant="secondary">Action 2</sbb-button>
  <sbb-button>Action 3</sbb-button>
</sbb-action-group>
```

## Allocations

Items can be displayed inside `sbb-action-group` in different allocations.

If we define the triad x-y-z as the number of elements aligned at the start, at the center and at the end of the component,
and we consider a template like the following one (possibly removing the link for 2-elements allocations):

```html
<sbb-action-group>
  <sbb-button>Button 1</sbb-button>
  <sbb-button>Button 2</sbb-button>
  <sbb-link icon-name="chevron-small-left-small" href="https://github.com/lyne-design-system/lyne-components">
    Link
  </sbb-link>
</sbb-action-group>
```

The values for `align-group` and `align-self` for the various allocations are as follows:

### Horizontal

| orientation='horizontal' | align-group |     align-self     |
|:------------------------:|:-----------:|:------------------:|
|           3-0-0          |    start    |         /          |
|           1-1-1          |    start    | Button 2: 'center' |
|           2-0-1          |    start    |    Link: 'end'     |
|           1-0-2          |     end     | Button 1: 'start'  |
|           2-0-0          |    start    |         /          |
|           1-0-1          |    start    |  Button 2: 'end'   |

### Vertical

| orientation='vertical' | align-group | align-self |
|:----------------------:|:-----------:|:----------:|
|          3-0-0         |    start    |      /     |
|          2-0-0         |    start    |      /     |
|          0-3-0         |    center   |      /     |
|          0-2-0         |    center   |      /     |
|          0-0-3         |     end     |      /     |
|          0-0-2         |     end     |      /     |

| orientation='vertical' (full width) | align-group |   align-self   |
|:-----------------------------------:|:-----------:|:--------------:|
|                3-0-0                |   stretch   |  Link: 'start' |
|                2-0-0                |   stretch   |        /       |
|                0-3-0                |   stretch   | Link: 'center' |
|                0-2-0                |   stretch   |        /       |
|                0-0-3                |   stretch   |   Link: 'end'  |
|                0-0-2                |   stretch   |        /       |

<!-- Auto Generated Below --> 
 

## Properties 

| Name             | Attribute             | Privacy | Type                                        | Default        | Description                                                                                                         |
| ---------------- | ---------------- | ------- | ------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------- |
| `alignGroup`     | `align-group`     | public  | `'start' \| 'center' \| 'stretch' \| 'end'` | `'start'`      | Set the slotted \`\<sbb-action-group>\` children's alignment.                                                       |
| `horizontalFrom` | `horizontal-from` | public  | `SbbHorizontalFrom \| undefined`            | `'medium'`     | Overrides the behaviour of \`orientation\` property.                                                                |
| `orientation`    | `orientation`    | public  | `SbbOrientation`                            | `'horizontal'` | Indicates the orientation of the components inside the \`\<sbb-action-group>\`.                                     |
| `buttonSize`     | `button-size`     | public  | `SbbButtonSize \| undefined`                | `'l'`          | Size of the nested sbb-button instances. This will overwrite the size attribute of nested&#xA;sbb-button instances. |
| `linkSize`       | `link-size`       | public  | `SbbLinkSize \| undefined`                  | `'m'`          | Size of the nested sbb-link instances. This will overwrite the size attribute of nested&#xA;sbb-link instances.     |

## Slots

| Name      | Description                                      |
| --------- | ------------------------------------------------ |
| `unnamed` | Slot to render the content inside the container. |

