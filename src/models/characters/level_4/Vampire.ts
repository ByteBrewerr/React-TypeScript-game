import Teams from '@enums/Teams.enum'
import logo from '@assets/characters/vampire.png'
import Character from '@models/characters/Character'
import Names from '@enums/Name.enum'

export default class Vampire extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Vampire
    this.level = 4
    this.strength = 783
    this.assault = 10
    this.defence = 10
    this.minDamage = 5
    this.maxDamage = 8
    this.initiative = 9 
    this.health = 40
    this.maxHealth = 40
    this.speed = 6
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

