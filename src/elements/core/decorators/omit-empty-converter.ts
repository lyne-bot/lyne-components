import { defaultConverter, type ComplexAttributeConverter } from 'lit';

/**
 * Converts empty values to null, which will not be rendered as attributes.
 * e.g. for string properties, an empty value '' will not be rendered as an
 * empty attribute, as would be the default with lit.
 */
export const omitEmptyConverter: ComplexAttributeConverter = {
  toAttribute(value, type) {
    return ((type === String || type === undefined) && value === '') ||
      (type === Number && isNaN(value as number))
      ? null
      : defaultConverter.toAttribute!(value, type);
  },
};
