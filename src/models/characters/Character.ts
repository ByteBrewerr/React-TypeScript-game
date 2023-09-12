import Teams from "../../enums/Teams.enum"
import Names from "../../enums/Name.enum"
import floor from '../../assets/floor.jpg'
import Board from "../Board"
import Cell from "../Cell"
import Action from "../../interfaces/Action"

export default class Character {
  team: Teams
  name: Names
  logo: typeof floor | null
  health: number
  
  constructor(team: Teams) {
    this.team = team
    this.name = Names.Character
    this.logo = null
    this.health = 100
  }

  public canMove(target: Cell, from: Cell): boolean {
    if (target.character) return false
    if (target.obstacle) return false
    else return true
  }

  public move(target: Cell, from: Cell):void{   
    if(this.canMove(target, from)){
      from.removeCharacter()
      target.setCharacter(this)  
    }
  }

  public shoot(target: Cell): void{
    const character = target.character
    if(character && character.team !== this.team){
      character.health-=10
      if(character.health<=0){
        target.removeCharacter()
      } 
    }
    
  }
 //public undoShoot(): void{
    //this.health = this.health + 10
  //}

  public canShoot(target: Cell, from: Cell, board: Board): boolean {
    if (!target.character || target.character.team === this.team) {
      return false;
    }
  
    let startCol = from.col;
    let startRow = from.row;
    const endX = target.col;
    const endY = target.row;
  
    const dx = Math.abs(endX - startCol);
    const dy = Math.abs(endY - startRow);
    const sx = startCol < endX ? 1 : -1;
    const sy = startRow < endY ? 1 : -1;
  
    let err = dx - dy;
  
    while (startCol !== endX || startRow !== endY) {
      const cell = board.cells[startRow][startCol];

      if (cell.obstacle) {
        return false;
      }
  
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        startCol += sx;
      }
      if (e2 < dx) {
        err += dx;
        startRow += sy;
      }
    }
  
    return true;
  }
 
  public possibleMoves(board: Board, from: Cell): Action[]{
    return [{actionName: 'nothing', from, to: board.cells[from.row][from.col]}]
  }
  
}