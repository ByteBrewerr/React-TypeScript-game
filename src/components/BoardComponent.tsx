import React, { useEffect, useState, FC } from 'react';
import Board from '../models/Board';
import CellComponent from './CellComponent';
import Cell from '../models/Cell';
import Teams from '../enums/Teams.enum';
import LineTo from 'react-lineto';
import minimax from '../utils/minimax';
import cloneDeep from 'lodash/cloneDeep';

const BoardComponent: FC = () => {
  const [board, setBoard] = useState<Board>(new Board(10));
  const [currentTurn, setCurrentTurn] = useState<Teams>(Teams.Player);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
  const [cursor, setCursor] = useState(''); // запретить ререндер

  useEffect(() => {
    const newBoard = new Board(10);
    newBoard.init();
    newBoard.addCharacters();
    newBoard.addObstacles();
    setBoard(newBoard);
  }, []);

 

  useEffect(() => {
    if (currentTurn === Teams.Computer) {
      const {bestMoveTo, action, bestMoveFrom } = getBestMove();
      console.log(action)
  
      setBoard((prevBoard) => {
        const newBoard = new Board(10)
        newBoard.copy(prevBoard, bestMoveTo, bestMoveFrom, action?.type, action?.target)
        setCurrentTurn(Teams.Player);
        return newBoard;
      });
  
    }
  }, [currentTurn]);

  const getBestMove = () => {
    return minimax(board, 4, false, -Infinity, Infinity);
  };

  const updateBoard = () => {
    setCurrentTurn(Teams.Computer);
    setBoard((prevBoard) => {
      const newBoard = new Board(10);
      newBoard.cells = [...prevBoard.cells];
      return newBoard;
    });
  };

  const handleCellClick = (cell: Cell) => {
    if (currentTurn === Teams.Player) {
      if (selectedCell && hoveredCell?.character?.team === Teams.Computer && selectedCell.character?.canShoot(cell, selectedCell, board)) { //shoot
        selectedCell.character?.shoot(cell);
        updateBoard();
      }
      if (selectedCell && selectedCell.character?.canMove(cell, selectedCell)) { //move
        selectedCell.character.move(cell, selectedCell);
        setSelectedCell(null);
        updateBoard();
      } else {
        setSelectedCell(null); //undo selected cell
      }
      if (!selectedCell && cell.character?.team === Teams.Player) { //select cell
        setSelectedCell(cell);
      }
    }
    setCursor('cursor-default');
  };

  const handleCellHover = (cell: Cell) => {
    setHoveredCell(cell);
    if (selectedCell) {
      if (cell.character?.team === Teams.Computer && selectedCell.character?.canShoot(cell, selectedCell, board)) {
        setCursor(`cursor-shoot`);
      } else {
        setCursor(selectedCell.character?.canMove(cell, selectedCell) ? 'cursor-move' : `cursor-no`);
      }
    }
  };

  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center bg-sky-600'>
      <div className={`h-[600px] w-[600px] flex flex-wrap bg-black ${cursor}`}>
        {board.cells.map((row) => {
          return row.map((cell) => {
            return (
              <CellComponent
                key={`${cell.row}${cell.col}`}
                cell={cell}
                onClick={handleCellClick}
                canMove={
                  selectedCell?.character?.canMove(cell, selectedCell) &&
                  selectedCell.character.team === Teams.Player
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

    </div>
  );
};

export default BoardComponent;