import React from 'react';
import Board from '../models/Board';
import Teams from '../enums/Teams.enum';
import Cell from '../models/Cell';

function minimax(board: Board, depth: number, isMaximizingPlayer: boolean, alpha: number, beta: number) {
    if (depth === 0) { 
      return { score: evalBoardPosition(board) };
    }
    if (isMaximizingPlayer) {
        let bestMoveTo;
        let action;
        let bestMoveFrom
        const computerPositions = board.getComputerPositions();
        const playerPositions = board.getPlayerPositions();
        let bestScore = -Infinity;
        for (let playerPosition of playerPositions) {
          if (playerPosition.character) {
            const possibleMoves: Cell[] = playerPosition.character.possibleMoves(board, playerPosition);

            for (let move of possibleMoves) {
              const newBoard = new Board(10)
              newBoard.copy(board, move, playerPosition, 'move')
              let count = 0
              for (let row = 0; row < 10; row++) {
                for (let col = 0; col < 10; col++) {
                    if (board.cells[row][col].character){
                      count= count + 1
                    }
                    
                }
              }
              //console.log(count)
              for (let computerPosition of computerPositions) {
                if (playerPosition.character?.canShoot(computerPosition, move, newBoard)) {
                  const shootBoard = new Board(10)
                  shootBoard.copy(newBoard, undefined, undefined, 'shoot', computerPosition)
                  let result = minimax(shootBoard, depth - 1, false, alpha, beta); 
                  let score = result.score;
                  if (score > bestScore) {
                    bestScore = score;
                    bestMoveTo = move
                    bestMoveFrom = playerPosition
                  }
                  alpha = Math.max(alpha, bestScore);
                  if (beta <= alpha) {
                      break; // Отсечение
                  }
                   
                } else {
                  let result = minimax(newBoard, depth - 1, false, alpha, beta); 
                  let score = result.score;
                  if (score > bestScore) {
                    bestScore = score
                    bestMoveTo = move
                    bestMoveFrom = playerPosition           
                  }   
                  alpha = Math.max(alpha, bestScore);
                  if (beta <= alpha) {
                      break; // Отсечение
                  }
                }
                
              }
            }
          }
         
        }
        return { score: bestScore, bestMoveTo, bestMoveFrom, action, };
      } else {  
        let bestScore = Infinity;
        let bestMoveTo;
        let action;
        let bestMoveFrom;
        const computerPositions = board.getComputerPositions();
        
        const playerPositions = board.getPlayerPositions(); 
        for (let computerPosition of computerPositions) {
          if (computerPosition.character) {
            const possibleMoves: Cell[] = computerPosition.character.possibleMoves(board, computerPosition);
            for (let move of possibleMoves) {
              const newBoard = new Board(10)
              newBoard.copy(board, move, computerPosition, 'move')
          
              for (let playerPosition of playerPositions) {
                if (computerPosition.character?.canShoot(playerPosition, move, newBoard)) {
                  const shootBoard = new Board(10)
                  shootBoard.copy(newBoard, undefined, undefined, 'shoot', playerPosition)

                  let result = minimax(shootBoard, depth - 1, true, alpha, beta); 
                  let score = result.score;
                  if (score < bestScore) {
                    bestScore = score;
                    bestMoveTo = move
                    bestMoveFrom = computerPosition
                    action = {type: 'shoot', target: playerPosition};
                  }  
                  if (beta <= alpha) {
                    break; // Отсечение
                }
                } else { 
                  let result = minimax(newBoard, depth - 1, true, alpha, beta); 
                  let score = result.score;
                  if (score < bestScore) {
                    bestScore = score
                    bestMoveTo = move
                    bestMoveFrom = computerPosition
                    action = {type: 'skip'};
                  }  
                  beta = Math.min(beta, bestScore);
                  if (beta <= alpha) {
                      break; // Отсечение
                  } 
                }
                
              }
            }
          }
          
        }
        return { score: bestScore, bestMoveTo, bestMoveFrom, action,};
    }
}

const evalBoardPosition = (board: Board) => {
  
  let playerTotalHealth: number = 0;
  let enemyTotalHealth: number = 0;
  for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
          const character = board.cells[row][col].character;
          if (character && character.team === Teams.Computer) {
            enemyTotalHealth = enemyTotalHealth + character.health;
          }
          if (character && character.team === Teams.Player) {
            playerTotalHealth = playerTotalHealth + character.health;
          }
      }
  }
  return playerTotalHealth - enemyTotalHealth;
}

export default minimax;