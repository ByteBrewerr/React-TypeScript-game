import React from 'react';
import Board from '../models/Board';
import Teams from '../enums/Teams.enum';
import Cell from '../models/Cell';
import Action from '../interfaces/Action';

function minimax(board: Board, depth: number, isMaximizingPlayer: boolean, alpha: number, beta: number) {
    if (depth === 0) { 
      return { score: evalBoardPosition(board) };
    }
    if (isMaximizingPlayer) {
        let bestActions
        const computerPositions = board.getComputerPositions();
        const playerPositions = board.getPlayerPositions();
        let bestScore = -Infinity;
        for (let playerPosition of playerPositions) {
          if (playerPosition.character) {
            const possibleMoves: Action[] = playerPosition.character.possibleMoves(board, playerPosition);

            for (let action of possibleMoves) {
              const newFirstActionBoard = new Board()
              let secondPossibleMoves: Action[] = [action]
              if(action.actionName === 'move'){
                newFirstActionBoard.copyMovedBoard(board, action.to, action.from)
                secondPossibleMoves = playerPosition.character.possibleMoves(newFirstActionBoard, action.to);
              }
              if(action.actionName === 'shoot'){
                newFirstActionBoard.copyShootedBoard(board, action.to, action.from)   
                secondPossibleMoves = playerPosition.character.possibleMoves(newFirstActionBoard, action.from);   
              }

              for(let secondAction of secondPossibleMoves){
                const newSecondActionBoard = new Board()
                if(action.actionName === 'move'){
                  newSecondActionBoard.copyMovedBoard(newFirstActionBoard, secondAction.to, secondAction.from)
                }
                if(action.actionName === 'shoot'){
                  newSecondActionBoard.copyShootedBoard(newFirstActionBoard, secondAction.to, secondAction.from)      
                }
                let result = minimax(newSecondActionBoard, depth - 1, false, alpha, beta); 
                let score = result.score;
                alpha = Math.max(alpha, score);
                if (beta <= alpha) {
                    break; 
                }
                if (score > bestScore) {
                  bestScore = score;
                  bestActions = {firstAction: action, secondAction: secondAction}
                }
              }
              
              
            }
          }
         
        }
        return { score: bestScore, bestActions };
      } else {  
        let bestScore = Infinity;
        let bestActions;
        const computerPositions = board.getComputerPositions();
        //const playerPositions = board.getPlayerPositions(); 

        for (let computerPosition of computerPositions) {
          if (computerPosition.character) {
            const possibleMoves: Action[] = computerPosition.character.possibleMoves(board, computerPosition);
            console.log(possibleMoves)
            for (let action of possibleMoves) {
              const newFirstActionBoard = new Board()
              let secondPossibleMoves: Action[] = [action]
              if(action.actionName === 'move'){
                newFirstActionBoard.copyMovedBoard(board, action.to, action.from)
                secondPossibleMoves= computerPosition.character.possibleMoves(newFirstActionBoard, action.to);
              }
              if(action.actionName === 'shoot'){
                newFirstActionBoard.copyShootedBoard(board, action.to, action.from)      
                secondPossibleMoves = computerPosition.character.possibleMoves(newFirstActionBoard, action.from);
              }
              for(let secondAction of secondPossibleMoves){
                const newSecondActionBoard = new Board()
                if(action.actionName === 'move'){
                  newSecondActionBoard.copyMovedBoard(newFirstActionBoard, secondAction.to, secondAction.from)
                }
                if(action.actionName === 'shoot'){
                  newSecondActionBoard.copyShootedBoard(newFirstActionBoard, secondAction.to, secondAction.from)      
                }
                let result = minimax(newSecondActionBoard, depth - 1, false, alpha, beta); 
                let score = result.score;
                beta = Math.min(beta, score);
                if (beta <= alpha) {
                    break; 
                }
                if (score < bestScore) {
                  bestScore = score;
                  bestActions = {firstAction: action, secondAction: secondAction}
                }
              }
              
            }
          }
          
        }
        return { score: bestScore, bestActions};
    }
}

const evalBoardPosition = (board: Board) => {
  
  let playerTotalHealth: number = 0;
  let enemyTotalHealth: number = 0;
  for (let row = 0; row < board.size; row++) {
      for (let col = 0; col < board.size; col++) {
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