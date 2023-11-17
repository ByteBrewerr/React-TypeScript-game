import Teams from '../../../enums/Teams.enum'
import logo from './../../../assets/characters/vampire.png'
import Character from '../Character'
import Names from '../../../enums/Name.enum'

export default class Vampire extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Vampire

    this.assault = 10
    this.defence = 10
    this.minDamage = 5
    this.maxDamage = 8
    this.initiative = 9 
    this.health = 40
    this.maxHealth = 40
    this.speed = 8
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

