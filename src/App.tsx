import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
import Board from './models/Board';
import BoardComponent from './components/BoardComponent';
import Teams from './enums/Teams.enum';
import TurnQueue from './components/TurnQueue';
import Character from './models/characters/Character';
import turnQueueUpdater from './utils/turnQueueUtils/turnQueueUpdater';
import makeBoard from './utils/makeBoard';
<<<<<<< HEAD
import updateTurnQueueCount from './utils/turnQueueUtils/turnQueueCountUpdater';
=======
import turnQueueCountUpdater from './utils/turnQueueUtils/turnQueueCountUpdater';
import GameManipulator from './components/GameManipulator';
import { GridProvider } from './contexts/GridProvider';
>>>>>>> reseted


function App() {
  const [board, setBoard] = useState<Board>(()=>makeBoard());
<<<<<<< HEAD
  const [currentTurn, setCurrentTurn] = useState<Teams>(Teams.Player);
  const [queue, setQueue] =  useState<Character[]>(()=>buildQueue())
  

  function buildQueue(): Character[] {
    if(!board) return []
    
    const computerPieces = board.getComputerPositions()
    const playerPieces = board.getPlayerPositions()

    const allPieces = []
    for(const piece of playerPieces){
      allPieces.push(piece.character!)
    }
    for(const piece of computerPieces){
      allPieces.push(piece.character!)
    }

    allPieces.sort((a, b) => {
      if (a.initiative === b.initiative) {
        if (a.team === Teams.Player) return -1;
        if (b.team === Teams.Player) return 1;
        return 0;
      } else {
        return b.initiative - a.initiative;
      }
    });

    return allPieces

  }
  
  function handleEndTurn() {
    setQueue((prevQueue) => {
      const updatedQueue = updateTurnQueueCount(prevQueue, board)
  
      return turnQueueUpdater(updatedQueue);
=======
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
>>>>>>> reseted
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
<<<<<<< HEAD
      <BoardComponent board={board} setBoard={setBoard} currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} handleEndTurn={handleEndTurn} queue={queue}/>
=======
      <div className='flex'>
        <GridProvider>
          <BoardComponent board={board} setBoard={setBoard} currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} handleEndTurn={handleEndTurn} queue={queue}/>
          <GameManipulator/>
        </GridProvider>
      </div>  
>>>>>>> reseted
      <TurnQueue currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} queue={queue}/>
    </div>
  );
}

export default App;