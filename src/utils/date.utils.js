import { format, isValid, parseISO } from "date-fns";

/**
 * Formats an ISO-8601 date string into a semantic <time> element.
 * @param {string} dateString - ISO-8601 date string.
 * @returns {JSX.Element|string} Rendered <time> element or "No date" fallback.
 */
export const dateFormatter = (dateString) => {
  if (!dateString || !isValid(parseISO(dateString))) {
    return "No date";
  }
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};

/**
 * Resolves the most recent timestamp from an article date object (preferring updatedAt over createdAt).
 * @param {{updatedAt?: string, createdAt?: string}} [dateObj] - Article date metadata object.
 * @returns {JSX.Element|string} Formatted date element.
 */
export const getFinalDate = (dateObj) => {
  if (dateObj?.updatedAt) {
    return dateFormatter(dateObj.updatedAt);
  }

  return dateFormatter(dateObj?.createdAt);
};