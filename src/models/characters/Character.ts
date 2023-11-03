import Teams from "../../enums/Teams.enum"
import Names from "../../enums/Name.enum"
import floor from '../../assets/floor.jpg'
import Board from "../Board"
import Cell from "../Cell"
import Action from "../../interfaces/Action"
import Terrorist from "./Archer"

export default class Character {
  team: Teams
  name: Names
  logo: typeof floor | null
  count: number
  health: number
  speed: number
  assault: number // attack
  defence: number
  minDamage: number
  maxDamage: number
  initiative: number
  shooting: number | null

  
  constructor(team: Teams, count: number,  ) {
    this.team = team
    this.name = Names.Character
    this.logo = null

    this.count = count
    this.health = 0
    this.assault = 0
    this.defence = 0
    this.minDamage = 0
    this.maxDamage = 0
    this.initiative = 0
    this.speed = 0
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
  public canAttack(target: Cell, attackFrom: Cell, moveFrom: Cell, board: Board): boolean {
    const possibleMoves = this.possibleMoves(board, moveFrom)
    const canAttack = possibleMoves.some(move => move.actionName === 'attack' && move.to.row === target.row && move.to.col === target.col)
    
    return canAttack
  }

  public canShoot(target: Cell, from: Cell, board: Board): boolean {
    if(this.shooting === null) return false
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

  public isSpecificEnemyNear(specificEnemy: Cell, characterFrom: Cell, board: Board){

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
      { row: 1, col: 0 },  // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 },  // Right
    ];
  
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
  
          if (!visited.has(targetCell) && !targetCell.obstacle) {
            if (!targetCell.character) {
              possibleMoves.push({
                actionName: 'move',
                from,
                to: targetCell,
              });
              queue.push({ cell: targetCell, distance: distance + 1 });
            }
            for (let enemyPosition of enemyPositions) {
              if(this.shooting !== null && !this.isEnemyNear(from, board)) continue

              if (this.isSpecificEnemyNear(enemyPosition, targetCell, board)) {         
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

  public attack(target: Cell, attackFrom: Cell, moveFrom: Cell, board: Board): void{
    const copyCell = board.cells[target.row][target.col]
    const copyTarget = copyCell.character
    const isAttackMoreThenDefence: boolean = target.character!.defence > moveFrom.character!.assault ? false : true
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
    
  }
  
}