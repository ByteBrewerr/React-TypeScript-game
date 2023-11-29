import Teams from '@enums/Teams.enum';
import Character from '@models/characters/Character';
import { makeAutoObservable } from 'mobx';


class GameSetupStore {
  playerCharacters: Character[] = []
  computerCharacters: Character[] = []
  valueToSpend: number = 1_000_000
  maxValueToSpend: number = 1_000_000
  FIXED_VALUE_TO_SPEND: number = 1_000_000
  pickOrder: Teams[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  
  setPlayerCharactes = (characters: Character[])=>{
    this.playerCharacters = characters
  }

  setValueToSpend = (value: number, unitStrength: number)=>{
    this.valueToSpend = this.maxValueToSpend - (unitStrength * value)
  }

  setMaxValueToSpend = (value: number)=>{
    this.maxValueToSpend = value
  }
  setPickOrder = (order: Teams[]) =>{
    this.pickOrder = order
  }

}

export default new GameSetupStore();