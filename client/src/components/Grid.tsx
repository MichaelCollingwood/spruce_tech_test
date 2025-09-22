import React from "react";
import { GAME_SIZE } from "../main";
import { XorO } from "../types";
import { Move } from "../hooks/useController";

type GridProps = {
  currentPlayer: XorO;
  moves: Move[];
  winner: XorO | undefined;
  onSelection: (coords: Move) => void;
};

export default function Grid({
  currentPlayer,
  moves,
  winner,
  onSelection,
}: GridProps) {
  const board: (string | undefined)[][] = Array.from(
    { length: GAME_SIZE },
    () => Array.from({ length: GAME_SIZE }, () => undefined),
  );
  moves.forEach(([i, j], index) => {
    board[i][j] = index % 2 === 0 ? "X" : "O";
  });

  return (
    <div
      className="grid mx-auto overflow-auto p-4 bg-slate-100 rounded"
      style={{
        gridTemplateColumns: `repeat(${GAME_SIZE}, auto)`,
        gridTemplateRows: `repeat(${GAME_SIZE}, minmax(0, 1fr))`,
      }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={j}
            className="border-2 border-gray-900 w-12 h-12 cursor-pointer items-center justify-center text-2xl font-bold flex"
            onClick={() => onSelection([i, j])}
            style={{
              ...(i === 0 ? { borderTop: 0 } : {}),
              ...(i === GAME_SIZE - 1 ? { borderBottom: 0 } : {}),
              ...(j === 0 ? { borderLeft: 0 } : {}),
              ...(j === GAME_SIZE - 1 ? { borderRight: 0 } : {}),
            }}
            disabled={!!cell}
          >
            {cell
              ? cell
              : !winner && (
                  <span className="flex items-center justify-center w-full h-full opacity-0 hover:opacity-50">
                    {currentPlayer}
                  </span>
                )}
          </button>
        )),
      )}
    </div>
  );
}
