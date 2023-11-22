import Teams from '../../../enums/Teams.enum'
import logo from './../../../assets/characters/crusader.png'
import Character from '../Character'
import Names from '../../../enums/Name.enum'

export default class Crusader extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Crusader
    this.level = 4
    this.strength = 588
    this.assault = 12
    this.defence = 12
    this.minDamage = 14
    this.maxDamage = 20
    this.initiative = 6
    this.health = 35
    this.maxHealth = 35
    this.speed = 5
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

