import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbActionGroupElement } from '../action-group';
import { setAttribute } from '../core/dom';

import style from './dialog-actions.scss?lit&inline';

/**
 * Use this component to display a footer into an `sbb-dialog` with an action group.
 */
@customElement('sbb-dialog-actions')
export class SbbDialogActionsElement extends SbbActionGroupElement {
  public static override styles: CSSResultGroup = [SbbActionGroupElement.styles, style];

  protected override render(): TemplateResult {
    setAttribute(this, 'slot', 'actions');

    return html` <div class="sbb-dialog-actions">${super.render()}</div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-dialog-actions': SbbDialogActionsElement;
  }
}
