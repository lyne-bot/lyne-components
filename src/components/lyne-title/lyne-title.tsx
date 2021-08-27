import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfaceTitleAttributes } from './lyne-title.custom.d';

@Component({
  shadow: true,
  styleUrl: 'lyne-title.scss',
  tag: 'lyne-title'
})

export class LyneTitle {

  /** Text for the title */
  @Prop() public text = 'Default title text';

  /** Title level */
  @Prop() public level: InterfaceTitleAttributes['level'] = '1';

  /** Visual level for the title */
  @Prop() public visualLevel: InterfaceTitleAttributes['visualLevel'] = '1';

  /**
   * A11y Tip:
   * Sometimes we need to set an id, especially if we want to associate
   * a relationship with another element through the use of aria-labelledby
   * or aria-describedby or just offer an anchor target
   */
  @Prop() public titleId = '';

  /**
   * Sometimes we need a title in the markup to present a proper hierarchy
   * to the screenreaders while we do not want to let that title appear
   * visually. In this case we set visuallyHidden to true
   */
  @Prop() public visuallyHidden: false;

  public render(): JSX.Element {

    const TAGNAME = `h${this.level}`; // eslint-disable-line @typescript-eslint/no-unused-vars

    const visuallyHidden = this.visuallyHidden
      ? 'title--hidden'
      : '';

    const className = `title title-${this.visualLevel} ${visuallyHidden}`;

    if (this.titleId !== '') {
      return <TAGNAME class={className} id={this.titleId}>{this.text}.</TAGNAME>;
    }

    return <TAGNAME class={className}>{this.text}</TAGNAME>;

  }
}
