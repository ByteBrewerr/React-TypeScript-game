import minimax from './minimax';
import Board from '../models/Board';

onmessage = (e: MessageEvent) => {
  const board: Board = e.data.board;
  const newBoard = new Board(12,10)
  newBoard.copyBoard(board)
  const depth = e.data.depth
  const queue = e.data.queue
  const result = minimax(newBoard, depth, false, -Infinity, Infinity, queue);
  
  postMessage(result);
};