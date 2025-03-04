import { readConfig } from '../config.js';
import { defaultDateAdapter } from '../datetime.js';

/**
 * Converts the given value to a date object or null.
 * Should be used as a type hint for the @property decorator.
 * @param value The value to convert to a date object.
 * @returns A date object or null.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function DateOnlyType(value: unknown): unknown | null {
  const dateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  return dateAdapter.isDateInstance(value) && dateAdapter.isValid(value)
    ? dateAdapter.createDate(
        dateAdapter.getYear(value),
        dateAdapter.getMonth(value),
        dateAdapter.getDate(value),
      )
    : null;
}
