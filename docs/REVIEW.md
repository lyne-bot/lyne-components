# Review Guidelines

## Development Process

We want to make sure our work is of the quality we want to provide. To make sure we do not burn out, we try to share this
responsibility where possible.

- If possible, prioritize reviews over starting a second pull request
- Pair programming for complex workloads/tasks/refactorings
- After initial implementation, seek peer reviewer
- After/During peer review, try to adapt in pair programming

For progress indication, we use labels to indicate a specific expectation:

- When a pull request is not yet ready for review, add "[WIP]" to the end of the pull request title
- When a pull request is created or upgraded from draft pull request, the label "pr: peer review required" is automatically added
- When a pull request is approved by anyone from the team, the label "pr: peer review approved" is automatically added and the label "pr: peer review required" is removed
- When a pull request should be reviewed by a lead developer, the label "pr: lead review required" should be added by either the pull request owner, a peer reviewer or a lead developer
- When a pull request is reviewed by a lead developer, the label "pr: lead review approved" is automatically added and the label "pr: lead review required" is removed
- When a pull request should be reviewed by UX, the label "pr: ux review required" should be added
- When a pull request is reviewed by UX, the label "pr: ux review approved" is automatically added and the label "pr: ux review required" is removed
- When a pull request should be reviewed by an accessibility expert, the label "pr: a11y review required" should be added
- When a pull request is reviewed by an accessibility expert, the label "pr: a11y review approved" can manually be added and "pr: a11y review required" can manually be removed
- When a pull request should not be considered/merged/reviewed, add the label "pr: blocked"

## Review Checks

This document shows what should be done during the review process.

A basic review only contains the entries which have an exclamation mark (⚠️).
Depending on the circumstances, additional options might be considered.

#### General

- ⚠️ Were changes made that affect existing code (e.g. new dependencies, changed global code sections)?
- ⚠️ Is the build green?
- ⚠️ Are the visual regression tests green or don't affect existing tests in an undesired way?

#### Architecture

- Re-usability for internal usages, is the component flexible enough?
- Is the API consistent with existing (finalized) components?
- Is the meaning of newly added properties and public methods understandable?
- Can the main content be slotted (achieve flexibility)?
- Can the component be used in tests of consumers?

#### Documentation

- Is the consumer documentation present and comprehensible
  (readme.md, tsdoc for public properties/methods/classes/interfaces/etc.)?
- Are code blocks that are not easily understandable documented with an explanation as to why it is
  necessary?
- Are there small examples of how to use the component in the readme.md file?
- Is the documentation (mostly) free of spelling errors?
- Is the documentation up-to-date with the current implementation?
- Are all texts written in English language?

#### Tests

- Do the tests cover all important logic and variants?
- Are the tests readable for developers?

#### Component

- Does the code have good styling in general (appropriate names, small readable blocks, etc.)?
- Does the order of methods and props make sense?
- ⚠️ Is the implementation performant?
- Is everything working, when slot content changes, properties change or the component is moved in
  DOM?
- Do all methods have type declarations?

#### Stories

- Is there a story for each visual representation?
- Are the story templates reused and divided into small vars if necessary?
- Are the controls working and as consistent as possible through all stories?
- Are the test working on visual regression execution and give a value?
- Are all texts written in English language?

#### Styles

- Does the implementation follow the coding standards (several points)?
- ⚠️ Is every value from a design token and if not, well documented?
- Are modern style properties used (e.g. gap, inset, margin-block, padding-inline, etc.)?
- Are there as little style definitions as possible (e.g. using gap instead of exceptions for last-child, etc.)?
- Do the CSS class names follow BEM and have the sbb prefix?
- Does the visual output match the Figma spec (also confirmed with UX)?

#### Accessibility

- Are the components semantically correct (aria attributes, native elements, etc.)?
- Check if the developer has tested all screen readers.
- Do some smoke tests.
- Is Windows high contrast mode supported well?
- Does keyboard navigation work and is the focused element visible (:focus-visible)?

#### Browsers

- Is browser compatibility given? Do some smoke tests, but developers guarantee browser compatibility.

#### Refactorings

- ⚠️ Is every usage of a component refactored too?
