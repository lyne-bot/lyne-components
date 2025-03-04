import { type CSSResultGroup, isServer, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { inputAutocompleteEvent } from '../../autocomplete.js';
import { getNextElementIndex, isArrowKeyPressed } from '../../core/a11y.js';
import { forceType, hostAttributes } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledMixin,
  SbbFormAssociatedMixin,
  SbbNegativeMixin,
} from '../../core/mixins.js';
import { SbbChipElement } from '../chip.js';

import style from './chip-group.scss?lit&inline';

export interface SbbChipInputTokenEndEventDetails {
  /** The element that triggered the chip creation */
  origin: 'input' | 'autocomplete';
  /** The value of the new chip. Either the input or the option value depending on the origin */
  value: string;
  label?: string;
  /** Set a new value for the chip that will be created */
  setValue(value: string): void;
  /** Set a label for the chip that will be created */
  setLabel(value: string): void;
}

/**
 * The `sbb-chip-group` component is used as a container for one or multiple `sbb-chip`.
 *
 * @event {CustomEvent<void>} change - Notifies that the component's value has changed.
 * @event {CustomEvent<void>} input - Notifies that the component's value has changed.
 * @event {CustomEvent<SbbChipInputTokenEndEventDetails>} chipInputTokenEnd - Notifies that a chip is about to be created. Can be prevented.
 * @slot - Use the unnamed slot to add `sbb-chip` elements.
 * @overrideType value - string[] | null
 */
export
@customElement('sbb-chip-group')
@hostAttributes({
  tabindex: '0',
  role: 'grid',
})
class SbbChipGroupElement extends SbbDisabledMixin(
  SbbNegativeMixin(SbbFormAssociatedMixin<typeof LitElement, string[]>(LitElement)),
) {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    input: 'input',
    change: 'change',
    chipInputTokenEnd: 'chipInputTokenEnd',
  } as const;

  /** Value of the form element. */
  @property({ type: Array })
  public override set value(value: string[] | null) {
    value = value ?? [];
    super.value = value;
    const oldValue = this.value;

    // Subtract from 'oldValue' the new 'value'
    // The result are the chips to remove (handle duplicates)
    const toRemove = [...oldValue];
    for (const c of value) {
      if (toRemove.includes(c)) {
        toRemove.splice(toRemove.indexOf(c), 1);
      }
    }
    toRemove.forEach((value) =>
      this._chipElements()
        .find((c) => c.value === value)
        ?.remove(),
    );

    // Subtract from the new 'value' what was already present
    // The result are the new chips to add (handle duplicates)
    const toAdd = [...value];
    for (const c of oldValue) {
      if (toAdd.includes(c)) {
        toAdd.splice(toAdd.indexOf(c), 1);
      }
    }
    toAdd.forEach((c) => this._createChipElement(c));
  }
  public override get value(): string[] {
    return this._chipElements().map((c) => c.value);
  }

  /** The keys that will be used to split the token when the user creates a new chip (e.g. ',;.') */
  @forceType()
  @property({ attribute: 'separator-keys' })
  public accessor separatorKeys: string = null!;

  /** Notifies that the component's value has changed. */
  private _change: EventEmitter = new EventEmitter(this, SbbChipGroupElement.events.change);

  /** Notifies that the component's value has changed. */
  private _input: EventEmitter = new EventEmitter(this, SbbChipGroupElement.events.input);

  /** Notifies that a chip is about to be created. Can be prevented. */
  private _chipInputTokenEnd = new EventEmitter<SbbChipInputTokenEndEventDetails>(
    this,
    SbbChipGroupElement.events.chipInputTokenEnd,
  );

  /**
   * Listens to the changes on `readonly` and `disabled` attributes of `<input>`.
   */
  private _inputAttributeObserver = !isServer
    ? new MutationObserver(() => this._reactToInputChanges())
    : null;

  private _inputElement: HTMLInputElement | undefined;
  private _inputAbortController: AbortController | undefined;

  public constructor() {
    super();
    this.addEventListener(SbbChipElement.events.requestDelete, (ev) =>
      this._deleteChip(ev.target as SbbChipElement),
    );

    this.addEventListener('focus', () => this._focusChip());
    this.addEventListener('keydown', (ev) => this._onChipKeyDown(ev));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-size', this.closest('sbb-form-field')?.size ?? 'm');
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._inputAttributeObserver?.disconnect();
    this._inputAbortController?.abort();
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (
      changedProperties.has('disabled') ||
      changedProperties.has('formDisabled') ||
      changedProperties.has('negative')
    ) {
      this._proxyStateToChips();
    }
  }

  /** @internal */
  public formResetCallback(): void {
    this.value = null;
  }

  /** @internal */
  public formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    if (!state) {
      this.value = null;
      return;
    }

    // the state format is ['field-name', 'value'][]
    this.value = (state as [string, string][]).map((entries) => entries[1]);
  }

  protected updateFormValue(): void {
    const data = new FormData();
    this.value.forEach((el) => data.append(this.name, el));
    this.internals.setFormValue(data);
  }

  /** Return the list of chip elements **/
  private _chipElements(): SbbChipElement[] {
    return Array.from(this.querySelectorAll?.('sbb-chip') ?? []);
  }

  /** Return the list of enabled chip elements **/
  private _enabledChipElements(): SbbChipElement[] {
    return Array.from(this.querySelectorAll?.('sbb-chip:not([disabled])') ?? []);
  }

  private _onSlotChange(): void {
    const input = this.querySelector('input');

    // Connect to the input
    if (input && input !== this._inputElement) {
      this._inputAbortController?.abort();
      this._inputAttributeObserver?.disconnect();
      this._inputElement = input;

      this._inputAbortController = new AbortController();
      this._inputElement.addEventListener('keydown', (ev) => this._onInputKeyDown(ev), {
        signal: this._inputAbortController.signal,
      });
      this._inputElement.addEventListener(
        inputAutocompleteEvent,
        () => this._createChipFromInput('autocomplete'),
        {
          signal: this._inputAbortController.signal,
        },
      );

      this._inputAttributeObserver?.observe(this._inputElement, {
        attributes: true,
        attributeFilter: ['readonly', 'disabled'],
      });
    }

    this.toggleAttribute('data-empty', this.value.length === 0);
    this._reactToInputChanges();
    this.updateFormValue();
  }

  /**
   * Listen for keyboard events on the chip elements
   **/
  private _onChipKeyDown(event: KeyboardEvent): void {
    const eventTarget = event.target as SbbChipElement;
    if (eventTarget.localName !== 'sbb-chip') {
      return;
    }

    // Arrow keys allow navigation between chips focus steps
    if (isArrowKeyPressed(event)) {
      // Collect an array of the enabled focus steps (2 for each chip)
      const focusSteps = this._enabledChipElements().flatMap((c) => c.getFocusSteps());

      // The true event target is shadowed by web-component boundary.
      // We have to pierce the shadowDOM to get the focused step
      const activeStep = eventTarget.shadowRoot!.activeElement as HTMLElement;

      const next = getNextElementIndex(event, focusSteps.indexOf(activeStep), focusSteps.length);
      focusSteps[next].focus();
      return;
    }

    switch (event.key) {
      case 'Backspace':
        if (!eventTarget.readonly && !eventTarget.disabled) {
          event.preventDefault();
          this._deleteChip(eventTarget);
        }
        break;
      case 'Tab':
        if (event.shiftKey) {
          this._allowFocusEscape();
        }
        break;
    }
  }

  /**
   * Listen for keyboard events on the input
   **/
  private _onInputKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        if (!event.defaultPrevented) {
          event.preventDefault();
          this._createChipFromInput('input');
        }
        break;
      case 'Backspace':
        if (!this._inputElement!.value) {
          this._focusChip();
        }
        break;
      case 'Tab':
        if (event.shiftKey && this._enabledChipElements().length === 0) {
          this._allowFocusEscape();
        }
        break;
    }
  }

  /**
   * If the input is not empty, create a chip with its value
   */
  private _createChipFromInput(origin: 'input' | 'autocomplete' = 'input'): void {
    const inputValue = this._inputElement!.value.trim();
    if (!inputValue) {
      return;
    }

    // Split the input value by each separator key
    const tokens = this.separatorKeys
      ? inputValue
          .split(
            new RegExp(
              this.separatorKeys
                .split('')
                .map((k) => `\\${k}`)
                .join('|'),
            ),
          )
          .map((t) => t.trim())
          .filter((t) => !!t)
      : [inputValue];

    for (const token of tokens) {
      const eventDetail: SbbChipInputTokenEndEventDetails = {
        origin: origin,
        value: token,
        label: undefined,
        setValue: (value: string) => (eventDetail.value = value),
        setLabel: (label: string) => (eventDetail.label = label),
      };

      if (!this._chipInputTokenEnd.emit(eventDetail)) {
        return; // event prevented; do nothing (the consumer has to create the chip)
      }

      this._createChipElement(eventDetail.value, eventDetail.label);
      this._inputElement!.value = ''; // Empty the input
      this._emitInputEvents();
    }
  }

  private _deleteChip(chip: SbbChipElement): void {
    const chips = this._enabledChipElements();
    chip.remove();
    this._emitInputEvents();
    this._focusChip(chips.indexOf(chip)); // Focus the next chip
  }

  /**
   * Focus an enabled chip. If none are present, focus the input
   * @param index The index of the enabled chip. If null, focus the last one.
   */
  private _focusChip(index?: number): void {
    const enabledChips = this._enabledChipElements();

    if (index !== undefined && enabledChips[index]) {
      enabledChips[index].focus();
      return;
    }

    if (enabledChips.length > 0) {
      enabledChips[enabledChips.length - 1].focus();
      return;
    }

    this._inputElement?.focus();
  }

  private _emitInputEvents(): void {
    this._input.emit();
    this._change.emit();
  }

  private _createChipElement(value: string, label?: string): void {
    const newChip = document.createElement('sbb-chip');
    newChip.setAttribute('value', value);
    newChip.innerText = label ?? '';
    this.insertBefore(newChip, this._inputElement!);
  }

  /**
   * Removes the `tabindex` from the chip-group and resets it back afterward, allowing the
   * user to tab out of it. This prevents the set from capturing focus and redirecting
   * it back to the last chip, creating a focus trap, if the user tries to tab away.
   */
  private _allowFocusEscape(): void {
    if (this.tabIndex !== -1) {
      const previousTabIndex = this.tabIndex;
      this.tabIndex = -1;

      // Note that this needs to be a `setTimeout`, because a `Promise.resolve`
      // doesn't allow enough time for the focus to escape.
      setTimeout(() => (this.tabIndex = previousTabIndex));
    }
  }

  private _reactToInputChanges(): void {
    this.disabled = this._inputElement?.disabled ?? false;
    this._proxyStateToChips();
  }

  private _proxyStateToChips(): void {
    this._chipElements().forEach((c) => {
      c.disabled = this.disabled || this.formDisabled;
      c.readonly = this._inputElement?.hasAttribute('readonly') ?? false;
      c.negative = this.negative;
    });
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-chip-group">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-chip-group': SbbChipGroupElement;
  }
}
