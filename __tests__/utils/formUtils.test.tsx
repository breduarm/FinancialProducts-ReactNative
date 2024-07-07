import {
  validateDescription,
  validateID,
  validateLogo,
  validateName,
  validateReleaseDate,
} from '../../src/utils/formUtils';

describe('validateID', () => {
  it('should return error for empty value', () => {
    const exampleValue = '';
    const expectedValue = 'Este campo es requerido';
    const result = validateID(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return error for value length less than 3', () => {
    const exampleValue = '01';
    const expectedValue = 'Mínimo 3 caracteres, máximo 10';
    const result = validateID(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return error for value length greater than 10', () => {
    const exampleValue = '12345678901';
    const expectedValue = 'Mínimo 3 caracteres, máximo 10';
    const result = validateID(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for valid value', () => {
    const exampleValue = '12345';
    const expectedValue = '';
    const result = validateID(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for value with length exactly 3', () => {
    const exampleValue = '123';
    const expectedValue = '';
    const result = validateID(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for value with length exactly 10', () => {
    const exampleValue = '1234567890';
    const expectedValue = '';
    const result = validateID(exampleValue);

    expect(result).toBe(expectedValue);
  });
});

describe('validateName', () => {
  it('should return error for empty value', () => {
    const exampleValue = '';
    const expectedValue = 'Este campo es requerido';
    const result = validateName(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return error for value length less than 5', () => {
    const exampleValue = 'abc';
    const expectedValue = 'Mínimo 5 caracteres, máximo 100';
    const result = validateName(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return error for value length greater than 100', () => {
    const exampleValue = 'a'.repeat(101);
    const expectedValue = 'Mínimo 5 caracteres, máximo 100';
    const result = validateName(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for valid value', () => {
    const exampleValue = 'Product Name';
    const expectedValue = '';
    const result = validateName(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for value with length exactly 5', () => {
    const exampleValue = '12345';
    const expectedValue = '';
    const result = validateName(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for value with length exactly 100', () => {
    const exampleValue = 'a'.repeat(100);
    const expectedValue = '';
    const result = validateName(exampleValue);

    expect(result).toBe(expectedValue);
  });
});

describe('validateDescription', () => {
  
  it('should return error for empty value', () => {
    const exampleValue = '';
    const expectedValue = 'Este campo es requerido';
    const result = validateDescription(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return error for value length less than 10', () => {
    const exampleValue = 'short';
    const expectedValue = 'Mínimo 10 caracteres, máximo 200';
    const result = validateDescription(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return error for value length greater than 200', () => {
    const exampleValue = 'a'.repeat(201);
    const expectedValue = 'Mínimo 10 caracteres, máximo 200';
    const result = validateDescription(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for valid value', () => {
    const exampleValue = 'Product description';
    const expectedValue = '';
    const result = validateDescription(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for value with length exactly 10', () => {
    const exampleValue = '1234567890';
    const expectedValue = '';
    const result = validateDescription(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for value with length exactly 200', () => {
    const exampleValue = 'a'.repeat(200);
    const expectedValue = '';
    const result = validateDescription(exampleValue);

    expect(result).toBe(expectedValue);
  });
});

describe('validateLogo', () => {
  
  it('should return error for empty value', () => {
    const exampleValue = '';
    const expectedValue = 'Este campo es requerido';
    const result = validateLogo(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for non-empty value', () => {
    const exampleValue = 'logo.png';
    const expectedValue = '';
    const result = validateLogo(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return error for whitespace value', () => {
    const exampleValue = '   ';
    const expectedValue = 'Este campo es requerido';
    const result = validateLogo(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for value with valid content', () => {
    const exampleValue = 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg';
    const expectedValue = '';
    const result = validateLogo(exampleValue);

    expect(result).toBe(expectedValue);
  });
});

describe('validateReleaseDate', () => {
  const mockCurrentDate = new Date('2024-07-01T00:00:00Z');

  it('should return error for empty value', () => {
    const exampleValue = '';
    const expectedValue = 'Este campo es requerido';
    const result = validateReleaseDate(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return error for invalid date format', () => {
    const exampleValue = 'invalid date';
    const expectedValue = 'Formato de fecha inválido';
    const result = validateReleaseDate(exampleValue);

    expect(result).toBe(expectedValue);
  });

  it('should return error for date less than current date', () => {
    const exampleValue = new Date('2024-06-30T00:00:00Z'); // One day before mock current date
    const expectedValue = 'La fecha debe ser igual o mayor a la fecha actual';
    const result = validateReleaseDate(exampleValue.toISOString(), mockCurrentDate);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for current date', () => {
    const exampleValue = mockCurrentDate.toISOString();
    const expectedValue = '';
    const result = validateReleaseDate(exampleValue, mockCurrentDate);

    expect(result).toBe(expectedValue);
  });

  it('should return empty string for future date', () => {
    const exampleValue = new Date('2024-07-02T00:00:00Z'); // One day after mock current date
    const expectedValue = '';
    const result = validateReleaseDate(exampleValue.toISOString(), mockCurrentDate);

    expect(result).toBe(expectedValue);
  });
});
