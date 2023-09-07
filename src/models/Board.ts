import Cell from './Cell'
import Teams from '../enums/Teams.enum'
import Terrorist from './characters/Terrorist'
import Rock from './Rock'
import Character from './characters/Character'

class Board {
  size: number
  cells: Cell[][] = []

  constructor(size: number) {
    this.size = size
  }

  public init(): void {
    for (let row = 0; row < this.size; row++) {
      let cellsRow: Cell[] = [];
      for (let col = 0; col < this.size; col++) {
        const cell = new Cell(row, col);
        cellsRow.push(cell);
      }
      this.cells.push(cellsRow);
    }
  }
  public addCharacters(){
    this.addTerrorist(8,8, Teams.Player)
    this.addTerrorist(8,4, Teams.Player)
    this.addTerrorist(1,8, Teams.Computer)
    this.addTerrorist(1,6, Teams.Computer)
  }
  public addObstacles(){
    this.addRock(5,5)
    this.addRock(3,2)
    this.addRock(6,3)
    this.addRock(1,3)
    this.addRock(8,5)
    this.addRock(7,2)
    this.addRock(2,3)
    this.addRock(5,5)
    this.addRock(6,6)
  }
  public addChangedCharacter(row: number, col: number, team: Teams, health: number){
    this.addMovedTerrorist(row, col, team, health)
  }
  public addShootedCharacter(row: number, col: number, team: Teams, health: number ){
    this.addShootedTerrorist(row, col, team, health)
  }
  private addMovedTerrorist(row: number, col: number, team: Teams, health: number): void {
    const cell = this.cells[row][col]
    const terrorist = new Terrorist( team)
    terrorist.health = health
    cell.setCharacter(terrorist)
  }
  private addShootedTerrorist(row: number, col: number, team: Teams, health: number): void {
    const cell = this.cells[row][col]
    const terrorist = new Terrorist(team)
    terrorist.health = health - 10
    if(terrorist.health <=0){
      cell.removeCharacter()
    }else{
      cell.setCharacter(terrorist)
    }
    
  }
  public copy(oldBoard: Board,  moveTo?: Cell, moveFrom?: Cell, action?: string, shootTo?: Cell){
    this.init()
    this.addObstacles()
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const oldCell = oldBoard.cells[row][col];
        if (oldCell.character && !(row === moveFrom?.row && col === moveFrom.col)) {
          const team = oldCell.character.team;
          const health = oldCell.character.health;
          if(action && action === 'shoot' && row === shootTo?.row && col === shootTo.col){
            this.addShootedCharacter(row, col, team, health); 
          }else{
            this.addChangedCharacter(row, col, team, health)
          }
          
        
        }
        if(row===moveTo?.row && col === moveTo.col && moveFrom && moveFrom.character){
          const team = moveFrom.character.team;
          const health = moveFrom.character.health;
          this.addChangedCharacter(moveTo.row, moveTo.col, team, health); 
        }
      }
    }
  }
 

  private addRock(row: number, col: number): void {
    const cell = this.cells[row][col]
    cell.setRock(new Rock())
    
  }
  

  private addTerrorist(row: number, col: number, team: Teams): void {
    const cell = this.cells[row][col]
    cell.setCharacter(new Terrorist(team))
  }
  public getPlayerPositions(){
    let positions: Cell[] = []
    for (let row=0; row<10; row++) { 
      for (let col=0; col<10; col++) {
        const character = this.cells[row][col].character
        if(character?.team === Teams.Player){
          positions.push(this.cells[row][col])
        }
      }  
    } 
    return positions
  }
  public getComputerPositions(){
    let positions: Cell[] = []
    for (let row=0; row<10; row++) { 
      for (let col=0; col<10; col++) {
        const character = this.cells[row][col].character
        if(character?.team === Teams.Computer){
          positions.push(this.cells[row][col])
        }
      }  
    } 
    return positions
  }
  
}

export default Board