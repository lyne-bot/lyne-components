/**
 * Prevents scrolling from pressing Space
 * @param event The origin event.
 */
export function preventScrollOnSpacebarPress(event: KeyboardEvent): void {
  if (event.key === ' ') {
    event.preventDefault();
  }
}
