import React, {FC} from 'react'
import Cell from '@models/Cell'
import LineTo from 'react-lineto'
import Teams from '@enums/Teams.enum'

interface ShootProps {
    selectedCell: Cell 
    hoveredCell: Cell 
    canShoot: boolean 
    cursor: string
}

const ShootLine: FC<ShootProps> = ({selectedCell, hoveredCell, canShoot, cursor}) => {
    
    if(!canShoot || hoveredCell.character?.team === Teams.Player || !hoveredCell.character){
        return null
    }

    return (
        <div>
            <LineTo
                className={`${cursor}`}
                from={`${selectedCell.row}${selectedCell.col}`}
                to={`${hoveredCell.row}${hoveredCell.col}`}
                borderWidth={1}
            />
        </div>
    )
}

export default ShootLine