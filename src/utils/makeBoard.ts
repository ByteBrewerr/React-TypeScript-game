import Board from "../models/Board";

export default function makeBoard() {
    const newBoard = new Board(12,10);
    newBoard.init();
    newBoard.addCharacters();
    newBoard.addObstacles();
<<<<<<< HEAD
    newBoard.buildQueue()
=======
>>>>>>> reseted
    return newBoard
  }