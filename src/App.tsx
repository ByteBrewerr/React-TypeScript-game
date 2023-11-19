import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
import Board from './models/Board';
import BoardComponent from './components/BoardComponent';
import Teams from './enums/Teams.enum';
import TurnQueue from './components/TurnQueue';
import Character from './models/characters/Character';
import turnQueueUpdater from './utils/turnQueueUtils/turnQueueUpdater';
import makeBoard from './utils/makeBoard';
import turnQueueCountUpdater from './utils/turnQueueUtils/turnQueueCountUpdater';
import GameManipulator from './components/GameManipulator';
import { GridProvider } from './contexts/GridProvider';


function App() {
  const [board, setBoard] = useState<Board>(()=>makeBoard());
  const [queue, setQueue] =  useState<Character[]>(()=>buildQueue())
  const [currentTurn, setCurrentTurn] = useState<Teams>(queue[0].team);
  

  function buildQueue(): Character[] {
  if (!board) return [];

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
  
  function handleEndTurn() {
    if(queue.length===1){
      alert('the game ended')
    }
    setQueue((prevQueue) => {
      const updatedQueue = turnQueueUpdater(prevQueue)
      const updaetdQueueCount = turnQueueCountUpdater(updatedQueue, board)
      return updaetdQueueCount
    });
  
    const nextCharacter = queue[1];
  
    if (nextCharacter.team === Teams.Player) {
      setCurrentTurn(Teams.Player);
    } else {
      setCurrentTurn(Teams.Computer);
    }
  }
 
  return (
    <div className="App cursor-default w-[100%] h-[100vh] flex flex-col justify-center items-center bg-sky-600">
      <div className='flex'>
        <GridProvider>
          <BoardComponent board={board} setBoard={setBoard} currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} handleEndTurn={handleEndTurn} queue={queue}/>
          <GameManipulator/>
        </GridProvider>
      </div>  
      <TurnQueue queue={queue}/>
    </div>
  );
}

export default App;