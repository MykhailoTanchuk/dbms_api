const Field = require('./Field');
const Schema = require('./Schema');
const Row = require('./Row');

class Table {
  constructor(name, schema, rows = []) {
    this.name = name;        // Назва таблиці
    this.schema = schema;    // Схема таблиці (перелік полів і їх типів)
    this.rows = rows;          // Масив для зберігання рядків
  }

  // Метод для додавання рядка в таблицю
  addRow(row) {
    if (this.schema.validate(row)) {
      this.rows.push(row);
    } else {
      throw new Error('Невірні дані рядка відповідно до схеми');
    }
  }

  // Метод для редагування існуючого рядка
  updateRow(index, newRow) {
    if (this.schema.validate(newRow)) {
      this.rows[index] = newRow;
    } else {
      throw new Error('Невірні дані для оновлення рядка');
    }
  }

  // Метод для видалення рядка за його індексом
  deleteRow(index) {
    if (index >= 0 && index < this.rows.length) {
      this.rows.splice(index, 1);
    } else {
      throw new Error('Індекс рядка поза межами таблиці');
    }
  }

  // Метод для пошуку рядка за індексом
  findRow(index) {
    if (index >= 0 && index < this.rows.length) {
      return this.rows[index];
    } else {
      throw new Error('Індекс рядка поза межами таблиці');
    }
  }

  // Метод для INNER JOIN двох таблиць за ключовим полем
  innerJoin(otherTable, thisKey, otherKey) {
    // Перевірка наявності ключових полів у обох таблицях
    const thisKeyIndex = this.getFieldIndex(thisKey);
    const otherKeyIndex = otherTable.getFieldIndex(otherKey);

    if (thisKeyIndex === -1 || otherKeyIndex === -1) {
      throw new Error('Ключове поле не знайдено у одній з таблиць');
    }

    // Нові поля для об'єднаної таблиці
    const mergedFields = [
      ...this.schema.fields.map(field => new Field(`${this.name}.${field.getName()}`, field.getType())),
      ...otherTable.schema.fields.map(field => new Field(`${otherTable.name}.${field.getName()}`, field.getType()))
    ];

    const mergedSchema = new Schema(mergedFields);
    const mergedRows = [];

    // Проходження по рядках обох таблиць та об'єднання на основі ключових полів
    for (const thisRow of this.rows) {
      for (const otherRow of otherTable.rows) {
        if (thisRow.values[thisKeyIndex] === otherRow.values[otherKeyIndex]) {
          const mergedValues = [...thisRow.values, ...otherRow.values];
          mergedRows.push(new Row(mergedValues));
        }
      }
    }

    // Створення нової таблиці з об'єднаними даними
    return new Table(`${this.name}_join_${otherTable.name}`, mergedSchema, mergedRows);
  }

  // Метод для отримання індексу поля за його назвою
  getFieldIndex(fieldName) {
    for (let i = 0; i < this.schema.fields.length; i++) {
      if (this.schema.fields[i].getName() === fieldName) {
        return i;
      }
    }
    return -1;
  }
}

module.exports = Table;
