import type { ComplexAttributeConverter } from 'lit';

import { readConfig } from '../config.js';
import { defaultDateAdapter } from '../datetime.js';

/**
 * Converts empty values to null, which will not be rendered as attributes.
 * e.g. for string properties, an empty value '' will not be rendered as an
 * empty attribute, as would be the default with lit.
 */
export const dateConverter: ComplexAttributeConverter = {
  fromAttribute(value, _type) {
    const dateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
    return dateAdapter.getValidDateOrNull(dateAdapter.deserialize(value));
  },
  toAttribute(value, _type) {
    const dateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
    return dateAdapter.isValid(value) ? dateAdapter.toIso8601(value) : null;
  },
};
