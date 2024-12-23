## Page Spacing

The page spacing ensures inline margins and controls the max-width of the page.
The `expanded`-variant has a smaller inline spacing and no max-width.

| CSS class                   | Sass mixin              |
| --------------------------- | ----------------------- |
| `sbb-page-spacing`          | `page-spacing`          |
| `sbb-page-spacing-expanded` | `page-spacing-expanded` |

Alternatively the [sbb-container](/docs/elements-sbb-container-sbb-container--docs) component can be used to achieve the same result.

### Usage

```html
<section class="sbb-page-spacing"></section>

<!-- Or -->

<sbb-container></sbb-container>
```

## Grid

The grid is available as CSS class or Sass mixin.
It provides the grid from the design specifications on which you can place your elements.
The `expanded`-variant has a smaller inline spacing and no max-width.
[See CSS grid docs for full documentation of all the possibilities of placing elements on a grid.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

| CSS class           | Sass mixin      |
| ------------------- | --------------- |
| `sbb-grid`          | `grid`          |
| `sbb-grid-expanded` | `grid-expanded` |

### Usage

Two items placed on grid using each 2 of 4 columns.

```html
<style>
  .item-1 {
    grid-column: 1 / 2;
  }
  .item-2 {
    grid-column: 3 / 4;
  }
</style>
<div class="sbb-grid">
  <div class="item-1"></div>
  <div class="item-2"></div>
</div>
```

Using columns in the middle of the grid (e.g. alerts in home stories).

```scss
@use '@sbb-esta/lyne-elements' as sbb;

.grid-reduced-width {
  grid-column: 1/-1;

  @include sbb.mq($from: large) {
    grid-column: 2/-2;
  }
  @include sbb.mq($from: wide) {
    grid-column: 3/-3;
  }
  @include sbb.mq($from: ultra) {
    grid-column: 4/-4;
  }
}
```

```html
<div class="sbb-grid">
  <div class="grid-reduced-width"></div>
</div>
```
