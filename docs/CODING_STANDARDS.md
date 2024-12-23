# Lyne Coding Standards

## Code style

This project uses [Prettier](https://prettier.io/) to enforce a consistent code format.

## Coding practices

### General

#### Write useful comments

Comments that explain what some block of code does are nice; they can tell you something in less
time than it would take to follow through the code itself.

Comments that explain why some block of code exists at all or does something the way it does,
are _invaluable_. The "why" is difficult, or sometimes impossible, to track down without seeking out
the original author. When collaborators are in the same room, this hurts productivity.
When collaborators are in different time zones, this can be devastating to productivity.

For example, this is a not-very-useful comment:

```ts
// Set default tabindex.
if (!this.getAttribute('tabindex')) {
  this.setAttribute('tabindex', '-1');
}
```

While this is much more useful:

```ts
// Unless the user specifies so, the calendar should not be a tab stop.
// This is necessary because it might add a tabindex to anything with an ng-model
// (based on whether or not the user has turned that particular feature on/off).
if (!this.getAttribute('tabindex')) {
  this.setAttribute('tabindex', '-1');
}
```

In TypeScript code, use JsDoc-style comments for descriptions (on classes, members, etc.) and
use `//` style comments for everything else (explanations, background info, etc.).

In Sass code, always use `//` style comments.

In HTML code, use `<!-- ... -->` comments, which will be stripped when packaging a build.

#### Write clear and exhaustive documentation

Every time a component is created, a `readme.md` file is generated;
don't underestimate its value, as it will be the documentation entry point for consumers.

The `generate` script will create a base structure for the component description; try to stick to it if you can.

Start with a brief sentence which describes the main purpose of the component and why it should be used;
if it is related to other components, mention them and add a link to their documentation.

Then describe how the component should be used, adding code examples:
if it's a presentational one, explain its graphic variants using the `### Style` paragraph,
while if it's a complex one you could use the `### Interaction` paragraph.
Almost all the components have `### Slots` and can have different `### States`; describe how they can be used.

#### Prefer small, focused modules

Keeping modules to a single responsibility makes the code easier to test, consume, and maintain.
ESM modules offer a straightforward way to organize code into logical, granular units.
Ideally, individual files are 200 - 300 lines of code.

As a rule of thumb, once a file draws near 400 lines (barring abnormally long constants/comments),
start considering how to refactor into smaller pieces.

This might not always apply to components but should be considered during implementation.

#### Less is more

Once a feature is released, it never goes away. We should avoid adding features that don't offer
high user value for the price we pay both in maintenance, complexity, and payload size. When in doubt,
leave it out.

This applies especially to providing two different APIs to accomplish the same thing. Always
prefer sticking to a _single_ API for accomplishing something.

#### Action elements

Since we have to "reimplement" the button and anchor functionality in order to comply with
accessibility, we need to consider all native behavior of a native `<button>` and `<anchor>`
element.

This has been implemented to the best of our know-how in the form of two "base" classes,
named `SbbButtonBaseElement` and `SbbLinkBaseElement`,
which holds all the logic needed to "emulate" the native `<button>` and `<anchor>` elements.
In detail, the new classes implement:

- the native component-related properties (`form`, `name`... for the button, `href`, `target`... for the link);
- the interaction logic (like `click`, `keypress` and so on);
- the accessibility attributes (like `role`);
- the rendering of the wrapper tag with its attributes (`span` for the button, `a` for the link).

These classes can be used as follows:
components that require basic button or link functionality have to extend the corresponding "base" class,
and they need to implement the `renderTemplate` method, which should return the component's inner content.

```ts
import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { html } from 'lit';

@customElement('my-custom-button')
class MyCustomButtonElement extends SbbButtonBaseElement {
  protected override renderTemplate(): TemplateResult {
    return html`<span>My button label</span>`;
  }
}
```

This code will result in the following HTML:

```html
<my-custom-button role="button" tabindex="0">
  #shadow-root (open)
  <span class="my-custom-button">
    <span>My button label</span>
  </span>
</my-custom-button>
```

Be aware that this does not cover every functionality of a native button or anchor.
Compare with existing components (e.g. `<sbb-button>`, `<sbb-breadcrumb>`, etc.) to what needs to be done additionally.

#### I18N

If using texts in components they have to be provided in English, French, German and Italian.
As the language can be changed dynamically, you have to use the `SbbLanguageController`.
The `SbbLanguageController` does automatically update the view if needed.

```ts
import { SbbLanguageController } from '../core/controllers.js';

export class Component extends LitElement {
  private _language = new SbbLanguageController(this);

  protected override render(): TemplateResult {
    return html` ... ${i18nExample[this._language.current]} ... `;
  }
}
```

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

- Use `public` keyword as it is recommended by TypeScript.
- Use `private` when appropriate and possible, prefixing the name with an underscore.
- Use `protected` when appropriate and possible with no prefix.

Additionally, the `@internal` JsDoc annotation can be used to hide any symbol from the public
API docs.

#### JsDoc comments

All public APIs must have user-facing comments. These are extracted and shown in the documentation.

Private and internal APIs should have JsDoc when they are not obvious. Ultimately it is the purview
of the code reviewer as to what is "obvious", but the rule of thumb is that _most_ classes,
properties, and methods should have a JsDoc description.

Properties should have a concise description of what the property means:

```ts
  /** The label position relative to the checkbox. Defaults to 'after' */
  @property() public labelPosition: 'before' | 'after' = 'after';
```

Methods blocks should describe what the function does and provide a description for each parameter
and the return value:

```ts
  /**
   * Opens a modal dialog.
   * @param config Dialog configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  public open(config?: SbbDialogConfig): SbbDialogRef { ... }
```

Boolean properties and return values should use "Whether..." as opposed to "True if...":

```ts
/** Whether the button is disabled. */
disabled: boolean = false;
```

#### Properties initialization

Boolean properties with a default value can be initialized with `false` but not with `true`.
This is due to how Lit handles boolean attributes in the DOM: it evaluates, for example, `sanitize="false"` as `true`
and not `false` as we would expect. Therefore, the property should be converted into something like `noSanitize = false`:

```ts
// AVOID
/**
 * ...
 * @default true
 */
@property({ type: Boolean }) public sanitize = true;
```

```ts
// PREFER
/**
 * ...
 * @default false
 */
@property({ attribute: 'no-sanitize', type: Boolean }) public noSanitize = false;
```

#### Try-Catch

Avoid `try-catch` blocks, instead preferring to prevent an error from being thrown in the first
place. When impossible to avoid, the `try-catch` block must include a comment that explains the
specific error being caught and why it cannot be prevented.

#### Naming

##### General

- Prefer to write out words instead of using abbreviations.
- Prefer _exact_ names to short names (within reason). E.g., `labelPosition` is better than
  `align` because the former much more exactly communicates what the property means.
- Except for `@property` properties, use `is` and `has` prefixes for boolean properties/methods.

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

#### Prefer for-of instead of forEach

Prefer the usage of `for (... of ...)` instead of forEach, as it is slightly more performant.
Exceptions can be made if only one action/line is performed.

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

#### Event naming

Use the wording `will` to name events happening before an action and `did` to name events happening
after an action (e.g. `willOpen` and `didOpen`).

#### Prefer properties/attributes to CSS classes

Properties/Attributes are automatically documented and can be inferred by the IDE/compiler.

```html
<!-- AVOID: needs to be clearly documented and is not IDE-friendly. -->
<sbb-example class="sbb-negative sbb-vertical"></sbb-example>

<!-- PREFER: describes the action performed by the function. -->
<sbb-example orientation="vertical" negative></sbb-example>
```

#### Prefer `<slot>`, instead of wrapping other elements or using label properties

Instead of forwarding properties/content, use a `<slot>` (and/or a named slot
`<slot name="example">`) to provide the possibility of directly assigning content/values.

#### Use the `variant` property, if a component has more than one variant

Use `@property() variant: 'default' | 'etc'` to provide different design variants for a component.

#### Use the `negative` property, if a component has a color-negative specification

Use `@property() negative: boolean` to provide a color negative design for a component.

#### Handling aria attributes

ID references, which are used commonly with aria attributes, cannot pass shadow DOM boundaries.
Due to this, the host element of a web component should be enriched with the appropriate
role and aria attributes and inner elements with the same semantic meaning should be assigned
`role="presentation"`.

This allows consumers to use the host element as the reference and also place ID references
on it.

#### ID handling

Element IDs are relevant for both connecting elements for specific functionality and providing a
better experience for accessibility.

##### Host ID

In certain scenarios, a component should have a default ID (e.g. when the usage of the ID is
expected).

There are various ways to assign an ID to the host. One option is to do it in the connectedCallback.

```ts
let nextId = 0;

@customElement('sbb-example')
export class SbbExample extends LitElement {
  ...
  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-example-${nextId++}`;
  }
}

```

#### Context detection

For various use cases, a component might need to behave or render in a specific way when placed
within another component (e.g. a `<sbb-link>` should not render an `<a>` or `<button>` element
when placed in another `<a>` or `<button>` ancestor or `<sbb-title>` should be designed in a
specific way when placed within a `<sbb-alert>`, etc.).

(Ideally, we could use the `:host-context` for the styling part, but the Firefox and Safari
teams have indicated that this will not be implemented:
https://github.com/w3c/csswg-drafts/issues/1914)

For this purpose we provide the `hostContext(selector: string, base: Element): Element | null`
function, which returns the closest match or null, if no match is found.

This can be used in the `connectedCallback()` (see
[Lit Lifecycle](https://lit.dev/docs/components/lifecycle/)) method of a component,
which should minimize the performance impact of this detection.

**Usages of this functionality should be carefully considered. If a component has too many variants
depending on the context, this should be discussed at design level. Also in many cases,
`this.closest(selector)` can be used instead, which is far more performant. **

```ts
connectedCallback() {
  // Check if the current element is nested in either an `<a>` or `<button>` element.
  this._isNestedInButtonAnchor = !!hostContext('a,button', this);
}
```

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
@use '../core/styles' as sbb;

:host {
  --sbb-component-color: var(--sbb-color-standard);
  --sbb-component-padding: var(--sbb-padding-standard);

  @include sbb.mq($from: medium) {
    --sbb-component-padding: var(--sbb-padding-medium);
  }
}

:host([disabled]) {
  --sbb-component-color: var(--sbb-color-disabled);
}

.sbb-example {
  color: var(--sbb-component-color);
}

.sbb-container {
  padding: var(--sbb-component-padding);
}
```

#### Use/Check existing CSS variables and Sass mixins/functions

The `@sbb-esta/lyne-design-tokens` package provides global design tokens/CSS variables,
which are used/configured in our code base (see `src/elements/core/styles/core/variables.scss`).

Use these variables instead of the original ones and only define new variables for components.
If a global variable is missing, create an issue or pull request in
[sbb-design-systems/lyne-design-tokens][lyne-design-tokens].

#### Be cautious with the use of `display: flex`

- The [baseline calculation for flex elements](http://www.w3.org/TR/css-flexbox-1/#flex-baselines)
  is different from other display values, making it difficult to align flex elements with standard
  elements like input and button.
- Component outermost elements should avoid flex (prefer block or inline-block)

#### Use the lowest specificity possible

Always prioritize lower specificity over other factors. Most style definitions should consist of a
single element or CSS selector plus necessary state modifiers. **Avoid Sass nesting for the sake of
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

##### Avoid scss & rule concatenation

The use of scss & rule concatenation hurts readability and makes it more complicated to search for.

```scss
// AVOID
.sbb-divider {
  &--negative {
    ...
  }
}

// PREFER
.sbb-divider--negative {
  ...
}
```

#### Never set a margin on a host element.

The end-user of a component should be the one to decide how much margin a component has around it.

#### Prefer styling inner elements instead of host.

In order to avoid unwanted style overrides from outside,
prefer to encapsulate styles to inner elements instead of the host.
We provide CSS vars as an API to the outside.

For example, rather than

```scss
:host {
  --sbb-width: 200px;

  display: flex;
  width: var(--sbb-width);
}
```

you can write

```scss
:host {
  --sbb-width: 200px;
}

.component {
  display: flex;
  width: var(--sbb-width);
}
```

#### Support styles for Windows high-contrast mode

This is a low-effort task that makes a big difference for low-vision users. Example:

```scss
@use '../core/styles' as sbb;

@include sbb.if-forced-colors {
  .unicorn-motorcycle {
    border: var(--sbb-border-width-1x) solid #fff !important;
  }
}
```

#### Explain what CSS classes are for

When it is not super obvious, include a brief description of what a class represents. For example:

```scss
// The calendar icon button is used to open the calendar pane.
.sbb-datepicker-button { ... }

// Floating pane that contains the calendar at the bottom of the input.
.sbb-datepicker-calendar-pane { ... }

// Portion of the floating panel that sits, invisibly, on top of the input.
.sbb-datepicker-input-mask { }
```

### Storybook

#### Variants of stories

We recommend to create some visual stories, showing the most important cases.
It's also recommended to include stories for the most important side cases,
e.g. for a label that receives ellipsis if it is too long to fit in a container.
It should be decided case by case.

#### Controls

Basically, all `@property()` decorated properties should be included as a control in a story.
To be consistent, provide every control in every story. In some cases this can be relaxed,
or some stories should have some special controls.

#### Templates

Templates can be very large, so try to reuse the common code blocks (avoiding duplication).

#### Language of stories

Stories with example texts should be written in English
to be neutral and also understandable for all developers and consumers.

[ts-mixins]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-mix-in-classes
[lyne-design-tokens]: https://github.com/sbb-design-systems/lyne-design-tokens

## States

Components can have various states. We want to document which states exist and their definitions.

### Normal

The state when no other state applies.

### Hover

State when the mouse is hovering over the component. Does not exist on touch devices.
Should visually highlight the component.
For accessibility compliance, the visual highlight must not be reduced to color, but should either include translation, cursor/pointer change or other effects that make it understandable for visually impaired consumers.

### Focused

State when a component or element has focus via keyboard.
Should provide an outline when a component has focus (via keyboard).

### Active

State when a component or element is active and not a form element.
(e.g. an active tab in a tab group, an expanded accordion panel or a pressed button)
Should visually highlight the component.
For accessibility compliance, the visual highlight must not be reduced to color, but should either include translation, cursor/pointer change or other effects that make it understandable for visually impaired consumers.

### Checked

State when form component or element is checked.
(e.g. radio-button, checkbox)
Should visually indicate its state.
Indeterminate is a substate of this.

### Disabled

State when a component or element is disabled and cannot be used or selected.
Should prevent focus or selection by keyboard or mouse.
Should visually indicate its state.

### Readonly

State when form component or element is readonly.
Must be accessible via keyboard and mouse but content/selection cannot be changed.
Should visually indicate its state.

### Error

State when form component or element is in an error state.
Should visually and textually indicate the error state and error type.
