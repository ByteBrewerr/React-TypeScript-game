// Импорт необходимых библиотек и компонентов
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import turnQueueUpdater from "@utils/turnQueueUtils/turnQueueUpdater";
import BoardSidebar from "@components/board_sidebar/BoardSidebar";
import BoardComponent from "@components/game_field/BoardComponent";
import TurnQueue from "@components/turn_queue/TurnQueue";
import { GridProvider } from "@contexts/GridProvider";
import Teams from "@enums/Teams.enum";
import Board from "@models/Board";
import Character from "@models/characters/Character";
import turnQueueCountUpdater from "@utils/turnQueueUtils/turnQueueCountUpdater";
import GameSetupStore from "@stores/GameSetupStore";
import { HoveredEnemyDamageProvider } from "@contexts/HoveredEnemyDamage";
import WinnerComponent from "@components/game_field/WinnerComponent";

// Определение интерфейса для свойств компонента Game
const Game: FC = () => {
  const navigate = useNavigate();

  const { playerCharacters, computerCharacters } = GameSetupStore;

  const [board, setBoard] = useState<Board>(() => makeBoard());
  const [queue, setQueue] = useState<Character[]>(() => buildQueue());
  const [currentTurn, setCurrentTurn] = useState<Teams | null>(queue[0] ? queue[0].team : null);

  // Получение сохраненной доски из sessionStorage при монтировании компонента
  const localBoard = sessionStorage.getItem("board");

  // Эффект для проверки, что игрок имеет персонажей и доска существует
  useEffect(() => {
    if (playerCharacters.length === 0 && localBoard === null) {
      navigate("/");
    }
  }, [playerCharacters, navigate]);

  // Эффект для сохранения состояния доски и очереди ходов в sessionStorage
  useEffect(() => {
    sessionStorage.setItem("board", JSON.stringify(board));
    sessionStorage.setItem("queue", JSON.stringify(queue));
  }, [queue]);

  // Функция для создания или восстановления состояния доски
  function makeBoard(): Board {
    const newBoard = new Board(12, 10);
    const localBoard = sessionStorage.getItem("board");

    if (localBoard !== null) {
      const parsedBoard = JSON.parse(localBoard);
      newBoard.copyBoard(parsedBoard);
    } else {
      newBoard.init();
      newBoard.addCharacters(playerCharacters, computerCharacters);
      newBoard.addObstacles();
    }

    return newBoard;
  }

  // Функция для установки нового состояния доски
  function setNewBoard(board: Board) {
    setBoard(board);
  }

  // Функция для создания или восстановления очереди ходов
  function buildQueue(): Character[] {
    if (!board) return [];

    const localQueue = sessionStorage.getItem("queue");

    if (localQueue !== null) {
      const parsedQueue = JSON.parse(localQueue);
      return parsedQueue;
    }

    const computerPieces = board.getComputerPositions();
    const playerPieces = board.getPlayerPositions();

    const allPieces = [...playerPieces, ...computerPieces].map((piece) => piece.character!);

    allPieces.sort((a, b) => {
      if (a.initiative === b.initiative) {
        return Math.random() - 0.5;
      } else {
        return b.initiative - a.initiative;
      }
    });

    return allPieces;
  }

  // Обработчик завершения хода
  function handleEndTurn() {
    if (queue.length === 1) {
      alert("The game is ended");
    }
    setQueue((prevQueue) => {
      const updatedQueue = turnQueueUpdater(prevQueue);
      const updatedQueueCount = turnQueueCountUpdater(updatedQueue, board!);
      return updatedQueueCount;
    });

    const nextCharacter = queue[1];

    if (nextCharacter.team === Teams.Player) {
      setCurrentTurn(Teams.Player);
    } else {
      setCurrentTurn(Teams.Computer);
    }
  }

  // Функция для отображения компонента WinnerComponent в случае победы
  const renderWinner = () => {
    const winner = board.isWinner();
    return <WinnerComponent winner={winner} />;
  };

  // Функция для отображения компонентов доски и очереди ходов
  const renderBoard = () => {
    if (board === null) {
      return null;
    }
    return (
      <>
        <div className="flex mt-4">
          <HoveredEnemyDamageProvider>
            <GridProvider>
              <BoardComponent
                board={board}
                setNewBoard={setNewBoard}
                currentTurn={currentTurn!}
                handleEndTurn={handleEndTurn}
                queue={queue}
              />

              <BoardSidebar />
            </GridProvider>
          </HoveredEnemyDamageProvider>
        </div>

        <TurnQueue queue={queue} />
      </>
    );
  };

  // Проверка, что доска существует
  if (board === null) {
    return null;
  }

  return (
    <div className="App cursor-default w-full h-full flex flex-col items-center animated-background">
      {board.isWinner() ? renderWinner() : renderBoard()}
    </div>
  );
};

export default Game;
