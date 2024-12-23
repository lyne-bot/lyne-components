import { type CSSResultGroup, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonStaticElement } from '../../button.js';
import { slotState } from '../../core/decorators.js';
import { i18nFileSelectorButtonLabel } from '../../core/i18n.js';
import { fileSelectorCommonStyle, SbbFileSelectorCommonElementMixin } from '../common.js';

import '../../button/secondary-button.js';
import '../../button/secondary-button-static.js';
import '../../icon.js';

/**
 * It allows to select one or more file from storage devices and display them.
 *
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 * @event {CustomEvent<Readonly<File>[]>} fileChanged - An event which is emitted each time the file list changes.
 * @event change - An event which is emitted each time the user modifies the value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value
 * @event input - An event which is emitted each time the value changes as a direct result of a user action.
 */
export
@customElement('sbb-file-selector')
@slotState()
class SbbFileSelectorElement extends SbbFileSelectorCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = fileSelectorCommonStyle;
  public static readonly events = {
    fileChangedEvent: 'fileChanged',
  } as const;

  protected override renderTemplate(input: TemplateResult): TemplateResult {
    return html`
      <div class="sbb-file-selector__input-container">
        <label>
          <sbb-secondary-button-static
            size=${this.size}
            icon-name="folder-open-small"
            ?disabled=${this.disabled || this.formDisabled}
            ${ref((el?: Element): void => {
              this.loadButton = el as SbbSecondaryButtonStaticElement;
            })}
          >
            ${i18nFileSelectorButtonLabel[this.language.current]}
          </sbb-secondary-button-static>
          ${input}
        </label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-file-selector': SbbFileSelectorElement;
  }
}
