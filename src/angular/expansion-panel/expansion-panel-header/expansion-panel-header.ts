import { Directive, ElementRef, inject, Output } from '@angular/core';
import type { SbbExpansionPanelHeaderElement } from '@sbb-esta/lyne-elements/expansion-panel/expansion-panel-header.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/expansion-panel/expansion-panel-header.js';

import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-expansion-panel-header',
  standalone: true,
})
export class SbbExpansionPanelHeader extends SbbDisabledTabIndexActionMixin(
  SbbIconNameMixin(SbbButtonBaseElement),
) {
  #element = inject(ElementRef<SbbExpansionPanelHeaderElement>);

  @Output() public toggleExpanded: Observable<undefined> = fromEvent(
    this.#element.nativeElement,
    'toggleExpanded',
  );
}
