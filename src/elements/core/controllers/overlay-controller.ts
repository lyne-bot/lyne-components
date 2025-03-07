import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

import { sbbOverlayOutsidePointerEventListener } from '../overlay.js';

const cssAnchorPositionSupported = !isServer && CSS.supports('anchor-name', '--test');
// TODO: Support more positions?
const supportedPositions = [
  'block-end',
  'block-start',
  'end',
  'inline-end',
  'inline-start',
  'start',
];
let nextId = 0;

/**
 * Controller for managing overlays. Also acts as a polyfill when native
 * CSS Anchor Positioning is not supported (enough).
 * Applies unique anchor names when using native CSS Anchor Positioning
 * or calculates and applies correct positions in polyfill mode.
 */
export class SbbOverlayController implements ReactiveController {
  private readonly _resizeObserver =
    this._usePolyfill && !isServer
      ? new ResizeObserver(() => this._requestCalculatePosition())
      : null!;
  private _abortController?: AbortController;
  private _trigger?: HTMLElement;
  private _frame?: ReturnType<typeof requestAnimationFrame>;
  private _hostStyles?: CSSStyleDeclaration;
  private _anchorName = this._usePolyfill ? '' : `--sbb-overlay-anchor-${++nextId}`;
  private _positions: string[] = [];
  private _lastPosition?: string;

  /** Get the current position. (e.g. block-end, block-start, etc.) */
  public get currentPosition(): string {
    if (this._usePolyfill) {
      return this._lastPosition ?? this._positions[0] ?? '';
    } else {
      this._hostStyles ??= getComputedStyle(this._host);
      return this._hostStyles.getPropertyValue('inset-area');
    }
  }

  public constructor(
    private _host: ReactiveControllerHost & HTMLElement,
    private _usePolyfill = !cssAnchorPositionSupported,
  ) {
    this._host.addController(this);
  }

  public hostConnected(): void {
    if (!this._usePolyfill) {
      this._host.style.setProperty('position-anchor', this._anchorName);
    }
  }

  public hostUpdate(): void {
    if (isServer || !this._usePolyfill) {
      return;
    }
    this._hostStyles ??= getComputedStyle(this._host);
    const positions = [
      this._hostStyles.getPropertyValue('--sbb-overlay-controller-inset-area') || 'block-end',
      ...this._hostStyles
        .getPropertyValue('--sbb-overlay-controller-position-try-fallbacks')
        .split(',')
        .map((f) => f.trim())
        .filter((f) => !!f),
    ];

    if (import.meta.env.DEV && positions.some((p) => !supportedPositions.includes(p))) {
      const unsupportedPositions = positions
        .filter((p) => !supportedPositions.includes(p))
        .sort()
        .join(', ');
      throw new Error(
        `Unsupported position-try-fallbacks ${unsupportedPositions} (Supported: ${supportedPositions.join(', ')})`,
      );
    }

    this._positions = positions;
    if (this._lastPosition && !this._positions.includes(this._lastPosition)) {
      this._lastPosition = undefined;
    }
  }

  public connect(trigger: HTMLElement): void {
    if (isServer) {
      return;
    }

    this._trigger = trigger;
    sbbOverlayOutsidePointerEventListener.connect(this._host);
    if (!this._usePolyfill) {
      this._trigger.style.setProperty('anchor-name', this._anchorName!);
      return;
    }

    this._calculatePosition();
    this._abortController?.abort();
    this._abortController = new AbortController();

    // We need to use capture here to react to all scroll events.
    // If capture was not used, then scroll events inside separate scroll
    // containers would not be caught.
    document.addEventListener('scroll', () => this._requestCalculatePosition(), {
      capture: true,
      passive: true,
      signal: this._abortController.signal,
    });
    window.addEventListener('resize', () => this._requestCalculatePosition(), {
      passive: true,
      signal: this._abortController.signal,
    });
    this._resizeObserver.observe(trigger, { box: 'border-box' });
    this._resizeObserver.observe(this._host, { box: 'border-box' });
  }

  public disconnect(): void {
    sbbOverlayOutsidePointerEventListener.disconnect(this._host);
    if (this._usePolyfill) {
      this._abortController?.abort();
      this._resizeObserver.disconnect();
    } else {
      this._host.style.removeProperty('anchor-name');
    }
  }

  private _requestCalculatePosition(): void {
    if (this._frame) {
      return;
    }

    this._frame = requestAnimationFrame(() => {
      this._calculatePosition();
      this._frame = undefined;
    });
  }

  private _calculatePosition(): void {
    const { offsetHeight: overlayHeight, offsetWidth: overlayWidth } = this._host;
    const { innerHeight: viewportHeight, innerWidth: viewportWidth } = window;
    const {
      top: triggerOffsetBlockStart,
      left: triggerOffsetInlineStart,
      height: triggerHeight,
      width: triggerWidth,
    } = this._trigger!.getBoundingClientRect();

    const ltr = !document.documentElement.matches(':dir(rtl)');
    const blockStartSpace = triggerOffsetBlockStart;
    const blockEndSpace = viewportHeight - triggerHeight - triggerOffsetBlockStart;

    let inlineStartSpace = triggerOffsetInlineStart;
    let inlineEndSpace = viewportWidth - triggerWidth - triggerOffsetInlineStart;
    if (!ltr) {
      inlineStartSpace = inlineEndSpace;
      inlineEndSpace = triggerOffsetInlineStart;
    }

    const overlayWidthOverlap = (overlayWidth - triggerWidth) / 2;
    const overlayHeightOverlap = (overlayHeight - triggerHeight) / 2;

    this._host.style.setProperty('--sbb-overlay-controller-trigger-height', `${triggerHeight}px`);
    this._host.style.setProperty('--sbb-overlay-controller-trigger-width', `${triggerWidth}px`);

    // TODO: RTL is probably not working correctly yet.
    for (const position of this._positions) {
      switch (position) {
        default:
        case 'block-end':
          if (
            overlayHeight <= blockEndSpace &&
            overlayWidthOverlap <= inlineStartSpace &&
            overlayWidthOverlap <= inlineEndSpace
          ) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetInlineStart - overlayWidthOverlap,
              triggerOffsetBlockStart + triggerHeight,
            );
          }
          break;
        case 'block-start':
          if (
            overlayHeight <= blockStartSpace &&
            overlayWidthOverlap <= inlineStartSpace &&
            overlayWidthOverlap <= inlineEndSpace
          ) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetInlineStart - overlayWidthOverlap,
              triggerOffsetBlockStart - overlayHeight,
            );
          }
          break;
        case 'end':
          if (overlayHeight <= blockEndSpace && overlayWidth <= inlineEndSpace) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetInlineStart + triggerWidth,
              triggerOffsetBlockStart + triggerHeight,
            );
          }
          break;
        case 'inline-end':
          if (
            overlayWidth <= inlineEndSpace &&
            overlayHeightOverlap <= blockStartSpace &&
            overlayHeightOverlap <= blockEndSpace
          ) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetInlineStart + triggerWidth,
              triggerOffsetBlockStart - overlayHeightOverlap,
            );
          }
          break;
        case 'inline-start':
          if (
            overlayWidth <= inlineStartSpace &&
            overlayHeightOverlap <= blockStartSpace &&
            overlayHeightOverlap <= blockEndSpace
          ) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetInlineStart - overlayWidth,
              triggerOffsetBlockStart - overlayHeightOverlap,
            );
          }
          break;
        case 'start':
          if (overlayHeight <= blockStartSpace && overlayWidth <= inlineStartSpace) {
            return this._applyOverlayPosition(
              position,
              triggerOffsetInlineStart - overlayWidth,
              triggerOffsetBlockStart - overlayHeight,
            );
          }
          break;
      }
    }
  }

  private _applyOverlayPosition(position: string, inlineStart: number, blockStart: number): void {
    if (this._lastPosition !== position) {
      this._lastPosition = position;
      this._host.style.insetInlineStart = `${inlineStart}px`;
      this._host.style.insetBlockStart = `${blockStart}px`;
    }
  }
}
