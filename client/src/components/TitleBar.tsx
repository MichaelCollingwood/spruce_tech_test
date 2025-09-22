import React from "react";

type TitleBarProps = {
  reset: () => void;
};

export default function TitleBar({ reset }: TitleBarProps) {
  return (
    <div className="gap-12 p-2 inline-flex justify-between text-3xl text-center">
      <h1 className="">Tic Tac Toe</h1>
      <button onClick={reset}>🔄</button>
    </div>
  );
}
