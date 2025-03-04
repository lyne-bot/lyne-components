import type { LitElement } from 'lit';

import type { AbstractConstructor } from './constructor.js';

export declare class SbbAnimationCompleteMixinType {
  public isAnimating: boolean;
  public get animationComplete(): Promise<void> | null;
  protected startAnimation(): void;
  protected stopAnimation(): void;
}

/**
 * Enhances the component with a Promise which resolves whenever an animation ends.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbAnimationCompleteMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbAnimationCompleteMixinType> & T => {
  abstract class SbbAnimationCompleteElement
    extends superClass
    implements Partial<SbbAnimationCompleteMixinType>
  {
    /**
     * Whether the component is currently animating.
     */
    public isAnimating = false;

    /**
     * Returns a promise which completes whenever an animation ends.
     * When a new animation starts, a new Promise is returned.
     */
    public get animationComplete(): Promise<void> {
      return this._animationPromise;
    }
    private _animationPromise: Promise<void> = Promise.resolve();

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this.stopAnimation();
    }

    protected startAnimation(): void {
      if (!this.isAnimating) {
        this._animationPromise = this._enqueueAnimation();
      }
    }

    /**
     * Overriding stopAnimation() breaks functionality.
     */
    protected stopAnimation(): void {}

    private async _enqueueAnimation(): Promise<void> {
      this.isAnimating = true;
      const stopAnimation = this.stopAnimation;

      const result = new Promise<void>((r) => {
        this.stopAnimation = () => {
          stopAnimation();
          this.isAnimating = false;
          r();
        };
      });
      try {
        // Ensure any previous update has resolved before updating.
        await this._animationPromise;
      } catch (e) {
        // Refire any previous errors async so they do not disrupt the update
        // cycle. Errors are re-fired so developers have a chance to observe
        // them, and this can be done by implementing
        // `window.onunhandledrejection`.
        Promise.reject(e);
      }
      return result;
    }
  }

  return SbbAnimationCompleteElement as unknown as AbstractConstructor<SbbAnimationCompleteMixinType> &
    T;
};
