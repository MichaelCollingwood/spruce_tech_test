import { useEffect, useState } from "react";
import { XorO } from "../types";
import { GameConfigContext, Result } from "../context/GameConfigContext";
import { useContext } from "react";

export type Move = [number, number];

export const useController = (): {
  currentPlayer: XorO;
  moves: Move[];
  result: Result | undefined;
  onSelection: (coords: Move) => void;
  reset: () => void;
} => {
  const {
    currentPlayerState: [currentPlayer, setCurrentPlayer],
    movesState: [moves, setMoves],
    resultState: [result, setResult],
    gameSizeState: [gameSize],
    winConditionState: [winCondition],
  } = useContext(GameConfigContext)!;

  // Game methods
  const onSelection = (coords: Move) => {
    if (result) return;

    const playerPastMoves = [...(moves || [])]
      .reverse()
      .filter((_, idx) => idx % 2 === 1);
    if (checkWin(playerPastMoves, coords, winCondition)) {
      setResult(currentPlayer === "X" ? "win" : "lose");
    } else {
      setCurrentPlayer(player => player === "X" ? "O" : "X")
    }
    setMoves((prev) => [...(prev || []), coords]);
  };
  const reset = () => {
    setCurrentPlayer("X");
    setMoves([]);
    setResult(undefined);
  };

  useEffect(() => {
    reset();
  }, [gameSize, winCondition]);

  return { currentPlayer, moves, result, onSelection, reset };
};

// Helper methods
function checkWin(pastMoves: Move[], [i, j]: Move, winCondition: number) {
  if (
    checkDirection(pastMoves, (m) => [i, j + m], winCondition) || // Check horizontal -
    checkDirection(pastMoves, (m) => [i + m, j + m], winCondition) || // Check diagonal \
    checkDirection(pastMoves, (m) => [i + m, j], winCondition) || // Check vertical |
    checkDirection(pastMoves, (m) => [i - m, j + m], winCondition) // Check diagonal /
  )
    return true;

  return false;
}

function checkDirection(
  pastMoves: Move[],
  iterate: (m: number) => Move,
  winCondition: number,
) {
  let count = 1;
  for (let n = 1; n < winCondition; n++) {
    if (!hasMove(pastMoves, iterate(n))) {
      break;
    }
    count++;
  }
  for (let n = 1; n < winCondition; n++) {
    if (!hasMove(pastMoves, iterate(-n))) {
      break;
    }
    count++;
  }
  return count >= winCondition;
}

function hasMove(moves: Move[], [i, j]: Move) {
  return moves.some((move) => move[0] === i && move[1] === j);
}
