import React, { useEffect, useState, useMemo, FC } from 'react';
import Board from '../models/Board';
import CellComponent from './CellComponent';
import Character from '../models/characters/Character';
import Cell from '../models/Cell';
import Teams from '../enums/Teams.enum';
import LineTo from 'react-lineto';
import makeBoard from '../utils/makeBoard';

interface BoardProps {
  currentTurn: Teams;
  setCurrentTurn: React.Dispatch<React.SetStateAction<Teams>>;
  board: Board 
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  queue: Character[]
  handleEndTurn: () => void
}
//todo delete copyBoard method
const minimaxWorker = new Worker(new URL("../utils/minimaxWorker.ts" , import.meta.url));

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentTurn, setCurrentTurn, handleEndTurn, queue}) => {
  
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
  const [lastHoveredCell, setLastHoveredCell] = useState<Cell | null>(null);

  const [cursor, setCursor] = useState(''); // запретить ререндер
  console.log(board.queue)

  const possibleMoves = useMemo(() => {
    if (selectedCell) {
      return selectedCell.character?.possibleMoves(board, selectedCell);
    }
    return null;
  }, [board, selectedCell]);

  useEffect(() => {
    if (currentTurn === Teams.Computer) {
      getBestMove()
    }
  }, [board]);

const getBestMove = () => {
  minimaxWorker.postMessage({board, depth: 3, isMaximizingPlayer: false, alpha: -Infinity, beta: Infinity, queue});
  minimaxWorker.onmessage = (e) => {

    const { bestMove } = e.data;
    console.log(bestMove)
    const actionName = bestMove.actionName
    const character = board.cells[bestMove.from.row][bestMove.from.col].character!
    if(actionName === 'move'){
      console.log(character)
      character.move(bestMove.to, bestMove.from, board)
    }
    if(actionName === 'shoot'){
      character.shoot(bestMove.to, bestMove.from, board)
    }
    if(actionName === 'attack'){
      const character = board.cells[bestMove.attacker.row][bestMove.attacker.col].character!
      character.attack(bestMove.to, bestMove.from, bestMove.attacker, board)
    }

    updateBoard()

  }

};


  const updateBoard = () => {
    setSelectedCell(null)

    setBoard((prevBoard) => {
      const newBoard = new Board(12,10);
      newBoard.copyBoard(prevBoard)
      return newBoard;
    });
    handleEndTurn() 
  };
  
  const handleCellClick = (cell: Cell) => {
  if (currentTurn === Teams.Player) {
    if (!selectedCell && cell.character?.team === Teams.Player) {
      setSelectedCell(cell);
      setLastHoveredCell(cell)
      return;
    }

    if (selectedCell) {
      if (cell.character?.team === Teams.Computer && selectedCell.character?.canShoot(cell, selectedCell, board)) {
        selectedCell.character?.shoot(cell, selectedCell,board);
      } else if (selectedCell.character?.canMove(cell, selectedCell, board)) {
        selectedCell.character.move(cell, selectedCell, board);
      } else if (cell.character && lastHoveredCell && selectedCell.character?.canAttack(cell, lastHoveredCell, board)) {
        selectedCell.character.attack(cell, lastHoveredCell, selectedCell, board);
      }
      else {
        setSelectedCell(null)
        return
      }
      setLastHoveredCell(null);
      updateBoard();
    }
  }
};
  
  
  const handleCellHover = (cell: Cell) => {
    setHoveredCell(cell);
  
    if (selectedCell) {

      const canAttackFromHoveredCell = possibleMoves?.some(move => move.actionName === 'attack' && move.from.row === cell.row && move.from.col === cell.col);
      const canAttackHoveredCell = possibleMoves?.some(move => move.actionName === 'attack' && move.to.row === cell.row && move.to.col === cell.col);
      const canShootHoveredCell = possibleMoves?.some(move => move.actionName === 'shoot' && move.to.row === cell.row && move.to.col === cell.col);
      const canMoveOnHoveredCell = possibleMoves?.some(move => move.actionName === 'move' && move.to.row === cell.row && move.to.col === cell.col);
      console.log(canAttackFromHoveredCell, canMoveOnHoveredCell, canAttackHoveredCell)
      const cursorClass: any = {
        'cursor-move': canMoveOnHoveredCell,
        'cursor-attack': canAttackHoveredCell,
        'cursor-shoot': canShootHoveredCell,
        'cursor-no': !(canAttackHoveredCell || canMoveOnHoveredCell || canShootHoveredCell),
      };
      setCursor(Object.keys(cursorClass).find(className => cursorClass[className]) || '');
  
      if(canAttackFromHoveredCell){
        setLastHoveredCell(cell)
      }else if(cell.character?.team !== Teams.Computer){
        setLastHoveredCell(null)
      }
    } else {
      setCursor(cell.character?.team === Teams.Player ? 'cursor-pointer' : 'cursor-default');
    }
  };

  return (
    <>
      <div className={`h-[810px] w-[972px] flex flex-wrap bg-black ${cursor}`}>
        {board.cells.map((row) => {
          return row.map((cell) => {
            return (
              <CellComponent
                key={`${cell.row}${cell.col}`}
                cell={cell}
                isLastHoveredCell={lastHoveredCell?.row === cell.row && lastHoveredCell.col === cell.col}
                onClick={handleCellClick}
                canMove={
                  possibleMoves?.some(move => move.actionName === 'move' && move.to.row === cell.row && move.to.col === cell.col)
                }
                canBeAttacked={ 
                  possibleMoves?.some(move => move.actionName === 'attack' && move.to.row === cell.row && move.to.col === cell.col)
                }
                isSelected={
                  selectedCell?.row === cell.row &&
                  selectedCell.col === cell.col
                }
                onMouseEnter={handleCellHover}
              />
            );
          });
        })}
      </div>
      {selectedCell && hoveredCell?.character?.team === Teams.Computer && selectedCell.character?.canShoot(hoveredCell, selectedCell, board) && (
        <LineTo
          className={`${cursor}`}
          from={`${selectedCell.row}${selectedCell.col}`}
          to={`${hoveredCell.row}${hoveredCell.col}`}
          borderWidth={1}
        />
      )}
    </>
    
  );
};

export default BoardComponent;