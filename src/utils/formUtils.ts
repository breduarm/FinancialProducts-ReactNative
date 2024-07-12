/**
 * Validates an ID value based on the following criteria:
 *   - Required
 *   - Minimum 3 characters and maximum 10
 *
 * @param {string} value - The ID to validate.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
export const validateID = (value: string): string => {
  let error = '';

  if (value.trim() === '') {
    error = 'Este campo es requerido';
  } else if (value.length < 3 || value.length > 10) {
    error = 'Mínimo 3 caracteres, máximo 10';
  }

  return error;
};

/**
 * Validates a name value based on the following criteria:
 *   - Required
 *   - Minimum 5 characters and maximum 100
 *
 * @param {string} value - The name to validate.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
export const validateName = (value: string): string => {
  let error = '';

  if (value.trim() === '') {
    error = 'Este campo es requerido';
  } else if (value.length < 5 || value.length > 100) {
    error = 'Mínimo 5 caracteres, máximo 100';
  }

  return error;
};

/**
 * Validates a description value based on the following criteria:
 *   - Required
 *   - Minimum 10 characters and maximum 200
 *
 * @param {string} value - The description to validate.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
export const validateDescription = (value: string): string => {
  let error = '';

  if (value.trim() === '') {
    error = 'Este campo es requerido';
  } else if (value.length < 10 || value.length > 200) {
    error = 'Mínimo 10 caracteres, máximo 200';
  }

  return error;
};

/**
 * Validates a logo value based on the following criteria:
 *   - Required
 *
 * @param {string} value - The logo string to validate.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
export const validateLogo = (value: string): string => {
  let error = '';

  if (value.trim() === '') {
    error = 'Este campo es requerido';
  }

  return error;
};

/**
 * Validates a release date value based on the following criteria:
 *   - Required
 *   - The date must be equal to or greater than the current date
 *
 * @param {string} valueDate - The release date string to validate.
 * @param {Date} currentDate - The current date.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
export const validateReleaseDate = (
  valueDate: Date,
  currentDate: Date = new Date(),
): string => {
  if (isNaN(valueDate.getTime())) {
    return 'Este campo es requerido';
  }

  const currentDateTime = new Date(currentDate);
  currentDateTime.setHours(0, 0, 0, 0);

  if (valueDate < currentDateTime) {
    return 'La fecha debe ser igual o mayor a la fecha actual';
  }

  return '';
};
