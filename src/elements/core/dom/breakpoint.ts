import { isServer } from 'lit';

export const breakpoints = ['zero', 'micro', 'small', 'medium', 'wide', 'large', 'ultra'] as const;
export type Breakpoint = (typeof breakpoints)[number];

/**
 * Checks whether the document matches a particular media query.
 * It will rely on the global CSS variables to determine the value of the breakpoints.
 *
 * @param from The breakpoint corresponding to the `min-width` value of the media query (optional).
 * @param to The breakpoint corresponding to the `max-width` value of the media query (optional).
 * @param properties Whether the max breakpoint should be included
 * @returns A boolean indicating whether the window matches the breakpoint.
 */
export function isBreakpoint(
  from?: Breakpoint,
  to?: Breakpoint,
  properties?: { includeMaxBreakpoint: boolean },
): boolean | null {
  if (isServer) {
    return null;
  }

  const computedStyle = getComputedStyle(document.documentElement);
  const breakpointMin = from ? computedStyle.getPropertyValue(`--sbb-breakpoint-${from}-min`) : '';
  const breakpointMax = to
    ? `${
        parseFloat(
          computedStyle.getPropertyValue(
            `--sbb-breakpoint-${to}-${properties?.includeMaxBreakpoint ? 'max' : 'min'}`,
          ),
        ) - (properties?.includeMaxBreakpoint ? 0 : 0.0625)
      }rem`
    : ''; // subtract 1px (0.0625rem) from the max-width breakpoint

  const minWidth = breakpointMin && `(min-width: ${breakpointMin})`;
  const maxWidth = breakpointMax && `(max-width: ${breakpointMax})`;
  const and = breakpointMin && breakpointMax && ' and ';

  return window.matchMedia(`${minWidth}${and}${maxWidth}`).matches;
}
