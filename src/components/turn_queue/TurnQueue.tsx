import React, {FC, useState} from 'react'
import Teams from '@enums/Teams.enum'
import Character from '@models/characters/Character';
import Modal from './Modal';

interface TurnQueueProps {
    queue: Character[] | []
}

const TurnQueue: FC<TurnQueueProps> = ({queue}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [characterIndex, setCharacterIndex] = useState<number | undefined>(undefined)

    const handleModalOpen = (index: number) =>{
        setIsModalVisible(true)
        setCharacterIndex(index)
    }
     
    const handleModalClose = () =>{
        setIsModalVisible(false)
        setCharacterIndex(undefined)
    }

  return (
    <div className='flex'>
        {queue.map((character, index)=>{
            const borderColor = `${index === 0 ? 'border-yellow-200' : 'border-gray-800'}`
            const bgColor = `${character.team === Teams.Player ? 'bg-sky-900' : 'bg-slate-500'}`

            if(character.count <=0){
                return null
            }
            
            return (
                <button 
                    key={index}
                    onClick={()=>handleModalOpen(index)} 
                    className={`
                    w-[100px] h-[100px]
                    border-2 ${borderColor}
                    ${bgColor} m-[1px] 
                    mt-[20px] items-end
                    relative flex 
                    justify-center`}>

                    <img src={character.logo} alt='character'/>

                    <div className='absolute right-0 bottom-0 text-white font-bold mr-1'>
                        {character.count}
                    </div>    

                </button>
            )
            
        })}
        {(isModalVisible && characterIndex != undefined) && (
            <Modal handleModalClose={handleModalClose} character={queue[characterIndex]}/>
        )}
    </div>  
  )
}

export default TurnQueue