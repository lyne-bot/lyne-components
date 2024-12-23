import type { LitElement, TemplateResult } from 'lit';
import { nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import type { SbbSecondaryButtonStaticElement } from '../../button.js';
import { sbbInputModalityDetector } from '../../core/a11y.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { forceType } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import { EventEmitter, forwardEvent } from '../../core/eventing.js';
import {
  i18nFileSelectorButtonLabel,
  i18nFileSelectorCurrentlySelected,
  i18nFileSelectorDeleteFile,
} from '../../core/i18n.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledMixin,
  SbbFormAssociatedMixin,
  type SbbFormAssociatedMixinType,
  type Constructor,
} from '../../core/mixins.js';

import '../../button/secondary-button.js';
import '../../button/secondary-button-static.js';
import '../../icon.js';

export declare abstract class SbbFileSelectorCommonElementMixinType extends SbbFormAssociatedMixinType {
  public accessor size: 's' | 'm';
  public accessor multiple: boolean;
  public accessor multipleMode: 'default' | 'persistent';
  public accessor accept: string;
  public accessor accessibilityLabel: string;
  public accessor disabled: boolean;
  public accessor files: Readonly<File>[];
  protected formDisabled: boolean;
  protected loadButton: SbbSecondaryButtonStaticElement;
  protected language: SbbLanguageController;
  protected abstract renderTemplate(input: TemplateResult): TemplateResult;
  protected createFileList(files: FileList): void;
  protected updateFormValue(): void;
  public formResetCallback(): void;
  public formStateRestoreCallback(state: FormRestoreState | null, reason: FormRestoreReason): void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFileSelectorCommonElementMixin = <T extends Constructor<LitElement>>(
  superclass: T,
): Constructor<SbbFileSelectorCommonElementMixinType> & T => {
  abstract class SbbFileSelectorCommonElement
    extends SbbDisabledMixin(SbbFormAssociatedMixin(superclass))
    implements Partial<SbbFileSelectorCommonElementMixinType>
  {
    public static readonly events = {
      fileChangedEvent: 'fileChanged',
    } as const;

    /**
     * Size variant, either s or m.
     * @default 'm' / 's' (lean)
     */
    @property({ reflect: true }) public accessor size: 's' | 'm' = isLean() ? 's' : 'm';

    /** Whether more than one file can be selected. */
    @forceType()
    @property({ type: Boolean })
    public accessor multiple: boolean = false;

    /** Whether the newly added files should override the previously added ones. */
    @property({ attribute: 'multiple-mode' })
    public accessor multipleMode: 'default' | 'persistent' = 'default';

    /** A comma-separated list of allowed unique file type specifiers. */
    @forceType()
    @property()
    public accessor accept: string = '';

    /** This will be forwarded as aria-label to the native input element. */
    @forceType()
    @property({ attribute: 'accessibility-label' })
    public accessor accessibilityLabel: string = '';

    /** The path of the first selected file. Empty string ('') if no file is selected */
    @property({ attribute: false })
    public override set value(value: string | null) {
      this._hiddenInput.value = value ?? '';

      if (!value) {
        this.files = [];
      }
    }

    public override get value(): string | null {
      return this._hiddenInput?.value;
    }

    /** The list of selected files. */
    @property({ attribute: false })
    public set files(value: Readonly<File>[]) {
      this._files = value ?? [];

      // update the inner input
      const dt: DataTransfer = new DataTransfer();
      this.files.forEach((e: Readonly<File>) => dt.items.add(e));
      this._hiddenInput.files = dt.files;

      this.updateFormValue();
    }
    public get files(): Readonly<File>[] {
      return this._files;
    }
    private _files: Readonly<File>[] = [];

    /**
     * Form type of element.
     * @default 'file'
     */
    public override get type(): string {
      return 'file';
    }

    /** An event which is emitted each time the file list changes. */
    private _fileChangedEvent: EventEmitter<Readonly<File>[]> = new EventEmitter(
      this,
      SbbFileSelectorCommonElement.events.fileChangedEvent,
    );

    private _hiddenInput!: HTMLInputElement;
    private _suffixes: string[] = ['B', 'kB', 'MB', 'GB', 'TB'];
    private _liveRegion!: HTMLParagraphElement;
    protected loadButton!: SbbSecondaryButtonStaticElement;
    protected language = new SbbLanguageController(this);

    protected abstract renderTemplate(input: TemplateResult): TemplateResult;

    public override formResetCallback(): void {
      this.files = [];
    }

    public override formStateRestoreCallback(
      state: FormRestoreState | null,
      _reason?: FormRestoreReason,
    ): void {
      if (!state) {
        return;
      }
      this.files = (state as [string, FormDataEntryValue][]).map(
        ([_, value]) => value as Readonly<File>,
      );
    }

    protected override updateFormValue(): void {
      const formValue = new FormData();
      this.files.forEach((file) => formValue.append(this.name, file));
      this.internals.setFormValue(formValue);
    }

    private _checkFileEquality(file1: Readonly<File>, file2: Readonly<File>): boolean {
      return (
        file1.name === file2.name &&
        file1.size === file2.size &&
        file1.lastModified === file2.lastModified
      );
    }

    private _onFocus(): void {
      if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
        this.loadButton.toggleAttribute('data-focus-visible', true);
      }
    }

    private _onBlur(): void {
      if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
        this.loadButton.removeAttribute('data-focus-visible');
      }
    }

    private _readFiles(event: Event): void {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files) {
        this.createFileList(fileInput.files);
      }
      forwardEvent(event, this);
    }

    protected createFileList(files: FileList): void {
      if (!this.multiple || this.multipleMode !== 'persistent' || this.files.length === 0) {
        this.files = Array.from(files);
      } else {
        this.files = Array.from(files)
          .filter(
            // Remove duplicates
            (newFile: Readonly<File>): boolean =>
              this.files!.findIndex((oldFile: Readonly<File>) =>
                this._checkFileEquality(newFile, oldFile),
              ) === -1,
          )
          .concat(this.files);
      }
      this._updateA11yLiveRegion();
      this._fileChangedEvent.emit(this.files);
    }

    private _removeFile(file: Readonly<File>): void {
      this.files = this.files.filter((f: Readonly<File>) => !this._checkFileEquality(file, f));
      this._updateA11yLiveRegion();

      // Dispatch native events as if the reset is done via the file selection window.
      this.dispatchEvent(new Event('input', { composed: true, bubbles: true }));
      this.dispatchEvent(new Event('change', { bubbles: true }));
      this._fileChangedEvent.emit(this.files);
    }

    /** Calculates the correct unit for the file's size. */
    private _formatFileSize(size: number): string {
      const i: number = Math.floor(Math.log(size) / Math.log(1024));
      return `${(size / Math.pow(1024, i)).toFixed(0)} ${this._suffixes[i]}`;
    }

    private _updateA11yLiveRegion(): void {
      this._liveRegion.innerText = i18nFileSelectorCurrentlySelected(this.files.map((e) => e.name))[
        this.language.current
      ];
    }

    private _renderFileList(): TemplateResult {
      const TAG_NAME: Record<string, string> =
        this.files.length > 1
          ? { WRAPPER: 'ul', ELEMENT: 'li' }
          : { WRAPPER: 'div', ELEMENT: 'span' };

      /* eslint-disable lit/binding-positions */
      return html`
      <${unsafeStatic(TAG_NAME.WRAPPER)} class='sbb-file-selector__file-list'>
        ${this.files.map(
          (file: Readonly<File>) => html`
            <${unsafeStatic(TAG_NAME.ELEMENT)} class='sbb-file-selector__file'>
                <span class='sbb-file-selector__file-details'>
                  <span class='sbb-file-selector__file-name'>${file.name}</span>
                  <span class='sbb-file-selector__file-size'>${this._formatFileSize(file.size)}</span>
                </span>
              <sbb-secondary-button
                size='${this.size}'
                icon-name='trash-small'
                @click='${() => this._removeFile(file)}'
                aria-label='${`${i18nFileSelectorDeleteFile[this.language.current]} - ${file.name}`}'
              ></sbb-secondary-button>
            </${unsafeStatic(TAG_NAME.ELEMENT)}>`,
        )}
      </${unsafeStatic(TAG_NAME.WRAPPER)}>
    `;
      /* eslint-enable lit/binding-positions */
    }

    protected override render(): TemplateResult {
      const ariaLabel = this.accessibilityLabel
        ? `${i18nFileSelectorButtonLabel[this.language.current]} - ${this.accessibilityLabel}`
        : undefined;
      return html`
        <div class="sbb-file-selector">
          ${this.renderTemplate(
            html`<input
              class="sbb-file-selector__visually-hidden"
              type="file"
              ?disabled="${this.disabled || this.formDisabled}"
              ?multiple="${this.multiple}"
              accept="${this.accept || nothing}"
              aria-label="${ariaLabel || nothing}"
              @change="${this._readFiles}"
              @focus="${this._onFocus}"
              @blur="${this._onBlur}"
              ${ref((el?: Element): void => {
                this._hiddenInput = el as HTMLInputElement;
              })}
            />`,
          )}
          <p
            role="status"
            class="sbb-file-selector__visually-hidden"
            ${ref((p?: Element) => (this._liveRegion = p as HTMLParagraphElement))}
          ></p>
          ${this.files.length > 0 ? this._renderFileList() : nothing}
          <div class="sbb-file-selector__error">
            <slot name="error"></slot>
          </div>
        </div>
      `;
    }
  }
  return SbbFileSelectorCommonElement as unknown as Constructor<SbbFileSelectorCommonElementMixinType> &
    T;
};
