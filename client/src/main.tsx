import React from "react";
import TitleBar from "./components/TitleBar";
import Grid from "./components/Grid";
import WinnerBanner from "./components/WinnerBanner";

export const Main = () => {
  return (
    <div className="flex flex-col h-dvh items-center gap-2 mx-auto bg-green-50 relative">
      <TitleBar />
      <Grid />
      <WinnerBanner />
    </div>
  );
};
