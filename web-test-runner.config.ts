import { platform } from 'node:os';
import { parseArgs } from 'node:util';

import { litSsrPlugin } from '@lit-labs/testing/web-test-runner-ssr-plugin.js';
import {
  defaultReporter,
  type TestRunnerConfig,
  type TestRunnerCoreConfig,
  type TestRunnerGroupConfig,
} from '@web/test-runner';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';
import {
  type PlaywrightLauncherArgs,
  playwrightLauncher,
  type PlaywrightLauncher,
} from '@web/test-runner-playwright';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import { initCompiler } from 'sass';

import {
  configureRemotePlaywrightBrowser,
  minimalReporter,
  patchedSummaryReporter,
  containerPlaywrightBrowserPlugin,
  visualRegressionConfig,
  vitePlugin,
  preloadIcons,
  preloadFonts,
} from './tools/web-test-runner/index.js';

const { values: cliArgs } = parseArgs({
  strict: false,
  options: {
    file: { type: 'string' },
    ci: { type: 'boolean', default: !!process.env.CI },
    debug: { type: 'boolean' },
    'all-browsers': { type: 'boolean', short: 'a' },
    firefox: { type: 'boolean' },
    webkit: { type: 'boolean' },
    parallel: { type: 'boolean' },
    'update-visual-baseline': { type: 'boolean' },
    group: { type: 'string' },
    ssr: { type: 'boolean' },
    container: { type: 'boolean' },
    local: { type: 'boolean' },
  },
});

const concurrency = cliArgs.parallel ? {} : { concurrency: 1 };
const launchOptions: PlaywrightLauncherArgs = {
  launchOptions: {
    ignoreDefaultArgs: ['--hide-scrollbars'],
    // Enables focusing links with tab on Firefox, probably only relevant on macOS.
    firefoxUserPrefs: { 'accessibility.tabfocus': 7 },
  },
};

const stylesCompiler = initCompiler();
const renderStyles = (): string =>
  stylesCompiler.compile('./src/elements/core/styles/standard-theme.scss', {
    loadPaths: ['.', './node_modules/'],
  }).css;

const browsers =
  cliArgs.ci || cliArgs['all-browsers']
    ? // Parallelism has problems, we need force concurrency to 1
      (['chromium', 'firefox', 'webkit'] as const).map((product) =>
        playwrightLauncher({
          product,
          createPage: ({ context }) =>
            context.newPage().then((page) => {
              page.on('console', (message) => {
                if (message.type() === 'error' && !message.location().url.includes('dummy.png')) {
                  console.error(`CONSOLE: ${product} ${page.url()}`);
                  console.error(message.location());
                  console.error(message.text());
                }
              });
              page.on('pageerror', (err) => {
                console.error(`PAGEERROR: ${product} ${page.url()}`);
                console.error(err);
              });
              return page;
            }),
          ...concurrency,
          ...launchOptions,
        }),
      )
    : cliArgs.firefox
      ? [playwrightLauncher({ product: 'firefox', ...launchOptions })]
      : cliArgs.webkit
        ? [playwrightLauncher({ product: 'webkit', ...launchOptions })]
        : [playwrightLauncher({ product: 'chromium', ...launchOptions })];

const preloadedIcons = await preloadIcons();
const preloadedFonts = await preloadFonts();

const testRunnerHtml = (
  testFramework: string,
  _config: TestRunnerCoreConfig,
  group?: TestRunnerGroupConfig,
): string => `
<!DOCTYPE html>
<html lang='en'>
  <head>${
    // Although we provide the fonts as base64, we preload the original
    // files which prevents a bug in Safari rendering special characters.
    ['Roman', 'Bold', 'Light']
      .map(
        (type) => `
    <link
      rel="preload"
      href="https://cdn.app.sbb.ch/fonts/v1_8_1_subset/SBBWeb-${type}.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous"
    />`,
      )
      .join('')
  }
    <link rel="modulepreload" href="/src/elements/core/testing/test-setup.ts" />
    <style type="text/css">${renderStyles()}</style>
    <style type="text/css">
      ${preloadedFonts
        .map(
          (f) => `
      @font-face {
        font-family: SBB;
        src: ${f.font};
        font-display: fallback;
        font-weight: ${f.weight};
      }`,
        )
        .join('')}
    </style>
    <script type="module">
      globalThis.testEnv = '${cliArgs.debug ? 'debug' : ''}';
      globalThis.testGroup = '${cliArgs.ssr ? 'ssr' : (group?.name ?? 'default')}';
      globalThis.testRunScript = '${testFramework}';
    </script>
  </head>
  <body class="sbb-disable-animation">
    <div hidden>${preloadedIcons
      .map(
        (i) => `
    <template id="icon:${i.namespace}:${i.icon}">${i.svg}</template>`,
      )
      .join('')}</div>
    <script type="module" src="/src/elements/core/testing/test-setup.ts"></script>
  </body>
</html>
`;

// A list of log messages, that should not be printed to the test console.
const suppressedLogs = [
  'Lit is in dev mode. Not recommended for production! See https://lit.dev/msg/dev-mode for more information.',
  '[vite] connecting...',
  '[vite] connected.',
  // TODO(major): Verify if still needed
  'Using <sbb-datepicker> with a native <input> is deprecated. Use a <sbb-date-input> instead of <input>.',
];

const testFile = typeof cliArgs.file === 'string' && cliArgs.file ? cliArgs.file : undefined;
const groups: TestRunnerGroupConfig[] = [
  { name: 'ssr', files: testFile ?? 'src/**/*.ssr.spec.ts', testRunnerHtml },
];

// The visual regression test group is only added when explicitly set, as the tests are very expensive.
if (cliArgs.group === 'visual-regression') {
  groups.push({
    name: 'visual-regression',
    files: testFile ?? 'src/**/*.visual.spec.ts',
    testRunnerHtml,
  });
  if (!cliArgs.local && platform() !== 'linux') {
    console.log(
      `Running visual regression tests in a non-linux environment. Switching to container usage. Use --local to opt-out.`,
    );
    cliArgs.container = true;
  }
}

if (cliArgs.container) {
  browsers
    .filter((b): b is PlaywrightLauncher => b.type === 'playwright')
    .forEach((browser) => configureRemotePlaywrightBrowser(browser));
}

export default {
  files: testFile ?? ['src/**/*.spec.ts', '!**/*.{visual,ssr}.spec.ts'],
  groups,
  nodeResolve: true,
  reporters:
    cliArgs.debug || !cliArgs.ci
      ? [defaultReporter(), patchedSummaryReporter()]
      : [minimalReporter()],
  browsers: browsers,
  concurrentBrowsers: 3,
  plugins: [
    a11ySnapshotPlugin(),
    litSsrPlugin(),
    vitePlugin(),
    visualRegressionPlugin({
      ...visualRegressionConfig,
      update: !!cliArgs['update-visual-baseline'],
    }),
    ...(cliArgs.container ? [containerPlaywrightBrowserPlugin()] : []),
  ],
  testFramework: {
    config: {
      timeout: '10000',
      slow: '1000',
      failZero: true,
    },
  },
  coverageConfig: {
    exclude: ['**/node_modules/**/*', '**/assets/*.svg', '**/assets/*.png', '**/*.scss'],
  },
  filterBrowserLogs: (log) => !suppressedLogs.includes(log.args[0]),
  testRunnerHtml,
} satisfies TestRunnerConfig;
