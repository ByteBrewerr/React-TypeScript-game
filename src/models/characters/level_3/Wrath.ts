import Teams from '../../../enums/Teams.enum'
import logo from './../../../assets/characters/wrath.png'
import Character from '../Character'
import Names from '../../../enums/Name.enum'

export default class Wrath extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Wrath
    this.level = 3
    this.strength = 315
    this.assault = 7
    this.defence = 7
    this.minDamage = 3
    this.maxDamage = 5
    this.initiative = 7 
    this.health = 18
    this.maxHealth = 18
    this.speed = 5
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

