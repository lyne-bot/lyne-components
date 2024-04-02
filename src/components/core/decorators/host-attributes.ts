import { isServer, type ReactiveElement } from 'lit';

import type { AbstractConstructor } from '../mixins';

function applyAttributes(instance: ReactiveElement, attributes: Record<string, string>): void {
  for (const [name, value] of Object.entries(attributes)) {
    if (value) {
      instance.setAttribute(name, value);
    } else {
      instance.toggleAttribute(name, true);
    }
  }
}

/**
 * Applies the given attributes to the related element.
 * If an empty string is passed as a value, the attribute will be set
 * without value.
 *
 * @example
 *
 * @hostAttributes({
 *   role: 'region'
 * })
 * @customElement('my-element)
 * export class MyElement extends LitElement {
 *   ...
 * }
 *
 * @param attributes A record of attributes to apply to the element.
 */
export const hostAttributes =
  (attributes: Record<string, string>) => (target: AbstractConstructor<ReactiveElement>) =>
    (target as typeof ReactiveElement).addInitializer((instance: ReactiveElement) => {
      if (isServer) {
        applyAttributes(instance, attributes);
      } else {
        // It is not allowed to set attributes during constructor phase. Due to this we use a
        // controller to assign the attributes during lit initialization phase.
        // HostConnected or hostUpdate can be called either order. Due to that we apply in the
        // first occurrence and directly remove the controller, so it's only called once.
        instance.addController({
          hostConnected() {
            applyAttributes(instance, attributes);
            instance.removeController(this);
          },
          hostUpdate() {
            applyAttributes(instance, attributes);
            instance.removeController(this);
          },
        });
      }
    });
