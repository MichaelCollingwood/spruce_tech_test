import React from "react";
import { useController } from "../hooks/useController";

export default function InfoBar() {
  const { currentPlayer, winner } = useController();
  return (
    <div className="max-w-96 flex flex-col font-mono text-center rounded p-2">
      <p>{winner ? winner + " won 🎉" : currentPlayer + "'s go!"}</p>
    </div>
  );
}
