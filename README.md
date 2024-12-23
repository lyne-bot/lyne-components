# Lyne Components

> Lyne Components are the building blocks of the Lyne Design System
> and are based on standard compliant Web Components
> created using [Lit](https://lit.dev/) and
> browsable through [Storybook](https://lyne-storybook.app.sbb.ch/)

## 🎯 Our aim

To fulfill our [Vision](./docs/VISION.md), we are building and maintaining Lyne, our Design System, which is and acts
as our common language — our Single Source of Truth.
For this purpose we use [Design Tokens](https://github.com/sbb-design-systems/lyne-design-tokens) as our design abstractions.
Those [Design Tokens](https://github.com/sbb-design-systems/lyne-design-tokens) are consumed by Lyne Components and are integrated within our documentation.

Lyne Design Tokens and Lyne Components are available for developers and designers.

## 📚 Documentation

- General docs: [digital.sbb.ch](https://digital.sbb.ch)
- Component docs: [Storybook](https://lyne-storybook.app.sbb.ch)
- [Getting started guide](./docs/GETTING_STARTED.md)

## 🔗 Packages

| Package                                | Description                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------- |
| `@sbb-esta/lyne-elements`              | Web components built on top of the Lyne Design System                       |
| `@sbb-esta/lyne-elements-experimental` | Web components that do not yet align with our architecture or testing goals |
| `@sbb-esta/lyne-react`                 | React wrappers for `@sbb-esta/lyne-elements`                                |
| `@sbb-esta/lyne-react-experimental`    | React wrappers for `@sbb-esta/lyne-elements-experimental`                   |

- [NPM Packages](https://www.npmjs.com/search?q=%40sbb-esta%2Flyne-)

## 🖥 Browser and screen reader support

This library supports the most recent two versions of all major browsers: Chrome (including Android), Firefox, Safari (including iOS), and Edge.

We aim for great user experience with the following screen readers:

Windows: NVDA and JAWS with FF / Chrome.
macOS: VoiceOver with Safari / Chrome.
iOS: VoiceOver with Safari
Android: Android Accessibility Suite (formerly TalkBack) with Chrome.

## 🙌 Contributing

- [General contribution guide](./docs/CONTRIBUTING.md)
- [Developer guide](./docs/DEVELOPER.md) for developers to get started working with this repo.
- [Coding standards](./docs/CODING_STANDARDS.md) for developers.
- [Code of conduct](./docs/CODE_OF_CONDUCT.md)

## 📝 License

This software is published by SBB-CFF-FFS under the [MIT](/LICENSE) licence and unsupported unless otherwise clearly stated.
Use at your own risk.
