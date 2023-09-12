import React, { useEffect, useState, FC } from 'react';
import Board from '../models/Board';
import CellComponent from './CellComponent';
import Cell from '../models/Cell';
import Teams from '../enums/Teams.enum';
import LineTo from 'react-lineto';
import minimax from '../utils/minimax';
import cloneDeep from 'lodash/cloneDeep';

const BoardComponent: FC = () => {
  const [board, setBoard] = useState<Board>(new Board());
  const [currentTurn, setCurrentTurn] = useState<Teams>(Teams.Player);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
  const [cursor, setCursor] = useState(''); // запретить ререндер

  const [actions, setActions] = useState(2);

  useEffect(() => {
    const newBoard = new Board();
    newBoard.init();
    newBoard.addCharacters();
    newBoard.addObstacles();
    setBoard(newBoard);
  }, []);

 

  useEffect(() => {
    if (currentTurn === Teams.Computer && actions === 0) {
      const {bestActions} = getBestMove();
      console.log(bestActions)
  
      setBoard((prevBoard) => {
        if(bestActions){
          const firstAction = bestActions.firstAction
          const secondAction = bestActions.secondAction
          const newFirstActionBoard = new Board()
          const newSecondActionBoard = new Board()
          
          if(firstAction.actionName === 'move'){
            const characterMoveFrom = prevBoard.cells[firstAction.from.row][firstAction.from.col]
            newFirstActionBoard.copyMovedBoard(prevBoard, firstAction.to, characterMoveFrom)
          }
          if(firstAction.actionName === 'shoot'){
            newFirstActionBoard.copyShootedBoard(prevBoard, firstAction.to, firstAction.from)
          }
          if(secondAction.actionName === 'move'){
            const characterMoveFrom = newFirstActionBoard.cells[secondAction.from.row][secondAction.from.col]
            newSecondActionBoard.copyMovedBoard(newFirstActionBoard, secondAction.to, characterMoveFrom)
          }
          if(secondAction.actionName === 'shoot'){
            newSecondActionBoard.copyShootedBoard(newFirstActionBoard, secondAction.to, secondAction.from)
          }

          setCurrentTurn(Teams.Player);
          setActions(2)

          return newSecondActionBoard;
        } 

        else return new Board()
      });
  
    }
  }, [actions]);

  const getBestMove = () => {
    return minimax(board, 3, false, -Infinity, Infinity);
  };

  const updateBoard = () => {
    if(actions === 1){
      setCurrentTurn(Teams.Computer)
      setSelectedCell(null)
      setActions(actions - 1);
    }
    setBoard((prevBoard) => {
      const newBoard = new Board();
      newBoard.cells = [...prevBoard.cells];
      return newBoard;
    });
    setActions(actions - 1);
  };

  const handleCellClick = (cell: Cell) => {
    if (currentTurn === Teams.Player) {
      if (actions > 0) {
        if (
          selectedCell &&
          hoveredCell?.character?.team === Teams.Computer &&
          selectedCell.character?.canShoot(cell, selectedCell, board)
        ) {
          selectedCell.character?.shoot(cell);
          updateBoard();

        } else if (selectedCell && selectedCell.character?.canMove(cell, selectedCell)) {
          selectedCell.character.move(cell, selectedCell);
          setSelectedCell(null);
          updateBoard();

        } else {
          setSelectedCell(null);
        }
      }
      if (!selectedCell && cell.character?.team === Teams.Player) {
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
      <div className={`h-[480px] w-[480px] flex flex-wrap bg-black ${cursor}`}>
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