/**
 * Truncates a string to the specified maximum character length and appends an ellipsis.
 * @param {string} string - Input text to truncate.
 * @param {number} [len=205] - Maximum character length before truncation.
 * @returns {string|undefined} Truncated string.
 */
export const truncate = (string, len = 205) => {
  if (!string) return;

  if (string.length > len) {
    return string.substring(0, len) + "...";
  }

  return string;
};
