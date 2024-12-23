import { LitElement, html, type TemplateResult, type CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { type ScreenshotTestCase } from '../../../screenshots.js';

import style from './test-case-filter.scss?lit&inline';

import type { SbbTagElement } from '@sbb-esta/lyne-elements/tag/tag/tag.js';
import '@sbb-esta/lyne-elements/title.js';
import '@sbb-esta/lyne-elements/tag.js';

/**
 * Shows filter for viewports and browsers
 */
export
@customElement('app-test-case-filter')
class TestCaseFilter extends LitElement {
  public static override styles: CSSResultGroup = style;

  @property() public accessor testCase: ScreenshotTestCase | null = null;

  /**
   * Activate `all`-tag of viewports and browsers.
   */
  public reset(): void {
    this.shadowRoot!.querySelectorAll<SbbTagElement>(`sbb-tag[value='all']`).forEach(
      (tag) => (tag.checked = true),
    );
  }

  private _handleViewportChange(event: CustomEvent): void {
    this.dispatchEvent(
      new CustomEvent('viewportFilterChange', {
        bubbles: true,
        composed: true,
        detail: (event.target as SbbTagElement).value,
      }),
    );
  }

  private _handleBrowserChange(event: CustomEvent): void {
    this.dispatchEvent(
      new CustomEvent('browserFilterChange', {
        bubbles: true,
        composed: true,
        detail: (event.target as SbbTagElement).value,
      }),
    );
  }

  public override render(): TemplateResult {
    return html`
      <div class="app-test-case-filter">
        <div>
          <sbb-title level="6">Viewports</sbb-title>
          <sbb-tag-group @change=${this._handleViewportChange}>
            <sbb-tag
              value="all"
              amount=${((this.testCase?.stats.failedTests || this.testCase?.stats.baselines) ?? 0) +
              (this.testCase?.stats.newTests ?? 0)}
              checked
            >
              All
            </sbb-tag>
            ${this.testCase?.viewports?.map(
              (viewport) => html`
                <sbb-tag amount=${viewport.browsers.length} value=${viewport.name}>
                  ${viewport.name}
                </sbb-tag>
              `,
            )}
          </sbb-tag-group>
        </div>
        <div>
          <sbb-title level="6">Browsers</sbb-title>
          <sbb-tag-group @change=${this._handleBrowserChange}>
            <sbb-tag value="all" amount=${this.testCase?.availableBrowserNames.length ?? 0} checked>
              All
            </sbb-tag>
            ${this.testCase?.availableBrowserNames?.map(
              (browserName) => html`<sbb-tag value=${browserName}>${browserName}</sbb-tag>`,
            )}
          </sbb-tag-group>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'app-test-case-filter': TestCaseFilter;
  }
}
