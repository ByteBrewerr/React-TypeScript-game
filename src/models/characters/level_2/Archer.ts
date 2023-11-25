import Teams from '@enums/Teams.enum'
import logo from '@assets/characters/archer.png'
import Character from '@models/characters/Character'
import Names from '@enums/Name.enum'
import Board from '@models/Board'
import Cell from '@models/Cell'
import Action from '@interfaces/Action'

export default class Archer extends Character {
  
  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Archer
    this.level = 2
    this.strength = 184
    this.assault = 6
    this.defence = 3
    this.minDamage = 4
    this.maxDamage = 6
    this.initiative = 6
    this.health = 10
    this.maxHealth = 10
    this.speed = 4
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

