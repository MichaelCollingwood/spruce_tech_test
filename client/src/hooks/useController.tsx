import { useEffect, useState } from "react";
import { XorO } from "../types";
import { GameConfigContext } from "../context/GameConfigContext";
import { useContext } from "react";

export type Move = [number, number];

export const useController = (): {
  currentPlayer: XorO;
  moves: Move[];
  winner: XorO | undefined;
  onSelection: (coords: Move) => void;
  reset: () => void;
} => {
  const {
    movesState: [moves, setMoves],
    winnerState: [winner, setWinner],
    gameSizeState: [gameSize],
    winConditionState: [winCondition],
  } = useContext(GameConfigContext)!;

  // Derivative variables
  const currentPlayer = (moves || []).length % 2 === 0 ? "X" : "O";

  // Game methods
  const onSelection = (coords: Move) => {
    if (winner) return;

    const playerPastMoves = [...(moves || [])]
      .reverse()
      .filter((_, idx) => idx % 2 === 1);
    if (checkWin(playerPastMoves, coords, winCondition)) {
      setWinner(currentPlayer);
    }
    setMoves((prev) => [...(prev || []), coords]);
  };
  const reset = () => {
    setMoves([]);
    setWinner(undefined);
  };

  useEffect(() => {
    reset();
  }, [gameSize, winCondition]);

  return { currentPlayer, moves, winner, onSelection, reset };
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
