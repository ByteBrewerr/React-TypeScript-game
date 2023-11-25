import Teams from '@enums/Teams.enum'
import logo from '@assets/characters/skeleton.png'
import Character from '../Character'
import Names from '@enums/Name.enum'

export default class Skeleton extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Skeleton
    this.level = 1
    this.strength = 85
    this.assault = 6
    this.defence = 6
    this.minDamage = 1
    this.maxDamage = 3
    this.initiative = 5
    this.health = 6
    this.maxHealth = 6
    this.speed = 4
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

