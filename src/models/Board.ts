import Cell from './Cell'
import Teams from '../enums/Teams.enum'
import Archer from './characters/Archer'
import Rock from './Rock'
import Character from './characters/Character'
import Champion from './characters/Champion'
import Names from '../enums/Name.enum'
import Spearman from './characters/Spearman'

class Board {
  sizeX: number
  sizeY: number
  cells: Cell[][] = []
  queue: Character[] = []

  constructor(sizeX: number, sizeY: number) {
    this.sizeX = sizeX
    this.sizeY = sizeY
  }

  public init(): void {
    for (let row = 0; row < this.sizeY; row++) {
      let cellsRow: Cell[] = [];
      for (let col = 0; col < this.sizeX; col++) {
        const cell = new Cell(row, col);
        cellsRow.push(cell);
      }
      this.cells.push(cellsRow);
    }
  }

  public buildQueue(){
    const allPieces = this.getAllPositions()
    const allCharacters = allPieces.map((piece)=>piece.character!)
    allCharacters.sort((a, b) => {
      if (a.initiative === b.initiative) {
        if (a.team === Teams.Player) return -1;
        if (b.team === Teams.Player) return 1;
        return 0;
      } else {
        return b.initiative - a.initiative;
      }
    });
    this.queue = allCharacters
  }
  
  public addCharacters(){
    this.addKnight(6,9, Teams.Player, 50)
    this.addArcher(6,11, Teams.Player, 50)
    this.addSpearman(6,10, Teams.Computer, 900)
    
  }
  public addObstacles(){
    this.addRock(5,5)
    this.addRock(5,1)
    this.addRock(4,4)
    this.addRock(3,6)
    this.addRock(2,2)
    this.addRock(2,1)

  }



  public copyBoard(oldBoard: Board){
    this.init()
    this.addObstacles()
    for (let row = 0; row < this.sizeY; row++) {
      for (let col = 0; col < this.sizeX; col++) {
        const oldCell = oldBoard.cells[row][col];
        if (oldCell.character) {
          const team = oldCell.character.team;
          const count = oldCell.character.count;
          if (oldCell.character.name == Names.Archer) {    
            this.addArcher(row, col, team, count);
          } else if (oldCell.character.name == Names.Knight) {
            this.addKnight(row, col, team, count);
          } else if (oldCell.character.name == Names.Spearman) {
            this.addSpearman(row, col, team, count);
          } 
        }
      }
    }
    
    
    
  }
  
 

  private addRock(row: number, col: number): void {
    const cell = this.cells[row][col]
    cell.setRock(new Rock())
    
  }
  

  private addArcher(row: number, col: number, team: Teams, count: number): void {
    const cell = this.cells[row][col]
    cell.setCharacter(new Archer(team, count))
  }
  private addKnight(row: number, col: number, team: Teams, count: number): void {
    const cell = this.cells[row][col]
    cell.setCharacter(new Champion(team, count))
  }

  private addSpearman(row: number, col: number, team: Teams, count: number): void {
    const cell = this.cells[row][col]
    cell.setCharacter(new Spearman(team, count))
  }

  public getPlayerPositions(){
    let positions: Cell[] = []
    for (let row=0; row<this.sizeY; row++) { 
      for (let col=0; col<this.sizeX; col++) {
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
    for (let row=0; row<this.sizeY; row++) { 
      for (let col=0; col<this.sizeX; col++) {
        const character = this.cells[row][col].character
        if(character?.team === Teams.Computer){
          positions.push(this.cells[row][col])
        }
      }  
    } 
    
    return positions
  }
  public getAllPositions(){
    const computerPieces = this.getComputerPositions()
    const playerPieces = this.getPlayerPositions()

    const allPieces = []
    for(const piece of playerPieces){
      allPieces.push(piece)
    }
    for(const piece of computerPieces){
      allPieces.push(piece)
    }
    return allPieces
  }
  
}

export default Board