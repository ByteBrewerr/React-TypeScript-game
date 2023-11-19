import React, { FC } from 'react';
import Cell from '../models/Cell';
import ArmyCountBar from './ArmyCountBar';
import Teams from '../enums/Teams.enum';
import { useGrid } from '../contexts/GridProvider';

interface Props {
  cell: Cell;
  isLastHoveredCell: boolean | null;
  onClick: (cell: Cell) => void;
  canMove: boolean | undefined;
  canEnemyMove: boolean | undefined;
  isSelected: boolean;
<<<<<<< HEAD
  canBeAttacked: boolean | null | undefined
=======
  canBeAttacked: boolean | null | undefined;
>>>>>>> reseted
  onMouseEnter: (cell: Cell) => void;
}

const CellComponent: FC<Props> = ({
  cell,
  isLastHoveredCell,
  onClick,
  canMove,
  canEnemyMove,
  onMouseEnter,
  isSelected,
  canBeAttacked
}) => {
<<<<<<< HEAD
  const backGround = {
    background: `url(${cell.bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  };
  const cellClasses = `
  ${cell.row}${cell.col} flex justify-center items-center w-[81px] h-[81px] overflow-hidden 
  ${cell.character ? 'hover:opacity-80' : ''} 
  ${isLastHoveredCell ? 'rounded-lg' : ''} 
  ${canMove ? 'opacity-90 hover:opacity-80' : ''} 
  ${isSelected ? 'opacity-70' : ''}
  ${canBeAttacked ? 'opacity-90' : ''}`;

=======
  const { gridOn } = useGrid();

  const cellClasses = `
    ${cell.row}${cell.col} w-[81px] h-[81px] relative flex items-start justify-start 
    ${cell.character ? 'hover:opacity-80' : ''}
    ${isLastHoveredCell ? 'rounded-lg' : ''}
    ${(canMove && !canEnemyMove)  ? 'opacity-90 hover:opacity-80' : ''}
    ${isSelected ? 'opacity-70' : ''}
    ${canBeAttacked ? 'opacity-90' : ''}
    ${canEnemyMove ? 'opacity-80' : ''}
    ${gridOn ? 'border-[1px] border-gray-500' : ''}`;
  // анимация opacity клетка к клетки, алгоритм дейкстры.
>>>>>>> reseted
  return (
    <div
      onClick={() => onClick(cell)}
      onMouseEnter={() => onMouseEnter(cell)}
      className={cellClasses}
<<<<<<< HEAD
      style={backGround}
=======
      style={{ background: `url(${cell.bg}) no-repeat center / contain` }}
>>>>>>> reseted
    >
      {cell.character?.logo && (
        <div className='absolute'>
           <img
          src={cell.character.logo}
          alt='character'
<<<<<<< HEAD
          className='w-[130px] h-[100px]'
=======
          className={`absolute bottom-0 left-0 ${cell.character.team === Teams.Computer ? 'scale-x-[-1]' : ''}`}
>>>>>>> reseted
        />
        </div>
        
      )}

      {cell.character && (
        <div className='absolute bottom-0 right-0'>
          <ArmyCountBar armyCount={cell.character.count} team={cell.character.team} />
        </div>
      )}
    
      {cell.obstacle?.logo && (
<<<<<<< HEAD
        <img src={cell.obstacle.logo} alt='obstacle' className='w-[50px] h-[50px]' />
=======
        <div className='flex items-center justify-center w-full h-full'>
          <img
            src={cell.obstacle.logo}
            alt='obstacle'
            className='w-[50px] h-[50px]'
          />
        </div>
>>>>>>> reseted
      )}
    </div>
  );
};

export default CellComponent;
