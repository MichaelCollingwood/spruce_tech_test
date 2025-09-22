import React from 'react'
import { useController } from './hooks/useController'


export const Main = () => {
  const {
    currentPlayer,
    board,
    onSelection,
    reset
  } = useController()

  return <div className='flex flex-col mt-10 items-center'>
    <div className='min-w-96 inline-flex justify-between font-bold text-2xl'>
      <h1>Tic Tac Toe</h1>
      <button onClick={() => reset()}>⟲</button>
    </div>
    <pre className='text-lg'>{currentPlayer}'s go</pre>
    <div className='flex flex-col gap-1'>
      {board.map((row, i) => <div className='flex gap-1'>
        {row.map((column, j) => <button
        className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex'
        onClick={() => onSelection(i, j, currentPlayer)}
        disabled={!!column}
        >
          {column}
        </button>)}
      </div>)}
    </div>
  </div>
}
