import Teams from '@enums/Teams.enum'
import logo from '@assets/characters/magmaElemental.png'
import Character from '@models/characters/Character'
import Names from '@enums/Name.enum'

export default class MagmaElemental extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.MagmaElemental
    this.level = 5
    this.strength = 490
    this.assault = 11
    this.defence = 11
    this.minDamage = 6
    this.maxDamage = 10
    this.initiative = 6
    this.health = 40
    this.maxHealth = 40
    this.speed = 5
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

