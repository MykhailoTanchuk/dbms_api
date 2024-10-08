const Table = require('../src/db/Table');
const Schema = require('../src/db/Schema');
const Field = require('../src/db/Field');
const Row = require('../src/db/Row');
const { describe, test, it, expect } = require('@jest/globals');


describe('Table class', () => {
  describe('Table innerJoin method', () => {

    it('Коректне об\'єднання двох таблиць з однаковими ключами', () => {
      const usersSchema = new Schema([new Field('id', 'integer'), new Field('name', 'string')]);
      const usersTable = new Table('users', usersSchema);
      usersTable.addRow(new Row([1, 'John Doe']));
      usersTable.addRow(new Row([2, 'Jane Doe']));

      const ordersSchema = new Schema([new Field('id', 'integer'), new Field('order', 'string')]);
      const ordersTable = new Table('orders', ordersSchema);
      ordersTable.addRow(new Row([1, 'Order 1']));
      ordersTable.addRow(new Row([2, 'Order 2']));

      const mergedTable = usersTable.innerJoin(ordersTable, 'id', 'id');

      console.log(JSON.stringify(mergedTable));

      expect(mergedTable.rows.length).toBe(2);
      expect(mergedTable.rows[0].values).toEqual([1, 'John Doe', 1, 'Order 1']);
      expect(mergedTable.rows[1].values).toEqual([2, 'Jane Doe', 2, 'Order 2']);
    });

    test('Об\'єднання двох таблиць без спільних ключів', () => {
      const usersSchema = new Schema([new Field('id', 'integer'), new Field('name', 'string')]);
      const usersTable = new Table('users', usersSchema);
      usersTable.addRow(new Row([1, 'John Doe']));

      const ordersSchema = new Schema([new Field('id', 'integer'), new Field('order', 'string')]);
      const ordersTable = new Table('orders', ordersSchema);
      ordersTable.addRow(new Row([3, 'Order 3']));  // Не збігається з user id

      const mergedTable = usersTable.innerJoin(ordersTable, 'id', 'id');

      expect(mergedTable.rows.length).toBe(0);  // Жоден рядок не об'єднався
    });

    test('Об\'єднання з таблицею, що містить більше рядків', () => {
      const usersSchema = new Schema([new Field('id', 'integer'), new Field('name', 'string')]);
      const usersTable = new Table('users', usersSchema);
      usersTable.addRow(new Row([1, 'John Doe']));
      usersTable.addRow(new Row([2, 'Jane Doe']));

      const ordersSchema = new Schema([new Field('id', 'integer'), new Field('order', 'string')]);
      const ordersTable = new Table('orders', ordersSchema);
      ordersTable.addRow(new Row([1, 'Order 1']));
      ordersTable.addRow(new Row([1, 'Order 2']));
      ordersTable.addRow(new Row([2, 'Order 3']));

      const mergedTable = usersTable.innerJoin(ordersTable, 'id', 'id');

      expect(mergedTable.rows.length).toBe(3);
      expect(mergedTable.rows[0].values).toEqual([1, 'John Doe', 1, 'Order 1']);
      expect(mergedTable.rows[1].values).toEqual([1, 'John Doe', 1, 'Order 2']);
      expect(mergedTable.rows[2].values).toEqual([2, 'Jane Doe', 2, 'Order 3']);
    });
  });
});
