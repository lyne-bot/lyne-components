import {
  Component,
  h,
  Element,
  JSX,
  Prop,
  Listen,
  ComponentInterface,
  State,
  Host,
} from '@stencil/core';
import {
  ButtonType,
  dispatchClickEventWhenButtonAndSpaceKeyup,
  dispatchClickEventWhenEnterKeypress,
  handleLinkButtonClick,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import { hostContext } from '../../global/helpers/host-context';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';

// This approach allows us to just check whether an attribute has been added or removed
// from the DOM, instead of a `Watch()` decorator that would check the value change
// and get us into a loop.
const navigationActionObserverConfig: MutationObserverInit = {
  attributeFilter: ['active'],
};

/**
 * @slot unnamed - Use this slot to provide the navigation action label.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-action.scss',
  tag: 'sbb-navigation-action',
})
export class SbbNavigationAction implements ComponentInterface, LinkButtonProperties {
  /**
   * Action size variant.
   */
  @Prop({ reflect: true }) public size?: 'l' | 'm' | 's' = 'l';

  /**
   * The href value you want to link to (if it is not present, navigation action becomes a button).
   */
  @Prop() public href: string | undefined;

  /**
   * Where to display the linked URL.
   */
  @Prop() public target?: LinkTargetType | string | undefined;

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @Prop() public rel?: string | undefined;

  /**
   * Whether the browser will show the download dialog on click.
   */
  @Prop() public download?: boolean;

  /**
   * The type attribute to use for the button.
   */
  @Prop() public type: ButtonType | undefined;

  /**
   * Whether the action is active.
   */
  @Prop({ reflect: true }) public active = false;

  /**
   * The name attribute to use for the button.
   */
  @Prop() public name: string | undefined;

  /**
   * The value attribute to use for the button.
   */
  @Prop() public value?: string;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element: HTMLSbbNavigationActionElement;

  private _navigationMarker: HTMLSbbNavigationMarkerElement;
  private _navigationActionAttributeObserver = new MutationObserver(() =>
    this._onActiveActionChange()
  );

  public connectedCallback(): void {
    this._navigationActionAttributeObserver.observe(this._element, navigationActionObserverConfig);

    // Check if the current element is nested inside a navigation marker.
    this._navigationMarker = hostContext(
      'sbb-navigation-marker',
      this._element
    ) as HTMLSbbNavigationMarkerElement;
  }

  public disconnectedCallback(): void {
    this._navigationActionAttributeObserver.disconnect();
  }

  // Check whether the `active` attribute has been added or removed from the DOM
  // and call the `select()` or `reset()` method accordingly.
  private _onActiveActionChange(): void {
    if (isValidAttribute(this._element, 'active')) {
      this._navigationMarker?.select(this._element);
    } else {
      this._navigationMarker?.reset();
    }
  }

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  @Listen('click')
  public handleClick(event: Event): void {
    handleLinkButtonClick(event);
    if (!this.active) {
      this._navigationMarker?.select(this._element);
    }
  }

  @Listen('keypress')
  public handleKeypress(event: KeyboardEvent): void {
    dispatchClickEventWhenEnterKeypress(event);
  }

  @Listen('keyup')
  public handleKeyup(event: KeyboardEvent): void {
    dispatchClickEventWhenButtonAndSpaceKeyup(event);
  }

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);
    return (
      <Host {...hostAttributes}>
        <TAG_NAME class="sbb-navigation-action" {...attributes}>
          <slot />
          {targetsNewWindow(this) && (
            <span class="sbb-link__opens-in-new-window">
              . {i18nTargetOpensInNewWindow[this._currentLanguage]}
            </span>
          )}
        </TAG_NAME>
      </Host>
    );
  }
}
