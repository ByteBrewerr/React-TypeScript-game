import Cell from './Cell'
import Teams from '../enums/Teams.enum'
import Terrorist from './characters/Terrorist'

class Board {
  size: number
  cells: Cell[][] = []

  constructor(size: number) {
    this.size = size
  }

  public init(): void {
    for (let row = 0; row < this.size; row++) {
      let cellsRow: Cell[] = []
      for (let col = 0; col < this.size; col++) {
        const cell = new Cell(row, col)
        cellsRow.push(cell)
      }
      this.cells.push(cellsRow)
    }
    
  }
  public addCharacters(){
    this.addTerrorist(3,4)
    this.addTerrorist(3,5)
  }

  private addTerrorist(row: number, col: number): void {
    const cell = this.cells[row][col]
    cell.setCharacter(new Terrorist(Teams.Player))
  }
}

export default Board