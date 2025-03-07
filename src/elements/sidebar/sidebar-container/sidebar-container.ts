import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { sidebarContainerCommonStyle } from '../common.js';
import type { SbbSidebarElement } from '../sidebar.js';

import style from './sidebar-container.scss?lit&inline';

const sidebarContainerRegistry = new Set<SbbSidebarContainerElement>();
let sidebarContainerResizeObserver: ResizeObserver | undefined;

const MIN_WIDTH_BEFORE_COLLAPSE = 320;

/**
 * This is the parent component to one or two `<sbb-sidebar>`s that validates the state internally
 * and coordinates the backdrop and content styling.
 *
 * @slot - Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements.
 */
export
@customElement('sbb-sidebar-container')
class SbbSidebarContainerElement extends LitElement {
  public static override styles: CSSResultGroup = [sidebarContainerCommonStyle, style];

  /** The sidebar children. */
  public get sidebars(): SbbSidebarElement[] {
    return Array.from(this.querySelectorAll<SbbSidebarElement>(`:scope > sbb-sidebar`));
  }

  /** The sidebar child with the `start` position. */
  public get start(): SbbSidebarElement | null {
    return this.querySelector<SbbSidebarElement>(`:scope > sbb-sidebar:not([position='end'])`);
  }

  /** The sidebar child with the `end` position. */
  public get end(): SbbSidebarElement | null {
    return this.querySelector<SbbSidebarElement>(`:scope > sbb-sidebar[position='end']`);
  }

  private _forcedClosedSidebars = new WeakSet<SbbSidebarElement>();

  public override connectedCallback(): void {
    super.connectedCallback();

    sidebarContainerResizeObserver ??=
      !isServer && new ResizeObserver(() => this._handleWidthChange());

    if (!isServer && sidebarContainerRegistry.size === 0) {
      sidebarContainerResizeObserver.observe(document?.documentElement);
    }

    sidebarContainerRegistry.add(this);

    this._handleWidthChange();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    sidebarContainerRegistry.delete(this);

    if (sidebarContainerRegistry.size === 0) {
      sidebarContainerResizeObserver?.disconnect();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._handleWidthChange();
  }

  private _handleWidthChange(): void {
    Array.from(sidebarContainerRegistry)
      .sort((c1, c2) => c1.compareDocumentPosition(c2) & Node.DOCUMENT_POSITION_FOLLOWING)
      .forEach((c) => c._calculateSpaceState());
  }

  /**
   * Closes and opens sidebars depending on available width
   * of the container and its parent container.
   */
  private async _calculateSpaceState(): Promise<void> {
    if (isServer) {
      return;
    }

    const parentSidebarContainer =
      this.parentElement?.closest<SbbSidebarContainerElement>('sbb-sidebar-container');

    const parentSidebars = parentSidebarContainer?.sidebars ?? [];

    for (const sidebar of parentSidebars) {
      await sidebar.updateComplete.then(() => sidebar.animationComplete);
    }

    const width = this.offsetWidth ?? 0;
    if (width === 0) {
      return;
    }

    const sidebars = this.sidebars;
    const hasForcedClosedParentContainer =
      parentSidebars.some((sidebar) => sidebar.hasAttribute('data-minimum-space')) ?? false;
    const sumOfAllRelevantSidebarWidths = sidebars
      .filter((sidebar) => sidebar.mode === 'side')
      .reduce((accumulator, currentValue) => accumulator + (currentValue.offsetWidth ?? 0), 0);
    const isMinimumSpace = width - sumOfAllRelevantSidebarWidths < MIN_WIDTH_BEFORE_COLLAPSE;

    sidebars.forEach((sidebar) => {
      const wasMinimum = sidebar.hasAttribute('data-minimum-space');
      sidebar.toggleAttribute('data-minimum-space', isMinimumSpace);

      if (sidebar.mode !== 'side') {
        return;
      }

      if ((isMinimumSpace || hasForcedClosedParentContainer) && sidebar.opened && !wasMinimum) {
        // We have to close the sidebar when the remaining width is below the minimum or the parent container runs out of space.

        if (sidebar.isOpen && !sidebar.hasAttribute('data-skip-animation')) {
          // If the sidebar is opened visually, add a special data attribute that controls the z-index.
          // Without this solution, when the sidebar is closed, it would appear visually as if it were in 'over' mode.
          sidebar.toggleAttribute('data-minimum-space-closing', true);
        }

        sidebar.opened = false;
        this._forcedClosedSidebars.add(sidebar);

        if (sidebar.hasAttribute('data-minimum-space-closing')) {
          sidebar.updateComplete
            .then(() => sidebar.animationComplete)
            .then(() => sidebar.removeAttribute('data-minimum-space-closing'));
        }
      } else if (
        // We have to open the sidebar when the remaining width of the sidebar and the parent container
        // is above the minimum.
        // We only programmatically open the sidebar when the cause of closing was this logic.
        !isMinimumSpace &&
        !hasForcedClosedParentContainer &&
        this._forcedClosedSidebars.has(sidebar)
      ) {
        // If the sidebar was manually opened (in forced over mode)
        // and the sidebar becomes enough space available, it stays open, but we need to ensure that
        // the focus trap and inert mechanism is reset.
        sidebar.unTrap();
        sidebar.opened = true;
        this._forcedClosedSidebars.delete(sidebar);
      }
    });
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-sidebar-container-backdrop"></div>
      <slot @slotchange=${() => this._handleWidthChange()}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-container': SbbSidebarContainerElement;
  }
}
