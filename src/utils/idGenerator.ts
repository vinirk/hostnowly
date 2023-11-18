/**
 * Generates a unique ID string using a combination of a timestamp and a random number.
 * This function can be useful for generating unique keys, identifiers, etc., in various applications.
 *
 * @param {string} [prefix=''] - An optional prefix to prepend to the generated ID.
 *                               If not provided, the ID will start directly with the timestamp.
 * @returns {string} - A unique string ID. The format is 'prefix-timestamp-randomNumber' if a prefix is given.
 *                     Otherwise, the format is 'timestamp-randomNumber'. The timestamp is based on the current time,
 *                     and the random number is generated using Math.random().
 *
 * Example:
 * generateTimestampId('user') might return 'user-1609459200000-1047227135'.
 */
function generateTimestampId(prefix: string = '') {
  const timestamp = Date.now().toString(36); // Base-36 encoding of the timestamp
  const random = Math.random().toString(36).slice(2); // Base-36 random string
  return `${prefix ? `${prefix}-` : ''}${timestamp}-${random}`;
}

export default generateTimestampId;
