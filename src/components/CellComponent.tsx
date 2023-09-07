import React, { FC } from 'react';
import Cell from '../models/Cell';

interface Props {
  cell: Cell;
  onClick: (cell: Cell) => void;
  canMove: boolean | undefined;
  isSelected: boolean;
  onMouseEnter: (cell: Cell) => void;

}

const CellComponent: FC<Props> = ({
  cell,
  onClick,
  canMove,
  onMouseEnter,

}) => {
  const backGround = {
    background: `url(${cell.bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };
  return (
    <div
      onClick={() => onClick(cell)}
      onMouseEnter={() => onMouseEnter(cell)}
      className={`${cell.row}${cell.col} flex justify-center items-center w-[60px] h-[60px]
      ${cell.character && 'hover:rounded-lg'} ${canMove && 'rounded-lg hover:rounded-xl'}`}
      style={backGround}
    >
      {cell.character?.logo && (
        <img
          src={cell.character.logo}
          alt='character'
          className='w-[50px] h-[50px]'
        />
      )}
      {cell.obstacle?.logo && (
        <img src={cell.obstacle.logo} alt='cactus' className='w-[50px] h-[50px]' />
      )}
    </div>
  );
};

export default CellComponent;