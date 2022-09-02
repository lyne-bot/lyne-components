import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
} from '@stencil/core';
import { InterfaceSbbTabGroupTab } from './sbb-tab-group.custom';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';
import { hostContext } from '../../global/helpers/host-context';
import throttle from '../../global/helpers/throttle';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';

/**
 * @slot tab-bar - When you provide the `sbb-tab-title` tag through the unnamed slot,
 * it will be automatically moved to this slot. You do not need to use it directly.
 * @slot unnamed - Provide html-content to show as tab content.
 * Wrap the content in a `div`, a `section`, an `article` or provide a nested `sbb-tab-group`:
 * This is correct: `<div>Some text <p>Some other text</p></div>`
 * This is not correct: `<span>Some text</span><p>Some other text</p>`
 */

const tabObserverConfig: MutationObserverInit = {
  attributeFilter: ['active', 'disabled'],
};

const SUPPORTED_CONTENT_WRAPPERS = ['ARTICLE', 'DIV', 'SECTION', 'SBB-TAB-GROUP'];

let nextId = 0;

@Component({
  shadow: true,
  styleUrl: 'sbb-tab-group.scss',
  tag: 'sbb-tab-group',
})
export class SbbTabGroup {
  public tabs: InterfaceSbbTabGroupTab[] = [];
  private _selectedTab: InterfaceSbbTabGroupTab;
  private _isNested: boolean;
  private _tabContentElement: HTMLElement;
  private _tabAttributeObserver = new MutationObserver(this._onTabAttributesChange.bind(this));
  private _tabContentResizeObserver = new ResizeObserver(
    this._onTabContentElementResize.bind(this)
  );

  @Element() private _element: HTMLElement;

  /**
   * Sets the initial tab. If it matches a disabled tab or exceeds the length of
   * the tab group, the first enabled tab will be selected.
   */
  @Prop() public initialSelectedIndex = 0;

  /**
   * Emits an event on selected tab change
   */
  @Event({
    eventName: 'sbb-tab-group_did-change',
  })
  public selectedTabChanged: EventEmitter<void>;

  /**
   * Disables a tab by index.
   * @param tabIndex The index of the tab you want to disable.
   */
  @Method()
  public async disableTab(tabIndex: number): Promise<void> {
    await this.tabs[tabIndex]?.tabGroupActions.disable();
  }

  /**
   * Enables a tab by index.
   * @param tabIndex The index of the tab you want to enable.
   */
  @Method()
  public async enableTab(tabIndex: number): Promise<void> {
    await this.tabs[tabIndex]?.tabGroupActions.enable();
  }

  /**
   * Activates a tab by index.
   * @param tabIndex The index of the tab you want to activate.
   */
  @Method()
  public async activateTab(tabIndex: number): Promise<void> {
    await this.tabs[tabIndex]?.tabGroupActions.select();
  }

  private _getTabs(): InterfaceSbbTabGroupTab[] {
    return Array.from(this._element.children).filter((child) =>
      /^SBB-TAB-TITLE$/u.test(child.tagName)
    ) as InterfaceSbbTabGroupTab[];
  }

  private get _enabledTabs(): InterfaceSbbTabGroupTab[] {
    return this.tabs.filter((t) => !t.hasAttribute('disabled'));
  }

  public connectedCallback(): void {
    this._isNested = !!hostContext('sbb-tab-group', this._element.parentElement);
  }

  public componentWillLoad(): void {
    this.tabs = this._getTabs();
    this.tabs.forEach((tab) => this._configure(tab));
    this._initSelection();
  }

  public disconnectedCallback(): void {
    this._tabAttributeObserver.disconnect();
    this._tabContentResizeObserver.disconnect();
  }

  private _onContentSlotChange = (): void => {
    this._tabContentElement = this._element.shadowRoot.querySelector('div.tab-content');
    const loadedTabs = this._getTabs().filter((tab) => !this.tabs.includes(tab));

    // if a new tab/content is added to the tab group
    if (loadedTabs.length) {
      loadedTabs.forEach((tab) => this._configure(tab));
      this.tabs = this.tabs.concat(loadedTabs);
    }
  };

  private _onTabsSlotChange = (): void => {
    const tabs = this._getTabs();

    // if a tab is removed from the tab group
    if (tabs.length < this.tabs.length) {
      const removedTabs = this.tabs.filter((tab) => !tabs.includes(tab));

      removedTabs.forEach((removedTab) => {
        removedTab.relatedContent?.remove();
      });
      this.tabs = tabs;
    }
  };

  private _assignId(): string {
    return `sbb-tab-panel-${++nextId}`;
  }

  private _initSelection(): void {
    if (
      this.initialSelectedIndex >= 0 &&
      this.initialSelectedIndex < this.tabs.length &&
      !this.tabs[this.initialSelectedIndex].disabled
    ) {
      this.tabs[this.initialSelectedIndex].tabGroupActions.select();
    } else {
      this._enabledTabs[0]?.tabGroupActions.select();
    }
  }

  private _onTabAttributesChange(mutationsList): void {
    for (const mutation of mutationsList) {
      if (mutation.type !== 'attributes') {
        return;
      }
      const tab = mutation.target as InterfaceSbbTabGroupTab;

      if (mutation.attributeName === 'disabled') {
        if (this._isValidTabAttribute(tab, 'disabled') && tab !== this._selectedTab) {
          tab.tabGroupActions.disable();
        } else if (tab.disabled) {
          tab.tabGroupActions.enable();
        }
      }
      if (mutation.attributeName === 'active') {
        if (this._isValidTabAttribute(tab, 'active') && !tab.disabled) {
          tab.tabGroupActions.select();
        } else if (tab === this._selectedTab) {
          tab.setAttribute('active', '');
        }
      }
    }
  }

  private _isValidTabAttribute(tab: InterfaceSbbTabGroupTab, attribute: string): boolean {
    return tab.hasAttribute(attribute) && tab.getAttribute(attribute) !== 'false';
  }

  private _onTabContentElementResize(entries): void {
    for (const entry of entries) {
      const contentHeight = Math.floor(entry.contentRect.height);

      (this._tabContentElement as HTMLElement).style.height = `${contentHeight}px`;
    }
  }

  private _configure(tab: InterfaceSbbTabGroupTab): void {
    tab.tabGroupActions = {
      activate: (): void => {
        tab.setAttribute('active', '');
        tab.active = true;
        tab.tabIndex = 0;
        tab.setAttribute('aria-selected', 'true');
        tab.relatedContent?.setAttribute('active', '');
      },
      deactivate: (): void => {
        tab.removeAttribute('active');
        tab.active = false;
        tab.tabIndex = -1;
        tab.setAttribute('aria-selected', 'false');
        tab.relatedContent?.removeAttribute('active');
      },
      disable: (): void => {
        if (tab.disabled) {
          return;
        }
        if (!tab.hasAttribute('disabled')) {
          tab.setAttribute('disabled', '');
        }
        tab.disabled = true;
        tab.tabIndex = -1;
        tab.setAttribute('aria-selected', 'false');
        tab.relatedContent?.removeAttribute('active');
        if (tab.active) {
          tab.removeAttribute('active');
          tab.active = false;
          this._enabledTabs[0]?.tabGroupActions.select();
        }
      },
      enable: (): void => {
        if (tab.disabled) {
          tab.removeAttribute('disabled');
          tab.disabled = false;
        }
      },
      select: (): void => {
        if (tab !== this._selectedTab && !tab.disabled) {
          const prevTab = this._selectedTab;

          if (prevTab) {
            prevTab.tabGroupActions.deactivate();
            this._tabContentResizeObserver.unobserve(prevTab.relatedContent);
          }

          tab.tabGroupActions.activate();
          this._selectedTab = tab;

          this._tabContentResizeObserver.observe(tab.relatedContent);
          this.selectedTabChanged.emit();
        } else if (tab.disabled) {
          console.warn('You cannot activate a disabled tab');
        }
      },
    };
    if (SUPPORTED_CONTENT_WRAPPERS.includes(tab.nextElementSibling?.tagName)) {
      tab.relatedContent = tab.nextElementSibling as HTMLElement;
      tab.relatedContent.id = this._assignId();
      if (tab.relatedContent.nodeName !== 'SBB-TAB-GROUP') {
        tab.relatedContent.tabIndex = 0;
      }
    } else {
      tab.insertAdjacentHTML('afterend', '<div>No content.</div>');
      tab.relatedContent = tab.nextElementSibling as HTMLElement;
      console.warn(
        `Missing content: you should provide a related content for the tab ${tab.outerHTML}.`
      );
    }
    tab.tabIndex = -1;
    tab.active = tab.hasAttribute('active') && !tab.hasAttribute('disabled');
    tab.disabled = tab.hasAttribute('disabled');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', tab.relatedContent.id);
    tab.setAttribute('aria-selected', 'false');
    tab.relatedContent.setAttribute('role', 'tabpanel');
    tab.relatedContent.removeAttribute('active');
    if (tab.active) {
      tab.relatedContent.setAttribute('active', '');
    }
    tab.addEventListener('click', () => {
      tab.tabGroupActions.select();
    });

    this._tabAttributeObserver.observe(tab, tabObserverConfig);
    tab.slot = 'tab-bar';
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const enabledTabs = this._enabledTabs;
    const cur = enabledTabs.findIndex((t) => t.active);
    const size = enabledTabs.length;
    const prev = cur === 0 ? size - 1 : cur - 1;
    const next = cur === size - 1 ? 0 : cur + 1;

    // don't trap nested handling
    if (
      (evt.target as HTMLElement) !== this._element &&
      (evt.target as HTMLElement).parentElement !== this._element
    ) {
      return;
    }

    const currentWritingMode = getDocumentWritingMode();
    const prevKey = currentWritingMode === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const nextKey = currentWritingMode === 'rtl' ? 'ArrowLeft' : 'ArrowRight';

    if (evt.key === prevKey || evt.key === 'ArrowUp') {
      enabledTabs[prev]?.tabGroupActions.select();
      enabledTabs[prev]?.focus();
      evt.preventDefault();
    } else if (evt.key === nextKey || evt.key === 'ArrowDown') {
      enabledTabs[next]?.tabGroupActions.select();
      enabledTabs[next]?.focus();
      evt.preventDefault();
    }
  }

  public render(): JSX.Element {
    return (
      <Host class={this._isNested ? 'tab-group--nested' : ''}>
        <div class="tab-group" role="tablist">
          <slot name="tab-bar" onSlotchange={this._onTabsSlotChange}></slot>
        </div>

        <div class="tab-content">
          <slot onSlotchange={throttle(this._onContentSlotChange, 150)}></slot>
        </div>
      </Host>
    );
  }
}
