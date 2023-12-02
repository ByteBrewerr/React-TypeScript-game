import Cell from "@models/Cell"

export default function calculateDamage(target: Cell, attacker: Cell){
    const attackerCharacter = attacker.character!
    const targerCharacter = target.character!
    const isAttackMoreThenDefence = targerCharacter.defence < attackerCharacter.assault

    const oneUnitDamage = attackerCharacter.minDamage===attackerCharacter.maxDamage 
    ? 
    attackerCharacter.minDamage 
    : 
    parseFloat((Math.random() * (attackerCharacter.maxDamage - attackerCharacter.minDamage) + attackerCharacter.minDamage).toFixed(1))

    let totalDamage
    if(isAttackMoreThenDefence){
      totalDamage = Math.round(oneUnitDamage * attackerCharacter.count * ((attackerCharacter.assault - targerCharacter.defence) * 0.05 + 1));
    }else{
      totalDamage = Math.round(oneUnitDamage * attackerCharacter.count / ((targerCharacter.defence - attackerCharacter.assault) * 0.05 + 1));
    }
    return {
      totalDamage, 
      minDamage: calculateMinDamage(target, attacker, isAttackMoreThenDefence), 
      maxDamage: calculateMaxDamage(target, attacker, isAttackMoreThenDefence)
    }
}

function calculateMinDamage(target: Cell, attacker: Cell, isAttackHigher: boolean): number{
  const attackerCharacter = attacker.character!
  const targerCharacter = target.character!

  if(isAttackHigher){
    return  Math.round(attackerCharacter.minDamage * attackerCharacter.count * ((attackerCharacter.assault - targerCharacter.defence) * 0.05 + 1));
  }else{
    return Math.round(attackerCharacter.minDamage * attackerCharacter.count / ((targerCharacter.defence - attackerCharacter.assault) * 0.05 + 1));
  }
}


function calculateMaxDamage(target: Cell, attacker: Cell, isAttackHigher: boolean): number{
  const attackerCharacter = attacker.character!
  const targerCharacter = target.character!

  if(isAttackHigher){
    return  Math.round(attackerCharacter.maxDamage * attackerCharacter.count * ((attackerCharacter.assault - targerCharacter.defence) * 0.05 + 1));
  }else{
    return Math.round(attackerCharacter.maxDamage * attackerCharacter.count / ((targerCharacter.defence - attackerCharacter.assault) * 0.05 + 1));
  }
}