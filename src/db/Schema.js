class Schema {
  constructor(fields) {
    this.fields = fields;  // Масив об'єктів Field
  }

  // Метод для валідації рядка на відповідність схемі
  validate(row) {
    if (row.values.length !== this.fields.length) {
      throw new Error('Кількість полів не відповідає схемі');
    }

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      const value = row.values[i];
      const fieldType = field.getType();

      // Перевірка типу даних
      if (!this.validateFieldType(value, fieldType, field)) {
        throw new Error(`Невірні дані для поля ${field.getName()}`);
      }
    }
    return true;
  }

  // Внутрішній метод для перевірки типу поля
  validateFieldType(value, fieldType, field) {
    switch (fieldType) {
      case 'string':
        return typeof value === 'string';
      case 'integer':
        return Number.isInteger(value);
      case 'real':
        return typeof value === 'number';
      case 'char':
        return typeof value === 'string' && value.length === 1;
      case fieldType.match(/charInvl\[(.)-(.)\]/)?.input:
        const [startChar, endChar] = field.getCharInvlRange();
        return typeof value === 'string' && value.length === 1 && value >= startChar && value <= endChar;
      case fieldType.match(/string\(charInvl\[(.)-(.)\]\)/)?.input:
        const [start, end] = field.getCharInvlRange();
        return typeof value === 'string' && [...value].every(char => char >= start && char <= end);
      default:
        throw new Error(`Невідомий тип поля: ${fieldType}`);
    }
  }
}

module.exports = Schema;
