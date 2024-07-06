/**
 * Formats a given date to the 'es-ES' locale with 'numeric' year, and '2-digit' month and day.
 * e.g. "06/07/2024"
 * 
 * @param {Date} value - The Date to format.
 * @returns {string} - The formatted date string in 'es-ES' locale.
 * @throws {Error} - Throws an error if the input is not a valid Date object.
 */
export const formatDateToLocale = (value: Date): string => {
  // Check if the input is a valid Date object
  if (!(value instanceof Date) || isNaN(value.getTime())) {
    throw new Error('Invalid Date object provided');
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return value.toLocaleDateString('es-ES', options);
};

/**
 * Formats a Date object to a string in the format YYYY-MM-DD.
 * e.g. "2024-07-06"
 * 
 * @param {Date} value - The Date to format.
 * @returns {string} - The formatted date string.
 * @throws {Error} - Throws an error if the input is not a valid Date object.
 */
export const formatDateToYearMonthDay = (value: Date): string => {
  // Check if the input is a valid Date object
  if (!(value instanceof Date) || isNaN(value.getTime())) {
    throw new Error('Invalid Date object provided');
  }

  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};