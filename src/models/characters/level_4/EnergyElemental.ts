import Teams from '../../../enums/Teams.enum'
import logo from './../../../assets/characters/energyElemental.png'
import Character from '../Character'
import Names from '../../../enums/Name.enum'

export default class EnergyElemental extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.EnergyElemental
    this.level = 4
    this.assault = 12
    this.defence = 8
    this.minDamage = 4
    this.maxDamage = 6
    this.initiative = 8 
    this.health = 35
    this.maxHealth = 35
    this.speed = 7
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

