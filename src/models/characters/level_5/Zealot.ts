import Teams from "@enums/Teams.enum";
import logo from "@assets/characters/zealot.png";
import Character from "@models/characters/Character";
import Names from "@enums/Name.enum";
import Action from "@interfaces/Action";
import Board from "@models/Board";
import Cell from "@models/Cell";
import RangeCharacter from "../RangeCharacter";

export default class Zealot extends RangeCharacter {
  constructor(team: Teams, count: number) {
    super(team, count);
    this.logo = logo;
    this.name = Names.Zealot;
    this.level = 5;
    this.strength = 750;
    this.assault = 12;
    this.defence = 10;
    this.minDamage = 10;
    this.maxDamage = 12;
    this.initiative = 7;
    this.health = 30;
    this.maxHealth = 30;
    this.speed = 5;
    this.shooting = true;
    this.isPerformingCounterAttack = false;
    this.isCounterAttackPossible = true;
  }

  public possibleMoves(board: Board, from: Cell): Action[] {
    const possibleMoves = super.possibleMoves(board, from);
    const characterPositions =
      this.team === Teams.Computer
        ? board.getPlayerPositions()
        : board.getComputerPositions();

    for (let position of characterPositions) {
      if (
        super.canShoot(position, from, board) &&
        !super.isEnemyNear(from, board)
      ) {
        possibleMoves.push({ actionName: "shoot", from, to: position });
      }
    }
    return possibleMoves;
  }
  public canAttack(
    target: Cell,
    attackFrom: Cell,
    moveFrom: Cell,
    board: Board,
  ): boolean {
    if (
      super.canAttack(target, attackFrom, moveFrom, board) &&
      !this.isEnemyNear(attackFrom, board)
    )
      return false;
    if (super.canAttack(target, attackFrom, moveFrom, board)) return true;

    return false;
  }
}
