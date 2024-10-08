class Field {
  constructor(name, type) {
    this.name = name;   // Назва поля
    this.type = type;   // Тип даних поля (string, integer, real, char, etc.)
  }

  // Метод для отримання назви поля
  getName() {
    return this.name;
  }

  // Метод для отримання типу поля
  getType() {
    return this.type;
  }

  // Метод для витягання інтервалу з типу
  getCharInvlRange() {
    const match = this.type.match(/charInvl\[(.)-(.)\]/);
    if (match) {
      return [match[1], match[2]];  // Повертає масив з двох символів, що визначають діапазон
    }
    throw new Error(`Невірний формат для типу charInvl: ${this.type}`);
  }
}

module.exports = Field;
