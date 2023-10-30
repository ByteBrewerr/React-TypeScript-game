import Teams from '../../enums/Teams.enum'
import logo from './../../assets/characters/archer.png'
import Character from './Character'
import Names from '../../enums/Name.enum'
import Board from '../Board'
import Cell from '../Cell'
import Action from '../../interfaces/Action'

export default class Archer extends Character {
  
  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Archer

    this.assault = 4
    this.defence = 4
    this.minDamage = 2
    this.maxDamage = 8
    this.initiative = 8
    this.health = 11
    this.speed = 4
    this.shooting = 12 
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
 


  
}

