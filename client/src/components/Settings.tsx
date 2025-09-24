import React, { useContext } from "react";
import { GameConfigContext } from "../context/GameConfigContext";

export default function Settings() {
  const {
    gameSizeState: [gameSize, setGameSize],
    winConditionState: [winCondition, setWinCondition],
  } = useContext(GameConfigContext)!;
  return (
    <div className="p-2 flex gap-4 items-end">
      <label className="flex flex-col gap-1 text-sm">
        <span>Board size</span>
        <input
          className="border rounded px-2 py-1 w-24"
          type="number"
          min={3}
          max={15}
          value={gameSize}
          onChange={(e) => {
            const next = Math.max(3, Math.min(15, Number(e.target.value)));
            setGameSize(next);
            if (winCondition > next) {
              setWinCondition(next);
            }
          }}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span>Win condition</span>
        <input
          className="border rounded px-2 py-1 w-24"
          type="number"
          min={3}
          max={gameSize}
          value={Math.min(winCondition, gameSize)}
          onChange={(e) => {
            const raw = Number(e.target.value);
            const next = Math.max(3, Math.min(gameSize, raw));
            setWinCondition(next);
          }}
        />
      </label>
    </div>
  );
}
