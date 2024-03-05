import { assert, expect, fixture } from '@open-wc/testing';
import { a11ySnapshot, sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { isChromium, isFirefox } from '../../core/dom';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';
import type { SbbVisualCheckboxElement } from '../../visual-checkbox';

import { SbbCheckboxElement } from './checkbox';

interface CheckboxAccessibilitySnapshot {
  checked: boolean;
  role: string;
  disabled: boolean;
  required: boolean;
}

describe('sbb-checkbox', () => {
  describe('general', () => {
    let element: SbbCheckboxElement;

    beforeEach(async () => {
      await fixture(html`<sbb-checkbox name="name" value="value">Label</sbb-checkbox>`);
      element = document.querySelector<SbbCheckboxElement>('sbb-checkbox')!;
    });

    it('should render', async () => {
      assert.instanceOf(element, SbbCheckboxElement);
    });

    it('should not render accessibility label containing expanded state', async () => {
      expect(
        getComputedStyle(
          element.shadowRoot!.querySelector('.sbb-checkbox__expanded-label')!,
        ).getPropertyValue('display'),
      ).to.be.equal('none');
    });

    describe('events', () => {
      it('emit event on click', async () => {
        expect(element).not.to.have.attribute('checked');
        const changeSpy = new EventSpy('change');
        element.click();
        await waitForLitRender(element);
        expect(changeSpy.count).to.be.greaterThan(0);
        expect(element).not.to.have.attribute('checked');
        expect(element.checked).to.equal(true);
      });

      it('emit event on keypress', async () => {
        const changeSpy = new EventSpy('change');
        element.focus();
        await sendKeys({ press: 'Space' });
        await waitForCondition(() => changeSpy.count === 1);
        expect(changeSpy.count).to.be.greaterThan(0);
      });
    });

    it('should prevent scrolling on space bar press', async () => {
      const root = await fixture(
        html`<div style="height: 100px; overflow: scroll" id="scroll-context">
          <div style="height: 500px">
            <sbb-checkbox></sbb-checkbox>
          </div>
        </div>`,
      );
      element = root.querySelector<SbbCheckboxElement>('sbb-checkbox')!;
      expect(element).not.to.have.attribute('checked');
      expect(root.scrollTop).to.be.equal(0);

      element.focus();
      await sendKeys({ press: ' ' });
      await waitForLitRender(element);
      await waitForCondition(() => element.checked);
      expect(root.scrollTop).to.be.equal(0);
    });

    it('should reflect aria-required false', async () => {
      const snapshot = (await a11ySnapshot({
        selector: 'sbb-checkbox',
      })) as unknown as CheckboxAccessibilitySnapshot;

      expect(snapshot.required).to.be.undefined;
    });

    it('should reflect accessibility tree setting required attribute', async () => {
      element.toggleAttribute('required', true);
      await waitForLitRender(element);

      const snapshot = (await a11ySnapshot({
        selector: 'sbb-checkbox',
      })) as unknown as CheckboxAccessibilitySnapshot;

      // TODO: Recheck if it is working in Chromium
      if (!isChromium()) {
        expect(snapshot.required).to.be.true;
      }

      element.removeAttribute('required');
      await waitForLitRender(element);

      const snapshotAfterRemoved = (await a11ySnapshot({
        selector: 'sbb-checkbox',
      })) as unknown as CheckboxAccessibilitySnapshot;

      expect(snapshotAfterRemoved.required).not.to.be.ok;
    });

    it('should reflect accessibility tree setting required property', async () => {
      element.required = true;
      await waitForLitRender(element);

      const snapshot = (await a11ySnapshot({
        selector: 'sbb-checkbox',
      })) as unknown as CheckboxAccessibilitySnapshot;

      // TODO: Recheck if it is working in Chromium
      if (!isChromium()) {
        expect(snapshot.required).to.be.true;
      }

      element.required = false;
      await waitForLitRender(element);

      const snapshotAfterRemoved = (await a11ySnapshot({
        selector: 'sbb-checkbox',
      })) as unknown as CheckboxAccessibilitySnapshot;

      expect(snapshotAfterRemoved.required).not.to.be.ok;
    });

    it('should should restore form state on formStateRestoreCallback()', async () => {
      // Mimic tab restoration. Does not test the full cycle as we can not set the browser in the required state.
      element.formStateRestoreCallback('true', 'restore');
      await waitForLitRender(element);

      expect(element.checked).to.be.true;

      element.formStateRestoreCallback('false', 'restore');
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
    });
  });

  describe('comparing with native checkbox', () => {
    let element: HTMLInputElement | SbbCheckboxElement,
      form: HTMLFormElement,
      fieldset: HTMLFieldSetElement,
      formResetButton: HTMLButtonElement,
      inputSpy: EventSpy<any>,
      changeSpy: EventSpy<any>;

    interface CheckboxAssertionState {
      checkedAttribute: boolean;
      checkedProperty: boolean;
      indeterminateProperty: boolean;
      ariaChecked: boolean | 'mixed';
      inputEventCount: number;
      changeEventCount: number;
    }

    const assertState = async (assertions: CheckboxAssertionState): Promise<void> => {
      if (assertions.checkedAttribute) {
        expect(element).to.have.attribute('checked');
      } else {
        expect(element).not.to.have.attribute('checked');
      }
      expect(element.checked, `checked property`).to.be.equal(assertions.checkedProperty);
      expect(element.indeterminate, `indeterminate property`).to.be.equal(
        assertions.indeterminateProperty,
      );

      const snapshot = (await a11ySnapshot({
        selector: element.localName,
      })) as unknown as CheckboxAccessibilitySnapshot;

      expect(snapshot.role).to.equal('checkbox');

      expect(snapshot.checked, `ariaChecked in ${JSON.stringify(snapshot)}`).to.be.equal(
        isFirefox() && assertions.ariaChecked === false ? undefined : assertions.ariaChecked,
      );

      expect(inputSpy.count, `'input' event`).to.be.equal(assertions.inputEventCount);
      expect(changeSpy.count, `'change' event`).to.be.equal(assertions.changeEventCount);

      // Form state should always correspond to checked property.
      const formData = new FormData(form);
      expect(formData.get(element.localName)).to.be.equal(
        assertions.checkedProperty ? element.localName : null,
      );
    };

    ['input', 'sbb-checkbox'].forEach((selector) => {
      describe(selector, () => {
        describe('with initially unchecked attribute', () => {
          beforeEach(async () => {
            form = await fixture(
              html`<form>
                <fieldset>
                  <sbb-checkbox value="sbb-checkbox" name="sbb-checkbox">Label</sbb-checkbox>
                  <input value="input" name="input" type="checkbox" />
                </fieldset>
                <button type="reset">reset</button>
              </form>`,
            );
            await waitForLitRender(form);

            element = document.querySelector(selector)!;
            fieldset = document.querySelector<HTMLFieldSetElement>('fieldset')!;
            formResetButton = document.querySelector<HTMLButtonElement>(`button[type='reset']`)!;
            inputSpy = new EventSpy('input', element);
            changeSpy = new EventSpy('change', element);
          });

          it('should not have checked attribute initially', async () => {
            await assertState({
              ariaChecked: false,
              checkedAttribute: false,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should reflect state after clicking', async () => {
            element.click();
            await waitForLitRender(form);

            await assertState({
              ariaChecked: true,
              checkedAttribute: false,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 1,
              changeEventCount: 1,
            });

            element.click();
            await waitForLitRender(form);

            await assertState({
              ariaChecked: false,
              checkedAttribute: false,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 2,
              changeEventCount: 2,
            });
          });

          it('should reflect state after programmatic change ', async () => {
            element.checked = true;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: true,
              checkedAttribute: false,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });

            element.checked = false;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: false,
              checkedAttribute: false,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should no longer interpret attribute after programmatic change ', async () => {
            element.checked = true;
            await waitForLitRender(form);

            element.checked = false;
            await waitForLitRender(form);

            element.toggleAttribute('checked', true);
            await waitForLitRender(form);

            await assertState({
              ariaChecked: false,
              checkedAttribute: true,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should reflect state after adding attribute', async () => {
            element.toggleAttribute('checked', true);
            await waitForLitRender(form);

            await assertState({
              ariaChecked: true,
              checkedAttribute: true,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });

            element.removeAttribute('checked');
            await waitForLitRender(form);

            await assertState({
              ariaChecked: false,
              checkedAttribute: false,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should reflect indeterminate state', async () => {
            element.indeterminate = true;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: 'mixed',
              checkedAttribute: false,
              checkedProperty: false,
              indeterminateProperty: true,
              inputEventCount: 0,
              changeEventCount: 0,
            });

            element.checked = true;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: 'mixed',
              checkedAttribute: false,
              checkedProperty: true,
              indeterminateProperty: true,
              inputEventCount: 0,
              changeEventCount: 0,
            });

            element.checked = false;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: 'mixed',
              checkedAttribute: false,
              checkedProperty: false,
              indeterminateProperty: true,
              inputEventCount: 0,
              changeEventCount: 0,
            });

            element.click();
            await waitForLitRender(form);

            await assertState({
              ariaChecked: true,
              checkedAttribute: false,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 1,
              changeEventCount: 1,
            });

            element.indeterminate = true;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: 'mixed',
              checkedAttribute: false,
              checkedProperty: true,
              indeterminateProperty: true,
              inputEventCount: 1,
              changeEventCount: 1,
            });
          });

          it('should reset form controls by resetting programmatically', async () => {
            element.checked = true;
            await waitForLitRender(form);

            form.reset();
            await waitForLitRender(form);

            await assertState({
              ariaChecked: false,
              checkedAttribute: false,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should reset form controls by reset button click', async () => {
            element.checked = true;
            await waitForLitRender(form);

            formResetButton.click();
            await waitForLitRender(form);

            await assertState({
              ariaChecked: false,
              checkedAttribute: false,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should find connected form', () => {
            expect(element.form).to.be.equal(form);
          });

          describe('disabled state', () => {
            interface DisabledCheckboxAssertionState {
              disabledAttribute: boolean;
              disabledProperty: boolean;
              ariaDisabled: true | undefined;
              disabledSelector: boolean;
              focusable: boolean;
            }

            const assertDisabledState = async (
              assertions: DisabledCheckboxAssertionState,
            ): Promise<void> => {
              expect(element.disabled, 'disabled property').to.be.equal(
                assertions.disabledProperty,
              );

              if (assertions.disabledAttribute) {
                expect(element).to.have.attribute('disabled');
              } else {
                expect(element).not.to.have.attribute('disabled');
              }

              const disabledElements = Array.from(document.querySelectorAll(':disabled'));

              expect(disabledElements.includes(element), ':disabled selector').to.be.equal(
                assertions.disabledSelector,
              );

              const snapshot = (await a11ySnapshot({
                selector: element.localName,
              })) as unknown as CheckboxAccessibilitySnapshot;
              expect(snapshot.disabled, `ariaDisabled in ${JSON.stringify(snapshot)}`).to.be.equal(
                assertions.ariaDisabled,
              );

              element.focus();
              if (assertions.focusable) {
                expect(document.activeElement).to.be.equal(element);
              } else {
                expect(document.activeElement).not.to.be.equal(element);
              }
            };

            it('should be disabled if fieldset was disabled by attribute', async () => {
              fieldset.toggleAttribute('disabled', true);
              await waitForLitRender(form);

              await assertDisabledState({
                disabledProperty: false,
                disabledAttribute: false,
                disabledSelector: true,
                ariaDisabled: true,
                focusable: false,
              });

              if (selector === 'sbb-checkbox') {
                expect(
                  element.shadowRoot!.querySelector<SbbVisualCheckboxElement>(
                    'sbb-visual-checkbox',
                  )!.disabled,
                ).to.be.true;
              }
            });

            it('should be disabled if fieldset was disabled by property', async () => {
              fieldset.disabled = true;
              await waitForLitRender(form);

              await assertDisabledState({
                disabledProperty: false,
                disabledAttribute: false,
                disabledSelector: true,
                ariaDisabled: true,
                focusable: false,
              });

              if (selector === 'sbb-checkbox') {
                expect(
                  element.shadowRoot!.querySelector<SbbVisualCheckboxElement>(
                    'sbb-visual-checkbox',
                  )!.disabled,
                ).to.be.true;
              }
            });

            it('should be enabled if fieldset was enabled by attribute', async () => {
              fieldset.toggleAttribute('disabled', true);
              await waitForLitRender(form);

              fieldset.removeAttribute('disabled');
              await waitForLitRender(form);

              await assertDisabledState({
                disabledProperty: false,
                disabledAttribute: false,
                disabledSelector: false,
                ariaDisabled: undefined,
                focusable: true,
              });

              if (selector === 'sbb-checkbox') {
                expect(
                  element.shadowRoot!.querySelector<SbbVisualCheckboxElement>(
                    'sbb-visual-checkbox',
                  )!.disabled,
                ).to.be.false;
              }
            });

            it('should be enabled if fieldset was enabled by property', async () => {
              fieldset.disabled = true;
              await waitForLitRender(form);

              fieldset.disabled = false;
              await waitForLitRender(form);

              await assertDisabledState({
                disabledProperty: false,
                disabledAttribute: false,
                disabledSelector: false,
                ariaDisabled: undefined,
                focusable: true,
              });
              if (selector === 'sbb-checkbox') {
                expect(
                  element.shadowRoot!.querySelector<SbbVisualCheckboxElement>(
                    'sbb-visual-checkbox',
                  )!.disabled,
                ).to.be.false;
              }
            });

            it('should be disabled by attribute', async () => {
              element.toggleAttribute('disabled', true);
              await waitForLitRender(form);

              await assertDisabledState({
                disabledProperty: true,
                disabledAttribute: true,
                disabledSelector: true,
                ariaDisabled: true,
                focusable: false,
              });

              element.toggleAttribute('disabled', false);
              await waitForLitRender(form);

              await assertDisabledState({
                disabledProperty: false,
                disabledAttribute: false,
                disabledSelector: false,
                ariaDisabled: undefined,
                focusable: true,
              });
            });

            it('should be disabled by property', async () => {
              element.disabled = true;
              await waitForLitRender(form);

              await assertDisabledState({
                disabledProperty: true,
                disabledAttribute: true,
                disabledSelector: true,
                ariaDisabled: true,
                focusable: false,
              });

              element.disabled = false;
              await waitForLitRender(form);

              await assertDisabledState({
                disabledProperty: false,
                disabledAttribute: false,
                disabledSelector: false,
                ariaDisabled: undefined,
                focusable: true,
              });
            });

            it('should sync disabled attribute after re-enabling by property', async () => {
              element.toggleAttribute('disabled', true);
              await waitForLitRender(form);

              element.disabled = false;
              await waitForLitRender(form);

              await assertDisabledState({
                disabledProperty: false,
                disabledAttribute: false,
                disabledSelector: false,
                ariaDisabled: undefined,
                focusable: true,
              });
            });
          });
        });

        describe('with initially checked attribute', () => {
          beforeEach(async () => {
            form = await fixture(
              html`<form>
                <fieldset>
                  <sbb-checkbox value="sbb-checkbox" name="sbb-checkbox" checked>
                    Label
                  </sbb-checkbox>
                  <input value="input" name="input" type="checkbox" checked />
                </fieldset>
                <button type="reset">reset</button>
              </form>`,
            );
            await waitForLitRender(form);

            element = document.querySelector(selector)!;
            fieldset = document.querySelector<HTMLFieldSetElement>('fieldset')!;
            formResetButton = document.querySelector<HTMLButtonElement>(`button[type='reset']`)!;
            inputSpy = new EventSpy('input', element);
            changeSpy = new EventSpy('change', element);
          });

          it('should have checked attribute initially', async () => {
            await assertState({
              ariaChecked: true,
              checkedAttribute: true,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should reflect state after clicking', async () => {
            element.click();
            await waitForLitRender(form);

            await assertState({
              ariaChecked: false,
              checkedAttribute: true,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 1,
              changeEventCount: 1,
            });

            element.click();
            await waitForLitRender(form);

            await assertState({
              ariaChecked: true,
              checkedAttribute: true,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 2,
              changeEventCount: 2,
            });
          });

          it('should reflect state after programmatic change ', async () => {
            element.checked = false;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: false,
              checkedAttribute: true,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });

            element.checked = true;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: true,
              checkedAttribute: true,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should no longer interpret attribute after programmatic change ', async () => {
            element.checked = false;
            await waitForLitRender(form);

            element.checked = true;
            element.removeAttribute('checked');
            await waitForLitRender(form);

            await assertState({
              ariaChecked: true,
              checkedAttribute: false,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should reflect state after removing attribute', async () => {
            element.removeAttribute('checked');
            await waitForLitRender(form);

            await assertState({
              ariaChecked: false,
              checkedAttribute: false,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });

            element.toggleAttribute('checked', true);
            await waitForLitRender(form);

            await assertState({
              ariaChecked: true,
              checkedAttribute: true,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should reflect indeterminate state', async () => {
            element.indeterminate = true;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: 'mixed',
              checkedAttribute: true,
              checkedProperty: true,
              indeterminateProperty: true,
              inputEventCount: 0,
              changeEventCount: 0,
            });

            element.checked = false;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: 'mixed',
              checkedAttribute: true,
              checkedProperty: false,
              indeterminateProperty: true,
              inputEventCount: 0,
              changeEventCount: 0,
            });

            element.checked = true;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: 'mixed',
              checkedAttribute: true,
              checkedProperty: true,
              indeterminateProperty: true,
              inputEventCount: 0,
              changeEventCount: 0,
            });

            element.click();
            await waitForLitRender(form);

            await assertState({
              ariaChecked: false,
              checkedAttribute: true,
              checkedProperty: false,
              indeterminateProperty: false,
              inputEventCount: 1,
              changeEventCount: 1,
            });

            element.indeterminate = true;
            await waitForLitRender(form);

            await assertState({
              ariaChecked: 'mixed',
              checkedAttribute: true,
              checkedProperty: false,
              indeterminateProperty: true,
              inputEventCount: 1,
              changeEventCount: 1,
            });
          });

          it('should reset form controls by resetting programmatically', async () => {
            element.checked = false;
            await waitForLitRender(form);

            form.reset();
            await waitForLitRender(form);

            await assertState({
              ariaChecked: true,
              checkedAttribute: true,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });

          it('should reset form controls by reset button click', async () => {
            element.checked = false;
            await waitForLitRender(form);

            formResetButton.click();
            await waitForLitRender(form);

            await assertState({
              ariaChecked: true,
              checkedAttribute: true,
              checkedProperty: true,
              indeterminateProperty: false,
              inputEventCount: 0,
              changeEventCount: 0,
            });
          });
        });
      });
    });
  });
});
