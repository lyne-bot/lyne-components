The `sbb-stepper` is a component that visually guides a user through a sequential, multi-step process. It breaks down complex forms, flows, or other linear interactions into smaller, easier-to-follow steps. The current step is highlighted, and a progress bar connects the steps to visually represent progress.

Use it with [sbb-step-label](/docs/elements-sbb-stepper-sbb-step-label--docs) and [sbb-step](/docs/elements-sbb-stepper-sbb-step--docs).

```html
<sbb-stepper aria-label="Purpose of this flow">
  <sbb-step-label>Step label 1</sbb-step-label>
  <sbb-step>Step content 1</sbb-step>

  <sbb-step-label>Step label 2</sbb-step-label>
  <sbb-step>Step content 2</sbb-step>
</sbb-stepper>
```

## Interactions

There are two attributes to support navigation between different steps that can be used on elements inside an `sbb-step` to select the next or the previous step when clicked: `sbb-stepper-next` and `sbb-stepper-previous`.

### Linear stepper

The `linear` property can be set to create a linear stepper that requires the user to complete previous steps before proceeding to following steps.

```html
<sbb-stepper aria-label="Purpose of this flow" linear>
  <sbb-step-label>Step label 1</sbb-step-label>
  <sbb-step>Step content 1</sbb-step>

  <sbb-step-label>Step label 2</sbb-step-label>
  <sbb-step>Step content 2</sbb-step>

  <sbb-step-label>Step label 3</sbb-step-label>
  <sbb-step>Step content 3</sbb-step>
</sbb-stepper>
```

## Forms

There are two possible approaches. One is using a single form for the stepper, and the other is using a different form for each step.

### Single form

```html
<form>
  <sbb-stepper aria-label="Purpose of this flow">
    <sbb-step-label>Step label 1</sbb-step-label>
    <sbb-step>Step content 1: <sbb-form-field>...</sbb-form-field></sbb-step>

    <sbb-step-label>Step label 2</sbb-step-label>
    <sbb-step>Step content 2: <sbb-form-field>...</sbb-form-field></sbb-step>
  </sbb-stepper>
</form>
```

### Multiple forms

```html
<sbb-stepper aria-label="Purpose of this flow">
  <sbb-step-label>Step label 1</sbb-step-label>
  <sbb-step>
    <form>
      <sbb-form-field>...</sbb-form-field>
    </form>
  </sbb-step>

  <sbb-step-label>Step label 2</sbb-step-label>
  <sbb-step>
    <form>
      <sbb-form-field>...</sbb-form-field>
    </form>
  </sbb-step>
</sbb-stepper>
```

Calling the `reset()` method on the `sbb-stepper` will reset the wrapping `form` or, if they are present, every `form` in each step; then it will select the first step.

## Events

Whenever a step switch is triggered, a `validate` event is emitted and can be canceled to prevent the step change.

## Accessibility

Whenever textual content is provided, please also set the attribute `tabindex=‘0’` on the text tag, so that it can be reached and announced by screen-readers. Also remember to use the classes `.sbb-focus-outline` and `.sbb-focus-outline-dark` to correctly style the outline.

```html
<sbb-stepper aria-label="Purpose of this flow">
  <sbb-step-label>Step label 1</sbb-step-label>
  <sbb-step>
    <p tabindex="0" class="sbb-focus-outline">Step content 1</p>
    <sbb-button>Button<sbb-button>
  </sbb-step>

  <sbb-step-label>Step label 2</sbb-step-label>
  <sbb-step>
    <p tabindex="0" class="sbb-focus-outline">Step content 2</p>
    <sbb-button>Button<sbb-button>
  </sbb-step>
</sbb-stepper>
```

Use an `aria-label` attribute to describe the purpose of the stepper. The `sbb-stepper` also sets other attributes on the steps and the step labels like `aria-setsize`, `aria-posinset`, `aria-controls`, `aria-labelledby`. If important content needs to be announced when a step is changed, use the `aria-live=‘polite’` attribute.

<!-- Auto Generated Below -->

## Properties

| Name             | Attribute         | Privacy | Type                        | Default            | Description                                                                       |
| ---------------- | ----------------- | ------- | --------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `horizontalFrom` | `horizontal-from` | public  | `SbbHorizontalFrom \| null` | `null`             | Overrides the behaviour of `orientation` property.                                |
| `linear`         | `linear`          | public  | `boolean`                   | `false`            | If set to true, only the current and previous labels can be clicked and selected. |
| `orientation`    | `orientation`     | public  | `SbbOrientation`            | `'horizontal'`     | Steps orientation, either horizontal or vertical.                                 |
| `selected`       | -                 | public  | `SbbStepElement \| null`    |                    | The currently selected step.                                                      |
| `selectedIndex`  | `selected-index`  | public  | `number \| null`            |                    | The currently selected step index.                                                |
| `size`           | `size`            | public  | `'s' \| 'm'`                | `'m' / 's' (lean)` | Size variant, either s or m.                                                      |
| `steps`          | -                 | public  | `SbbStepElement[]`          |                    | The steps of the stepper.                                                         |

## Methods

| Name       | Privacy | Description                                                                        | Parameters | Return | Inherited From |
| ---------- | ------- | ---------------------------------------------------------------------------------- | ---------- | ------ | -------------- |
| `next`     | public  | Selects the next step.                                                             |            | `void` |                |
| `previous` | public  | Selects the previous step.                                                         |            | `void` |                |
| `reset`    | public  | Resets the form in which the stepper is nested or every form of each step, if any. |            | `void` |                |

## Slots

| Name         | Description                                                                                |
| ------------ | ------------------------------------------------------------------------------------------ |
|              | Provide a `sbb-expansion-panel-header` and a `sbb-expansion-panel-content` to the stepper. |
| `step`       | Use this slot to provide an `sbb-step`.                                                    |
| `step-label` | Use this slot to provide an `sbb-step-label`.                                              |
