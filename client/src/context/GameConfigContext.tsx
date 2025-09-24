import React, { createContext, useState } from "react";
import { XorO } from "../types";
import { Move } from "../hooks/useController";

export type GameConfig = {
  movesState: [
    Move[],
    React.Dispatch<React.SetStateAction<Move[] | undefined>>,
  ];
  winnerState: [
    XorO | undefined,
    React.Dispatch<React.SetStateAction<XorO | undefined>>,
  ];
  gameSizeState: [
    number,
    React.Dispatch<React.SetStateAction<number | undefined>>,
  ];
  winConditionState: [
    number,
    React.Dispatch<React.SetStateAction<number | undefined>>,
  ];
};

const defaultValue = {
  movesState: useState([]),
  winnerState: useState<XorO>(),
  gameSizeState: useState<number>(3),
  winConditionState: useState<number>(3),
};

export const GameConfigContext = createContext<GameConfig>(defaultValue);

export function GameConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameConfigContext.Provider value={defaultValue}>
      {children}
    </GameConfigContext.Provider>
  );
}
