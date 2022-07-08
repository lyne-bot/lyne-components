# lyne Coding Standards

## Code style

This project uses [Prettier](https://prettier.io/) to enforce a consistent code format.

## Coding practices

### General

#### Write useful comments

Comments that explain what some block of code does are nice; they can tell you something in less
time than it would take to follow through the code itself.

Comments that explain why some block of code exists at all, or does something the way it does,
are _invaluable_. The "why" is difficult, or sometimes impossible, to track down without seeking out
the original author. When collaborators are in the same room, this hurts productivity.
When collaborators are in different timezones, this can be devastating to productivity.

For example, this is a not-very-useful comment:

```ts
// Set default tabindex.
if (!$attrs['tabindex']) {
  $element.attr('tabindex', '-1');
}
```

While this is much more useful:

```ts
// Unless the user specifies so, the calendar should not be a tab stop.
// This is necessary because ngAria might add a tabindex to anything with an ng-model
// (based on whether or not the user has turned that particular feature on/off).
if (!$attrs['tabindex']) {
  $element.attr('tabindex', '-1');
}
```

In TypeScript code, use JsDoc-style comments for descriptions (on classes, members, etc.) and
use `//` style comments for everything else (explanations, background info, etc.).

In SCSS code, always use `//` style comments.

In HTML code, use `<!-- ... -->` comments, which will be stripped when packaging a build.

#### Prefer small, focused modules

Keeping modules to a single responsibility makes the code easier to test, consume, and maintain.
ESM modules offer a straightforward way to organize code into logical, granular units.
Ideally, individual files are 200 - 300 lines of code.

As a rule of thumb, once a file draws near 400 lines (barring abnormally long constants / comments),
start considering how to refactor into smaller pieces.

This might not always apply to components, but should be considered during implementation.

#### Less is more

Once a feature is released, it never goes away. We should avoid adding features that don't offer
high user value for price we pay both in maintenance, complexity, and payload size. When in doubt,
leave it out.

This applies especially to providing two different APIs to accomplish the same thing. Always
prefer sticking to a _single_ API for accomplishing something.

### API Design

#### Boolean arguments

Avoid adding boolean arguments to a method in cases where that argument means "do something extra".
In these cases, prefer breaking the behavior up into different functions.

```ts
// AVOID
function getTargetElement(createIfNotFound = false) {
  // ...
}
```

```ts
// PREFER
function getExistingTargetElement() {
  // ...
}

function createTargetElement() {
  // ...
}
```

### TypeScript

#### Typing

Avoid `any` where possible. If you find yourself using `any`, consider whether a generic may be
appropriate in your case.

For methods and properties that are part of a component's public API, all types must be explicitly
specified.

#### Fluent APIs

When creating a fluent or builder-pattern style API, use the `this` return type for methods:

```
class ConfigBuilder {
  withName(name: string): this {
    this.config.name = name;
    return this;
  }
}
```

#### Access modifiers

- Use `public` keyword as it is the recommendation by StencilJS.
- Use `private` when appropriate and possible, prefixing the name with an underscore.
- Use `protected` when appropriate and possible with no prefix.

Additionally, the `@internal` JsDoc annotation can be used to hide any symbol from the public
API docs.

#### Getters and Setters

- Getter/Setter cannot be used for `@Prop`.
- Generally avoid getter/setter and prefer methods.

#### JsDoc comments

All public APIs must have user-facing comments. These are extracted and shown in the documentation.

Private and internal APIs should have JsDoc when they are not obvious. Ultimately it is the purview
of the code reviewer as to what is "obvious", but the rule of thumb is that _most_ classes,
properties, and methods should have a JsDoc description.

Properties should have a concise description of what the property means:

```ts
  /** The label position relative to the checkbox. Defaults to 'after' */
  @Prop() public labelPosition: 'before' | 'after' = 'after';
```

Methods blocks should describe what the function does and provide a description for each parameter
and the return value:

```ts
  /**
   * Opens a modal dialog.
   * @param config Dialog configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  @Method()
  public open(config?: SbbDialogConfig): SbbDialogRef { ... }
```

Boolean properties and return values should use "Whether..." as opposed to "True if...":

```ts
/** Whether the button is disabled. */
disabled: boolean = false;
```

#### Try-Catch

Avoid `try-catch` blocks, instead preferring to prevent an error from being thrown in the first
place. When impossible to avoid, the `try-catch` block must include a comment that explains the
specific error being caught and why it cannot be prevented.

#### Naming

##### General

- Prefer writing out words instead of using abbreviations.
- Prefer _exact_ names over short names (within reason). E.g., `labelPosition` is better than
  `align` because the former much more exactly communicates what the property means.
- Except for `@Prop` properties, use `is` and `has` prefixes for boolean properties / methods.

##### Classes

Classes should be named based on what they're responsible for. Names should capture what the code
_does_, not how it is used:

```
/** NO: */
class RadioService { }

/** YES: */
class UniqueSelectionDispatcher { }
```

Avoid suffixing a class with "Service", as it communicates nothing about what the class does. Try to
think of the class name as a person's job title.

Classes that correspond to a component with an `sbb-` prefix should also be prefixed with `Sbb`.

##### Methods

The name of a method should capture the action that is performed _by_ that method rather than
describing when the method will be called. For example,

```ts
/** AVOID: does not describe what the function does. */
handleClick() {
  // ...
}

/** PREFER: describes the action performed by the function. */
openDialog() {
  // ...
}
```

#### Inheritance

Inheritence cannot be used for components, as StencilJS does not allow it.

#### Prefer for-of instead of forEach

Prefer usage of `for (... of ...)` instead of forEach, as it is slightly more performant.
Exceptions can be made, if only one action/line is performed.

```ts
/** AVOID: do not use forEach for actions that require multiple lines. */
array.forEach((value) => {
  // perform
  // actions
  // on multiple
  // lines
});

/** PREFER: use for of. */
for (const value of array) {
  // perform
  // actions
  // on multiple
  // lines
}

/** ALLOWED: if only one action is necessary. */
array.forEach((value) => call(value));
```

#### Prefer nullish coalescing and optional chaining

Nullish coalescing and optional chaining usually shorten the code, while not sacrificing
readability. It also potentially reduces reads/assignments of variables.

```ts
/** AVOID: requires multiple checks. */
if (data && data.nested && data.nested.action) {
  data.nested.action();
}

/** PREFER: use optional chaining for shorter code. */
data?.nested?.action.?();

/** AVOID: requires multiple checks. */
if (data) {
  return data;
} else if (data2) {
  return data2;
} else {
  return data3;
}

/** PREFER: use optional chaining for shorter code. */
return data ?? data2 ?? data3;
```

### StencilJS

#### Event naming

Use the wording `will` to name events happening before an action and `did` to name events happening
after an action (e.g. `will-open` and `did-open`).

#### Prefer properties/attributes to CSS classes

Properties/Attributes are automatically documented and can be inferred by the IDE/compiler.

```html
<!-- AVOID: needs to be clearly documented and is not IDE friendly. -->
<sbb-example class="sbb-negative sbb-vertical"></sbb-example>

<!-- PREFER: describes the action performed by the function. -->
<sbb-example orientation="vertical" negative></sbb-example>
```

#### Prefer `<slot>`, instead of wrapping other elements or using label properties

Instead of forwarding properties/content, use a `<slot>` (and/or a named named slot
`<slot name="example">`) to provide the possibility of directly assigning content/values.

#### Use `variant` property, if a component has more than one variant

Use `@Prop() variant: 'default' | 'etc'` to provide different design variants for a component.

#### Use `negative` property, if a component has a color negative specification

Use `@Prop() negative: boolean` to provide a color negative design for a component.

### CSS

#### BEM

We use [BEM](http://getbem.com/) in our project.

#### Use CSS variables

Use CSS variables wherever possible.

```scss
.sbb-example {
  color: var(--color-disabled-text);
}
```

Define rules only once with CSS variables and change CSS variables conditionally.
Also define CSS variables in :host.

```scss
// Variables are for example purposes only and do not actually exist.
// For sizes you would usually use pre-defined sizes variables, which already
// automatically scale with viewport size.
:host {
  --sbb-component-color: var(--sbb-color-standard);
  --sbb-component-padding: var(--sbb-padding-standard);

  @include mq($from: medium) {
    --sbb-component-padding: var(--sbb-padding-medium);
  }

  &.sbb-disabled {
    --sbb-component-color: var(--sbb-color-disabled);
  }
}

.sbb-example {
  color: var(--sbb-component-color);
}

.sbb-container {
  padding: var(--sbb-component-padding);
}
```

#### Use/Check existing CSS variables and SCSS mixins/functions

The `@sbb-esta/lyne-design-tokens` package provides global design tokens/CSS variables,
which are used/configured in our code base (see `src/global/core/shared/variables.scss`).

Use these variables instead of the original ones and only define new variables for components.
If a global variable is missing, create an issue or pull request in
[lyne-design-system/lyne-design-tokens][lyne-design-tokens].

#### Be cautious with use of `display: flex`

- The [baseline calculation for flex elements](http://www.w3.org/TR/css-flexbox-1/#flex-baselines)
  is different than other display values, making it difficult to align flex elements with standard
  elements like input and button.
- Component outermost elements should avoid flex (prefer block or inline-block)

#### Use lowest specificity possible

Always prioritize lower specificity over other factors. Most style definitions should consist of a
single element or css selector plus necessary state modifiers. **Avoid SCSS nesting for the sake of
code organization.** This will allow users to much more easily override styles.

For example, rather than doing this:

```scss
.sbb-calendar {
  display: block;

  .sbb-month {
    display: inline-block;

    .sbb-date.sbb-selected {
      font-weight: bold;
    }
  }
}
```

do this:

```scss
.sbb-calendar {
  display: block;
}

.sbb-calendar-month {
  display: inline-block;
}

.sbb-calendar-date.sbb-selected {
  font-weight: bold;
}
```

#### Never set a margin on a host element.

The end-user of a component should be the one to decide how much margin a component has around it.

#### Prefer styling the host element vs. elements inside the template (where possible).

This makes it easier to override styles when necessary. For example, rather than

```scss
the-host-element {
  // ...

  .some-child-element {
    color: red;
  }
}
```

you can write

```scss
the-host-element {
  // ...
  color: red;
}
```

The latter is equivalent for the component, but makes it easier override when necessary.

#### Support styles for Windows high-contrast mode

This is a low-effort task that makes a big difference for low-vision users. Example:

```css
@include ifForcedColors {
  .unicorn-motocycle {
    border: 1px solid #fff !important;
  }
}
```

#### Explain what CSS classes are for

When it is not super obvious, include a brief description of what a class represents. For example:

```scss
// The calendar icon button used to open the calendar pane.
.sbb-datepicker-button { ... }

// Floating pane that contains the calendar at the bottom of the input.
.sbb-datepicker-calendar-pane { ... }

// Portion of the floating panel that sits, invisibly, on top of the input.
.sbb-datepicker-input-mask { }
```

[ts-mixins]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-mix-in-classes
[lyne-design-tokens]: https://github.com/lyne-design-system/lyne-design-tokens
