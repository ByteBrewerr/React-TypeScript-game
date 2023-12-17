import Teams from "@enums/Teams.enum";

// Функция для построения порядка выбора в драфте
export default function buildDraft() {
  // Инициализация массива для порядка выбора
  const pickOrder = [];

  // Цикл для создания порядка выбора в течение 14 раундов
  for (let i = 0; i < 14; i++) {
    pickOrder.push(i % 2 === 0 ? Teams.Player : Teams.Computer);
  }

  return pickOrder;
}
