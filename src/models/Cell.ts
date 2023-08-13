import bg from '../assets/floor.jpg'
import Character from './characters/Character'

class Cell {
  row: number
  col: number
  bg: typeof bg
  isSelected : boolean
  character: Character | null

  constructor(row: number, col: number) {
    this.row = row
    this.col = col
    this.bg = bg
    this.isSelected = false
    this.character = null
  }

  public setCharacter(character: Character): void {
    this.character = character
  }

  public removeCharacter(): void {
    this.character = null
  }
}

export default Cell