import React, { createContext, useState } from "react";
import { Move } from "../hooks/useController";
import { XorO } from "../types";

export type Result = "win" | "lose" | "draw"; // For X

export type GameConfig = {
  currentPlayerState: [XorO, React.Dispatch<React.SetStateAction<XorO>>],
  playersState: [
    [string | undefined, string | undefined],
    React.Dispatch<React.SetStateAction<[string | undefined, string | undefined]>>,
  ],
  movesState: [
    Move[],
    React.Dispatch<React.SetStateAction<Move[]>>,
  ];
  resultState: [
    Result | undefined,
    React.Dispatch<React.SetStateAction<Result | undefined>>,
  ];
  gameSizeState: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ];
  winConditionState: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ];
};

export const GameConfigContext = createContext<GameConfig | undefined>(undefined);

export function GameConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameConfigContext.Provider value={{
      currentPlayerState: useState("X"),
      playersState: useState([undefined, undefined]),
      movesState: useState([]),
      resultState: useState<Result>(),
      gameSizeState: useState<number>(3),
      winConditionState: useState<number>(3),
    }}>
      {children}
    </GameConfigContext.Provider>
  );
}
