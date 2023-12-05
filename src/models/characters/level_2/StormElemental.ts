import Teams from "@enums/Teams.enum";
import logo from "@assets/characters/stormElemental.png";
import Character from "@models/characters/Character";
import Names from "@enums/Name.enum";
import Action from "@interfaces/Action";
import Board from "@models/Board";
import Cell from "@models/Cell";

export default class StormElemental extends Character {
  constructor(team: Teams, count: number) {
    super(team, count);
    this.logo = logo;
    this.name = Names.StormElemental;
    this.level = 2;
    this.strength = 486;
    this.assault = 9;
    this.defence = 9;
    this.minDamage = 2;
    this.maxDamage = 8;
    this.initiative = 8;
    this.health = 25;
    this.maxHealth = 25;
    this.speed = 7;
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
