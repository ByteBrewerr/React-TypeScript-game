import Cell from "@models/Cell";
import calculateDamage from "./calculateDamage";

export default function calculateUnitsTolose(target: Cell, attacker: Cell) {
  const targetCharacter = target.character!
  const attackerCharacter = attacker.character!
  const {totalDamage, minDamage, maxDamage} = calculateDamage(target, attacker);

  const avgDamagePerUnit = Math.min(totalDamage, targetCharacter.count * targetCharacter.maxHealth);
  const minDamagePerUnit = Math.min(minDamage, targetCharacter.count * targetCharacter.maxHealth);
  const maxDamagePerUnit = Math.min(maxDamage, targetCharacter.count * targetCharacter.maxHealth);

  const averageUnitsToLose = totalDamage < attackerCharacter.health 
  ? 0 
  : Math.floor(avgDamagePerUnit / targetCharacter.maxHealth);
  
  const minUnitsToLose = minDamage < attackerCharacter.health 
  ? 0 
  : Math.floor(minDamagePerUnit / targetCharacter.maxHealth);


  const maxUnitsToLose = maxDamage < attackerCharacter.health 
  ? 0 
  : Math.floor(maxDamagePerUnit / targetCharacter.maxHealth);



  const remainingDamage = avgDamagePerUnit % targetCharacter.maxHealth;
  
  return { totalDamage, minDamage, maxDamage, averageUnitsToLose, minUnitsToLose, maxUnitsToLose, remainingDamage };
}

