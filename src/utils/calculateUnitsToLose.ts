import Cell from "@models/Cell";
import calculateDamage from "./calculateDamage";

export default function calculateUnitsTolose(target: Cell, attacker: Cell) {
  const targetCharacter = target.character!;
  const attackerCharacter = attacker.character!;
  const { totalDamage } = calculateDamage(target, attacker);

  const avgDamagePerUnit = Math.min(totalDamage, targetCharacter.count * targetCharacter.maxHealth);

  const averageUnitsToLose =
    totalDamage < attackerCharacter.health ? 0 : Math.floor(avgDamagePerUnit / targetCharacter.maxHealth);

  const remainingDamage = avgDamagePerUnit % targetCharacter.maxHealth;

  return { totalDamage, averageUnitsToLose, remainingDamage };
}
