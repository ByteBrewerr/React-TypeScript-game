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