import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../../core/decorators.js';
import { isLean, setOrRemoveAttribute } from '../../core/dom.js';
import { SbbNamedSlotListMixin, type WithListChildren } from '../../core/mixins.js';
import type { SbbTagElement, SbbTagSize } from '../tag.js';

import style from './tag-group.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-tag`.
 *
 * @slot - Use the unnamed slot to add one or more 'sbb-tag' elements to the `sbb-tag-group`.
 */
export
@customElement('sbb-tag-group')
class SbbTagGroupElement extends SbbNamedSlotListMixin<SbbTagElement, typeof LitElement>(
  LitElement,
) {
  public static override styles: CSSResultGroup = style;
  // DIV is added here due to special requirements from sbb.ch.
  protected override readonly listChildLocalNames = ['sbb-tag', 'div'];

  /**
   * This will be forwarded as aria-label to the inner list.
   */
  @forceType()
  @property({ attribute: 'list-accessibility-label' })
  public accessor listAccessibilityLabel: string = '';

  /**
   * If set multiple to false, the selection is exclusive and the value is a string (or null).
   * If set multiple to true, the selection can have multiple values and therefore value is an array.
   *
   * Changing multiple during run time is not supported.
   */
  @forceType()
  @property({ type: Boolean })
  public accessor multiple: boolean = false;

  /**
   * Tag group size, either s or m.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: SbbTagSize = isLean() ? 's' : 'm';

  /**
   * Value of the sbb-tag-group.
   * If set multiple to false, the value is a string (or null).
   * If set multiple to true, the value is an array.
   */
  @property()
  public set value(value: string | (string | null)[] | null) {
    const tags = this.tags;
    if (isServer) {
      this._value = value;
    } else if (value === null) {
      tags.forEach((t) => (t.checked = false));
    } else if (this.multiple) {
      if (!Array.isArray(value) && tags.every((t) => t.value !== value)) {
        try {
          // If it is multiple mode and no tag matches the value, we try to parse the value as JSON.
          // This allows server side rendering to use array values to be passed to the client side.
          value = JSON.parse(value);
        } catch {
          /* empty */
        }
      }
      const valueAsArray = Array.isArray(value) ? value : [value];
      tags.forEach((t) => (t.checked = valueAsArray.includes(t.value ?? t.getAttribute('value'))));
    } else {
      if (!Array.isArray(value)) {
        tags.forEach((t) => (t.checked = (t.value ?? t.getAttribute('value')) === value));
      } else if (import.meta.env.DEV) {
        console.warn('value must not be set as an array in singular mode.', value);
      }
    }
  }
  public get value(): string | (string | null)[] | null {
    return isServer
      ? this._value
      : this.multiple
        ? this.tags.filter((t) => t.checked).map((t) => t.value)
        : (this.tags.find((t) => t.checked)?.value ?? null);
  }
  private _value: string | (string | null)[] | null = null;

  /** The child instances of sbb-tag as an array. */
  public get tags(): SbbTagElement[] {
    return Array.from(this.querySelectorAll?.('sbb-tag') ?? []);
  }

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('size')) {
      this.tags.forEach((t) => t.requestUpdate?.('size'));
    }

    if (
      (changedProperties.has('listChildren') || changedProperties.has('multiple')) &&
      !this.multiple
    ) {
      // Ensure only one tag checked
      this.tags
        .filter((tag) => tag.checked)
        .slice(1)
        .forEach((tag) => (tag.checked = false));
    }
    setOrRemoveAttribute(
      this,
      'role',
      changedProperties.has('listAccessibilityLabel') && this.listAccessibilityLabel
        ? null
        : 'group',
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-tag-group">
        ${this.renderList({
          class: 'sbb-tag-group__list',
          ariaLabel: this.listAccessibilityLabel,
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tag-group': SbbTagGroupElement;
  }
}
