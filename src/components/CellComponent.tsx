import React, { FC } from 'react'
import Cell from '../models/Cell'

interface Props {
    cell: Cell
    onClick: (cell: Cell) => void
    isSelected: boolean
}

const CellComponent: FC<Props> = ({cell, onClick, isSelected}) => {
    console.log(cell.character?.logo)
    const backGround = {
        background: `url(${cell.bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };
    return (
        <div onClick={()=>onClick(cell)} className={`flex justify-center items-center w-[60px] h-[60px] ${isSelected && 'rounded-lg'}`} style={backGround}>
            {cell.character?.logo && <img src={cell.character.logo} alt="logo" className="w-[50px] h-[50px]" />}
        </div>
    )
}

export default CellComponent