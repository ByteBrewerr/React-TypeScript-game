import React, { FC } from 'react';
import Teams from '../enums/Teams.enum';

interface ArmyCountBarProps {
  armyCount: number;
  team: Teams;
}

const ArmyCountBar: FC<ArmyCountBarProps> = ({ armyCount, team}) => {
  return (
    <div className='relative'>
      <div className={`${team === Teams.Player ? 'bg-sky-900' : 'bg-slate-500'} rounded-sm px-[10px] text-[10px] font-bold absolute bottom-0 right-0 text-white`}>
        {armyCount}
      </div>
    </div>
  );
}

export default ArmyCountBar;
