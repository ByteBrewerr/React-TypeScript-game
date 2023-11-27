import Cell from './Cell'
import Teams from '@enums/Teams.enum'
import Archer from './characters/level_2/Archer'
import Rock from './Rock'
import Character from './characters/Character'
import Champion from './characters/level_6/Champion'
import Spearman from './characters/level_1/Spearman'
import characterClasses from "./characters/CharacterClasses";
import Fairy from './characters/level_1/Fairy'
import Zealot from './characters/level_5/Zealot'
import Archangel from './characters/level_7/Archangel'
import Griffin from './characters/level_3/Griffin'
import Crusader from './characters/level_4/Crusader'
import Skeleton from './characters/level_1/Skeleton'
import Zombie from './characters/level_2/Zombie'
import Lich from './characters/level_5/Lich'
import Wrath from './characters/level_3/Wrath'
import BoneDragon from './characters/level_7/BoneDragon'
import BlackKnight from './characters/level_6/BlackKnight'
import Vampire from './characters/level_4/Vampire'

class Board {
  readonly sizeX: number
  readonly sizeY: number
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

 public getThisBoardCell(cell: Cell): Cell{
    return this.cells[cell.row][cell.col]
 } 
  public addCharacters(){
    this.addCharacter(1,0, new Champion(Teams.Player, 47))
    this.addCharacter(2,0, new Archer(Teams.Player, 543))
    this.addCharacter(5,0, new Spearman(Teams.Player, 869))
    this.addCharacter(7,0, new Zealot(Teams.Player, 133))
    this.addCharacter(8,0, new Archangel(Teams.Player, 11))
    this.addCharacter(9,0, new Griffin(Teams.Player, 204))
    this.addCharacter(3,0, new Crusader(Teams.Player, 170))
    this.addCharacter(1,11, new Skeleton(Teams.Computer, 1376))
    this.addCharacter(2,11, new Zombie(Teams.Computer, 881))
    this.addCharacter(3,11, new Lich(Teams.Computer, 135))
    this.addCharacter(5,11, new Wrath(Teams.Computer, 357))
    this.addCharacter(6,11, new BoneDragon(Teams.Computer, 27))
    this.addCharacter(7,11, new BlackKnight(Teams.Computer, 51))
    this.addCharacter(9,11, new Vampire(Teams.Computer, 147))
    // this.addCharacter(1,0, new Champion(Teams.Computer, 47))
    // this.addCharacter(2,0, new Archer(Teams.Computer, 543))
    // this.addCharacter(5,0, new Spearman(Teams.Computer, 869))
    // this.addCharacter(7,0, new Zealot(Teams.Computer, 133))
    // this.addCharacter(8,0, new Archangel(Teams.Computer, 11))
    // this.addCharacter(9,0, new Griffin(Teams.Computer, 204))
    // this.addCharacter(3,0, new Crusader(Teams.Computer, 170))
    // this.addCharacter(1,11, new Skeleton(Teams.Player, 1176))
    // this.addCharacter(2,11, new Zombie(Teams.Player, 781))
    // this.addCharacter(3,11, new Lich(Teams.Player, 95))
    // this.addCharacter(5,11, new Wrath(Teams.Player, 317))
    // this.addCharacter(6,11, new BoneDragon(Teams.Player, 21))
    // this.addCharacter(7,11, new BlackKnight(Teams.Player, 41))
    // this.addCharacter(9,11, new Vampire(Teams.Player, 127))
  }
  public addObstacles(){
    this.addRock(5,5)
    this.addRock(5,1)
    this.addRock(4,4)
    this.addRock(3,6)
    this.addRock(2,2)
    this.addRock(2,1)

  }

  private addCharacter(row: number, col: number, character: Character) {
    const cell = this.cells[row][col];
    cell.setCharacter(character);
  }

  static copyCharacter(oldCharacter: Character): Character {
    const CharacterClass = characterClasses[oldCharacter.name];
    if (CharacterClass) {
      const newCharacter = new CharacterClass(oldCharacter.team, oldCharacter.count);
      newCharacter.isCounterAttackPossible = oldCharacter.isCounterAttackPossible;
      newCharacter.health = oldCharacter.health;
      return newCharacter;
    } else {
      throw new Error("Invalid character name");
    }
  }

  public copyBoard(oldBoard: Board) {
    this.init();
    this.addObstacles();

    for (let row = 0; row < this.sizeY; row++) {
      for (let col = 0; col < this.sizeX; col++) {
        const oldCell = oldBoard.cells[row][col];
        if (oldCell.character) {
          const newCharacter = Board.copyCharacter(oldCell.character);
          this.addCharacter(row, col, newCharacter);
        }
      }
    }
    
    
    
  }
  
 

  private addRock(row: number, col: number): void {
    const cell = this.cells[row][col]
    cell.setRock(new Rock())
    
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