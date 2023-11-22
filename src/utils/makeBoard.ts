import Board from "../models/Board";

export default function makeBoard(): Board {
    const newBoard = new Board(12,10);
    newBoard.init();
    newBoard.addCharacters();
    newBoard.addObstacles();
    return newBoard
  }