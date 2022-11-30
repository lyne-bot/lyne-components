import { Component, h, JSX, Prop } from '@stencil/core';
import {
  ButtonType,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  PopupType,
  resolveRenderVariables,
} from '../../global/interfaces/link-button-properties';

/**
 * @slot unnamed - Use this slot to provide the navigation action label.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-action.scss',
  tag: 'sbb-navigation-action',
})
export class SbbNavigationAction implements LinkButtonProperties {
  /** Action size variant*/
  @Prop({ reflect: true })
  public size?: 'l' | 'm' | 's' = 'l';

  /** The href value you want to link to (if it is not present navigation action becomes a button). */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean;

  /** The type attribute to use for the button. */
  @Prop() public type: ButtonType | undefined;

  /** Whether the action is active. */
  @Prop({ reflect: true }) public active = false;

  /** The name attribute to use for the button. */
  @Prop() public name: string | undefined;

  /** The value attribute to use for the button. */
  @Prop() public value?: string;

  /**
   * When an interaction of this button has an impact on another element(s) in the document, the id
   * of that element(s) needs to be set. The value will be forwarded to the 'aria-controls' attribute
   * to the relevant nested element.
   */
  @Prop() public accessibilityControls: string | undefined;

  /**
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public accessibilityHaspopup: PopupType | undefined;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby: string | undefined;

  @Prop()
  public label?: string;

  public render(): JSX.Element {
    const { tagName: TAG_NAME, attributes }: LinkButtonRenderVariables = resolveRenderVariables(
      this,
      false
    );
    return (
      <TAG_NAME class="sbb-navigation-action" {...attributes}>
        <span class="sbb-navigation-action__content">
          <slot />
        </span>
      </TAG_NAME>
    );
  }
}
