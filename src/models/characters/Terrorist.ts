import Teams from '../../enums/Teams.enum'
import logo from './../../assets/terrorist.png'
import Character from './Character'
import Names from '../../enums/Name.enum'
import Board from '../Board'
import Cell from '../Cell'
import Action from '../../interfaces/Action'

export default class Terrorist extends Character {
  
  constructor(team: Teams, health: number) {
    super(team)
    this.logo = logo
    this.health = health
    this.name = Names.Terrorist
    
  }
  public canMove(target: Cell, from: Cell): boolean {
    if(!super.canMove(target, from)){
      return false
    }
    if(target.row + 1 === from.row && target.col === from.col){ // down
      return true
    }
    if(target.row - 1 === from.row && target.col === from.col){ // up
      return true
    }
    if(target.row  === from.row && target.col - 1 === from.col){ // left
      return true
    }
    if(target.row  === from.row && target.col + 1 === from.col){ // right
      return true
    }
    else{
      return false
    }
  }
  public possibleMoves(board: Board, from: Cell): Action[] {
    let moves: Action[] = []
    if (from.row < 7 && this.canMove(board.cells[from.row+1][from.col], from)){
      moves.push({actionName: 'move', from, to: board.cells[from.row+1][from.col]})
    }
    if (from.row > 0 && this.canMove(board.cells[from.row-1][from.col], from)){
      moves.push({actionName: 'move', from, to: board.cells[from.row-1][from.col]})
    }
    if (from.col < 7  && this.canMove(board.cells[from.row][from.col+1], from)){
      moves.push({actionName: 'move', from, to: board.cells[from.row][from.col+1]})
    }
    if (from.col > 0 && this.canMove(board.cells[from.row][from.col-1], from)){
      moves.push({actionName: 'move', from, to: board.cells[from.row][from.col-1]})
    }
    for (let row = 0; row < board.size; row++) {
      for (let col = 0; col < board.size; col++) {
        const cellToShoot = board.cells[row][col]
        if(cellToShoot.character && this.canShoot(cellToShoot, from, board)){
          moves.push({actionName: 'shoot', from, to: cellToShoot})
        }
      }
  } 

    return moves
  }

}