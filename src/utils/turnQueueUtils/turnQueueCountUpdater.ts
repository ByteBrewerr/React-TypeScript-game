import Board from "@models/Board";
import Character from "@models/characters/Character";

export default function updateTurnQueueCount(
  queue: Character[], // Передаваемая очередь ходов
  board: Board, // Доска с текущим состоянием игры
): Character[] {
  // Получение всех позиций на доске
  const allPieces = board.getAllPositions();

  // Фильтрация очереди ходов
  const updatedQueue = queue.filter((queueCharacter) => {
    // Поиск соответствующего персонажа на доске
    const boardCharacter = allPieces.find(
      (boardPiece) => queueCharacter.team === boardPiece.character?.team && queueCharacter.name === boardPiece.character?.name,
    );

    // Если персонаж найден на доске
    if (boardCharacter) {
      // Обновление счетчика и здоровья персонажа в очереди
      queueCharacter.count = boardCharacter.character!.count;
      queueCharacter.health = boardCharacter.character!.health;
      return true; // Персонаж сохраняется в обновленной очереди
    }

    return false; // Персонаж не найден на доске и исключается из очереди
  });

  return updatedQueue;
}
