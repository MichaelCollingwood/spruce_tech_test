import React from "react";
import { Move, useController } from "./hooks/useController";
import InfoBar from "./components/InfoBar";
import TitleBar from "./components/TitleBar";
import Grid from "./components/Grid";

export const GAME_SIZE = 3;

export const Main = () => {
  const { currentPlayer, moves, winner, onSelection, reset } = useController();

  return (
    <div className="flex flex-col p-6 gap-6 max-w-96 mx-auto">
      <TitleBar reset={reset} />
      <Grid
        currentPlayer={currentPlayer}
        moves={moves}
        winner={winner}
        onSelection={onSelection}
      />
      <InfoBar winner={winner} currentPlayer={currentPlayer} />
    </div>
  );
};
