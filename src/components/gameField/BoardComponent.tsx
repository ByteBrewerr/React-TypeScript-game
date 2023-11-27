import React, { useEffect, useState, useMemo, FC, useCallback } from 'react';
import Board from '@models/Board';
import CellComponent from './cell/CellComponent';
import Character from '@models/characters/Character';
import Cell from '@models/Cell';
import Teams from '@enums/Teams.enum';
import aStarSearch from '@utils/aStarSearch';
import RoadLine from './RoadLine';
import ShootLine from './ShootLine';
import Road from '@interfaces/Road';
import Action from '@interfaces/Action';

interface BoardProps {
  currentTurn: Teams;
  setCurrentTurn: React.Dispatch<React.SetStateAction<Teams>>;
  board: Board 
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  queue: Character[]
  handleEndTurn: () => void
}
const minimaxWorker = new Worker(new URL("@utils/minimaxWorker.ts" , import.meta.url));

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentTurn, setCurrentTurn, handleEndTurn, queue}) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
  const [lastHoveredCell, setLastHoveredCell] = useState<Cell | null>(null);

  const [cursor, setCursor] = useState<string>('');

  const [road, setRoad] = useState<Road[]>([])
  const [enemyShootLine, setEnemyShootLine] = useState<Cell[]>([])

  const possibleMoves = useMemo(() => selectedCell && selectedCell.character?.possibleMoves(board, selectedCell), [selectedCell, board]);
  const enemyPossibleMoves = useMemo(() => hoveredCell && hoveredCell.character?.possibleMoves(board, hoveredCell), [hoveredCell, board]);
   
  useEffect(() => {
    if(!road.length && !enemyShootLine.length){
      if (currentTurn === Teams.Computer) {
        getBestMove()
      }
      
      if(currentTurn === Teams.Player){
        const queueCharacter = queue[0]
  
        // if(queueCharacter.team === Teams.Computer) throw Error('something went wrong')
  
        const queueCharacterCell = board.getAllPositions().find(
          (position) =>
            queueCharacter.team === position.character?.team &&
            queueCharacter.name === position.character?.name
        );
        setSelectedCell(queueCharacterCell!)
      }
      //getBestMove()
    }
   
  }, [board]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if(enemyShootLine.length){
      const character = board.getThisBoardCell(enemyShootLine[0]).character!;
      setTimeout(()=>{
        setEnemyShootLine([])
        character.shoot(enemyShootLine[1], enemyShootLine[0], board);
        updateBoard();
      }, 1500)
    }
    return () => {
      clearTimeout(timer);
    };
  }, [enemyShootLine]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (road.length >= 2) {
      timer = setTimeout(processRoad, 300);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [road]);

  const processRoad = () => {
    const character = board.getThisBoardCell(road[0].cell).character!;
    character.move(road[1].cell, road[0].cell, board);
  
    if (road.length === 2) {
      if (road[0].actionName === 'attack') {
        character.attack(road[0].targetToAttack!, road[1].cell, road[1].cell, board);
      }
      setRoad([]);
      updateBoard();
    } else {
      character.move(road[1].cell, road[0].cell, board);
      setRoad((prev) => prev.slice(1));
      updateBoardWithoutEndingTurn();
    }
  };
  
  const getBestMove = () => {
    const handleWorkerMessage = (e: MessageEvent) => {
      try {
        const { bestMove, bestScore } = e.data;
        console.log(bestMove);
        console.log(bestScore);
        handleAction(bestMove)

      } catch (error) {
        console.log(error);
        throw new Error('something went wrong, restart the game');
      }
    };
  
    const handleWorkerError = (error: ErrorEvent) => {
      console.error(error);
      throw new Error('Worker error');
    };
    
    const isMaximizingPlayer = currentTurn === Teams.Player;
    minimaxWorker.postMessage({ board, depth: 4, isMaximizingPlayer, alpha: -Infinity, beta: Infinity, queue });
    minimaxWorker.onmessage = handleWorkerMessage;
    minimaxWorker.onerror = handleWorkerError;
  };

  const handleAction  = (action: Action) => {
    let road: Cell[] = [];

        if (action.actionName === 'move') {
          road = aStarSearch(action.from, action.to, board);
        }
        if (action.actionName === 'shoot') {
          setEnemyShootLine([action.from, action.to])
        }
        if (action.actionName === 'attack' && action.attacker) {
          road = aStarSearch(action.attacker, action.from, board);
        }

        if(road.length===1){
          road.push(action.from);
        }

        const roadWithActionName: Road[] = road.map((cell) => {
          if (action.attacker) {
            return { cell, targetToAttack: action.to, actionName: 'attack' };
          }
          return { cell, actionName: 'move' };
        });

        setRoad(roadWithActionName);
        updateBoardWithoutEndingTurn();
  }

  const initializeBoard = (prevBoard: Board) => {
    const newBoard = new Board(12, 10);
    newBoard.copyBoard(prevBoard);
    return newBoard;
  };
  
  const updateBoard = () => {

    setBoard((prevBoard) => initializeBoard(prevBoard));
    handleEndTurn();
  };
  
  const updateBoardWithoutEndingTurn = () => {

    setBoard((prevBoard) => initializeBoard(prevBoard));
  };

  const handleCellClick = useCallback((cell: Cell) => {
    if (currentTurn === Teams.Player) {
      if (selectedCell) {
        if (cell.character?.team === Teams.Computer && selectedCell.character?.canShoot(cell, selectedCell, board)) {
          handleAction({actionName: 'shoot', from: selectedCell, to: cell})
        } else if (selectedCell.character?.canMove(cell, selectedCell, board)) {
          handleAction({actionName: 'move', from: selectedCell, to: cell})
        } else if (cell.character && lastHoveredCell && selectedCell.character?.canAttack(cell, lastHoveredCell, selectedCell, board)) {
          handleAction({actionName: 'attack', from: lastHoveredCell, to: cell, attacker: selectedCell})
        } else {
          return;
        }
        setLastHoveredCell(null);
      }
    }
  }, [selectedCell, lastHoveredCell]);


  const handleCellHover = useCallback((cell: Cell) => {
    setHoveredCell(cell);
    const canAttackFromHoveredCell = possibleMoves?.some((move) => move.actionName === 'attack' && move.from.row === cell.row && move.from.col === cell.col);
    const canAttackHoveredCell = possibleMoves?.some((move) => move.actionName === 'attack' && move.to.row === cell.row && move.to.col === cell.col);
    const canShootHoveredCell = possibleMoves?.some((move) => move.actionName === 'shoot' && move.to.row === cell.row && move.to.col === cell.col);
    const canMoveOnHoveredCell = possibleMoves?.some((move) => move.actionName === 'move' && move.to.row === cell.row && move.to.col === cell.col);
  
    const cursorClass: Record<string, boolean | undefined> = {
      'cursor-move': canMoveOnHoveredCell,
      'cursor-attack': canAttackHoveredCell,
      'cursor-shoot': canShootHoveredCell,
      'cursor-no': !(canAttackHoveredCell || canMoveOnHoveredCell || canShootHoveredCell),
    };
    setCursor(Object.keys(cursorClass).find((className) => cursorClass[className]) || '');
  
    if (canAttackFromHoveredCell) {
      setLastHoveredCell(cell);
    } else if (cell.character?.team !== Teams.Computer) {
      setLastHoveredCell(null);
    }
  }, [selectedCell]);

  return (
    <>
      <div className={`h-[810px] w-[972px] flex flex-wrap bg-black ${cursor}`}>
        {board.cells.map((row) => {
          return row.map((cell) => {
            const canMove = possibleMoves?.some(
              (move) => move.actionName === 'move' && move.to.row === cell.row && move.to.col === cell.col
            );
            
            const canBeAttacked = possibleMoves?.some(
              (move) => move.actionName === 'attack' && move.to.row === cell.row && move.to.col === cell.col
            );
            
            const canEnemyMove = enemyPossibleMoves?.some(
              (move) =>
                (move.actionName === 'move' || move.actionName === 'attack') &&
                move.to.row === cell.row &&
                move.to.col === cell.col
            );
            
            return (
              <CellComponent
                key={`${cell.row}${cell.col}`}
                cell={cell}
                onClick={handleCellClick}
                onMouseEnter={handleCellHover}
                canMove={canMove}
                canEnemyMove={canEnemyMove}
                canBeAttacked={canBeAttacked}
                isLastHoveredCell={
                  lastHoveredCell?.row === cell.row &&
                  lastHoveredCell.col === cell.col
                }
                isSelected={
                  selectedCell?.row === cell.row &&
                  selectedCell.col === cell.col
                }
                
              />
            );
          });
        })}
      </div>

      <RoadLine road={road}/>
      {enemyShootLine.length!==0 && <ShootLine from={enemyShootLine[0]} to={enemyShootLine[1]} cursor={cursor}/>}
      
      {
        selectedCell && 
        hoveredCell && 
        <ShootLine 
          from={selectedCell} 
          to={hoveredCell} 
          canShoot={selectedCell.character!.canShoot(hoveredCell, selectedCell, board)}
          cursor={cursor}
        />
      }
    </>
    
  );
};

export default BoardComponent;