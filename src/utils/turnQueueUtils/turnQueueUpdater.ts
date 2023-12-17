// Обобщенная функция обновления очереди ходов
export default function updateTurnQueue<T>(queue: T[]): T[] {
  // Проверка, что очередь содержит хотя бы два элемента
  if (queue.length <= 1) {
    return queue; // Возвращается неизмененная очередь, если она короткая или пустая
  }

  // Сохранение первого элемента очереди
  const firstCharacter = queue[0];

  // Создание обновленной очереди, исключая первый элемент
  const updatedQueue = queue.slice(1);

  // Перемещение первого элемента в конец очереди
  updatedQueue.push(firstCharacter);

  // Возвращение обновленной очереди ходов
  return updatedQueue;
}
