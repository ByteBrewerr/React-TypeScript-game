import Teams from '@enums/Teams.enum'
import logo from '@assets/characters/phoenix.png'
import Character from '@models/characters/Character'
import Names from '@enums/Name.enum'

export default class Phoenix extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Phoenix
    this.level = 7
    this.assault = 21
    this.defence = 18
    this.minDamage = 30
    this.maxDamage = 40
    this.initiative = 21 
    this.health = 200
    this.maxHealth = 200
    this.speed = 10
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

