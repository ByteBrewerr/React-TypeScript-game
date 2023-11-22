import Teams from '../../../enums/Teams.enum'
import logo from './../../../assets/characters/fairy.png'
import Character from '../Character'
import Names from '../../../enums/Name.enum'

export default class Fairy extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Fairy
    this.level = 1
    this.assault = 2
    this.defence = 2
    this.minDamage = 1
    this.maxDamage = 3
    this.initiative = 9 
    this.health = 3
    this.maxHealth = 3
    this.speed = 8
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

