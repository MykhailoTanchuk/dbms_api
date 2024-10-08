const Table = require('./Table');
const Field = require('./Field');
const Schema = require('./Schema');
const Row = require('./Row');
const { readFileSync, writeFileSync } = require('node:fs');

class Database {
  constructor() {
    this.tables = [];  // Масив для зберігання всіх таблиць
  }

  // Метод для додавання нової таблиці
  addTable(table) {
    // Перевірка наявності таблиці з тим самим ім'ям
    const existingTable = this.tables.find(t => t.name === table.name);
    if (existingTable) {
      throw new Error(`Таблиця з ім'ям ${table.name} вже існує.`);
    }
    this.tables.push(table);
  }

  // Метод для видалення таблиці за її назвою
  deleteTable(tableName) {
    this.tables = this.tables.filter(table => table.name !== tableName);
  }

  // Метод для пошуку таблиці за її назвою
  findTable(tableName) {
    return this.tables.find(table => table.name === tableName);
  }

  // Метод для збереження бази даних на диск
  saveToFile(filePath) {
    const data = JSON.stringify(this.tables, null, 2); // Перетворення даних у формат JSON
    writeFileSync(filePath, data, 'utf-8');
  }

  loadFromFile(filePath) {
    const data = readFileSync(filePath, 'utf-8');
    const tablesData = JSON.parse(data);

    // Відновлення таблиць з JSON-даних
    this.tables = tablesData.map(tableData => {
      // Відновлення схеми
      const fields = tableData.schema.fields.map(fieldData => new Field(fieldData.name, fieldData.type));
      const schema = new Schema(fields);

      // Відновлення рядків
      const rows = tableData.rows.map(rowData => new Row(rowData.values));

      // Створення нової таблиці з відновленою схемою та рядками
      return new Table(tableData.name, schema, rows);
    });
  }
}

module.exports = Database;
