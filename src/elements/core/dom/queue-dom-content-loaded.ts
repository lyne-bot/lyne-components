export function queueDomContentLoaded(action: () => void): void {
  const queuedAction = (): void => queueMicrotask(action);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', queuedAction);
  } else {
    queuedAction();
  }
}
