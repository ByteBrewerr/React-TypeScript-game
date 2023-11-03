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


function App() {
  const [board, setBoard] = useState<Board>(()=>makeBoard());
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
      <BoardComponent board={board} setBoard={setBoard} currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} handleEndTurn={handleEndTurn} queue={queue}/>
      <TurnQueue currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} queue={queue}/>
    </div>
  );
}

export default App;