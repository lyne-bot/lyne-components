# Developer guide: getting your environment set up

1. Make sure you have both `node` and `yarn` installed.
   We recommend using `nvm` to manage your node versions.
2. From the root of the project, run `yarn` to install the dependencies.

There are currently some unknown problems with developing on Windows when working with Sass,
so we recommend using WSL2 to develop on Windows machines.

To bring up a local server, run `yarn start`. This will automatically watch for changes
and rebuild. The browser should refresh automatically when changes are made.

## Linting

We use [prettier](https://prettier.io/) and [eslint](https://eslint.org/) in our project.
Both are configured as pre-commit hooks and are verified via GitHub Actions CI.

Run `yarn format` to format the whole codebase with prettier.

Run `yarn lint --fix` to fix any automatically fixable lint issues and report the other issues.

## Outputs

| Folder           | Explanation                           |
| ---------------- | ------------------------------------- |
| ./dist/elements  | main output target for web-components |
| ./dist/react     | output target for the react library   |
| ./dist/storybook | rendered static storybook site        |

## Running tests

To run unit tests, run `yarn test`. This will run the full test suite with client-side rendering
and server-side rendering with and without hydration.
During development, it is preferable to run `yarn test:csr`, which will just run the client side
rendering.

### Debugging with Visual Studio Code

It is possible to debug tests and/or run them in isolation with Visual Studio Code.
The following code snippet can be placed in `.vscode/launch.json`.
Replace `test:csr` with `test:ssr` to test SSR.
Add the `--debug` param to enable breakpoint debugging and the detailed test report.

```json
  ...
  {
    "name": "Test",
    "request": "launch",
    "runtimeArgs": ["test:csr", "--file=${relativeFile}", "--watch"],
    "runtimeExecutable": "yarn",
    "skipFiles": ["<node_internals>/**"],
    "type": "node",
    "console": "integratedTerminal"
  },
  ...
```

### Debugging with IntelliJ

It is possible to debug tests and/or run them in isolation also with IntelliJ IDEA.
From the title bar, open the 'Run' menu, then select 'Edit configuration'.
Create and save a new `npm` configuration with the following parameters,
possibly replacing `test:csr` with `test:ssr` to test SSR:

- Command: `run`
- Scripts: `test:csr`
- Arguments: `--file=**/$FileName$ --watch`

Finally, open the file you want to test and run the script.
Add the `--debug` param to enable breakpoint debugging and the detailed test report.

## Starting showcase

To start the showcase, run `yarn start`. This will run the devserver in watch mode.

## Commits

Commits have to follow the `Conventional Commits` standard ([https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)).

To make sure developers properly style their commit messages, we use `husky` together with `commit-lint`.

## Well Known Issues

### `playwright`: `browserType.launch: Executable doesn't exist at ...`

Most likely two versions of Playwright are installed. Try running
`yarn remove playwright @web/test-runner-playwright`, followed by
`yarn add -ED playwright @web/test-runner-playwright` and check if the problem is resolved.
