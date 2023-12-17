import Cell from "@models/Cell";
import calculateDamage from "./calculateDamage";

// Функция для расчета количества потерянных юнитов после атаки
export default function calculateUnitsToLose(target: Cell, attacker: Cell) {
  const targetCharacter = target.character!;
  const attackerCharacter = attacker.character!;

  // Расчет общего урона с использованием вспомогательной функции
  const { totalDamage } = calculateDamage(target, attacker);

  // Расчет среднего урона на одну единицу
  const avgDamagePerUnit = Math.min(totalDamage, targetCharacter.count * targetCharacter.maxHealth);

  // Расчет среднего количества потерянных юнитов
  const averageUnitsToLose =
    totalDamage < attackerCharacter.health ? 0 : Math.floor(avgDamagePerUnit / targetCharacter.maxHealth);

  // Расчет оставшегося урона после целых юнитов
  const remainingDamage = avgDamagePerUnit % targetCharacter.maxHealth;

  return { totalDamage, averageUnitsToLose, remainingDamage };
}
