import Cell from "@models/Cell";

export default function calculateDamage(target: Cell, attacker: Cell) {
  const attackerCharacter = attacker.character!;
  const targetCharacter = target.character!;
  const isAttackMoreThenDefence = targetCharacter.defence < attackerCharacter.assault;

  const oneUnitDamage =
    attackerCharacter.minDamage === attackerCharacter.maxDamage
      ? attackerCharacter.minDamage
      : parseFloat(
          (Math.random() * (attackerCharacter.maxDamage - attackerCharacter.minDamage) + attackerCharacter.minDamage).toFixed(1),
        );

  let totalDamage;
  if (isAttackMoreThenDefence) {
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
