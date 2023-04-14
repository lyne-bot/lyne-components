import getDocumentWritingMode from './get-document-writing-mode';

/**
 * Check if the key pressed is among those allowed for navigation.
 * @param event The keyboard event to check.
 */
export function isArrowKeyPressed(event: KeyboardEvent): boolean {
  return ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key);
}

/**
 * Check if the key pressed is among those allowed for navigation.
 * @param event The keyboard event to check.
 */
export function isArrowKeyOrPageKeysPressed(event: KeyboardEvent): boolean {
  return isArrowKeyPressed(event) || ['PageUp', 'PageDown', 'Home', 'End'].includes(event.key);
}

/**
 * Calculate the index of the next element based on the given offset.
 * @param currentIndex The index of the current element.
 * @param maxIndex The maximum permitted value (e.g. array size).
 * @param offset The amount to move by.
 */
function calcIndexInRange(currentIndex: number, maxIndex: number, offset: number): number {
  return (currentIndex + offset + maxIndex) % maxIndex;
}

/**
 * Gets the index of the element to move to, based on the keyboard input, the current element in the list and the list size.
 * @param event The keyboard event to check.
 * @param current The index of the current element in the list.
 * @param size The size of the list.
 * @returns if it is a 'previous' event, returns the index of the previous element,
 * or the index of the last one if the current element is the first in the list;
 * if it is a 'next' event, returns the index of the next element,
 * or the index of the first one, if the current is the last in the list.
 */
export function getNextElementIndex(event: KeyboardEvent, current: number, size: number): number {
  let prevKey: string, nextKey: string;
  if (getDocumentWritingMode() === 'rtl') {
    prevKey = 'ArrowRight';
    nextKey = 'ArrowLeft';
  } else {
    prevKey = 'ArrowLeft';
    nextKey = 'ArrowRight';
  }

  if (event.key === prevKey || event.key === 'ArrowUp') {
    return calcIndexInRange(current, size, -1);
  } else if (event.key === nextKey || event.key === 'ArrowDown') {
    return calcIndexInRange(current, size, 1);
  }
}
