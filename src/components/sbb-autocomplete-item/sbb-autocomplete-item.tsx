import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfaceAutocompleteItemAttributes } from './sbb-autocomplete-item.custom';

/**
 * @slot pre-text - placeholder to put content inline before the item text
 * @slot post-text - placeholder to put content inline after the item text
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-autocomplete-item.default.scss',
    shared: 'styles/sbb-autocomplete-item.shared.scss'
  },
  tag: 'sbb-autocomplete-item'
})

export class SbbAutocompleteItem {

  /**
   * Text to show as content of the autocomplete item
   */
  @Prop() public text!: string;

  /**
   * The text to highlight within the string property
   */
  @Prop() public highlight?: string;

  /**
   * Mark the item as selected, which will change it's appearance and
   * the according aria attributes.
   */
  @Prop() public selected?: boolean;

  /**
   * The aria-posinset attribute for the list element
   */
  @Prop() public ariaPosinset?: number;

  /**
   * The aira-setsize attribute for the list element
   */
  @Prop() public ariaSetsize?: number;

  private _compileTextMarkup(text: string, highlight: string): InterfaceAutocompleteItemAttributes['textStructure'] {
    let exactMatch = false;
    const textLowercase = text.toLowerCase();
    const highlightLowercase = highlight.toLowerCase();

    const index = textLowercase.indexOf(highlightLowercase);

    if (index < 0) {
      return {
        exactMatch,
        main: text
      };
    }

    let preString = text.substring(0, index);
    const main = text.substring(index, index + highlight.length);
    let postString = text.substring(index + highlight.length);

    if (textLowercase === highlightLowercase) {
      exactMatch = true;
      preString = '';
      postString = '';
    }

    return {
      exactMatch,
      main,
      post: postString,
      pre: preString
    };
  }

  private _setAriaAttributes(): any {

    let attrs = {};

    if (this.ariaPosinset) {
      attrs = {
        ...attrs,
        'aria-posinset': this.ariaPosinset
      };
    }

    if (this.ariaSetsize) {
      attrs = {
        ...attrs,
        'aria-setsize': this.ariaSetsize
      };
    }

    return attrs;
  }

  public render(): JSX.Element {
    let textMarkup: InterfaceAutocompleteItemAttributes['textStructure'] = {
      exactMatch: false,
      main: ''
    };

    if (!this.highlight || this.highlight.length < 1) {
      textMarkup.main = this.text;
    } else {
      textMarkup = this._compileTextMarkup(this.text, this.highlight);
    }

    let mainClasses = 'autocomplete-item';

    mainClasses += this.selected
      ? ' autocomplete-item--selected'
      : '';

    const itemClasses = textMarkup.pre || textMarkup.post || textMarkup.exactMatch
      ? 'autocomplete-item__highlight'
      : '';

    return (
      <li
        class={mainClasses}
        role='option'
        aria-selected={this.selected}
        {...this._setAriaAttributes()}
      >
        <slot name='pre-text' />

        {textMarkup.pre &&
          <span>{textMarkup.pre}</span>
        }

        <span class={itemClasses}>{textMarkup.main}</span>

        {textMarkup.post &&
          <span>{textMarkup.post}</span>
        }

        <slot name='post-text' />
      </li>
    );
  }
}
