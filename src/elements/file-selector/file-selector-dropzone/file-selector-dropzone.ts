import { type CSSResultGroup, LitElement, type TemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonStaticElement } from '../../button.js';
import { forceType, slotState } from '../../core/decorators.js';
import { i18nFileSelectorButtonLabel, i18nFileSelectorSubtitleLabel } from '../../core/i18n.js';
import { fileSelectorCommonStyle, SbbFileSelectorCommonElementMixin } from '../common.js';

import '../../button/secondary-button.js';
import '../../button/secondary-button-static.js';
import '../../icon.js';

import style from './file-selector-dropzone.scss?lit&inline';

/**
 * It allows to select one or more file from storage devices via button click or drag and drop, and display them.
 *
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 * @event {CustomEvent<Readonly<File>[]>} fileChanged - An event which is emitted each time the file list changes.
 * @event change - An event which is emitted each time the user modifies the value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value
 * @event input - An event which is emitted each time the value changes as a direct result of a user action.
 */
export
@customElement('sbb-file-selector-dropzone')
@slotState()
class SbbFileSelectorDropzoneElement extends SbbFileSelectorCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = [fileSelectorCommonStyle, style];
  public static readonly events = {
    fileChangedEvent: 'fileChanged',
  } as const;

  /** The title displayed in `dropzone` variant. */
  @forceType()
  @property({ attribute: 'title-content' })
  public accessor titleContent: string = '';

  // Safari has a peculiar behavior when dragging files on the inner button in 'dropzone' variant;
  // this will require a counter to correctly handle the dragEnter/dragLeave.
  private _counter: number = 0;
  private _dragTarget?: HTMLElement;

  private _blockEvent(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }

  private _onDragEnter(event: DragEvent): void {
    this._counter++;
    if (!this.disabled && !this.formDisabled) {
      this._setDragState(event.target as HTMLElement, true);
      this._blockEvent(event);
    }
  }

  private _onDragLeave(event: DragEvent): void {
    this._counter--;
    if (
      !this.disabled &&
      !this.formDisabled &&
      event.target === this._dragTarget &&
      this._counter === 0
    ) {
      this._setDragState();
      this._blockEvent(event);
    }
  }

  private _onFileDrop(event: DragEvent): void {
    this._counter = 0;
    if (!this.disabled && !this.formDisabled) {
      this._setDragState();
      this._blockEvent(event);
      this.createFileList(event.dataTransfer!.files);
    }
  }

  private _setDragState(
    dragTarget: HTMLElement | undefined = undefined,
    isDragEnter: boolean = false,
  ): void {
    this._dragTarget = dragTarget;
    this.toggleAttribute('data-active', isDragEnter);
    this.loadButton.toggleAttribute('data-active', isDragEnter);
  }

  protected override renderTemplate(input: TemplateResult): TemplateResult {
    return html`
      <div
        class="sbb-file-selector__input-container"
        @dragenter=${this._onDragEnter}
        @dragover=${this._blockEvent}
        @dragleave=${this._onDragLeave}
        @drop=${this._onFileDrop}
      >
        <label>
          <span class="sbb-file-selector__dropzone-area">
            <span class="sbb-file-selector__dropzone-area--icon">
              <sbb-icon
                name=${this.size === 'm' ? 'folder-open-medium' : 'folder-open-small'}
              ></sbb-icon>
            </span>
            <span class="sbb-file-selector__dropzone-area--title">${this.titleContent}</span>
            <span class="sbb-file-selector__dropzone-area--subtitle">
              ${i18nFileSelectorSubtitleLabel[this.language.current]}
            </span>
            <span class="sbb-file-selector__dropzone-area--button">
              <sbb-secondary-button-static
                size=${this.size}
                ?disabled=${this.disabled || this.formDisabled}
                ${ref((el?: Element): void => {
                  this.loadButton = el as SbbSecondaryButtonStaticElement;
                })}
              >
                ${i18nFileSelectorButtonLabel[this.language.current]}
              </sbb-secondary-button-static>
            </span>
          </span>
          ${input}
        </label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-file-selector-dropzone': SbbFileSelectorDropzoneElement;
  }
}
