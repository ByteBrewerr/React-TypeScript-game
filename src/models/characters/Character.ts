import Teams from "@enums/Teams.enum";
import Names from "@enums/Name.enum";
import floor from "@assets/floor.jpg";
import Board from "@models/Board";
import Cell from "@models/Cell";
import Action from "@interfaces/Action";
import calculateUnitsToLose from "@utils/calculateUnitsToLose";

export default class Character {
  team: Teams;
  name: Names;
  level: number;
  logo: typeof floor | null;
  strength: number;
  count: number;
  health: number;
  maxHealth: number;
  speed: number;
  assault: number; // attack
  defence: number;
  minDamage: number;
  maxDamage: number;
  initiative: number;
  shooting: boolean;
  isCounterAttackPossible: boolean;
  isPerformingCounterAttack: boolean;

  constructor(team: Teams, count: number) {
    this.team = team;
    this.name = Names.Character;
    this.level = 0;
    this.logo = null;
    this.strength = 0;
    this.count = count;
    this.health = 0;
    this.maxHealth = 0;
    this.assault = 0;
    this.defence = 0;
    this.minDamage = 0;
    this.maxDamage = 0;
    this.initiative = 0;
    this.speed = 0;
    this.shooting = false;
    this.isPerformingCounterAttack = false;
    this.isCounterAttackPossible = false;
  }

  public canMove(target: Cell, from: Cell, board: Board): boolean {
    const possibleMoves = this.possibleMoves(board, from);
    for (const move of possibleMoves) {
      if (move.actionName === "move" && move.to.row === target.row && move.to.col === target.col) {
        return true;
      }
    }

    return false;
  }

  public move(target: Cell, from: Cell, board: Board): void {
    if (this.canMove(target, from, board)) {
      board.cells[from.row][from.col].removeCharacter();
      board.cells[target.row][target.col].setCharacter(this);
    }
  }

  public canAttack(target: Cell, attackFrom: Cell, moveFrom: Cell, board: Board): boolean {
    if (!this.isSpecificEnemyNear(target, attackFrom, board)) {
      return false;
    }

    const possibleMoves = this.possibleMoves(board, moveFrom);
    const canAttack = possibleMoves.some(
      (move) => move.actionName === "attack" && move.to.row === target.row && move.to.col === target.col,
    );

    return canAttack;
  }

  public canShoot(target: Cell, from: Cell, board: Board): boolean {
    if (this.shooting === false) return false;
    if (this.isEnemyNear(from, board)) return false;

    return true;
  }
  public isEnemyNear(character: Cell, board: Board) {
    const characterPositions = this.team === Teams.Computer ? board.getPlayerPositions() : board.getComputerPositions();

    for (const enemy of characterPositions) {
      const distanceX = Math.abs(enemy.col - character.col);
      const distanceY = Math.abs(enemy.row - character.row);
      if (distanceX <= 1 && distanceY <= 1 && !(distanceX === 0 && distanceY === 0)) {
        return true;
      }
    }
    return false;
  }

  public isSpecificEnemyNear(specificEnemy: Cell, characterFrom: Cell, board: Board) {
    if (specificEnemy == characterFrom) return true;

    const distanceX = Math.abs(specificEnemy.col - characterFrom.col);
    const distanceY = Math.abs(specificEnemy.row - characterFrom.row);
    if (distanceX <= 1 && distanceY <= 1 && !(distanceX === 0 && distanceY === 0)) {
      return true;
    }

    return false;
  }

  public possibleMoves(board: Board, from: Cell): Action[] {
    const enemyPositions = this.team === Teams.Player ? board.getComputerPositions() : board.getPlayerPositions();

    const possibleMoves: Action[] = [];
    const visited: Set<Cell> = new Set();
    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 }, // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 }, // Right
    ];

    possibleMoves.push({
      actionName: "move",
      from,
      to: from,
    });

    for (let enemyPosition of enemyPositions) {
      if (this.shooting && !this.isEnemyNear(from, board)) continue;

      if (this.isSpecificEnemyNear(enemyPosition, from, board)) {
        possibleMoves.push({
          actionName: "attack",
          from: from,
          to: enemyPosition,
          attacker: from,
        });
      }
    }

    const queue: { cell: Cell; distance: number }[] = [];
    queue.push({ cell: from, distance: 0 });

    while (queue.length > 0) {
      const { cell, distance } = queue.shift()!;

      if (distance >= this.speed) {
        continue;
      }

      for (const direction of directions) {
        const newRow = cell.row + direction.row;
        const newCol = cell.col + direction.col;

        if (newRow >= 0 && newRow < board.sizeY && newCol >= 0 && newCol < board.sizeX) {
          const targetCell = board.cells[newRow][newCol];
          if (!visited.has(targetCell) && !targetCell.obstacle && (!targetCell.character || targetCell.character === this)) {
            possibleMoves.push({
              actionName: "move",
              from,
              to: targetCell,
            });

            queue.push({ cell: targetCell, distance: distance + 1 });
            for (let enemyPosition of enemyPositions) {
              if (this.shooting == true && !this.isEnemyNear(from, board)) continue;

              if (this.isSpecificEnemyNear(enemyPosition, targetCell, board)) {
                possibleMoves.push({
                  actionName: "attack",
                  from: targetCell,
                  to: enemyPosition,
                  attacker: from,
                });
              }
            }
            visited.add(targetCell);
          }
        }
      }
    }
    return possibleMoves;
  }

  public attack(target: Cell, attackFrom: Cell, moveFrom: Cell, board: Board): void {
    if (attackFrom != moveFrom) {
      this.move(attackFrom, moveFrom, board);
    }

    const copyTargetCell = board.getThisBoardCell(target);
    const copyTarget = copyTargetCell.character!;
    const copyAttackFrom = board.getThisBoardCell(attackFrom);

    const { unitsToLose, remainingDamage } = calculateUnitsToLose(copyTargetCell, copyAttackFrom);

    copyTarget.count -= unitsToLose;
    copyTarget.health -= remainingDamage;

    if (copyTarget.health < 0) {
      const overkill = Math.abs(copyTarget.health - remainingDamage);
      copyTarget.count -= 1;
      copyTarget.health = Math.abs(copyTarget.maxHealth - overkill);
      if (copyTarget.count <= 0) {
        copyTargetCell.removeCharacter();
      }
    }

    if (copyTarget.count <= 0) {
      copyTargetCell.removeCharacter();
    } else if (copyTarget.isCounterAttackPossible) {
      this.performCounterAttack(copyAttackFrom, copyTargetCell, board);
    }
  }

  private performCounterAttack(target: Cell, attacker: Cell, board: Board): void {
    const copyTargetCell = board.getThisBoardCell(target);
    const copyTarget = copyTargetCell.character!;
    const copyAttackFrom = board.getThisBoardCell(attacker);

    const { unitsToLose, remainingDamage } = calculateUnitsToLose(copyTargetCell, copyAttackFrom);

    copyTarget.count -= unitsToLose;
    copyTarget.health -= remainingDamage;
    if (copyTarget.count <= 0) {
      target.removeCharacter();
    }
    if (copyTarget.health < 0) {
      const overkill = Math.abs(copyTarget.health - remainingDamage);

      copyTarget.count -= 1;
      copyTarget.health = Math.abs(copyTarget.maxHealth - overkill);

      if (copyTarget.count <= 0) {
        target.removeCharacter();
      }
    }
    copyAttackFrom.character!.isCounterAttackPossible = false;
  }

  public shoot(target: Cell, from: Cell, board: Board): void {
    if (!this.canShoot(target, from, board)) return;

    const copyTargetCell = board.getThisBoardCell(target);
    const copyTarget = copyTargetCell.character!;
    const copyShootFrom = board.getThisBoardCell(from);

    const { unitsToLose, remainingDamage } = calculateUnitsToLose(copyTargetCell, copyShootFrom);

    copyTarget.count -= unitsToLose;
    copyTarget.health -= remainingDamage;
    if (copyTarget.count <= 0) {
      copyTargetCell.removeCharacter();
    }
    if (copyTarget.health < 0) {
      const overkill = Math.abs(copyTarget.health - remainingDamage);

      copyTarget.count -= 1;
      copyTarget.health = Math.abs(copyTarget.maxHealth - overkill);

      if (copyTarget.count <= 0) {
        copyTargetCell.removeCharacter();
      }
    }
  }
}
