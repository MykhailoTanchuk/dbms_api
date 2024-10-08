class Row {
  constructor(values) {
    this.values = values;  // Масив значень для кожного поля
  }

  // Метод для оновлення значення в рядку за індексом
  updateValue(index, newValue) {
    if (index >= 0 && index < this.values.length) {
      this.values[index] = newValue;
    } else {
      throw new Error('Індекс поза межами рядка');
    }
  }

  // Метод для отримання значення за індексом
  getValue(index) {
    if (index >= 0 && index < this.values.length) {
      return this.values[index];
    } else {
      throw new Error('Індекс поза межами рядка');
    }
  }
}

module.exports = Row;
