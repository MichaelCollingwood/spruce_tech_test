import React, { createContext, useState } from "react";
import { Move } from "../hooks/useController";
import { XorO } from "../types";

export type Winner = "X" | "O" | "draw";

export type GameConfig = {
  currentPageState: [
    "game" | "stats",
    React.Dispatch<React.SetStateAction<"game" | "stats">>,
  ];
  currentPlayerState: [XorO, React.Dispatch<React.SetStateAction<XorO>>];
  playersState: [
    [string | undefined, string | undefined],
    React.Dispatch<
      React.SetStateAction<[string | undefined, string | undefined]>
    >,
  ];
  movesState: [Move[], React.Dispatch<React.SetStateAction<Move[]>>];
  winnerState: [
    Winner | undefined,
    React.Dispatch<React.SetStateAction<Winner | undefined>>,
  ];
  gameSizeState: [number, React.Dispatch<React.SetStateAction<number>>];
  winConditionState: [number, React.Dispatch<React.SetStateAction<number>>];
};

export const GameConfigContext = createContext<GameConfig | undefined>(
  undefined,
);

export function GameConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameConfigContext.Provider
      value={{
        currentPageState: useState<"game" | "stats">("game"),
        currentPlayerState: useState("X"),
        playersState: useState([undefined, undefined]),
        movesState: useState([]),
        winnerState: useState<Winner>(),
        gameSizeState: useState<number>(3),
        winConditionState: useState<number>(3),
      }}
    >
      {children}
    </GameConfigContext.Provider>
  );
}
