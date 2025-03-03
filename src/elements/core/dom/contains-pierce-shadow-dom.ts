/** Equivalent to `Element.contains` while piercing shadow DOM. */
export function containsPierceShadowDom(root: HTMLElement, child: HTMLElement | null): boolean {
  let current: Node | null = child;

  while (current) {
    if (current === root) {
      return true;
    }

    current = current instanceof ShadowRoot ? current.host : current.parentNode;
  }

  return false;
}
