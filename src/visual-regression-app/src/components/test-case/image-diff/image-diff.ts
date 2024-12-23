import { type CSSResultGroup, html, LitElement, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// eslint-disable-next-line import-x/no-unresolved
import { meta } from 'virtual:meta';

import type { ScreenshotFiles } from '../../../interfaces.js';

import style from './image-diff.scss?lit&inline';

import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { SbbOverlayElement } from '@sbb-esta/lyne-elements/overlay/overlay.js';
import type { SbbToggleCheckElement } from '@sbb-esta/lyne-elements/toggle-check/toggle-check.js';

import '@sbb-esta/lyne-elements/chip-label.js';
import '@sbb-esta/lyne-elements/status.js';
import '@sbb-esta/lyne-elements/overlay.js';
import '@sbb-esta/lyne-elements/toggle-check.js';

import './fullscreen-diff/fullscreen-diff.js';

const getImageDimension = (img: HTMLImageElement): string =>
  `${img.naturalWidth}x${img.naturalHeight}px`;

/**
 * Displays two images to compare them.
 */
export
@customElement('app-image-diff')
class ImageDiff extends LitElement {
  public static override styles: CSSResultGroup = style;

  @property({ attribute: false }) public accessor screenshotFiles: ScreenshotFiles | null = null;

  @state() private accessor _baselineDimension: string | null = null;
  @state() private accessor _failedDimension: string | null = null;

  @forceType()
  @property({ type: Boolean })
  public accessor showDiff: boolean = true;

  private _toggleDiff(event: Event): void {
    this.showDiff = (event.target as SbbToggleCheckElement).checked;
  }

  private _setFailedImageDimension(event: Event): void {
    this._failedDimension = getImageDimension(event.target as HTMLImageElement);
  }

  private _setBaselineImageDimension(event: Event): void {
    this._baselineDimension = getImageDimension(event.target as HTMLImageElement);
  }

  /**
   * To avoid blown up DOM, we create the overlay only when it's needed.
   */
  private _showFullscreen(selectedFile: 'baselineFile' | 'failedFile' | 'diffFile'): void {
    const sbbOverlayElement: SbbOverlayElement = document.createElement('sbb-overlay');
    const appFullscreenDiff = document.createElement('app-fullscreen-diff');

    sbbOverlayElement.expanded = true;
    appFullscreenDiff.selectedFile = selectedFile;
    appFullscreenDiff.screenshotFiles = this.screenshotFiles;

    sbbOverlayElement.appendChild(appFullscreenDiff);
    document.body.appendChild(sbbOverlayElement);
    sbbOverlayElement.addEventListener(SbbOverlayElement.events.didClose, () => {
      document.body.removeChild(sbbOverlayElement);
    });

    sbbOverlayElement.open();
  }

  public override render(): TemplateResult {
    if (!this.screenshotFiles) {
      return html``;
    }
    return html`<div class="app-container">
      <div class="app-info-bar">
        <div class="app-labels">
          <sbb-chip-label size="xxs" color="white"
            >${this.screenshotFiles.browserName}</sbb-chip-label
          >
          <sbb-chip-label size="xxs" color="white">${this.screenshotFiles.viewport}</sbb-chip-label>
          ${this._baselineDimension
            ? html`<sbb-chip-label size="xxs" color="white">
                Baseline: ${this._baselineDimension}
              </sbb-chip-label>`
            : nothing}
          ${this._failedDimension
            ? html`<sbb-chip-label size="xxs" color="white">
                ${this.screenshotFiles.isNew ? 'New' : 'Failed'}: ${this._failedDimension}
              </sbb-chip-label>`
            : nothing}
        </div>
        ${!this.screenshotFiles.isNew && this.screenshotFiles.diffFile
          ? html`<sbb-toggle-check
              .checked=${this.showDiff}
              size="s"
              class="app-diff-toggle"
              @change=${this._toggleDiff}
            >
              Show Diff
            </sbb-toggle-check>`
          : nothing}
      </div>
      <div class="app-image-container">
        <div class="app-image-baseline">
          ${!this.screenshotFiles.isNew
            ? html`<button
                @click=${() => this._showFullscreen('baselineFile')}
                class="app-image-button"
              >
                <img
                  class="app-image"
                  .src=${`./${this.screenshotFiles?.baselineFile}?commit=${meta.baselineGitSha}`}
                  alt=""
                  @load=${this._setBaselineImageDimension}
                />
              </button>`
            : html`<sbb-status type="info" class="app-new-test-case-info">
                New test case
              </sbb-status>`}
        </div>
        ${this.screenshotFiles.failedFile
          ? html`<div class="app-image-failed">
              <button
                @click=${() => this._showFullscreen('diffFile')}
                class="app-image-button"
                ?hidden=${!this.showDiff || this.screenshotFiles.isNew}
              >
                <img
                  class="app-image"
                  .src=${`./${this.screenshotFiles?.diffFile}?commit=${meta.gitSha}`}
                  alt=""
                />
              </button>
              <button
                @click=${() => this._showFullscreen('failedFile')}
                class="app-image-button"
                ?hidden=${this.showDiff && !this.screenshotFiles.isNew}
              >
                <img
                  class="app-image"
                  .src=${`./${this.screenshotFiles?.failedFile}?commit=${meta.gitSha}`}
                  alt=""
                  @load=${this._setFailedImageDimension}
                />
              </button>
            </div>`
          : nothing}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'app-image-diff': ImageDiff;
  }
}
