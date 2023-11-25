import Teams from '@enums/Teams.enum'
import logo from '@assets/characters/magicElemental.png'
import Character from '@models/characters/Character'
import Names from '@enums/Name.enum'

export default class MagicElemental extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.MagicElemental
    this.level = 6
    this.assault = 15
    this.defence = 13
    this.minDamage = 15
    this.maxDamage = 25
    this.initiative = 9 
    this.health = 80
    this.maxHealth = 80
    this.speed = 8
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

