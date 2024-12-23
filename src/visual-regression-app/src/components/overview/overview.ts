import { LitElement, html, type TemplateResult, type CSSResultGroup, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
// eslint-disable-next-line import-x/no-unresolved
import { meta } from 'virtual:meta';

import { screenshots } from '../../screenshots.js';

import style from './overview.scss?lit&inline';

import '@sbb-esta/lyne-elements/accordion.js';
import '@sbb-esta/lyne-elements/action-group.js';
import '@sbb-esta/lyne-elements/button/button-link.js';
import '@sbb-esta/lyne-elements/card.js';
import '@sbb-esta/lyne-elements/container.js';
import '@sbb-esta/lyne-elements/expansion-panel.js';
import '@sbb-esta/lyne-elements/link-list.js';
import '@sbb-esta/lyne-elements/link/block-link.js';
import '@sbb-esta/lyne-elements/title.js';

/**
 * Overview over all tests
 */
export
@customElement('app-overview')
class Overview extends LitElement {
  public static override styles: CSSResultGroup = style;

  public override render(): TemplateResult {
    return html`
      <sbb-container expanded>
        <sbb-title level="3">
          Lyne visual regression comparison${screenshots.baselineOnly ? ' baseline' : nothing}
        </sbb-title>
        <div class="app-overview">
          ${screenshots.stats}
          <sbb-card color="milk">
            <sbb-action-group
              align-group="stretch"
              orientation="vertical"
              horizontal-from="medium"
              button-size="s"
              link-size="s"
            >
              ${meta.baselineGitSha && !screenshots.baselineOnly
                ? html`<sbb-block-link
                    icon-name="document-check-small"
                    href=${meta.baselineCommitUrl || nothing}
                    ?disabled=${meta.baselineGitSha === 'N/A'}
                    >Baseline Commit
                    ${meta.baselineGitSha === 'N/A'
                      ? meta.baselineGitSha
                      : `#${meta.baselineGitSha.substring(0, 7)}`}</sbb-block-link
                  >`
                : nothing}
              ${meta.gitSha
                ? html`<sbb-block-link
                    icon-name="arrow-change-horizontal-small"
                    href=${meta.commitUrl || nothing}
                    ?disabled=${meta.gitSha === 'local'}
                    >Commit
                    ${meta.gitSha === 'local'
                      ? meta.gitSha
                      : `#${meta.gitSha.substring(0, 7)}`}</sbb-block-link
                  >`
                : nothing}
              <sbb-button-link
                class="app-compare-link"
                href="/compare/${screenshots.flatTestCases[0]?.path}"
              >
                ${!screenshots.baselineOnly ? `Start comparing` : `Check baselines`}
              </sbb-button-link>
            </sbb-action-group>
          </sbb-card>
          <sbb-accordion>
            ${screenshots.components.map(
              (screenshotComponent) => html`
                <sbb-expansion-panel ?expanded=${screenshots!.components.length === 1}>
                  <sbb-expansion-panel-header>
                    ${screenshotComponent.name} (${screenshotComponent.stats})
                  </sbb-expansion-panel-header>
                  <sbb-expansion-panel-content>
                    <sbb-link-list>
                      ${screenshotComponent.testCases.map(
                        (entry) =>
                          html`<sbb-block-link href="/compare/${entry.path}">
                            ${entry.name}
                          </sbb-block-link>`,
                      )}
                    </sbb-link-list>
                  </sbb-expansion-panel-content>
                </sbb-expansion-panel>
              `,
            )}
          </sbb-accordion>
        </div>
      </sbb-container>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'app-overview': Overview;
  }
}
