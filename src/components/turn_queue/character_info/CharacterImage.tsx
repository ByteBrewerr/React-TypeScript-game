import React, { FC } from 'react';
import img from '@assets/characters/archangel.png'
import Names from '@enums/Name.enum';

interface CharacterImageProps {
    logo: typeof img
    name: Names
    level: number
}


const CharacterImage:FC<CharacterImageProps> = ({logo, name, level}) => {
  
    return (
        <div className='h-[30vh] w-[40vh] flex flex-col items-center '>
            <img className='w-[12vh] h-[18vh]' src={logo} alt='characterLogo'/>
            <div className='mt-6'>{name} | level {level}</div>
        </div>
        
    );
}

export default CharacterImage;
