The `sbb-loading-indicator` is a component which can be used to indicate progress status
or an ongoing activity which require some time to complete.

### Style

It's possible to define the `size` of the component, choosing between `s` (default), `l`, `xl`, `xxl`, and `xxxl`.

```html
<sbb-loading-indicator size="l"></sbb-loading-indicator>
```

## Accessibility

If the `sbb-loading-indicator` should be announced by screen-readers, use an element with the correct aria attributes
(`aria-live` set to `polite` or `assertive`, and possibly `aria-atomic` and `aria-relevant`)
and then append the `sbb-loading-indicator` on it after giving it the correct `aria-label`.

```html
<div class="loader-container" aria-live="polite">
  <sbb-loading-indicator size="l" aria-label="Loading, please wait"></sbb-loading-indicator>
</div>
```

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type                                    | Default     | Description                  |
| ------- | --------- | ------- | --------------------------------------- | ----------- | ---------------------------- |
| `color` | `color`   | public  | `'default' \| 'smoke' \| 'white'`       | `'default'` | Color variant.               |
| `size`  | `size`    | public  | `'s' \| 'l' \| 'xl' \| 'xxl' \| 'xxxl'` | `'s'`       | Size variant, either s or m. |
