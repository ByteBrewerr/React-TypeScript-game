import Teams from "@enums/Teams.enum"
import Names from "@enums/Name.enum"
import floor from '@assets/floor.jpg'
import Board from "@models/Board"
import Cell from "@models/Cell"
import Action from "@interfaces/Action"
import calculateUnitsToLose from "@utils/calculateUnitsToLose"
import Character from "./Character"

export default class RangeCharacter extends Character{
  

  public possibleMoves(board: Board, from: Cell): Action[] {
    const possibleMoves = super.possibleMoves(board, from)
    const characterPositions = this.team===Teams.Computer ? board.getPlayerPositions() : board.getComputerPositions()

    for(let position of characterPositions){
      if(super.canShoot(position, from, board) && !(super.isEnemyNear(from, board))){
        possibleMoves.push({actionName: 'shoot', from, to: position})
      }
    }
    return possibleMoves
   
  }
  public canAttack(target: Cell, attackFrom: Cell, moveFrom: Cell, board: Board): boolean {
    if (super.canAttack(target, attackFrom, moveFrom, board) && !(this.isEnemyNear(attackFrom, board))) return false
    if (super.canAttack(target, attackFrom, moveFrom, board)) return true
    
    return false
  }
  
  
  
}