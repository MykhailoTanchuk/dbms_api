const Database = require('../src/db/Database');
const Table = require('../src/db/Table');
const Schema = require('../src/db/Schema');
const Field = require('../src/db/Field');
const Row = require('../src/db/Row');

describe('Database class', () => {
  let db;

  beforeEach(() => {
    db = new Database(); // Створюємо новий екземпляр перед кожним тестом
  });

  test('Додавання таблиці до бази даних', () => {
    const schema = new Schema([new Field('id', 'integer'), new Field('name', 'string')]);
    const table = new Table('users', schema);

    db.addTable(table);

    expect(db.tables.length).toBe(1); // Перевіряємо, що таблиця додана
    expect(db.tables[0].name).toBe('users'); // Перевіряємо, що це правильна таблиця
  });

  test('Помилка при додаванні таблиці з уже існуючим ім\'ям', () => {
    const schema = new Schema([new Field('id', 'integer'), new Field('name', 'string')]);
    const table = new Table('users', schema);

    db.addTable(table);

    // Перевіряємо, що при спробі додати таблицю з тим самим ім'ям буде помилка
    expect(() => {
      db.addTable(table);
    }).toThrowError('Таблиця з ім\'ям users вже існує.');
  });

  test('Видалення таблиці з бази даних', () => {
    const schema = new Schema([new Field('id', 'integer'), new Field('name', 'string')]);
    const table = new Table('users', schema);

    db.addTable(table);
    db.deleteTable('users'); // Видаляємо таблицю

    expect(db.tables.length).toBe(0); // Перевіряємо, що таблиця видалена
  });

  test('Знаходження таблиці за ім\'ям', () => {
    const schema = new Schema([new Field('id', 'integer'), new Field('name', 'string')]);
    const table = new Table('users', schema);

    db.addTable(table);

    const foundTable = db.findTable('users');

    expect(foundTable).toBe(table); // Перевіряємо, що таблицю знайшли
  });

  test('Повернення undefined при пошуку неіснуючої таблиці', () => {
    const schema = new Schema([new Field('id', 'integer'), new Field('name', 'string')]);
    const table = new Table('users', schema);

    db.addTable(table);

    const foundTable = db.findTable('orders'); // Спроба знайти неіснуючу таблицю

    expect(foundTable).toBeUndefined(); // Перевіряємо, що результат undefined
  });
});
