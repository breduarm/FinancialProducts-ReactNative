import { formatDateToLocale, formatDateToYearMonthDay } from "../../src/utils";

describe('formatDateToLocale', () => {
  it('should meet the expected format es-ES', () => {
    // Expected format
    const formatRegEx = /^\d{2}\/\d{2}\/\d{4}$/ // DD/MM/YYYY
    // Example date
    const date = new Date();

    const formattedDate = formatDateToLocale(date);
    expect(formattedDate).toMatch(formatRegEx);
  });

  it('should meet the expected format es-ES with a valid string date', () => {
    // Expected format
    const formatRegEx = /^\d{2}\/\d{2}\/\d{4}$/ // DD/MM/YYYY
    // Example date
    const date = new Date('2024-07-06T12:00:00Z');

    const formattedDate = formatDateToLocale(date);
    expect(formattedDate).toMatch(formatRegEx);
  });

  it('should format a valid date to locale correctly', () => {
    // Expected date in DD/MM/YYYY es-ES locale format
    const expectedDateStr = '06/07/2024'
    // Example date
    const date = new Date('2024-07-06T12:00:00Z');

    const formattedDate = formatDateToLocale(date);
    expect(formattedDate).toBe(expectedDateStr); 
  });

  it('should throws an error for invalid date', () => {
    const invalidDate = 'invalid-date-string';
    expect(() => formatDateToLocale(new Date(invalidDate))).toThrow();
  });
});

describe('formatDateToYearMonthDay', () => {
  it('should meet the expected format YYYY-MM-DD', () => {
    // Expected format
    const formatRegEx = /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD
    // Example date
    const date = new Date();

    const formattedDate = formatDateToYearMonthDay(date);
    expect(formattedDate).toMatch(formatRegEx);
  });

  it('should meet the expected format YYYY-MM-DD with a valid string date', () => {
    // Expected format
    const formatRegEx = /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD
    // Example date
    const date = new Date('2024-07-06T12:00:00Z');

    const formattedDate = formatDateToYearMonthDay(date);
    expect(formattedDate).toMatch(formatRegEx);
  });

  it('should formats a valid string date correctly', () => {
    // Expected date in YYYY-MM-DD format
    const expectedDateStr = '2024-07-06'
    // Example date
    const date = new Date('2024-07-06T12:00:00Z');
    
    expect(formatDateToYearMonthDay(date)).toBe(expectedDateStr);
  });

  it('should format end of year date correctly', () => {
    // Expected date in YYYY-MM-DD format
    const expectedDateStr = '2024-12-31'
    // Example date
    const date = new Date('2024-12-31T12:00:00Z');

    expect(formatDateToYearMonthDay(date)).toBe(expectedDateStr);
  });

  it('should throw an error for an invalid date object', () => {
    const invalidDate = 'invalid-date-string';
    expect(() => formatDateToYearMonthDay(new Date(invalidDate))).toThrow();
  });
});
