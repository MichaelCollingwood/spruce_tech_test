import React, { useState } from "react";

type TitleBarProps = {
  reset: () => void;
};

export default function TitleBar({ reset }: TitleBarProps) {
  const [isSettingsPopoverOpen, setIsSettingsPopoverOpen] =
    useState<boolean>(false);

  return (
    <div>
      <div className="max-w-96 gap-12 p-2 inline-flex justify-between text-3xl text-center">
        <h1>Tic Tac Toe</h1>
        <div className="inline-flex gap-2">
          <button onClick={() => setIsSettingsPopoverOpen((isOpen) => !isOpen)}>
            ⚙️
          </button>
          <button onClick={reset}>🔄</button>
        </div>
      </div>
      {isSettingsPopoverOpen && <div className="p-2">hello</div>}
    </div>
  );
}
