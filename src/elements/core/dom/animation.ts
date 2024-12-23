import { isServer } from 'lit';

export function isZeroAnimationDuration(element: HTMLElement, cssVariableName: string): boolean {
  if (isServer) {
    return true;
  }
  const animationDuration = getComputedStyle(element).getPropertyValue(cssVariableName);

  return parseFloat(animationDuration) === 0;
}
