import Teams from '../../../enums/Teams.enum'
import logo from './../../../assets/characters/lich.png'
import Character from '../Character'
import Names from '../../../enums/Name.enum'
import Action from '../../../interfaces/Action'
import Board from '../../Board'
import Cell from '../../Cell'

export default class Lich extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Lich

    this.assault = 13
    this.defence = 10
    this.minDamage = 11
    this.maxDamage = 15
    this.initiative = 7
    this.health = 40
    this.maxHealth = 40
    this.speed = 6
    this.shooting = true
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
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
    if (super.canAttack(target, attackFrom, moveFrom, board)) return true
    
    return false
  }
 
}

