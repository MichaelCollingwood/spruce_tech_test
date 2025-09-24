import React, { useContext } from "react";
import { GameConfigContext } from "../context/GameConfigContext";
import { useController } from "../hooks/useController";

export default function Players() {
  const { currentPlayer } = useController();
  const {
    playersState: [players, setPlayers],
  } = useContext(GameConfigContext)!;

  return (
    <div className="flex justify-center gap-2 text-center items-center">
      <input
        className="w-28 rounded-full px-1 py-0.5 text-center border-2"
        style={{
          borderColor: currentPlayer === "X" ? "#006400" : "lightgray",
        }}
        type="text"
        placeholder="Player X"
        value={players[0] ?? ""}
        onChange={(e) => setPlayers([e.target.value, players[1]])}
      />
      <button
        className="px-1 py-0.5 rounded-full"
        title="Swap players"
        onClick={() => setPlayers([players[1], players[0]])}
      >
        ⇄
      </button>
      <input
        className="w-28 rounded-full px-1 py-0.5 text-center border-2"
        style={{
          borderColor: currentPlayer === "O" ? "#006400" : "lightgray",
        }}
        type="text"
        placeholder="Player O"
        value={players[1] ?? ""}
        onChange={(e) => setPlayers([players[0], e.target.value])}
      />
    </div>
  );
}
