const Field = require('../src/db/Field');
const { describe, test, expect } = require('@jest/globals');

describe('Field class', () => {
  test('Створення поля з правильним типом', () => {
    const field = new Field('name', 'string');
    expect(field.getName()).toBe('name');
    expect(field.getType()).toBe('string');
  });

  test('Отримання інтервалу для charInvl', () => {
    const field = new Field('charField', 'charInvl[a-z]');
    const range = field.getCharInvlRange();
    expect(range).toEqual(['a', 'z']);
  });
});
