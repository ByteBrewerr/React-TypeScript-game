import Cell from "@models/Cell";

// Функция для получения деталей при наведении на вражескую ячейку
export default function detailsOnHoverEnemy(target: Cell, attacker: Cell) {
  const attackerCharacter = attacker.character!;
  const targetCharacter = target.character!;

  // Проверка, превосходит ли атака защиту цели
  const isAttackMoreThanDefence = targetCharacter.defence < attackerCharacter.assault;

  // Расчет минимального и максимального урона
  const minDamage = calculateMinDamage(target, attacker, isAttackMoreThanDefence);
  const maxDamage = calculateMaxDamage(target, attacker, isAttackMoreThanDefence);

  // Расчет урона на одну единицу
  const minDamagePerUnit = Math.min(minDamage, targetCharacter.count * targetCharacter.maxHealth);
  const maxDamagePerUnit = Math.min(maxDamage, targetCharacter.count * targetCharacter.maxHealth);

  // Расчет минимального и максимального количества потерянных юнитов
  let minUnitsToLose = minDamage < attackerCharacter.health ? 0 : Math.floor(minDamagePerUnit / targetCharacter.maxHealth);
  let maxUnitsToLose = maxDamage < attackerCharacter.health ? 0 : Math.floor(maxDamagePerUnit / targetCharacter.maxHealth);

  // Коррекция количества потерянных юнитов, если урон превышает здоровье цели
  if (maxDamage > targetCharacter.health) maxUnitsToLose += 1;
  if (minDamage > targetCharacter.health) minUnitsToLose += 1;

  // Возвращение объекта с деталями
  return {
    minDamage,
    maxDamage,
    minUnitsToLose,
    maxUnitsToLose,
  };
}

// Вспомогательная функция для расчета минимального урона
function calculateMinDamage(target: Cell, attacker: Cell, isAttackHigher: boolean): number {
  const attackerCharacter = attacker.character!;
  const targerCharacter = target.character!;

  if (isAttackHigher) {
    return Math.round(
      attackerCharacter.minDamage * attackerCharacter.count * ((attackerCharacter.assault - targerCharacter.defence) * 0.05 + 1),
    );
  } else {
    return Math.round(
      (attackerCharacter.minDamage * attackerCharacter.count) /
        ((targerCharacter.defence - attackerCharacter.assault) * 0.05 + 1),
    );
  }
}

// Вспомогательная функция для расчета максимального урона
function calculateMaxDamage(target: Cell, attacker: Cell, isAttackHigher: boolean): number {
  const attackerCharacter = attacker.character!;
  const targerCharacter = target.character!;

  if (isAttackHigher) {
    return Math.round(
      attackerCharacter.maxDamage * attackerCharacter.count * ((attackerCharacter.assault - targerCharacter.defence) * 0.05 + 1),
    );
  } else {
    return Math.round(
      (attackerCharacter.maxDamage * attackerCharacter.count) /
        ((targerCharacter.defence - attackerCharacter.assault) * 0.05 + 1),
    );
  }
}
