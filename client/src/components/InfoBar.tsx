import React from "react";
import { XorO } from "../types";

type InfoBarProps = {
  winner: XorO | undefined;
  currentPlayer: XorO;
};

export default function InfoBar({ winner, currentPlayer }: InfoBarProps) {
  return (
    <div className="max-w-96 flex flex-col font-mono text-center rounded p-2">
      <p>{winner ? winner + " won 🎉" : currentPlayer + "'s go"}</p>
    </div>
  );
}
