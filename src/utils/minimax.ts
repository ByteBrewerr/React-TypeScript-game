import React from 'react';
import Board from '../models/Board';
import Teams from '../enums/Teams.enum';
import Cell from '../models/Cell';
import Character from '../models/characters/Character';
import Action from '../interfaces/Action';
import updateTurnQueueCount from './turnQueueUtils/turnQueueCountUpdater';
import updateTurnQueue from './turnQueueUtils/turnQueueUpdater';

function minimax(board: Board, depth: number, isMaximizingPlayer: boolean, alpha: number, beta: number, queue: Character[]) {

  const winner = isWinner(board); 
  if (depth === 0 || winner) { 
    return { bestScore: evalBoardPosition(board) };
  }

  if (isMaximizingPlayer) {
    let bestMove;
    let bestScore = -Infinity;
    const queueCharacter = queue[0]
    const queueCharacterCell = board.getAllPositions().find(
      (position) =>
        queueCharacter.team === position.character?.team &&
        queueCharacter.name === position.character?.name
    );

    if(queueCharacter && queueCharacterCell){
      const possibleMoves: Action[] = queueCharacterCell.character!.possibleMoves(board, queueCharacterCell);
      for (const move of possibleMoves) {
        const boardCopy = new Board(12,10);
        boardCopy.copyBoard(board);
        const copyCharacter = boardCopy.cells[queueCharacterCell.row][queueCharacterCell.col].character!
        if (move.actionName === 'shoot') {
          copyCharacter.shoot(move.to, move.from, boardCopy);
        }
        if (move.actionName === 'attack') {
          copyCharacter.attack(move.to, move.from, queueCharacterCell, boardCopy);
        }
        if (move.actionName === 'move') {
          if((possibleMoves.some((move)=>(move.actionName == 'attack' || move.actionName === 'shoot')))) continue
          copyCharacter.move(move.to, move.from, boardCopy);
        }
        const updatedQueueCount = updateTurnQueueCount(queue, boardCopy)
        const updatedQueue = updateTurnQueue(updatedQueueCount);

        const isMaximizingPlayerNext = updatedQueue[0].team === Teams.Player
        let result = minimax(boardCopy, depth - 1, isMaximizingPlayerNext, alpha, beta, updatedQueue ); 
        let score = result.bestScore;
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
        alpha = Math.max(alpha, score)       
        if (beta <= alpha) {
          break; 
        }
      
      }
    }
    
    return { bestScore, bestMove };
  } else {  
    let bestScore = Infinity;
    let bestMove;
    const queueCharacter = queue[0]
    const queueCharacterCell = board.getAllPositions().find(
      (position) =>
        queueCharacter.team === position.character?.team &&
        queueCharacter.name === position.character?.name
    );
    if (queueCharacterCell) {
      const possibleMoves: Action[] = queueCharacterCell.character!.possibleMoves(board, queueCharacterCell);
      for (const move of possibleMoves) {
        const boardCopy = new Board(12,10);
        boardCopy.copyBoard(board);
        const copyCharacter = boardCopy.cells[queueCharacterCell.row][queueCharacterCell.col].character!
        if (move.actionName === 'shoot') {
          copyCharacter.shoot(move.to, move.from, boardCopy);
        }
        if (move.actionName === 'attack' ) {
          copyCharacter.attack(move.to, move.from, queueCharacterCell, boardCopy);
        }
        if (move.actionName === 'move' ) { 
          if((possibleMoves.some((move)=>(move.actionName == 'attack' || move.actionName === 'shoot')))) continue
          
          copyCharacter.move(move.to, move.from, boardCopy);
        }
        const updatedQueueCount = updateTurnQueueCount(queue, boardCopy)
        const updatedQueue = updateTurnQueue(updatedQueueCount);
        const isMaximizingPlayerNext = updatedQueue[0].team === Teams.Player
        
        let result = minimax(boardCopy, depth - 1, isMaximizingPlayerNext, alpha, beta, updatedQueue); 
        
        let score = result.bestScore;

        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
        
        beta = Math.min(beta, score);
        if (beta <= alpha) {
          break; 
        }
        
      }
    }
  
    return { bestScore, bestMove};
  }
}

function evalBoardPosition(board: Board) {
  let playerTotalStrength: number = 0;
  let enemyTotalStrength: number = 0;
  for (let row = 0; row < board.sizeY; row++) {
    for (let col = 0; col < board.sizeX; col++) {
      const character = board.cells[row][col].character;
      if (character && character.team === Teams.Computer) {
        enemyTotalStrength += (character.strength * character.count);
      }
      if (character && character.team === Teams.Player) {
        playerTotalStrength += (character.strength * character.count);
      }
    }
  }
  
  return playerTotalStrength - enemyTotalStrength;
}

function isWinner(board: Board) {
  let playerTotalCount: number = 0;
  let enemyTotalCount: number = 0;
  for (let row = 0; row < board.sizeY; row++) {
    for (let col = 0; col < board.sizeX; col++) {
      const character = board.cells[row][col].character;
      if (character && character.team === Teams.Computer) {
        enemyTotalCount = enemyTotalCount + character.count;
      }
      if (character && character.team === Teams.Player) {
        playerTotalCount = playerTotalCount + character.count;
      }
    }
  }
  if(playerTotalCount === 0) return Teams.Computer
  if(enemyTotalCount === 0) return Teams.Player

  return undefined
}



export default minimax;