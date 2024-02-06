import { interactivityChecker } from './interactivity-checker';

export const IS_FOCUSABLE_QUERY = [
  'button',
  '[href]',
  'input',
  'select',
  'textarea',
  'details',
  'summary:not(:disabled)',
  '[tabindex]',
]
  .map((selector) => `${selector}:not([disabled],[tabindex="-1"])`)
  .join(',');

// Note: the use of this function for more complex scenarios (with many nested elements) may be expensive.
export function getFocusableElements(
  elements: HTMLElement[],
  properties?: {
    filterFunc?: (el: HTMLElement) => boolean;
    findFirstFocusable?: boolean;
    includeInvisibleElements?: boolean;
  },
): HTMLElement[] {
  const focusableEls = new Set<HTMLElement>();

  function getFocusables(elements: HTMLElement[], filterFunc?: (el: HTMLElement) => boolean): void {
    for (const el of elements) {
      if (filterFunc && !filterFunc(el)) {
        continue;
      }

      if (el.nodeName === 'SLOT') {
        getFocusables(
          Array.from((el as HTMLSlotElement).assignedElements()) as HTMLElement[],
          filterFunc,
        );
        continue;
      }

      if (
        el.matches(IS_FOCUSABLE_QUERY) &&
        (properties?.includeInvisibleElements ?? interactivityChecker.isVisible(el))
      ) {
        focusableEls.add(el);
      }

      if (properties?.findFirstFocusable && focusableEls.size > 0) {
        break;
      }

      if (el.children.length || el.shadowRoot?.children.length) {
        const children = Array.from(el.children).length
          ? (Array.from(el.children) as HTMLElement[])
          : (Array.from(el.shadowRoot!.children) as HTMLElement[]);
        getFocusables(children, filterFunc);
      }
    }
  }
  getFocusables(elements, properties?.filterFunc);

  return [...focusableEls];
}

export function getFirstFocusableElement(
  elements: HTMLElement[],
  filterFunc?: (el: HTMLElement) => boolean,
): HTMLElement | null {
  const focusableElements = getFocusableElements(elements, {
    filterFunc: filterFunc,
    findFirstFocusable: true,
  });
  return focusableElements.length ? focusableElements[0] : null;
}

export class FocusHandler {
  private _controller = new AbortController();

  /**
   * @param element in which the focus should be trapped.
   * @param options options object.
   * @param options.filter filter function which is applied during searching for focusable element. If an element is filtered, also child elements are filtered.
   * @param options.postFilter filter function which is applied after collecting focusable elements.
   */
  public trap(
    element: HTMLElement,
    options?: {
      filter?: (el: HTMLElement) => boolean;
      postFilter?: (el: HTMLElement) => boolean;
    },
  ): void {
    element.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Tab') {
          return;
        }

        // Dynamically get first and last focusable element, as this might have changed since opening overlay
        const elementChildren: HTMLElement[] = Array.from(
          element.shadowRoot!.children || [],
        ) as HTMLElement[];
        const focusableElements = getFocusableElements(elementChildren, {
          filterFunc: options?.filter,
        });
        const filteredFocusableElements = focusableElements.filter(
          options?.postFilter ?? (() => true),
        );

        if (!filteredFocusableElements.length) {
          return;
        }

        const firstFocusable = filteredFocusableElements[0] as HTMLElement;
        const lastFocusable = filteredFocusableElements[
          filteredFocusableElements.length - 1
        ] as HTMLElement;

        const [pivot, next] = event.shiftKey
          ? [firstFocusable, lastFocusable]
          : [lastFocusable, firstFocusable];

        if (
          (firstFocusable.getRootNode() as Document | ShadowRoot).activeElement === pivot ||
          (lastFocusable.getRootNode() as Document | ShadowRoot).activeElement === pivot
        ) {
          next.focus();
          event.preventDefault();
        }
      },
      { signal: this._controller.signal },
    );
  }

  public disconnect(): void {
    this._controller.abort();
    this._controller = new AbortController();
  }
}
