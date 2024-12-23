import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { type CSSResultGroup, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isLean } from '../../core/dom.js';
import { SbbNamedSlotListMixin, type WithListChildren } from '../../core/mixins.js';
import type { SbbNavigationButtonElement } from '../navigation-button.js';
import type { SbbNavigationLinkElement } from '../navigation-link.js';

import style from './navigation-marker.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-navigation-button`/`sbb-navigation-link` within a `sbb-navigation`.
 *
 * @slot - Use the unnamed slot to add `sbb-navigation-button`/`sbb-navigation-link` elements into the `sbb-navigation-marker`.
 */
export
@customElement('sbb-navigation-marker')
class SbbNavigationMarkerElement extends SbbNamedSlotListMixin<
  SbbNavigationButtonElement | SbbNavigationLinkElement,
  typeof LitElement
>(LitElement) {
  public static override styles: CSSResultGroup = style;
  protected override readonly listChildLocalNames = [
    'sbb-navigation-button',
    'sbb-navigation-link',
  ];

  /**
   * Marker size variant, either s or l.
   * @default 'l' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 'l' | 's' = isLean() ? 's' : 'l';

  private _currentActiveAction?: SbbNavigationButtonElement | SbbNavigationLinkElement;

  public constructor() {
    super();

    new ResizeController(this, {
      skipInitial: true,
      callback: () => this._setMarkerPosition(),
    });
  }

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('size') || changedProperties.has('listChildren')) {
      this._updateMarkerActions();
    }
    this.toggleAttribute('data-has-active-action', !!this._currentActiveAction);
  }

  private _updateMarkerActions(): void {
    for (const action of this.listChildren) {
      action.size = this.size;
    }

    this._currentActiveAction = this.listChildren.find((action) =>
      action.hasAttribute('data-action-active'),
    );
    this._setMarkerPosition();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._checkActiveAction();
  }

  private _checkActiveAction(): void {
    const activeAction = this.querySelector(
      ':is(sbb-navigation-button, sbb-navigation-link).sbb-active',
    ) as SbbNavigationButtonElement | SbbNavigationLinkElement;
    if (activeAction) {
      this.select(activeAction);
    }
  }

  public select(action: SbbNavigationButtonElement | SbbNavigationLinkElement): void {
    if (!action) {
      return;
    }
    this.reset();
    action.toggleAttribute('data-action-active', true);
    this._currentActiveAction = action;
    setTimeout(() => this._setMarkerPosition());
  }

  protected override firstUpdated(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.firstUpdated(changedProperties);

    setTimeout(() => this._setMarkerPosition());
  }

  public reset(): void {
    if (this._currentActiveAction) {
      this._currentActiveAction.removeAttribute('data-action-active');
      this._currentActiveAction.connectedSection?.close();
      this._currentActiveAction = undefined;
    }
  }

  private _setMarkerPosition(): void {
    if (!this._currentActiveAction) {
      return;
    }

    const index = this.listChildren.indexOf(this._currentActiveAction)!;
    const value = this.shadowRoot!.querySelector<HTMLLIElement>(
      `li:nth-child(${index + 1})`,
    )?.offsetTop;
    if (value != null) {
      this.style?.setProperty('--sbb-navigation-marker-position-y', `${value}px`);
    }
  }

  protected override render(): TemplateResult {
    return this.renderList();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-marker': SbbNavigationMarkerElement;
  }
}
