import Cell from "@models/Cell";
import calculateDamage from "./calculateDamage";

export default function calculateUnitsTolose(target: Cell, attacker: Cell): { totalDamage: number, unitsToLose: number, remainingDamage: number } {
    const targetCharacter = target.character!
    const attackerCharacter = attacker.character!
    const totalDamage = calculateDamage(target, attacker);
    const damagePerUnit = Math.min(totalDamage, targetCharacter.count * targetCharacter.maxHealth);
  
    const unitsToLose = totalDamage < attackerCharacter.health 
    ? 
    0 
    : 
    Math.floor(damagePerUnit / targetCharacter.maxHealth);

    const remainingDamage = damagePerUnit % targetCharacter.maxHealth;
    
    return { totalDamage, unitsToLose, remainingDamage };
  }