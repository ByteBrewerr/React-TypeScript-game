import React, {FC} from 'react'
import Teams from '../enums/Teams.enum'
import Character from '../models/characters/Character';
import ArmyCountBar from './ArmyCountBar';
import Cell from '../models/Cell';

interface TurnQueueProps {
    currentTurn: Teams;
    setCurrentTurn: React.Dispatch<React.SetStateAction<Teams>>;
    queue: Character[] | []
}

const TurnQueue: FC<TurnQueueProps> = ({queue}) => {
    
  return (
    <div className='flex'>
        {queue.map((character, index)=>{
            const borderColor = `${index === 0 ? 'border-yellow-200' : 'border-gray-800'}`
            const bgColor = `${character.team === Teams.Player ? 'bg-sky-900' : 'bg-slate-500'}`

            if(character.count <=0){
                return
            }
            
            return (
                <div key={index} className={`w-[100px] h-[100px] border-2 ${borderColor} ${bgColor} m-[1px] mt-[20px] relative flex justify-center items-center `}>
                    <img src={character.logo} alt='character' className='w-[110px] h-[110px]' />
                    <div className='absolute right-0 bottom-0 text-white font-bold mr-1'>
                        {character.count}
                    </div>                 
                </div>
            )
            
        })}
    </div>  
  )
}

export default TurnQueue