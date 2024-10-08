const Schema = require('../src/db/Schema');
const Field = require('../src/db/Field');
const Row = require('../src/db/Row');
const { describe, test, expect } = require('@jest/globals');

describe('Schema class', () => {
  test('Коректна валідація рядка за схемою', () => {
    const schema = new Schema([
      new Field('name', 'string'),
      new Field('age', 'integer')
    ]);

    const validRow = new Row(['John Doe', 30]);
    const invalidRow = new Row(['John Doe', 'thirty']);

    expect(schema.validate(validRow)).toBe(true);  // Валідний рядок
    expect(() => schema.validate(invalidRow)).toThrowError();  // Невалідний рядок
  });
});
