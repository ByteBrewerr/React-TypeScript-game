import React, { useEffect, useState, FC } from 'react'
import Board from '../models/Board'
import CellComponent from './CellComponent'
import Terrorist from '../models/characters/Terrorist'
import Cell from '../models/Cell'
import Teams from '../enums/Teams.enum'
import Character from '../models/characters/Character'
import Names from '../enums/Name.enum'



const BoardComponent: FC = () => {
    const [board, setBoard] = useState<Board>(new Board(10))
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    
    useEffect(()=>{
        const newBoard = new Board(10)
        newBoard.init()
        newBoard.addCharacters()
        setBoard(newBoard)
    },[])

    const cellClick = (cell: Cell) =>{
        if (!selectedCell && cell.character){
            setSelectedCell(cell)
        }
        if (selectedCell && selectedCell.character) {
            const terrorist = selectedCell.character
            selectedCell.removeCharacter()
            cell.setCharacter(terrorist)
            setSelectedCell(null)
        }
    }

    return (
        <div className='w-[100%] h-[100vh] flex justify-center items-center bg-gray-600'>
            <div className='h-[600px] w-[600px] flex flex-wrap'>
                {board.cells.map((row)=>{           
                    return row.map((cell)=>{
                        return (
                            <CellComponent 
                                key={`${cell.row}${cell.col}`} 
                                cell={cell} 
                                onClick={cellClick}
                                isSelected={selectedCell?.row === cell.row && selectedCell.col === cell.col}
                            />
                        ) 
                    })      
                })}
            </div>
        </div>
      
    )
}

export default BoardComponent