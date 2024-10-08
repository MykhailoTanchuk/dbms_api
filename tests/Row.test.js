const Row = require('../src/db/Row');
const { test, describe, expect } = require('@jest/globals');

describe('Row class', () => {
  test('Створення рядка з початковими значеннями', () => {
    const row = new Row(['John Doe', 30]);
    expect(row.values).toEqual(['John Doe', 30]);
  });

  test('Оновлення значення в рядку', () => {
    const row = new Row(['John Doe', 30]);
    row.updateValue(1, 31);  // Оновлюємо вік
    expect(row.values[1]).toBe(31);
  });

  test('Отримання значення за індексом', () => {
    const row = new Row(['John Doe', 30]);
    expect(row.getValue(0)).toBe('John Doe');
  });
});
