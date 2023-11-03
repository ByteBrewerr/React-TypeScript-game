import React, { FC } from 'react';
import Cell from '../models/Cell';

interface Props {
  cell: Cell;
  isLastHoveredCell: boolean | null;
  onClick: (cell: Cell) => void;
  canMove: boolean | undefined;
  canEnemyMove: boolean | undefined;
  isSelected: boolean;
  canBeAttacked: boolean | null | undefined
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
  ${canEnemyMove ? 'opacity-80' : ''}
  ${isSelected ? 'opacity-70' : ''}
  ${canBeAttacked ? 'opacity-90' : ''}`;

  return (
    <div
      onClick={() => onClick(cell)}
      onMouseEnter={() => onMouseEnter(cell)}
      className={cellClasses}
      style={backGround}
    >
      {cell.character?.logo && (
        <div className='absolute'>
           <img
          src={cell.character.logo}
          alt='character'
          className='w-[100px] h-[100px]'
        />
        </div>
        
      )}
      {cell.obstacle?.logo && (
        <img src={cell.obstacle.logo} alt='obstacle' className='w-[50px] h-[50px]' />
      )}
    </div>
  );
};

export default CellComponent;