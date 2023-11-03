import Teams from '../../enums/Teams.enum'
import logo from './../../assets/characters/archer.png'
import Character from './Character'
import Names from '../../enums/Name.enum'
import Board from '../Board'
import Cell from '../Cell'
import Action from '../../interfaces/Action'

export default class Archer extends Character {
  
  constructor(team: Teams, count: number, isCounterAttackPossible: boolean) {
    super(team, count, isCounterAttackPossible)
    this.logo = logo
    this.name = Names.Archer

    this.assault = 6
    this.defence = 3
    this.minDamage = 4
    this.maxDamage = 6
    this.initiative = 6
    this.health = 10
    this.speed = 6
    this.shooting = true
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = isCounterAttackPossible
    this.isCounterAttackPerformed = false;
  }
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
    if (super.canAttack(target, attackFrom, moveFrom, board)){
      return true
    }
    return false
  }
 


  
}

