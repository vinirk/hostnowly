/**
 * Generates Tailwind CSS focus class strings based on the given condition.
 * If `hasRing` is true, it returns a set of classes that include focus ring styles.
 * Otherwise, it returns a class to remove the default outline on focus.
 *
 * @param {boolean} hasRing - Determines whether to include focus ring styles.
 * @returns {string} - Tailwind CSS class string for focus state.
 *
 * Example Usage:
 * twFocusClass(true) returns 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:focus:ring-offset-0'
 * twFocusClass() or twFocusClass(false) returns 'focus:outline-none'
 */
export default function twFocusClass(hasRing = false) {
  if (!hasRing) {
    return 'focus:outline-none';
  }
  return 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:focus:ring-offset-0';
}
