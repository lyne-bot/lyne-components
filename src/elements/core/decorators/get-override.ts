import type { ReactiveElement } from 'lit';

import type { Interface } from './base.js';

/**
 * Decorator that overrides the underlying getter of the accessor.
 */
export const getOverride = <C extends Interface<ReactiveElement>, V>(
  callback: (instance: C, innerValue: V) => V,
) => {
  return (
    target: ClassAccessorDecoratorTarget<C, V>,
    context: ClassAccessorDecoratorContext<C, V>,
  ): any => {
    const { kind } = context;
    if (kind === 'accessor') {
      return {
        get(this: C) {
          const innerValue = (target as ClassAccessorDecoratorTarget<C, V>).get.call(
            this as unknown as C,
          );
          return callback(this, innerValue);
        },
      } satisfies ClassAccessorDecoratorResult<C, V>;
    }

    throw new Error(`Unsupported decorator location: ${kind}`);
  };
};
