import React, { createContext, useContext, useMemo, useState } from 'react'
import { XorO } from '../types'

type Board = (XorO | undefined)[][]

type ControllerContext = {
    currentPlayerState: [XorO, React.Dispatch<React.SetStateAction<XorO>>]
    boardState: [Board, React.Dispatch<React.SetStateAction<Board>>]
}

export const ControllerContext = createContext<ControllerContext | undefined>(undefined)

export const ControllerProvider = ({ children }: { children: React.ReactNode }) => {
  return <ControllerContext.Provider value={{
    currentPlayerState: useState<XorO>("X"),
    boardState: useState<Board>([
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
      ])
  }}>{children}</ControllerContext.Provider>
}