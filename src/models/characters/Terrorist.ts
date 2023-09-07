import Teams from '../../enums/Teams.enum'
import logo from './../../assets/terrorist.png'
import Character from './Character'
import Names from '../../enums/Name.enum'
import Board from '../Board'
import Cell from '../Cell'

export default class Terrorist extends Character {
  
  constructor(team: Teams) {
    super(team)
    this.logo = logo
    this.health = 110
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
  public possibleMoves(board: Board, from: Cell): Cell[] {
    let moves: Cell[] = []
    if (from.row < 9 && this.canMove(board.cells[from.row+1][from.col], from)){
      moves.push(board.cells[from.row+1][from.col])
    }
    if (from.row > 0 && this.canMove(board.cells[from.row-1][from.col], from)){
      moves.push(board.cells[from.row-1][from.col])
    }
    if (from.col < 9  && this.canMove(board.cells[from.row][from.col+1], from)){
      moves.push(board.cells[from.row][from.col+1])
    }
    if (from.col > 0 && this.canMove(board.cells[from.row][from.col-1], from)){
      moves.push(board.cells[from.row][from.col-1])
    }
    return moves
  }

}