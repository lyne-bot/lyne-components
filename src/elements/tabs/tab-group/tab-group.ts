import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { getNextElementIndex, isArrowKeyPressed } from '../../core/a11y.js';
import { forceType } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import { EventEmitter, throttle } from '../../core/eventing.js';
import { SbbHydrationMixin } from '../../core/mixins.js';
import type { SbbTabLabelElement } from '../tab-label.js';
import { SbbTabElement } from '../tab.js';

import style from './tab-group.scss?lit&inline';

export type SbbTabChangedEventDetails = {
  activeIndex: number;
  activeTabLabel: SbbTabLabelElement;
  activeTab: SbbTabElement;
  previousIndex: number;
  previousTabLabel: SbbTabLabelElement | undefined;
  previousTab: SbbTabElement | undefined;
};

export interface InterfaceSbbTabGroupActions {
  activate(): void;
  deactivate(): void;
  enable(): void;
  disable(): void;
  select(): void;
}

export interface InterfaceSbbTabGroupTab extends SbbTabLabelElement {
  active: boolean;
  disabled: boolean;
  tab?: SbbTabElement;
  index?: number;
  tabGroupActions?: InterfaceSbbTabGroupActions;
  size: 's' | 'l' | 'xl';
}

const tabObserverConfig: MutationObserverInit = {
  attributeFilter: ['active', 'disabled'],
};

let nextId = 0;

/**
 * It displays one or more tabs, each one with a label and a content.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-tab-group` via
 * `sbb-tab-label` and `sbb-tab` instances.
 * @event {CustomEvent<SbbTabChangedEventDetails>} didChange - Emits an event on selected tab change.
 */
export
@customElement('sbb-tab-group')
class SbbTabGroupElement extends SbbHydrationMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
  } as const;

  private _tabs: InterfaceSbbTabGroupTab[] = [];
  private _selectedTab?: InterfaceSbbTabGroupTab;
  private _tabGroupElement!: HTMLElement;
  private _tabContentElement!: HTMLElement;
  private _tabAttributeObserver = new MutationController(this, {
    target: null,
    config: tabObserverConfig,
    callback: (mutationsList) => this._onTabAttributesChange(mutationsList),
  });
  private _tabGroupResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: (entries) => this._onTabGroupElementResize(entries),
  });
  private _tabContentResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: (entries) => this._onTabContentElementResize(entries),
  });

  /**
   * Size variant, either s, l or xl.
   * @default 'l' / 's' (lean)
   */
  @property()
  public set size(value: InterfaceSbbTabGroupTab['size']) {
    this._size = value;
    this._updateSize();
  }
  public get size(): InterfaceSbbTabGroupTab['size'] {
    return this._size;
  }
  private _size: InterfaceSbbTabGroupTab['size'] = isLean() ? 's' : 'l';

  /**
   * Sets the initial tab. If it matches a disabled tab or exceeds the length of
   * the tab group, the first enabled tab will be selected.
   */
  @forceType()
  @property({ attribute: 'initial-selected-index', type: Number })
  public accessor initialSelectedIndex: number = 0;

  /** Emits an event on selected tab change. */
  private _selectedTabChanged: EventEmitter<SbbTabChangedEventDetails> = new EventEmitter(
    this,
    SbbTabGroupElement.events.didChange,
  );

  public constructor() {
    super();
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._tabs = this._getTabs();
    this._tabs.forEach((tab) => this._configure(tab));
    this._initSelection();
    this._tabGroupResizeObserver.observe(this._tabGroupElement);
  }

  /**
   * Disables a tab by index.
   * @param tabIndex The index of the tab you want to disable.
   */
  public disableTab(tabIndex: number): void {
    this._tabs[tabIndex]?.tabGroupActions?.disable();
  }

  /**
   * Enables a tab by index.
   * @param tabIndex The index of the tab you want to enable.
   */
  public enableTab(tabIndex: number): void {
    this._tabs[tabIndex]?.tabGroupActions?.enable();
  }

  /**
   * Activates a tab by index.
   * @param tabIndex The index of the tab you want to activate.
   */
  public activateTab(tabIndex: number): void {
    this._tabs[tabIndex]?.tabGroupActions?.select();
  }

  private _getTabs(): InterfaceSbbTabGroupTab[] {
    return Array.from(this.children ?? []).filter((child) =>
      /^sbb-tab-label$/u.test(child.localName),
    ) as InterfaceSbbTabGroupTab[];
  }

  private _enabledTabs(): InterfaceSbbTabGroupTab[] {
    return this._tabs.filter((t) => !t.hasAttribute('disabled'));
  }

  private _updateSize(): void {
    for (const tab of this._tabs) {
      tab.setAttribute('data-size', this.size);
    }
  }

  private _onContentSlotChange = (): void => {
    this._tabContentElement = this.shadowRoot!.querySelector('div.tab-content')!;
    const loadedTabs = this._getTabs().filter((tab) => !this._tabs.includes(tab));

    // if a new tab/content is added to the tab group
    if (loadedTabs.length) {
      loadedTabs.forEach((tab) => this._configure(tab));
      this._tabs = this._tabs.concat(loadedTabs);

      // If there is an active tab in the new batch, it becomes the new selected
      loadedTabs.find((tab) => tab.active)?.tabGroupActions?.select();
    }
  };

  private _onTabsSlotChange = (): void => {
    const tabs = this._getTabs();

    // if a tab is removed from the tab group
    if (tabs.length < this._tabs.length) {
      const removedTabs = this._tabs.filter((tab) => !tabs.includes(tab));

      removedTabs.forEach((removedTab) => {
        removedTab.tab?.remove();
      });
      this._tabs = tabs;
    }
    this._tabs.forEach((tab: InterfaceSbbTabGroupTab) => tab.setAttribute('data-size', this.size));
  };

  private _assignId(): string {
    return `sbb-tab-panel-${++nextId}`;
  }

  private _initSelection(): void {
    if (
      this.initialSelectedIndex >= 0 &&
      this.initialSelectedIndex < this._tabs.length &&
      !this._tabs[this.initialSelectedIndex].disabled
    ) {
      this._tabs[this.initialSelectedIndex].tabGroupActions?.select();
    } else {
      this._enabledTabs()[0]?.tabGroupActions?.select();
    }
  }

  private _onTabAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.type !== 'attributes') {
        return;
      }
      const tab = mutation.target as InterfaceSbbTabGroupTab;

      if (mutation.attributeName === 'disabled') {
        if (tab.hasAttribute('disabled') && tab !== this._selectedTab) {
          tab.tabGroupActions?.disable();
        } else if (tab.disabled) {
          tab.tabGroupActions?.enable();
        }
      }
      if (mutation.attributeName === 'active') {
        if (tab.hasAttribute('active') && !tab.disabled) {
          tab.tabGroupActions?.select();
        } else if (tab === this._selectedTab) {
          tab.toggleAttribute('active', true);
        }
      }
    }
  }

  private _onTabGroupElementResize(entries: ResizeObserverEntry[]): void {
    for (const entry of entries) {
      const tabTitles = (
        entry.target.firstElementChild as HTMLSlotElement
      ).assignedElements() as SbbTabLabelElement[];

      for (const tab of tabTitles) {
        tab.toggleAttribute(
          'data-has-divider',
          tab === tabTitles[0] || tab.offsetLeft === tabTitles[0].offsetLeft,
        );
        this.style.setProperty('--sbb-tab-group-width', `${this._tabGroupElement.clientWidth}px`);
      }
    }
  }

  private _onTabContentElementResize(entries: ResizeObserverEntry[]): void {
    if (!this._tabContentElement) {
      return;
    }
    for (const entry of entries) {
      const contentHeight = Math.floor(entry.contentRect.height);

      this._tabContentElement.style.height = `${contentHeight}px`;
    }
  }

  private _configure(tabLabel: InterfaceSbbTabGroupTab): void {
    tabLabel.tabGroupActions = {
      activate: (): void => {
        tabLabel.toggleAttribute('active', true);
        tabLabel.active = true;
        tabLabel.tabIndex = 0;
        tabLabel.setAttribute('aria-selected', 'true');
        tabLabel.tab?.toggleAttribute('active', true);
      },
      deactivate: (): void => {
        tabLabel.removeAttribute('active');
        tabLabel.active = false;
        tabLabel.tabIndex = -1;
        tabLabel.setAttribute('aria-selected', 'false');
        tabLabel.tab?.removeAttribute('active');
      },
      disable: (): void => {
        if (tabLabel.disabled) {
          return;
        }
        if (!tabLabel.hasAttribute('disabled')) {
          tabLabel.toggleAttribute('disabled', true);
        }
        tabLabel.disabled = true;
        tabLabel.tabIndex = -1;
        tabLabel.setAttribute('aria-selected', 'false');
        tabLabel.tab?.removeAttribute('active');
        if (tabLabel.active) {
          tabLabel.removeAttribute('active');
          tabLabel.active = false;
          this._enabledTabs()[0]?.tabGroupActions?.select();
        }
      },
      enable: (): void => {
        if (tabLabel.disabled) {
          tabLabel.removeAttribute('disabled');
          tabLabel.disabled = false;
        }
      },
      select: (): void => {
        if (tabLabel !== this._selectedTab && !tabLabel.disabled) {
          const prevTab = this._selectedTab;

          if (prevTab) {
            prevTab.tabGroupActions?.deactivate();
            this._tabContentResizeObserver.unobserve(prevTab.tab!);
          }

          tabLabel.tabGroupActions?.activate();
          this._selectedTab = tabLabel;

          this._tabContentResizeObserver.observe(tabLabel.tab!);
          const tabs = this._tabs;
          this._selectedTabChanged.emit({
            activeIndex: tabs.findIndex((e) => e === tabLabel),
            activeTabLabel: tabLabel,
            activeTab: tabLabel.tab as SbbTabElement,
            previousIndex: tabs.findIndex((e) => e === prevTab),
            previousTabLabel: prevTab,
            previousTab: prevTab?.tab as SbbTabElement,
          });
        } else if (import.meta.env.DEV && tabLabel.disabled) {
          console.warn('You cannot activate a disabled tab');
        }
      },
    };

    if (tabLabel.nextElementSibling?.localName === 'sbb-tab') {
      tabLabel.tab = tabLabel.nextElementSibling as SbbTabElement;
      tabLabel.tab.id = this._assignId();
      if (tabLabel.tab instanceof SbbTabElement) {
        tabLabel.tab.tabIndex = 0;
        tabLabel.tab.configure();
      }
    } else if (import.meta.env.DEV) {
      tabLabel.insertAdjacentHTML('afterend', '<sbb-tab>No content.</sbb-tab>');
      tabLabel.tab = tabLabel.nextElementSibling as SbbTabElement;
      console.warn(
        `Missing content: you should provide a related content for the tab ${tabLabel.outerHTML}.`,
      );
    }
    tabLabel.tabIndex = -1;
    tabLabel.disabled = tabLabel.hasAttribute('disabled');
    tabLabel.active = tabLabel.hasAttribute('active') && !tabLabel.disabled;
    tabLabel.setAttribute('role', 'tab');
    tabLabel.setAttribute('aria-selected', String(tabLabel.active));
    tabLabel.addEventListener('click', () => {
      tabLabel.tabGroupActions?.select();
    });
    if (tabLabel.tab) {
      tabLabel.setAttribute('aria-controls', tabLabel.tab.id);
      tabLabel.tab.setAttribute('role', 'tabpanel');
      tabLabel.tab.toggleAttribute('active', tabLabel.active);
    }

    this._tabAttributeObserver.observe(tabLabel);
    tabLabel.slot = 'tab-bar';
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledTabs: InterfaceSbbTabGroupTab[] = this._enabledTabs();

    if (
      !enabledTabs ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this && (evt.target as HTMLElement).parentElement !== this)
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const current: number = enabledTabs.findIndex((t: InterfaceSbbTabGroupTab) => t.active);
      const nextIndex: number = getNextElementIndex(evt, current, enabledTabs.length);
      enabledTabs[nextIndex]?.tabGroupActions?.select();
      enabledTabs[nextIndex]?.focus();
      evt.preventDefault();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="tab-group"
        role="tablist"
        ${ref((el?: Element) => (this._tabGroupElement = el as HTMLElement))}
      >
        <slot name="tab-bar" @slotchange=${this._onTabsSlotChange}></slot>
      </div>

      <div class="tab-content">
        <slot @slotchange=${throttle(this._onContentSlotChange, 150)}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab-group': SbbTabGroupElement;
  }
}
