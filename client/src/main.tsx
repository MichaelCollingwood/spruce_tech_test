import React from "react";
import { useController } from "./hooks/useController";
import InfoBar from "./components/InfoBar";
import TitleBar from "./components/TitleBar";
import Grid from "./components/Grid";

export const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6 mx-auto">
      <TitleBar />
      <Grid />
      <InfoBar />
    </div>
  );
};
