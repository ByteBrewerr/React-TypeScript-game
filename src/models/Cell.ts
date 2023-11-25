import bg from '@/assets/floor.jpg'
import Rock from './Rock'
import Character from './characters/Character'

class Cell {
  readonly row: number
  readonly col: number
  bg: typeof bg
  obstacle: Rock | null
  character: Character | null

  constructor(row: number, col: number) {
    this.row = row
    this.col = col
    this.bg = bg
    this.obstacle = null
    this.character = null
  }
  
  public isEmpty(): boolean{
    if(this.character || this.obstacle){
      return false
    }
    return true
  }

  public setCharacter(character: Character): void {
    this.character = character
  }

  public removeCharacter(): void {
    this.character = null
  }
  public setRock(obstacle: Rock): void {
    this.obstacle = obstacle
  }

}

export default Cell