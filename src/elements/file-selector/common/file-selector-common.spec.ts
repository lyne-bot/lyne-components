import { expect } from '@open-wc/testing';
import { html, unsafeStatic } from 'lit/static-html.js';

import type { SbbSecondaryButtonElement } from '../../button.js';
import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbFileSelectorDropzoneElement } from '../file-selector-dropzone.js';
import type { SbbFileSelectorElement } from '../file-selector.js';

import '../file-selector-dropzone.js';
import '../file-selector.js';

import '../../button/secondary-button.js';

function createDataTransfer(
  numberOfFiles: number,
  filesContent: string | string[] = 'Hello world',
): DataTransfer {
  const dataTransfer: DataTransfer = new DataTransfer();
  for (let i: number = 0; i < numberOfFiles; i++) {
    const content = filesContent instanceof Array ? filesContent[i] : filesContent;
    dataTransfer.items.add(
      new File([`${content} - ${i}`], `hello${i}.txt`, {
        type: 'text/plain',
        lastModified: new Date(i).getMilliseconds(),
      }),
    );
  }
  return dataTransfer;
}

function addFiles(
  element: HTMLInputElement | SbbFileSelectorElement | SbbFileSelectorDropzoneElement,
  numberOfFiles: number,
  filesContent: string | string[] = 'Hello world',
): void {
  const dt = createDataTransfer(numberOfFiles, filesContent);
  let nativeInput: HTMLInputElement;

  if (element instanceof HTMLInputElement) {
    nativeInput = element;
    element.files = dt.files;
  } else {
    nativeInput = element.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    nativeInput.files = dt.files;
  }

  // Manually dispatch events to simulate a user interaction
  nativeInput.dispatchEvent(new Event('input', { composed: true, bubbles: true }));
  nativeInput.dispatchEvent(new Event('change'));
}

describe('sbb-file-selector common', () => {
  ['sbb-file-selector', 'sbb-file-selector-dropzone'].forEach((selector) => {
    const tagSingle = unsafeStatic(selector);

    describe(selector, () => {
      let form: HTMLFormElement;
      let element: SbbFileSelectorElement | SbbFileSelectorDropzoneElement;
      let input: HTMLInputElement;
      let fieldSet: HTMLFieldSetElement;
      let elemChangeEvent: EventSpy<Event>,
        elemInputEvent: EventSpy<Event>,
        nativeChangeEvent: EventSpy<Event>,
        nativeInputEvent: EventSpy<Event>;

      beforeEach(async () => {
        /* eslint-disable lit/binding-positions */
        form = await fixture(html`
          <form>
            <fieldset>
              <${tagSingle} name='fs'></${tagSingle}>
              <input type='file' name='native' />
            </fieldset>
          </form>
        `);
        /* eslint-enable lit/binding-positions */

        element = form.querySelector(selector)!;
        input = form.querySelector('input')!;
        fieldSet = form.querySelector('fieldset')!;

        // event spies
        elemChangeEvent = new EventSpy('change', element);
        elemInputEvent = new EventSpy('input', element);
        nativeChangeEvent = new EventSpy('change', input);
        nativeInputEvent = new EventSpy('input', input);

        await waitForLitRender(form);
      });

      function compareToNativeInput(): void {
        // Compare files
        expect(element.files.length, 'files - length').to.be.equal(Array.from(input.files!).length);
        element.files.forEach((e, i) => {
          expect(e.name, `file - name - ${i}`).to.be.equal(Array.from(input.files!)[i].name);
          expect(e.type, `file - type - ${i}`).to.be.equal(Array.from(input.files!)[i].type);
          expect(e.size, `file - size - ${i}`).to.be.equal(Array.from(input.files!)[i].size);
          expect(e.lastModified, `file - lastModified - ${i}`).to.be.equal(
            Array.from(input.files!)[i].lastModified,
          );

          expect(element.role, 'compare to native role').to.be.equal(input.role);
          expect(element.type, 'compare to native type').to.be.equal(input.type);
        });

        // Compare formData
        const formData = new FormData(form);
        const fileSelectorFormData = formData.getAll('fs');
        const inputFormData = formData.getAll('native');

        if (fileSelectorFormData.length === 0) {
          /**
           * Custom implementation
           * If empty, the native input adds an 'empty' file to the FormData (we don't).
           * So the equivalent of an empty 'sbb-file-selector' is a native with an empty file
           */
          expect(inputFormData.length, 'formData - no file').to.be.equal(1);
          expect((inputFormData[0] as File).size, 'formData - no file - size').to.be.equal(0);
          expect((inputFormData[0] as File).name, 'formData - no file - name').to.be.equal('');
        } else {
          expect(fileSelectorFormData.length, 'formData - files').to.be.equal(inputFormData.length);
          fileSelectorFormData.forEach((e, i) => {
            expect((e as File).name, `formData - file name - ${i}`).to.be.equal(
              (inputFormData[i] as File).name,
            );
            expect((e as File).type, `formData - file type - ${i}`).to.be.equal(
              (inputFormData[i] as File).type,
            );
            expect((e as File).size, `formData - file size - ${i}`).to.be.equal(
              (inputFormData[i] as File).size,
            );
            expect((e as File).lastModified, `formData - file lastModified - ${i}`).to.be.equal(
              (inputFormData[i] as File).lastModified,
            );
          });
        }

        expect(elemChangeEvent.count, 'change event').to.be.equal(nativeChangeEvent.count);
        expect(elemInputEvent.count, 'input event').to.be.equal(nativeInputEvent.count);
      }

      it('renders', () => {
        compareToNativeInput();
      });

      it('loads a file, then deletes it', async () => {
        const fileChangedSpy = new EventSpy('fileChanged');
        addFiles(element, 1);
        addFiles(input, 1);
        await waitForLitRender(form);

        expect(fileChangedSpy.count).to.be.equal(1);
        expect(element.files.length).to.be.equal(1);
        compareToNativeInput();

        const listItems = element.shadowRoot!.querySelector<HTMLElement>(
          '.sbb-file-selector__file-list',
        );
        expect(listItems).dom.to.be.equal(`
          <div class="sbb-file-selector__file-list">
            <span class="sbb-file-selector__file">
              <span class="sbb-file-selector__file-details">
                <span class="sbb-file-selector__file-name">hello0.txt</span>
                <span class="sbb-file-selector__file-size">15 B</span>
              </span>
              <sbb-secondary-button aria-label="Remove file - hello0.txt"
                                    icon-name="trash-small"
                                    data-action
                                    data-button
                                    data-sbb-button
                                    size="m"
                                    tabindex="0">
              </sbb-secondary-button>
            </span>
          </div>
        `);

        const button: SbbSecondaryButtonElement =
          element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
            'sbb-secondary-button[icon-name="trash-small"]',
          )!;
        expect(button).not.to.be.null;
        button.click();
        addFiles(input, 0);
        await waitForLitRender(form);

        const files = element.shadowRoot!.querySelectorAll('.sbb-file-selector__file');
        expect(fileChangedSpy.count).to.be.equal(2);
        expect(files.length).to.be.equal(0);
        compareToNativeInput();
      });

      it('loads a file, then reset the form', async () => {
        const fileChangedSpy = new EventSpy('fileChanged');
        addFiles(element, 1);
        addFiles(input, 1);
        await waitForLitRender(form);

        expect(fileChangedSpy.count).to.be.equal(1);
        expect(element.files.length).to.be.equal(1);
        compareToNativeInput();

        form.reset();
        await waitForLitRender(form);
        compareToNativeInput();
      });

      it('restore formState', async () => {
        const dt = createDataTransfer(2);
        const formRestoreState: [string, FormDataEntryValue][] = Array.from(dt.files).map((e) => [
          'fs',
          e,
        ]);
        element.formStateRestoreCallback(formRestoreState, 'restore');
        await waitForLitRender(form);
        expect(element.files.length).to.be.equal(2);
      });

      it('loads more than one file in multiple mode', async () => {
        const fileChangedSpy = new EventSpy('fileChanged');
        element.multiple = true;
        input.multiple = true;
        await waitForLitRender(form);
        addFiles(element, 2);
        addFiles(input, 2);
        await waitForLitRender(form);
        expect(fileChangedSpy.count).to.be.equal(1);
        compareToNativeInput();

        const listItems = element.shadowRoot!.querySelectorAll('li');
        const filesDetails = element.shadowRoot!.querySelectorAll(
          '.sbb-file-selector__file-details',
        );
        const filesName = element.shadowRoot!.querySelectorAll('.sbb-file-selector__file-name');
        const filesSize = element.shadowRoot!.querySelectorAll('.sbb-file-selector__file-size');

        expect(listItems.length).to.be.equal(2);
        expect(filesDetails.length).to.be.equal(2);
        expect(filesName[0]).dom.text('hello0.txt');
        expect(filesName[1]).dom.text('hello1.txt');
        expect(filesSize[0]).dom.text('15 B');
        expect(filesSize[1]).dom.text('15 B');
      });

      it('loads files in multiple persistent mode', async () => {
        const fileChangedSpy = new EventSpy('fileChanged');
        element.multiple = true;
        element.multipleMode = 'persistent';
        await waitForLitRender(form);
        addFiles(element, 1);
        await waitForLitRender(form);
        expect(fileChangedSpy.count).to.be.equal(1);

        const filesDetails = element.shadowRoot!.querySelectorAll(
          '.sbb-file-selector__file-details',
        );
        let filesName = element.shadowRoot!.querySelectorAll('.sbb-file-selector__file-name');
        let filesSize = element.shadowRoot!.querySelectorAll('.sbb-file-selector__file-size');

        expect(element.files).not.to.be.null;
        expect(filesName.length).to.be.equal(1);
        expect(filesDetails.length).to.be.equal(1);
        expect(filesName[0]).dom.text('hello0.txt');
        expect(filesSize[0]).dom.text('15 B');

        const longContent = 'Lorem ipsum dolor sit amet. '.repeat(100);
        addFiles(element, 2, ['Hello world', longContent]);

        await waitForLitRender(form);

        const files = element.shadowRoot!.querySelectorAll('li');
        filesName = element.shadowRoot!.querySelectorAll('.sbb-file-selector__file-name');
        filesSize = element.shadowRoot!.querySelectorAll('.sbb-file-selector__file-size');

        expect(fileChangedSpy.count).to.be.equal(2);
        expect(files.length).to.be.equal(2);
        expect(filesName[0]).dom.text('hello1.txt');
        expect(filesSize[0]).dom.text('3 kB');
        expect(filesName[1]).dom.text('hello0.txt');
        expect(filesSize[1]).dom.text('15 B');
      });

      it('should update formValue on name change', async () => {
        addFiles(element, 1);
        await waitForLitRender(form);

        let formData = new FormData(form);
        const fileSelectorFormData = formData.getAll('fs');
        expect(fileSelectorFormData.length).to.be.equal(1);

        element.name = 'new-fs';
        await waitForLitRender(form);

        formData = new FormData(form);
        expect(formData.getAll('fs').length).to.be.equal(0);
        expect(formData.getAll('new-fs').length).to.be.equal(1);
      });

      it('should result as :disabled', async () => {
        element.disabled = true;
        await waitForLitRender(form);

        expect(element).to.match(':disabled');

        element.disabled = false;
        await waitForLitRender(form);

        expect(element).not.to.match(':disabled');
      });

      it('should result :disabled if a fieldSet is', async () => {
        fieldSet.disabled = true;

        await waitForLitRender(form);

        expect(element).to.match(':disabled');

        fieldSet.disabled = false;
        await waitForLitRender(form);

        expect(element).not.to.match(':disabled');
      });
    });
  });
});
