import React, { useContext } from "react";
import { GameConfigContext } from "../context/GameConfigContext";
import { useController } from "../hooks/useController";
import Players from "./Players";

export default function Grid() {
  const { currentPlayer, moves, result, onSelection } = useController();
  const {
    gameSizeState: [gameSize],
  } = useContext(GameConfigContext)!;

  const board: (string | undefined)[][] = Array.from({ length: gameSize }, () =>
    Array.from({ length: gameSize }, () => undefined),
  );
  moves.forEach(([i, j], index) => {
    board[i][j] = index % 2 === 0 ? "X" : "O";
  });

  return (
    <div className="w-full flex flex-col gap-4 justify-center text-center h-auto m-auto bg-green-50">
      <Players />
      <div className="overflow-auto m-auto">
        <div
          className="grid mb-12"
          style={{
            gridTemplateColumns: `repeat(${gameSize}, auto)`,
            gridTemplateRows: `repeat(${gameSize}, minmax(0, 1fr))`,
          }}
        >
          {board.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={j}
                className="border border-gray-900 w-12 h-12 cursor-pointer items-center justify-center text-2xl font-bold flex"
                onClick={() => onSelection([i, j])}
                style={{
                  ...(i === 0 ? { borderTop: 0 } : {}),
                  ...(i === gameSize - 1 ? { borderBottom: 0 } : {}),
                  ...(j === 0 ? { borderLeft: 0 } : {}),
                  ...(j === gameSize - 1 ? { borderRight: 0 } : {}),
                }}
                disabled={!!cell}
              >
                {cell
                  ? cell
                  : !result && (
                      <span className="flex items-center justify-center w-full h-full opacity-0 hover:opacity-50">
                        {currentPlayer}
                      </span>
                    )}
              </button>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
