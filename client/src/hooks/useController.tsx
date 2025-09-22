import { useContext } from 'react'
import { XorO } from '../types'
import { ControllerContext } from '../contexts/ControllerContext'

export const useController = () => {
  const ctx = useContext(ControllerContext)
  if (!ctx) {
    throw new Error('useController must be used within a ControllerProvider')
  }

  const { boardState: [board, setBoard], currentPlayerState: [currentPlayer, setCurrentPlayer] } = ctx;
  
  const onSelection = (i: number, j: number, xOrO: XorO) => {
    const newBoard = board.map((row, iRow) => 
      row.map((value, jColumn) => (iRow === i && j === jColumn) ? xOrO : value)
    )
    setBoard(newBoard)
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  const reset = () => {
    setBoard(board.map((row) => 
      row.map(() => undefined)
    ))
  }
  return { currentPlayer, board, onSelection, reset }
}
