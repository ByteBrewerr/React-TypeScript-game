<<<<<<< HEAD
import React, {FC} from 'react'
import Teams from '../enums/Teams.enum'
import Character from '../models/characters/Character';


interface ArmyCountBarProps {
    armyCount: number
    team: Teams
    size: number
}

const ArmyCountBar: FC<ArmyCountBarProps> = ({armyCount, team, size}) => {
    return (
        <div className={`${team === Teams.Player ? 'bg-green-500' : 'bg-red-700'} text-[${size}px]  rounded-sm px-[10px]`}>
           {armyCount} 
        </div>  
    )
}

export default ArmyCountBar
=======
import React, { FC } from 'react';
import Teams from '../enums/Teams.enum';

interface ArmyCountBarProps {
  armyCount: number;
  team: Teams;
}

const ArmyCountBar: FC<ArmyCountBarProps> = ({ armyCount, team}) => {
  return (
    <div className={`relative`}>
      <div className={`${team === Teams.Player ? 'bg-sky-900' : 'bg-slate-500'} rounded-sm px-[10px] text-[10px] font-bold absolute bottom-0 right-0 text-white`}>
        {armyCount}
      </div>
    </div>
  );
}

export default ArmyCountBar;
>>>>>>> reseted
