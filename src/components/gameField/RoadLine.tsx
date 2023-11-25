import React, {FC} from 'react'
import Cell from '@models/Cell'
import LineTo from 'react-lineto'

interface RoadProps {
    road: Cell[]
}

const RoadLine: FC<RoadProps> = ({road}) => {

    if(!road.length){
        return null
    }
    return (
        <div>
            {road.map((_, i)=>{
                return (
                    <LineTo
                    key={i}  
                    from={`${road[i]?.row}${road[i]?.col}` || ''}
                    to={`${road[i + 1]?.row}${road[i + 1]?.col}` || ''}
                    borderWidth={1}
                    />
                )
            })}
        </div>
    )
}

export default RoadLine