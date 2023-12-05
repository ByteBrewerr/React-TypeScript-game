import Cell from "./Cell";
import Teams from "@enums/Teams.enum";
import Archer from "./characters/level_2/Archer";
import Rock from "./Rock";
import Character from "./characters/Character";
import Champion from "./characters/level_6/Champion";
import Spearman from "./characters/level_1/Spearman";
import characterClasses from "./characters/CharacterClasses";
import Fairy from "./characters/level_1/Fairy";
import Zealot from "./characters/level_5/Zealot";
import Archangel from "./characters/level_7/Archangel";
import Griffin from "./characters/level_3/Griffin";
import Crusader from "./characters/level_4/Crusader";
import Skeleton from "./characters/level_1/Skeleton";
import Zombie from "./characters/level_2/Zombie";
import Lich from "./characters/level_5/Lich";
import Wrath from "./characters/level_3/Wrath";
import BoneDragon from "./characters/level_7/BoneDragon";
import BlackKnight from "./characters/level_6/BlackKnight";
import Vampire from "./characters/level_4/Vampire";

class Board {
  readonly sizeX: number;
  readonly sizeY: number;
  cells: Cell[][] = [];
  queue: Character[] = [];

  constructor(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
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

  public isWinner(): Teams | undefined {
    if (this.getComputerPositions().length === 0) {
      return Teams.Player;
    }
    if (this.getPlayerPositions().length === 0) {
      return Teams.Computer;
    }
  }

  public getThisBoardCell(cell: Cell): Cell {
    return this.cells[cell.row][cell.col];
  }

  public addCharacters(
    playerCharacters: Character[],
    computerCharacters: Character[],
  ) {
    let playerEmptyPlaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let computerEmptyPlaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let character of playerCharacters) {
      character.team = Teams.Player;
      const randomIndex = Math.floor(Math.random() * playerEmptyPlaces.length);
      const randomPlace = playerEmptyPlaces[randomIndex];
      this.addCharacter(randomPlace, 0, character);
      playerEmptyPlaces.splice(randomIndex, 1);
    }

    for (let character of computerCharacters) {
      character.team = Teams.Computer;
      const randomIndex = Math.floor(
        Math.random() * computerEmptyPlaces.length,
      );
      const randomPlace = computerEmptyPlaces[randomIndex];
      this.addCharacter(randomPlace, 11, character);
      computerEmptyPlaces.splice(randomIndex, 1);
    }
  }
  public addObstacles(): void {
    let rocks: { row: number; col: number }[] = [];

    while (rocks.length < 7) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 8) + 2;

      if (row !== 0 && row !== 11 && col !== 0 && col !== 11) {
        const isDuplicated = rocks.some(
          (mountain) => mountain.row === row && mountain.col === col,
        );
        if (!isDuplicated) {
          rocks.push({ row, col });
          this.addRock(row, col);
        }
      }
    }
  }

  private addCharacter(row: number, col: number, character: Character) {
    const cell = this.cells[row][col];
    cell.setCharacter(character);
  }

  static copyCharacter(oldCharacter: Character): Character {
    const CharacterClass = characterClasses[oldCharacter.name];
    if (CharacterClass) {
      const newCharacter = new CharacterClass(
        oldCharacter.team,
        oldCharacter.count,
      );
      newCharacter.isCounterAttackPossible =
        oldCharacter.isCounterAttackPossible;
      newCharacter.health = oldCharacter.health;
      return newCharacter;
    } else {
      throw new Error("Invalid character name");
    }
  }

  public copyBoard(oldBoard: Board): void {
    this.init();

    for (let row = 0; row < this.sizeY; row++) {
      for (let col = 0; col < this.sizeX; col++) {
        const oldCell = oldBoard.cells[row][col];

        if (oldCell.obstacle) {
          this.addRock(row, col);
        }

        if (oldCell.character) {
          const newCharacter = Board.copyCharacter(oldCell.character);
          this.addCharacter(row, col, newCharacter);
        }
      }
    }
  }

  private addRock(row: number, col: number): void {
    const cell = this.cells[row][col];
    cell.setRock(new Rock());
  }

  public getPlayerPositions(): Cell[] {
    let positions: Cell[] = [];
    for (let row = 0; row < this.sizeY; row++) {
      for (let col = 0; col < this.sizeX; col++) {
        const character = this.cells[row][col].character;
        if (character?.team === Teams.Player) {
          positions.push(this.cells[row][col]);
        }
      }
    }
    return positions;
  }
  public getComputerPositions(): Cell[] {
    let positions: Cell[] = [];
    for (let row = 0; row < this.sizeY; row++) {
      for (let col = 0; col < this.sizeX; col++) {
        const character = this.cells[row][col].character;
        if (character?.team === Teams.Computer) {
          positions.push(this.cells[row][col]);
        }
      }
    }

    return positions;
  }
  public getAllPositions(): Cell[] {
    const computerPieces = this.getComputerPositions();
    const playerPieces = this.getPlayerPositions();

    const allPieces = [];
    for (const piece of playerPieces) {
      allPieces.push(piece);
    }
    for (const piece of computerPieces) {
      allPieces.push(piece);
    }
    return allPieces;
  }
}

export default Board;
