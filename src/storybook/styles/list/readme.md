## sbb-list

| CSS class  | Sass mixin |
| ---------- | ---------- |
| `sbb-list` | `list`     |

The list styling can be applied to any ordered or unordered list.
Nesting lists is also supported without redefining the CSS class.
The list styling doesn't define any color itself but inherits it.

### Sass usage

The Sass mixin can be included at top level or in a rule.
If used at top level it will apply rules to the native `<ul>` and `<ol>` elements.
If used inside a rule it will extend the rule with `<ul>` and `<ol>`
selectors (e.g. `.sbb-list { @include sbb.list; }` > `.sbb-list:where(ol, ul) {...}`).

### Usage

```html
<ul class="sbb-list sbb-text-m">
  <li>Content</li>
</ul>
```

## sbb-step-list

| CSS class       | Sass mixin  |
| --------------- | ----------- |
| `sbb-step-list` | `step-list` |

The step list can only be used as ordered variant.
To achieve a correct styling, it is important to also define the font-size
by using the predefined classes (e.g. `sbb-text-s`).

```html
<ol class="sbb-step-list sbb-text-m">
  <li>Content</li>
</ol>
```

## sbb-icon-list

| CSS class       | Sass mixin  |
| --------------- | ----------- |
| `sbb-icon-list` | `icon-list` |

To achieve a correct styling, it is important to define the font-size
by using the predefined classes (e.g. `sbb-text-s`).

As predefined icon the `circle-tick-small` is used. To define a custom icon, the CSS variable
`--sbb-icon-list-marker-icon` can be used by providing a CSS URL.
The CSS URL can be an inlined image or an external url.

To define a color, the CSS `color` property can be used. However, if the icon should receive a different color
than the text, the CSS variable `--sbb-icon-list-marker-icon-color` can be used.

### Basic example

```html
<ul class="sbb-icon-list sbb-text-m">
  <li>Content</li>
</ul>
```

### Custom icon

```html
<ul
  class="sbb-icon-list sbb-text-m"
  style="--sbb-icon-list-marker-icon: url('https://icons.app.sbb.ch/icons/circle-cross-small.svg')"
>
  <li>Content</li>
</ul>
```

### Custom color

```html
<ul class="sbb-icon-list sbb-text-m" style="color: var(--sbb-color-iron)">
  <li>Content</li>
</ul>
```

### Custom icon color

```html
<ul
  class="sbb-icon-list sbb-text-m"
  style="color: var(--sbb-color-iron); --sbb-icon-list-marker-icon-color: var(--sbb-color-green)"
>
  <li>Content</li>
</ul>
```

## sbb-description-list

| CSS class  | Sass mixin         |
| ---------- | ------------------ |
| `sbb-list` | `description-list` |

The description list is meant to be used with the native `<dl>`.
The description list doesn't define any color itself but inherits it.

### Sass usage

The Sass mixin can be included at top level or in a rule.
If used at top level it will apply rules to the native `<dl>` element.
If used inside a rule it will extend the rule with `<dl>`.
selectors (e.g. `.sbb-list { @include sbb.description-list; }` > `.sbb-list:where(dl) {...}`).

```html
<dl class="sbb-list">
  <dt>Label:</dt>
  <dd>Description of the label.</dd>

  <dt>Other Label:</dt>
  <dd>Description of the label which is longer than the other one.</dd>
</dl>
```
