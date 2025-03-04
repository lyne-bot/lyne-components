import type { ReactiveElement } from 'lit';

import type { Interface, PropertyDecorator } from './base.js';

/**
 * Decorator that forces the value of a property or getter/setter
 * to the defined type.
 */
export const forceType = <C extends Interface<ReactiveElement>, V>(
  convert?: (v: unknown) => V,
): PropertyDecorator => {
  return (
    target: ClassAccessorDecoratorTarget<C, V> | ((value: V) => void),
    context: ClassAccessorDecoratorContext<C, V> | ClassSetterDecoratorContext<C, V>,
  ): any => {
    const { kind, metadata, name } = context;

    const type = (globalThis.litPropertyMetadata.get(metadata)?.get(name)?.type ?? String) as (
      v: unknown,
    ) => V;

    convert ??= type;

    if ((convert as unknown) === String) {
      // In case of String, we want to handle null/undefined differently
      // from the native behavior in that we want to treat these values
      // as empty strings.
      convert = (v) => (v == null ? '' : String(v)) as V;
    } else if ((convert as unknown) === Number) {
      // In case of Number, we want to handle null differently
      // from the native behavior in that we want to treat null as NaN.
      convert = (v) => (v == null ? NaN : Number(v)) as V;
    }
    if (kind === 'accessor') {
      return {
        set(this: C, value) {
          (target as ClassAccessorDecoratorTarget<C, V>).set.call(
            this as unknown as C,
            convert!(value) as V,
          );
        },
      } satisfies ClassAccessorDecoratorResult<C, V>;
    } else if (kind === 'setter') {
      return function (value: unknown) {
        (target as (value: unknown) => void)(convert!(value));
      } satisfies (this: C, value: V) => void;
    }

    throw new Error(`Unsupported decorator location: ${kind}`);
  };
};
