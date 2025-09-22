import { useState } from "react";
import { XorO } from "../types";

const WIN_CONDITION = 3;

export type Move = [number, number];

export const useController = (): {
  currentPlayer: XorO;
  moves: Move[];
  winner: XorO | undefined;
  onSelection: (coords: Move) => void;
  reset: () => void;
} => {
  const [moves, setMoves] = useState<Move[]>([]);
  const [winner, setWinner] = useState<XorO>();

  // Derivative variables
  const currentPlayer = moves.length % 2 === 0 ? "X" : "O";

  // Game methods
  const onSelection = (coords: Move) => {
    if (winner) return;

    const playerPastMoves = [...moves]
      .reverse()
      .filter((_, idx) => idx % 2 === 1);
    if (checkWin(playerPastMoves, coords)) {
      setWinner(currentPlayer);
    }
    setMoves((prev) => [...prev, coords]);
  };
  const reset = () => {
    setMoves([]);
    setWinner(undefined);
  };

  return { currentPlayer, moves, winner, onSelection, reset };
};

// Helper methods
function checkWin(pastMoves: Move[], [i, j]: Move) {
  if (
    checkDirection(pastMoves, (m) => [i, j + m]) || // Check horizontal -
    checkDirection(pastMoves, (m) => [i + m, j + m]) || // Check diagonal \
    checkDirection(pastMoves, (m) => [i + m, j]) || // Check vertical |
    checkDirection(pastMoves, (m) => [i - m, j + m]) // Check diagonal /
  )
    return true;

  return false;
}

function checkDirection(pastMoves: Move[], iterate: (m: number) => Move) {
  let count = 1;
  for (let n = 1; n < WIN_CONDITION; n++) {
    if (!hasMove(pastMoves, iterate(n))) {
      break;
    }
    count++;
  }
  for (let n = 1; n < WIN_CONDITION; n++) {
    if (!hasMove(pastMoves, iterate(-n))) {
      break;
    }
    count++;
  }
  return count >= WIN_CONDITION;
}

function hasMove(moves: Move[], [i, j]: Move) {
  return moves.some((move) => move[0] === i && move[1] === j);
}
