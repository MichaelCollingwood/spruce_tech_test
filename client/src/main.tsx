import React, { useContext } from "react";
import TitleBar from "./components/TitleBar";
import Grid from "./components/Grid";
import WinnerBanner from "./components/WinnerBanner";
import Stats from "./components/Stats";
import { GameConfigContext } from "./context/GameConfigContext";

export const Main = () => {
  const {
    currentPageState: [currentPage],
  } = useContext(GameConfigContext)!;

  return (
    <div className="flex flex-col h-dvh items-center gap-2 mx-auto bg-green-50 relative">
      <TitleBar />
      <div className="w-full flex flex-col gap-4 justify-center text-center h-auto m-auto bg-green-50">
        {currentPage === "stats" ? <Stats /> : <Grid />}
      </div>
      <WinnerBanner />
    </div>
  );
};
