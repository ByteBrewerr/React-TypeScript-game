import Cell from "@models/Cell";

export default function detailsOnHoverEnemy(target: Cell, attacker: Cell) {
  const attackerCharacter = attacker.character!;
  const targetCharacter = target.character!;
  const isAttackMoreThenDefence =
    targetCharacter.defence < attackerCharacter.assault;

  const minDamage = calculateMinDamage(
    target,
    attacker,
    isAttackMoreThenDefence,
  );
  const maxDamage = calculateMaxDamage(
    target,
    attacker,
    isAttackMoreThenDefence,
  );

  const minDamagePerUnit = Math.min(
    minDamage,
    targetCharacter.count * targetCharacter.maxHealth,
  );
  const maxDamagePerUnit = Math.min(
    maxDamage,
    targetCharacter.count * targetCharacter.maxHealth,
  );

  const minUnitsToLose =
    minDamage < attackerCharacter.health
      ? 0
      : Math.floor(minDamagePerUnit / targetCharacter.maxHealth);

  let maxUnitsToLose =
    maxDamage < attackerCharacter.health
      ? 0
      : Math.floor(maxDamagePerUnit / targetCharacter.maxHealth);
      

  return {
    minDamage,
    maxDamage,
    minUnitsToLose,
    maxUnitsToLose,
  };
}

function calculateMinDamage(
  target: Cell,
  attacker: Cell,
  isAttackHigher: boolean,
): number {
  const attackerCharacter = attacker.character!;
  const targerCharacter = target.character!;

  if (isAttackHigher) {
    return Math.round(
      attackerCharacter.minDamage *
        attackerCharacter.count *
        ((attackerCharacter.assault - targerCharacter.defence) * 0.05 + 1),
    );
  } else {
    return Math.round(
      (attackerCharacter.minDamage * attackerCharacter.count) /
        ((targerCharacter.defence - attackerCharacter.assault) * 0.05 + 1),
    );
  }
}

function calculateMaxDamage(
  target: Cell,
  attacker: Cell,
  isAttackHigher: boolean,
): number {
  const attackerCharacter = attacker.character!;
  const targerCharacter = target.character!;

  if (isAttackHigher) {
    return Math.round(
      attackerCharacter.maxDamage *
        attackerCharacter.count *
        ((attackerCharacter.assault - targerCharacter.defence) * 0.05 + 1),
    );
  } else {
    return Math.round(
      (attackerCharacter.maxDamage * attackerCharacter.count) /
        ((targerCharacter.defence - attackerCharacter.assault) * 0.05 + 1),
    );
  }
}
