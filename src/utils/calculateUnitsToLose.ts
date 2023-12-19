import Cell from "@models/Cell";
import calculateDamage from "./calculateDamage";

// Функция для расчета количества потерянных юнитов после атаки
export default function calculateUnitsToLose(target: Cell, attacker: Cell) {
  const targetCharacter = target.character!;
  const attackerCharacter = attacker.character!;

  // Расчет общего урона с использованием вспомогательной функции
  const { totalDamage } = calculateDamage(target, attacker);

  // Расчет урона на одну единицу
  const damagePerUnit = Math.min(totalDamage, targetCharacter.count * targetCharacter.maxHealth);

  // Расчет количества потерянных юнитов
  const unitsToLose = totalDamage < attackerCharacter.health ? 0 : Math.floor(damagePerUnit / targetCharacter.maxHealth);

  // Расчет оставшегося урона после целых юнитов
  const remainingDamage = damagePerUnit % targetCharacter.maxHealth;

  return { totalDamage, unitsToLose, remainingDamage };
}
