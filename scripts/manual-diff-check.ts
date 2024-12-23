/**
 * To execute this script, run the following row in the root directory of this project.
 * Please add a valid github token and replace the PR number.
 * rm -rf dist/screenshots && tsx scripts/manual-diff-check.ts --pr=3131 --github-token=<YOUR-TOKEN> && cd dist/screenshots && unzip screenshots.zip && cd ../.. && yarn start:visual-regression-app
 */

import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { parseArgs } from 'node:util';

import { distDir } from '../tools/vite/index.js';

const { values: cliArgs } = parseArgs({
  strict: false,
  options: {
    pr: { type: 'string' },
    'github-token': { type: 'string' },
  },
});

if (!(cliArgs.pr && cliArgs['github-token'])) {
  throw Error('PR number (--pr=) or github-token missing (--github-token=)');
}

const prDetailsResponse = await fetch(
  `https://api.github.com/repos/sbb-design-systems/lyne-components/pulls/${cliArgs.pr}`,
);

const prDetails = (await prDetailsResponse.json()) as { head: { ref: string; sha: string } };
const branch = prDetails.head.ref;
const commitSha = prDetails.head.sha;

const workflowRunsResponse = await fetch(
  `https://api.github.com/repos/sbb-design-systems/lyne-components/actions/runs?branch=${branch}&event=pull_request`,
);
const prWorkflowRuns = (await workflowRunsResponse.json()) as {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  workflow_runs: { head_sha: string; name: string; id: string }[];
};

const lastContinuousRun = prWorkflowRuns.workflow_runs.find(
  (run) => run.head_sha === commitSha && run.name === 'Continuous Integration',
);
if (!lastContinuousRun) {
  throw Error('no workflow run found');
}
const runId = lastContinuousRun.id;

const artifactsResponse = await fetch(
  `https://api.github.com/repos/sbb-design-systems/lyne-components/actions/runs/${runId}/artifacts`,
);
const artifacts = (await artifactsResponse.json()) as {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  artifacts: { name: string; archive_download_url: string }[];
};

const artifact = artifacts.artifacts.find(
  (artifact) => artifact.name === 'visual-regression-screenshots',
);

if (!artifact) {
  throw Error('no artifact found');
}
const artifactDownloadUrl = artifact.archive_download_url;

const zipResponse = await fetch(artifactDownloadUrl, {
  headers: {
    Authorization: `Bearer ${cliArgs['github-token']}`,
  },
});

const screenshotDir = new URL(`./screenshots/`, distDir);
if (!existsSync(screenshotDir)) {
  mkdirSync(screenshotDir, { recursive: true });
}

const stream = createWriteStream(new URL('screenshots.zip', screenshotDir));
await finished(Readable.fromWeb(zipResponse.body!).pipe(stream));

console.log('screenshots.zip downloaded');
