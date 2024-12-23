## Scrollbar

The scrollbar Sass mixin and CSS classes offer a combination of size, color and whether the track is visible or not.

In Firefox the styles are looking differently as there are no possibilities to style the scrollbar exactly as designed.

| CSS class                                    | Sass mixin                                                         |
| -------------------------------------------- | ------------------------------------------------------------------ |
| `sbb-scrollbar`                              | `scrollbar($size: thin, $negative: false, $track-visible: false)`  |
| `sbb-scrollbar-negative`                     | `scrollbar($size: thin, $negative: true, $track-visible: false)`   |
| `sbb-scrollbar-thick`                        | `scrollbar($size: thick, $negative: false, $track-visible: false)` |
| `sbb-scrollbar-thick-negative`               | `scrollbar($size: thick, $negative: true, $track-visible: false)`  |
| `sbb-scrollbar-track-visible`                | `scrollbar($size: thin, $negative: false, $track-visible: true)`   |
| `sbb-scrollbar-negative-track-visible`       | `scrollbar($size: thin, $negative: true, $track-visible: true)`    |
| `sbb-scrollbar-thick-track-visible`          | `scrollbar($size: thick, $negative: false, $track-visible: true)`  |
| `sbb-scrollbar-thick-negative-track-visible` | `scrollbar($size: thick, $negative: true, $track-visible: true)`   |

** Possible values of Sass mixin **

- `$size` thin or thick
- `$negative` true or false
- `$track-visible` true or false
