# Getting Started

Basic steps to integrate the lyne components into your project.

Select your technology to get started.

<details>
  <summary>Plain Javascript</summary>

1. Install the `@sbb-esta/lyne-elements` and `@sbb-esta/lyne-elements-experimental` package:

   ```sh
   npm install --save @sbb-esta/lyne-elements @sbb-esta/lyne-elements-experimental
   ```

   or, if using yarn:

   ```sh
   yarn add @sbb-esta/lyne-elements @sbb-esta/lyne-elements-experimental
   ```

2. Including global styles is strongly recommended to apply all SBB styles to your application.
   See [styles](#styles) section if you prefer more granularity on what to import.

   ```css
   @import 'node_modules/@sbb-esta/lyne-elements/standard-theme.css';
   ```

3. Import the desired element and add it to globalThis:

   ```ts
   import { SbbButtonElement } from '@sbb-esta/lyne-elements/button.js';

   globalThis.SbbButtonElement = SbbButtonElement;
   ```

</details>

<details>
  <summary>Angular</summary>

> ⓘ We will soonish provide a Lyne Angular Wrapper which helps to use lyne components in Angular.
> However, it's already possible to use Lyne Components in Angular.

1. Install Angular CLI, see [Angular CLI documentation](https://cli.angular.io/)
2. Install the `@sbb-esta/lyne-elements` package:

   ```sh
   npm install --save @sbb-esta/lyne-elements
   ```

   or, if using yarn:

   ```sh
   yarn add @sbb-esta/lyne-elements
   ```

3. Including global styles is strongly recommended to apply all SBB styles to your application.
   See [styles](#styles) section if you prefer more granularity on what to import.
   Importing stylsheets is doable by editing the `styles.(s)css`:

   ```css
   @import 'node_modules/@sbb-esta/lyne-elements/standard-theme.css';
   ```

   or editing your `angular.json`:

   ```json
     ...
     "styles": [
       "src/styles.scss",
       "node_modules/@sbb-esta/lyne-elements/standard-theme.css"
     ],
     ...
   ```

4. In order to use web components with Angular, you have to import `CUSTOM_ELEMENT_SCHEMA` from the `@angular/core` package.

### Example app

```ts
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import '@sbb-esta/lyne-elements/button.js';

@Component({
  selector: 'my-app',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: ` <sbb-button>Lorem ipsum</sbb-button> `,
})
export class App {}

bootstrapApplication(App).catch((err) => console.error(err));
```

</details>

<details>
  <summary>React/Next.js</summary>

1. Prepare a React and Next.js setup.
2. Install the `@sbb-esta/lyne-react` package:

   ```sh
   npm install --save @sbb-esta/lyne-react
   ```

   or, if using yarn:

   ```sh
   yarn add @sbb-esta/lyne-react
   ```

3. Including global styles is strongly recommended to apply all SBB styles to your application.
   See [styles](#styles) section if you prefer more granularity on what to import.

   ```css
   @import '~@sbb-esta/lyne-elements/standard-theme.css';
   ```

4. Enhance the `transpilePackages` array in Next.Js config.

   ```js
   module.exports = {
     ...,
     transpilePackages: [
       '@sbb-esta/lyne-react',
       '@sbb-esta/lyne-elements',
       '@lit/react',
       '@lit/reactive-element',
       'lit',
       'lit-html',
       'lit-element',
     ],
   }
   ```

5. (Optional) To activate Server Side Rendering with Declarative Shadow DOM, you have to install the `@lit-labs/nextjs` package and use the method `withLitSSR()`:

   ```js
   const withLitSSR = require('@lit-labs/nextjs')({
     addDeclarativeShadowDomPolyfill: true,
   });

   module.exports = withLitSSR({
       ...,
       transpilePackages: [
         '@sbb-esta/lyne-elements',
         '@sbb-esta/lyne-react',
         '@sbb-esta/lyne-design-tokens',
         '@lit-labs/nextjs',
         '@lit-labs/ssr',
         '@lit-labs/ssr-react',
         '@lit/react',
         '@lit/reactive-element',
         'lit',
         'lit-element',
         'lit-html',
       ],
     });
   ```

6. Import and use lyne component:

   ```tsx
   import { SbbButton } from '@sbb-esta/lyne-react/button';

   export default function MyComponent() {
     return <SbbButton onClick={() => {}}></SbbButton>;
   }
   ```

   Whenever e.g. types are needed, they can be imported directly from the `@sbb-esta/lyne-elements` package:

   ```tsx
   import type { SbbButtonSize } from '@sbb-esta/lyne-elements/button.js';
   import { SbbButton } from '@sbb-esta/lyne-react/button';

   export default function MyComponent() {
     const size: SbbButtonSize = 'm';
     return <SbbButton onClick={() => {}} size={size}></SbbButton>;
   }
   ```

</details>

## Components

Components documentation is available on [digital.sbb.ch](https://digital.sbb.ch)
and on [storybook](https://lyne-storybook.app.sbb.ch).

## Styles

### Lean variant

Lean uses a more compact design by defaulting the `size` property to the smallest available value.
Components that do not have a `size` property remain unchanged.
To enable lean mode, add the CSS class `sbb-lean` to the `html` tag.

```html
<html lang="en" class="sbb-lean">
  <head>
    <title>Lyne Design System - Lean example</title>
  </head>
  <body>
    ...
  </body>
</html>
```

### CSS files

Basically, all our styles are included in 'standard-theme.css' which should be included in your application.
However, if you like to more specifically pick what you need, consider the following CSS files available.

| File name                       | Description                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| `standard-theme.css`            | Contains normalizing, core styles and available CSS classes.                        |
| `font-characters-extension.css` | Provides full character set of SBB fonts, needs larger files to fetch.              |
|                                 |                                                                                     |
| `normalize.css`                 | Contains general browser resetting styles which can be useful for your application. |
|                                 |                                                                                     |
| `core.css`                      | Contains mandatory basics to use lyne-components (including design tokens).         |
|                                 |                                                                                     |
| `a11y.css`                      | Provides accessibility related CSS classes.                                         |
| `animation.css`                 | Provides CSS classes to disable animation (e.g. for testing).                       |
| `layout.css`                    | Provides layout related CSS classes (e.g. page spacing, grid).                      |
| `lists.css`                     | Provides CSS classes to style lists.                                                |
| `scrollbar.css`                 | Provides CSS classes to style a scrollbar.                                          |
| `table.css`                     | Provides CSS classes to style a table.                                              |
| `typography.css`                | Provides typography related CSS classes.                                            |

### Full Font

The `standard-theme.css` (or `core.css`) file only contains a subset of the `SBB` fonts that do not contain all characters (e.g. the French "œ").
For including the full fontset, we provide the `font-characters-extension.css` file which can be added after the `standard-theme.css` (or `core.css`) file.

```css
@import '@sbb-esta/lyne-elements/standard-theme.css';
@import '@sbb-esta/lyne-elements/font-characters-extension.css';
```

### Design Tokens

The `@sbb-esta/lyne-elements` package provides the CSS variable design tokens
from `@sbb-esta/lyne-design-tokens` in the `standard-theme.css` (or `core.css`).

> If you have to use design tokens within a javascript context,
> please also add `@sbb-esta/lyne-design-tokens` package to your project.

Please check `node_modules/@sbb-esta/lyne-elements/standard-theme.css` for available design tokens.

#### How to work with design tokens

Designers are using design tokens in Figma from which developers can get the name to be used.
Some design tokens are responsive: they change their value depending on the current breakpoint.

> Whenever a design token ends with `-{breakpoint}`, e.g. `--sbb-spacing-responsive-s-zero`,
> There is a corresponding responsive CSS variable without the `-breakpoint` suffix,
> e.g. `sbb-spacing-responsive-s` which should be used.

### Sass Mixins

Lyne Components provides various Sass mixins which can be used by consumers.
For available Sass mixins, check [Sass Mixins](https://github.com/sbb-design-systems/lyne-components/tree/main/src/elements/core/styles/mixins).

```scss
@use '@sbb-esta/lyne-elements' as sbb;

.my-class {
  @include sbb.grid-base;
}
```

### CSS Classes

As a base rule, styles are included in components. However, there are a few exceptions
where we provide CSS classes to consumers:

- [Layout styles](https://lyne-storybook.app.sbb.ch/?path=/docs/styles-layout--docs)
- [List styles](https://lyne-storybook.app.sbb.ch/?path=/docs/styles-list--docs)
- [Scrollbar styles](https://lyne-storybook.app.sbb.ch/?path=/docs/styles-scrollbar--docs)
- [Text styles](https://lyne-storybook.app.sbb.ch/?path=/docs/styles-typography--docs)

### Manipulating styles of components

In general, the styles of components should not be changed.
However, some specific cases may require overriding some styles of a component.
For these cases, you can use the CSS variables of a component. Please check a specific component for available CSS variables.

> IMPORTANT: CSS variable names which are not documented in the component docs section, can be changed at any time.

Please reach out to the Lyne team if you think a component needs a new variant.

### Animations

Generally, animations are part of the design and should not be suppressed.
However, e.g. for testing purposes, it makes sense to deactivate them.

Add the `sbb-disable-animation` CSS class to disable animations and transition effects for the element and all its children.

Sometimes, you might need to disable animations only for a specific element.
To achieve that, you can add the `sbb-disable-animation-locally` class or re-enable animations using the `sbb-enable-animation` CSS class.

```html
<sbb-component class="sbb-disable-animation-locally">
  <!-- animations will play -->
</sbb-component>

<!-- Or  alternatively-->

<sbb-component class="sbb-disable-animation">
  <sbb-component class="sbb-enable-animation">
    <!-- animations will play -->
  </sbb-component>
</sbb-component>
```

### Units

All our tokens and components use `rem` as size unit.
We strongly recommend using the `rem` unit to guarantee consistent scaling
when font size changes in browsers.

### Focus outline

Focus outlines should only be displayed when users are navigating by keyboard.
Lyne components use the CSS selector `:focus-visible`, to achieve that. Whenever you have custom interactive elements,
you should use the `:focus-visible` selector as well and include our Sass mixin `focus-outline`.

```scss
@use '../../core/styles' as sbb;

button:focus-visible {
  @include sbb.focus-outline;
}
```

#### Dark background

If a container element has a dark background color, all containing interactive elements should get a white outline.
By setting `--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);` all descendants elements using the
Lyne focus outline mixin (Lyne components included) receive the white outline because the variable gets inherited.
Note: If a Lyne component has a `negative` property, the correct focus outline color gets automatically applied  
to all contained interactive elements.

### Stacking

As we can't use popover API yet, stacking of overlay context is done manually.
However, this can interfere with the z-index of your components.
Therefore, every overlay component provides a CSS variable to override its z-index.
Additionally, there is the global CSS variable `--sbb-overlay-default-z-index` that has a default z-index of 1000.
With this, developers have the chance to change the z-index either globally or on component level.

### Fonts

SBB provides different fonts depending on the font-weight: `Roman`, `Bold` and `Light`.
Lyne maps these fonts on the CSS `font-weight` property so that consumers
can just set e.g. `font-weight: bold` and the correct font gets automatically selected.
Please note, although SBB provides more fonts than `Roman`, `Bold` and `Light`,
Lyne only intends to use these three fonts.
To apply the SBB font family you can use the CSS var `var(--sbb-typo-font-family)`. However,
this only includes the family but no letter spacing, so we recommend to always
use our Sass mixins or CSS classes which contain all necessary properties.
See [Text styles](https://lyne-storybook.app.sbb.ch/?path=/docs/styles-typography--docs) for what's available.

```html
<p class="sbb-text-s sbb-text--bold"></p>
```

```scss
@use '@sbb-esta/lyne-elements' as sbb;

p {
  @include sbb.text-s--bold;
}
```
