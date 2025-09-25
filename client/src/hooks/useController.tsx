import { useEffect, useState } from "react";
import { XorO } from "../types";
import { GameConfigContext, Winner } from "../context/GameConfigContext";
import { useContext } from "react";

export type Move = [number, number];

export const useController = (): {
  currentPlayer: XorO;
  moves: Move[];
  winner: Winner | undefined;
  onSelection: (coords: Move) => void;
  reset: () => void;
} => {
  const {
    currentPlayerState: [currentPlayer, setCurrentPlayer],
    movesState: [moves, setMoves],
    winnerState: [winner, setWinner],
    gameSizeState: [gameSize],
    winConditionState: [winCondition],
    playersState: [players],
  } = useContext(GameConfigContext)!;

  // Game methods
  const onSelection = (coords: Move) => {
    if (winner) return;

    const playerPastMoves = [...(moves || [])]
      .reverse()
      .filter((_, idx) => idx % 2 === 1);
    if (checkWin(playerPastMoves, coords, winCondition)) {
      const final: Winner = currentPlayer === "X" ? "X" : "O";
      setWinner(final);
      fetch("http://localhost:4000/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerX: players?.[0] || "X",
          playerO: players?.[1] || "O",
          winner: final,
          boardSize: gameSize || 3,
          winCondition: winCondition || 3,
        }),
      }).catch(() => {});
    } else if (moves.length === gameSize ** 2 - 1) {
      // Draw
      setWinner("draw");
      fetch("http://localhost:4000/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerX: players?.[0] || "X",
          playerO: players?.[1] || "O",
          winner: "draw",
          boardSize: gameSize || 3,
          winCondition: winCondition || 3,
        }),
      }).catch(() => {});
    } else {
      setCurrentPlayer((player) => (player === "X" ? "O" : "X"));
    }
    setMoves((prev) => [...(prev || []), coords]);
  };
  const reset = () => {
    setCurrentPlayer("X");
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
