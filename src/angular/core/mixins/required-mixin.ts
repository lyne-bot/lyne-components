import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type {
  SbbFormAssociatedMixinType,
  SbbRequiredMixinType,
} from '@sbb-esta/lyne-elements/core/mixins.js';

import { booleanAttribute } from '../attribute-transform.js';

import type { AbstractConstructor } from './constructor.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbRequiredMixin = <
  T extends AbstractConstructor<Partial<SbbFormAssociatedMixinType<V>>>,
  V,
>(
  superClass: T,
): AbstractConstructor<SbbRequiredMixinType> & T => {
  abstract class SbbRequiredElement extends superClass implements Partial<SbbRequiredMixinType> {
    #element = inject(ElementRef<ReturnType<typeof SbbRequiredMixin>>);
    #ngZone = inject(NgZone);

    @Input({ transform: booleanAttribute })
    public set required(value: boolean) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.required = value));
    }
    public get required(): boolean {
      return this.#element.nativeElement.required;
    }
  }
  return SbbRequiredElement as unknown as AbstractConstructor<SbbRequiredMixinType> & T;
};
