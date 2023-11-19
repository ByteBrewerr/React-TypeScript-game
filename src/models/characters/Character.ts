import Teams from "../../enums/Teams.enum"
import Names from "../../enums/Name.enum"
import floor from '../../assets/floor.jpg'
import Board from "../Board"
import Cell from "../Cell"
import Action from "../../interfaces/Action"
<<<<<<< HEAD
import Terrorist from "./Archer"
=======
import calculateDamage from "../../utils/calculateDamage"
import calculateUnitsToLose from "../../utils/calculateUnitsToLose"
>>>>>>> reseted

export default class Character {
  team: Teams
  name: Names
  logo: typeof floor | null
<<<<<<< HEAD
  count: number
  health: number
=======
  strength: number
  count: number
  health: number
  maxHealth: number
>>>>>>> reseted
  speed: number
  assault: number // attack
  defence: number
  minDamage: number
  maxDamage: number
  initiative: number
<<<<<<< HEAD
  shooting: number | null

  
  constructor(team: Teams, count: number,  ) {
    this.team = team
    this.name = Names.Character
    this.logo = null

    this.count = count
    this.health = 0
=======
  shooting: boolean
  isCounterAttackPossible: boolean
  isPerformingCounterAttack: boolean
  
  constructor(team: Teams, count: number) {
    this.team = team
    this.name = Names.Character
    this.logo = null
    this.strength = 0
    this.count = count
    this.health = 0
    this.maxHealth = 0
>>>>>>> reseted
    this.assault = 0
    this.defence = 0
    this.minDamage = 0
    this.maxDamage = 0
    this.initiative = 0
    this.speed = 0
<<<<<<< HEAD
    this.shooting = 0
  }

  public canMove(target: Cell, from: Cell, board: Board): boolean {
   
    const possibleMoves = this.possibleMoves(board, from)
    for (const move of possibleMoves) {
      if (move.actionName ==='move' &&  move.to.row === target.row && move.to.col === target.col) {
          return true;
      }
    }

    return false;
  }
  

  public move(target: Cell, from: Cell, board: Board):void{  
    if(this.canMove(target, from, board)){
      board.cells[from.row][from.col].removeCharacter()
      board.cells[target.row][target.col].setCharacter(this)
    }
  }
  public canAttack(target: Cell, from: Cell, board: Board): boolean {
    if(target.character === this) return false
    if(from.character && from.character !== this) return false
    if(!(this.isEnemyNear(from, board)) && this.shooting !== null) return false
    if(this.isEnemyNear(from, board)) return true
    return false
  }

  public canShoot(target: Cell, from: Cell, board: Board): boolean {
    if(this.shooting === null) return false
=======
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = false
  }


  public canMove(target: Cell, from: Cell, board: Board): boolean {
   
    const possibleMoves = this.possibleMoves(board, from)
    for (const move of possibleMoves) {
      if (move.actionName ==='move' &&  move.to.row === target.row && move.to.col === target.col) {
          return true;
      }
    }

    return false;
  }
  

  public move(target: Cell, from: Cell, board: Board):void{  
    
    if(this.canMove(target, from, board)){
      board.cells[from.row][from.col].removeCharacter()
      board.cells[target.row][target.col].setCharacter(this)
    }
  }
  
  public canAttack(target: Cell, attackFrom: Cell, moveFrom: Cell, board: Board): boolean {
    const possibleMoves = this.possibleMoves(board, moveFrom)
    const canAttack = possibleMoves.some(move => move.actionName === 'attack' && move.to.row === target.row && move.to.col === target.col)
    
    return canAttack
  }

  public canShoot(target: Cell, from: Cell, board: Board): boolean {
    if(this.shooting === false) return false
>>>>>>> reseted
    if(this.isEnemyNear(from, board)) return false
  
    return true;
  }
  public isEnemyNear(character: Cell, board: Board){
    const characterPositions = this.team===Teams.Computer ? board.getPlayerPositions() : board.getComputerPositions()

    for(const enemy of characterPositions){
      const distanceX = Math.abs(enemy.col - character.col);
      const distanceY = Math.abs(enemy.row - character.row);
      if (distanceX <= 1 && distanceY <= 1 && !(distanceX === 0 && distanceY === 0)) {
        return true;
      }
    }
    return false;
  }
<<<<<<< HEAD
=======

  public isSpecificEnemyNear(specificEnemy: Cell, characterFrom: Cell, board: Board){
    if(specificEnemy == characterFrom) return true

    const distanceX = Math.abs(specificEnemy.col - characterFrom.col);
    const distanceY = Math.abs(specificEnemy.row - characterFrom.row);
    if (distanceX <= 1 && distanceY <= 1 && !(distanceX === 0 && distanceY === 0)) {
      return true;
    }
    
    return false;
  }

>>>>>>> reseted
  public possibleMoves(board: Board, from: Cell): Action[] {
    const enemyPositions = this.team === Teams.Player ? board.getComputerPositions() : board.getPlayerPositions();
  
    const possibleMoves: Action[] = [];
    const visited: Set<Cell> = new Set();
    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 },  // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 },  // Right
    ];
<<<<<<< HEAD
=======

    possibleMoves.push({
      actionName: 'move',
      from,
      to: from,
    });
  
    for (let enemyPosition of enemyPositions) {
      if (this.shooting && !this.isEnemyNear(from, board)) continue;
  
      if (this.isSpecificEnemyNear(enemyPosition, from, board)) {
        possibleMoves.push({
          actionName: 'attack',
          from: from,
          to: enemyPosition,
          attacker: from,
        });
      }
    }
>>>>>>> reseted
  
    const queue: { cell: Cell, distance: number }[] = [];
    queue.push({ cell: from, distance: 0 });
  
    while (queue.length > 0) {
      const { cell, distance } = queue.shift()!;
  
      if (distance >= this.speed) {
        continue;
      }
  
      for (const direction of directions) {
        const newRow = cell.row + direction.row;
        const newCol = cell.col + direction.col;
  
        if (
          newRow >= 0 &&
          newRow < board.sizeY &&
          newCol >= 0 &&
          newCol < board.sizeX
        ) {
          const targetCell = board.cells[newRow][newCol];
<<<<<<< HEAD
  
          if (!visited.has(targetCell)) {
            if (!targetCell.obstacle && !targetCell.character) {
              possibleMoves.push({
                actionName: 'move',
                from,
                to: targetCell,
              });
              queue.push({ cell: targetCell, distance: distance + 1 });
            }
            for (let enemyPosition of enemyPositions) {
              if (this.canAttack(enemyPosition, targetCell, board) && (!this.canShoot(enemyPosition, from, board))) {         
=======
          if (!visited.has(targetCell) && !targetCell.obstacle && (!targetCell.character || targetCell.character === this)) { 
  
            possibleMoves.push({
              actionName: 'move',
              from,
              to: targetCell,
            });

            queue.push({ cell: targetCell, distance: distance + 1 }); 
            for (let enemyPosition of enemyPositions) {
              if(this.shooting == true && !this.isEnemyNear(from, board)) continue

              if (this.isSpecificEnemyNear(enemyPosition, targetCell, board)) {         
>>>>>>> reseted
                possibleMoves.push({
                  actionName: 'attack',
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

<<<<<<< HEAD
  public attack(target: Cell, attackFrom: Cell, moveFrom: Cell, board: Board): void{
    const copyCell = board.cells[target.row][target.col]
    const copyTarget = copyCell.character
    const isAttackMoreThenDefence: boolean = target.character!.defence > moveFrom.character!.assault ? false : true
    console.log(isAttackMoreThenDefence)
    const oneUnitDamage = this.minDamage===this.maxDamage ? this.minDamage : parseFloat((Math.random() * (this.maxDamage - this.minDamage) + this.minDamage).toFixed(1))

    let totalDamage
    if(isAttackMoreThenDefence){
      totalDamage = Math.round(oneUnitDamage * this.count * ((this.assault - copyTarget!.defence) * 0.05 + 1));
    }else{
      totalDamage = Math.round(oneUnitDamage * this.count / ((copyTarget!.defence - this.assault) * 0.05 + 1));
    }

    this.move(attackFrom, moveFrom, board)

    copyTarget!.count = (copyTarget!.count - Math.round(totalDamage/copyTarget!.health))

    if(copyTarget!.count<=0){
      copyCell.removeCharacter()
    }
  }

  public shoot(target: Cell, from: Cell, board: Board): void{
    if(!(this.canShoot(target, from, board))) return 

    const copyCell = board.cells[target.row][target.col]
    const copyTarget = copyCell.character
    const isAttackMoreThenDefence: boolean = copyTarget!.defence > from.character!.shooting! ? false : true
    const oneUnitDamage = this.minDamage===this.maxDamage ? this.minDamage : parseFloat((Math.random() * (this.maxDamage - this.minDamage) + this.minDamage).toFixed(1))

    let totalDamage
    if(isAttackMoreThenDefence){
      totalDamage = Math.round(oneUnitDamage * this.count * ((this.shooting! - copyTarget!.defence) * 0.05 + 1));
    }else{
      totalDamage = Math.round(oneUnitDamage * this.count / ((copyTarget!.defence - this.shooting!) * 0.05 + 1));
    }
    copyTarget!.count = (copyTarget!.count - Math.round(totalDamage/copyTarget!.health))

    if(copyTarget!.count<=0){
      copyCell.removeCharacter()
    }
    
=======

  public attack(target: Cell, attackFrom: Cell, moveFrom: Cell, board: Board): void {   
    if (attackFrom != moveFrom) {
      this.move(attackFrom, moveFrom, board);
    }
    
    const copyTargetCell = board.getThisBoardCell(target);
    const copyTarget = copyTargetCell.character!;
    const copyAttackFrom = board.getThisBoardCell(attackFrom);
  
    const {unitsToLose, remainingDamage} = calculateUnitsToLose(copyTargetCell, copyAttackFrom)
  
    copyTarget.count -= unitsToLose;
    copyTarget.health -= remainingDamage;

    if (copyTarget.health < 0) {
      const overkill = Math.abs(copyTarget.health);
      copyTarget.count -= 1;
      copyTarget.health = copyTarget.maxHealth - overkill;  
      if (copyTarget.count <= 0) {
        copyTargetCell.removeCharacter();
      } 
    }
  
    if (copyTarget.count <= 0) {
      copyTargetCell.removeCharacter();
    } else if (copyTarget.isCounterAttackPossible && !copyAttackFrom.character!.isPerformingCounterAttack) {
      this.performCounterAttack(copyAttackFrom, copyTargetCell, board);
      copyTarget.isPerformingCounterAttack = true;
    }
>>>>>>> reseted
  }
  
  private performCounterAttack(target: Cell, attacker: Cell, board: Board): void {
    const totalDamage = calculateDamage(target, attacker);
    const targetCharacter = target.character!;
    const {unitsToLose, remainingDamage} = calculateUnitsToLose(target, attacker)
  
    targetCharacter.count -= unitsToLose;
    targetCharacter.health -= remainingDamage;
    if (targetCharacter.count <= 0) {
      target.removeCharacter();
    }
    if (targetCharacter.health < 0) {
      const overkill = Math.abs(targetCharacter.health);

      targetCharacter.count -= 1;
      targetCharacter.health = targetCharacter.maxHealth - overkill;
      
      if (targetCharacter.count <= 0) {
        target.removeCharacter();
      }

    }
    attacker.character!.isCounterAttackPossible = false;
  }
  
  
  
  
  
  

  

  public shoot(target: Cell, from: Cell, board: Board): void{
    console.log(target.character?.count)
    if(!(this.canShoot(target, from, board))) return
  
    const copyTargetCell = board.getThisBoardCell(target);
    const copyTarget = copyTargetCell.character!;
    const copyShootFrom = board.getThisBoardCell(from);
  
    const {unitsToLose, remainingDamage} = calculateUnitsToLose(copyTargetCell, copyShootFrom)
  
    copyTarget.count -= unitsToLose;
    copyTarget.health -= remainingDamage;
    if (copyTarget.count <= 0) {
      copyTargetCell.removeCharacter();
    }
    if (copyTarget.health < 0) {
      const overkill = Math.abs(copyTarget.health);

      copyTarget.count -= 1;
      copyTarget.health = copyTarget.maxHealth - overkill;
      
      if (copyTarget.count <= 0) {
        copyTargetCell.removeCharacter();
      }

    }
    
  }
  
  
}