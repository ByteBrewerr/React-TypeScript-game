import Teams from "../../enums/Teams.enum";
import Character from "../../models/characters/Character";

export default function updateTurnQueue(queue: Character[]): Character[] {
    if (queue.length <= 1) {
      return queue;
    }
    const firstCharacter = queue[0];

    const updatedQueue = queue.slice(1);

    updatedQueue.push(firstCharacter);
  
    return updatedQueue;
  }