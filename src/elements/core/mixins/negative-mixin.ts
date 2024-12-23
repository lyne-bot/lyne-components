import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType } from '../decorators.js';

import type { AbstractConstructor } from './constructor.js';

export declare class SbbNegativeMixinType {
  public accessor negative: boolean;
}

/**
 * Enhance your component with a negative property.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNegativeMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbNegativeMixinType> & T => {
  abstract class SbbNegativeElement extends superClass implements SbbNegativeMixinType {
    /** Negative coloring variant flag. */
    @forceType()
    @property({ reflect: true, type: Boolean })
    public accessor negative: boolean = false;
  }

  return SbbNegativeElement as AbstractConstructor<SbbNegativeMixinType> & T;
};
