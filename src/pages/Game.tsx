import turnQueueUpdater from "@utils/turnQueueUtils/turnQueueUpdater";
import React, { FC, useEffect, useState } from "react";
import GameManipulator from "@components/board_sidebar/BoardSidebar";
import BoardComponent from "@components/game_field/BoardComponent";
import TurnQueue from "@components/turn_queue/TurnQueue";
import { GridProvider } from "@contexts/GridProvider";
import Teams from "@enums/Teams.enum";
import Board from "@models/Board";
import Character from "@models/characters/Character";
import turnQueueCountUpdater from "@utils/turnQueueUtils/turnQueueCountUpdater";
import GameSetupStore from "@stores/GameSetupStore";
import { HoveredEnemyDamageProvider } from "@contexts/HoveredEnemyDamage";

const Game: FC = () => {
  const { playerCharacters, computerCharacters } = GameSetupStore;

  const [board, setBoard] = useState<Board>(() => makeFirstBoard());
  const [queue, setQueue] = useState<Character[]>(() => buildQueue());
  const [currentTurn, setCurrentTurn] = useState<Teams>(queue[0].team);

  function makeFirstBoard(): Board {
    const newBoard = new Board(12, 10);
    newBoard.init();
    newBoard.addCharacters(playerCharacters, computerCharacters);
    newBoard.addObstacles();
    return newBoard;
  }

  function setNewBoard(board: Board) {
    setBoard(board);
  }

  function buildQueue(): Character[] {
    if (!board) return [];

    const computerPieces = board.getComputerPositions();
    const playerPieces = board.getPlayerPositions();

    const allPieces = [...playerPieces, ...computerPieces].map(
      (piece) => piece.character!,
    );

    allPieces.sort((a, b) => {
      if (a.initiative === b.initiative) {
        return Math.random() - 0.5;
      } else {
        return b.initiative - a.initiative;
      }
    });

    return allPieces;
  }

  function handleEndTurn() {
    if (queue.length === 1) {
      alert("the game is ended");
    }
    setQueue((prevQueue) => {
      const updatedQueue = turnQueueUpdater(prevQueue);
      const updaetedQueueCount = turnQueueCountUpdater(updatedQueue, board);
      return updaetedQueueCount;
    });

    const nextCharacter = queue[1];

    if (nextCharacter.team === Teams.Player) {
      setCurrentTurn(Teams.Player);
    } else {
      setCurrentTurn(Teams.Computer);
    }
  }

  return (
    <div className="App cursor-default w-full h-full flex flex-col items-center animated-background">
      <div className="flex mt-4">
        <HoveredEnemyDamageProvider>
          <GridProvider>
            <BoardComponent
              board={board}
              setNewBoard={setNewBoard}
              currentTurn={currentTurn}
              handleEndTurn={handleEndTurn}
              queue={queue}
            />
            <GameManipulator />
          </GridProvider>
        </HoveredEnemyDamageProvider>
      </div>
      <TurnQueue queue={queue} />
    </div>
  );
};

export default Game;
