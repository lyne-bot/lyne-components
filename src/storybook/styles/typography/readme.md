## Text styles

Every text size (xxs, xs, s, m, l and xl) is available as Sass mixin or CSS class.
It also includes line-height, letter-spacing and font-family.

The native browser margins (1em) between paragraph elements `<p>` correctly corresponds
to the defined paragraph spacing. Due to this there are no additional rules for paragraph spacing.

| CSS class      | CSS class bold                | Sass mixin          | Sass mixin bold  |
| -------------- | ----------------------------- | ------------------- | ---------------- |
| `sbb-text-xxs` | `sbb-text-xxs sbb-text--bold` | `text-xxs--regular` | `text-xxs--bold` |
| `sbb-text-xs`  | `sbb-text-xs sbb-text--bold`  | `text-xs--regular`  | `text-xs--bold`  |
| `sbb-text-s`   | `sbb-text-s sbb-text--bold`   | `text-s--regular`   | `text-s--bold`   |
| `sbb-text-m`   | `sbb-text-m sbb-text--bold`   | `text-m--regular`   | `text-m--bold`   |
| `sbb-text-l`   | `sbb-text-l sbb-text--bold`   | `text-l--regular`   | `text-l--bold`   |
| `sbb-text-xl`  | `sbb-text-xl sbb-text--bold`  | `text-xl--regular`  | `text-xl--bold`  |

### Usage

```html
<p class="sbb-text-m">Text</p>
```

## Legend

| CSS class    | Sass mixin |
| ------------ | ---------- |
| `sbb-legend` | `legend`   |

## Sub

The `<sub>`-tag is also overridden globally as long as you include our global styles.

| Sass mixin |
| ---------- |
| `sub`      |

## Sup

The `<sup>`-tag is also overridden globally as long as you include our global styles.

| Sass mixin |
| ---------- |
| `sup`      |
