import {
  SbbBreakpointMediumMin,
  SbbBreakpointSmallMax,
  SbbTypoScaleDefault,
} from '@sbb-esta/lyne-design-tokens';
import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

const pxToRem = (px: number): number => px / SbbTypoScaleDefault;

/* eslint-disable @typescript-eslint/naming-convention */
export const SbbMediaQueryForcedColors = '(forced-colors: active)';
export const SbbMediaQueryHover = '(any-hover: hover)';
export const SbbMediaQueryPointerCoarse = '(pointer: coarse)';
export const SbbMediaQueryBreakpointMediumAndAbove = `(min-width: ${pxToRem(SbbBreakpointMediumMin)}rem)`;
export const SbbMediaQueryBreakpointSmallAndBelow = `(max-width: ${pxToRem(SbbBreakpointSmallMax)}rem)`;
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * A callback, which is invoked when the associated media query match
 * status changes.
 */
export type SbbMediaMatcherHandler = (matches: boolean) => void;

interface MediaQueryEntry {
  mediaQueryList: MediaQueryList;
  eventHandler: (event: MediaQueryListEvent) => void;
  handlers: Set<SbbMediaMatcherHandler>;
}

/**
 * We want to cache MediaQueryList instances and corresponding
 * event handlers, as a multitude of event handlers on global objects
 * can degrade performance with time.
 */
const mediaQueryRegistry = new Map<string, MediaQueryEntry>();

/**
 * This controller allows listening to media query changes.
 *
 * @example
 * new SbbMediaMatcherController(this, {
 *   [SbbForcedColorsQuery]: (matches) => doSomething(matches),
 * })
 */
export class SbbMediaMatcherController implements ReactiveController {
  public constructor(
    host: ReactiveControllerHost,
    private _queries: Record<string, SbbMediaMatcherHandler>,
  ) {
    host.addController(this);
  }

  /**
   * Returns whether the given query matches. Returns null with SSR.
   * @param query The query to check against.
   * @returns Whether the query matches or null with SSR.
   */
  public matches(query: string): boolean | null {
    if (isServer) {
      return null;
    }
    const mediaQuery = mediaQueryRegistry.get(query);
    if (mediaQuery) {
      return mediaQuery.mediaQueryList.matches;
    } else {
      return matchMedia(query).matches;
    }
  }

  public hostConnected(): void {
    if (isServer) {
      return;
    }

    for (const [query, handler] of Object.entries(this._queries)) {
      const mediaQuery = mediaQueryRegistry.get(query);
      if (mediaQuery) {
        mediaQuery.handlers.add(handler);
      } else {
        const mediaQueryList = matchMedia(query);
        const handlers = new Set([handler]);
        const eventHandler = (e: MediaQueryListEvent): void =>
          handlers.forEach((h) => h(e.matches));
        mediaQueryList.addEventListener('change', eventHandler);
        mediaQueryRegistry.set(query, { mediaQueryList, handlers, eventHandler });
      }
    }
  }

  public hostDisconnected(): void {
    for (const [query, handler] of Object.entries(this._queries)) {
      const mediaQuery = mediaQueryRegistry.get(query);
      if (mediaQuery) {
        mediaQuery.handlers.delete(handler);
        if (!mediaQuery.handlers.size) {
          mediaQueryRegistry.delete(query);
        }
      }
    }
  }
}
