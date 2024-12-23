import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { screenshots, type ScreenshotTestCase } from '../../screenshots.js';

import '@sbb-esta/lyne-elements/button/secondary-button-link.js';
import '@sbb-esta/lyne-elements/chip-label.js';
import '@sbb-esta/lyne-elements/container.js';
import '@sbb-esta/lyne-elements/header.js';
import '@sbb-esta/lyne-elements/notification.js';
import '@sbb-esta/lyne-elements/title.js';

import type { TestCaseFilter } from './test-case-filter/test-case-filter.js';
import style from './test-case.scss?lit&inline';

import type { SbbToggleCheckElement } from '@sbb-esta/lyne-elements/toggle-check.js';

import './test-title-chip-list/test-title-chip-list.js';
import './image-diff/image-diff.js';
import './test-case-filter/test-case-filter.js';

interface Filter {
  viewport?: string;
  browser?: string;
}

/**
 * Displays a test case with its images.
 * Provides filtering functions.
 */
export
@customElement('app-test-case')
class TestCase extends LitElement {
  public static override styles: CSSResultGroup = style;

  @property({ attribute: false }) public accessor params: {
    componentName: string;
    testCaseName: string;
  } | null = null;

  @state() private accessor _testCase: ScreenshotTestCase | null = null;
  @state() private accessor _testCaseIndex: number = -1;
  @state() private accessor _filter: Filter = {};
  @state() private accessor _showGlobalDiff = true;

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('params')) {
      // Reset
      this._filter = {};
      this.shadowRoot!.querySelector<TestCaseFilter>('app-test-case-filter')?.reset();

      // Get test case
      this._testCaseIndex = screenshots.indexOfTestCase(
        this.params!.componentName!,
        this.params!.testCaseName!,
      );
      if (this._testCaseIndex >= 0) {
        this._testCase = screenshots.getByTestCaseIndex(this._testCaseIndex)!;
      }
    }
  }

  private _progressFraction(): number {
    return (this._testCaseIndex + 1) / screenshots.testCaseCount;
  }

  private _next(): ScreenshotTestCase | undefined {
    return screenshots.getByTestCaseIndex(this._testCaseIndex + 1);
  }

  private _previous(): ScreenshotTestCase | undefined {
    return screenshots.getByTestCaseIndex(this._testCaseIndex - 1);
  }

  private _viewportFilterChanged(event: CustomEvent<string>): void {
    this._filter = {
      ...this._filter,
      viewport: event.detail && event.detail !== 'all' ? event.detail : undefined,
    };
  }

  private _browserFilterChanged(event: CustomEvent<string>): void {
    this._filter = {
      ...this._filter,
      browser: event.detail && event.detail !== 'all' ? event.detail : undefined,
    };
  }

  private _toggleGlobalDiff(event: Event): void {
    this._showGlobalDiff = (event.target as SbbToggleCheckElement).checked;
  }

  public override render(): TemplateResult {
    return html`
      <sbb-header expanded>
        <div class="app-progress" style="--app-progress: ${this._progressFraction()}"></div>
        <div class="app-file-name-box sbb-header-shrinkable">
          <sbb-chip-label color="charcoal">${this.params?.componentName}</sbb-chip-label>
          <sbb-title level="2" visual-level="6">
            <span class="app-file-name-ellipsis">${this.params?.testCaseName}</span>
          </sbb-title>
        </div>
        <div class="sbb-header-spacer"></div>
        <div class="sbb-header-logo app-navigation-block">
          <sbb-header-link href="/" icon-name="house-small">Overview</sbb-header-link>
          <sbb-secondary-button-link
            href="/compare/${this._previous()?.path}"
            size="s"
            icon-name="arrow-left-small"
            ?disabled=${!this._previous()}
          ></sbb-secondary-button-link>
          <sbb-secondary-button-link
            href="/compare/${this._next()?.path}"
            size="s"
            icon-name="arrow-right-small"
            ?disabled=${!this._next()}
          ></sbb-secondary-button-link>
        </div>
      </sbb-header>
      ${this._testCase
        ? html`<div class="app-testcase">
            <sbb-container expanded>
              <app-test-title-chip-list
                .testCaseName=${this.params!.testCaseName}
              ></app-test-title-chip-list>
              <div class="app-filter-and-toggle">
                <app-test-case-filter
                  .testCase=${this._testCase}
                  @browserFilterChange=${this._browserFilterChanged}
                  @viewportFilterChange=${this._viewportFilterChanged}
                ></app-test-case-filter>
                ${this._testCase
                  ?.filter(this._filter.viewport, this._filter.browser)
                  .some((screenshotFiles) => !screenshotFiles.isNew && !!screenshotFiles.diffFile)
                  ? html`<sbb-toggle-check
                      @change=${this._toggleGlobalDiff}
                      .checked=${this._showGlobalDiff}
                      size="s"
                      class="app-diff-global-toggle"
                    >
                      Show Diff
                    </sbb-toggle-check>`
                  : nothing}
              </div>
            </sbb-container>
            <sbb-container expanded color="milk">
              <div class="app-image-diffs">
                ${this._testCase
                  ?.filter(this._filter.viewport, this._filter.browser)
                  .map(
                    (screenshotFiles) =>
                      html`<app-image-diff
                        .screenshotFiles=${screenshotFiles}
                        .showDiff=${this._showGlobalDiff}
                      ></app-image-diff>`,
                  )}
              </div>
            </sbb-container>
          </div>`
        : html`<sbb-container expanded>
            <sbb-notification type="error" readonly>
              No screenshots found. Please check component and test case name.
            </sbb-notification>
          </sbb-container>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'app-test-case': TestCase;
  }
}
