import React, { useState } from "react";
import Settings from "./Settings";
import { useController } from "../hooks/useController";

export default function TitleBar() {
  const { reset } = useController();
  const [isSettingsPopoverOpen, setIsSettingsPopoverOpen] =
    useState<boolean>(false);

  return (
    <div>
      <div className="max-w-96 gap-12 p-2 inline-flex justify-between text-2xl text-center">
        <h1>Tic Tac Toe</h1>
        <div className="inline-flex gap-2">
          <button onClick={() => setIsSettingsPopoverOpen((isOpen) => !isOpen)}>
            ⚙️
          </button>
          <button onClick={reset}>🔄</button>
        </div>
      </div>
      {isSettingsPopoverOpen && <Settings />}
    </div>
  );
}
