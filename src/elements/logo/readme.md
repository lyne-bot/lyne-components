The `sbb-logo` is used as a wrapper for the SBB logo and ensures his aspect ratio and protective room.
To use the component, please define the desired height or width on `sbb-logo`.

```html
<style>
  sbb-logo {
    height: 20px;
  }
</style>
<sbb-logo></sbb-logo>
```

## Style

The component has a negative variant which can be set using the `negative` property.

```html
<sbb-logo negative></sbb-logo>
```

The aspect ratio of the logo can be changed using the `protectiveRoom` property.
Possible values are `ideal` (default), `minimal` and `none`.

```html
<sbb-logo protective-room="minimal"></sbb-logo>
```

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                | Default   | Description                                                  |
| -------------------- | --------------------- | ------- | ------------------- | --------- | ------------------------------------------------------------ |
| `accessibilityLabel` | `accessibility-label` | public  | `string`            | `'Logo'`  | Accessibility label which will be forwarded to the SVG logo. |
| `negative`           | `negative`            | public  | `boolean`           | `false`   | Negative coloring variant flag.                              |
| `protectiveRoom`     | `protective-room`     | public  | `SbbProtectiveRoom` | `'ideal'` | Visual protective room around logo.                          |

## CSS Properties

| Name                | Default | Description                                |
| ------------------- | ------- | ------------------------------------------ |
| `--sbb-logo-height` | `auto`  | Can be used to set the height of the logo. |
