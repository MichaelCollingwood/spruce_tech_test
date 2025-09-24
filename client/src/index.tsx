import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/index";
import { Main } from "./main";
import { GameConfigProvider } from "./context/GameConfigContext";

const root = createRoot(document.getElementById("root")!);
root.render(
  <GameConfigProvider>
    <Main />
  </GameConfigProvider>,
);
