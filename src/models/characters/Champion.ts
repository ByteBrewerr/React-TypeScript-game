import Teams from '../../enums/Teams.enum'
import logo from './../../assets/characters/champion.png'
import Character from './Character'
import Names from '../../enums/Name.enum'
import Board from '../Board'
import Cell from '../Cell'
import Action from '../../interfaces/Action'

export default class Champion extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Knight

    this.assault = 16
    this.defence = 16
    this.minDamage = 20
    this.maxDamage = 25
    this.initiative = 12
    this.health = 100
    this.speed = 8
    this.shooting = null
    
  }
 
}

