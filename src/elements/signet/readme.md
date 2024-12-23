The `sbb-signet` is used as a wrapper for the SBB signet and ensures his aspect ratio and protective room.
To use the component, please define the desired height or width on `sbb-signet`.

```html
<style>
  sbb-signet {
    height: 20px;
  }
</style>
<sbb-signet></sbb-signet>
```

## Style

The aspect ratio of the logo can be changed using the `protectiveRoom` property.
Possible values are `ideal` (default), `minimal`, `panel` and `none`.

With `panel` value, the component is displayed with a left padding, similar to the `sbb-logo` component but without the text.
This is useful, for example, in the `sbb-header` with `size='s'`.

```html
<sbb-signet protective-room="none"></sbb-signet>

<sbb-signet protective-room="minimal"></sbb-signet>

<sbb-signet protective-room="panel"></sbb-signet>
```

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                      | Default   | Description                                                          |
| -------------------- | --------------------- | ------- | ------------------------- | --------- | -------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                  | `'Logo'`  | Accessibility label which will be forwarded to the inner SVG signet. |
| `protectiveRoom`     | `protective-room`     | public  | `SbbSignetProtectiveRoom` | `'ideal'` | Visual protective room around signet.                                |

## CSS Properties

| Name                  | Default | Description                                  |
| --------------------- | ------- | -------------------------------------------- |
| `--sbb-signet-height` | `auto`  | Can be used to set the height of the signet. |
