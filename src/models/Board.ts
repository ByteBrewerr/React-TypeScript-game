import Cell from './Cell'
import Teams from '../enums/Teams.enum'
import Terrorist from './characters/Terrorist'
import Rock from './Rock'
import Character from './characters/Character'

class Board {
  size: number
  cells: Cell[][] = []

  constructor() {
    this.size = 8
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
    this.addTerrorist(7,1, Teams.Player, 110)
    this.addTerrorist(7,2, Teams.Player, 110)
    this.addTerrorist(7,6, Teams.Player, 110)
    this.addTerrorist(0,6, Teams.Computer, 110)
    this.addTerrorist(0,1, Teams.Computer, 110)
    this.addTerrorist(0,2, Teams.Computer, 110)
  }
  public addObstacles(){
    this.addRock(5,5)
    this.addRock(5,1)
    this.addRock(4,4)
    this.addRock(3,6)
    this.addRock(2,2)
    this.addRock(2,1)

  }

  public copyMovedBoard(oldBoard: Board,  moveTo: Cell,   moveFrom: Cell){
    this.init()
    this.addObstacles()

    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const oldCell = oldBoard.cells[row][col];
        if (oldCell.character && !(moveFrom.row === row && moveFrom.col === col)) {
          const team = oldCell.character.team;
          const health = oldCell.character.health;
          this.addTerrorist(row, col, team, health)
        }
       
        if(row===moveTo.row && col === moveTo.col && moveFrom && moveFrom.character){
          const team = moveFrom.character.team;
          const health = moveFrom.character.health;
          this.addTerrorist(moveTo.row, moveTo.col, team, health); 
        }
        
      }
    }
    
    
    
  }
  public copyShootedBoard(oldBoard: Board, shootTo: Cell, shootFrom: Cell){
    this.init()
    this.addObstacles()
    const shootedCharacter = this.cells[shootTo.row][shootTo.col]
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const oldCell = oldBoard.cells[row][col];
        if (oldCell.character) {
          const team = oldCell.character.team;
          const health = oldCell.character.health;
          this.addTerrorist(row, col, team, health)
          if(row === shootTo.row && col === shootTo.col && shootFrom.character){
            shootFrom.character.shoot(shootedCharacter) 
          }
        }
      }
    }
  }
 

  private addRock(row: number, col: number): void {
    const cell = this.cells[row][col]
    cell.setRock(new Rock())
    
  }
  

  private addTerrorist(row: number, col: number, team: Teams, health: number): void {
    const cell = this.cells[row][col]
    cell.setCharacter(new Terrorist(team, health))
  }
  public getPlayerPositions(){
    let positions: Cell[] = []
    for (let row=0; row<this.size; row++) { 
      for (let col=0; col<this.size; col++) {
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
    for (let row=0; row<this.size; row++) { 
      for (let col=0; col<this.size; col++) {
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