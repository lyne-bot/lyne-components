import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { SbbActionBaseElement } from '../../core/base-elements.js';
import { isLean } from '../../core/dom.js';
import type { AbstractConstructor } from '../../core/mixins.js';
import type { SbbNavigationButtonElement } from '../navigation-button.js';
import type { SbbNavigationLinkElement } from '../navigation-link.js';
import type { SbbNavigationMarkerElement } from '../navigation-marker.js';
import type { SbbNavigationSectionElement } from '../navigation-section.js';

import style from './navigation-action.scss?lit&inline';

import '../../icon.js';

export type SbbNavigationActionSize = 's' | 'm' | 'l';

export declare class SbbNavigationActionCommonElementMixinType {
  public accessor size: SbbNavigationActionSize;
  public get marker(): SbbNavigationMarkerElement | null;
  public get section(): SbbNavigationSectionElement | null;
  public connectedSection: SbbNavigationSectionElement | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNavigationActionCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbNavigationActionCommonElementMixinType> & T => {
  abstract class SbbNavigationActionCommonElement
    extends superClass
    implements Partial<SbbNavigationActionCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /**
     * Action size variant, either s, m or l.
     * @default 'l' / 's' (lean)
     */
    @property({ reflect: true }) public accessor size: SbbNavigationActionSize = isLean()
      ? 's'
      : 'l';

    /** The section that is beign controlled by the action, if any. */
    public connectedSection?: SbbNavigationSectionElement;

    /** The navigation marker in which the action is nested. */
    public get marker(): SbbNavigationMarkerElement | null {
      return this._navigationMarker;
    }

    /** The section in which the action is nested. */
    public get section(): SbbNavigationSectionElement | null {
      return this._navigationSection;
    }

    private _navigationMarker: SbbNavigationMarkerElement | null = null;
    private _navigationSection: SbbNavigationSectionElement | null = null;

    protected constructor(...args: any[]) {
      super(...args);
      this.addEventListener?.('click', () => {
        if (
          !this.hasAttribute('data-action-active') &&
          this._navigationMarker &&
          !this.connectedSection
        ) {
          this.marker?.select(
            this as unknown as SbbNavigationButtonElement | SbbNavigationLinkElement,
          );
        }
      });
    }

    public override connectedCallback(): void {
      super.connectedCallback();

      // Check if the current element is nested inside a navigation marker.
      this._navigationMarker = this.closest('sbb-navigation-marker');

      // Check if the current element is nested inside a navigation section.
      this._navigationSection = this.closest('sbb-navigation-section');
      this.toggleAttribute('data-section-action', !!this._navigationSection);
    }

    protected override renderTemplate(): TemplateResult {
      return html`<sbb-icon name="dash-small"></sbb-icon> <slot></slot>`;
    }
  }
  return SbbNavigationActionCommonElement as unknown as AbstractConstructor<SbbNavigationActionCommonElementMixinType> &
    T;
};
