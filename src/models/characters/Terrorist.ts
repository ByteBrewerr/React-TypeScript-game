import Teams from '../../enums/Teams.enum'
import logo from './../../assets/terrorist.png'
import Character from './Character'
import Names from '../../enums/Name.enum'

export default class Terrorist extends Character {
  
  constructor(team: Teams) {
    super(team)
    this.logo = logo
    this.name = Names.Terrorist
    
  }
}