import * as React from "react";

/**
 * Returns `value` after `delayMs` of no changes.
 * Pass `immediate` when the new value should apply on this render
 * without waiting (used to clear a search box instantly).
 */
export function useDebouncedValue<T>(
  value: T,
  delayMs: number,
  immediate = false,
): T {
  const [debounced, setDebounced] = React.useState(value);

  if (immediate && !Object.is(debounced, value)) {
    setDebounced(value);
  }

  React.useEffect(() => {
    if (immediate) return;

    const handle = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(handle);
  }, [value, delayMs, immediate]);

  return debounced;
}
