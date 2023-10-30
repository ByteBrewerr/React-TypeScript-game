import Teams from '../../enums/Teams.enum'
import logo from './../../assets/characters/spearman.png'
import Character from './Character'
import Names from '../../enums/Name.enum'


export default class Spearman extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Spearman

    this.assault = 6
    this.defence = 5
    this.minDamage = 2
    this.maxDamage = 3
    this.initiative = 1
    this.health = 10
    this.speed = 5
    this.shooting = null
    
  }
 
}

