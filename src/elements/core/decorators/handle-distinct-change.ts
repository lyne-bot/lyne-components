import type { ReactiveElement } from 'lit';

import type { Interface } from './base.js';

/**
 * Decorator that calls the given callback when the value
 * of the associated property is changed.
 */
export const handleDistinctChange = <C extends Interface<ReactiveElement>, V>(
  callback: (instance: C, newValue: V, oldValue: V | undefined) => void,
) => {
  return (
    target: ClassAccessorDecoratorTarget<C, V>,
    context: ClassAccessorDecoratorContext<C, V>,
  ): any => {
    const { kind } = context;
    if (kind === 'accessor') {
      return {
        set(this: C, value) {
          const oldValue = context.access.get(this);
          (target as ClassAccessorDecoratorTarget<C, V>).set.call(this as unknown as C, value);
          const newValue = context.access.get(this);
          if (newValue !== oldValue) {
            callback(this, newValue, oldValue);
          }
        },
      } satisfies ClassAccessorDecoratorResult<C, V>;
    }

    throw new Error(`Unsupported decorator location: ${kind}`);
  };
};
