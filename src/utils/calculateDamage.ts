// Импорт модели клетки
import Cell from "@models/Cell";

// Функция для расчета урона при атаке
export default function calculateDamage(target: Cell, attacker: Cell) {
  const attackerCharacter = attacker.character!;
  const targetCharacter = target.character!;

  const isAttackMoreThanDefence = targetCharacter.defence < attackerCharacter.assault;

  // Расчет урона для одного юнита
  const oneUnitDamage =
    attackerCharacter.minDamage === attackerCharacter.maxDamage
      ? attackerCharacter.minDamage
      : parseFloat(
          (Math.random() * (attackerCharacter.maxDamage - attackerCharacter.minDamage) + attackerCharacter.minDamage).toFixed(1),
        );

  let totalDamage;

  // Расчет общего урона в зависимости от соотношения атаки и защиты
  if (isAttackMoreThanDefence) {
    totalDamage = Math.round(
      oneUnitDamage * attackerCharacter.count * ((attackerCharacter.assault - targetCharacter.defence) * 0.05 + 1),
    );
  } else {
    totalDamage = Math.round(
      (oneUnitDamage * attackerCharacter.count) / ((targetCharacter.defence - attackerCharacter.assault) * 0.05 + 1),
    );
  }

  return {
    totalDamage,
  };
}
